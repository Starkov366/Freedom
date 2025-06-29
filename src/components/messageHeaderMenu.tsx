"use client";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import { Chats, setClearChatHistory, setDeleteChat } from "@/StateManagment/appSlice";
import { useRouter } from "next/navigation";
import ChatGallery from "./chatGallery";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
const HeaderMessageMenu = ({
     targetChat,
     setProfileOpen,
     userIsDarkTheme,
     userThemeColorScheme,
     id
}: {
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     id: string;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     targetChat: Chats;
}) => {
     const handleOpen = () => {
          setProfileOpen((flag: boolean) => {
               const newFlag: boolean = !flag;
               setProfileOpen(newFlag);
               return newFlag;
          });
     };
     const handlePushAndSortImages = (chat: Chats): Map<string, string[]> => {
          const images = chat?.messages
               .filter((message: typeBoxMessageItem) => {
                    return message.date;
               })
               .map((message: typeBoxMessageItem) => {
                    return { date: message.date, src: message.image };
               });

          const monthsImage: Map<string, string[]> = new Map();
          images?.forEach((item) => {
               const month: string = item?.date.slice(4, 7)!;
               const Src = item.src;
               if (!Array.isArray(Src)) {
                    if (!monthsImage.has(month)) {
                         monthsImage.set(month, []);
                    }
                    Src?.length! > 1 || typeof Src === undefined
                         ? monthsImage.get(month)!.push(Src as string)
                         : null;
               } else if (Array.isArray(Src)) {
                    if (!monthsImage.has(month)) {
                         monthsImage.set(month, []);
                    }
                    Src.forEach((item: string) => {
                         typeof Src !== undefined ? monthsImage.get(month)!.push(item) : null;
                    });
               }
          });
          return monthsImage;
     };
     const router = useRouter();
     const [galleryIsOpen, setGalleryIsOpen] = React.useState<boolean>(false);
     const dispatch: RootDispatch = useDispatch();
     const images: Map<string, string[]> = handlePushAndSortImages(targetChat);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[10]
                         : userThemeColorScheme.light[10]
               }}
               data-id={"1"}
               className="headerChatBox__toolbarMenu"
          >
               {targetChat.type === "CHANNEL" || targetChat.type === "GROUP" ? null : (
                    <div onClick={handleOpen} className="headerChatBox__toolbarMenuProfile">
                         <FaRegUserCircle size="30" color="grey"></FaRegUserCircle>
                         <p className="headerChatBox__toolbarMenuClearText">View profile</p>
                    </div>
               )}
               <div
                    onClick={() => dispatch(setClearChatHistory({ ID: id }))}
                    className="headerChatBox__toolbarMenuClear"
               >
                    <MdOutlineCleaningServices size="31" color="grey"></MdOutlineCleaningServices>
                    <p className="headerChatBox__toolbarMenuClearText">Clear chat</p>
               </div>

               <div
                    onClick={() => setGalleryIsOpen(!galleryIsOpen)}
                    className="headerChatBox__toolbarMenuDelete"
               >
                    <IoImages size="30" color="grey"></IoImages>
                    <p className="headerChatBox__toolbarMenuDeleteText" style={{ color: "white" }}>
                         Chat images
                    </p>
               </div>
               <div
                    onClick={() => {
                         dispatch(setDeleteChat({ ID: id })), router.back();
                    }}
                    className="headerChatBox__toolbarMenuDelete"
               >
                    <FaRegTrashAlt size="30" color="red"></FaRegTrashAlt>
                    <p className="headerChatBox__toolbarMenuDeleteText" style={{ color: "red" }}>
                         Delete chat
                    </p>
               </div>
               {galleryIsOpen ? (
                    <ChatGallery
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         setGalleryIsOpen={setGalleryIsOpen}
                         images={images}
                    ></ChatGallery>
               ) : null}
          </div>
     );
};
export default HeaderMessageMenu;
