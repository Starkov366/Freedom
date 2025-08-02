"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagment/store";
import { Chats } from "../StateManagment/appSlice";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import { useLazyQuery, gql, useMutation, useQuery } from "@apollo/client";
import { ChatInfo } from "../StateManagment/appSlice";
import { roles } from "../StateManagment/appSlice";
import type { UserInterfaceForJoinUsers } from "../StateManagment/appSlice";
import GlobalContactSearch from "./globalContactsSearch";
const GET_USERS = gql`
     query getAllUsers {
          getAllUsers {
               userId
               userName
               userEmail
               userPassword
               userDateRegistred
               userTelegramInfo
               userInstagramInfo
               userIsOnline
               userFriends
               userImage
               userGroups
               userDescription
          }
     }
`;
const GET_CHATS = gql`
     query getAllChats {
          getAllChats
     }
`;
const HeaderMessageMenu = ({
     isOpen,
     setIsOpen,
     setChats,
     value,
     setValue,
     userIsDarkTheme,
     userThemeColorScheme,
     language,
     isUpdate,
     setIsUpdate
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
     value: string;
     setValue: React.Dispatch<React.SetStateAction<string>>;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
     language: string;
     isUpdate: boolean;
     setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
     const { error, data, loading } = useQuery(GET_USERS);
     const { error: errorC, data: dataC, loading: loadingC } = useQuery(GET_CHATS);
     const user = useSelector((store: RootState) => store.User);
     const isFirstLoad = React.useRef(true);
     const [contacts, setContacts] = React.useState<(UserInterfaceForJoinUsers | Chats)[]>([]);
     const [findContacts, setFindContacts] =
          React.useState<(UserInterfaceForJoinUsers | Chats)[]>();
     const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
     const [edit, setEdit] = React.useState<boolean>(false);
     const [globalContactsIsOpen, setGlobalContactsIsOpen] = React.useState<boolean>(false);
     const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
          const searchValue = event.currentTarget.value as string;
          setValue(searchValue);
          if (!searchValue.startsWith("@")) {
               setChats((prevState: Chats[]) => {
                    const newChats = prevState.filter((chat: Chats) => {
                         return chat.info.title.includes(event.target.value);
                    });

                    return newChats;
               });
          } else if (searchValue.startsWith("@") && searchValue.length > 2) {
               const newContacts: (UserInterfaceForJoinUsers | Chats)[] = contacts.filter(
                    (contact: UserInterfaceForJoinUsers | Chats, index: number) => {
                         if (!("type" in contact)) {
                              return !user.userContacts?.some(
                                   (userContact: UserInterfaceForJoinUsers) => {
                                        return userContact.userId === contact.userId;
                                   }
                              );
                         } else {
                              return !user.userChats.some((userContact: Chats) => {
                                   return userContact.info.chatName === contact.info.chatName;
                              });
                         }
                    }
               );
               if (newContacts) {
                    const equalityContacts: (UserInterfaceForJoinUsers | Chats)[] =
                         newContacts.filter((contact: UserInterfaceForJoinUsers | Chats) => {
                              if ("userId" in contact && contact.userId !== user.userId) {
                                   return contact.userId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              } else if ("type" in contact) {
                                   return contact.info.chatName
                                        .toLocaleLowerCase()
                                        .startsWith(
                                             searchValue
                                                  .slice(1, searchValue.length)
                                                  .toLocaleLowerCase()
                                        );
                              }
                         });
                    setFindContacts(equalityContacts);
                    setGlobalContactsIsOpen(true);
               } else {
                    const equalityContacts: (UserInterfaceForJoinUsers | Chats)[] = contacts.filter(
                         (contact: UserInterfaceForJoinUsers | Chats) => {
                              if ("userId" in contact) {
                                   return contact.userId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              } else if ("type" in contact) {
                                   return contact.info.chatName
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              }
                         }
                    );
                    setFindContacts(equalityContacts);
                    setGlobalContactsIsOpen(true);
               }
          }
     };
     const NewProfile = ProfileHOC({
          WrappedComponent: Profile,
          edit: edit
     });
     React.useEffect(() => {
          value.length === 0 ? (setChats(user.userChats), setFindContacts([])) : null;
     }, [value]);
     React.useEffect(() => {
          if (data && isUpdate && dataC) {
               console.log(data.getAllUsers, "ЛЮДИИ", dataC.getAllChats, "ЧАТЫЫЫ");
               console.log(dataC.getAllChats, "АУУУУУУУУУУУУУУУУУУУУУУУУ");
               setContacts((prev) => {
                    const newState = [...prev, ...data.getAllUsers, ...dataC?.getAllChats];

                    return newState;
               });
               setIsUpdate(false);
               isFirstLoad.current = false;
          }
     }, [data, dataC]);

     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme?.dark[5]
                         : userThemeColorScheme?.light[5]
               }}
               className="headerMessageMenu"
          >
               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="headerMessageMenu__burgerMenu"
               ></button>
               <div className="headerMessageMenu__inputSearch">
                    <input
                         onChange={(event) => handleSetValue(event)}
                         type="text"
                         onClick={() =>
                              console.log(data.getAllUsers, "ЛЮДИИ", dataC?.getAllChats, errorC)
                         }
                         placeholder={language === "RUSSIAN" ? "Поиск" : "Search"}
                         className="headerMessageMenu__input"
                         value={value}
                    ></input>
                    {value.length != 0 ? (
                         <span
                              onClick={() => setValue("")}
                              className="headerMessageMenu__inputSearchDelete"
                         ></span>
                    ) : null}
               </div>
               <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="headerMessageMenu__profile"
               ></button>
               {profileOpen && (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme!}
                         userThemeColorScheme={userThemeColorScheme!}
                         key={Math.random()}
                         email={user.userEmail}
                         name={user.userName}
                         countFriends={0}
                         countGroups={user.userGroups}
                         description={user.userDescription}
                         userId={user.userId}
                         telegram={user.userTelegramInfo}
                         instagram={user.userInstagramInfo}
                         setProfileOpen={setProfileOpen}
                         setEdit={setEdit}
                         img={user.userImage}
                         owner={true}
                         as={edit ? "input" : "p"}
                         language={language}
                    ></NewProfile>
               )}
               {globalContactsIsOpen && findContacts?.length! >= 1 ? (
                    <GlobalContactSearch
                         userThemeColorScheme={userThemeColorScheme}
                         userIsDarkTheme={userIsDarkTheme!}
                         contacts={findContacts}
                    ></GlobalContactSearch>
               ) : null}
          </div>
     );
};
export default HeaderMessageMenu;
