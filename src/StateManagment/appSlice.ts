import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { title } from "process";
import { typeBoxMessageItem } from "../components/chatBoxMessageItem";
import { RootState } from "./store";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { FORMERR } from "dns";
import { isArray } from "@apollo/client/utilities";

export type ChatInfo = {
     chatImage: string;
     chatName: string;
     chatDescription: string;
     lastSendImg: string;
     title: string;
     lastUserName: string;
     value: string;
     lastMessageDate: string;
     flagCheck: boolean;
     messageImage: string;
};
export enum roles {
     admin = "ADMIN",
     guest = "GUEST"
}
export type GroupChat = {
     messages: typeBoxMessageItem[];
     joinUsers: UserInterfaceForJoinUsers[];
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "GROUP";
     pinnedMessage: string[];
     chatOperation: number;
};
export type DuoChat = {
     messages: typeBoxMessageItem[];
     joinUsers: { one: UserInterfaceForJoinUsers; two: UserInterfaceForJoinUsers };
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "DUO";
     pinnedMessage: string[];
     chatOperation: number;
};
export type ChannelChat = {
     messages: typeBoxMessageItem[];
     joinUsers: UserInterfaceForJoinUsers[];
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "CHANNEL";
     pinnedMessage: string[];
     chatOperation: number;
};
export type SavedMessagesChat = {
     messages: typeBoxMessageItem[];
     chatId: string;
     joinUsers: null;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "SAVED";
     pinnedMessage: string[];
     chatOperation: number;
};
export type Chats = GroupChat | DuoChat | ChannelChat | SavedMessagesChat;
export interface UserInterfaceForJoinUsers {
     userId: string;
     userName: string;
     userEmail: string;
     userPassword: string;
     userDateRegistred: string;
     userTelegramInfo: string;
     userInstagramInfo: string;
     userIsOnline: boolean;
     userFriends: string[] | string;
     userImage: string;
     userGroups: number;
     userDescription: string;
     userChatID?: string;
     userRole?: roles;
}
export interface UserInterface {
     userId: string;
     userName: string;
     userEmail: string;
     userPassword: string;
     userDateRegistred: string;
     userTelegramInfo: string;
     userInstagramInfo: string;
     userIsOnline: boolean;
     userChats: Chats[];
     userFriends: string[] | string;
     userImage: string;
     userContacts: UserInterfaceForJoinUsers[] | [];
     userGroups: number;
     userDescription: string;
     userThemeColorShceme: { dark: string[]; light: string[] };
     userIsDarkTheme: boolean;
     userLanguage: "ENGLISH" | "RUSSIAN";
     updateFlag?: boolean;
}

