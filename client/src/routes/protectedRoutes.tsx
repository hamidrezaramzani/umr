import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddStudentPage from "../pages/Admin/AddStudent/AddStudentPage";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageStudentsPage from "../pages/Admin/ManageStudents/ManageStudentsPage";
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

      {
        path: "manage-student",
        element: (
          <ProtectedRoute type="admin">
            <ManageStudentsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default protectedRoutes;
