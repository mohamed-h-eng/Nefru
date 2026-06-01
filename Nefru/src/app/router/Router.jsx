import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../../shared/AuthLayout/AuthLayout";
import NotFound from "../../shared/NotFound/NotFound";
import Login from "../../modules/Auth/components/Login/Login";
import Register from "../../modules/Auth/components/Register/Register";
import ResetPassword from "../../modules/Auth/components/ResetPassword/ResetPassword";
import ChangePassword from "../../modules/Auth/components/ChangePassword/ChangePassword";
import Forgetpassword from "../../modules/Auth/components/Forgetpassword/Forgetpassword";
import ApplicationReceived from "../../modules/auth/components/ApplicationReceived/ApplicationReceived";
import MasterLayout from "../../shared/MasterLayout/MasterLayout";
// import Home from "../../modules/HomeModels/Home";
import Home from "../../modules/home/pages/Home";
import Welcome from "../../shared/Welcome/Welcome";



export default function Router() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Welcome /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "forget-password", element: <Forgetpassword /> },
        { path: "application-received", element: <ApplicationReceived /> },
        { path: "home", element: <Home /> },
      ],
    },
    {
      path: "/home",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}
