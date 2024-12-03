import { createBrowserRouter } from "react-router-dom";
import NotFound from "../NotFound404/NotFound";
import Home from "../Pages/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import PrivateRouter from "../auth/PrivateRouter";
import AlreadyLoggedIn from "../auth/AlreadyLoggedIn";
import AllMembers from "../component/AllMembers";
import Profile from "../component/Profile";

const mRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Home />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <AllMembers />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AlreadyLoggedIn>
        <Login />
      </AlreadyLoggedIn>
    ),
  },
  {
    path: "/signup",
    element: (
      <AlreadyLoggedIn>
        <Signup />
      </AlreadyLoggedIn>
    ),
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default mRouter;
