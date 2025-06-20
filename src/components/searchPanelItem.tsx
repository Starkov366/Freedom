"use client";
import React from "react";
type typeSearchItem = {
     index: number;
     name: string;
     value: string;
     date: string;
     img: string;
};
const SearchPanelItem: React.FC<typeSearchItem> = ({ img, name, value, date, index }) => {
     return (
          <div key={index} className="headerChatBox__searchPanelItem">
               <img
                    src={
                         "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg"
                    }
                    className="headerChatBox__searchPanelImg"
               ></img>
               <div className="headerChatBox__searchPanelInfo">
                    <span className="headerChatBox__searchPanelInfoName">{name}</span>
                    <span className="headerChatBox__searchPanelInfoValue">{value}</span>
               </div>
               <span className="headerChatBox__searchPanelDate">{date.slice(8, 21)}</span>
          </div>
     );
};
export default SearchPanelItem;
