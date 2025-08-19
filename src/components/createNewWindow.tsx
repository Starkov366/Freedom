"use client";
import React from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import {
     setCreateNewGroup,
     setCreateNewChannel,
     setEditGroup,
     Chats
} from "@/StateManagment/appSlice";
import type { ChatInfo, UserInterface } from "@/StateManagment/appSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/StateManagment/store";
import { useSelector } from "react-redux";
import {
     useAddNewGroupOrChannelChatMutation,
     useAddNewChatToPeopleByIdMutation,
     useUpdateChatInfoMutation
} from "@/StateManagment/appApi";
import { ChannelChat } from "../StateManagment/appSlice";
import { roles } from "@/StateManagment/appSlice";
import { GroupChat } from "@/StateManagment/appSlice";
const CreateNewWindow = ({
     userIsDarkTheme,
     userThemeColorScheme,
     isChannel,
     setIsOpen,
     isEditMode,
     idChat,
     language
}: {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     isChannel: string;
     setIsOpen: React.Dispatch<
          React.SetStateAction<{
               type: string | any;
               isOpen: boolean;
          }>
     >;
     isEditMode: boolean;
     idChat?: string;
     language: string;
}) => {
     const state = useSelector((store: RootState) => store.User);
     const [addChat] = useAddNewGroupOrChannelChatMutation();
     const [addChatToPeople] = useAddNewChatToPeopleByIdMutation();
     const dispatch: RootDispatch = useDispatch();
     const [updateInfo] = useUpdateChatInfoMutation();
     const router = useRouter();
     const inputRef = React.useRef<HTMLInputElement | null>(null);
     const [image, setImage] = React.useState<string>();
     const [isFile, setIsFile] = React.useState<boolean>(true);
     const [name, setName] = React.useState<string>("");
     const [description, setDescription] = React.useState<string>("");
     const handleSetImage = () => {
          if (inputRef.current) {
               inputRef.current.click();
          }
     };
     const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
          const image = event.target.files?.[0];
          if (image !== undefined) {
               const stringImage = URL.createObjectURL(image!);
               const formData = new FormData();
               formData.append("image", image);
               const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=2322e95855d517dcba7efc53b86e7f6b`,
                    {
                         method: "POST",
                         body: formData
                    }
               );
               const ready = await res.json();
               const link = ready.data.url as string;
               setImage(link);
               console.log(link, "ССЫЛКА");
               setIsFile(false);
          }
     };
     const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
     };
     const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
     };
     const handleCloseModal = (id: string, isEdit: boolean) => {
          if (!isEdit) {
               setIsOpen((prev) => {
                    const newState = {
                         type: prev?.type,
                         isOpen: false
                    };
                    return newState;
               });
               router.push(id);
          } else {
               setIsOpen((prev) => {
                    const newState = {
                         type: prev?.type,
                         isOpen: false
                    };
                    return newState;
               });
          }
     };

     const handleCreateGroupOrChannel = async (
          img: string | undefined,
          name: string,
          description: string,
          type: string,
          id: string
     ) => {
          const keyAndName: { key: string; value: Chats | null } = {
               key: "",
               value: null
          };
          if (isChannel === "group") {
               if (img && img.length > 2) {
                    dispatch(
                         setCreateNewGroup({
                              img: img,
                              name: name,
                              description: description,
                              id: id
                         })
                    );
               } else {
                    dispatch(
                         setCreateNewGroup({
                              img: "",
                              name: name,
                              description: description,
                              id
                         })
                    );
               }
               const newGroup: GroupChat = {
                    messages: [],
                    joinUsers: [
                         {
                              userDateRegistred: state.userDateRegistred,
                              userDescription: state.userDescription,
                              userFriends: state.userFriends,
                              userId: state.userId,
                              userEmail: state.userEmail,
                              userGroups: state.userGroups,
                              userImage: state.userImage,
                              userInstagramInfo: state.userInstagramInfo,

                              userIsOnline: state.userIsOnline,
                              userName: state.userName,
                              userPassword: state.userPassword,
                              userTelegramInfo: state.userTelegramInfo,
                              userRole: roles.admin
                         }
                    ],
                    chatId: id,
                    chatDateInitialization: new Date().toString(),
                    imagesChat: img ? img : "",
                    info: {
                         chatDescription: description,
                         chatImage: img ? img : "",
                         chatName: name,
                         lastMessageDate: "",
                         lastUserName: "",
                         lastSendImg: img ? img : "",
                         title: name,
                         flagCheck: false,
                         value: "",
                         messageImage: ""
                    },
                    type: "GROUP",
                    pinnedMessage: [],
                    chatOperation: 0
               };
               await addChat(newGroup);
               const users = await fetch(
                    "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                    {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         }
                    }
               );
               const readyUsers = await users.json();
               for (const [key, val] of Object.entries(readyUsers)) {
                    const value = val as UserInterface;
                    if (value.userName === state.userName) {
                         keyAndName["key"] = key;
                         keyAndName["value"] = newGroup;
                         break;
                    }
               }
               keyAndName.value
                    ? await addChatToPeople({ chat: keyAndName.value, userId: keyAndName.key })
                    : null;
          } else {
               if (img) {
                    dispatch(
                         setCreateNewChannel({
                              img: img,
                              name: name,
                              description: description,
                              id: id
                         })
                    );
               } else {
                    dispatch(
                         setCreateNewChannel({
                              img: "",
                              name: name,
                              description: description,
                              id: id
                         })
                    );
               }
               const newChannel: ChannelChat = {
                    messages: [],
                    joinUsers: [
                         {
                              userDateRegistred: state.userDateRegistred,
                              userDescription: state.userDescription,
                              userFriends: state.userFriends,
                              userId: state.userId,
                              userEmail: state.userEmail,
                              userGroups: state.userGroups,
                              userImage: state.userImage,
                              userInstagramInfo: state.userInstagramInfo,

                              userIsOnline: state.userIsOnline,
                              userName: state.userName,
                              userPassword: state.userPassword,
                              userTelegramInfo: state.userTelegramInfo,
                              userRole: roles.admin
                         }
                    ],
                    chatId: id,
                    chatDateInitialization: new Date().toString(),
                    imagesChat: img ? img : "",
                    info: {
                         chatDescription: description,
                         chatImage: img ? img : "",
                         chatName: name,
                         lastMessageDate: "",
                         lastUserName: "",
                         lastSendImg: img ? img : "",
                         title: name,
                         flagCheck: false,
                         value: "",
                         messageImage: ""
                    },
                    type: "CHANNEL",
                    pinnedMessage: [],
                    chatOperation: 0
               };

               await addChat(newChannel);
               const users = await fetch(
                    "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                    {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         }
                    }
               );
               const readyUsers = await users.json();
               for (const [key, val] of Object.entries(readyUsers)) {
                    const value = val as UserInterface;
                    if (value.userName === state.userName) {
                         keyAndName["key"] = key;
                         keyAndName["value"] = newChannel;
                         break;
                    }
               }
               keyAndName.value
                    ? await addChatToPeople({ chat: keyAndName.value, userId: keyAndName.key })
                    : null;
          }
          handleCloseModal(id, false);
     };
     const handleEditGroup = async (
          idChat: string,
          newImage: string,
          newName: string,
          newDescription: string
     ) => {
          const responseChat = await fetch(
               "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomChats.json",
               {
                    headers: { "Content-Type": "application/json" },
                    method: "GET"
               }
          );
          let chatKey: string = "";
          const parseResponseChat = await responseChat.json();
          for (const [key, value] of Object.entries(parseResponseChat) as [string, Chats][]) {
               if (value.chatId === idChat) {
                    chatKey = key;
                    break;
               }
          }
          const newInfo: ChatInfo = {
               chatDescription: newDescription,
               chatImage: newImage,
               chatName: newName,
               title: newName,
               lastSendImg: newImage,
               lastUserName: "SYSTEM: ",
               lastMessageDate: new Date().toString(),
               messageImage: newImage,
               flagCheck: false,
               value: "[ГРУППА ИЗМЕНЕНА]"
          };
          await fetch(
               `https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomChats/${chatKey}/imagesChat.json`,
               {
                    headers: { "Content-Type": "application/json" },
                    method: "PUT",
                    body: JSON.stringify(newImage)
               }
          );
          updateInfo({ chatId: chatKey, newInfo: newInfo });
          dispatch(
               setEditGroup({
                    idChat: idChat,
                    newImage: newImage,
                    newName: newName,
                    newDescription: newDescription
               })
          );
          setIsOpen({ type: "", isOpen: false });
     };
     React.useEffect(() => {
          setImage("");
          setIsFile(true);
     }, []);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[9]
                         : userThemeColorScheme.light[10]
               }}
               className="createNewWindow"
          >
               <div className="createNewWindow__header">
                    <img src={image ? image : "222"} className="createNewWindow__headerImg"></img>
                    {isFile ? (
                         <MdAddPhotoAlternate
                              onClick={() => handleSetImage()}
                              className="createNewWindow__headerAddIcon"
                              size={45}
                              color="gray"
                         ></MdAddPhotoAlternate>
                    ) : null}
                    <div className="createNewWindow__infoTitle">
                         <span className="createNewWindow__infoTitleLabel">
                              {isChannel[0].toUpperCase() + isChannel.slice(1, 7) === "Channel"
                                   ? `${language === "RUSSIAN" ? "Канал" : "Channel"}`
                                   : `${language === "RUSSIAN" ? "Группа" : "Group"}`}
                              {language === "RUSSIAN" ? " название" : " name"}
                         </span>
                         <input
                              onChange={(event) => handleSetName(event)}
                              placeholder={
                                   language === "RUSSIAN"
                                        ? "Название обязательно"
                                        : "Name is required"
                              }
                              className="createNewWindow__infoTitleInput"
                              value={name}
                         ></input>
                    </div>
               </div>
               <input
                    onChange={(event) => handleSetDescription(event)}
                    className="createNewWindow__description"
                    placeholder={
                         language === "RUSSIAN" ? "Описание(по желанию)" : "Description(optional)"
                    }
                    value={description}
               ></input>
               <div className="createNewWindow__btns">
                    <button
                         onClick={() => handleCloseModal("/", true)}
                         className="createNewWindow__btnsCancel"
                    >
                         {language === "RUSSIAN" ? "отменить" : "cancel"}
                    </button>
                    <button
                         onClick={() => {
                              !isEditMode
                                   ? handleCreateGroupOrChannel(
                                          image,
                                          name,
                                          description,
                                          isChannel,
                                          Math.floor(Math.random() * 10000000).toString()
                                     )
                                   : handleEditGroup(idChat!, image!, name, description);
                         }}
                         className="createNewWindow__btnsAcess"
                    >
                         {isEditMode
                              ? `${language === "RUSSIAN" ? "редактировать" : "edit"}`
                              : `${language === "RUSSIAN" ? "создать" : "create"}`}
                    </button>
               </div>
               <input
                    onChange={(event) => handleOnChange(event)}
                    style={{ visibility: "hidden" }}
                    type="file"
                    ref={inputRef}
               ></input>
          </div>
     );
};
export default CreateNewWindow;
