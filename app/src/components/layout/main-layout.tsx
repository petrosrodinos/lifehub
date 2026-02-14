import { Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { BottomNavigation } from "./bottom-navigation";
import { useAuthStore } from "../../store/auth-store";

export function MainLayout() {
  const { full_name, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">LifeHub</h1>
            <p className="text-xs text-gray-500">{full_name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
