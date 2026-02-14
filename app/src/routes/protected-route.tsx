import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  loggedIn?: boolean;
  fallbackPath?: string;
}

export default function ProtectedRoute({ children, requiredRoles, loggedIn, fallbackPath = "/auth/sign-in" }: ProtectedRouteProps) {
  const { isLoggedIn, role } = useAuthStore((state) => state);

  if (loggedIn === true && !isLoggedIn) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (loggedIn === false && isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(role || "USER")) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
