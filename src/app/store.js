import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice";
import messagesReducer from "../features/messages/messagesSlice";
import userReducer from "../features/user/userSlice";
import apiSlice from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
