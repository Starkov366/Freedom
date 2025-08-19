"use client";
import React from "react";
import { TiPin } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { RootDispatch } from "@/StateManagment/store";
import { useDispatch } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { UserInterface } from "@/StateManagment/appSlice";
import { IoIosSave } from "react-icons/io";
import { RiReplyFill } from "react-icons/ri";
import {
     setDeleteMessageById,
     setPinnedMessages,
     setAddSavedMessage
} from "@/StateManagment/appSlice";
import { useSelector } from "react-redux";
import { useSendMessageToSavedMutation } from "@/StateManagment/appApi";
import { RootState } from "@/StateManagment/store";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
type typeContext = {
     inputValue?: string;
     top: number;
     left: number;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
     ref: HTMLDivElement | null;
     value: string;
     id: number;
     targetChatId: string;
     author: string;
     handleAddMessage?: (typeEvent?: string, idMessage?: number) => void;
     language: string;
     message: typeBoxMessageItem;
     setReplyMessage?: React.Dispatch<
          React.SetStateAction<{ name: string; value: string; y: number } | undefined>
     >;
     type: string;
     positionY: number;
     userName: string;
};
const ContextMenu = React.forwardRef<HTMLDivElement | null, typeContext>(
     (
          {
               top,
               left,
               value,
               id,
               targetChatId,
               author,
               handleAddMessage,
               inputValue,
               userIsDarkTheme,
               userThemeColorScheme,
               message,
               language,
               setReplyMessage,
               type,
               positionY,
               userName
          },
          ref
     ) => {
          const dispatch: RootDispatch = useDispatch();
          const [sendToSave] = useSendMessageToSavedMutation();
          const handleCopyValueMeassage = (event: React.MouseEvent<HTMLDivElement>) => {
               navigator.clipboard.writeText(value);
               event.currentTarget.style.background = "white";
          };
          const handleDeleteMessageById = (
               event: React.MouseEvent<HTMLDivElement>,
               idChat: string,
               idMessage: number
          ) => {
               event.currentTarget.style.background = "red";
               setTimeout(() => {
                    dispatch(setDeleteMessageById({ idChat: idChat, id: idMessage }));
               }, 2511);
          };
          const handlePinnedMessage = (idChat: string, value: string) => {
               dispatch(setPinnedMessages({ idChat: idChat, value: value }));
          };
          const handleAddSaveMessage = async (
               event: React.MouseEvent<HTMLDivElement>,
               message: typeBoxMessageItem
          ) => {
               let userKey: string = "";
               const users = await fetch(
                    "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                    {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         }
                    }
               );
               const readyUsers = await users.json();
               for (const [key, val] of Object.entries(readyUsers)) {
                    const value = val as UserInterface;
                    if (value.userName === userName) {
                         userKey = key;
                         break;
                    }
               }
               await sendToSave({ userId: userKey, newMesssage: message });
               dispatch(setAddSavedMessage({ message: message }));
               event.currentTarget.style.background = "#39e3d8";
          };
          const handleCreateReplyToMessage = (name: string, value: string, y: number) => {
               setReplyMessage ? setReplyMessage({ name: name, value: value, y: y }) : null;
          };

          return (
               <div
                    ref={ref}
                    style={{
                         top: `${top}px`,
                         left: `${left}px`,
                         background: userIsDarkTheme
                              ? "linear-gradient(135deg, #3d476da1, #28314e9d, #502581a2)"
                              : userThemeColorScheme?.light[10]
                    }}
                    className="chatBox__contextMenu"
               >
                    <div
                         onClick={() => {
                              handlePinnedMessage(targetChatId, value);
                         }}
                         className="chatBox__contextMenuPin"
                    >
                         <TiPin size={30} color="gray"></TiPin>
                         <span className="chatBox__contextMenuPinLabel">
                              {language === "RUSSIAN" ? "Закрепить сообщение" : "Pin message"}
                         </span>
                    </div>
                    <div
                         onClick={(event) => handleCopyValueMeassage(event)}
                         className="chatBox__contextMenuCopy"
                    >
                         <MdContentCopy size={30} color="gray"></MdContentCopy>
                         <span className="chatBox__contextMenuCopyLabel">
                              {language === "RUSSIAN" ? "Копировать сообщение" : "Copy message"}
                         </span>
                    </div>
                    <div
                         onClick={(event) => handleAddSaveMessage(event, message)}
                         className="chatBox__contextMenuSave"
                    >
                         <IoIosSave size={30} color="gray"></IoIosSave>
                         <span className="chatBox__contextMenuSaveLabel">
                              {language === "RUSSIAN"
                                   ? "Отправить в 'Сохрененные' сообщения"
                                   : "Send to saved messages"}
                         </span>
                    </div>
                    <div
                         onClick={(event) => handleDeleteMessageById(event, targetChatId, id)}
                         className="chatBox__contextMenuDelete"
                    >
                         <MdDelete size={30} color="gray"></MdDelete>
                         <span className="chatBox__contextMenuDeleteLabel">
                              {language === "RUSSIAN" ? "Удалить для всех" : "Delete for everyone"}
                         </span>
                    </div>
                    {type !== "CHANNEL" ? (
                         <div
                              onClick={(event) =>
                                   handleCreateReplyToMessage(author, value, positionY)
                              }
                              className="chatBox__contextMenuReply"
                         >
                              <RiReplyFill size={30} color="gray"></RiReplyFill>
                              <span className="chatBox__contextMenuReplyLabel">
                                   {language === "RUSSIAN"
                                        ? "Ответить на сообщение"
                                        : "Reply to message"}
                              </span>
                         </div>
                    ) : null}
                    {userName === author && handleAddMessage ? (
                         <div
                              style={{
                                   backgroundColor: `${inputValue?.length! < 1 ? "Grey" : ""}`
                              }}
                              onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                   if (inputValue?.length) {
                                        inputValue.length >= 1
                                             ? handleAddMessage("edit", id)
                                             : null;
                                   }
                              }}
                              className="chatBox__contextMenuEdit"
                         >
                              <MdOutlineModeEdit size={30} color="black"></MdOutlineModeEdit>
                              {inputValue?.length! >= 1 ? (
                                   <span className="chatBox__contextMenuEditLabel">
                                        {language === "RUSSIAN"
                                             ? "Редактировать сообщения"
                                             : "Edit message"}
                                   </span>
                              ) : (
                                   <span
                                        style={{
                                             color: "red",
                                             background: "black",
                                             borderRadius: "5px"
                                        }}
                                        className="chatBox__contextMenuEditLabel"
                                   >
                                        {language === "RUSSIAN"
                                             ? "Для редактирования напишите новое сообщение не отправляя"
                                             : "Write a message in the text field in advance without sending it"}
                                   </span>
                              )}
                         </div>
                    ) : null}
               </div>
          );
     }
);
export default ContextMenu;
