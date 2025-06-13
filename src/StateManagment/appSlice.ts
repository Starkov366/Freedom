import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { title } from "process";
import { typeBoxMessageItem } from "../components/chatBoxMessageItem";
type Messages = typeBoxMessageItem[];

type ChatInfo = {
     chatImage: string;
     chatName: string;
     chatDescription: string;
     lastSendImg: string;
     title: string;
     lastUserName: string;
     value: string;
     lastMessageDate: Date;
     flagCheck: boolean;
};
type GroupChat = {
     messages: Messages;
     joinUsers: UserInterface[];
     chatId: string;
     chatDateInitialization: Date;
     imagesChat: string;
     info: ChatInfo;
};
export type DuoChat = {
     messages: Messages;
     joinUsers: { one: UserInterface; two: UserInterface };
     chatId: string;
     chatDateInitialization: Date;
     imagesChat: string;
     info: ChatInfo;
};
type ChannelChat = {
     messages: Messages[];
     joinUsers: UserInterface[];
     chatId: string;
     chatDateInitialization: Date;
     imagesChat: string;
     info: ChatInfo;
};
type SavedMessagesChat = {
     messages: Messages;
     chatId: string;
     joinUsers: null;
     chatDateInitialization: Date;
     imagesChat: string;
     info: ChatInfo;
};
export type Chats = GroupChat | DuoChat | ChannelChat | SavedMessagesChat;
export interface UserInterface {
     userId: string;
     userName: string;
     userEmail: string;
     userPassword: string;
     userDateRegistred: Date;
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
     userDateRegistred: new Date("2022-02-22T00:00:00Z"),
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
               // GroupChat
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z"),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false
                    }
               ],
               joinUsers: [],
               chatId: "123ft13f",
               chatDateInitialization: new Date("2022-02-22T00:00:00Z"),
               imagesChat: "#",
               info: {
                    chatDescription: "Description....",
                    chatImage: "#",
                    chatName: "Чатик",
                    lastSendImg: "#",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date("2022-02-22T00:00:00Z"),
                    flagCheck: false
               }
          },
          {
               // DuoChat
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date("2022-02-22T00:00:00Z"),
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
                         userDateRegistred: new Date("2022-02-22T00:00:00Z"),
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
               chatDateInitialization: new Date("2022-02-22T00:00:00Z"),
               imagesChat: "#",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "#",
                    chatName: "Вести",
                    lastSendImg: "#",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date("2022-02-22T00:00:00Z"),
                    flagCheck: false
               }
          },
          {
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date("2022-02-22T00:00:00Z"),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false
                    }
               ],
               joinUsers: [],
               chatId: "chan001",
               chatDateInitialization: new Date(),
               imagesChat: "#",
               info: {
                    chatDescription: "News Channel",
                    chatImage: "#",
                    chatName: "Вести",
                    lastSendImg: "#",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date(),
                    flagCheck: false
               }
          },
          {
               messages: [
                    {
                         value: "Привет, как дела?",
                         date: new Date("2023-05-10T10:30:00Z"),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: true
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkov@mail.ru",
                         userPassword: "supersecure123",
                         userDateRegistred: new Date("2021-01-15T00:00:00Z"),
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
                         userDateRegistred: new Date("2023-03-12T00:00:00Z"),
                         userTelegramInfo: "olgaTG",
                         userInstagramInfo: "olgaInsta",
                         userIsOnline: true,
                         userChats: [],
                         userFriends: ["Lena"],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 7,
                         userDescription: "Фотограф и дизайнер"
                    }
               },
               chatId: "duo789",
               chatDateInitialization: new Date("2023-06-01T12:00:00Z"),
               imagesChat: "#",
               info: {
                    chatDescription: "Разговоры о работе",
                    chatImage: "#",
                    chatName: "Работа",
                    lastSendImg: "#",
                    title: "Обсуждение задач",
                    lastUserName: "Olga",
                    value: "Нужно обсудить дедлайны",
                    lastMessageDate: new Date("2023-06-01T12:01:00Z"),
                    flagCheck: true
               }
          },
          {
               messages: [
                    {
                         value: "Когда будет готов проект?",
                         date: new Date("2023-10-01T14:00:00Z"),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "starkovdev@example.com",
                         userPassword: "securepass",
                         userDateRegistred: new Date("2020-09-09T00:00:00Z"),
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
                         userDateRegistred: new Date("2023-07-18T00:00:00Z"),
                         userTelegramInfo: "dimaWeb",
                         userInstagramInfo: "dimaInsta",
                         userIsOnline: false,
                         userChats: [],
                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 3,
                         userDescription: "JS Developer"
                    }
               },
               chatId: "dev456",
               chatDateInitialization: new Date("2023-10-01T14:00:00Z"),
               imagesChat: "#",
               info: {
                    chatDescription: "Работа над сайтом",
                    chatImage: "#",
                    chatName: "Проект Х",
                    lastSendImg: "#",
                    title: "Фронтенд задачи",
                    lastUserName: "Dima",
                    value: "Почти готово!",
                    lastMessageDate: new Date("2023-10-01T14:05:00Z"),
                    flagCheck: false
               }
          },
          {
               messages: [
                    {
                         value: "Созвон в 18:00",
                         date: new Date("2023-12-12T09:00:00Z"),
                         author: "Starkov",
                         checkFlag: true,
                         isLike: false
                    }
               ],
               joinUsers: {
                    one: {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "stark_chat@example.com",
                         userPassword: "pass1234",
                         userDateRegistred: new Date("2022-12-12T00:00:00Z"),
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
                         userDateRegistred: new Date("2023-11-10T00:00:00Z"),
                         userTelegramInfo: "anna_tg",
                         userInstagramInfo: "anna_ig",
                         userIsOnline: true,
                         userChats: [],
                         userFriends: [],
                         userImage:
                              "https://go.zvuk.com/thumb/1000x0/filters:quality(75)/imgs/2024/09/06/11/6585601/a2ec1c8ed5d94b754598085c33428b043fe6507b.jpg",
                         userGroups: 2,
                         userDescription: "Product Designer"
                    }
               },
               chatId: "conf123",
               chatDateInitialization: new Date("2023-12-12T09:00:00Z"),
               imagesChat: "#",
               info: {
                    chatDescription: "Встречи команды",
                    chatImage: "#",
                    chatName: "Созвоны",
                    lastSendImg: "#",
                    title: "Командная синхронизация",
                    lastUserName: "Anna",
                    value: "Подтверждаю время",
                    lastMessageDate: new Date("2023-12-12T09:05:00Z"),
                    flagCheck: true
               }
          },
          {
               // SavedMessagesChat
               messages: [
                    {
                         value: "My note",
                         date: new Date(),
                         author: "Me",
                         checkFlag: true,
                         isLike: false
                    }
               ],
               joinUsers: null,

               chatId: "saved001",
               chatDateInitialization: new Date(),
               imagesChat: "#",
               info: {
                    chatDescription: "Saved notes",
                    chatImage: "#",
                    chatName: "Закладки",
                    lastSendImg: "#",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date(),
                    flagCheck: false
               }
          },
          //ChannelChat
          {
               messages: [
                    {
                         value: "Содержание...",
                         date: new Date(),
                         author: "Starkov",
                         checkFlag: false,
                         isLike: false,
                         countView: 0
                    }
               ],
               joinUsers: [
                    {
                         userId: "123",
                         userName: "Starkov",
                         userEmail: "valuznnicatem@gmail.com",
                         userPassword: "93334562aaa",
                         userDateRegistred: new Date(),
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
                         userDateRegistred: new Date(),
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
                         userDateRegistred: new Date(),
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
                         userDateRegistred: new Date(),
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
                         userDateRegistred: new Date(),
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
                         userDateRegistred: new Date(),
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
               chatDateInitialization: new Date(),
               imagesChat: "#",
               info: {
                    chatDescription: "Channel",
                    chatImage: "#",
                    chatName: "Закладки",
                    lastSendImg: "#",
                    title: "aaaaaaa",
                    lastUserName: "trema",
                    value: "блять идите нахуй",
                    lastMessageDate: new Date(),
                    flagCheck: false
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
                    if (chat.chatId === action.payload.ID) {
                         return action.payload.newChat;
                    } else {
                         return chat;
                    }
               });

               state.userChats = targetChats;
          }
     }
});
export default User.reducer;
