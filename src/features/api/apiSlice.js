import { createApi } from "@reduxjs/toolkit/query/react";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

const convertTimestamps = (data) => {
  if (data.createdAt && data.createdAt.toDate) {
    data.createdAt = data.createdAt.toDate().toISOString();
  }
  if (data.lastLogin && data.lastLogin.toDate) {
    data.lastLogin = data.lastLogin.toDate().toISOString();
  }
  return data;
};

const apiSlice = createApi({
  baseQuery: () => {},
  endpoints: (builder) => ({
    signIn: builder.mutation({
      async queryFn() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          const userRef = doc(db, "users", user.uid);
          const data = {
            id: user.uid,
            username: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          await setDoc(userRef, data, { merge: true });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getUsers: builder.query({
      async queryFn() {
        try {
          const usersRef = collection(db, "users");
          const querySnapshot = await getDocs(usersRef);
          const users = querySnapshot.docs.map((doc) => {
            const userData = doc.data();
            return convertTimestamps({
              id: doc.id,
              ...userData,
            });
          });
          return { data: users };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getUserById: builder.query({
      async queryFn(userId) {
        try {
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return { data: convertTimestamps({ id: userDoc.id, ...userData }) };
          } else {
            return { data: "User not found!" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Fetch all chats
    getChats: builder.query({
      async queryFn() {
        try {
          const chatRef = collection(db, "chats");
          const querySnapshot = await getDocs(chatRef);
          const chats = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: chats };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Fetch messages for a specific chat
    getMessagesByChatId: builder.query({
      async queryFn(chatId) {
        try {
          const messagesRef = collection(db, `chats/${chatId}/messages`);
          const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
          const querySnapshot = await getDocs(messagesQuery);
          const messages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: messages };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Send a message to a specific chat
    sendMessage: builder.mutation({
      async queryFn({ chatId, message }) {
        try {
          const messagesRef = collection(db, `chats/${chatId}/messages`);
          await addDoc(messagesRef, message);
          return { data: "Message sent" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Create a new chat
    createChat: builder.mutation({
      async queryFn({ participants }) {
        try {
          const chatsRef = collection(db, "chats");
          const newChat = await addDoc(chatsRef, {
            participants,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          return { data: { chatId: newChat.id } };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getContactsByUserId: builder.query({
      providesTags: ["chat"],
      async queryFn(userId) {
        try {
          const contactsRef = collection(db, `users/${userId}/contacts`);
          const querySnapshot = await getDocs(contactsRef);
          const contacts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: contacts };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    addContact: builder.mutation({
      invalidatesTags: ["chat"],
      async queryFn({ userId, contact }) {
        try {
          const contactsRef = collection(db, `users/${userId}/contacts`);
          await addDoc(contactsRef, contact);
          return { data: "Contact added" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetChatsQuery,
  useGetMessagesByChatIdQuery,
  useGetContactsByUserIdQuery,
  useSignInMutation,
  useAddContactMutation,
  useSendMessageMutation,
  useCreateChatMutation,
} = apiSlice;

export default apiSlice;
