import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice";
import messagesReducer from "../features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
  },
});

export default store;
