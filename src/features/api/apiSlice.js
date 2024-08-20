import { createApi } from "@reduxjs/toolkit/query/react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";

const apiSlice = createApi({
  baseQuery: () => {},
  endpoints: (builder) => ({
    signIn: builder.mutation({
      queryFn: async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          const data = {
            id: user.uid,
            username: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          return { data };
        } catch (error) {
          return { error: error.message }; // Return the error message
        }
      },
    }),
  }),
});

export const { useSignInMutation } = apiSlice;

export default apiSlice;
