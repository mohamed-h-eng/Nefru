import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/AuthLayout/AuthLayout";
import MasterLayout from "../shared/MasterLayout/MasterLayout";
import NotFound from "../shared/NotFound/NotFound";
// Auth Pages
import Welcome from "../pages/Auth/Welcome/Welcome";
import Login from "../pages/Auth/components/Login/Login";
import Register from "../pages/Auth/components/Register/Register";
import Forgetpassword from "../pages/Auth/components/Forgetpassword/Forgetpassword";
import ResetPassword from "../pages/Auth/components/ResetPassword/ResetPassword";
// User Pages
import Home from "../pages/User/Home/Home";
import Trips from "../pages/User/Trips/Trips";
import Info from "../pages/User/Trips/Info/Info";
import Book from "../pages/User/Trips/Book/Book";
import Status from "../pages/User/Trips/Book/components/Status/Status";
import Guide from "../pages/User/Trips/Guide/Guide";
import Saved from "../pages/User/Saved/Saved";
import Profile from "../pages/User/Profile/Profile";
import Settings from "../pages/User/Settings/Settings";
import ApplicationReceived from "../pages/Auth/components/ApplicationReceived/ApplicationReceived";

import Admin from '../pages/Admin/Admin'
// import Admin from '../pages/Admin/Admin'
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <NotFound />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "application-received", element: <ApplicationReceived /> },
      { path: "forget-password", element: <Forgetpassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "user",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "trips",
        children: [
          { index: true, element: <Trips /> },
          { path: "info", element: <Info /> },
          { path: "book", element: <Book /> },
          { path: "book/status", element: <Status /> },
          { path: "guide", element: <Guide /> },
        ],
      },
      { path: "saved", element: <Saved /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "admin",
    element:<Admin/>,
    // children:[
    //   {index:true, element:<Home/>}
    // ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
