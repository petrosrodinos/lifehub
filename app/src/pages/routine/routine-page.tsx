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
      <div className="bg-white border-b sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveView("schedule")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeView === "schedule"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Schedule
              </button>
              <button
                type="button"
                onClick={() => setActiveView("charts")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeView === "charts"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Charts
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Manage activities"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <ActivitiesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4">
        {activeView === "schedule" && <WeeklySlotBoard />}
        {activeView === "charts" && <SchedulePieCharts />}
      </div>
    </div>
  );
}
