"use client";
import { StaticImageData } from "next/image";
import type { Chats } from "@/StateManagment/appSlice";
import React from "react";
type typeHeaderProfile = {
     img: string;
     statusInfo: boolean;
     name: string;
     lastStatus: Date;
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     profileOpen: boolean;
     type: "GROUP" | "CHANNEL" | "DUO" | "SAVED";
     targetChat: Chats;
};
const HeaderProfile: React.FC<typeHeaderProfile> = ({
     name,
     img = "",
     statusInfo,
     lastStatus,
     profileOpen,
     type,
     targetChat,
     setProfileOpen
}) => {
     return (
          <div
               onClick={() => {
                    type !== "GROUP" && type !== "CHANNEL"
                         ? setProfileOpen(!profileOpen)
                         : console.log("это не дуо");
               }}
               className="headerChatBox__profile"
          >
               <div className="headerChatBox__profileCircle">
                    {img ? (
                         <img
                              style={{
                                   paddingBottom:
                                        type === "GROUP" || type === "CHANNEL" ? "20px" : ""
                              }}
                              className="headerChatBox__profileImage"
                              src={img}
                         />
                    ) : (
                         <span></span>
                    )}
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
                              {statusInfo ? "Online" : `Был в сети : ${lastStatus}`}
                         </p>
                    )}
               </div>
          </div>
     );
};
export default HeaderProfile;
