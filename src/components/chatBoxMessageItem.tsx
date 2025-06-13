import React, { CSSProperties } from "react";

export type typeBoxMessageItem = {
     value: string;
     date: Date;
     author: string;
     checkFlag: boolean;
     isLike: boolean;
     key?: any;
     style?: CSSProperties;
     countView?: number;
};

export const ChatBoxMessageItem: React.FC<typeBoxMessageItem> = ({
     value,
     date,
     author,
     checkFlag,
     isLike,
     style
}) => {
     return (
          <div className="chatBox__item" style={style}>
               <div className="chatBox__itemLeftInfo">
                    <span className="chatBox__itemAuthor">From: {author}</span>
                    <span className="chatBox__itemValue">{value}</span>
               </div>

               <span
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
                         {date.toLocaleString().slice(12, 21)}
                    </span>
               </div>
          </div>
     );
};
