import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
const HeaderMessageMenu = ({
     setProfileOpen
}: {
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
     const handleOpen = () => {
          setProfileOpen((flag: boolean) => {
               const newFlag: boolean = !flag;
               setProfileOpen(newFlag);
               return newFlag;
          });
     };
     return (
          <div data-id={"1"} className="headerChatBox__toolbarMenu">
               <div onClick={handleOpen} className="headerChatBox__toolbarMenuProfile">
                    <FaRegUserCircle size="30" color="grey"></FaRegUserCircle>
                    <p className="headerChatBox__toolbarMenuClearText">View profile</p>
               </div>
               <div className="headerChatBox__toolbarMenuClear">
                    <MdOutlineCleaningServices size="31" color="grey"></MdOutlineCleaningServices>
                    <p className="headerChatBox__toolbarMenuClearText">Clear chat</p>
               </div>

               <div className="headerChatBox__toolbarMenuDelete">
                    <IoImages size="30" color="grey"></IoImages>
                    <p className="headerChatBox__toolbarMenuDeleteText" style={{ color: "white" }}>
                         Chat images
                    </p>
               </div>
               <div className="headerChatBox__toolbarMenuDelete">
                    <FaRegTrashAlt size="30" color="red"></FaRegTrashAlt>
                    <p className="headerChatBox__toolbarMenuDeleteText" style={{ color: "red" }}>
                         Delete chat
                    </p>
               </div>
          </div>
     );
};
export default HeaderMessageMenu;
