import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
const publicRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute type="admin">
            <h1>admin Route</h1>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default publicRoutes;
