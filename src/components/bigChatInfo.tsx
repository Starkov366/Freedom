"use client";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/StateManagment/store";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import MemberItem from "./memberItem";
import mock from "../../public/icons/background.png";
import { Chats, UserInterfaceForJoinUsers, roles } from "@/StateManagment/appSlice";
import ContactMenu from "./contactList";
import undefinedIconDuo from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
import undefinedIconGroup from "../../public/icons/group (1).png";
import undefinedIconChannel from "../../public/icons/tv.png";
import undefinedIconSaved from "../../public/icons/save.png";
import CreateNewWindow from "./createNewWindow";
type typeBigChat = {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     setBigChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     members: UserInterfaceForJoinUsers[];
     groupName: string;
     chatDescription: string;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     isOpen: boolean;
     targetChatID: string;
     chatImage: string;
     type: string;
     targetChat: Chats;
     language: string;
};
const BigChatInfo: React.FC<typeBigChat> = ({
     userIsDarkTheme,
     userThemeColorScheme,
     setBigChatIsOpen,
     members,
     groupName,
     chatDescription,
     setIsOpen,
     isOpen,
     targetChatID,
     chatImage,
     type,
     targetChat,
     language
}) => {
     const [contactMenuIsOpen, setContactMenuIsOpen] = React.useState<boolean>(false);

     const [isEditMenuOpen, setIsEditMenuOpen] = React.useState<{
          type: any;
          isOpen: boolean;
     }>({ type: type.toLowerCase(), isOpen: false });
     const userId: string = useSelector((state: RootState) => state.User.userId);
     if (!Array.isArray(members)) {
          console.warn("BigChatInfo: members не массив", members);
          return null;
     }
     const checkYourRole = (): boolean => {
          if (Array.isArray(targetChat.joinUsers) && targetChat.joinUsers !== undefined) {
               const admin: UserInterfaceForJoinUsers | undefined = targetChat.joinUsers.find(
                    (contact: UserInterfaceForJoinUsers) => {
                         return contact.userRole === roles.admin;
                    }
               );
               if (!admin) return false;

               return admin.userId === userId;
          }
          return false;
     };

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
                    {checkYourRole() ? (
                         <MdOutlineModeEdit
                              onClick={() =>
                                   setIsEditMenuOpen((prev) => {
                                        return { type: prev.type, isOpen: !prev.isOpen };
                                   })
                              }
                              className="bigChatInfo__headerIconEdit"
                              size={30}
                              color="black"
                         ></MdOutlineModeEdit>
                    ) : null}
                    <IoCloseSharp
                         onClick={() => setBigChatIsOpen((prev) => !prev)}
                         className="bigChatInfo__headerIcon"
                         size={40}
                         color="white"
                    ></IoCloseSharp>
               </header>
               <div className="bigChatInfo__inner">
                    <div className="bigChatInfo__innerInfo">
                         <img
                              src={
                                   chatImage
                                        ? chatImage
                                        : chatImage === "" && type === "DUO"
                                        ? undefinedIconDuo.src
                                        : chatImage === "" && type === "CHANNEL"
                                        ? undefinedIconChannel.src
                                        : chatImage === "" && type === "SAVED"
                                        ? undefinedIconSaved.src
                                        : chatImage === "" && type === "GROUP"
                                        ? undefinedIconGroup.src
                                        : undefinedIconDuo.src
                              }
                              className="bigChatInfo__innerInfoImage"
                         ></img>
                         <div className="bigChatInfo__innerInfoTexts">
                              <h1 className="bigChatInfo__innerInfoName">{groupName}</h1>
                              <span className="bigChatInfo__innerInfoMembers">
                                   {members.length}{" "}
                                   {language === "RUSSIAN" ? "Участников" : "Member's"}
                              </span>
                         </div>
                    </div>
                    <p className="bigChatInfo__innerDescription">{chatDescription}</p>
                    <div className="bigChatInfo__innerMembers">
                         <div className="bigChatInfo__innerMembersHeader">
                              <FiUsers color="white" size={35}></FiUsers>
                              <span className="bigChatInfo__innerMembersHeaderCount">
                                   {" "}
                                   {language === "RUSSIAN" ? "УЧАСТНИКИ" : "MEMBERS"}
                              </span>
                              <RiUserAddLine
                                   onClick={() => setContactMenuIsOpen((prev) => !prev)}
                                   className="bigChatInfo__innerMembersHeaderIcon"
                                   color="blue"
                                   size={35}
                              ></RiUserAddLine>
                         </div>
                         <div className="bigChatInfo__innerMembersInner">
                              {Array.isArray(members) &&
                                   members.map(
                                        (member: UserInterfaceForJoinUsers, index: number) => {
                                             return (
                                                  <div key={index}>
                                                       <MemberItem
                                                            isList={false}
                                                            isOpen={isOpen}
                                                            setIsOpen={setIsOpen}
                                                            role={member.userRole!}
                                                            userIsDarkTheme={userIsDarkTheme}
                                                            userThemeColorScheme={
                                                                 userThemeColorScheme
                                                            
                                                            }
                                                            isYouAdmin={checkYourRole()}
                                                            name={member.userName}
                                                            image={member.userImage}
                                                            flag={member.userIsOnline}
                                                            
                                                            member={member}
                                                            targetChatID={targetChatID}
                                                            contactID={member.userId}
                                                            language={language}
                                                       ></MemberItem>
                                                  </div>
                                             );
                                        }
                                   )}
                         </div>
                    </div>
               </div>
               {contactMenuIsOpen ? (
                    <div style={{ position: "absolute", left: "-31vw", top: "10px" }}>
                         <ContactMenu
                              isList={true}
                              targetChatID={targetChatID}
                              setIsOpen={setContactMenuIsOpen}
                              userIsDarkTheme={userIsDarkTheme}
                              userThemeColorScheme={userThemeColorScheme}
                              targetChat={targetChat}
                              language={language}
                         ></ContactMenu>
                    </div>
               ) : null}
               {isEditMenuOpen.isOpen ? (
                    <CreateNewWindow
                         isEditMode={true}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         isChannel={type.toLowerCase()}
                         setIsOpen={setIsEditMenuOpen}
                         idChat={targetChatID}
                         language={language}
                    ></CreateNewWindow>
               ) : null}
          </div>
     );
};

export default BigChatInfo;
