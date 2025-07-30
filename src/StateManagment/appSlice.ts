import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { title } from "process";
import { typeBoxMessageItem } from "../components/chatBoxMessageItem";
import { RootState } from "./store";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { FORMERR } from "dns";

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
     userChats: [
          {
               pinnedMessage: [],
               type: "GROUP",
               chatOperation: 0,
               // GroupChat
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "GROUP",
                         countView: 0
                    }
               ],
               joinUsers: [],
               chatId: "123ft13f",
               chatDateInitialization: new Date("2022-02-22T00:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Description....",
                    chatImage: "",
                    chatName: "Чатик",
                    lastSendImg: "",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "что-то",
                    lastMessageDate: new Date("2022-02-22T00:00:00Z").toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          {
               pinnedMessage: [],
               type: "GROUP",
               chatOperation: 0,
               messages: [
                    {
                         value: "Ребята, вы видели новую серию? 😱",
                         date: new Date("2025-06-27T10:15:00Z").toString(),
                         author: "Olga",
                         checkFlag: true,
                         isEdit: false,
                         isLike: false,
                         id: 8347,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Да! Это было просто 🔥🔥🔥",
                         date: new Date("2025-06-27T10:16:30Z").toString(),
                         author: "Ivan",
                         checkFlag: true,
                         isEdit: false,
                         isLike: true,
                         id: 2910,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Я чуть не прослезился в конце… 😭",
                         date: new Date("2025-06-27T10:18:05Z").toString(),
                         author: "Sergey",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 1623,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Кто-нибудь поймёт, что на самом деле произошло с героиней?!",
                         date: new Date("2025-06-27T10:19:40Z").toString(),
                         author: "Marina",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 4578,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Теория: она — инкарнация древнего духа 😉",
                         date: new Date("2025-06-27T10:21:22Z").toString(),
                         author: "Alex",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 7681,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Хаха, горячо! Но я больше склоняюсь к тому, что это её прошлое увидели в видении.",
                         date: new Date("2025-06-27T10:23:10Z").toString(),
                         author: "Olga",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 9054,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Видение? Может быть… Но тогда зачем тот зловещий символ на стене?",
                         date: new Date("2025-06-27T10:25:45Z").toString(),
                         author: "Ivan",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 3342,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Я нашёл в интернете, что этот символ связан с культом забытых богов.",
                         date: new Date("2025-06-27T10:27:58Z").toString(),
                         author: "Sergey",
                         checkFlag: false,
                         isEdit: false,
                         isLike: true,
                         id: 7290,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Интересно… Надо глянуть на старые артефакты в музее.",
                         date: new Date("2025-06-27T10:30:12Z").toString(),
                         author: "Marina",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 8115,
                         type: "GROUP",
                         countView: 0
                    },
                    {
                         value: "Предлагаю встретиться в субботу и обсудить все теории лично!",
                         date: new Date("2025-06-27T10:32:27Z").toString(),
                         author: "Alex",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 5462,
                         type: "GROUP",
                         countView: 0
                    }
               ],
               joinUsers: [
                    {
                         userId: "u1",
                         userName: "Olga",
                         userEmail: "olga@example.com",
                         userPassword: "••••••••",
                         userDateRegistred: new Date("2024-01-10T08:00:00Z").toString(),
                         userTelegramInfo: "@olga_92",
                         userInstagramInfo: "@olga_insta",
                         userIsOnline: true,
                         userFriends: ["u2", "u3", "u4", "u5"],
                         userImage: "",
                         userGroups: 3,
                         userDescription: "Киноман со стажем",
                         userRole: roles.guest
                    },
                    {
                         userId: "u2",
                         userName: "Ivan",
                         userEmail: "ivan@example.com",
                         userPassword: "••••••••",
                         userDateRegistred: new Date("2023-11-05T12:30:00Z").toString(),
                         userTelegramInfo: "@ivan_83",
                         userInstagramInfo: "@ivan_insta",
                         userIsOnline: false,
                         userFriends: ["u1", "u3"],
                         userImage: "http",
                         userGroups: 2,
                         userDescription: "Любитель теорий заговора",
                         userRole: roles.guest
                    },
                    {
                         userId: "u3",
                         userName: "Sergey",
                         userEmail: "sergey@example.com",
                         userPassword: "••••••••",
                         userDateRegistred: new Date("2024-03-20T15:45:00Z").toString(),
                         userTelegramInfo: "@sergey_77",
                         userInstagramInfo: "@sergey_insta",
                         userIsOnline: false,
                         userFriends: ["u1", "u2", "u5"],
                         userImage: "htey.png",
                         userGroups: 4,
                         userDescription: "Исследователь символов",

                         userRole: roles.guest
                    },
                    {
                         userId: "u4",
                         userName: "Marina",
                         userEmail: "marina@example.com",
                         userPassword: "••••••••",
                         userDateRegistred: new Date("2024-02-14T09:20:00Z").toString(),
                         userTelegramInfo: "@marina_88",
                         userInstagramInfo: "@marina_insta",
                         userIsOnline: true,
                         userFriends: ["u1", "u3"],
                         userImage: "htna.png",
                         userGroups: 1,
                         userDescription: "Любительница музеев",
                         userRole: roles.admin
                    },
                    {
                         userId: "u5",
                         userName: "Alex",
                         userEmail: "alex@example.com",
                         userPassword: "••••••••",
                         userDateRegistred: new Date("2023-12-01T18:10:00Z").toString(),
                         userTelegramInfo: "@alex_90",
                         userInstagramInfo: "@alex_insta",
                         userIsOnline: true,
                         userFriends: ["u1", "u2", "u3"],
                         userImage: "htex.png",
                         userGroups: 2,
                         userDescription: "Организатор встреч",
                         userRole: roles.guest
                    }
               ],
               chatId: "grp123",
               chatDateInitialization: new Date("2025-06-27T10:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Бурные обсуждения нового эпизода любимого сериала",
                    chatImage: "",
                    chatName: "Киноманы Unite!",
                    lastSendImg: "",
                    title: "Обсуждение серии",
                    lastUserName: "Alex",
                    value: "Предлагаю встретиться в субботу и обсудить все теории лично!",
                    lastMessageDate: new Date("2025-06-27T10:32:27Z").toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },

          {
               // DuoChat
               type: "DUO",
               chatOperation: 0,
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date().toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         isEdit: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-03-10T09:00:00Z").toString(),
                         author: "Ivan",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Хорошо, а ты как?",
                         date: new Date("2023-03-10T09:01:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Тоже неплохо. Готов к завтрашнему митингу?",
                         date: new Date("2023-03-10T09:02:00Z").toString(),
                         author: "Ivan",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Да, презентация почти готова.",
                         date: new Date("2023-03-10T09:03:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Отлично. Жду твою часть вечером.",
                         date: new Date("2023-03-10T09:04:00Z").toString(),
                         author: "Ivan",
                         checkFlag: false,
                         isEdit: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",

                         userPassword: "93334562aaa",
                         userDateRegistred: new Date("2022-02-22T00:00:00Z").toString(),
                         userTelegramInfo: "no",
                         userInstagramInfo: "no",
                         userIsOnline: true,

                         userFriends: ["Sergey"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 4,
                         userDescription: "4444444444444444444"
                    },
                    two: {
                         userId: "456",
                         userName: "Ivan",
                         userEmail: "ivan@example.com",
                         userPassword: "password",
                         userDateRegistred: new Date("2022-02-22T00:00:00Z").toString(),
                         userTelegramInfo: "qwfqweqfwfq",
                         userInstagramInfo: "wwafawffaw",
                         userIsOnline: false,

                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 23232332,
                         userDescription: "32222222222222222222"
                    }
               },
               pinnedMessage: [],
               chatId: "duo123",
               chatDateInitialization: new Date("2022-02-22T00:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "",
                    chatName: "Вести",
                    lastSendImg: "",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "что-то",
                    lastMessageDate: new Date("2022-02-22T00:00:00Z").toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          {
               type: "CHANNEL",
               pinnedMessage: [],
               chatOperation: 0,
               messages: [
                    {
                         value: "Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.",
                         date: new Date("2022-02-22T08:00:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Google представил новый AI-сервис.",
                         date: new Date("2022-02-22T08:05:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "CHANNEL",
                         countView: 0
                    }
               ],

               joinUsers: [],
               chatId: "chan001",
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "",
                    chatName: "Вести",
                    lastSendImg: "",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "что-то",
                    lastMessageDate: new Date().toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          {
               type: "DUO",
               pinnedMessage: [],
               chatOperation: 0,
               messages: [
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-05-10T10:30:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Привет! Всё хорошо. У тебя как?",
                         date: new Date("2023-05-10T10:31:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Тоже отлично. Над чем сейчас работаешь?",
                         date: new Date("2023-05-10T10:32:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Делаю макеты для нового лендинга.",
                         date: new Date("2023-05-10T10:34:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Можешь показать позже?",
                         date: new Date("2023-05-10T10:35:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Конечно, к 18:00 скину в чат.",
                         date: new Date("2023-05-10T10:36:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    }
               ],

               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkov@mail.ru",
                         userPassword: "supersecure123",

                         userDateRegistred: new Date("2021-01-15T00:00:00Z").toString(),
                         userTelegramInfo: "t.me/starkov",
                         userInstagramInfo: "@starkovgram",
                         userIsOnline: false,

                         userFriends: ["Alex", "Max"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 5,
                         userDescription: "Люблю писать код"
                    },
                    two: {
                         userId: "101",
                         userName: "Olga",
                         userEmail: "olga@example.com",

                         userPassword: "qwerty123",

                         userDateRegistred: new Date("2023-03-12T00:00:00Z").toString(),
                         userTelegramInfo: "olgaTG",
                         userInstagramInfo: "olgaInsta",
                         userIsOnline: true,

                         userFriends: ["Lena"],
                         userImage: "https://photocentra.ru/images/main80/802356_main.jpg",
                         userGroups: 7,
                         userDescription: "Фотограф и дизайнер"
                    }
               },
               chatId: "duo789",
               chatDateInitialization: new Date("2023-06-01T12:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Разговоры о работе",
                    chatImage: "",
                    chatName: "Работа",
                    lastSendImg: "",
                    title: "Обсуждение задач",
                    lastUserName: "Olga",
                    value: "Нужно обсудить дедлайны",
                    lastMessageDate: new Date("2023-06-01T12:01:00Z").toString(),
                    flagCheck: true,
                    messageImage: ""
               }
          },
          {
               type: "DUO",
               chatOperation: 0,
               pinnedMessage: [],
               messages: [
                    {
                         value: "Когда будет готов проект?",
                         date: new Date("2023-10-01T14:00:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         image: [
                              "https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt574119fc8abf8dad/60ab28733aac347374b5b0f0/UK_Iceland_Iceland_Header.jpg"
                         ],
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Работаю над ним. Осталось доделать стили.",
                         date: new Date("2023-10-01T14:01:00Z").toString(),
                         author: "Dima",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Окей, жду тогда финальную версию.",
                         date: new Date("2023-10-01T14:02:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Загружу в репозиторий вечером.",
                         date: new Date("2023-10-01T14:03:00Z").toString(),
                         author: "Dima",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         image: [
                              "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1zmqm4.img?w=1600&h=900&m=4&q=47",
                              "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1zmqm4.img?w=1600&h=900&m=4&q=47"
                         ],
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Не забудь про адаптив!",
                         date: new Date("2023-10-01T14:04:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkovdev@example.com",
                         userPassword: "securepass",

                         userDateRegistred: new Date("2020-09-09T00:00:00Z").toString(),
                         userTelegramInfo: "devStarkov",
                         userInstagramInfo: "stark_dev",
                         userIsOnline: true,

                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 9,
                         userDescription: "Frontend-разработчик"
                    },
                    two: {
                         userId: "303",
                         userName: "Dima",
                         userEmail: "dima@webdev.com",

                         userPassword: "frontend123",
                         userDateRegistred: new Date("2023-07-18T00:00:00Z").toString(),
                         userTelegramInfo: "dimaWeb",
                         userInstagramInfo: "dimaInsta",

                         userIsOnline: false,

                         userFriends: [],
                         userImage:
                              "https://avatars.mds.yandex.net/i?id=56428907fa215bcd0400a3a6144b694c_l-5232252-images-thumbs&n=13",
                         userGroups: 3,
                         userDescription: "JS Developer"
                    }
               },
               chatId: "dev456",
               chatDateInitialization: new Date("2023-10-01T14:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Работа над сайтом",
                    chatImage: "",
                    chatName: "Проект Х",
                    lastSendImg: "",
                    title: "Фронтенд задачи",
                    lastUserName: "Dima",
                    value: "Почти готово!",
                    lastMessageDate: new Date("2023-10-01T14:05:00Z").toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          {
               type: "DUO",
               pinnedMessage: [],
               chatOperation: 0,
               messages: [
                    {
                         value: "Созвон в 1gwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk8:00",
                         date: new Date("2023-12-12T09:00:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Окей, подтвердила время",
                         date: new Date("2023-12-12T09:01:00Z").toString(),
                         author: "Anna",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Нужно обсудить новый релизgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
                         date: new Date("2023-12-12T09:02:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "У меня есть пара идей",
                         date: new Date("2023-12-12T09:03:00Z").toString(),
                         author: "Anna",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    },
                    {
                         value: "Супер! Подготовь слайды, пожалуйста",
                         date: new Date("2023-12-12T09:04:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "DUO",
                         countView: 0
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "stark_chat@example.com",

                         userPassword: "pass1234",
                         userDateRegistred: new Date("2022-12-12T00:00:00Z").toString(),
                         userTelegramInfo: "starkmeeting",
                         userInstagramInfo: "starkinsta",
                         userIsOnline: true,

                         userFriends: ["Kirill", "Nikita"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 12,
                         userDescription: "Менеджер проектов"
                    },
                    two: {
                         userId: "505",
                         userName: "Anna",
                         userEmail: "anna@example.com",
                         userPassword: "myAnnaPass",

                         userDateRegistred: new Date("2023-11-10T00:00:00Z").toString(),
                         userTelegramInfo: "anna_tg",

                         userInstagramInfo: "anna_ig",
                         userIsOnline: true,

                         userFriends: [],
                         userImage:
                              "https://avatars.mds.yandex.net/i?id=53e858729b32a2e2a6a559c4a0e61c050c10436c-5179294-images-thumbs&n=13",
                         userGroups: 2,
                         userDescription: "Product Designer"
                    }
               },
               chatId: "conf123",
               chatDateInitialization: new Date("2023-12-12T09:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Встречи команды",
                    chatImage: "",
                    chatName: "Созвоны",
                    lastSendImg: "",
                    title: "Командная синхронизация",
                    lastUserName: "Anna",
                    value: "Подтверждаю время",
                    lastMessageDate: new Date("2023-12-12T09:05:00Z").toString(),
                    flagCheck: true,
                    messageImage: ""
               }
          },
          {
               type: "SAVED",
               // SavedMessagesChat
               pinnedMessage: [],
               chatOperation: 0,
               messages: [
                    {
                         value: "My note",
                         date: new Date().toString(),
                         isEdit: false,
                         author: "Me",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000),
                         type: "SAVED",
                         countView: 0
                    }
               ],
               joinUsers: null,

               chatId: "saved",
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Saved notes",
                    chatImage: "",
                    chatName: "Закладки",
                    lastSendImg: "",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "что-то",
                    lastMessageDate: new Date().toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          //ChannelChat
          {
               type: "CHANNEL",
               pinnedMessage: [],
               chatOperation: 0,
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date().toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         countView: 0,
                         id: Math.floor(Math.random() * 10000),

                         type: "CHANNEL"
                    }
               ],
               joinUsers: [
                    {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "no",

                         userInstagramInfo: "no",
                         userIsOnline: true,

                         userFriends: ["Sergey"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,
                         userDescription: "2332325352235235",
                         userRole: roles.admin
                    },
                    {
                         userId: "456",
                         userName: "Ivan",
                         userEmail: "ivan@example.com",
                         userPassword: "password",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "",
                         userInstagramInfo: "",

                         userIsOnline: false,

                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,
                         userDescription: "23542356455234",
                         userRole: roles.admin
                    },
                    {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "no",

                         userInstagramInfo: "no",
                         userIsOnline: true,

                         userFriends: ["Sergey"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,

                         userDescription: "23235T3245",
                         userRole: roles.admin
                    },
                    {
                         userId: "456",
                         userName: "Ivan",
                         userEmail: "ivan@example.com",

                         userPassword: "password",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "",

                         userInstagramInfo: "",
                         userIsOnline: false,

                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,
                         userDescription: "23352324",
                         userRole: roles.admin
                    },
                    {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "no",
                         userInstagramInfo: "no",
                         userIsOnline: true,

                         userFriends: ["Sergey"],

                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,

                         userDescription: "325354342",
                         userRole: roles.admin
                    },
                    {
                         userId: "456",
                         userName: "Ivan",

                         userEmail: "ivan@example.com",
                         userPassword: "password",
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "",
                         userInstagramInfo: "",

                         userIsOnline: false,

                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 54,
                         userDescription: "2282282282228228222822282822828828282",
                         userRole: roles.admin
                    }
               ],
               chatId: "1231231212313",
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Channel",
                    chatImage: "",
                    chatName: "Закладки",
                    lastSendImg: "",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "что-то",
                    lastMessageDate: new Date().toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          }
     ]
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
                         if (chat.chatId === action.payload.ID) {
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
     setUserData
} = User.actions;
export default User.reducer;
