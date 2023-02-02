import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/users";
import User from "./pages/user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/edit",
    element: <User />,
  },
]);
