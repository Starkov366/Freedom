"use client";
import React from "react";
import ChatWindow from "./chatWindow";
import HeaderChatBox from "./headerChatBox";
import ChatBox from "./chatBox";
import MessageMenu from "./messageMenu";
import Settings from "./settings";
import Profile from "./profile";
import CreateNewWindow from "./createNewWindow";
import { UserInterface } from "@/StateManagment/appSlice";
import { RootState } from "../StateManagment/store";
import { shallowEqual, useSelector } from "react-redux";

type typeChatBox = { user?: UserInterface; fullfield: boolean };
const Chat: React.FC<typeChatBox> = ({ fullfield }) => {
     const [isOpen, setIsOpen] = React.useState<boolean>(false);
     const user = useSelector((store: RootState) => store.User, shallowEqual) as UserInterface;
     React.useEffect(() => {
          const handleClose = (event: any) => {
               const element = event.target as HTMLElement;
               console.log(element);
               if (
                    !element.closest(".settings") &&
                    !element.closest(".headerMessageMenu__burgerMenu") &&
                    !element.closest(".profile")
               ) {
                    setIsOpen(false);
               }
          };
          document.addEventListener("click", handleClose);
          return () => document.removeEventListener("click", handleClose);
     }, []);
     return (
          <div
               style={{
                    color: user.userIsDarkTheme
                         ? user.userThemeColorShceme.dark[2]
                         : user.userThemeColorShceme.light[2]
               }}
               className="chatMain"
          >
               <ChatWindow
                    userIsDarkTheme={user.userIsDarkTheme}
                    userThemeColorScheme={user.userThemeColorShceme}
                    key={user?.userChats.length}
                    fullfield={fullfield}
                    user={user}
               ></ChatWindow>

               {!isOpen ? (
                    <MessageMenu
                         userIsDarkTheme={user.userIsDarkTheme}
                         userThemeColorScheme={user.userThemeColorShceme}
                         isOpen={isOpen}
                         setIsOpen={setIsOpen}
                    ></MessageMenu>
               ) : (
                    <Settings
                         userIsDarkTheme={user.userIsDarkTheme}
                         userThemeColorScheme={user.userThemeColorShceme}
                    ></Settings>
               )}
          </div>
     );
};
export default Chat;
