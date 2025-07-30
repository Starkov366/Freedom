"use client";
import React from "react";
import { useDispatch } from "react-redux";
import type { RootDispatch } from "@/StateManagment/store";
import { useRouter } from "next/navigation";
import { setAddNewContactAndChat, setJoinToGroupAndChannel } from "@/StateManagment/appSlice";
import { Chats } from "@/StateManagment/appSlice";
import defaultImg from "../../public/icons/userFind.png";
import defaultChatImg from "../../public/icons/speech-bubble_3698075.png";

import { UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";

type typeSearch = {
     contacts?: (UserInterfaceForJoinUsers | Chats)[];
     userIsDarkTheme: boolean;
     userThemeColorScheme: any;
};
const GlobalContactSearch: React.FC<typeSearch> = ({
     contacts,
     userIsDarkTheme,
     userThemeColorScheme
}) => {
     const router = useRouter();
     const dispatch: RootDispatch = useDispatch();
     const handleAddContactAndCreateNewChat = (
          event: React.MouseEvent<HTMLDivElement>,
          contact: UserInterfaceForJoinUsers
     ) => {
          const ID: string = Math.fround(Math.random() * 9999).toString();
          const targetContact: UserInterfaceForJoinUsers = contact;
          targetContact.userId = targetContact.userId.slice(1, targetContact.userId.length);
          dispatch(
               setAddNewContactAndChat({
                    contact: contact,
                    chatID: ID
               })
          );
          event.currentTarget.style.transform = "translateX(400px)";
          setTimeout(() => {
               router.push(`/${ID}`);
          }, 355);
     };
     const handleJoinToChat = (event: React.MouseEvent<HTMLDivElement>, chat: Chats) => {
          const targetChat: Chats = chat;
          targetChat.chatId = targetChat.chatId.slice(1, targetChat.chatId.length);
          dispatch(setJoinToGroupAndChannel({ targetChat: chat }));
          event.currentTarget.style.transform = "translateX(400px)";
          setTimeout(() => {
               router.push(`/${targetChat.chatId}`);
          }, 355);
     };

     return (
          <div
               className="globalSearch"
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[6]
                         : userThemeColorScheme.light[6]
               }}
          >
               {contacts?.map((contact: UserInterfaceForJoinUsers | Chats, index: number) => {
                    return !("type" in contact) ? (
                         <div
                              key={index}
                              onClick={(event) => handleAddContactAndCreateNewChat(event, contact)}
                              style={{
                                   background: userIsDarkTheme ? "#8987d3b8" : "white",
                                   borderLeft: !userIsDarkTheme
                                        ? "10px solid rgb(43, 174, 226, 0.4)"
                                        : "10px solid rgb(12, 14, 125,0.5)"
                              }}
                              className="globalSearch__item"
                         >
                              <img
                                   src={contact.userImage ? contact.userImage : defaultImg.src}
                                   className="globalSearch__itemImage"
                              ></img>
                              <div className="globalSearch__itemTexts">
                                   <h1 className="globalSearch__itemName">{contact.userName}</h1>
                                   <span className="globalSearch__itemId">{contact.userId}</span>
                              </div>
                         </div>
                    ) : (
                         <div
                              key={index}
                              onClick={(event) => handleJoinToChat(event, contact)}
                              style={{
                                   background: userIsDarkTheme ? "#1882f2" : "#659edb",
                                   borderLeft: !userIsDarkTheme
                                        ? "10px solid rgb(43, 174, 226, 0.4)"
                                        : "10px solid rgb(12, 14, 125,0.5)"
                              }}
                              className="globalSearch__item"
                         >
                              <img
                                   src={
                                        contact.info.chatImage
                                             ? contact.info.chatImage
                                             : defaultChatImg.src
                                   }
                                   className="globalSearch__itemImage"
                              ></img>
                              <div className="globalSearch__itemTexts">
                                   <h1 className="globalSearch__itemName">
                                        {contact.info.chatName}
                                   </h1>
                                   <span className="globalSearch__itemId">{contact.chatId}</span>
                              </div>
                         </div>
                    );
               })}
          </div>
     );
};
export default GlobalContactSearch;
