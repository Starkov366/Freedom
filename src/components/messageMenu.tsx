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
     setIsOpen,
     userIsDarkTheme,
     userThemeColorScheme,
     language
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     language: string;
}) => {
     const mess = useSelector((store: RootState) => store.User.userChats);
     const userName = useSelector((store: RootState) => store.User.userName);
     const [chats, setChats] = React.useState<Chats[]>(mess!);
     const [value, setValue] = React.useState<string>("");
     React.useEffect(() => {
          if (JSON.stringify(chats) !== JSON.stringify(mess)) {
               setChats(mess);
          }
     }, [mess]);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[6]
                         : userThemeColorScheme.light[6]
               }}
               className="messageMenu"
          >
               <HeaderMessageMenu
                    userThemeColorScheme={userThemeColorScheme}
                    userIsDarkTheme={userIsDarkTheme}
                    setChats={setChats}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    value={value}
                    setValue={setValue}
                    language={language}
               ></HeaderMessageMenu>
               <div className="messageMenu__inner">
                    {value.length > 0 ? (
                         <span className="messageMenu__innerLabel">Local search:</span>
                    ) : null}

                    {chats.map((item: Chats, index: number) => {
                         const newMessagesCount: number = item?.messages?.reduce((acc, curr) => {
                              if (curr.checkFlag === false && curr.author !== userName) {
                                   return acc + 1;
                              } else {
                                   return acc;
                              }
                         }, 0);
                         return (
                              <MessageItem
                                   typeChat={item.type}
                                   userThemeColorScheme={userThemeColorScheme}
                                   userIsDarkTheme={userIsDarkTheme}
                                   messageImage={item?.info.messageImage}
                                   chatImage={item?.imagesChat}
                                   key={index}
                                   lastMessageDate={item?.info.lastMessageDate}
                                   lastSendImg={item?.info.lastSendImg}
                                   lastUserName={item?.info.lastUserName}
                                   title={item?.info.title}
                                   flagCheck={item?.info.flagCheck}
                                   value={item?.info.value}
                                   chatId={item?.chatId}
                                   countMessagesNew={newMessagesCount}
                              ></MessageItem>
                         );
                    })}
                    {/*
                    {value.length > 0 ? (
                         <span className="messageMenu__innerLabel">Global search:</span>
                    ) : null}
                     */}
               </div>
          </div>
     );
};
export default MessageMenu;
