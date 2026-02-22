import { Link, useLocation } from "react-router-dom";
import { Calendar, DollarSign, CheckCircle, Dumbbell, Store } from "lucide-react";

export function BottomNavigation() {
  const location = useLocation();

  const tabs = [
    {
      id: "routine",
      label: "Routine",
      path: "/dashboard/routine",
      icon: Calendar,
    },
    {
      id: "expenses",
      label: "Expenses",
      path: "/dashboard/expenses",
      icon: DollarSign,
    },
    {
      id: "stores",
      label: "Stores",
      path: "/dashboard/stores",
      icon: Store,
    },
    {
      id: "habits",
      label: "Habits",
      path: "/dashboard/habits",
      icon: CheckCircle,
    },
    {
      id: "gym",
      label: "Gym",
      path: "/dashboard/gym",
      icon: Dumbbell,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-700/50 shadow-2xl z-40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");
            const Icon = tab.icon;
            return (
              <Link key={tab.id} to={tab.path} className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${isActive ? "text-violet-400" : "text-slate-400 hover:text-slate-200"}`}>
                <div className={`transition-all duration-200 ${isActive ? "scale-110" : ""}`}>
                  <Icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" : ""}`} />
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? "text-violet-400" : "text-slate-500"}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
