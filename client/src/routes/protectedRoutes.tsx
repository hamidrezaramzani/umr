import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import StudentFormPage from "../pages/Admin/StudentFormPage/StudentFormPage";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageStudentsPage from "../pages/Admin/ManageStudents/ManageStudentsPage";
import MealFormPage from "../pages/Admin/MealFormPage/MealFormPage";
import ManageMealsPage from "../pages/Admin/ManageMeals/ManageMealsPage";
import MealTimeFormPage from "../pages/Admin/MealTimeFormPage/MealTimeFormPage";
import ManageMealTimes from "../pages/Admin/ManageMealTimes/ManageMealTimesForm";
import Logout from "../components/Logout/Logout";
import PanelPage from "../pages/Panel/PanelPage";
const protectedRoutes: RouteObject[] = [
  {
    path: "/panel",
    element: (
      <ProtectedRoute type="student">
        <PanelPage />
      </ProtectedRoute>
    ),
  },
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
      {
        path: "edit-meal/:mealId?",
        element: (
          <ProtectedRoute type="admin">
            <MealFormPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "add-mealTime",
        element: (
          <ProtectedRoute type="admin">
            <MealTimeFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-mealTimes",
        element: (
          <ProtectedRoute type="admin">
            <ManageMealTimes />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-mealTime/:mealTimeId?",
        element: (
          <ProtectedRoute type="admin">
            <MealTimeFormPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

export default protectedRoutes;
