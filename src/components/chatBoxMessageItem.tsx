import React, { CSSProperties, forwardRef } from "react";
import { RootState } from "@/StateManagment/store";
import { useSelector, useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import { Chats, setUpdateVisibleMessage, setDataByChatId } from "@/StateManagment/appSlice";
import ContextMenu from "./contextMenu";
export type typeBoxMessageItem = {
     value: string;
     date: string;
     author: string;
     checkFlag: boolean;
     isLike: boolean;
     key?: any;
     style?: CSSProperties;
     countView?: number;
     image?: string[] | string;
     setMessages?: React.Dispatch<React.SetStateAction<typeBoxMessageItem[]>>;
     id: number;
     targetChatId?: string;
     isVisible?: boolean;
     targetChat?: Chats;
     handleAddMessage?: (typeEvent?: string, idMessage?: number) => void;
     inputValue?: string;
     isEdit: boolean;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
};

export const ChatBoxMessageItem = forwardRef<HTMLDivElement, typeBoxMessageItem>(
     (
          {
               value,
               date,
               author,
               checkFlag,
               isLike,
               style,
               image,
               setMessages,
               id,
               targetChatId,
               targetChat,
               handleAddMessage,
               inputValue,
               isEdit,
               userIsDarkTheme,
               userThemeColorScheme
          },
          ref: React.ForwardedRef<HTMLDivElement> | null
     ) => {
          const dispatch: RootDispatch = useDispatch();
          const newCss: CSSProperties = {
               ...style,
               height: `${value.length - value.length / 3}px`
          };
          const refContext = React.useRef<HTMLDivElement | null>(null);
          const [isVisible, setIsVisible] = React.useState<boolean>(checkFlag);
          const [isVisibleContext, setIsVisibleContext] = React.useState<boolean>(false);
          const [contextMenuPosition, setContextMenuPosition] = React.useState<{
               top: number;
               left: number;
          }>();
          const user = useSelector((store: RootState) => store.User);
          const handlLikeMessage = () => {
               if (setMessages) {
                    setMessages((prevState: typeBoxMessageItem[]): any => {
                         const newState = prevState.map((mess: typeBoxMessageItem) => {
                              if (mess.id === id) {
                                   return {
                                        value: mess.value,
                                        date: mess.date,
                                        author: mess.author,
                                        checkFlag: true,
                                        isLike: !mess.isLike,
                                        image: mess.image,
                                        id: mess.id
                                   };
                              } else {
                                   return mess;
                              }
                         });
                         return newState;
                    });
               }
          };
          const flag = targetChat?.messages.filter((mess: typeBoxMessageItem) => {
               return mess.id === id;
          });

          React.useEffect(() => {
               if (typeof ref === "function" || !ref || !ref.current) return;

               const watching = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting && !flag?.[0].checkFlag && !isVisible) {
                         dispatch(
                              setUpdateVisibleMessage({ idMessage: id, idChat: targetChatId! })
                         );
                    }
               });

               if (author !== user.userName && !flag?.[0].checkFlag && !isVisible) {
                    watching.observe(ref.current);
               }

               return () => {
                    if (ref.current) {
                         watching.unobserve(ref.current);
                    }
               };
          }, []);
          React.useEffect(() => {
               const timeOpacity0 = setTimeout(() => {
                    refContext.current && refContext
                         ? (refContext.current.style.opacity = "0.8")
                         : null;
               }, 2000);
               const timeOpacity1 = setTimeout(() => {
                    refContext.current && refContext
                         ? (refContext.current.style.opacity = "0.4")
                         : null;
               }, 3000);
               const timeOpacity2 = setTimeout(() => {
                    refContext.current && refContext
                         ? (refContext.current.style.opacity = "0")
                         : null;
               }, 4000);

               const time = setTimeout(() => {
                    setIsVisibleContext(false);
               }, 5000);
               return () => {
                    clearTimeout(time),
                         clearTimeout(timeOpacity1),
                         clearTimeout(timeOpacity2),
                         clearTimeout(timeOpacity0);
               };
          }, [isVisibleContext]);
          console.log(flag, "AAAAXXAXAXAXA");

          return (
               <>
                    <div
                         onContextMenu={(e) => {
                              e.preventDefault();
                              setIsVisibleContext(!isVisibleContext);
                              const left = e.clientX;
                              const top = e.clientY;
                              setContextMenuPosition({
                                   left: left,
                                   top: top
                              });
                         }}
                         ref={ref}
                         className="chatBox__item"
                         style={newCss}
                    >
                         <div className="chatBox__itemLeftInfo">
                              <span className="chatBox__itemAuthor">From: {author}</span>
                              <span className="chatBox__itemValue">
                                   {isEdit
                                        ? value + "                                 [EDIT]"
                                        : value}
                              </span>
                         </div>

                         <span
                              onClick={() => handlLikeMessage()}
                              style={{
                                   left: author === "Starkov" ? "-2%" : "",
                                   rotate: author === "Starkov" ? "300deg" : ""
                              }}
                              className="chatBox__itemLike"
                         >
                              {isLike ? "❤️" : "🤍"}
                         </span>
                         <div className="chatBox__itemRightInfo">
                              <div
                                   className="chatBox__itemRightInfoCheck"
                                   style={{
                                        backgroundColor: checkFlag! ? "#4aff50" : "#666"
                                   }}
                              ></div>
                              <span className="chatBox__itemRightInfoDate">
                                   {date.toString().slice(16, 21)}
                              </span>
                         </div>
                    </div>
                    <div
                         style={{
                              marginLeft: `${user.userName === author ? "45.6vw" : "0px"}  `
                         }}
                         className="chatBox__itemImageArray"
                    >
                         {image?.[0] !== "null" && Array.isArray(image)
                              ? image?.map((img: string, index: number) => {
                                     return (
                                          <a
                                               target="_blank"
                                               title="Картинка"
                                               key={index}
                                               href={img}
                                          >
                                               <img
                                                    key={index}
                                                    className="chatBox__itemImageArrayItem"
                                                    src={img}
                                               ></img>
                                          </a>
                                     );
                                })
                              : null}
                    </div>
                    {isVisibleContext ? (
                         <ContextMenu
                              inputValue={inputValue}
                              handleAddMessage={handleAddMessage}
                              ref={refContext}
                              top={contextMenuPosition ? contextMenuPosition?.top : 0}
                              left={contextMenuPosition ? contextMenuPosition?.left : 0}
                              value={value}
                              id={id}
                              targetChatId={targetChatId!}
                              author={author}
                         ></ContextMenu>
                    ) : null}
               </>
          );
     }
);
