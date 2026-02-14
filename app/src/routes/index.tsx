import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route
        path="/auth"
        element={
          <ProtectedRoute loggedIn={false}>
            <div>Auth routes</div>
          </ProtectedRoute>
        }
      >
        {/* <Route path="sign-up" element={<SignUp />} /> */}
        {/* <Route path="sign-in" element={<SignIn />} /> */}
        <Route index element={<Navigate to="/auth/sign-in" replace />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
