import React from "react";
import MemberItem from "./memberItem";
import { FiUsers } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RootState } from "@/StateManagment/store";
import type { Chats } from "@/StateManagment/appSlice";
import { useSelector } from "react-redux";
import { UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";

import Link from "next/link";
import { group } from "console";
type typeContactMenu = {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     isList: boolean;
     targetChatID: string;
     language: string;
};
const ContactMenu: React.FC<typeContactMenu> = ({
     userIsDarkTheme,
     userThemeColorScheme,
     setIsOpen,
     isList,
     targetChatID,
     language
}) => {
     const contactsRedux: UserInterfaceForJoinUsers[] = useSelector(
          (state: RootState) => state.User.userContacts
     );
     const [contacts, setContacts] = React.useState<UserInterfaceForJoinUsers[]>(contactsRedux);
     const chats: Chats[] = useSelector((state: RootState) => state.User.userChats);
     const targetChat: Chats[] = chats.filter((chats: Chats) => chats.chatId === targetChatID);
     const targetChatObj: Chats = targetChat[0];
     React.useEffect(() => {
          if (targetChatObj?.joinUsers && targetChatObj.type !== "DUO" && contacts) {
               const groupContacts: UserInterfaceForJoinUsers[] = contacts.filter(
                    (contact: UserInterfaceForJoinUsers) => {
                         return !targetChatObj.joinUsers.some((user: UserInterfaceForJoinUsers) => {
                              return contact.userId === user.userId;
                         });
                    }
               );
               setContacts(groupContacts);
          }
     }, [chats]);

     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[10]
                         : userThemeColorScheme.light[10]
               }}
               className="contactMenu"
          >
               <div className="contactMenu__header">
                    <FaArrowLeftLong
                         className="contactMenu__headericon"
                         color="white"
                         size={35}
                         onClick={() => setIsOpen(false)}
                    ></FaArrowLeftLong>
                    <span className="contactMenu__headerCount">Contacts</span>
                    <FiUsers color="white" size={35}></FiUsers>
               </div>
               <div className="contactMenu__inner">
                    {!isList && contacts?.length >= 1
                         ? contacts.map((contact: UserInterfaceForJoinUsers, index: number) => {
                                return (
                                     <Link
                                          style={{ textDecoration: "none", color: "gray" }}
                                          key={index}
                                          href={contact.userChatID!}
                                     >
                                          <MemberItem
                                               member={contact}
                                               isList={isList}
                                               name={contact.userName}
                                               image={contact.userImage}
                                               flag={contact.userIsOnline}
                                               language={language}
                                          ></MemberItem>
                                     </Link>
                                );
                           })
                         : null}
                    {isList && contacts.length >= 1 ? (
                         contacts.map((contact: UserInterfaceForJoinUsers, index: number) => {
                              return (
                                   <MemberItem
                                        targetChatID={targetChatID}
                                        contactID={contact.userId}
                                        member={contact}
                                        isList={isList}
                                        name={contact.userName}
                                        image={contact.userImage}
                                        key={index}
                                        flag={contact.userIsOnline}
                                        role={contact.userRole!}
                                        language={language}
                                   ></MemberItem>
                              );
                         })
                    ) : contacts?.length === 0 ? (
                         <p>
                              {language === "RUSSIAN"
                                   ? "Контакты отсутствуют :("
                                   : "Contacts are missing"}
                         </p>
                    ) : null}
               </div>
          </div>
     );
};
export default ContactMenu;
