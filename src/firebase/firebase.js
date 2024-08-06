import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6ygxGbbz4itiT8Emr0vZ8H6Ice1Sp-TA",
  authDomain: "chatapp-c8b0f.firebaseapp.com",
  projectId: "chatapp-c8b0f",
  storageBucket: "chatapp-c8b0f.appspot.com",
  messagingSenderId: "54443343528",
  appId: "1:54443343528:web:f06fc6568b568ebbb14c9d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { app, db, auth, provider };
