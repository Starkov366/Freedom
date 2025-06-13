import React from "react";
import Link from "next/link";
export type typeMessage = {
     lastSendImg: string;
     title: string;
     lastUserName: string;
     value: string;
     lastMessageDate: Date;
     flagCheck: boolean;
     chatId: string;
};
const MessageItem: React.FC<typeMessage> = ({
     lastSendImg,
     title,
     lastUserName,
     value,
     lastMessageDate,
     flagCheck,
     chatId
}) => {
     return (
          <div className="messageMenu__item">
               <img className="messageMenu__itemImg" src={lastSendImg}></img>
               <div className="messageMenu__itemInfo">
                    <Link style={{ textDecoration: "none" }} href={chatId}>
                         <span className="messageMenu__itemInfoTitle">{title}</span>
                         <span className="messageMenu__itemInfoUserName">{lastUserName}: </span>
                         <span className="messageMenu__itemInfoValue">{value}</span>
                         <span className="messageMenu__itemInfoDate">{11}</span>
                         <div
                              className="messageMenu__itemInfoCheck"
                              style={{ backgroundColor: flagCheck ? "#4f0" : "#c0c25b" }}
                         ></div>
                    </Link>
               </div>
          </div>
     );
};
export default MessageItem;
