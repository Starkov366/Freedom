import { configureStore } from "@reduxjs/toolkit";
import User from "./appSlice";
export const store = configureStore({
     reducer: {
          User
     }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
