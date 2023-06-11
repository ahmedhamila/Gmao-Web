import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./features/UserApiSlice";
import userReducer from "./features/UserSlice";
export const store = configureStore({
  reducer: { user: userReducer, [userApi.reducerPath]: userApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
  devTools: true,
});
