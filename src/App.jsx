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
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: !user ? <Auth /> : <Navigate to="/" />,
    },
    {
      path: "/contacts/:contactId",
      element: <SingleChatPage />,
      loader: singleChatPageLoader,
    },
  ]);

  return <RouterProvider router={router} />;
}
