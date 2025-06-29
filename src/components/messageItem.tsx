"use client";
import React from "react";
import Link from "next/link";
import undefinedIcon from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
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
     messageImage
}) => {
     return (
          <Link style={{ textDecoration: "none", color: "black" }} href={chatId}>
               <div
                    style={{
                         color: userIsDarkTheme ? "white" : "black"
                    }}
                    className="messageMenu__item"
               >
                    <img
                         className="messageMenu__itemImg"
                         src={lastSendImg ?? undefinedIcon.src}
                    ></img>
                    <div
                         style={{
                              background: userIsDarkTheme
                                   ? "rgb(255,255,255,0.4)"
                                   : "rgb(255,255,255)"
                         }}
                         className="messageMenu__itemInfo"
                    >
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
                              {value.length != 0
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
                              style={{ backgroundColor: flagCheck ? "#4f0" : "#c0c25b" }}
                         ></div>
                    </div>
               </div>
          </Link>
     );
};
export default MessageItem;
