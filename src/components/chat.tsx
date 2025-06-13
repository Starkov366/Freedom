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
import { useSelector } from "react-redux";

type typeChatBox = { user?: UserInterface; fullfield: boolean };
const Chat: React.FC<typeChatBox> = ({ fullfield }) => {
     const [isOpen, setIsOpen] = React.useState<boolean>(false);
     const user = useSelector((store: RootState) => store.User) as UserInterface;
     React.useEffect(() => {
          const handleClose = (event: any) => {
               const element = event.target as HTMLElement;
               console.log(element);
               if (
                    !element.closest(".settings") &&
                    !element.closest(".headerMessageMenu__burgerMenu")
               ) {
                    setIsOpen(false);
               }
          };
          document.addEventListener("click", handleClose);
          return () => document.removeEventListener("click", handleClose);
     }, []);
     return (
          <div className="chatMain">
               <ChatWindow fullfield={fullfield} user={user}></ChatWindow>

               {!isOpen ? (
                    <MessageMenu isOpen={isOpen} setIsOpen={setIsOpen}></MessageMenu>
               ) : (
                    <Settings></Settings>
               )}
          </div>
     );
};
export default Chat;
