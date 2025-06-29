import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { title } from "process";
import { typeBoxMessageItem } from "../components/chatBoxMessageItem";
import { RootState } from "./store";
import undefinedIcon from "../../public/icons/icons8-облако-диалога-с-точками-96.png";

type ChatInfo = {
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
type GroupChat = {
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
     joinUsers: { one: UserInterface; two: UserInterface };
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "DUO";
     pinnedMessage: string[];
     chatOperation: number;
};
type ChannelChat = {
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
type SavedMessagesChat = {
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
     userGroups: number;
     userDescription: string;
     userThemeColorShceme: { dark: string[]; light: string[] };
     userIsDarkTheme: boolean;
}
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
}

export const mainState: UserInterface = {
     userId: "123",
     userName: "Starkov",
     userEmail: "valuznnicatem@gmail.com",
     userPassword: "93334562aaa",
     userDateRegistred: new Date("2022-02-22T00:00:00Z").toString(),
     userTelegramInfo: "no",
     userInstagramInfo: "no",
     userIsOnline: true,
     userFriends: ["wewfwef", "qwdqwdqwd", "dwqwdqw"],
     userImage:
          "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
     userGroups: 0,
     userIsDarkTheme: false,
     userThemeColorShceme: {
          dark: [
               "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
               "linear-gradient(135deg, #252b42, #1b2238, #2a3555)",
               "white",
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
                         id: Math.floor(Math.random() * 10000)
                    }
               ],
               joinUsers: [],
               chatId: "123ft13f",
               chatDateInitialization: new Date("2022-02-22T00:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Description....",
                    chatImage: "#",
                    chatName: "Чатик",
                    lastSendImg: undefinedIcon.src,
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
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
                         id: 8347
                    },
                    {
                         value: "Да! Это было просто 🔥🔥🔥",
                         date: new Date("2025-06-27T10:16:30Z").toString(),
                         author: "Ivan",
                         checkFlag: true,
                         isEdit: false,
                         isLike: true,
                         id: 2910
                    },
                    {
                         value: "Я чуть не прослезился в конце… 😭",
                         date: new Date("2025-06-27T10:18:05Z").toString(),
                         author: "Sergey",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 1623
                    },
                    {
                         value: "Кто-нибудь поймёт, что на самом деле произошло с героиней?!",
                         date: new Date("2025-06-27T10:19:40Z").toString(),
                         author: "Marina",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 4578
                    },
                    {
                         value: "Теория: она — инкарнация древнего духа 😉",
                         date: new Date("2025-06-27T10:21:22Z").toString(),
                         author: "Alex",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 7681
                    },
                    {
                         value: "Хаха, горячо! Но я больше склоняюсь к тому, что это её прошлое увидели в видении.",
                         date: new Date("2025-06-27T10:23:10Z").toString(),
                         author: "Olga",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 9054
                    },
                    {
                         value: "Видение? Может быть… Но тогда зачем тот зловещий символ на стене?",
                         date: new Date("2025-06-27T10:25:45Z").toString(),
                         author: "Ivan",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 3342
                    },
                    {
                         value: "Я нашёл в интернете, что этот символ связан с культом забытых богов.",
                         date: new Date("2025-06-27T10:27:58Z").toString(),
                         author: "Sergey",
                         checkFlag: false,
                         isEdit: false,
                         isLike: true,
                         id: 7290
                    },
                    {
                         value: "Интересно… Надо глянуть на старые артефакты в музее.",
                         date: new Date("2025-06-27T10:30:12Z").toString(),
                         author: "Marina",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 8115
                    },
                    {
                         value: "Предлагаю встретиться в субботу и обсудить все теории лично!",
                         date: new Date("2025-06-27T10:32:27Z").toString(),
                         author: "Alex",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: 5462
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
                         userImage: "https://example.com/avatars/olga.png",
                         userGroups: 3,
                         userDescription: "Киноман со стажем"
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
                         userImage: "https://example.com/avatars/ivan.png",
                         userGroups: 2,
                         userDescription: "Любитель теорий заговора"
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
                         userImage: "https://example.com/avatars/sergey.png",
                         userGroups: 4,
                         userDescription: "Исследователь символов"
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
                         userImage: "https://example.com/avatars/marina.png",
                         userGroups: 1,
                         userDescription: "Любительница музеев"
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
                         userImage: "https://example.com/avatars/alex.png",
                         userGroups: 2,
                         userDescription: "Организатор встреч"
                    }
               ],
               chatId: "grp123",
               chatDateInitialization: new Date("2025-06-27T10:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Бурные обсуждения нового эпизода любимого сериала",
                    chatImage: "#",
                    chatName: "Киноманы Unite!",
                    lastSendImg: undefinedIcon.src,
                    title: "Обсуждение серии",
                    lastUserName: "Alex",
                    value: "Предлагаю встретиться в субботу и обсудить все теории лично!",
                    lastMessageDate: new Date("2025-06-27T10:32:27Z").toString(),
                    flagCheck: false,
                    messageImage: "#"
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
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-03-10T09:00:00Z").toString(),
                         author: "Ivan",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Хорошо, а ты как?",
                         date: new Date("2023-03-10T09:01:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Тоже неплохо. Готов к завтрашнему митингу?",
                         date: new Date("2023-03-10T09:02:00Z").toString(),
                         author: "Ivan",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Да, презентация почти готова.",
                         date: new Date("2023-03-10T09:03:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Отлично. Жду твою часть вечером.",
                         date: new Date("2023-03-10T09:04:00Z").toString(),
                         author: "Ivan",
                         checkFlag: false,
                         isEdit: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date("2022-02-22T00:00:00Z").toString(),
                         userTelegramInfo: "no",
                         userInstagramInfo: "no",
                         userIsOnline: true,
                         userChats: [],
                         userIsDarkTheme: false,
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
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userIsDarkTheme: false,
                         userChats: [],
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
               imagesChat: "#",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "#",
                    chatName: "Вести",
                    lastSendImg: undefinedIcon.src,
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
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
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.",
                         date: new Date("2022-02-22T08:00:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Google представил новый AI-сервис.",
                         date: new Date("2022-02-22T08:05:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
                         isEdit: false,
                         checkFlag: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    }
               ],

               joinUsers: [],
               chatId: "chan001",
               chatDateInitialization: new Date().toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "#",
                    chatName: "Вести",
                    lastSendImg: undefinedIcon.src,
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
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
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Привет! Всё хорошо. У тебя как?",
                         date: new Date("2023-05-10T10:31:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Тоже отлично. Над чем сейчас работаешь?",
                         date: new Date("2023-05-10T10:32:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Делаю макеты для нового лендинга.",
                         date: new Date("2023-05-10T10:34:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Можешь показать позже?",
                         date: new Date("2023-05-10T10:35:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Конечно, к 18:00 скину в чат.",
                         date: new Date("2023-05-10T10:36:00Z").toString(),
                         author: "Olga",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    }
               ],

               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkov@mail.ru",
                         userPassword: "supersecure123",
                         userIsDarkTheme: false,
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userDateRegistred: new Date("2021-01-15T00:00:00Z").toString(),
                         userTelegramInfo: "t.me/starkov",
                         userInstagramInfo: "@starkovgram",
                         userIsOnline: false,
                         userChats: [],
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
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userPassword: "qwerty123",
                         userIsDarkTheme: false,
                         userDateRegistred: new Date("2023-03-12T00:00:00Z").toString(),
                         userTelegramInfo: "olgaTG",
                         userInstagramInfo: "olgaInsta",
                         userIsOnline: true,
                         userChats: [],
                         userFriends: ["Lena"],
                         userImage: "https://photocentra.ru/images/main80/802356_main.jpg",
                         userGroups: 7,
                         userDescription: "Фотограф и дизайнер"
                    }
               },
               chatId: "duo789",
               chatDateInitialization: new Date("2023-06-01T12:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Разговоры о работе",
                    chatImage: "#",
                    chatName: "Работа",
                    lastSendImg: undefinedIcon.src,
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
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Работаю над ним. Осталось доделать стили.",
                         date: new Date("2023-10-01T14:01:00Z").toString(),
                         author: "Dima",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Окей, жду тогда финальную версию.",
                         date: new Date("2023-10-01T14:02:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
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
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Не забудь про адаптив!",
                         date: new Date("2023-10-01T14:04:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkovdev@example.com",
                         userPassword: "securepass",
                         userIsDarkTheme: false,
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userDateRegistred: new Date("2020-09-09T00:00:00Z").toString(),
                         userTelegramInfo: "devStarkov",
                         userInstagramInfo: "stark_dev",
                         userIsOnline: true,
                         userChats: [],
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
                         userIsDarkTheme: false,
                         userPassword: "frontend123",
                         userDateRegistred: new Date("2023-07-18T00:00:00Z").toString(),
                         userTelegramInfo: "dimaWeb",
                         userInstagramInfo: "dimaInsta",
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userIsOnline: false,
                         userChats: [],
                         userFriends: [],
                         userImage:
                              "https://avatars.mds.yandex.net/i?id=56428907fa215bcd0400a3a6144b694c_l-5232252-images-thumbs&n=13",
                         userGroups: 3,
                         userDescription: "JS Developer"
                    }
               },
               chatId: "dev456",
               chatDateInitialization: new Date("2023-10-01T14:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Работа над сайтом",
                    chatImage: "#",
                    chatName: "Проект Х",
                    lastSendImg: undefinedIcon.src,
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
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Окей, подтвердила время",
                         date: new Date("2023-12-12T09:01:00Z").toString(),
                         author: "Anna",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Нужно обсудить новый релизgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
                         date: new Date("2023-12-12T09:02:00Z").toString(),
                         author: "Starkov",
                         isEdit: false,
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "У меня есть пара идей",
                         date: new Date("2023-12-12T09:03:00Z").toString(),
                         author: "Anna",
                         isEdit: false,
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Супер! Подготовь слайды, пожалуйста",
                         date: new Date("2023-12-12T09:04:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isEdit: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "stark_chat@example.com",
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userPassword: "pass1234",
                         userDateRegistred: new Date("2022-12-12T00:00:00Z").toString(),
                         userTelegramInfo: "starkmeeting",
                         userInstagramInfo: "starkinsta",
                         userIsOnline: true,
                         userIsDarkTheme: false,
                         userChats: [],
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
                         userIsDarkTheme: false,
                         userDateRegistred: new Date("2023-11-10T00:00:00Z").toString(),
                         userTelegramInfo: "anna_tg",
                         userThemeColorShceme: { dark: [""], light: [""] },
                         userInstagramInfo: "anna_ig",
                         userIsOnline: true,
                         userChats: [],
                         userFriends: [],
                         userImage:
                              "https://avatars.mds.yandex.net/i?id=53e858729b32a2e2a6a559c4a0e61c050c10436c-5179294-images-thumbs&n=13",
                         userGroups: 2,
                         userDescription: "Product Designer"
                    }
               },
               chatId: "conf123",
               chatDateInitialization: new Date("2023-12-12T09:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Встречи команды",
                    chatImage: "#",
                    chatName: "Созвоны",
                    lastSendImg: undefinedIcon.src,
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
                         id: Math.floor(Math.random() * 10000)
                    }
               ],
               joinUsers: null,

               chatId: "saved001",
               chatDateInitialization: new Date().toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Saved notes",
                    chatImage: "#",
                    chatName: "Закладки",
                    lastSendImg: undefinedIcon.src,
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
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
                         id: Math.floor(Math.random() * 10000)
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
                         userDescription: "2332325352235235"
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
                         userDescription: "23542356455234"
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

                         userDescription: "23235T3245"
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
                         userDescription: "23352324"
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

                         userDescription: "325354342"
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
                         userDescription: "2282282282228228222822282822828828282"
                    }
               ],
               chatId: "1231231212313",
               chatDateInitialization: new Date().toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "Channel",
                    chatImage: "#",
                    chatName: "Закладки",
                    lastSendImg: undefinedIcon.src,
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
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
               action: PayloadAction<{ img: string; name: string; description: string }>
          ) => {
               if (state.userChats) {
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
                                   userTelegramInfo: state.userTelegramInfo
                              }
                         ],
                         chatId: Math.floor(Math.random() * 10000000).toString(),
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
               }
          },
          setCreateNewChannel: (
               state,
               action: PayloadAction<{ img: string; name: string; description: string }>
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
                                   userTelegramInfo: state.userTelegramInfo
                              }
                         ],
                         chatId: Math.floor(Math.random() * 10000000).toString(),
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
     setCreateNewChannel
} = User.actions;
export default User.reducer;
