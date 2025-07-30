"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { GiNightSleep } from "react-icons/gi";
import CreateNewWindow from "./createNewWindow";
import { TiContacts } from "react-icons/ti";
import { FaQuestionCircle } from "react-icons/fa";
import { AiFillSave } from "react-icons/ai";
import type { UserInterface } from "@/StateManagment/appSlice";
import { FaLanguage } from "react-icons/fa";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import img from "../../public/icons/background.png";
import ContactMenu from "./contactList";
import {
     useChangeLanguageMutation,
     useChangeThemeMutation,
     useAddNewGroupOrChannelChatMutation
} from "@/StateManagment/appApi";
import { useRouter } from "next/navigation";
<div className="settings__savedMessages">
     <AiFillSave size={35} color="white"></AiFillSave>
     <p className="settings__savedMessagesBtnText">Сохраненные сообщения</p>
</div>;
import { GrChannel } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";

import { RootState, RootDispatch } from "../StateManagment/store";
import { setTheme, setToggleLanguage } from "@/StateManagment/appSlice";
type setting = {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     language: string;
};
const Settings: React.FC<setting> = ({ userIsDarkTheme, userThemeColorScheme, language }) => {
     const keyAndName: { key: string; value: string | boolean } = {
          key: "",
          value: ""
     };
     const [updateTheme] = useChangeThemeMutation();
     const [updateLanguage] = useChangeLanguageMutation();

     const dispatch: RootDispatch = useDispatch();
     const ownUser = useSelector((store: RootState) => store.User);
     const userLanguage = useSelector((store: RootState) => store.User.userLanguage);
     const userImage = useSelector((store: RootState) => store.User.userImage);
     const userName = useSelector((store: RootState) => store.User.userName);
     const userEmail = useSelector((store: RootState) => store.User.userEmail);
     const [isProfile, setIsProfile] = React.useState<boolean>(false);
     const [isContactMenuOpen, setIsContactMenuOpen] = React.useState<boolean>(false);
     const router = useRouter();
     const [isCreateWindow, setIsCreateWindow] = React.useState<{
          type: string | any;
          isOpen: boolean;
     }>({ type: "", isOpen: false });
     const [edit, setEdit] = React.useState<boolean>(false);
     const NewProfile = ProfileHOC({
          WrappedComponent: Profile,
          edit: edit
     });
     const handleOpenProfile = (event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation(), setIsProfile((prev: boolean) => !prev);
     };
     const handleToggleTheme = (event: React.MouseEvent<HTMLDivElement>) => {
          dispatch(setTheme({ userIsDarkTheme: !userIsDarkTheme }));
          const asyncFetch = async () => {
               try {
                    const users = await fetch(
                         "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                         {
                              method: "GET",
                              headers: {
                                   "Content-Type": "application/json"
                              }
                         }
                    );
                    const readyUsers = await users.json();
                    for (const [key, val] of Object.entries(readyUsers)) {
                         const value = val as UserInterface;
                         if (value.userName === userName) {
                              keyAndName["key"] = key;
                              keyAndName["value"] = !userIsDarkTheme;
                              break;
                         }
                    }
                    keyAndName.value && typeof keyAndName.value === "boolean"
                         ? updateTheme({ key: keyAndName.key, isDark: keyAndName.value })
                         : null;
               } catch (error) {
                    console.error(error);
               }
          };
          asyncFetch();
     };
     const handleOpenCreateWindow = (event: React.MouseEvent<HTMLDivElement>) => {
          const element: HTMLDivElement = event.currentTarget as HTMLDivElement;
          const type = element.dataset.type;

          if (type) console.log(type);
          setIsCreateWindow((prev) => {
               const newState = {
                    isOpen: !prev?.isOpen,
                    type: type
               };
               return newState;
          });
     };
     const toggleLanguage = () => {
          if (userLanguage === "ENGLISH") {
               dispatch(setToggleLanguage({ language: "RUSSIAN" }));
               const asyncFetch = async () => {
                    try {
                         const users = await fetch(
                              "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                              {
                                   method: "GET",
                                   headers: {
                                        "Content-Type": "application/json"
                                   }
                              }
                         );
                         const readyUsers = await users.json();
                         for (const [key, val] of Object.entries(readyUsers)) {
                              const value = val as UserInterface;
                              if (value.userName === userName) {
                                   keyAndName["key"] = key;
                                   keyAndName["value"] = "RUSSIAN";
                                   break;
                              }
                         }
                         keyAndName.value && typeof keyAndName.value === "string"
                              ? updateLanguage({ key: keyAndName.key, english: keyAndName.value })
                              : null;
                    } catch (error) {
                         console.error(error);
                    }
               };
               asyncFetch();
          } else {
               dispatch(setToggleLanguage({ language: "ENGLISH" }));
               const asyncFetch = async () => {
                    try {
                         const users = await fetch(
                              "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                              {
                                   method: "GET",
                                   headers: {
                                        "Content-Type": "application/json"
                                   }
                              }
                         );
                         const readyUsers = await users.json();
                         for (const [key, val] of Object.entries(readyUsers)) {
                              const value = val as UserInterface;
                              if (value.userName === userName) {
                                   keyAndName["key"] = key;
                                   keyAndName["value"] = "ENGLISH";
                                   break;
                              }
                         }
                         keyAndName.value && typeof keyAndName.value === "string"
                              ? updateLanguage({ key: keyAndName.key, english: keyAndName.value })
                              : null;
                    } catch (error) {
                         console.error(error);
                    }
               };
               asyncFetch();
          }
     };
     const handleOpenSavedMessages = () => {
          router.push("saved");
     };
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[7]
                         : userThemeColorScheme.light[7]
               }}
               className="settings"
          >
               <div
                    style={{
                         background: userIsDarkTheme
                              ? userThemeColorScheme.dark[8]
                              : userThemeColorScheme.light[8]
                    }}
                    className="settings__profileSection"
               >
                    <img src={userImage} className="settings__imageProfile"></img>
                    <span className="settings__profileName">{userName}</span>
                    <span className="settings__profileEmail">{userEmail}</span>
               </div>
               <div className="settings__btns">
                    <div
                         onClick={(event) => {
                              handleOpenProfile(event);
                         }}
                         className="settings__profileBtn"
                    >
                         <CgProfile size={35} color="white"></CgProfile>
                         <p className="settings__profileBtnText">
                              {language === "RUSSIAN" ? "Перейти в профиль" : "Go to profile"}
                         </p>
                    </div>
                    <div
                         onClick={(event) => handleOpenCreateWindow(event)}
                         data-type="group"
                         className="settings__newGroupBtn"
                    >
                         <HiUserGroup size={35} color="white"></HiUserGroup>
                         <p className="settings__newGroupBtnText">
                              {" "}
                              {language === "RUSSIAN"
                                   ? "Создать новую группу"
                                   : "Create a new group"}
                         </p>
                    </div>
                    <div
                         onClick={(event) => handleOpenCreateWindow(event)}
                         data-type="channel"
                         className="settings__newChannelBtn"
                    >
                         <GrChannel size={35} color="white"></GrChannel>
                         <p className="settings__newChannelBtnText">
                              {" "}
                              {language === "RUSSIAN"
                                   ? "Создать новый канал"
                                   : "Create a new channel"}
                         </p>
                    </div>

                    <div onClick={handleToggleTheme} className="settings__nightMode">
                         <GiNightSleep size={35} color="white"></GiNightSleep>
                         <p className="settings__nigthModeBtnText">
                              {" "}
                              {language === "RUSSIAN" ? "Изменить тему" : "Change theme"}
                         </p>
                    </div>

                    <div
                         onClick={() => handleOpenSavedMessages()}
                         className="settings__savedMessages"
                    >
                         <AiFillSave size={35} color="white"></AiFillSave>
                         <p className="settings__savedMessagesBtnText">
                              {" "}
                              {language === "RUSSIAN" ? "Сохраненные сообщения" : "Saved messages"}
                         </p>
                    </div>
                    <div onClick={() => toggleLanguage()} className="settings__toggleLanguage">
                         <FaLanguage size={35} color="white"></FaLanguage>
                         <p className="settings__toggleLanguageLabel">
                              {language === "RUSSIAN" ? "English" : "Русский"}
                         </p>
                    </div>
                    <div className="settings__FAQ">
                         <FaQuestionCircle size={35} color="white"></FaQuestionCircle>
                         <p className="settings__FAQLabel">FAQ</p>
                    </div>
                    <div
                         onClick={() => {
                              setIsContactMenuOpen((prev) => !prev);
                         }}
                         className="settings__contacts"
                    >
                         <TiContacts size={35} color="white"></TiContacts>
                         <p className="settings__contactsLabel">
                              {" "}
                              {language === "RUSSIAN" ? "Контакты" : "Contacts"}
                         </p>
                    </div>
               </div>

               <div className="settings__infoAboutApp">
                    <p>Freedom {language === "RUSSIAN" ? "Веб" : "Web"}</p>
                    <span className="settings__infoAboutAppAuthor"> By Starkov</span>
                    <span> {language === "RUSSIAN" ? "Версия" : "Version"} 1.0</span>
               </div>
               {isProfile ? (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         key={Math.random()}
                         email={ownUser.userEmail}
                         name={ownUser.userName}
                         countFriends={0}
                         countGroups={ownUser.userGroups}
                         description={ownUser.userDescription}
                         userId={ownUser.userId}
                         telegram={ownUser.userTelegramInfo}
                         instagram={ownUser.userInstagramInfo}
                         setProfileOpen={setIsProfile}
                         setEdit={setEdit}
                         img={ownUser.userImage}
                         edit={edit}
                         owner={true}
                         as={edit ? "input" : "p"}
                         language={language}
                    ></NewProfile>
               ) : null}
               {isCreateWindow?.isOpen ? (
                    <CreateNewWindow
                         isEditMode={false}
                         setIsOpen={setIsCreateWindow}
                         isChannel={isCreateWindow?.type!}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         language={language}
                    ></CreateNewWindow>
               ) : null}
               {isContactMenuOpen ? (
                    <ContactMenu
                         isList={false}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         setIsOpen={setIsContactMenuOpen}
                         targetChatID={""}
                         language={language}
                    ></ContactMenu>
               ) : null}
          </div>
     );
};
export default Settings;
