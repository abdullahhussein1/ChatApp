import { createApi } from "@reduxjs/toolkit/query/react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
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
  where,
  onSnapshot,
  deleteDoc,
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
  tagTypes: ["chat", "auth"],
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
      invalidatesTags: ["auth"],
    }),
    signOut: builder.mutation({
      async queryFn() {
        try {
          await signOut(auth);
          return { data: "User signed out" };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["auth"],
    }),
    getUsers: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        try {
          const usersRef = collection(db, "users");

          const unsubscribe = onSnapshot(
            usersRef,
            (snapshot) => {
              const users = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return convertTimestamps({
                  id: doc.id,
                  ...userData,
                });
              });

              updateCachedData((draft) => {
                draft.length = 0;
                draft.push(...users);
              });
            },
            (error) => {
              console.error("Error in Firestore snapshot:", error);
            }
          );

          await cacheEntryRemoved;

          unsubscribe();
        } catch (error) {
          console.error("Query function error:", error);
          return { error: error.message };
        }
      },
    }),
    getCurrentUser: builder.query({
      async queryFn() {
        try {
          return await new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                const usr = {
                  id: user.uid,
                  username: user.displayName,
                  email: user.email,
                  photoUrl: user.photoURL,
                };
                resolve({ data: usr });
              } else {
                resolve({ data: null });
              }
            });
          });
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["auth"],
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
    getChatByParticipantsId: builder.query({
      async queryFn({ userId, contactId }) {
        try {
          const q = query(
            collection(db, "chats"),
            where("participants", "array-contains", userId)
          );
          const querySnapshot = await getDocs(q);

          const chat = querySnapshot.docs.find((doc) => {
            const chatData = doc.data();
            const participants = chatData.participants;

            return (
              participants.length === 2 &&
              participants.includes(userId) &&
              participants.includes(contactId)
            );
          });

          if (chat) {
            return { data: { id: chat.id, ...chat.data() } };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Fetch messages for a specific chat
    getMessagesByChatId: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(chatId, { updateCachedData, cacheEntryRemoved }) {
        try {
          const messagesRef = collection(db, `chats/${chatId}/messages`);
          const messagesQuery = query(messagesRef, orderBy("sendedAt", "asc"));

          const unsubscribe = onSnapshot(
            messagesQuery,
            (snapshot) => {
              const messages = snapshot.docs.map((doc) => {
                const messageData = doc.data();
                return convertTimestamps({
                  id: doc.id,
                  ...messageData,
                });
              });

              updateCachedData((draft) => {
                draft.length = 0; // Clear the existing messages
                draft.push(...messages); // Add new real-time messages
              });
            },
            (error) => {
              console.error("Error in Firestore snapshot:", error);
            }
          );

          // Wait for the cache entry to be removed
          await cacheEntryRemoved;
          // Clean up the real-time listener
          unsubscribe();
        } catch (error) {
          console.error("Query function error:", error);
          return { error: error.message };
        }
      },
    }),
    // Send a message to a specific chat
    sendMessage: builder.mutation({
      async queryFn({ chatId, userId, message }) {
        try {
          if (!userId || !message) {
            throw new Error("User ID or message content is missing");
          }
          const messagesRef = collection(db, `chats/${chatId}/messages`);
          const newMessage = {
            content: message,
            senderId: userId,
            sendedAt: new Date().toISOString(),
          };
          await addDoc(messagesRef, newMessage);
          return { data: "Message sent" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    // Create a new chat
    createChat: builder.mutation({
      async queryFn(participants) {
        try {
          const chatsRef = collection(db, "chats");

          const q = query(
            chatsRef,
            where("participants", "array-contains-any", participants)
          );
          const querySnapshot = await getDocs(q);

          const existingChat = querySnapshot.docs.find((doc) => {
            const chatData = doc.data();
            return (
              chatData.participants.length === participants.length &&
              participants.every((p) => chatData.participants.includes(p))
            );
          });

          if (existingChat) {
            return { data: { chatId: existingChat.id } };
          } else {
            const newChat = await addDoc(chatsRef, {
              participants,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            return { data: { chatId: newChat.id } };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getContactsByUserId: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(userId, { updateCachedData, cacheEntryRemoved }) {
        try {
          const contactsRef = collection(db, `users/${userId}/contacts`);

          const unsubscribe = onSnapshot(
            contactsRef,
            (snapshot) => {
              const contacts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              updateCachedData((draft) => {
                draft.length = 0;
                draft.push(...contacts);
              });
            },
            (error) => {
              console.error("Error in Firestore snapshot:", error);
            }
          );

          await cacheEntryRemoved;

          unsubscribe();
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getPendingContactsByUserId: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(userId, { updateCachedData, cacheEntryRemoved }) {
        try {
          const contactsRef = collection(
            db,
            `users/${userId}/pendingConnections`
          );

          const unsubscribe = onSnapshot(
            contactsRef,
            (snapshot) => {
              const contacts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              updateCachedData((draft) => {
                draft.length = 0;
                draft.push(...contacts);
              });
            },
            (error) => {
              console.error("Error in Firestore snapshot:", error);
            }
          );

          await cacheEntryRemoved;

          unsubscribe();
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getRequestedContactsByUserId: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(userId, { updateCachedData, cacheEntryRemoved }) {
        try {
          const contactsRef = collection(
            db,
            `users/${userId}/requestedConnections`
          );

          const unsubscribe = onSnapshot(
            contactsRef,
            (snapshot) => {
              const contacts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              updateCachedData((draft) => {
                draft.length = 0;
                draft.push(...contacts);
              });
            },
            (error) => {
              console.error("Error in Firestore snapshot:", error);
            }
          );

          await cacheEntryRemoved;

          unsubscribe();
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    requestConnection: builder.mutation({
      async queryFn({ user, contact }) {
        try {
          const requestedConnectionRef = collection(
            db,
            `users/${contact.id}/requestedConnections`
          );
          const pendingConnectionRef = collection(
            db,
            `users/${user.id}/pendingConnections`
          );
          await addDoc(requestedConnectionRef, user);
          await addDoc(pendingConnectionRef, contact);
          return { data: "Contact Connection Requested" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    acceptConnection: builder.mutation({
      async queryFn({ user, contact }) {
        try {
          const userConnectionsRef = collection(
            db,
            `users/${user.id}/contacts`
          );
          const contactConnectionsRef = collection(
            db,
            `users/${contact.id}/contacts`
          );
          const requestedConnectionRef = collection(
            db,
            `users/${user.id}/requestedConnections`
          );
          const pendingConnectionRef = collection(
            db,
            `users/${contact.id}/pendingConnections`
          );

          const requestedDocs = await getDocs(requestedConnectionRef);
          const pendingDocs = await getDocs(pendingConnectionRef);

          const requestedDocToDelete = requestedDocs.docs.find(
            (doc) => doc.data().id === contact.id
          );
          const pendingDocToDelete = pendingDocs.docs.find(
            (doc) => doc.data().id === user.id
          );

          if (requestedDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${user.id}/requestedConnections`,
                requestedDocToDelete.id
              )
            );
          }
          if (pendingDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${contact.id}/pendingConnections`,
                pendingDocToDelete.id
              )
            );
          }

          await addDoc(userConnectionsRef, contact);
          await addDoc(contactConnectionsRef, user);

          return { data: "Contact Connection Accepted" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    rejectConnection: builder.mutation({
      async queryFn({ user, contact }) {
        try {
          const requestedConnectionRef = collection(
            db,
            `users/${user.id}/requestedConnections`
          );
          const pendingConnectionRef = collection(
            db,
            `users/${contact.id}/pendingConnections`
          );

          const requestedDocs = await getDocs(requestedConnectionRef);
          const pendingDocs = await getDocs(pendingConnectionRef);

          const requestedDocToDelete = requestedDocs.docs.find(
            (doc) => doc.data().id === contact.id
          );
          const pendingDocToDelete = pendingDocs.docs.find(
            (doc) => doc.data().id === user.id
          );

          if (requestedDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${user.id}/requestedConnections`,
                requestedDocToDelete.id
              )
            );
          }
          if (pendingDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${contact.id}/pendingConnections`,
                pendingDocToDelete.id
              )
            );
          }

          return { data: "Contact Connection Rejected" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    undoConnection: builder.mutation({
      async queryFn({ user, contact }) {
        try {
          const requestedConnectionRef = collection(
            db,
            `users/${contact.id}/requestedConnections`
          );
          const pendingConnectionRef = collection(
            db,
            `users/${user.id}/pendingConnections`
          );

          const requestedDocs = await getDocs(requestedConnectionRef);
          const pendingDocs = await getDocs(pendingConnectionRef);

          const requestedDocToDelete = requestedDocs.docs.find(
            (doc) => doc.data().id === user.id
          );
          const pendingDocToDelete = pendingDocs.docs.find(
            (doc) => doc.data().id === contact.id
          );

          if (requestedDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${contact.id}/requestedConnections`,
                requestedDocToDelete.id
              )
            );
          }
          if (pendingDocToDelete) {
            await deleteDoc(
              doc(
                db,
                `users/${user.id}/pendingConnections`,
                pendingDocToDelete.id
              )
            );
          }

          return { data: "Contact Connection Undoed" };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useGetChatByParticipantsIdQuery,
  useGetMessagesByChatIdQuery,
  useGetContactsByUserIdQuery,
  useGetPendingContactsByUserIdQuery,
  useGetRequestedContactsByUserIdQuery,
  useSignInMutation,
  useSignOutMutation,
  useAcceptConnectionMutation,
  useRejectConnectionMutation,
  useUndoConnectionMutation,
  useRequestConnectionMutation,
  useSendMessageMutation,
  useCreateChatMutation,
} = apiSlice;

export default apiSlice;
