import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Auth/LogoPage";
import HomePage from "../pages/Home/HomePage";
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/auth",
    children: [{ path: "login", element: <LoginPage /> }],
  },
];

export default publicRoutes;
