"use client";
import React from "react";
import HeaderMessageMenu from "./headerMessageMenu";
import img from "../../public/icons/background.png";
import MessageItem from "../components/messageItem";
import { typeMessage } from "../components/messageItem";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagment/store";
import { Chats } from "@/StateManagment/appSlice";
const MessageMenu = ({
     isOpen,
     setIsOpen
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
     const mess = useSelector((store: RootState) => store.User.userChats);

     return (
          <div className="messageMenu">
               <HeaderMessageMenu isOpen={isOpen} setIsOpen={setIsOpen}></HeaderMessageMenu>
               <div className="messageMenu__inner">
                    {mess.map((item: Chats, index: number) => {
                         return (
                              <MessageItem
                                   key={index}
                                   lastMessageDate={item.info.lastMessageDate}
                                   lastSendImg={item.info.lastSendImg}
                                   lastUserName={item.info.lastUserName}
                                   title={item.info.title}
                                   flagCheck={item.info.flagCheck}
                                   value={item.info.value}
                                   chatId={item.chatId}
                              ></MessageItem>
                         );
                    })}
               </div>
          </div>
     );
};
export default MessageMenu;
