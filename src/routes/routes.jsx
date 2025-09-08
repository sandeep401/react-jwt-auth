import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import SignupForm from "../components/SignupFrom";
import LoginForm from "../components/LoginForm";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