export const fetchUserData = createAsyncThunk("getData", async () => {
     const userName: string | null = localStorage.getItem("USERNAME");
     if (userName) {
          console.log("АЙДИ", userName);

          const UserData = await fetch(
               "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
               { headers: { "Content-Type": "application/json" }, method: "GET" }
          );
          const data = await UserData.json();
          let user: UserInterface | null = null;
          for (const value of Object.values(data) as UserInterface[]) {
               if (value.userName === userName) {
                    user = value;
               }
          }
          if (user) {
               user.userThemeColorShceme = {
                    dark: [
                         "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
                         "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
                         "#b3afaf",
                         "rgb(62 75 112)",
                         "linear-gradient(135deg, rgb(0 10 146), rgb(4 6 15))",
                         "rgb(128 125 155)",
                         "#565677",
                         "linear-gradient(90deg, #121959, #172179, #384194)",
                         "#192377",
                         "linear-gradient(90deg, #1a215fb6, #202a86b4, #384194b2)",
                         "linear-gradient(90deg, #1a215fb6, #202a86b4, #384194b2)"
                    ],
                    light: [
                         "linear-gradient(135deg, rgb(53 53 53), rgb(184 179 179), rgb(84 84 84))",
                         "white",
                         "black",
                         "white",
                         "linear-gradient(135deg, #d0f0fd, #a0d8ef, #70b7e0)",
                         "#b0afb9",
                         "#e0e0e0",
                         "linear-gradient(190deg, #b0b4d3, #848cd3, #9496a7)",
                         "#b6bbe6",
                         "linear-gradient(195deg, #d39999, #abe7ff, #caace2)",
                         "linear-gradient(135deg, rgb(255, 209, 148), rgb(152 220 247 / 73%), rgb(193 213 227 / 75%), rgb(122 143 219 / 75%))"
                    ]
                    // 1 bPanel 2 header 3 strings, 4messagesB,5 chatBoxB, 6 messageMenu 7 messageMenuB 8 settingsBody 9 settingTop 10 module 11 profile
               };
               return user;
          } else {
          }
     }
});
export const mainState: UserInterface = {
     userLanguage: "RUSSIAN",
     userId: "123",
     userName: "Starkov",
     userEmail: "valuznnicatem@gmail.com",
     userPassword: "93334562aaa",
     userDateRegistred: new Date("2022-02-22T00:00:00Z").toString(),
     userTelegramInfo: "no",
     userInstagramInfo: "no",
     userIsOnline: true,
     userContacts: [],
     updateFlag: true,
     userFriends: ["wewfwef", "qwdqwdqwd", "dwqwdqw"],
     userImage:
          "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
     userGroups: 0,
     userIsDarkTheme: false,
     userThemeColorShceme: {
          dark: [
               "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
               "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
               "#b3afaf",
               "rgb(62 75 112)",

               "linear-gradient(135deg, rgb(0 10 146), rgb(4 6 15))",
               "rgb(128 125 155)",
               "#565677",
               "linear-gradient(90deg, #121959, #172179, #384194)",
               "#192377",
               "linear-gradient(90deg, #1a215fb6, #202a86b4, #384194b2)",
               "linear-gradient(90deg, #1a215fb6, #202a86b4, #384194b2)"
          ],
          light: [
               "linear-gradient(135deg, rgb(53 53 53), rgb(184 179 179), rgb(84 84 84))",
               "white",
               "black",
               "white",
               "linear-gradient(135deg, #d0f0fd, #a0d8ef, #70b7e0)",
               "#b0afb9",
               "#e0e0e0",
               "linear-gradient(190deg, #b0b4d3, #848cd3, #9496a7)",
               "#b6bbe6",
               "linear-gradient(195deg, #d39999, #abe7ff, #caace2)",
               "linear-gradient(135deg, rgb(255, 209, 148), rgb(152 220 247 / 73%), rgb(193 213 227 / 75%), rgb(122 143 219 / 75%))"
          ]
          // 1 bPanel 2 header 3 strings, 4messagesB,5 chatBoxB, 6 messageMenu 7 messageMenuB 8 settingsBody 9 settingTop 10 module 11 profile
     },
     userDescription: "AAAAAAAAAAAAAAAAAAAA",
     userChats: []
};

