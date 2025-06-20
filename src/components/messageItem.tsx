import React from "react";
import Link from "next/link";
export type typeMessage = {
     lastSendImg: string;
     title: string;
     lastUserName: string;
     value: string;
     lastMessageDate: string;
     flagCheck: boolean;
     chatId: string;
     chatImage: string;
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
     messageImage
}) => {
     return (
          <Link style={{ textDecoration: "none", color: "black" }} href={chatId}>
               <div className="messageMenu__item">
                    <img className="messageMenu__itemImg" src={lastSendImg}></img>
                    <div className="messageMenu__itemInfo">
                         <span className="messageMenu__itemInfoTitle">{title}</span>
                         <span className="messageMenu__itemInfoUserName">
                              {lastUserName + ":  "}
                         </span>
                         <span className="messageMenu__itemInfoValue">
                              {value?.length > 18
                                   ? value.slice(0, 17) + "..."
                                   : " " + value + messageImage}
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
