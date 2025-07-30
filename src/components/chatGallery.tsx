"use client";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { JSX } from "react";
interface typeGallery {
     images: Map<string, string[]>;
     setGalleryIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     language: string;
}
const ChatGallery: React.FC<typeGallery> = ({
     images,
     setGalleryIsOpen,
     userIsDarkTheme,
     userThemeColorScheme,
     language
}) => {
     const handleCreateGallery = (images: Map<string, string[]>): JSX.Element[] => {
          const list: JSX.Element[] = [];
          images.forEach((item: string[], key: string) => {
               list.push(
                    <div className={"chatBox__galleryInnerItemCont"} key={Math.random() * 11111}>
                         <p className={"chatBox__galleryInnerItemTitle"} key={key}>
                              {key}
                         </p>
                         {item.map((itemSrc, index) => {
                              return (
                                   <img
                                        loading="lazy"
                                        className="chatBox__galleryInnerItem"
                                        key={index + key}
                                        src={itemSrc}
                                   ></img>
                              );
                         })}
                    </div>
               );
          });
          return list;
     };
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[10]
                         : userThemeColorScheme.light[10]
               }}
               className="chatBox__gallery"
          >
               <header className="chatBox__galleryHeader">
                    <FaArrowLeftLong
                         onClick={() =>
                              setGalleryIsOpen((prevstate: boolean) => {
                                   const newState = !prevstate;
                                   return newState;
                              })
                         }
                         size="35"
                         color="white"
                         className="chatBox__galleryBack"
                    ></FaArrowLeftLong>
                    <span className="chatBox__galleryTitle">
                         {language === "RUSSIAN" ? "Галерея" : "Gallery"}
                    </span>
                    <IoMdClose
                         onClick={() =>
                              setGalleryIsOpen((prevstate: boolean) => {
                                   const newState = !prevstate;
                                   return newState;
                              })
                         }
                         size="40"
                         color="white"
                         className="chatBox__galleryClose"
                    ></IoMdClose>
               </header>
               <div className="chatBox__galleryInner">
                    {handleCreateGallery(images).map((item, index: number) => {
                         return <div key={index}>{item}</div>;
                    })}
               </div>
          </div>
     );
};
export default ChatGallery;
