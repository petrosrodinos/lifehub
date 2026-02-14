import { useState } from "react";
import { Settings } from "lucide-react";
import { WeeklySlotBoard } from "./components/WeeklySlotBoard";
import { SchedulePieCharts } from "./components/SchedulePieCharts";
import { ActivitiesMenu } from "./components/ActivitiesMenu";

export function RoutinePage() {
  const [activeView, setActiveView] = useState<"schedule" | "charts">("schedule");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-700/50 sticky top-[73px] z-30 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <nav className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveView("schedule")}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                  activeView === "schedule"
                    ? "text-amber-400 bg-slate-800/80 border-b-2 border-amber-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                Schedule
              </button>
              <button
                type="button"
                onClick={() => setActiveView("charts")}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                  activeView === "charts"
                    ? "text-amber-400 bg-slate-800/80 border-b-2 border-amber-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                Charts
              </button>
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800/40 transition-colors"
              title="Manage activities"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <ActivitiesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {activeView === "schedule" && <WeeklySlotBoard />}
        {activeView === "charts" && <SchedulePieCharts />}
      </main>
    </div>
  );
}
