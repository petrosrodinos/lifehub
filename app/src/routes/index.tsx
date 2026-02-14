import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { SignIn } from "../features/auth/pages/sign-in";
import { SignUp } from "../features/auth/pages/sign-up";
import { Dashboard } from "../pages/dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth/sign-in"
        element={
          <ProtectedRoute loggedIn={false}>
            <SignIn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/sign-up"
        element={
          <ProtectedRoute loggedIn={false}>
            <SignUp />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loggedIn={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
