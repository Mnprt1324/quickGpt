import { ChatBox } from "../components/ChatBox";
import { AppLayout } from "../components/Layout/appLayout";
import { Message } from "../components/Message";
import Community from "../pages/Community";
import Credits from "../pages/Credits";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { LoadingPage } from "../pages/LoadingPage";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ChatBox />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/credits",
        element: <Credits />,
      },
      {
        path: "/message/:chatId",
        element: <Message />,
      },
      {
        path: "/chat/:chatId",
        element: <ChatBox />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/loading",
    element: <LoadingPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;
