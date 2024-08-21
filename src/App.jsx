import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/homepage.jsx";
import SingleChatPage, {
  loader as singleChatPageLoader,
} from "./features/chats/SingleChatPage.jsx";
import Auth from "./routes/authpage.jsx";
import Index from "./routes/index.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import { useGetCurrentUserQuery } from "./features/api/apiSlice.js";

export default function App() {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/auth" replace />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/contacts/:contactId",
          element: user ? <SingleChatPage /> : <Navigate to="/auth" replace />,
          loader: singleChatPageLoader,
        },
      ],
    },
    {
      path: "/auth",
      element: !user ? <Auth /> : <Navigate to="/" replace />,
    },
  ]);

  if (isLoading) return <SplashScreen />;

  return <RouterProvider router={router} />;
}
