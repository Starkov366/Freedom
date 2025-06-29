"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profileChat";
import ProfileMain from "./profile";
import back from "../../public/icons/background.png";
import HeaderMessageMenu from "./messageHeaderMenu";
import SearchInput from "./searchInput";
import { Chats, UserInterface } from "@/StateManagment/appSlice";
import PinnedMessages from "./pinnedMessages";
type typeHeaderChatBox = {
     fullfield: boolean;
     targetChat: Chats;
     targetNumberOutUser: number;
     ownUser: UserInterface;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
};
const HeaderChatBox: React.FC<typeHeaderChatBox> = ({
     fullfield,
     targetChat,
     targetNumberOutUser,
     ownUser,
     userIsDarkTheme,
     userThemeColorScheme
}) => {
     const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
     const [isSearch, setIsSearch] = React.useState<boolean>(false);
     const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
     React.useEffect(() => {
          const open = (event: any) => {
               const element = event.target as HTMLElement;
               if (
                    !element.closest(".headerChatBox__toolbarMenu") &&
                    !element.closest(".headerChatBox__search") &&
                    !element.closest(".chatBox__galleryBack")
               ) {
                    setIsOpenMenu(false);
               }
          };
          document.addEventListener("click", open);
          return () => document.removeEventListener("click", open);
     }, []);
     const checkClickBackground = (event: React.MouseEvent) => {
          const target = event.currentTarget;
          setIsOpenMenu(!isOpenMenu);

          console.log(target);
     };
     const NewProfile = ProfileHOC({
          WrappedComponent: ProfileMain,
          edit: false,
          owner: false
     });
     return (
          <header
               style={{
                    visibility: fullfield ? "visible" : "hidden",

                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[1]
                         : userThemeColorScheme.light[1]
               }}
               className="headerChatBox"
          >
               <Profile
                    setProfileOpen={setProfileOpen}
                    profileOpen={profileOpen}
                    img={ownUser?.userImage ?? targetChat?.imagesChat}
                    name={ownUser?.userName ?? ""}
                    statusInfo={true}
                    lastStatus={new Date()}
                    targetChat={targetChat}
                    type={targetChat?.type}
               ></Profile>

               <div className="headerChatBox__toolbar">
                    {isSearch ? <SearchInput targetChat={targetChat}></SearchInput> : null}
                    <button
                         onClick={() => setIsSearch(!isSearch)}
                         className="headerChatBox__moreOptions"
                    ></button>

                    <button
                         onClick={checkClickBackground}
                         className="headerChatBox__search"
                    ></button>
               </div>
               {isOpenMenu ? (
                    <HeaderMessageMenu
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         targetChat={targetChat}
                         id={targetChat?.chatId}
                         setProfileOpen={setProfileOpen}
                    ></HeaderMessageMenu>
               ) : null}
               {profileOpen ? (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         email={ownUser?.userEmail ?? ""}
                         name={ownUser?.userName ?? ""}
                         countFriends={ownUser?.userFriends.length ?? 2}
                         countGroups={Number(ownUser?.userGroups) ?? 3}
                         description={ownUser?.userDescription ?? ""}
                         userId={ownUser?.userId ?? ""}
                         telegram={ownUser?.userTelegramInfo ?? ""}
                         instagram={ownUser?.userInstagramInfo ?? ""}
                         img={ownUser?.userImage ?? ""}
                         setProfileOpen={setProfileOpen}
                         as={"p"}
                    ></NewProfile>
               ) : null}

               {targetChat?.pinnedMessage.length >= 1 ? (
                    <PinnedMessages
                         targetChatId={targetChat.chatId}
                         pinnedMessages={targetChat.pinnedMessage}
                    ></PinnedMessages>
               ) : null}
          </header>
     );
};
export default HeaderChatBox;
