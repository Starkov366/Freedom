import React from "react";
import HeaderChatBox from "./headerChatBox";
import ChatBox from "./chatBox";
import { UserInterface } from "@/StateManagment/appSlice";
import { useParams } from "next/navigation";
import { DuoChat } from "@/StateManagment/appSlice";
import BigChatInfo from "./bigChatInfo";
import type { Chats, UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
type typeChatBox = {
     user: UserInterface;
     fullfield: boolean;
     key: number;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     isOpen: boolean;
     language: string;
};
const ChatWindow: React.FC<typeChatBox> = ({
     user,
     fullfield,
     userIsDarkTheme,
     userThemeColorScheme,
     setIsOpen,
     isOpen,
     language
}) => {
     const id = useParams();
     const [bigChatInfoOpen, setBigChatInfoOpen] = React.useState<boolean>(isOpen);
     console.log(id);
     function returnFriendName(user: UserInterface): {
          targetChat: Chats[];
          outName: number;
          ownUser: UserInterface;
     } {
          let outName: number = 0;
          const targetChat: Chats[] = user.userChats?.filter(
               (chat: Chats) => chat?.chatId === id.chatId
          );

          if (targetChat?.[0]?.joinUsers && !Array.isArray(targetChat[0].joinUsers!)) {
               const targetNameIDOne: string = targetChat?.[0]?.joinUsers?.one?.userId!;
               const targetNameIDTwo: string = targetChat?.[0]?.joinUsers?.two?.userId!;

               if (targetNameIDOne === user?.userId) {
                    outName = 1;
               } else if (targetNameIDTwo === user?.userId) {
                    outName = 0;
               }
          }
          const users = targetChat?.[0]?.joinUsers as { one: UserInterface; two: UserInterface };
          const ownUser: UserInterface = outName === 1 ? users?.two : users?.one;
          console.log(targetChat, outName, ownUser);
          return { targetChat, outName, ownUser };
     }
     const outName = returnFriendName(user!).outName;
     const targetChat = returnFriendName(user!).targetChat?.[0];
     const container = React.useRef<null | HTMLDivElement>(null);
     const ownUser = returnFriendName(user!).ownUser;
     React.useEffect(() => {
          const handleClose = (event: any) => {
               const element = event.target as HTMLElement;
               if (
                    !element.closest(".bigChatInfo") &&
                    !element.closest(".headerChatBox") &&
                    !element.closest(".profile") &&
                    !element.closest(".contactMenu") &&
                    !element.closest(".createNewWindow")
               ) {
                    setBigChatInfoOpen(false);
               }
          };
          document.addEventListener("click", handleClose);
          return () => document.removeEventListener("click", handleClose);
     }, []);
     return (
          <div
               style={{
                    color: user.userIsDarkTheme
                         ? user.userThemeColorShceme.dark[4]
                         : user.userThemeColorShceme.light[4]
               }}
               className="chat"
          >
               <HeaderChatBox
                    userIsDarkTheme={user.userIsDarkTheme}
                    userThemeColorScheme={user.userThemeColorShceme}
                    targetChat={targetChat}
                    targetNumberOutUser={outName}
                    ownUser={ownUser}
                    fullfield={fullfield}
                    setBigInfoChatOpen={setBigChatInfoOpen}
                    language={user.userLanguage}
                    container={container}
               ></HeaderChatBox>
               {!fullfield ? (
                    <div
                         style={{ background: userIsDarkTheme ? "gray" : "white" }}
                         className="chat__info"
                    >
                         <p style={{ color: userIsDarkTheme ? "white" : "black" }}>
                              {language === "RUSSIAN"
                                   ? "Выберите чат дабы начать общение"
                                   : "Select chat to start a messaging"}
                         </p>
                    </div>
               ) : null}
               <ChatBox
                    userIsDarkTheme={user.userIsDarkTheme}
                    userThemeColorScheme={user.userThemeColorShceme}
                    key={targetChat?.messages?.length}
                    targetChat={targetChat}
                    fullfield={fullfield}
                    container={container}
                    language={user.userLanguage}
               ></ChatBox>
               {(bigChatInfoOpen && targetChat?.type === "GROUP") ||
               (targetChat?.type === "CHANNEL" && bigChatInfoOpen) ? (
                    <BigChatInfo
                         language={user.userLanguage}
                         isOpen={isOpen}
                         targetChat={targetChat}
                         setIsOpen={setIsOpen}
                         setBigChatIsOpen={setBigChatInfoOpen}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         members={targetChat?.joinUsers}
                         groupName={targetChat?.info.chatName}
                         chatDescription={targetChat?.info.chatDescription}
                         targetChatID={targetChat?.chatId}
                         chatImage={targetChat?.imagesChat}
                         type={targetChat?.type}
                    ></BigChatInfo>
               ) : null}
          </div>
     );
};
export default ChatWindow;
