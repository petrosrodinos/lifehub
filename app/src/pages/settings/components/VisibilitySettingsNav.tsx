import { useNavigate } from "react-router-dom";
import { ChevronRight, Wallet, Activity } from "lucide-react";
import { Routes } from "../../../routes/routes";

const ITEMS = [
  { key: "expenses" as const, label: "Expenses", icon: Wallet, path: Routes.settings.expenses },
  { key: "activities" as const, label: "Activities", icon: Activity, path: Routes.settings.activities },
] as const;

export function VisibilitySettingsNav() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <ul className="divide-y divide-slate-700/50">
        {ITEMS.map(({ label, icon: Icon, path }) => (
          <li key={path}>
            <button
              type="button"
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-700/50">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <span className="font-medium text-white">{label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </button>
          </li>
        ))}
      </ul>
      <p className="px-6 py-3 text-xs text-slate-500 border-t border-slate-700/50">
        Choose which categories, subcategories, or activities are hidden from main views
      </p>
    </div>
  );
}
