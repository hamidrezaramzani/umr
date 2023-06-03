import { RouteObject } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
];

export default publicRoutes;
