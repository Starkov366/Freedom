"use client";
import { StaticImageData } from "next/image";
import type { Chats } from "@/StateManagment/appSlice";
import undefinedImages from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
import undefinedIconDuo from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
import undefinedIconGroup from "../../public/icons/group (1).png";
import undefinedIconChannel from "../../public/icons/tv.png";
import undefinedIconSaved from "../../public/icons/save.png";
import React from "react";
type typeHeaderProfile = {
     lastSendImg: string;
     statusInfo: boolean;
     name: string;
     lastStatus: Date;
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     profileOpen: boolean;
     type: "GROUP" | "CHANNEL" | "DUO" | "SAVED";
     targetChat: Chats;
     setBigChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     language: string;
};
const HeaderProfile: React.FC<typeHeaderProfile> = ({
     name,
     lastSendImg,
     statusInfo,
     lastStatus,
     setBigChatIsOpen,
     profileOpen,
     type,
     targetChat,
     setProfileOpen,
     language
}) => {
     console.log(undefinedImages);
     return (
          <div
               onClick={() => {
                    type !== "GROUP" && type !== "CHANNEL"
                         ? setProfileOpen(!profileOpen)
                         : setBigChatIsOpen((prev) => !prev);
               }}
               className="headerChatBox__profile"
          >
               <div className="headerChatBox__profileCircle">
                    <img
                         style={{
                              paddingBottom: type === "GROUP" || type === "CHANNEL" ? "20px" : ""
                         }}
                         className="headerChatBox__profileImage"
                         src={
                              lastSendImg
                                   ? lastSendImg
                                   : lastSendImg === "" && type === "DUO"
                                   ? undefinedIconDuo.src
                                   : lastSendImg === "" && type === "CHANNEL"
                                   ? undefinedIconChannel.src
                                   : lastSendImg === "" && type === "SAVED"
                                   ? undefinedIconSaved.src
                                   : lastSendImg === "" && type === "GROUP"
                                   ? undefinedIconGroup.src
                                   : undefinedIconDuo.src
                         }
                    />

                    {type === "GROUP" || type === "CHANNEL" ? null : (
                         <div
                              style={{
                                   width: "12px",
                                   height: "12px",
                                   background: statusInfo ? "#5aff57" : "gray"
                              }}
                              className="headerChatBox__status"
                         ></div>
                    )}
               </div>
               <div className="headerChatBox__profileInfo">
                    <h1 className="headerChatBox__name">{name}</h1>
                    {type === "GROUP" || type === "CHANNEL" ? (
                         <p
                              style={{ marginLeft: "20px", fontSize: "18px" }}
                              className="headerChatBox__statusInfo"
                         >
                              {targetChat?.info.chatName}
                         </p>
                    ) : (
                         <p className="headerChatBox__statusInfo">
                              {statusInfo
                                   ? language === "RUSSIAN"
                                        ? "Онлайн"
                                        : "Online"
                                   : language === "RUSSIAN"
                                   ? `Был в сети: ${lastStatus.toString()}`
                                   : `Was online: ${lastStatus.toString()}`}
                         </p>
                    )}
               </div>
          </div>
     );
};
export default HeaderProfile;
