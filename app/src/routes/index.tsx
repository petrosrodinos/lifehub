import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { SignIn } from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";
import { MainLayout } from "../components/layout/main-layout";
import { RoutinePage } from "../pages/routine/index";
import { ExpensesPage } from "../pages/expenses";
import { ExpenseAccountsPage } from "../pages/expenses/accounts";
import { HabitsPage } from "../pages/habits/habits-page";
import { SettingsPage } from "../pages/settings/settings-page";

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
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard/routine" replace />} />
        <Route path="routine" element={<RoutinePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="expenses/accounts" element={<ExpenseAccountsPage />} />
        <Route path="habits" element={<HabitsPage />} />
        <Route path="settings/security" element={<SettingsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
