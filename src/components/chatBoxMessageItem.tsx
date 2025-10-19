import React, { CSSProperties, forwardRef, JSX } from "react";
import { RootState } from "@/StateManagment/store";
import { useSelector, useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import { GrYoutube } from "react-icons/gr";
import checked from "../../public/icons/double-tick_8206388.png";
import doubleChecked from "../../public/icons/tick_17342241.png";
import { IoEye } from "react-icons/io5";
import {
     Chats,
     setUpdateVisibleMessage,
     setDataByChatId,
     setLikeMessage,
     setPositionYToMessage
} from "@/StateManagment/appSlice";
import ContextMenu from "./contextMenu";
import ReplyMessage from "./replyMessage";

type UserLikes = {
     userId: string;
};
export type typeBoxMessageItem = {
     value: string;
     date: string;
     author: string;
     checkFlag: boolean;
     isLike: boolean;
     key?: any;
     style?: CSSProperties;
     countView: number;
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
     type: string;
     usersLikes?: UserLikes[];
     language?: string;
     setReplyMessage?: React.Dispatch<
          React.SetStateAction<{ name: string; value: string; y: number } | undefined>
     >;
     reply?: { name: string; value: string; y: number } | null;
     positionY?: number;
     handleScroll?: (value: number) => void;
     isYouTubeVideo?: string;
     setIsYouTubeVideo?: React.Dispatch<React.SetStateAction<string>>;
     isOpenYouTubeVideo?: boolean;
     setIsOpenYouTubeVideo?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatBoxMessageItem = forwardRef<HTMLDivElement, typeBoxMessageItem>(
     (
          {
               value,
               countView,
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
               userThemeColorScheme,
               type,
               usersLikes,
               language,
               setReplyMessage,
               reply,
               positionY,
               handleScroll,
               isYouTubeVideo,
               setIsYouTubeVideo,
               isOpenYouTubeVideo,
               setIsOpenYouTubeVideo
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
          const [isLikeM, setIsLikeM] = React.useState<boolean>(false);
          const [contextMenuPosition, setContextMenuPosition] = React.useState<{
               top: number;
               left: number;
          }>();
          const user = useSelector((store: RootState) => store.User);
          const handlLikeMessage = () => {
               let isFirst: boolean = true;
               usersLikes?.forEach((users: { userId: string }) => {
                    if (users.userId === user.userId) {
                         isFirst = false;
                    }
               });
               isFirst
                    ? dispatch(
                           setLikeMessage({
                                idChat: targetChatId!,
                                idMessage: id,
                                idUser: user.userId
                           })
                      )
                    : null;
          };
          const flag = targetChat?.messages?.filter((mess: typeBoxMessageItem) => {
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

               if (author !== user.userName && !flag?.[0]?.checkFlag && !isVisible) {
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
               }, 3000);
               const timeOpacity1 = setTimeout(() => {
                    refContext.current && refContext
                         ? (refContext.current.style.opacity = "0.4")
                         : null;
               }, 4000);
               const timeOpacity2 = setTimeout(() => {
                    refContext.current && refContext
                         ? (refContext.current.style.opacity = "0")
                         : null;
               }, 5000);

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
          const handleIsLink = (value: string): JSX.Element[] => {
               const wordArray: string[] = value.split(" ");

               return wordArray.map((word: string, index: number) => {
                    return word.startsWith("https://") ? (
                         !word.includes("https://www.youtube.com") ? (
                              <a key={index} style={{ color: "green" }} href={word}>
                                   {word + " "}
                              </a>
                         ) : (
                              <span key={index}></span>
                         )
                    ) : (
                         <span key={index}>{word + " "}</span>
                    );
               });
          };
          const mess = {
               value: value,
               date: date,
               author: author,
               checkFlag: checkFlag,
               isLike: isLike,

               style: style,
               countView: countView,
               image: image,
               isYouTubeVideo: isYouTubeVideo,
               setIsYouTubeVideo: setIsYouTubeVideo,
               id: id,
               targetChatId: targetChatId,
               isVisible: isVisible,
               targetChat: targetChat,

               inputValue: inputValue,
               isEdit: isEdit,
               userIsDarkTheme: userIsDarkTheme,
               userThemeColorScheme: userThemeColorScheme,
               type: type,
               usersLikes: usersLikes
          };
          const width: number = Number(document.querySelector(".chatBox__item")?.clientWidth);

          React.useEffect(() => {
               const el = (ref as React.RefObject<HTMLDivElement>)?.current;
               if (el && targetChatId && positionY === undefined) {
                    const y = el.offsetTop;
                    dispatch(
                         setPositionYToMessage({
                              y: y,
                              idChat: targetChatId,
                              idMessage: id
                         })
                    );
               }
               value.split(" ").map((word: string) => {
                    if (word.includes("https://www.youtube.com")) {
                         //https://www.youtube.com/watch?v=0trmyT3O2B0
                         const srcForPlayer: string =
                              word.slice(0, 24) + "embed/" + word.slice(32, word.length);
                    }
               });
          }, []);

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
                         {reply ? (
                              <ReplyMessage
                                   handleScroll={handleScroll}
                                   reply={reply}
                              ></ReplyMessage>
                         ) : null}
                         <div className="chatBox__itemLeftInfo">
                              <span className="chatBox__itemAuthor">
                                   {" "}
                                   {language === "RUSSIAN" ? "От: " : "From: "} {author}
                              </span>
                              <div className="chatBox__itemValue">
                                   {isEdit
                                        ? value + "                                 [EDIT]"
                                        : handleIsLink(value)}
                              </div>
                         </div>
                         {value
                              .split(" ")
                              .some((word: string) => word.includes("https://www.youtube.com")) && (
                              <div
                                   className="chatBox__itemYouTube"
                                   onClick={() => {
                                        setIsOpenYouTubeVideo!((prev) => !prev);
                                        value.split(" ").forEach((word: string) => {
                                             if (word.includes("https://www.youtube.com")) {
                                                  const srcForPlayer =
                                                       word.slice(0, 24) +
                                                       "embed/" +
                                                       word.slice(32);

                                                  setIsYouTubeVideo!(srcForPlayer);
                                             }
                                        });
                                   }}
                              >
                                   <GrYoutube size={70} color="red"></GrYoutube>
                              </div>
                         )}
                         <div className="chatBox__itemRightInfo">
                              <div
                                   onClick={() => handlLikeMessage()}
                                   style={{
                                        left: author === user.userName ? "1%" : ""
                                   }}
                                   className="chatBox__itemLike"
                              >
                                   <span className="chatBox__itemRightInfoDate">
                                        {date.toString().slice(16, 21)}
                                   </span>
                                   <p style={{ fontSize: "14px" }}>{isLike ? "❤️" : "🤍"} </p>
                                   <p> {usersLikes === undefined ? "0" : usersLikes.length}</p>
                              </div>

                              {type !== "CHANNEL" ? (
                                   <>
                                        <div
                                             className="chatBox__itemRightInfoCheck"
                                             style={{
                                                  background: checkFlag
                                                       ? `url(${checked.src}) no-repeat center / cover`
                                                       : `url(${doubleChecked.src}) no-repeat center / cover`,
                                                  width: "30px",
                                                  height: "20px",

                                                  marginRight: "-105px",
                                                  marginTop: "5px"
                                             }}
                                        ></div>
                                   </>
                              ) : (
                                   <div className="chatBox__itemRightInfoCheckChannel">
                                        <IoEye size={20} color="grey"></IoEye>
                                        <span className="chatBox__itemRightInfoCheckChannelValue">
                                             {countView}
                                        </span>
                                   </div>
                              )}
                         </div>
                    </div>

                    <div
                         style={{
                              marginLeft: `${user.userName === author ? "63%" : "0px"}  `
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
                                                    style={{ width: `${width}px` }}
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
                              message={mess}
                              setReplyMessage={setReplyMessage}
                              language={language!}
                              type={type}
                              userIsDarkTheme={userIsDarkTheme}
                              userThemeColorScheme={userThemeColorScheme}
                              positionY={positionY!}
                              userName={user.userName}
                         ></ContextMenu>
                    ) : null}
               </>
          );
     }
);
