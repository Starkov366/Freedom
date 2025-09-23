"use client";
import React, { ElementType, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";

import { useSelector } from "react-redux";
import PolyComponent from "./polyComponent";
import { BsTelegram } from "react-icons/bs";
import {
     useUpdateUserInfoTelegramMutation,
     useUpdateUserInfoEmailMutation,
     useUpdateUserInfoIDMutation,
     useUpdateUserInfoImgMutation,
     useUpdateUserInfoInstagramMutation,
     useUpdateUserInfoDescriptionMutation
} from "@/StateManagment/appApi";
import { RootState, RootDispatch } from "@/StateManagment/store";
import { useDispatch } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";
import { UserInterface, setUpdateFlag, setUpdateUserInfo } from "@/StateManagment/appSlice";

import imageAnonym from "../../public/icons/6139.jpg";
type ProfileProps = {
     setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
     setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
     name: string;
     description: string;
     userId: string;
     img: string;
     email: string;
     telegram: string;
     instagram: string;
     edit?: boolean;
     as: ElementType;
     owner?: boolean;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     type?: string;
     language: string;
     setIsProfileFlag?: React.Dispatch<React.SetStateAction<boolean>>;
     isProfileFlag?: boolean;
};
enum TYPES {
     "description" = "description",
     "email" = "email",
     "telegram" = "telegram",
     "instagram" = "instagram",
     "userId" = "userId",
     "img" = "img"
}
const Profile = React.memo(
     ({
          setProfileOpen,
          name,
          description,
          userId,
          email,
          telegram,
          instagram,
          edit,
          as,
          owner,
          setEdit,
          img,
          userIsDarkTheme,
          userThemeColorScheme,
          language,
          setIsProfileFlag
     }: ProfileProps) => {
          const file = useRef<HTMLInputElement | null>(null);
          const [updateUserInfoT] = useUpdateUserInfoTelegramMutation();
          const [updateUserInfoInstg] = useUpdateUserInfoInstagramMutation();
          const [updateUserInfoId] = useUpdateUserInfoIDMutation();
          const [updateUserInfoE] = useUpdateUserInfoEmailMutation();
          const [updateUserInfoImg] = useUpdateUserInfoImgMutation();
          const [updateUserInfoDescription] = useUpdateUserInfoDescriptionMutation();
          const [values, setValue] = React.useState({
               description: description,
               userId: userId,
               email: email,
               telegram: telegram,
               instagram: instagram,
               img: img
          });

          const dispatch: RootDispatch = useDispatch();
          const user = useSelector((state: RootState) => state.User);
          const handleChangeData = async (
               event: React.ChangeEvent<HTMLInputElement>,
               file?: boolean
          ) => {
               if (!file) {
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
               } else if (file) {
                    const input = event.target;
                    const type = input.dataset.type as string;
                    const value = input.files?.[0];
                    const image: string = URL.createObjectURL(value!);
                    const formData = new FormData();
                    formData.append("image", value!);
                    const res = await fetch(
                         `https://api.imgbb.com/1/upload?key=2322e95855d517dcba7efc53b86e7f6b`,
                         {
                              method: "POST",
                              body: formData
                         }
                    );
                    const ready = await res.json();
                    const link = ready.data.url as string;
                    console.log(link, "ССЫЛКА");
                    console.log(
                         type,
                         image,
                         "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
                    );
                    setValue((prevState) => {
                         const newState = {
                              ...prevState,
                              [type]: link
                         };

                         return newState;
                    });
               }
          };
          const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
               dispatch(setUpdateUserInfo({ userInfo: values }));
          };
          const handleChoiseImage = () => {
               if (file.current) {
                    file.current.click();
               }
          };
          const keyAndName: { key: string; value: string } = {
               key: "",
               value: ""
          };
          React.useEffect(() => {
               const asyncUpdate = async () => {
                    try {
                         const usersRes = await fetch(
                              "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                              { method: "GET", headers: { "Content-Type": "application/json" } }
                         );
                         const users = await usersRes.json();

                         let userKey = "";
                         for (const [key, val] of Object.entries(users)) {
                              const value = val as UserInterface;
                              if (value.userName === name) {
                                   userKey = key;
                                   break;
                              }
                         }
                         if (!userKey) return;

                         if (values.telegram !== user.userTelegramInfo) {
                              updateUserInfoT({ key: userKey, value: values.telegram });
                         }
                         if (values.email !== user.userEmail) {
                              updateUserInfoE({ key: userKey, value: values.email });
                         }
                         if (values.instagram !== user.userInstagramInfo) {
                              updateUserInfoInstg({ key: userKey, value: values.instagram });
                         }
                         if (values.userId !== user.userId) {
                              updateUserInfoId({ key: userKey, value: values.userId });
                         }
                         if (values.description !== user.userDescription) {
                              updateUserInfoDescription({
                                   key: userKey,
                                   value: values.description
                              });
                         }
                         if (values.img !== user.userImage) {
                              updateUserInfoImg({ key: userKey, value: values.img });
                         }
                    } catch (error) {
                         console.error(error);
                    }
               };

               asyncUpdate();
          }, [values]);
          React.useEffect(() => {
               if (setIsProfileFlag) {
                    return () => setIsProfileFlag(false);
               }
          }, []);
          return (
               <div
                    className="profile"
                    style={{
                         background: userIsDarkTheme
                              ? userThemeColorScheme.dark[10]
                              : userThemeColorScheme?.light[10]
                    }}
               >
                    <div className="profile__topInfo">
                         <div className="profile__topInfoHeader">
                              <FaArrowLeftLong
                                   onClick={() => setProfileOpen(false)}
                                   size="32"
                                   color="white"
                                   style={{ marginRight: owner ? "0px" : "30%" }}
                                   className="profile__topInfoHeaderClose"
                              ></FaArrowLeftLong>
                              <h1 className="profile__topInfoTitle">
                                   {language === "RUSSIAN" ? "Профиль" : "Profile"}
                              </h1>
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
                              <img
                                   className="profile__topInfoMainImg"
                                   src={values.img ? values.img : imageAnonym.src}
                              ></img>
                              {as === "input" ? (
                                   <MdAddPhotoAlternate
                                        onClick={() => handleChoiseImage()}
                                        className="profile__topInfoMainImgEdit"
                                        color="white"
                                        size={40}
                                   ></MdAddPhotoAlternate>
                              ) : null}

                              <p className="profile__topInfoMainName">{name}</p>
                         </div>
                         <div className="profile__topInfoFooter">
                              <span className="profile__topInfoFooterFriends">
                                   {language === "RUSSIAN"
                                        ? "Количество контактов: "
                                        : "Count of contacts: "}
                              </span>
                              <span className="profile__topInfoFooterGroups">
                                   {language === "RUSSIAN"
                                        ? "Количество групп: "
                                        : "Count of groups: "}{" "}
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
                                        as={as}
                                        value={values.description}
                                        className="profile__infoDescriptionInnerInput"
                                   >
                                        {description}
                                   </PolyComponent>
                              </div>
                         </div>
                         <div className="profile__infoUserId">
                              <GrStatusInfo className="i" size="32" color="white"></GrStatusInfo>
                              <div className="profile__infoUserIdInner">
                                   <p className="profile__infoUserIdInnerLabel">
                                        {language === "RUSSIAN" ? "ID пользователя" : "User ID"}
                                   </p>
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
                                   color="white"
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
                              <BsTelegram className="i" size="32" color="white"></BsTelegram>
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
                              <FaInstagram className="i" size="32" color="white"></FaInstagram>
                              <div className="profile__infoInstagramInner">
                                   <span className="profile__infoInstagramInnerLabel">
                                        Instagram
                                   </span>
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
                    <input
                         onChange={(event: any) => handleChangeData(event, true)}
                         onBlur={(event: any) => handleBlur(event)}
                         type="file"
                         ref={file}
                         style={{ visibility: "hidden" }}
                         data-type={TYPES.img}
                    ></input>
               </div>
          );
     }
);
export default Profile;
