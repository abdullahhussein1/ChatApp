import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../features/chats/chatsSlice";
import messagesReducer from "../features/messages/messagesSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});

export default store;
