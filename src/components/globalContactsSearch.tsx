"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootDispatch } from "@/StateManagment/store";
import { useRouter } from "next/navigation";
import {
     ChannelChat,
     GroupChat,
     UserInterface,
     setAddNewContactAndChat,
     setJoinToGroupAndChannel
} from "@/StateManagment/appSlice";
import { Chats } from "@/StateManagment/appSlice";
import gql from "graphql-tag";
import defaultImg from "../../public/icons/userFind.png";
import defaultChatImg from "../../public/icons/speech-bubble_3698075.png";
import { RootState } from "@/StateManagment/store";
import { UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import { roles } from "@/StateManagment/appSlice";
import { DuoChat } from "@/StateManagment/appSlice";
import { useMutation } from "@apollo/client";
import { useAddNewChatToPeopleByIdMutation } from "@/StateManagment/appApi";
const SHARE_CONTACT = gql`
     mutation addContactToUser(
          $contact: UserInterfaceForJoinUsersInput
          $contactId: String
          $userId: String
          $myContact: UserInterfaceForJoinUsersInput
     ) {
          addContactToUser(
               contact: $contact
               contactId: $contactId
               userId: $userId
               myContact: $myContact
          )
     }
`;
const SEND_CHAT_TO_USERS = gql`
     mutation sendNewDuoChatToUsers($chat: DuoChatInput, $contactId: String, $userId: String) {
          sendNewDuoChatToUsers(chat: $chat, contactId: $contactId, userId: $userId)
     }
`;
type typeSearch = {
     contacts?: (UserInterfaceForJoinUsers | Chats)[];
     userIsDarkTheme: boolean;
     userThemeColorScheme: any;
};
const GlobalContactSearch: React.FC<typeSearch> = ({
     contacts,
     userIsDarkTheme,
     userThemeColorScheme
}) => {
     const router = useRouter();
     const dispatch: RootDispatch = useDispatch();
     const user: UserInterface = useSelector((state: RootState) => state.User);
     const [addContact, { loading, error, data }] = useMutation(SHARE_CONTACT);
     const [sendChat, { loading: loadingSend, error: errorSend, data: dataSend }] =
          useMutation(SEND_CHAT_TO_USERS);
     const [addChat] = useAddNewChatToPeopleByIdMutation();
     const handleAddContactAndCreateNewChat = async (
          event: React.MouseEvent<HTMLDivElement>,
          contact: UserInterfaceForJoinUsers
     ) => {
          const ID: string = Math.fround(Math.random() * 9999).toString();

          dispatch(
               setAddNewContactAndChat({
                    contact: contact,
                    chatID: ID
               })
          );

          event.currentTarget.style.transform = "translateX(400px)";
          setTimeout(() => {
               router.push(`/${ID}`);
          }, 355);
          const contactWithoutTrash = {
               userDateRegistred: contact.userDateRegistred,
               userDescription: contact.userDescription,
               userEmail: contact.userEmail,
               userFriends: contact.userFriends,
               userGroups: contact.userGroups,
               userId: contact.userId,
               userImage: contact.userImage,
               userInstagramInfo: contact.userInstagramInfo,
               userIsOnline: contact.userIsOnline,
               userName: contact.userName,
               userPassword: contact.userPassword,
               userTelegramInfo: contact.userTelegramInfo,
               userChatID: ID
          };
          const myCont = {
               userDateRegistred: user.userDateRegistred,
               userDescription: user.userDescription,
               userEmail: user.userEmail,
               userFriends: user.userFriends,
               userGroups: user.userGroups,
               userId: user.userId,
               userImage: user.userImage,
               userInstagramInfo: user.userInstagramInfo,
               userIsOnline: user.userIsOnline,
               userName: user.userName,
               userPassword: user.userPassword,
               userTelegramInfo: user.userTelegramInfo,
               userChatID: ID
          };
          await addContact({
               variables: {
                    contact: contactWithoutTrash,
                    contactId: contact.userId,
                    userId: user.userId,
                    myContact: myCont
               }
          });
          const newDuoChat: DuoChat = {
               messages: [],
               joinUsers: {
                    one: {
                         userId: user.userId,
                         userName: user.userName,
                         userEmail: user.userEmail,
                         userPassword: user.userPassword,
                         userDateRegistred: user.userDateRegistred,
                         userTelegramInfo: user.userTelegramInfo,
                         userInstagramInfo: user.userInstagramInfo,
                         userIsOnline: user.userIsOnline,
                         userFriends: user.userFriends,
                         userImage: user.userImage,
                         userGroups: user.userGroups,
                         userDescription: user.userDescription
                    },
                    two: {
                         userId: contactWithoutTrash.userId,
                         userName: contactWithoutTrash.userName,
                         userEmail: contactWithoutTrash.userEmail,
                         userPassword: contactWithoutTrash.userPassword,
                         userDateRegistred: contactWithoutTrash.userDateRegistred,
                         userTelegramInfo: contactWithoutTrash.userTelegramInfo,
                         userInstagramInfo: contactWithoutTrash.userInstagramInfo,
                         userIsOnline: contactWithoutTrash.userIsOnline,
                         userFriends: contactWithoutTrash.userFriends,
                         userImage: contactWithoutTrash.userImage,
                         userGroups: contactWithoutTrash.userGroups,
                         userDescription: contactWithoutTrash.userDescription
                    }
               },
               chatId: ID,
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatImage: "",
                    chatName: "Новый чат",
                    chatDescription: "",
                    lastSendImg: "",
                    title: "Новый чат",
                    lastUserName: "",
                    value: "",
                    lastMessageDate: "",
                    flagCheck: false,
                    messageImage: ""
               },
               type: "DUO",
               pinnedMessage: [],
               chatOperation: 0
          };
          await sendChat({
               variables: { chat: newDuoChat, contactId: contact.userId, userId: user.userId }
          });
     };
     const handleJoinToChat = async (event: React.MouseEvent<HTMLDivElement>, chat: Chats) => {
          const dirtyUsers = chat.joinUsers as [];
          const usersOnTheChat: UserInterfaceForJoinUsers[] = dirtyUsers.map(
               (user: UserInterfaceForJoinUsers) => user
          );
          const targetChatToState: GroupChat | ChannelChat = {
               messages: Array.isArray(chat.messages) ? [...chat.messages] : [],
               joinUsers: [...usersOnTheChat],
               chatId: chat.chatId,
               chatDateInitialization: chat.chatDateInitialization,
               imagesChat: chat.imagesChat,
               info: {
                    ...chat.info
               },
               type: chat.type === "GROUP" ? "GROUP" : "CHANNEL",
               pinnedMessage: chat.pinnedMessage,
               chatOperation: chat.chatOperation
          };

          targetChatToState.chatId = targetChatToState.chatId.slice(
               1,
               targetChatToState.chatId.length
          );
          dispatch(setJoinToGroupAndChannel({ targetChat: targetChatToState }));
          event.currentTarget.style.transform = "translateX(400px)";

          const targetChatToDataBase: GroupChat | ChannelChat = {
               messages: Array.isArray(chat.messages) ? [...chat.messages] : [],
               joinUsers: [
                    ...usersOnTheChat,
                    {
                         userDateRegistred: user.userDateRegistred,
                         userDescription: user.userDescription,
                         userFriends: user.userFriends,
                         userId: user.userId,
                         userEmail: user.userEmail,
                         userGroups: user.userGroups,
                         userImage: user.userImage,
                         userInstagramInfo: user.userInstagramInfo,

                         userIsOnline: user.userIsOnline,
                         userName: user.userName,
                         userPassword: user.userPassword,
                         userTelegramInfo: user.userTelegramInfo,
                         userRole: roles.guest
                    }
               ],
               chatId: chat.chatId,
               chatDateInitialization: chat.chatDateInitialization,
               imagesChat: chat.imagesChat,
               info: {
                    ...chat.info
               },
               type: chat.type === "GROUP" ? "GROUP" : "CHANNEL",
               pinnedMessage: chat.pinnedMessage,
               chatOperation: chat.chatOperation
          };
          const respons = await fetch(
               "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
               {
                    headers: { "Content-Type": "application/json" },
                    method: "GET"
               }
          );
          let userKey: string = "";
          const parseResponse = await respons.json();
          for (const [key, value] of Object.entries(parseResponse) as [string, UserInterface][]) {
               if (value.userId === user.userId) {
                    userKey = key;
                    break;
               }
          }
          await addChat({ chat: targetChatToDataBase, userId: userKey });
          setTimeout(() => {
               router.push(`/${targetChatToState.chatId}`);
          }, 355);
     };

     return (
          <div
               className="globalSearch"
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[6]
                         : userThemeColorScheme.light[6]
               }}
          >
               {contacts?.map((contact: UserInterfaceForJoinUsers | Chats, index: number) => {
                    return !("type" in contact) ? (
                         <div
                              key={index}
                              onClick={(event) => handleAddContactAndCreateNewChat(event, contact)}
                              style={{
                                   background: userIsDarkTheme ? "#8987d3b8" : "white",
                                   borderLeft: !userIsDarkTheme
                                        ? "10px solid rgb(43, 174, 226, 0.4)"
                                        : "10px solid rgb(12, 14, 125,0.5)"
                              }}
                              className="globalSearch__item"
                         >
                              <img
                                   src={contact.userImage ? contact.userImage : defaultImg.src}
                                   className="globalSearch__itemImage"
                              ></img>
                              <div className="globalSearch__itemTexts">
                                   <h1 className="globalSearch__itemName">{contact.userName}</h1>
                                   <span className="globalSearch__itemId">{contact.userId}</span>
                              </div>
                         </div>
                    ) : (
                         <div
                              key={index}
                              onClick={(event) => handleJoinToChat(event, contact)}
                              style={{
                                   background: userIsDarkTheme ? "#1882f2" : "#659edb",
                                   borderLeft: !userIsDarkTheme
                                        ? "10px solid rgb(43, 174, 226, 0.4)"
                                        : "10px solid rgb(12, 14, 125,0.5)"
                              }}
                              className="globalSearch__item"
                         >
                              <img
                                   src={
                                        contact.info.chatImage
                                             ? contact.info.chatImage
                                             : defaultChatImg.src
                                   }
                                   className="globalSearch__itemImage"
                              ></img>
                              <div className="globalSearch__itemTexts">
                                   <h1 className="globalSearch__itemName">
                                        {contact.info.chatName}
                                   </h1>
                                   <span className="globalSearch__itemId">{contact.chatId}</span>
                              </div>
                         </div>
                    );
               })}
          </div>
     );
};
export default GlobalContactSearch;
