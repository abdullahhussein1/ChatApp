import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
});

export default store;
