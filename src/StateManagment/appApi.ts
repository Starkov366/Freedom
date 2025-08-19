import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Chats, UserInterface, UserInterfaceForJoinUsers } from "./appSlice";
import { ChatInfo } from "./appSlice";
import { typeBoxMessageItem } from "@/components/chatBoxMessageItem";
export const appApi = createApi({
     reducerPath: "app",
     baseQuery: fetchBaseQuery({
          baseUrl: "https://telegrambotfishcombat-default-rtdb.firebaseio.com/"
     }),
     endpoints: (builder) => ({
          updateUserInfoImg: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userImage.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          updateUserInfoID: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userId.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          updateUserInfoEmail: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userEmail.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          updateUserInfoTelegram: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userTelegramInfo.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          updateUserInfoInstagram: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userInstagramInfo.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          updateUserInfoDescription: builder.mutation({
               query: (payload: { key: string; value: string }) => ({
                    url: `freedomUsers/${payload.key}/userDescription.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.value)
               })
          }),
          changeTheme: builder.mutation({
               query: (payload: { key: string; isDark: boolean }) => ({
                    url: `freedomUsers/${payload.key}/userIsDarkTheme.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.isDark)
               })
          }),
          changeLanguage: builder.mutation({
               query: (payload: { key: string; english: string }) => ({
                    url: `freedomUsers/${payload.key}/userLanguage.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.english)
               })
          }),
          addNewGroupOrChannelChat: builder.mutation({
               query: (payload: Chats) => ({
                    url: `freedomChats.json`,
                    method: "POST",
                    body: JSON.stringify(payload)
               })
          }),
          addNewChatToPeopleById: builder.mutation({
               query: (payload: { chat: Chats; userId: string }) => ({
                    url: `freedomUsers/${payload.userId}/userChats.json`,
                    method: "POST",
                    body: JSON.stringify(payload.chat)
               })
          }),
          addContactToChat: builder.mutation({
               query: (payload: { chatId: string; contact: UserInterfaceForJoinUsers }) => ({
                    url: `freedomChats/${payload.chatId}/joinUsers.json`,
                    method: "POST",
                    body: JSON.stringify(payload.contact)
               })
          }),
          deleteUserFromChat: builder.mutation({
               query: (payload: { chatId: string; contactId: string }) => ({
                    url: `freedomChats/${payload.chatId}/joinUsers/${payload.contactId}.json`,
                    method: "DELETE"
               })
          }),
          updateChatInfo: builder.mutation({
               query: (payload: { chatId: string; newInfo: ChatInfo }) => ({
                    url: `freedomChats/${payload.chatId}/info.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.newInfo)
               })
          }),
          deleteChatFromUser: builder.mutation({
               query: (payload: { userId: string; chatId: string }) => ({
                    url: `freedomUsers/${payload.userId}/userChats/${payload.chatId}.json`,
                    method: "DELETE"
               })
          }),
          sendMessageToSaved: builder.mutation({
               query: (payload: { userId: string; newMesssage: typeBoxMessageItem }) => ({
                    url: `freedomUsers/${payload.userId}/userChats/0/messages.json`,
                    method: "POST",
                    body: JSON.stringify(payload.newMesssage)
               })
          }),
          getTargetChat: builder.query<Chats[], void>({
               query: () => ({
                    url: `freedomChats.json`,
                    method: "GET"
               })
          }),
          sendChatToSaved: builder.mutation({
               query: (payload: { userId: string; newMesssages: typeBoxMessageItem[] }) => ({
                    url: `freedomUsers/${payload.userId}/userChats/0/messages.json`,
                    method: "PUT",
                    body: JSON.stringify(payload.newMesssages)
               })
          })
     }),
     keepUnusedDataFor: 60,
     refetchOnMountOrArgChange: false
});
export const {
     useUpdateUserInfoImgMutation,
     useUpdateUserInfoIDMutation,
     useUpdateUserInfoEmailMutation,
     useUpdateUserInfoTelegramMutation,
     useUpdateUserInfoInstagramMutation,
     useUpdateUserInfoDescriptionMutation,
     useChangeThemeMutation,
     useChangeLanguageMutation,
     useAddNewGroupOrChannelChatMutation,
     useAddNewChatToPeopleByIdMutation,
     useAddContactToChatMutation,
     useDeleteUserFromChatMutation,
     useUpdateChatInfoMutation,
     useDeleteChatFromUserMutation,
     useSendMessageToSavedMutation,
     useGetTargetChatQuery,
     useSendChatToSavedMutation
} = appApi;
