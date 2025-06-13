"use client";
import React, { useRef } from "react";
type typeChatBox = { fullfield: boolean };
import { ChatBoxMessageItem } from "./chatBoxMessageItem";
import { LuSmilePlus } from "react-icons/lu";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import { ImagePresentation } from "./imagePresentation";
import ItemHOC from "./itemHOC";

import StickerMenu from "./stickersMenu";

const ChatBox: React.FC<typeChatBox> = ({ fullfield }) => {
     const inputRef = useRef<HTMLInputElement | null>(null);
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

     const [chatImg, setChatImg] = React.useState<any[]>([]);
     const [isStickers, setIsStickers] = React.useState<boolean>(false);
     const [chatMessages, setChatMessages] = React.useState<typeBoxMessageItem[]>([]);

     const [inputValue, setInputValue] = React.useState<string>("");
     const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          const value = event.target.value;
          setInputValue(value);
     };
     const handleAddMessage = (event?: React.MouseEvent<HTMLInputElement>) => {
          inputValue.length > 0
               ? setChatMessages((prevState: typeBoxMessageItem[]) => [
                      ...prevState,
                      {
                           value: inputValue,
                           date: new Date(),
                           author: "Starkov",
                           checkFlag: false,
                           isLike: false
                      }
                 ])
               : null;
          setInputValue("");
     };
     const container = React.useRef<null | HTMLDivElement>(null);
     React.useEffect(() => {
          if (container.current) {
               container.current.scrollTop = container.current.scrollHeight - 100;
          }
     }, [chatMessages]);
     return (
          <div className="chatBox">
               <div ref={container} className="chatBox__inner">
                    {chatMessages.map((item, index) => {
                         const DynamicMessage = ItemHOC({
                              WrappedComponent: ChatBoxMessageItem,
                              flagMe: item.author === "Starkov" ? true : false
                         });
                         return (
                              <DynamicMessage
                                   value={item.value}
                                   date={item.date}
                                   author={item.author}
                                   isLike={item.isLike}
                                   checkFlag={item.checkFlag}
                                   key={index}
                              ></DynamicMessage>
                         );
                    })}
               </div>

               <input
                    type="file"
                    onChange={(event) => handleOpenFS(event)}
                    style={{ visibility: "hidden" }}
                    className="a"
                    ref={inputRef}
               ></input>
               <div className={"chatBox__payload"}>
                    {chatImg.map((item: string, index) => {
                         return <ImagePresentation key={index} img={item}></ImagePresentation>;
                    })}
               </div>
               <div
                    style={{ visibility: fullfield ? "visible" : "hidden" }}
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
                         onClick={(event) => handleAddMessage(event)}
                         className="chatBox__bottomPanelSendBtn"
                         type="button"
                    ></input>
                    {isStickers ? <StickerMenu setInputValue={setInputValue}></StickerMenu> : null}
               </div>
          </div>
     );
};
export default ChatBox;
