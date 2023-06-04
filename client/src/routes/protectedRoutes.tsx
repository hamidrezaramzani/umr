import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddStudentPage from "../pages/Admin/AddStudent/AddStudentPage";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute type="admin">
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "add-student",
        element: (
          <ProtectedRoute type="admin">
            <AddStudentPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default protectedRoutes;
