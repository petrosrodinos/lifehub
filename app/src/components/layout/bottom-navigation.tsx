import { Link, useLocation } from "react-router-dom";
import { Calendar, DollarSign, CheckCircle } from "lucide-react";

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
      id: "habits",
      label: "Habits",
      path: "/dashboard/habits",
      icon: CheckCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className={`transition-transform ${isActive ? "scale-110" : ""}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
