"use client";
import { StaticImageData } from "next/image";
import React from "react";
type typeHeaderProfile = {
     img: string;
     statusInfo: boolean;
     name: string;
     lastStatus: Date;
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     profileOpen: boolean;
};
const HeaderProfile: React.FC<typeHeaderProfile> = ({
     name,
     img = "",
     statusInfo,
     lastStatus,
     profileOpen,
     setProfileOpen
}) => {
     return (
          <div onClick={() => setProfileOpen(!profileOpen)} className="headerChatBox__profile">
               <div className="headerChatBox__profileCircle">
                    {img ? (
                         <img className="headerChatBox__profileImage" src={img} />
                    ) : (
                         <span></span>
                    )}
                    <div
                         style={{
                              width: "12px",
                              height: "12px",
                              background: statusInfo ? "#5aff57" : "gray"
                         }}
                         className="headerChatBox__status"
                    ></div>
               </div>
               <div className="headerChatBox__profileInfo">
                    <h1 className="headerChatBox__name">{name}</h1>
                    <p className="headerChatBox__statusInfo">
                         {statusInfo ? "Online" : `Был в сети : ${lastStatus}`}
                    </p>
               </div>
          </div>
     );
};
export default HeaderProfile;
