import type { DuoChat, UserInterface, UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import { error } from "console";
import { valueFromAST } from "graphql";
import { GraphQLScalarType } from "graphql";
import GraphQLJSON from "graphql-type-json";
import type { Chats } from "@/StateManagment/appSlice";
const URL: string = "https://telegrambotfishcombat-default-rtdb.firebaseio.com/";
const resolvers = {
     JSON: GraphQLJSON,
     Mutation: {
          addUser: async (_: any, args: { user: UserInterface }) => {
               const response = await fetch(URL + "freedomUsers.json", {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(args.user),
                    method: "POST"
               });
               if (response.ok) {
                    return args.user;
               } else {
                    throw new Error("error");
               }
          },
          addContactToUser: async (
               _: any,
               args: {
                    contact: UserInterfaceForJoinUsers;
                    contactId: string;
                    userId: string;
                    myContact: UserInterfaceForJoinUsers;
               }
          ) => {
               try {
                    const keys: [string, string] = ["", ""];
                    const response = await fetch(URL + "freedomUsers.json", {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "GET"
                    });
                    const users = await response.json();

                    for (const [key, value] of Object.entries(users)) {
                         const typedValue: UserInterface = value as UserInterface;
                         if (typedValue.userId === args.contactId) {
                              keys[0] = key;
                         } else if (typedValue.userId === args.userId) {
                              keys[1] = key;
                         }
                    }
                    console.log(keys, "КЛЮЧИИИИ", args.myContact);
                    await fetch(URL + `freedomUsers/${keys[0]}/userContacts.json`, {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "POST",
                         body: JSON.stringify(args.myContact)
                    });
                    await fetch(URL + `freedomUsers/${keys[1]}/userContacts.json`, {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "POST",
                         body: JSON.stringify(args.contact)
                    });

                    return "SUCESS";
               } catch (error) {
                    console.error(error);
               }
          },
          sendNewDuoChatToUsers: async (
               _: any,
               args: { chat: DuoChat; contactId: string; userId: string }
          ) => {
               try {
                    const keys: [string, string] = ["", ""];
                    const response = await fetch(URL + "freedomUsers.json", {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "GET"
                    });
                    const users = await response.json();

                    for (const [key, value] of Object.entries(users)) {
                         const typedValue: UserInterface = value as UserInterface;
                         if (typedValue.userId === args.contactId) {
                              keys[0] = key;
                         } else if (typedValue.userId === args.userId) {
                              keys[1] = key;
                         }
                    }
                    console.log(keys, "КЛЮЧИИИИ", args.chat);
                    await fetch(URL + `freedomUsers/${keys[0]}/userChats.json`, {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "POST",
                         body: JSON.stringify(args.chat)
                    });
                    await fetch(URL + `freedomUsers/${keys[1]}/userChats.json`, {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "POST",
                         body: JSON.stringify(args.chat)
                    });

                    return "SUCESS";
               } catch (error) {
                    console.error(error);
               }
          },
          updateChatDB: async (_: any, args: { targetChat: Chats }) => {
               let chatKey: string = "";
               const chats = await fetch(
                    "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomChats.json",
                    {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         }
                    }
               );
               const readyChats = await chats.json();
               for (const [key, val] of Object.entries(readyChats)) {
                    const value = val as Chats;
                    if (value.chatId === args.targetChat.chatId) {
                         chatKey = key;
                         await fetch(
                              `https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomChats/${chatKey}.json`,
                              {
                                   method: "PUT",
                                   headers: {
                                        "Content-Type": "application/json"
                                   },
                                   body: JSON.stringify(args.targetChat)
                              }
                         );
                         break;
                    }
               }
               return "SUCCES";
          },
          updateDuoChat: async (
               _: any,
               args: { ownUserId: string; myId: string; newChat: DuoChat }
          ) => {
               const keys = {
                    myKey: "",
                    ownUserKey: "",
                    myChatKey: "",
                    ownChatKey: ""
               };
               try {
                    const response = await fetch(URL + "freedomUsers.json", {
                         headers: {
                              "Content-Type": "application/json"
                         },
                         method: "GET"
                    });
                    const users = await response.json();
                    for (const [key, value] of Object.entries(users) as [string, UserInterface][]) {
                         if (value.userId === args.myId) {
                              keys.myKey = key;
                         } else if (value.userId === args.ownUserId) {
                              keys.ownUserKey = key;
                         }
                    }

                    const responseMyChat = await fetch(
                         URL + `freedomUsers/${keys.myKey}/userChats.json`,
                         {
                              headers: {
                                   "Content-Type": "application/json"
                              },
                              method: "GET"
                         }
                    );
                    const myChats = await responseMyChat.json();
                    for (const [key, value] of Object.entries(myChats) as [string, Chats][]) {
                         if (value.chatId === args.newChat.chatId) {
                              keys.myChatKey = key;
                         }
                    }

                    const responseOwnChat = await fetch(
                         URL + `freedomUsers/${keys.ownUserKey}/userChats.json`,
                         {
                              headers: {
                                   "Content-Type": "application/json"
                              },
                              method: "GET"
                         }
                    );
                    const ownChats = await responseOwnChat.json();
                    for (const [key, value] of Object.entries(ownChats) as [string, Chats][]) {
                         if (value.chatId === args.newChat.chatId) {
                              keys.ownChatKey = key;
                         }
                    }

                    await fetch(
                         URL + `freedomUsers/${keys.myKey}/userChats/${keys.myChatKey}.json`,
                         {
                              headers: {
                                   "Content-Type": "application/json"
                              },
                              method: "PUT",
                              body: JSON.stringify(args.newChat)
                         }
                    );

                    await fetch(
                         URL + `freedomUsers/${keys.ownUserKey}/userChats/${keys.ownChatKey}.json`,
                         {
                              headers: {
                                   "Content-Type": "application/json"
                              },
                              method: "PUT",
                              body: JSON.stringify(args.newChat)
                         }
                    );

                    console.log("КЛЮЧИ: ", keys);
               } catch (error: any) {
                    console.error(error);
               }
               return keys;
          }
     },
     Query: {
          getUserById: async (_: any, args: { userId: string }) => {
               const response = await fetch(URL + "freedomUsers.json", {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json"
                    }
               });

               if (!response.ok) {
                    throw new Error("Ошибка при получении данных");
               }

               const users: Record<string, UserInterface> = await response.json();
               let user: UserInterface | null = null;

               for (const [key, value] of Object.entries(users)) {
                    if (value.userName === args.userId) {
                         user = value;
                         break;
                    }
               }

               return user
                    ? {
                           ...user,
                           userFriends: Array.isArray(user.userFriends) ? user.userFriends : [],
                           userChats: Array.isArray(user.userChats) ? user.userChats : [],
                           userContacts: Array.isArray(user.userContacts) ? user.userContacts : [],
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
                           }
                      }
                    : null;
          },
          getAllUsers: async (_: any, __: any) => {
               const allUsers = await fetch(URL + "freedomUsers.json", {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    method: "GET"
               });
               const users = await allUsers.json();
               const cleanedUsers: UserInterfaceForJoinUsers[] = Object.values(users).map(
                    (user: any) => ({
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
                         userTelegramInfo: user.userTelegramInfo
                    })
               );

               return cleanedUsers;
          },
          getAllChats: async (_: any, __: any) => {
               const allUsers = await fetch(URL + "freedomChats.json", {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    method: "GET"
               });
               const users = await allUsers.json();
               const cleanedChats: Chats[] = Object.values(users).map((chat: any) => ({
                    chatDateInitialization: chat.chatDateInitialization,
                    chatId: chat.chatId,
                    chatOperation: chat.chatOperation,
                    messages: chat.messages,
                    pinnedMessage: chat.pinnedMessage,
                    type: chat.type,
                    joinUsers: chat.joinUsers,
                    imagesChat: chat.imagesChat,
                    info: chat.info
               }));

               return cleanedChats;
          },
          getUpdateMessageMenu: async (_: any, args: { userId: string; userChats: Chats[] }) => {
               let userKey: string = "";
               let userChats: Chats[];
               const res = await fetch(URL + "freedomUsers.json", {
                    headers: { "Content-Type": "application/json" },
                    method: "GET"
               });

               const ready = await res.json();
               for (const [key, value] of Object.entries(ready) as [string, UserInterface][]) {
                    if (value.userId === args.userId) {
                         userKey = key;
                         userChats = value.userChats;
                         break;
                    }
               }
               const newUserChats: Chats[] = [];

               for (const chat of userChats!) {
                    if (chat.type === "DUO") {
                         const res = await fetch(`${URL}freedomUsers/${userKey}/userChats.json`, {
                              headers: { "Content-Type": "application/json" },
                              method: "GET"
                         });

                         const userChats = await res.json();

                         let targetChat = chat;
                         for (const [_, value] of Object.entries(userChats) as [string, Chats][]) {
                              if (value.chatId === chat.chatId) {
                                   targetChat = value as DuoChat;
                                   break;
                              }
                         }

                         newUserChats.push(targetChat);
                    } else if (chat.type === "CHANNEL" || chat.type === "GROUP") {
                         let targetChat: Chats = chat;
                         const res = await fetch(`${URL}freedomChats.json`, {
                              headers: { "Content-Type": "application/json" },
                              method: "GET"
                         });

                         const userChats = await res.json();

                         for (const [_, value] of Object.entries(userChats) as [string, Chats][]) {
                              if (value.chatId === chat.chatId) {
                                   targetChat = value as Chats;
                                   break;
                              }
                         }
                         newUserChats.push(targetChat);
                    } else if (chat.type === "SAVED") {
                         newUserChats.push(chat);
                    }
               }
               return newUserChats;
          }
     }
};

export default resolvers;
