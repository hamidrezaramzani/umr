import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import StudentFormPage from "../pages/Admin/StudentFormPage/StudentFormPage";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageStudentsPage from "../pages/Admin/ManageStudents/ManageStudentsPage";
import MealFormPage from "../pages/Admin/MealFormPage/MealFormPage";
import ManageMealsPage from "../pages/Admin/ManageMeals/ManageMealsPage";
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
            <StudentFormPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "edit-student/:userId?",
        element: (
          <ProtectedRoute type="admin">
            <StudentFormPage />
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
      {
        path: "add-meal",
        element: (
          <ProtectedRoute type="admin">
            <MealFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-meals",
        element: (
          <ProtectedRoute type="admin">
            <ManageMealsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default protectedRoutes;
