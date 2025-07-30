import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";
import GraphQLJSON from "graphql-type-json";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
     scalar JSON
     type UserThemes {
          dark: [String]
          light: [String]
     }
     enum Language {
          ENGLISH
          RUSSIAN
     }
     enum Roles {
          ADMIN
          GUEST
     }
     enum ChatTypes {
          GROUP
          DUO
          CHANNEL
          SAVED
     }

     type UserLikes {
          userId: String
     }
     type ChatInfo {
          chatImage: String
          chatName: String
          chatDescription: String
          lastSendImg: String
          title: String
          lastUserName: String
          value: String
          lastMessageDate: String
          flagCheck: Boolean
          messageImage: String
     }
     type Reply {
          name: String
          value: String
          y: Int
     }
     type TypeBoxMessageItem {
          value: String
          date: String
          author: String
          checkFlag: Boolean
          isLike: Boolean
          countView: Int
          image: [String]
          id: ID
          targetChatId: ID
          isVisible: Boolean
          targetChat: Chats
          inputValue: String
          isEdit: Boolean
          type: ChatTypes
          usersLikes: [UserLikes]
          language: Language
          reply: Reply
          positionY: Int
     }
     type GroupChat {
          messages: [TypeBoxMessageItem]
          joinUsers: [UserInterfaceForJoinUsers]
          chatId: String
          chatDateInitialization: String
          imagesChat: String
          info: ChatInfo
          type: ChatTypes
          pinnedMessage: [String]
          chatOperation: Int
     }
     type DuoUsers {
          one: UserInterfaceForJoinUsers
          two: UserInterfaceForJoinUsers
     }
     type DuoChat {
          messages: [TypeBoxMessageItem]
          joinUsers: DuoUsers
          chatId: String
          chatDateInitialization: String
          imagesChat: String
          info: ChatInfo
          type: ChatTypes
          pinnedMessage: [String]
          chatOperation: Int
     }
     type ChannelChat {
          messages: [TypeBoxMessageItem]
          joinUsers: [UserInterfaceForJoinUsers]
          chatId: ID
          chatDateInitialization: String
          imagesChat: String
          info: ChatInfo
          type: ChatTypes
          pinnedMessage: [String]
          chatOperation: Int
     }
     type SavedMessagesChat {
          messages: [TypeBoxMessageItem]
          chatId: String
          joinUsers: String
          chatDateInitialization: String
          imagesChat: String
          info: ChatInfo
          type: ChatTypes
          pinnedMessage: [String]
          chatOperation: Int
     }
     union Chats = GroupChat | DuoChat | ChannelChat | SavedMessagesChat
     type UserInterfaceForJoinUsers {
          userId: String
          userName: String
          userEmail: String
          userPassword: String
          userDateRegistred: String
          userTelegramInfo: String
          userInstagramInfo: String
          userIsOnline: Boolean
          userFriends: [String]
          userImage: String
          userGroups: Int
          userDescription: String
          userChatID: String
          userRole: Roles
     }
     type UserInterface {
          userId: String
          userName: String
          userEmail: String
          userPassword: String
          userDateRegistred: String
          userTelegramInfo: String
          userInstagramInfo: String
          userIsOnline: Boolean
          userChats: [JSON]
          userFriends: [String]
          userImage: String
          userContacts: JSON
          userGroups: Int
          userDescription: String
          userThemeColorShceme: JSON
          userIsDarkTheme: Boolean
          userLanguage: Language
     }
     type Mutation {
          addUser(user: UserInterfaceInput): UserInterface
     }
     type Query {
          getUserById(userId: String): UserInterface
          getAllUsers: [UserInterface]
     }
     input UserInterfaceForJoinUsersInput {
          userId: ID
          userName: String
          userEmail: String
          userPassword: String
          userDateRegistred: String
          userTelegramInfo: String
          userInstagramInfo: String
          userIsOnline: Boolean
          userFriends: [String]
          userImage: String
          userGroups: Int
          userDescription: String
          userRole: String
     }
     input UserInterfaceInput {
          userId: ID
          userName: String
          userEmail: String
          userPassword: String
          userDateRegistred: String
          userTelegramInfo: String
          userInstagramInfo: String
          userIsOnline: Boolean
          userChats: [JSON]
          userFriends: [String]
          userImage: String
          userContacts: [UserInterfaceForJoinUsersInput]
          userGroups: Int
          userDescription: String
          userThemeColorShceme: [JSON]
          userIsDarkTheme: Boolean
          userLanguage: String
     }
`;

export default typeDefs;
