import { configureStore } from "@reduxjs/toolkit";
import User from "./appSlice";
import { appApi } from "./appApi";
import { get } from "http";
export const store = configureStore({
     reducer: {
          User,
          [appApi.reducerPath]: appApi.reducer
     },
     middleware: (getDefaultMiddle) => {
          return getDefaultMiddle().concat(appApi.middleware);
     }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
