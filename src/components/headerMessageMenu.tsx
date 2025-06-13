"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
const HeaderMessageMenu = ({
     isOpen,
     setIsOpen
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
                         placeholder="поиск"
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
                         email="valuznnicartem@gmail.com"
                         name="starkov"
                         countFriends={0}
                         countGroups={0}
                         description="Описание... :3"
                         userId="@zaldyzhizhi"
                         telegram="https://qwdqwdwqdqwqwd"
                         instagram="https://qwdqwdwqdqwqwd"
                         setProfileOpen={setProfileOpen}
                         setEdit={setEdit}
                         img="#"
                         owner={true}
                         as={edit ? "input" : "p"}
                    ></NewProfile>
               ) : null}
          </div>
     );
};
export default HeaderMessageMenu;
