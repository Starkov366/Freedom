"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { GiNightSleep } from "react-icons/gi";
import CreateNewWindow from "./createNewWindow";
import { FaQuestionCircle } from "react-icons/fa";
import { AiFillSave } from "react-icons/ai";
import { FaLanguage } from "react-icons/fa";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import img from "../../public/icons/background.png";
<div className="settings__savedMessages">
     <AiFillSave size={35} color="white"></AiFillSave>
     <p className="settings__savedMessagesBtnText">Сохраненные сообщения</p>
</div>;
import { GrChannel } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";

import { RootState, RootDispatch } from "../StateManagment/store";
import { setTheme } from "@/StateManagment/appSlice";
type setting = {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
};
const Settings: React.FC<setting> = ({ userIsDarkTheme, userThemeColorScheme }) => {
     const dispatch: RootDispatch = useDispatch();
     const ownUser = useSelector((store: RootState) => store.User);

     const [isProfile, setIsProfile] = React.useState<boolean>(false);
     const [isCreateWindow, setIsCreateWindow] = React.useState<{
          type: string | any;
          isOpen: boolean;
     }>();
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
                    <img src={img.src} className="settings__imageProfile"></img>
                    <span className="settings__profileName">Starkov</span>
                    <span className="settings__profileEmail">valuznnicartem@gmail.com</span>
               </div>
               <div className="settings__btns">
                    <div
                         onClick={(event) => {
                              handleOpenProfile(event);
                         }}
                         className="settings__profileBtn"
                    >
                         <CgProfile size={35} color="white"></CgProfile>
                         <p className="settings__profileBtnText">Перейти в профиль</p>
                    </div>
                    <div
                         onClick={(event) => handleOpenCreateWindow(event)}
                         data-type="group"
                         className="settings__newGroupBtn"
                    >
                         <HiUserGroup size={35} color="white"></HiUserGroup>
                         <p className="settings__newGroupBtnText">Создать новую группу</p>
                    </div>
                    <div
                         onClick={(event) => handleOpenCreateWindow(event)}
                         data-type="channel"
                         className="settings__newChannelBtn"
                    >
                         <GrChannel size={35} color="white"></GrChannel>
                         <p className="settings__newChannelBtnText">Создать новый канал</p>
                    </div>

                    <div onClick={handleToggleTheme} className="settings__nightMode">
                         <GiNightSleep size={35} color="white"></GiNightSleep>
                         <p className="settings__nigthModeBtnText">Сменить тему</p>
                    </div>

                    <div className="settings__savedMessages">
                         <AiFillSave size={35} color="white"></AiFillSave>
                         <p className="settings__savedMessagesBtnText">Сохраненные сообщения</p>
                    </div>
                    <div className="settings__toggleLanguage">
                         <FaLanguage size={35} color="white"></FaLanguage>
                         <p className="settings__toggleLanguageLabel">English</p>
                    </div>
                    <div className="settings__FAQ">
                         <FaQuestionCircle size={35} color="white"></FaQuestionCircle>
                         <p className="settings__FAQLabel">FAQ</p>
                    </div>
               </div>
               <div className="settings__infoAboutApp">
                    <p>Freedom Web</p>
                    <span>Version 1.0</span>
               </div>
               {isProfile ? (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         key={Math.random()}
                         email={ownUser.userEmail}
                         name={ownUser.userName}
                         countFriends={ownUser.userFriends.length}
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
                    ></NewProfile>
               ) : null}
               {isCreateWindow?.isOpen ? (
                    <CreateNewWindow
                         setIsOpen={setIsCreateWindow}
                         isChannel={isCreateWindow?.type!}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                    ></CreateNewWindow>
               ) : null}
          </div>
     );
};
export default Settings;
