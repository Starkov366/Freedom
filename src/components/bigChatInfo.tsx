"use client";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import MemberItem from "./memberItem";
import mock from "../../public/icons/background.png";
type typeBigChat = {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
};
const BigChatInfo: React.FC<typeBigChat> = ({ userIsDarkTheme, userThemeColorScheme }) => {
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[10]
                         : userThemeColorScheme.light[10]
               }}
               className="bigChatInfo"
          >
               <header className="bigChatInfo__header">
                    <h1 className="bigChatInfo__headerTitle">Group info</h1>
                    <IoCloseSharp className="bigChatInfo__headerIcon" size={40} color="white"></IoCloseSharp>
               </header>
               <div className="bigChatInfo__inner">
                    <div className="bigChatInfo__innerInfo">
                         <img src={mock.src} className="bigChatInfo__innerInfoImage"></img>
                         <div className="bigChatInfo__innerInfoTexts">
                              <h1 className="bigChatInfo__innerInfoName">Группа</h1>
                              <span className="bigChatInfo__innerInfoMembers">1 member</span>
                         </div>
                    </div>
                    <p className="bigChatInfo__innerDescription">
                         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet expedita
                         reiciendis illum! Sunt provident, ea ad laborum qui quas ab voluptas quis
                         aliquam eius cupiditate quo facilis natus porro nemo!
                    </p>
                    <div className="bigChatInfo__innerMembers">
                         <div className="bigChatInfo__innerMembersHeader">
                              <FiUsers
                                   className="bigChatInfo__innerMembersHeaderIcon"
                                   color="grey"
                                   size={35}
                              ></FiUsers>
                              <span className="bigChatInfo__innerMembersHeaderCount">1 MEMBER</span>
                              <RiUserAddLine
                                   className="bigChatInfo__innerMembersHeaderIcon"
                                   color="grey"
                                   size={35}
                              ></RiUserAddLine>
                         </div>
                         <div className="bigChatInfo__innerMembersInner">
                              <MemberItem></MemberItem>
                              <MemberItem></MemberItem>
                              <MemberItem></MemberItem>
                              <MemberItem></MemberItem>
                         </div>
                    </div>
               </div>
          </div>
     );
};
export default BigChatInfo;
