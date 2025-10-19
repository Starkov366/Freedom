"use client";
import React, { RefObject, useRef } from "react";
type typeChatBox = {
     fullfield: boolean;
     targetChat: Chats;
     key?: number;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     language: string;
     container: RefObject<HTMLDivElement | null>;
};
import InsertYVideo from "./insertYVideo";
import { ChatBoxMessageItem } from "./chatBoxMessageItem";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import { ImagePresentation } from "./imagePresentation";
import { UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import { roles } from "@/StateManagment/appSlice";
import ItemHOC from "./itemHOC";
import { setDataByChatId, setHeaderChatById, setEditMessageById } from "@/StateManagment/appSlice";
import { useDispatch, useSelector } from "react-redux";
import StickerMenu from "./stickersMenu";
import { Chats } from "@/StateManagment/appSlice";
import ReplyBottomPanel from "./replyBottomPanel";
import type { RootDispatch, RootState } from "@/StateManagment/store";
import YouTubeVideo from "./youtubeVideo";
const ChatBox: React.FC<typeChatBox> = ({
     fullfield,
     targetChat,
     userIsDarkTheme,
     userThemeColorScheme,
     language,
     container
}) => {
     const textArea = useRef<HTMLTextAreaElement | null>(null);
     const dispatch: RootDispatch = useDispatch();
     const user = useSelector((store: RootState) => store.User);
     const inputRef = useRef<HTMLInputElement | null>(null);
     const [chatImg, setChatImg] = React.useState<any[]>([]);
     const [isYouTubeVideo, setIsYouTubeVideo] = React.useState<string>("");
     const [isOpenYouTubeVideo, setIsOpenYouTubeVideo] = React.useState<boolean>(false);
     const handleOpenFS = async (event: React.ChangeEvent<HTMLInputElement>) => {
          const img = event.currentTarget.files?.[0];
          const src = URL.createObjectURL(img!);
          const formData = new FormData();
          formData.append("image", img!);
          const res = await fetch(
               `https://api.imgbb.com/1/upload?key=2322e95855d517dcba7efc53b86e7f6b`,
               {
                    method: "POST",
                    body: formData
               }
          );
          const ready = await res.json();
          const link = ready.data.url as string;
          setChatImg((prev: any) => [...prev, link]);
     };
     const [replyMessage, setReplyMessage] = React.useState<
          | {
                 name: string;
                 value: string;
                 y: number;
            }
          | undefined
     >(undefined);

     const checkYourRole = (): boolean => {
          if (Array.isArray(targetChat?.joinUsers) && targetChat.joinUsers !== undefined) {
               const admin: UserInterfaceForJoinUsers | undefined = targetChat.joinUsers.find(
                    (contact: UserInterfaceForJoinUsers) => {
                         return contact.userRole === roles.admin;
                    }
               );
               if (!admin) return false;

               return admin.userId === user.userId;
          }
          return false;
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
     const [isModalVideo, setIsModalVideo] = React.useState<boolean>(false);
     const [chatMessages, setChatMessages] = React.useState<typeBoxMessageItem[]>(
          targetChat?.messages
     );

     const [inputValue, setInputValue] = React.useState<string>("");
     const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          const value = event.target.value;
          setInputValue(value);
     };
     const handleAddMessage = async (typeEvent?: string, idMessage?: number, URL?: string) => {
          if (typeEvent === "add" || typeEvent === undefined) {
               inputValue.length > 0 || (inputValue.length === 0 && chatImg.length >= 1)
                    ? (setChatMessages((prev: typeBoxMessageItem[]): typeBoxMessageItem[] => {
                           const newObject: typeBoxMessageItem = {
                                value: inputValue,
                                date: new Date().toString(),
                                author: user.userName,
                                checkFlag: false,
                                isLike: false,
                                image: chatImg,
                                id: Math.floor(Math.random() * 10000),
                                isEdit: false,
                                type: targetChat.type,
                                countView: 0,
                                reply: replyMessage ? replyMessage : null
                           };
                           let array: typeBoxMessageItem[];
                           if (prev?.length) {
                                array = [...prev, newObject];
                           } else {
                                array = [newObject];
                           }
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
                      ),
                      setReplyMessage(undefined))
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
          } else if (typeEvent === "VIDEO") {
               setChatMessages((prev: typeBoxMessageItem[]): typeBoxMessageItem[] => {
                    const newObject: typeBoxMessageItem = {
                         value: URL!,
                         date: new Date().toString(),
                         author: user.userName,
                         checkFlag: false,
                         isLike: false,
                         image: chatImg,
                         id: Math.floor(Math.random() * 10000),
                         isEdit: false,
                         type: targetChat.type,
                         countView: 0,
                         reply: replyMessage ? replyMessage : null
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
                              value: "[VIDEO]",
                              chatImage: "#",
                              chatDescription: "Описание чатика...",
                              chatName: targetChat.info.chatName,
                              messageImage: chatImg.length >= 1 ? "[IMAGE]" : ""
                         })
                    );
          }
          setInputValue("");
          setChatImg([]);
     };

     const handleScrollToMessage = (value: number) => {
          if (container.current && value !== null) {
               container.current.scrollTop = value;
          }
     };
     React.useEffect(() => {
          if (container.current) {
               container.current.scrollTop = container.current.scrollHeight;
          }
          console.log("Сообщения изменены..");
     }, [chatMessages]);

     const syncDirection = useRef<"none" | "reduxToLocal" | "localToRedux">("none");

     React.useEffect(() => {
          const fromRedux = targetChat?.messages;
          if (JSON.stringify(fromRedux) !== JSON.stringify(chatMessages)) {
               syncDirection.current = "reduxToLocal";
               setChatMessages(fromRedux);
          }
     }, [JSON.stringify(targetChat?.messages)]);

     React.useEffect(() => {
          if (syncDirection.current === "reduxToLocal") {
               syncDirection.current = "none";
               return;
          }

          if (JSON.stringify(chatMessages) !== JSON.stringify(targetChat?.messages)) {
               syncDirection.current = "localToRedux";
               dispatch(
                    setDataByChatId({
                         ID: targetChat!.chatId,
                         newChat: { ...targetChat!, messages: chatMessages }
                    })
               );
          }
     }, [chatMessages]);
     React.useEffect(() => {
          if (!textArea) {
               return;
          }
          textArea.current?.focus();
     }, []);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[4]
                         : userThemeColorScheme.light[4]
               }}
               className="chatBox"
          >
               <div
                    ref={container}
                    style={{ marginBottom: targetChat?.type === "CHANNEL" ? "30px" : "0px" }}
                    className="chatBox__inner"
               >
                    {chatMessages?.length >= 1 ? (
                         chatMessages?.map((item, index) => {
                              const DynamicMessage = ItemHOC({
                                   WrappedComponent: ChatBoxMessageItem,
                                   flagMe: item.author === user.userName ? true : false,
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
                                        targetChatId={targetChat?.chatId}
                                        type={targetChat?.type}
                                        usersLikes={item.usersLikes}
                                        countView={item.countView}
                                        language={language}
                                        setReplyMessage={setReplyMessage}
                                        reply={item.reply}
                                        positionY={item.positionY}
                                        handleScroll={handleScrollToMessage}
                                        isYouTubeVideo={isYouTubeVideo}
                                        setIsYouTubeVideo={setIsYouTubeVideo}
                                        isOpenYouTubeVideo={isOpenYouTubeVideo}
                                        setIsOpenYouTubeVideo={setIsOpenYouTubeVideo}
                                   ></DynamicMessage>
                              );
                         })
                    ) : fullfield ? (
                         <div className="chatBox__nullMessage">
                              {language === "RUSSIAN" ? "Начни общаться" : "Start chatting"}
                         </div>
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
               {checkYourRole() ||
               targetChat?.type === "DUO" ||
               targetChat?.type === "GROUP" ||
               targetChat?.type === "SAVED" ? (
                    <div
                         style={{
                              visibility: fullfield ? "visible" : "hidden",
                              background: userIsDarkTheme
                                   ? userThemeColorScheme.dark[0]
                                   : userThemeColorScheme.light[0]
                         }}
                         className="chatBox__bottomPanel"
                    >
                         {replyMessage?.name && replyMessage?.value ? (
                              <ReplyBottomPanel
                                   replyMessage={replyMessage}
                                   setReplyMessage={setReplyMessage}
                              ></ReplyBottomPanel>
                         ) : null}
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
                         <button
                              onClick={() => setIsModalVideo((prev) => !prev)}
                              className="chatBox__bottomPanelShareVideo"
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
                         {isModalVideo ? (
                              <InsertYVideo
                                   userIsDarkTheme={userIsDarkTheme}
                                   userThemeColorScheme={userThemeColorScheme}
                                   setIsModalOpen={setIsModalVideo}
                                   handleAddMessage={handleAddMessage}
                              ></InsertYVideo>
                         ) : null}
                         {isOpenYouTubeVideo ? (
                              <YouTubeVideo
                                   setIsOpenYouTubeVideo={setIsOpenYouTubeVideo}
                                   isYouTubeVideo={isYouTubeVideo}
                              ></YouTubeVideo>
                         ) : null}
                    </div>
               ) : null}
          </div>
     );
};
export default ChatBox;
