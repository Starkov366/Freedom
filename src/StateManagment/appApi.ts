import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Chats, UserInterface } from "./appSlice";
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
          })
     })
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
     useAddNewChatToPeopleByIdMutation
} = appApi;
