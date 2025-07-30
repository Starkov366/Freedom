"use client";
import React from "react";
import saveImg from "../../public/icons/save.png";
type typeSearchItem = {
     index: number;
     name: string;
     value: string;
     date: string;
     img: string;
     searchInput: string;
     authorImage: string;
     y: number;
     handleScroll: (value: number) => void;
};
const SearchPanelItem: React.FC<typeSearchItem> = ({
     img,
     name,
     value,
     date,
     index,
     searchInput,
     authorImage,
     y,
     handleScroll
}) => {
     console.log(authorImage, "DFSDDSDDQWEWQEDWDQEQWDWDQDW", y);

     return (
          <div
               onClick={() => handleScroll(y)}
               key={index}
               className="headerChatBox__searchPanelItem"
          >
               <img
                    src={authorImage !== "" ? authorImage : saveImg.src}
                    className="headerChatBox__searchPanelImg"
               ></img>
               <div className="headerChatBox__searchPanelInfo">
                    <span className="headerChatBox__searchPanelInfoName">{name}: </span>
                    {value.split(" ").map((letter: string, index: number) => {
                         return letter.toUpperCase().includes(searchInput.toUpperCase()) ? (
                              <mark key={index} className="headerChatBox__searchPanelInfoValue">
                                   {letter}
                              </mark>
                         ) : (
                              <span key={index} className="headerChatBox__searchPanelInfoValue">
                                   {letter}
                              </span>
                         );
                    })}
               </div>
               <span className="headerChatBox__searchPanelDate">{date.slice(8, 21)}</span>
          </div>
     );
};
export default SearchPanelItem;
