"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagment/store";
const HeaderMessageMenu = ({
     isOpen,
     setIsOpen
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
     const user = useSelector((store: RootState) => store.User);
     const [value, setValue] = React.useState<string>("");
     const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
     const [edit, setEdit] = React.useState<boolean>(false);
     const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
     };
     const NewProfile = ProfileHOC({
          WrappedComponent: Profile,
          edit: edit
     });

     return (
          <div className="headerMessageMenu">
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
