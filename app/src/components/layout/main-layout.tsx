import { Outlet } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { BottomNavigation } from "./bottom-navigation";
import { useAuthStore } from "../../store/auth-store";

export function MainLayout() {
  const { full_name, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-16">
      <header className="bg-slate-950/80 backdrop-blur-sm shadow-2xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">LH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">LifeHub</h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <User className="w-3 h-3" />
                <span>{full_name}</span>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-all duration-200 border border-slate-700/50 hover:border-amber-400/30"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
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
