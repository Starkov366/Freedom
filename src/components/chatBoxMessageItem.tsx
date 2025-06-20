import React, { CSSProperties } from "react";
import { RootState } from "@/StateManagment/store";
import { useSelector } from "react-redux";
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
};

export const ChatBoxMessageItem: React.FC<typeBoxMessageItem> = ({
     value,
     date,
     author,
     checkFlag,
     isLike,
     style,
     image,
     setMessages,
     id
}) => {
     const newCss: CSSProperties = { ...style, height: `${value.length - value.length / 3}px` };
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
     return (
          <>
               <div className="chatBox__item" style={newCss}>
                    <div className="chatBox__itemLeftInfo">
                         <span className="chatBox__itemAuthor">From: {author}</span>
                         <span className="chatBox__itemValue">{value}</span>
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
                              style={{ backgroundColor: checkFlag ? "#4aff50" : "#666" }}
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
                                     <a target="_blank" title="Картинка" key={index} href={img}>
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
          </>
     );
};
