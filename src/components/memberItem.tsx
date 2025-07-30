import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import { setAddContactToGroup } from "@/StateManagment/appSlice";
import memo from "../../public/icons/user1 (1).png";
import { UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import { roles } from "@/StateManagment/appSlice";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "@/StateManagment/store";
import { setDeleteContactFromChat } from "@/StateManagment/appSlice";

type typeMember = {
     image: string;
     name: string;
     flag: boolean;
     member: UserInterfaceForJoinUsers;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
     setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
     isOpen?: boolean;
     isList?: boolean;
     setContactIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
     targetChatID?: string;
     contactID?: string;
     role?: roles;
     isYouAdmin?: boolean;
     language: string;
};

const MemberItem: React.FC<typeMember> = ({
     image,
     name,
     flag,
     member,
     userIsDarkTheme,
     userThemeColorScheme,
     setIsOpen,
     isOpen,
     isList,
     setContactIsOpen,
     targetChatID,
     contactID,
     role,
     isYouAdmin,
     language
}) => {
     const [isProfileOpen, setIsProfileOpen] = React.useState<boolean>(false);
     const userId: string = useSelector((state: RootState) => state.User.userId);
     const NewProfile = ProfileHOC({ WrappedComponent: Profile, edit: false });
     const dispatch: RootDispatch = useDispatch();
     const handleAddContact = (chatID: string, contactID: string) => {
          dispatch(setAddContactToGroup({ idChat: chatID, idContact: contactID }));
     };
     const handleDeleteContact = (chatID: string, contactID: string) => {
          dispatch(setDeleteContactFromChat({ idChat: chatID, idContact: contactID }));
     };
     return (
          <div className="bigChatInfo__innerMembersInnerItem">
               <img
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    src={image === "" || image.length < 10 ? memo.src : image}
                    className="bigChatInfo__innerMembersInnerItemImage"
               ></img>
               <div
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="bigChatInfo__innerMembersInnerItemTexts"
               >
                    <h1 className="bigChatInfo__innerMembersInnerItemName">{name}</h1>
                    <span className="bigChatInfo__innerMembersInnerItemIsOnline">
                         {flag
                              ? `${language === "RUSSIAN" ? "В сети" : "Online"}`
                              : `${language === "RUSSIAN" ? "Не сети" : "Offline"}`}
                    </span>
               </div>
               {isList ? (
                    <IoMdAddCircle
                         onClick={() => handleAddContact(targetChatID!, member?.userId)}
                         className="bigChatInfo__innerMembersInnerItemTextsAddBtn"
                         size={32}
                         color="grey"
                    ></IoMdAddCircle>
               ) : null}
               {isProfileOpen ? (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme!}
                         userThemeColorScheme={userThemeColorScheme!}
                         email={member?.userEmail!}
                         name={member?.userName!}
                         countFriends={member?.userFriends?.length!}
                         countGroups={Number(member?.userGroups)}
                         description={member?.userDescription!}
                         userId={member?.userId!}
                         telegram={member?.userTelegramInfo!}
                         instagram={member?.userInstagramInfo!}
                         img={member?.userImage!}
                         setProfileOpen={setIsOpen!}
                         as={"p"}
                         language={language}
                    ></NewProfile>
               ) : null}
               {isYouAdmin && role === roles.guest && userId !== contactID ? (
                    <TiDelete
                         className="bigChatInfo__innerMembersInnerItemDelete"
                         color="red"
                         size={40}
                         onClick={() => handleDeleteContact(targetChatID!, member?.userId)}
                    ></TiDelete>
               ) : null}
               {role ? (
                    <span className="bigChatInfo__innerMembersInnerItemRole">
                         {role === roles.admin
                              ? `${language === "RUSSIAN" ? "АДМИН" : "ADMIN"}`
                              : `${language === "RUSSIAN" ? "ГОСТЬ" : "GUEST"}`}
                    </span>
               ) : null}
          </div>
     );
};
export default MemberItem;
