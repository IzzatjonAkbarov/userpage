import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login";
import MainLayout from "../Components/MainLayout";
import Register from "../Components/Register";
import User from "../Components/User";

export const rooter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/",

        Component: Login,
      },
      {
        path: "/register",
        Component: Register,

        title: "Register",
      },
      {
        path: "/user",
        Component: User,

        title: "User",
      },
    ],
  },
]);
