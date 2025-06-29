"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagment/store";
import { Chats } from "../StateManagment/appSlice";
const HeaderMessageMenu = ({
     isOpen,
     setIsOpen,
     setChats,
     value,
     setValue,
     userIsDarkTheme,
     userThemeColorScheme
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
     value: string;
     setValue: React.Dispatch<React.SetStateAction<string>>;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
}) => {
     const user = useSelector((store: RootState) => store.User);

     const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
     const [edit, setEdit] = React.useState<boolean>(false);
     const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
          setChats((prevState: Chats[]) => {
               const newChats = prevState.filter((chat: Chats) => {
                    return chat.info.title.includes(event.target.value);
               });

               return newChats;
          });
     };
     const NewProfile = ProfileHOC({
          WrappedComponent: Profile,
          edit: edit
     });
     React.useEffect(() => {
          value.length === 0 ? setChats(user.userChats) : null;
     }, [value]);

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
                         placeholder="search"
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
               {profileOpen ? (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme!}
                         userThemeColorScheme={userThemeColorScheme!}
                         key={Math.random()}
                         email={user.userEmail}
                         name={user.userName}
                         countFriends={user.userFriends.length}
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
                    ></NewProfile>
               ) : null}
          </div>
     );
};
export default HeaderMessageMenu;
