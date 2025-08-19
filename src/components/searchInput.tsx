"use client";
import { Chats, UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import React, { RefObject } from "react";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import SearchPanelItem from "./searchPanelItem";

type typeInput = {
     targetChat: Chats;
     ownUserImage: string;
     language: string;
     container: RefObject<HTMLDivElement | null>;
};
type searchValue = {
     name: string;
     value: string;
     img: string;
     date: string;
     authorImage: string;
     y: number;
};
const SearchInput: React.FC<typeInput> = ({ targetChat, ownUserImage, language, container }) => {
     const [searchValue, setSearchValue] = React.useState<searchValue[]>([]);
     const [searchInput, setSearchInput] = React.useState<string>("");
     const handleSearchMessages = (
          event: React.ChangeEvent<HTMLInputElement>,
          targetChat: Chats
     ) => {
          const iValue = event.target.value as string;
          setSearchInput(iValue);
          const newMessagesArray: typeBoxMessageItem[] = targetChat?.messages?.filter(
               (mess: typeBoxMessageItem) => {
                    return mess.value.toUpperCase().includes(iValue.toUpperCase());
               }
          );
          const result = newMessagesArray?.map((mess: typeBoxMessageItem) => {
               const authorImage: UserInterfaceForJoinUsers[] | undefined | string =
                    targetChat.type !== "DUO" &&
                    targetChat.type !== "SAVED" &&
                    targetChat.joinUsers !== undefined
                         ? targetChat.joinUsers.filter(
                                (user: UserInterfaceForJoinUsers) => user.userName === mess.author
                           )
                         : mess.author === targetChat.joinUsers?.one.userName &&
                           targetChat.type === "DUO"
                         ? targetChat.joinUsers?.one.userImage
                         : targetChat.type === "SAVED"
                         ? ""
                         : targetChat.joinUsers?.two.userImage;

               return {
                    name: mess.author,
                    value: mess.value,
                    img: "",
                    date: mess.date,
                    authorImage: Array.isArray(authorImage)
                         ? authorImage?.[0]?.userImage
                         : authorImage!,
                    y: mess.positionY!
               };
          });
          setSearchValue(result);
     };

     const handleScrollToMessage = (value: number) => {
          setTimeout(() => {
               if (container.current) {
                    container.current.scrollTo({ top: value, behavior: "smooth" });
               }
          }, 110);
     };

     return (
          <>
               <input
                    onChange={(event) => handleSearchMessages(event, targetChat)}
                    placeholder={language === "RUSSIAN" ? "Начать поиск" : "Start a search"}
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
               {searchInput.length ? (
                    <div className="headerChatBox__searchPanel">
                         {searchValue?.length >= 1 ? (
                              searchValue.map((item: searchValue, index: number) => {
                                   return (
                                        <SearchPanelItem
                                             searchInput={searchInput}
                                             name={item.name}
                                             key={index}
                                             value={item.value}
                                             img={item.img}
                                             authorImage={item.authorImage}
                                             index={index}
                                             date={item.date}
                                             y={item.y}
                                             handleScroll={handleScrollToMessage}
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
