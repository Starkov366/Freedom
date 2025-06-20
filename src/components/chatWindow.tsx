import React from "react";
import HeaderChatBox from "./headerChatBox";
import ChatBox from "./chatBox";
import { UserInterface } from "@/StateManagment/appSlice";
import { useParams } from "next/navigation";
import { DuoChat } from "@/StateManagment/appSlice";
import type { Chats } from "@/StateManagment/appSlice";
type typeChatBox = { user: UserInterface; fullfield: boolean; key: number };
const ChatWindow: React.FC<typeChatBox> = ({ user, fullfield }) => {
     const id = useParams();
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
     const ownUser = returnFriendName(user!).ownUser;
     return (
          <div className="chat">
               <HeaderChatBox
                    targetChat={targetChat}
                    targetNumberOutUser={outName}
                    ownUser={ownUser}
                    fullfield={fullfield}
               ></HeaderChatBox>
               {!fullfield ? (
                    <div className="chat__info">
                         <p>Select chat to start messaging</p>
                    </div>
               ) : null}
               <ChatBox
                    key={targetChat?.messages.length}
                    targetChat={targetChat}
                    fullfield={fullfield}
               ></ChatBox>
          </div>
     );
};
export default ChatWindow;
