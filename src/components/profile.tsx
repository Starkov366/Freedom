"use client";
import React, { ChangeEvent, ElementType } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import PolyComponent from "./polyComponent";
import { BsTelegram } from "react-icons/bs";
import { RootState, RootDispatch } from "@/StateManagment/store";
import { UseDispatch, useDispatch } from "react-redux";
import { setUpdateUserInfo } from "@/StateManagment/appSlice";

import image from "../../public/icons/background.png";
type ProfileProps = {
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
     name: string;
     countFriends: number;
     countGroups: number;
     description: string;
     userId: string;
     img: string;
     email: string;
     telegram: string;
     instagram: string;
     edit?: boolean;

     as: ElementType;
     owner?: boolean;
};
enum TYPES {
     "description" = "description",
     "email" = "email",
     "telegram" = "telegram",
     "instagram" = "instagram",
     "userId" = "userId"
}
const Profile = ({
     setProfileOpen,
     name,
     countFriends,
     countGroups,
     description,
     userId,
     email,
     telegram,
     instagram,

     edit,
     as,
     owner,
     setEdit,
     img
}: ProfileProps) => {
     const [values, setValue] = React.useState({
          description: description,
          userId: userId,
          email: email,
          telegram: telegram,
          instagram: instagram,
          img: img
     });
     const dispatch: RootDispatch = useDispatch();
     const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target;
          const type = input.dataset.type as string;
          const value = input.value;
          console.log(
               type,
               value,
               "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
          );
          setValue((prevState) => {
               const newState = {
                    ...prevState,
                    [type]: value
               };

               return newState;
          });
     };
     const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
          dispatch(setUpdateUserInfo({ userInfo: values }));
     };

     return (
          <div className="profile">
               <div className="profile__topInfo">
                    <div className="profile__topInfoHeader">
                         <FaArrowLeftLong
                              onClick={() => setProfileOpen(false)}
                              size="32"
                              color="white"
                              style={{ marginRight: owner ? "0px" : "30%" }}
                         ></FaArrowLeftLong>
                         <h1 className="profile__topInfoTitle">Profile</h1>
                         {owner ? (
                              <MdOutlineEdit
                                   onClick={() =>
                                        setEdit!((pre: boolean) => {
                                             const newPre = !pre;
                                             setEdit!(newPre);
                                             return newPre;
                                        })
                                   }
                                   size="32"
                                   color="white"
                              ></MdOutlineEdit>
                         ) : null}
                    </div>
                    <div className="profile__topInfoMain">
                         <img className="profile__topInfoMainImg" src={img}></img>
                         <p className="profile__topInfoMainName">{name}</p>
                    </div>
                    <div className="profile__topInfoFooter">
                         <span className="profile__topInfoFooterFriends">
                              Count of friends: {countFriends}
                         </span>
                         <span className="profile__topInfoFooterGroups">
                              Count of groups: {countGroups}
                         </span>
                    </div>
               </div>
               <div className="profile__info">
                    <div className="profile__infoDescription">
                         <div className="profile__infoDescriptionInner">
                              <PolyComponent
                                   onChange={(event: any) => handleChangeData(event)}
                                   onBlur={(event: any) => handleBlur(event)}
                                   data-type={TYPES.description}
                                   as={edit ? "input" : "p"}
                                   value={values.description}
                                   className="profile__infoDescriptionInnerInput"
                              >
                                   {description}
                              </PolyComponent>
                         </div>
                    </div>
                    <div className="profile__infoUserId">
                         <GrStatusInfo className="i" size="32" color="grey"></GrStatusInfo>
                         <div className="profile__infoUserIdInner">
                              <p className="profile__infoUserIdInnerLabel">Looser ID</p>
                              <PolyComponent
                                   onChange={(event: any) => handleChangeData(event)}
                                   onBlur={(event: any) => handleBlur(event)}
                                   data-type={TYPES.userId}
                                   as={as}
                                   value={values.userId}
                                   className="profile__infoUserIdInnerInput"
                              >
                                   {userId}
                              </PolyComponent>
                         </div>
                    </div>
                    <div className="profile__infoEmail">
                         <MdOutlineMailOutline
                              className="i"
                              size="32"
                              color="grey"
                         ></MdOutlineMailOutline>
                         <div className="profile__infoEmailInner">
                              <p className="profile__infoEmailInnerLabel">Email</p>
                              <PolyComponent
                                   onChange={(event: any) => handleChangeData(event)}
                                   onBlur={(event: any) => handleBlur(event)}
                                   data-type={TYPES.email}
                                   as={as}
                                   value={values.email}
                                   className="profile__infoEmailInnerInput"
                              >
                                   {email}
                              </PolyComponent>
                         </div>
                    </div>
                    <div className="profile__infoTelegram">
                         <BsTelegram className="i" size="32" color="grey"></BsTelegram>
                         <div className="profile__infoTelegramInner">
                              <p className="profile__infoTelegramInnerLabel">Telegram</p>
                              <PolyComponent
                                   onChange={(event: any) => handleChangeData(event)}
                                   onBlur={(event: any) => handleBlur(event)}
                                   data-type={TYPES.telegram}
                                   as={as}
                                   value={values.telegram}
                                   className="profile__infoTelegramInnerInput"
                              >
                                   {telegram}
                              </PolyComponent>
                         </div>
                    </div>
                    <div className="profile__infoInstagram">
                         <FaInstagram className="i" size="32" color="grey"></FaInstagram>
                         <div className="profile__infoInstagramInner">
                              <p className="profile__infoInstagramInnerLabel">Instagram</p>
                              <PolyComponent
                                   onChange={(event: any) => handleChangeData(event)}
                                   onBlur={(event: any) => handleBlur(event)}
                                   data-type={TYPES.instagram}
                                   as={as}
                                   value={values.instagram}
                                   className="profile__infoInstagramInnerInput"
                              >
                                   {instagram}
                              </PolyComponent>
                         </div>
                    </div>
               </div>
          </div>
     );
};
export default Profile;
