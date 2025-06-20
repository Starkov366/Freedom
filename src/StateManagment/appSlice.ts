import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { title } from "process";
import { typeBoxMessageItem } from "../components/chatBoxMessageItem";
import { RootState } from "./store";

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
     joinUsers: UserInterface[];
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "GROUP";
};
export type DuoChat = {
     messages: typeBoxMessageItem[];
     joinUsers: { one: UserInterface; two: UserInterface };
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "DUO";
};
type ChannelChat = {
     messages: typeBoxMessageItem[];
     joinUsers: UserInterface[];
     chatId: string;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "CHANNEL";
};
type SavedMessagesChat = {
     messages: typeBoxMessageItem[];
     chatId: string;
     joinUsers: null;
     chatDateInitialization: string;
     imagesChat: string;
     info: ChatInfo;
     type: "SAVED";
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
     userDescription: "AAAAAAAAAAAAAAAAAAAA",
     userChats: [
          {
               type: "GROUP",
               // GroupChat
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date("2022-02-22T00:00:00Z").toString(),
                    flagCheck: false,
                    messageImage: ""
               }
          },
          {
               // DuoChat
               type: "DUO",
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date().toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-03-10T09:00:00Z").toString(),
                         author: "Ivan",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Хорошо, а ты как?",
                         date: new Date("2023-03-10T09:01:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Тоже неплохо. Готов к завтрашнему митингу?",
                         date: new Date("2023-03-10T09:02:00Z").toString(),
                         author: "Ivan",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Да, презентация почти готова.",
                         date: new Date("2023-03-10T09:03:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Отлично. Жду твою часть вечером.",
                         date: new Date("2023-03-10T09:04:00Z").toString(),
                         author: "Ivan",
                         checkFlag: false,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
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
                         userChats: [],
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
                         userChats: [],
                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 23232332,
                         userDescription: "32222222222222222222"
                    }
               },
               chatId: "duo123",
               chatDateInitialization: new Date("2022-02-22T00:00:00Z").toString(),
               imagesChat: "#",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "#",
                    chatName: "Вести",
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.Сегодня в выпуске — важные новости из мира технологий.",
                         date: new Date("2022-02-22T08:00:00Z").toString(),
                         author: "Editor",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Google представил новый AI-сервис.",
                         date: new Date("2022-02-22T08:05:00Z").toString(),
                         author: "Editor",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Apple анонсировал WWDC 2025.",
                         date: new Date("2022-02-22T08:10:00Z").toString(),
                         author: "Editor",
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-05-10T10:30:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Привет! Всё хорошо. У тебя как?",
                         date: new Date("2023-05-10T10:31:00Z").toString(),
                         author: "Olga",
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Тоже отлично. Над чем сейчас работаешь?",
                         date: new Date("2023-05-10T10:32:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Делаю макеты для нового лендинга.",
                         date: new Date("2023-05-10T10:34:00Z").toString(),
                         author: "Olga",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Можешь показать позже?",
                         date: new Date("2023-05-10T10:35:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Конечно, к 18:00 скину в чат.",
                         date: new Date("2023-05-10T10:36:00Z").toString(),
                         author: "Olga",
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
                         userPassword: "qwerty123",
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "Когда будет готов проект?",
                         date: new Date("2023-10-01T14:00:00Z").toString(),
                         author: "Starkov",
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
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Окей, жду тогда финальную версию.",
                         date: new Date("2023-10-01T14:02:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Загружу в репозиторий вечером.",
                         date: new Date("2023-10-01T14:03:00Z").toString(),
                         author: "Dima",
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
                         userPassword: "frontend123",
                         userDateRegistred: new Date("2023-07-18T00:00:00Z").toString(),
                         userTelegramInfo: "dimaWeb",
                         userInstagramInfo: "dimaInsta",
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "Созвон в 1gwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk8:00",
                         date: new Date("2023-12-12T09:00:00Z").toString(),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Окей, подтвердила время",
                         date: new Date("2023-12-12T09:01:00Z").toString(),
                         author: "Anna",
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Нужно обсудить новый релизgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgwkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
                         date: new Date("2023-12-12T09:02:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "У меня есть пара идей",
                         date: new Date("2023-12-12T09:03:00Z").toString(),
                         author: "Anna",
                         checkFlag: true,
                         isLike: true,
                         id: Math.floor(Math.random() * 10000)
                    },
                    {
                         value: "Супер! Подготовь слайды, пожалуйста",
                         date: new Date("2023-12-12T09:04:00Z").toString(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         id: Math.floor(Math.random() * 10000)
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
                         userDateRegistred: new Date("2023-11-10T00:00:00Z").toString(),
                         userTelegramInfo: "anna_tg",
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "My note",
                         date: new Date().toString(),
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date().toString(),
                         author: "Starkov",
                         checkFlag: false,
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
                         userChats: [],
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
                         userChats: [],
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
                         userChats: [],
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
                         userChats: [],
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
                         userChats: [],
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
                         userChats: [],
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
                    lastSendImg: "https://cs8.pikabu.ru/avatars/2398/x2398524-1748244457.png",
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
               const targetChats: Chats[] = state.userChats.map((chat: Chats) => {
                    if (chat.chatId === action.payload.ID && chat.type === "DUO") {
                         return action.payload.newChat;
                    } else {
                         return chat;
                    }
               });

               state.userChats = targetChats;
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
               const targetChats: Chats[] = state.userChats.map((chat: Chats) => {
                    if (chat.chatId === action.payload.chatId && chat.type === "DUO") {
                         return {
                              messages: chat.messages,
                              joinUsers: {
                                   one: chat.joinUsers.one,
                                   two: chat.joinUsers.two
                              },
                              chatId: chat.chatId,
                              chatDateInitialization: chat.chatDateInitialization,
                              imagesChat: chat.imagesChat,
                              type: chat.type,

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
                                   messageImage: action.payload.messageImage
                              }
                         };
                    } else {
                         return chat;
                    }
               });
               state.userChats = targetChats;
          },
          setClearChatHistory: (store, action: PayloadAction<{ ID: string }>) => {
               let res: Chats[] = store.userChats;
               res.forEach((chat: Chats) => {
                    if (chat.chatId === action.payload.ID) {
                         chat.messages = [];
                    } else {
                         return chat;
                    }
               });
               store.userChats = [...res];
          },
          setDeleteChat: (store, action: PayloadAction<{ ID: string }>) => {
               const newChats: Chats[] = store.userChats.filter((chat: Chats) => {
                    return action.payload.ID !== chat.chatId;
               });
               store.userChats = [...newChats];
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
          }
     }
});
export const {
     setDataByChatId,
     setHeaderChatById,
     setClearChatHistory,
     setDeleteChat,
     setUpdateUserInfo
} = User.actions;
export default User.reducer;
