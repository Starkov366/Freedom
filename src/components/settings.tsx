import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { GiNightSleep } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";

import img from "../../public/icons/background.png";
import { GrChannel } from "react-icons/gr";
const Settings = () => {
     return (
          <div className="settings">
               <div className="settings__profileSection">
                    <img src={img.src} className="settings__imageProfile"></img>
                    <span className="settings__profileName">Starkov</span>
                    <span className="settings__profileEmail">valuznnicartem@gmail.com</span>
               </div>
               <div className="settings__btns">
                    <div className="settings__profileBtn">
                         <CgProfile size={35} color="white"></CgProfile>
                         <p className="settings__profileBtnText">Перейти в профиль</p>
                    </div>
                    <div className="settings__newGroupBtn">
                         <HiUserGroup size={35} color="white"></HiUserGroup>
                         <p className="settings__newGroupBtnText">Создать новую группу</p>
                    </div>
                    <div className="settings__newChannelBtn">
                         <GrChannel size={35} color="white"></GrChannel>
                         <p className="settings__newChannelBtnText">Создать новый канал</p>
                    </div>

                    <div className="settings__nightMode">
                         <GiNightSleep size={35} color="white"></GiNightSleep>
                         <p className="settings__nigthModeBtnText">Сменить тему</p>
                    </div>
                    <div className="settings__friends">
                         <FaUserFriends size={35} color="white"></FaUserFriends>
                         <p className="settings__checkFriendBtnText">Список друзей</p>
                    </div>
                    <div className="settings__savedMessages">
                         <AiFillSave size={35} color="white"></AiFillSave>
                         <p className="settings__savedMessagesBtnText">Сохраненные сообщения</p>
                    </div>
               </div>
               <div className="settings__infoAboutApp">
                    <p>Freedom Web</p>
                    <span>Version 1.0</span>
               </div>
          </div>
     );
};
export default Settings;
