"use client";
import React from "react";
import ProfileHOC from "./profileHOC";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { RootState } from "../StateManagment/store";
import { Chats } from "../StateManagment/appSlice";
import { typeBoxMessageItem } from "./chatBoxMessageItem";
import { useLazyQuery, gql, useMutation, useQuery } from "@apollo/client";
import { ChatInfo } from "../StateManagment/appSlice";
import { roles } from "../StateManagment/appSlice";
import type { UserInterfaceForJoinUsers } from "../StateManagment/appSlice";
import GlobalContactSearch from "./globalContactsSearch";
const GET_USERS = gql`
     query getAllUsers {
          getAllUsers {
               userId
               userName
               userEmail
               userPassword
               userDateRegistred
               userTelegramInfo
               userInstagramInfo
               userIsOnline
               userFriends
               userImage
               userGroups
               userDescription
          }
     }
`;
const HeaderMessageMenu = ({
     isOpen,
     setIsOpen,
     setChats,
     value,
     setValue,
     userIsDarkTheme,
     userThemeColorScheme,
     language
}: {
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     setChats: React.Dispatch<React.SetStateAction<Chats[]>>;
     value: string;
     setValue: React.Dispatch<React.SetStateAction<string>>;
     userIsDarkTheme?: boolean;
     userThemeColorScheme?: { dark: string[]; light: string[] };
     language: string;
}) => {
     const { error, data, loading } = useQuery(GET_USERS);
     const user = useSelector((store: RootState) => store.User);
     const chats: Chats[] = [
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
               chatId: "@grp1223",
               chatDateInitialization: new Date("2025-06-27T10:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Бурные обсуждения нового эпизода любимого сериала",
                    chatImage: "",
                    chatName: "ГРУППА2",
                    lastSendImg: "",
                    title: "ГРУППА2",
                    lastUserName: "Alex",
                    value: "Предлагаю встретиться в субботу и обсудить все теории лично!",
                    lastMessageDate: new Date("2025-06-27T10:32:27Z").toString(),
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
               chatId: "@grp123",
               chatDateInitialization: new Date("2025-06-27T10:00:00Z").toString(),
               imagesChat: "",
               info: {
                    chatDescription: "Бурные обсуждения нового эпизода любимого сериала",
                    chatImage: "",
                    chatName: "ГРУППА1",
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
               chatId: "@chan00111111",
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "",
                    chatName: "КАНАЛ2",
                    lastSendImg: "",
                    title: "КАНАЛ2",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date().toString(),
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
               chatId: "@chan00111",
               chatDateInitialization: new Date().toString(),
               imagesChat: "",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "",
                    chatName: "КАНАЛ1",
                    lastSendImg: "",
                    title: "КАНАЛ 1",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date().toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          }
     ];
     const [contacts, _] = React.useState<(UserInterfaceForJoinUsers | Chats)[]>([
          /*
          {
               userId: "@user1",
               userName: "Иван Иванов",
               userEmail: "ivan1@example.com",
               userPassword: "password123",
               userDateRegistred: "2024-01-15",
               userTelegramInfo: "@ivan1",
               userInstagramInfo: "@ivan.1",
               userIsOnline: true,
               userFriends: ["user2", "user3"],
               userImage: "",
               userGroups: 3,
               userDescription: "Люблю путешествовать и кодить."
          },
          {
               userId: "@user2",
               userName: "Мария Смирнова",
               userEmail: "maria2@example.com",
               userPassword: "securepass456",
               userDateRegistred: "2023-12-20",
               userTelegramInfo: "@maria2",
               userInstagramInfo: "@maria.2",
               userIsOnline: false,
               userFriends: "user1",
               userImage: "",
               userGroups: 5,
               userDescription: "Фотограф и блогер."
          },
          {
               userId: "@user3",
               userName: "Алексей Кузнецов",
               userEmail: "alex3@example.com",
               userPassword: "qwerty789",
               userDateRegistred: "2024-02-01",
               userTelegramInfo: "@alex3",
               userInstagramInfo: "@alex.3",
               userIsOnline: true,
               userFriends: ["user1", "user2", "user4"],
               userImage: "",
               userGroups: 2,
               userDescription: "Frontend-разработчик."
          },
          {
               userId: "@user4",
               userName: "Елена Попова",
               userEmail: "elena4@example.com",
               userPassword: "passElena321",
               userDateRegistred: "2024-03-12",
               userTelegramInfo: "@elena4",
               userInstagramInfo: "@elena.4",
               userIsOnline: false,
               userFriends: [],
               userImage: "",
               userGroups: 1,
               userDescription: "Дизайнер интерфейсов."
          },
          {
               userId: "@anton",
               userName: "Дмитрий Соколов",
               userEmail: "dmitry5@example.com",
               userPassword: "dmitrypass",
               userDateRegistred: "2023-11-05",
               userTelegramInfo: "@dmitry5",
               userInstagramInfo: "@dmitry.5",
               userIsOnline: true,
               userFriends: ["user6"],
               userImage: "",
               userGroups: 4,
               userDescription: "UX-исследователь и геймер."
          },
          {
               userId: "@123use123123r6",
               userName: "Ольга Лебедева",
               userEmail: "olga6@example.com",
               userPassword: "olga654321",
               userDateRegistred: "2024-01-10",
               userTelegramInfo: "@olga6",
               userInstagramInfo: "@olga.6",
               userIsOnline: false,
               userFriends: "user5",
               userImage: "",
               userGroups: 6,
               userDescription: "Копирайтер и автор статей."
          },
          {
               userId: "@324234user7",
               userName: "Сергей Морозов",
               userEmail: "sergey7@example.com",
               userPassword: "sergeypass",
               userDateRegistred: "2024-05-01",
               userTelegramInfo: "@sergey7",
               userInstagramInfo: "@sergey.7",
               userIsOnline: true,
               userFriends: ["user1", "user3", "user5"],
               userImage: "",
               userGroups: 2,
               userDescription: "Фанат новых технологий."
          },
          {
               userId: "@123user8",
               userName: "Наталья Новикова",
               userEmail: "nataly8@example.com",
               userPassword: "natalypass",
               userDateRegistred: "2023-09-27",
               userTelegramInfo: "@nataly8",
               userInstagramInfo: "@nataly.8",
               userIsOnline: false,
               userFriends: [],
               userImage: "",
               userGroups: 3,
               userDescription: "Маркетолог в IT-компании."
          },
          {
               userId: "@leyd",
               userName: "Антон Васильев",
               userEmail: "anton9@example.com",
               userPassword: "antonpass999",
               userDateRegistred: "2023-07-19",
               userTelegramInfo: "@anton9",
               userInstagramInfo: "@anton.9",
               userIsOnline: true,
               userFriends: ["user10"],
               userImage: "",
               userGroups: 5,
               userDescription: "Backend-разработчик."
          },
          {
               userId: "@artem",
               userName: "Татьяна Белова",
               userEmail: "tanya10@example.com",
               userPassword: "tanya123",
               userDateRegistred: "2024-06-01",
               userTelegramInfo: "@tanya10",
               userInstagramInfo: "@tanya.10",
               userIsOnline: true,
               userFriends: ["user9"],
               userImage: "",
               userGroups: 1,
               userDescription: "SMM-специалист."
          }*/
          ...chats
     ]);
     const [findContacts, setFindContacts] =
          React.useState<(UserInterfaceForJoinUsers | Chats)[]>();
     const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
     const [edit, setEdit] = React.useState<boolean>(false);
     const [globalContactsIsOpen, setGlobalContactsIsOpen] = React.useState<boolean>(false);
     const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
          const searchValue = event.currentTarget.value as string;
          setValue(searchValue);
          if (!searchValue.startsWith("@")) {
               setChats((prevState: Chats[]) => {
                    const newChats = prevState.filter((chat: Chats) => {
                         return chat.info.title.includes(event.target.value);
                    });

                    return newChats;
               });
          } else if (searchValue.startsWith("@") && searchValue.length > 2) {
               const newContacts: (UserInterfaceForJoinUsers | Chats)[] = contacts.filter(
                    (contact: UserInterfaceForJoinUsers | Chats, index: number) => {
                         if (!("type" in contact)) {
                              return !user.userContacts?.some(
                                   (userContact: UserInterfaceForJoinUsers) => {
                                        return "@" + userContact.userId === contact.userId;
                                   }
                              );
                         } else {
                              return !user.userChats.some((userContact: Chats) => {
                                   return "@" + userContact.chatId === contact.chatId;
                              });
                         }
                    }
               );
               if (newContacts) {
                    const equalityContacts: (UserInterfaceForJoinUsers | Chats)[] =
                         newContacts.filter((contact: UserInterfaceForJoinUsers | Chats) => {
                              if ("userId" in contact) {
                                   return contact.userId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              } else if ("type" in contact) {
                                   return contact.chatId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              }
                         });
                    setFindContacts(equalityContacts);
                    setGlobalContactsIsOpen(true);
               } else {
                    const equalityContacts: (UserInterfaceForJoinUsers | Chats)[] = contacts.filter(
                         (contact: UserInterfaceForJoinUsers | Chats) => {
                              if ("userId" in contact) {
                                   return contact.userId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              } else if ("type" in contact) {
                                   return contact.chatId
                                        .toLocaleLowerCase()
                                        .startsWith(searchValue.toLocaleLowerCase());
                              }
                         }
                    );
                    setFindContacts(equalityContacts);
                    setGlobalContactsIsOpen(true);
               }
          }
     };
     const NewProfile = ProfileHOC({
          WrappedComponent: Profile,
          edit: edit
     });
     React.useEffect(() => {
          value.length === 0 ? (setChats(user.userChats), setFindContacts([])) : null;
     }, [value]);
     React.useEffect(() => {
          if (data) {
               console.log(data.getAllUsers, "ЛЮДИИ");
               _((prev) => {
                    const newState = [...prev, ...data.getAllUsers];
                    return newState;
               });
          }
     }, [data]);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme?.dark[5]
                         : userThemeColorScheme?.light[5]
               }}
               className="headerMessageMenu"
          >
               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="headerMessageMenu__burgerMenu"
               ></button>
               <div className="headerMessageMenu__inputSearch">
                    <input
                         onChange={(event) => handleSetValue(event)}
                         type="text"
                         onClick={() => console.log(data.getAllUsers, "ЛЮДИИ")}
                         placeholder={language === "RUSSIAN" ? "Поиск" : "Search"}
                         className="headerMessageMenu__input"
                         value={value}
                    ></input>
                    {value.length != 0 ? (
                         <span
                              onClick={() => setValue("")}
                              className="headerMessageMenu__inputSearchDelete"
                         ></span>
                    ) : null}
               </div>
               <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="headerMessageMenu__profile"
               ></button>
               {profileOpen && (
                    <NewProfile
                         userIsDarkTheme={userIsDarkTheme!}
                         userThemeColorScheme={userThemeColorScheme!}
                         key={Math.random()}
                         email={user.userEmail}
                         name={user.userName}
                         countFriends={0}
                         countGroups={user.userGroups}
                         description={user.userDescription}
                         userId={user.userId}
                         telegram={user.userTelegramInfo}
                         instagram={user.userInstagramInfo}
                         setProfileOpen={setProfileOpen}
                         setEdit={setEdit}
                         img={user.userImage}
                         owner={true}
                         as={edit ? "input" : "p"}
                         language={language}
                    ></NewProfile>
               )}
               {globalContactsIsOpen && findContacts?.length! >= 1 ? (
                    <GlobalContactSearch
                         userThemeColorScheme={userThemeColorScheme}
                         userIsDarkTheme={userIsDarkTheme!}
                         contacts={findContacts}
                    ></GlobalContactSearch>
               ) : null}
          </div>
     );
};
export default HeaderMessageMenu;
