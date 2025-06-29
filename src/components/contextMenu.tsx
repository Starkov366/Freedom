"use client";
import React from "react";
import { TiPin } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { RootDispatch } from "@/StateManagment/store";
import { useDispatch } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { setDeleteMessageById, setPinnedMessages } from "@/StateManagment/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/StateManagment/store";
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
               userThemeColorScheme
          },
          ref
     ) => {
          const dispatch: RootDispatch = useDispatch();
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
          const userName = useSelector((store: RootState) => store.User.userName);
          const tt = "edit";
          return (
               <div
                    ref={ref}
                    style={{
                         top: `${top}px`,
                         left: `${left}px`,
                         background: userIsDarkTheme
                              ? "linear-gradient(135deg, #3d476da1, #28314e9d, #502581a2)"
                              : userThemeColorScheme?.light[1]
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
                         <span className="chatBox__contextMenuPinLabel">Pin message</span>
                    </div>
                    <div
                         onClick={(event) => handleCopyValueMeassage(event)}
                         className="chatBox__contextMenuCopy"
                    >
                         <MdContentCopy size={30} color="gray"></MdContentCopy>
                         <span className="chatBox__contextMenuCopyLabel">Copy message</span>
                    </div>
                    <div
                         onClick={(event) => handleDeleteMessageById(event, targetChatId, id)}
                         className="chatBox__contextMenuDelete"
                    >
                         <MdDelete size={30} color="gray"></MdDelete>
                         <span className="chatBox__contextMenuDeleteLabel">
                              Delete for everyone
                         </span>
                    </div>
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
                              <MdOutlineModeEdit size={30} color="gray"></MdOutlineModeEdit>
                              {inputValue?.length! >= 1 ? (
                                   <span className="chatBox__contextMenuEditLabel">
                                        Edit message
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
                                        Write in textbox value to EDIT
                                   </span>
                              )}
                         </div>
                    ) : null}
               </div>
          );
     }
);
export default ContextMenu;
