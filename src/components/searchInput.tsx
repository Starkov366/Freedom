"use client";
import { Chats } from "@/StateManagment/appSlice";
import React, { Fragment } from "react";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import SearchPanelItem from "./searchPanelItem";
type typeInput = { targetChat: Chats };
type searchValue = {
     name: string;
     value: string;
     img: string;
     date: string;
};
const SearchInput: React.FC<typeInput> = ({ targetChat }) => {
     const [searchValue, setSearchValue] = React.useState<searchValue[]>([]);
     const [searchInput, setSearchInput] = React.useState<string>("");
     const handleSearchMessages = (
          event: React.ChangeEvent<HTMLInputElement>,
          targetChat: Chats
     ) => {
          const iValue = event.target.value as string;
          setSearchInput(iValue);
          const newMessagesArray: typeBoxMessageItem[] = targetChat.messages.filter(
               (mess: typeBoxMessageItem) => {
                    return mess.value.toUpperCase().includes(iValue.toUpperCase());
               }
          );
          const result = newMessagesArray.map((mess: typeBoxMessageItem) => {
               return {
                    name: mess.author,
                    value: mess.value,
                    img: mess.author,
                    date: mess.date
               };
          });
          setSearchValue(result);
     };
     return (
          <>
               <input
                    onChange={(event) => handleSearchMessages(event, targetChat)}
                    placeholder="Начать поиск"
                    value={searchInput}
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                         event.target.style.width = "58.5vw";
                         event.target.style.height = "40px";
                         event.target.style.border = "2px solid blue";
                    }}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                         event.target.style.width = "14vw";
                         event.target.style.height = "30px";
                         event.target.style.border = "2px solid gray";
                    }}
                    onBlurCapture={() => setSearchInput("")}
                    className="headerChatBox__searchInput"
               ></input>
               {searchInput.length > 1 ? (
                    <div className="headerChatBox__searchPanel">
                         {searchValue.length >= 1 ? (
                              searchValue.map((item: searchValue, index: number) => {
                                   return (
                                        <SearchPanelItem
                                             searchInput={searchInput}
                                             name={item.name}
                                             value={item.value}
                                             img={item.img}
                                             index={index}
                                             date={item.date}
                                        ></SearchPanelItem>
                                   );
                              })
                         ) : (
                              <p>Сообщений нет.</p>
                         )}
                    </div>
               ) : null}
          </>
     );
};
export default SearchInput;
