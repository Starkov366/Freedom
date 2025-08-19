"use client";
import React from "react";
import Link from "next/link";
import undefinedIconDuo from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
import undefinedIconGroup from "../../public/icons/group (1).png";
import undefinedIconChannel from "../../public/icons/tv.png";
import checked from "../../public/icons/tick.png";
import doubleChecked from "../../public/icons/check.png";
import undefinedIconSaved from "../../public/icons/save.png";
import { roles } from "@/StateManagment/appSlice";
export type typeMessage = {
     lastSendImg: string;
     title: string;
     lastUserName: string;
     value: string;
     lastMessageDate: string;
     flagCheck: boolean;
     chatId: string;
     chatImage: string;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     messageImage: string;
     typeChat: string;
     countMessagesNew: number;
};
const MessageItem: React.FC<typeMessage> = ({
     lastSendImg,
     title,
     lastUserName,
     value,
     lastMessageDate,
     flagCheck,
     chatId,
     chatImage,
     userIsDarkTheme,
     userThemeColorScheme,
     messageImage,
     typeChat,
     countMessagesNew
}) => {
     return (
          <Link style={{ textDecoration: "none", color: "black" }} href={chatId ? chatId : "..."}>
               <div
                    style={{
                         color: userIsDarkTheme ? "white" : "black"
                    }}
                    className="messageMenu__item"
               >
                    <img
                         className="messageMenu__itemImg"
                         src={
                              lastSendImg
                                   ? lastSendImg
                                   : lastSendImg === "" && typeChat === "DUO"
                                   ? undefinedIconDuo.src
                                   : lastSendImg === "" && typeChat === "CHANNEL"
                                   ? undefinedIconChannel.src
                                   : lastSendImg === "" && typeChat === "SAVED"
                                   ? undefinedIconSaved.src
                                   : lastSendImg === "" && typeChat === "GROUP"
                                   ? undefinedIconGroup.src
                                   : undefinedIconDuo.src
                         }
                    ></img>
                    <div
                         style={{
                              background: userIsDarkTheme
                                   ? "rgb(255,255,255,0.4)"
                                   : "rgb(255,255,255)"
                         }}
                         className="messageMenu__itemInfo"
                    >
                         {countMessagesNew >= 1 ? (
                              <span className="messageMenu__itemNewMessage">
                                   {"+" + countMessagesNew}
                              </span>
                         ) : null}
                         <span
                              style={{ color: userIsDarkTheme ? "#ebebeb" : "grey" }}
                              className="messageMenu__itemInfoTitle"
                         >
                              {title}
                         </span>
                         <span
                              style={{ color: userIsDarkTheme ? "#ebebeb" : "grey" }}
                              className="messageMenu__itemInfoUserName"
                         >
                              {lastUserName ? lastUserName + ":  " : ""}
                         </span>
                         <span
                              style={{ color: userIsDarkTheme ? "#ebebeb" : "grey" }}
                              className="messageMenu__itemInfoValue"
                         >
                              {value?.length != 0
                                   ? value?.length > 18
                                        ? value.slice(0, 17) + "..."
                                        : " " + value + messageImage
                                   : "Сообщений нету.."}
                         </span>

                         <span className="messageMenu__itemInfoDate">
                              {lastMessageDate?.slice(16, 21)}
                         </span>
                         <div
                              className="messageMenu__itemInfoCheck"
                              style={{
                                   background: flagCheck
                                        ? `url(${doubleChecked.src}) no-repeat center / cover`
                                        : `url(${checked.src}) no-repeat center / cover`
                              }}
                         ></div>
                    </div>
               </div>
          </Link>
     );
};
export default MessageItem;
