import type { UserInterface, UserInterfaceForJoinUsers } from "@/StateManagment/appSlice";
import { error } from "console";
import { valueFromAST } from "graphql";
import { GraphQLScalarType } from "graphql";
import GraphQLJSON from "graphql-type-json";
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
               const parsedUsers: any[] = [];
               for (const val of Object.values(users)) {
                    const value: UserInterfaceForJoinUsers = val as any;
                    parsedUsers.push(value);
               }
               return parsedUsers;
          }
     }
};

export default resolvers;
