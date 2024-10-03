import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./slices/ModalSlice";
import AuthSlice from "./slices/AuthSlice";
import GroupSlice from "./slices/GroupSlice";
import { api } from "@/redux/api";

export const store = configureStore({
  reducer: {
    ModalSlice,
    AuthSlice,
    GroupSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