const User = createSlice({
     name: "mainState",
     initialState: mainState,
     extraReducers: (builder) => {
          builder
               .addCase(fetchUserData.pending, (state) => {})
               .addCase(fetchUserData.rejected, (state) => {})
               .addCase(fetchUserData.fulfilled, (state, action) => {
                    const readyChats: Chats[] = [];
                    const readyContacts = [];
                    for (const value of Object.values(action.payload?.userChats!)) {
                         const typedValue = value as Chats;
                         readyChats.push(typedValue);
                    }

                    if (action.payload?.userContacts) {
                         for (const value of Object.values(action.payload?.userContacts!)) {
                              const typedValue = value as UserInterfaceForJoinUsers;
                              readyContacts.push(typedValue);
                         }
                    }

                    const readyUserData: UserInterface = {
                         userChats: readyChats,
                         userContacts: readyContacts,
                         userDateRegistred: action?.payload?.userDateRegistred!,
                         userDescription: action.payload?.userDescription!,
                         userEmail: action.payload?.userEmail!,
                         userFriends: action.payload?.userFriends!,
                         userGroups: action.payload?.userGroups!,
                         userId: action.payload?.userId!,
                         userImage: action.payload?.userImage!,
                         userInstagramInfo: action.payload?.userInstagramInfo!,
                         userIsDarkTheme: action.payload?.userIsDarkTheme!,
                         userIsOnline: action.payload?.userIsOnline!,
                         userLanguage: action.payload?.userLanguage!,
                         userName: action.payload?.userName!,
                         userPassword: action.payload?.userPassword!,
                         userTelegramInfo: action.payload?.userTelegramInfo!,
                         userThemeColorShceme: action.payload?.userThemeColorShceme!
                    };
                    return readyUserData;
               });
     },
     reducers: {
          setDataByChatId: (state, action: PayloadAction<{ ID: string; newChat: Chats }>) => {
               if (state.userChats) {
                    const targetChats: Chats[] = state.userChats.map((chat: Chats) => {
                         if (chat?.chatId === action.payload.ID) {
                              return action.payload.newChat;
                         } else {
                              return chat;
                         }
                    });

                    state.userChats = targetChats;
               }
          },
          setHeaderChatById: (
               state,
               action: PayloadAction<{
                    lastSendImg: string;
                    title: string;
                    lastUserName: string;
                    value: string;
                    lastMessageDate: string;
                    flagCheck: boolean;
                    chatId: string;
                    chatImage: string;
                    chatName: string;
                    chatDescription: string;
                    messageImage: string;
               }>
          ) => {
               if (state.userChats) {
                    const targetChats: Chats[] = state.userChats.map((chat: Chats) => {
                         if (chat.chatId === action.payload.chatId && chat.type === "DUO") {
                              return {
                                   messages: chat.messages,
                                   chatOperation: chat.chatOperation,
                                   joinUsers: {
                                        one: chat.joinUsers.one,
                                        two: chat.joinUsers.two
                                   },
                                   chatId: chat.chatId,
                                   chatDateInitialization: chat.chatDateInitialization,
                                   imagesChat: chat.imagesChat,
                                   type: chat.type,
                                   pinnedMessage: [],

                                   info: {
                                        lastSendImg: action.payload.lastSendImg,
                                        title: action.payload.title,
                                        lastUserName: action.payload.lastUserName,
                                        value: action.payload.value,
                                        lastMessageDate: action.payload.lastMessageDate,
                                        flagCheck: action.payload.flagCheck,
                                        chatId: action.payload.chatId,
                                        chatImage: action.payload.chatImage,
                                        chatName: action.payload.chatName,
                                        chatDescription: action.payload.chatDescription,
                                        messageImage: action.payload.messageImage,
                                        pinnedMessage: []
                                   }
                              };
                         } else if (
                              chat.chatId === action.payload.chatId &&
                              chat.type === "CHANNEL"
                         ) {
                              return {
                                   messages: chat.messages,
                                   chatOperation: chat.chatOperation,
                                   joinUsers: [...chat.joinUsers!],

                                   chatId: chat.chatId,
                                   chatDateInitialization: chat.chatDateInitialization,
                                   imagesChat: chat.imagesChat,
                                   type: chat.type,
                                   pinnedMessage: [],

                                   info: {
                                        lastSendImg: action.payload.lastSendImg,
                                        title: action.payload.title,
                                        lastUserName: action.payload.lastUserName,
                                        value: action.payload.value,
                                        lastMessageDate: action.payload.lastMessageDate,
                                        flagCheck: action.payload.flagCheck,
                                        chatId: action.payload.chatId,
                                        chatImage: action.payload.chatImage,
                                        chatName: action.payload.chatName,
                                        chatDescription: action.payload.chatDescription,
                                        messageImage: action.payload.messageImage,
                                        pinnedMessage: []
                                   }
                              };
                         } else if (
                              chat.chatId === action.payload.chatId &&
                              chat.type === "GROUP"
                         ) {
                              return {
                                   messages: chat.messages,
                                   chatOperation: chat.chatOperation,
                                   joinUsers: Array.isArray(chat.joinUsers)
                                        ? [...chat.joinUsers]
                                        : [chat.joinUsers],

                                   chatId: chat.chatId,
                                   chatDateInitialization: chat.chatDateInitialization,
                                   imagesChat: chat.imagesChat,
                                   type: chat.type,
                                   pinnedMessage: [],

                                   info: {
                                        lastSendImg: action.payload.lastSendImg,
                                        title: action.payload.title,
                                        lastUserName: action.payload.lastUserName,
                                        value: action.payload.value,
                                        lastMessageDate: action.payload.lastMessageDate,
                                        flagCheck: action.payload.flagCheck,
                                        chatId: action.payload.chatId,
                                        chatImage: action.payload.chatImage,
                                        chatName: action.payload.chatName,
                                        chatDescription: action.payload.chatDescription,
                                        messageImage: action.payload.messageImage,
                                        pinnedMessage: []
                                   }
                              };
                         } else if (
                              chat.chatId === action.payload.chatId &&
                              chat.type === "SAVED"
                         ) {
                              return {
                                   messages: chat.messages,
                                   chatOperation: chat.chatOperation,
                                   joinUsers: null,

                                   chatId: chat.chatId,
                                   chatDateInitialization: chat.chatDateInitialization,
                                   imagesChat: chat.imagesChat,
                                   type: chat.type,
                                   pinnedMessage: [],

                                   info: {
                                        lastSendImg: action.payload.lastSendImg,
                                        title: action.payload.title,
                                        lastUserName: action.payload.lastUserName,
                                        value: action.payload.value,
                                        lastMessageDate: action.payload.lastMessageDate,
                                        flagCheck: action.payload.flagCheck,
                                        chatId: action.payload.chatId,
                                        chatImage: action.payload.chatImage,
                                        chatName: action.payload.chatName,
                                        chatDescription: action.payload.chatDescription,
                                        messageImage: action.payload.messageImage,
                                        pinnedMessage: []
                                   }
                              };
                         } else {
                              return chat;
                         }
                    });

                    state.userChats = targetChats;
               }
          },
          setClearChatHistory: (store, action: PayloadAction<{ ID: string }>) => {
               if (store.userChats) {
                    let res: Chats[] = store.userChats;
                    res.forEach((chat: Chats) => {
                         if (chat.chatId === action.payload.ID) {
                              chat.messages = [];
                              chat.chatOperation++;

                              chat.info.value = "";
                              chat.info.lastMessageDate = "";
                              chat.info.lastUserName = "";
                         } else {
                              return chat;
                         }
                    });
                    store.userChats = [...res];
               }
          },
          setDeleteChat: (store, action: PayloadAction<{ ID: string }>) => {
               if (store.userChats) {
                    const newChats: Chats[] = store.userChats.filter((chat: Chats) => {
                         return action.payload.ID !== chat.chatId;
                    });
                    store.userChats = [...newChats];
               }
          },
          setUpdateUserInfo: (
               store,
               action: PayloadAction<{
                    userInfo: {
                         description: string;
                         userId: string;
                         email: string;
                         telegram: string;
                         instagram: string;
                         img: string;
                    };
               }>
          ) => {
               return {
                    ...store,
                    userDescription: action.payload.userInfo.description,
                    userId: action.payload.userInfo.userId,
                    userEmail: action.payload.userInfo.email,
                    userTelegramInfo: action.payload.userInfo.telegram,
                    userInstagramInfo: action.payload.userInfo.instagram,
                    userImage: action.payload.userInfo.img
               };
          },
          setUpdateVisibleMessage: (
               store,
               action: PayloadAction<{ idChat: string; idMessage: number }>
          ) => {
               if (store.userChats) {
                    const targetNewChat: Chats[] = store.userChats.map((chat: Chats) => {
                         if (chat.chatId === action.payload.idChat) {
                              const targetChat: Chats = chat;
                              targetChat.messages.forEach((message: typeBoxMessageItem) => {
                                   if (message.id === action.payload.idMessage) {
                                        message.checkFlag = true;
                                        message.type === "CHANNEL" || message.type === "channel"
                                             ? (message.countView += 1)
                                             : null;
                                   }
                              });
                              return targetChat;
                         } else {
                              return chat;
                         }
                    });
                    store.userChats = targetNewChat;
               }
          },
          setDeleteMessageById: (state, action: PayloadAction<{ id: number; idChat: string }>) => {
               if (state.userChats) {
                    const targetChat: Chats[] = state.userChats.filter((chat: Chats) => {
                         return chat.chatId === action.payload.idChat;
                    });
                    const newMessages: typeBoxMessageItem[] = targetChat[0].messages.filter(
                         (message: typeBoxMessageItem) => {
                              return message.id !== action.payload.id;
                         }
                    );
                    targetChat[0].messages = newMessages;
                    const result = state.userChats.map((chat: Chats) => {
                         if (chat.chatId === targetChat[0].chatId) {
                              return {
                                   ...chat,
                                   chatOperation: chat.chatOperation++,
                                   messages: [...newMessages]
                              };
                         } else {
                              return chat;
                         }
                    });
                    state.userChats = result;
               }
          },
          setPinnedMessages: (store, action: PayloadAction<{ idChat: string; value: string }>) => {
               if (store.userChats) {
                    const newChats: Chats[] = store.userChats;
                    newChats.forEach((chat: Chats) => {
                         if (chat.chatId === action.payload.idChat) {
                              chat.pinnedMessage.push(action.payload.value);
                              chat.chatOperation++;
                         }
                    });
                    store.userChats = newChats;
               }
          },
          setDeletePinnedMessages: (store, action: PayloadAction<{ idChat: string }>) => {
               if (store.userChats) {
                    const newChats: Chats[] = store.userChats;
                    newChats.forEach((chat: Chats) => {
                         if (chat.chatId === action.payload.idChat) {
                              chat.pinnedMessage = [];
                              chat.chatOperation++;
                         }
                    });
                    store.userChats = newChats;
               }
          },
          setEditMessageById: (
               store,
               action: PayloadAction<{ IdChat: string; idMessage: Number; newMessageValue: string }>
          ) => {
               if (store.userChats) {
                    const Chat: Chats[] = store.userChats.map((chat: Chats) => {
                         if (chat.chatId === action.payload.IdChat) {
                              return {
                                   ...chat,
                                   chatOperation: chat.chatOperation++,
                                   messages: chat.messages.map((message: typeBoxMessageItem) => {
                                        if (message.id === action.payload.idMessage) {
                                             console.log(
                                                  message,
                                                  "ВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВООООООТ ОН"
                                             );
                                             return {
                                                  ...message,
                                                  value: action.payload.newMessageValue,
                                                  isEdit: true
                                             };
                                        } else {
                                             return message;
                                        }
                                   })
                              };
                         } else {
                              return chat;
                         }
                    });

                    store.userChats = Chat;
               }
          },
          setTheme: (state, action: PayloadAction<{ userIsDarkTheme: boolean }>) => {
               state.userIsDarkTheme = action.payload.userIsDarkTheme;
          },
          setCreateNewGroup: (
               state,
               action: PayloadAction<{ img: string; name: string; description: string; id: string }>
          ) => {
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
                    chatId: action.payload.id,
                    chatDateInitialization: new Date().toString(),
                    imagesChat: action.payload.img,
                    info: {
                         chatDescription: action.payload.description,
                         chatImage: action.payload.img,
                         chatName: action.payload.name,
                         lastMessageDate: "",
                         lastUserName: "",
                         lastSendImg: action.payload.img,
                         title: action.payload.name,
                         flagCheck: false,
                         value: "",
                         messageImage: ""
                    },
                    type: "GROUP",
                    pinnedMessage: [],
                    chatOperation: 0
               };
               const chats: Chats[] = state.userChats;
               chats.unshift(newGroup);
               state.userChats = chats;
          },
          setCreateNewChannel: (
               state,
               action: PayloadAction<{ img: string; name: string; description: string; id: string }>
          ) => {
               if (state.userChats) {
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
                         chatId: action.payload.id,
                         chatDateInitialization: new Date().toString(),
                         imagesChat: action.payload.img,
                         info: {
                              chatDescription: action.payload.description,
                              chatImage: action.payload.img,
                              chatName: action.payload.name,
                              lastMessageDate: "",
                              lastUserName: "",
                              lastSendImg: action.payload.img,
                              title: action.payload.name,
                              flagCheck: false,
                              value: "",
                              messageImage: ""
                         },
                         type: "CHANNEL",
                         pinnedMessage: [],
                         chatOperation: 0
                    };
                    const chats: Chats[] = state.userChats;
                    chats.unshift(newChannel);
                    state.userChats = chats;
               }
          },
          setAddNewContactAndChat: (
               state,
               action: PayloadAction<{ contact: UserInterfaceForJoinUsers; chatID: string }>
          ) => {
               const newContact = { ...action.payload.contact, userChatID: action.payload.chatID };
               state.userContacts = Array.isArray(state.userContacts)
                    ? [...state.userContacts, newContact]
                    : [newContact];
               const newDuoChat: DuoChat = {
                    messages: [],
                    joinUsers: {
                         one: {
                              userId: state.userId,
                              userName: state.userName,
                              userEmail: state.userEmail,
                              userPassword: state.userPassword,
                              userDateRegistred: state.userDateRegistred,
                              userTelegramInfo: state.userTelegramInfo,
                              userInstagramInfo: state.userInstagramInfo,
                              userIsOnline: state.userIsOnline,
                              userFriends: state.userFriends,
                              userImage: state.userImage,
                              userGroups: state.userGroups,
                              userDescription: state.userDescription
                         },
                         two: action.payload.contact
                    },
                    chatId: action.payload.chatID,
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
               state.userChats = [newDuoChat, ...state.userChats];
          },
          setAddContactToGroup: (
               state,
               action: PayloadAction<{ idChat: string; idContact: string }>
          ) => {
               const targetChat: Chats[] = state.userChats.filter(
                    (chat: Chats) => chat.chatId === action.payload.idChat
               );
               const targetChatObj: Chats = targetChat[0];
               const targetContact: UserInterfaceForJoinUsers[] = state.userContacts.filter(
                    (contact: UserInterfaceForJoinUsers) =>
                         contact.userId === action.payload.idContact
               );

               const targetContactObj = targetContact[0];
               targetContactObj.userRole = roles.guest;
               console.log("ОБЬЕКТЫ: ", targetChatObj, targetContactObj);
               Array.isArray(targetChatObj?.joinUsers)
                    ? (targetChatObj.joinUsers = [...targetChatObj.joinUsers, targetContactObj])
                    : null;
               const newChats: Chats[] = state.userChats.map((chat: Chats) => {
                    if (chat.chatId === targetChatObj?.chatId) {
                         return targetChatObj;
                    } else {
                         return chat;
                    }
               });
               state.userChats = newChats;
          },
          setDeleteContactFromChat: (
               state,
               action: PayloadAction<{ idChat: string; idContact: string }>
          ) => {
               const targetChat: Chats[] = state.userChats.filter(
                    (chat: Chats) => chat.chatId === action.payload.idChat
               );
               const targetChatObj: Chats = targetChat[0];
               if (
                    (targetChatObj.joinUsers &&
                         Array.isArray(targetChatObj.joinUsers) &&
                         targetChatObj &&
                         targetChatObj.type === "GROUP") ||
                    targetChatObj.type === "CHANNEL"
               ) {
                    const targetContact: UserInterfaceForJoinUsers[] =
                         targetChatObj.joinUsers.filter(
                              (contact: UserInterfaceForJoinUsers) =>
                                   contact.userId === action.payload.idContact
                         );

                    const targetContactObj = targetContact[0];
                    const newJoinUsers: UserInterfaceForJoinUsers[] =
                         targetChatObj.joinUsers.filter(
                              (contact: UserInterfaceForJoinUsers) =>
                                   contact.userId !== targetContactObj.userId
                         );
                    const resultChat = {
                         ...targetChatObj,
                         joinUsers: [...newJoinUsers]
                    };
                    const newChats: Chats[] = state.userChats.map((chat: Chats) => {
                         if (chat.chatId === targetChatObj?.chatId) {
                              return resultChat;
                         } else {
                              return chat;
                         }
                    });
                    state.userChats = newChats;
               }
          },
          setEditGroup: (
               state,
               action: PayloadAction<{
                    idChat: string;
                    newImage: string;
                    newName: string;
                    newDescription: string;
               }>
          ) => {
               const newChats: Chats[] = state.userChats.map((chat: Chats) => {
                    if (chat.chatId === action.payload.idChat) {
                         return {
                              ...chat,
                              imagesChat: action.payload.newImage,
                              info: {
                                   ...chat.info,
                                   chatDescription: action.payload.newDescription,
                                   chatImage: action.payload.newImage,
                                   chatName: action.payload.newName,
                                   title: action.payload.newName
                              }
                         };
                    } else {
                         return chat;
                    }
               });
               state.userChats = newChats;
          },
          setLikeMessage: (
               state,
               action: PayloadAction<{ idChat: string; idMessage: number; idUser: string }>
          ) => {
               const targetChat: Chats[] = state.userChats.filter(
                    (chat: Chats) => chat.chatId === action.payload.idChat
               );
               const targetChatObj: Chats = targetChat[0];

               targetChatObj.messages.forEach((message: typeBoxMessageItem) => {
                    if (message.id === action.payload.idMessage) {
                         if (message.usersLikes) {
                              message.usersLikes.push({ userId: action.payload.idUser });
                              message.isLike = true;
                         } else {
                              message.usersLikes = [{ userId: action.payload.idUser }];
                              message.isLike = true;
                         }
                    }
               });
               const newChats: Chats[] = state.userChats.map((chat: Chats) => {
                    if (chat.chatId === targetChatObj?.chatId) {
                         return targetChatObj;
                    } else {
                         return chat;
                    }
               });
               state.userChats = newChats;
          },
          setAddSavedMessage: (state, action: PayloadAction<{ message: typeBoxMessageItem }>) => {
               const saved: Chats | undefined = state.userChats.find(
                    (chat: Chats) => chat.type === "SAVED"
               );
               saved?.messages.push(action.payload.message);
               state.userChats.map((chat: Chats) => {
                    if (chat.type === "SAVED") {
                         return saved;
                    } else {
                         return chat;
                    }
               });
          },
          setToggleLanguage: (state, action: PayloadAction<{ language: string }>) => {
               state.userLanguage = action.payload.language as "ENGLISH" | "RUSSIAN";
          },
          setJoinToGroupAndChannel: (state, action: PayloadAction<{ targetChat: Chats }>) => {
               const userForJoin: UserInterfaceForJoinUsers = {
                    userDateRegistred: state.userDateRegistred,
                    userDescription: state.userDescription,
                    userEmail: state.userEmail,
                    userFriends: state.userFriends,
                    userGroups: state.userGroups,
                    userId: state.userId,
                    userImage: state.userImage,
                    userInstagramInfo: state.userInstagramInfo,
                    userIsOnline: state.userIsOnline,
                    userName: state.userName,
                    userPassword: state.userPassword,
                    userTelegramInfo: state.userTelegramInfo,
                    userRole: roles.guest
               };
               const targetChat: Chats = action.payload.targetChat;
               if (targetChat.type !== "DUO" && targetChat.type !== "SAVED") {
                    targetChat.joinUsers.push(userForJoin);
               }
               state.userChats.unshift(targetChat);
          },
          setPositionYToMessage: (
               store,
               action: PayloadAction<{ y: number; idChat: string; idMessage: number }>
          ) => {
               if (store.userChats) {
                    const Chat: Chats[] = store.userChats.map((chat: Chats) => {
                         if (chat.chatId === action.payload.idChat && chat.messages?.length >= 1) {
                              return {
                                   ...chat,
                                   messages: chat?.messages.map((message: typeBoxMessageItem) => {
                                        if (message.id === action.payload.idMessage) {
                                             const newMessage: typeBoxMessageItem = message;
                                             newMessage.positionY = action.payload.y;
                                             return newMessage;
                                        } else {
                                             return message;
                                        }
                                   })
                              };
                         } else {
                              return chat;
                         }
                    });

                    store.userChats = Chat;
               }
          },
          setPasswordAndEmail: (
               state,
               action: PayloadAction<{ password: string; login: string }>
          ) => {
               state.userId = Math.floor(Math.random() * 99).toString();
               state.userName = action.payload.login;
               state.userPassword = action.payload.password;
          },
          setUserData: (state, action: PayloadAction<{ user: UserInterface }>) => {
               const user = action.payload.user;

               state.userId = user.userId;
               state.userName = user.userName;
               state.userEmail = user.userEmail;
               state.userPassword = user.userPassword;
               state.userDateRegistred = user.userDateRegistred;
               state.userTelegramInfo = user.userTelegramInfo;
               state.userInstagramInfo = user.userInstagramInfo;
               state.userIsOnline = user.userIsOnline;
               state.userChats = user.userChats;
               state.userFriends = user.userFriends;
               state.userImage = user.userImage;
               state.userContacts = user.userContacts;
               state.userGroups = user.userGroups;
               state.userDescription = user.userDescription;
               state.userThemeColorShceme = user.userThemeColorShceme;
               state.userIsDarkTheme = user.userIsDarkTheme;
               state.userLanguage = user.userLanguage;
          },
          setUpdateFlag: (state, action: PayloadAction<{ flag: boolean }>) => {
               state.updateFlag = action.payload.flag;
          }
     }
});
export const {
     setDataByChatId,
     setHeaderChatById,
     setClearChatHistory,
     setDeleteChat,
     setUpdateUserInfo,
     setUpdateVisibleMessage,
     setDeleteMessageById,
     setPinnedMessages,
     setDeletePinnedMessages,
     setEditMessageById,
     setTheme,
     setCreateNewGroup,
     setCreateNewChannel,
     setAddNewContactAndChat,
     setAddContactToGroup,
     setDeleteContactFromChat,
     setEditGroup,
     setLikeMessage,
     setAddSavedMessage,
     setToggleLanguage,
     setJoinToGroupAndChannel,
     setPositionYToMessage,
     setPasswordAndEmail,
     setUserData,
     setUpdateFlag
} = User.actions;
export default User.reducer;
