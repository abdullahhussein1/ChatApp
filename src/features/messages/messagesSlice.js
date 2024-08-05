import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    chatId: 1,
    senderId: 1,
    content: "Assalamu alaikum",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 1,
    chatId: 1,
    senderId: 1,
    content: "Assalamu alaikum",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 1,
    chatId: 1,
    senderId: 1,
    content: "Assalamu alaikum",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 2,
    chatId: 1,
    senderId: 2,
    content: "Wa alaikum assalam",
    timestamp: new Date().toTimeString(),
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "kuy bram",
    timestamp: new Date().toTimeString(),
  },
];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageSended: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(chatId, senderId, content) {
        return {
          payload: {
            id: nanoid(),
            chatId,
            senderId,
            content,
            timestamp: new Date().toTimeString(),
          },
        };
      },
    },
  },
});

export const { messageSended } = messagesSlice.actions;

export default messagesSlice.reducer;
