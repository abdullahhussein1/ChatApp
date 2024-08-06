import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signedIn: {
      reducer(state, action) {
        return action.payload;
      },
      prepare(user) {
        return {
          payload: {
            id: user.uid,
            username: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          },
        };
      },
    },
    signedOut() {
      return null;
    },
  },
});

export const { signedIn, signedOut } = userSlice.actions;

export default userSlice.reducer;
