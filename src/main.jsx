import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/homepage.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import SingleChatPage, {
  loader as singleChatPageLoader,
} from "./features/chats/SingleChatPage.jsx";
import Auth from "./routes/authpage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/contacts/:contactId",
    element: <SingleChatPage />,
    loader: singleChatPageLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
