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
      <ActivitiesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2">
            <button type="button" onClick={() => setActiveView("schedule")} className={`px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${activeView === "schedule" ? "text-slate-100 bg-amber-500/90 shadow-lg shadow-amber-500/20" : "text-slate-400 hover:text-slate-200"}`}>
              Schedule
            </button>
            <button type="button" onClick={() => setActiveView("charts")} className={`px-6 py-2.5 text-sm font-medium transition-all rounded-lg ${activeView === "charts" ? "text-slate-100 bg-amber-500/90 shadow-lg shadow-amber-500/20" : "text-slate-400 hover:text-slate-200"}`}>
              Charts
            </button>
          </div>
          <button type="button" onClick={() => setMenuOpen(true)} className="p-2.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors" title="Manage activities">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <main>
          {activeView === "schedule" && <WeeklySlotBoard />}
          {activeView === "charts" && <SchedulePieCharts />}
        </main>
      </div>
    </div>
  );
}
