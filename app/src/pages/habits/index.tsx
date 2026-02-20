import { useState } from "react";
import { HabitsHeader } from "./components/HabitsHeader/HabitsHeader";
import { HabitsTodaySection } from "./components/HabitsTodaySection";
import { HabitsProgressSection } from "./components/HabitsProgress";
import { HabitsHistorySection } from "./components/HabitsHistory/HabitsHistorySection";
import { HabitsFilters } from "./components/Filters/habbits";
import type { ActivityHabbitsQuery } from "../../features/activities/interfaces/activities.interface";

const TABS = ["Today", "Overview"] as const;
type Tab = (typeof TABS)[number];

export function HabitsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Today");
  const [overviewFilter, setOverviewFilter] = useState<ActivityHabbitsQuery>({});

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.14),transparent_45%),radial-gradient(circle_at_85%_78%,rgba(16,185,129,0.12),transparent_45%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHZpZXdCb3g9JzAgMCA2MCA2MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J00zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMiAxMiA1LjM3My0xMiAxMiAxMiAxMiA1LjM3MyAxMiAxMnonIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjAyNSknLz48L2c+PC9zdmc+')] opacity-20 -z-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-5">
        <HabitsHeader />

        <div className="flex gap-1 p-1 rounded-xl bg-slate-900/60 border border-slate-700/50 w-fit">
          {TABS.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-slate-700/80 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Today" && <HabitsTodaySection />}
        {activeTab === "Overview" && (
          <>
            <HabitsFilters onFilterChange={setOverviewFilter} />
            <HabitsProgressSection filter={overviewFilter} />
            <HabitsHistorySection filter={overviewFilter} />
          </>
        )}
      </div>
    </div>
  );
}
