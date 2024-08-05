import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    participants: [1, 2],
    timestamp: null,
  },
];

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatStarted: {
      reducer(state, action) {
        const isExists = state.find(
          (chat) =>
            chat.participants.includes(action.payload.participants[0]) &&
            chat.participants.includes(action.payload.participants[1])
        );

        if (isExists) return;

        state.push(action.payload);
      },
      prepare(user1Id, user2Id) {
        const generatedId = nanoid();
        return {
          payload: {
            id: generatedId,
            participants: [user1Id, user2Id],
            timestamp: new Date().toTimeString(),
          },
        };
      },
    },
  },
});

export const { chatStarted } = chatsSlice.actions;

export default chatsSlice.reducer;
