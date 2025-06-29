"use client";
import React, { useRef } from "react";
type typeChatBox = {
     fullfield: boolean;
     targetChat: Chats;
     key?: number;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
};
import { ChatBoxMessageItem } from "./chatBoxMessageItem";
import { LuSmilePlus } from "react-icons/lu";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import { ImagePresentation } from "./imagePresentation";
import BigChatInfo from "./bigChatInfo";
import ItemHOC from "./itemHOC";
import { setDataByChatId, setHeaderChatById, setEditMessageById } from "@/StateManagment/appSlice";
import { useDispatch, useSelector } from "react-redux";
import StickerMenu from "./stickersMenu";
import { Chats } from "@/StateManagment/appSlice";

import type { RootDispatch, RootState } from "@/StateManagment/store";

const ChatBox: React.FC<typeChatBox> = ({
     fullfield,
     targetChat,
     userIsDarkTheme,
     userThemeColorScheme
}) => {
     const textArea = useRef<HTMLTextAreaElement | null>(null);
     const dispatch: RootDispatch = useDispatch();
     const user = useSelector((store: RootState) => store.User);
     const inputRef = useRef<HTMLInputElement | null>(null);
     const [chatImg, setChatImg] = React.useState<any[]>([]);
     const handleOpenFS = (event: React.ChangeEvent<HTMLInputElement>) => {
          const img = event.currentTarget.files?.[0];
          const src = URL.createObjectURL(img!);
          setChatImg((prev: any) => [...prev, src]);
     };

     React.useEffect(() => {
          const check = (event: MouseEvent) => {
               const target = event.target as HTMLElement;
               if (
                    !target.closest(".chatBox__stickerMenu") &&
                    !target.closest(".chatBox__bottomPanelSmile")
               ) {
                    setIsStickers(false);
               }
          };
          document.addEventListener("click", check);
          return () => document.removeEventListener("click", check);
     }, []);

     const messageRef = useRef<null | HTMLDivElement>(null);
     const [isStickers, setIsStickers] = React.useState<boolean>(false);
     const [chatMessages, setChatMessages] = React.useState<typeBoxMessageItem[]>(
          targetChat?.messages
     );

     const [inputValue, setInputValue] = React.useState<string>("");
     const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          const value = event.target.value;
          setInputValue(value);
     };
     const handleAddMessage = async (typeEvent?: string, idMessage?: number) => {
          if (typeEvent === "add" || typeEvent === undefined) {
               inputValue.length > 0 || (inputValue.length === 0 && chatImg.length >= 1)
                    ? (setChatMessages((prev: typeBoxMessageItem[]): typeBoxMessageItem[] => {
                           const newObject: typeBoxMessageItem = {
                                value: inputValue,
                                date: new Date().toString(),
                                author: "Starkov",
                                checkFlag: false,
                                isLike: false,
                                image: chatImg,
                                id: Math.floor(Math.random() * 10000),
                                isEdit: false
                           };
                           const array: typeBoxMessageItem[] = [...prev, newObject];
                           return array;
                      }),
                      dispatch(
                           setHeaderChatById({
                                lastMessageDate: new Date().toString(),
                                lastSendImg:
                                     targetChat.type === "DUO"
                                          ? user.userImage
                                          : targetChat.imagesChat,
                                lastUserName: user.userName,
                                title: targetChat.info.title,
                                flagCheck: false,
                                chatId: targetChat.chatId,
                                value: inputValue,
                                chatImage: "#",
                                chatDescription: "Описание чатика...",
                                chatName: targetChat.info.chatName,
                                messageImage: chatImg.length >= 1 ? "[IMAGE]" : ""
                           })
                      ))
                    : null;
          } else if (typeEvent === "edit") {
               if (!textArea || !textArea.current) {
                    return;
               }
               textArea.current.style.background = "gray";
               let flag: boolean = inputValue.length === 0;

               while (inputValue.length === 0) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
               }
               dispatch(
                    setEditMessageById({
                         IdChat: targetChat.chatId,
                         idMessage: idMessage!,
                         newMessageValue: inputValue
                    })
               );
          }
          setInputValue("");
          setChatImg([]);
     };
     const container = React.useRef<null | HTMLDivElement>(null);
     React.useEffect(() => {
          if (container.current) {
               container.current.scrollTop = container.current.scrollHeight - 100;
          }
     }, [chatMessages]);
     React.useEffect(() => {
          if (JSON.stringify(targetChat?.messages) !== JSON.stringify(chatMessages)) {
               dispatch(
                    setDataByChatId({
                         ID: targetChat.chatId,
                         newChat: { ...targetChat, messages: chatMessages }
                    })
               );
          }
     }, [chatMessages]);
     /*
     React.useEffect(() => {
          
          if (JSON.stringify(chatMessages) !== JSON.stringify(targetChat?.messages)) {
               setChatMessages(targetChat?.messages);
          }
     }, [JSON.stringify(targetChat?.messages)]);
     */

     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[4]
                         : userThemeColorScheme.light[4]
               }}
               className="chatBox"
          >
               <div ref={container} className="chatBox__inner">
                    {chatMessages?.length >= 1 ? (
                         chatMessages?.map((item, index) => {
                              const DynamicMessage = ItemHOC({
                                   WrappedComponent: ChatBoxMessageItem,
                                   flagMe: item.author === "Starkov" ? true : false,
                                   userIsDarkTheme: userIsDarkTheme,
                                   userThemeColorScheme: userThemeColorScheme
                              });
                              return (
                                   <DynamicMessage
                                        userIsDarkTheme={user.userIsDarkTheme}
                                        userThemeColorScheme={user.userThemeColorShceme}
                                        handleAddMessage={handleAddMessage}
                                        ref={messageRef}
                                        value={item?.value}
                                        date={item?.date}
                                        author={item?.author}
                                        isLike={item?.isLike}
                                        checkFlag={item?.checkFlag}
                                        targetChat={targetChat}
                                        key={(index * Math.random()).toString() + item.isEdit}
                                        image={item?.image}
                                        setMessages={setChatMessages}
                                        id={item?.id}
                                        isEdit={item.isEdit}
                                        inputValue={inputValue}
                                        targetChatId={targetChat.chatId}
                                   ></DynamicMessage>
                              );
                         })
                    ) : fullfield ? (
                         <div className="chatBox__nullMessage">Start chatting</div>
                    ) : null}
               </div>

               <div className="chatBox__payload">
                    {chatImg.map((item: string, index) => {
                         return <ImagePresentation key={index} img={item}></ImagePresentation>;
                    })}
               </div>
               <input
                    type="file"
                    onChange={(event) => handleOpenFS(event)}
                    style={{ visibility: "hidden" }}
                    className="a"
                    ref={inputRef}
               ></input>
               <div
                    style={{
                         visibility: fullfield ? "visible" : "hidden",
                         background: userIsDarkTheme
                              ? userThemeColorScheme.dark[0]
                              : userThemeColorScheme.light[0]
                    }}
                    className="chatBox__bottomPanel"
               >
                    <button
                         onClick={() => {
                              inputRef.current?.click();
                         }}
                         className="chatBox__bottomPanelFile"
                    ></button>
                    <button
                         onClick={() => setIsStickers(!isStickers)}
                         className="chatBox__bottomPanelSmile"
                    ></button>
                    <textarea
                         ref={textArea}
                         onChange={(event) => handleChangeMessage(event)}
                         value={inputValue}
                         className="chatBox__bottomPanelText"
                         placeholder="Напишите что-то..."
                         onKeyDown={(event: React.KeyboardEvent) => {
                              if (event.key === "Enter") {
                                   event.preventDefault();
                                   handleAddMessage();
                              }
                         }}
                    ></textarea>
                    <input
                         onClick={(event) => handleAddMessage("add")}
                         className="chatBox__bottomPanelSendBtn"
                         type="button"
                    ></input>
                    {isStickers ? (
                         <StickerMenu
                              userIsDarkTheme={user.userIsDarkTheme}
                              userThemeColorScheme={user.userThemeColorShceme}
                              setInputValue={setInputValue}
                         ></StickerMenu>
                    ) : null}
               </div>
          </div>
     );
};
export default ChatBox;
