import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/homepage.jsx";
import SingleChatPage, {
  loader as singleChatPageLoader,
} from "./features/chats/SingleChatPage.jsx";
import Auth from "./routes/authpage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase/firebase.js";
import { useEffect } from "react";
import { signedIn, signedOut } from "./features/user/userSlice.js";
import { onAuthStateChanged } from "firebase/auth";
import Index from "./routes/index.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

export default function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(signedIn(currentUser));
      } else {
        dispatch(signedOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/auth" />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/contacts/:contactId",
          element: user ? <SingleChatPage /> : <Navigate to="/auth" />,
          loader: singleChatPageLoader,
        },
      ],
    },
    {
      path: "/auth",
      element: !user ? <Auth /> : <Navigate to="/" />,
    },
    {
      path: "/contacts/:contactId",
      element: user ? <SingleChatPage /> : <Navigate to="/auth" />,
      loader: singleChatPageLoader,
    },
  ]);

  if (!user) return <SplashScreen />;

  return <RouterProvider router={router} />;
}
