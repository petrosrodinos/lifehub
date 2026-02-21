import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Calendar } from "lucide-react";
import { GymHeader } from "./components/GymHeader";
import { GymCategoriesMenu } from "./components/exercises/GymCategoriesMenu";
import { WorkoutsList } from "./components/workouts/WorkoutsList";
import { WorkoutsCalendar } from "./components/workouts/WorkoutsCalendar";
import { CreateWorkoutModal } from "./components/workouts/CreateWorkoutModal";
import { GymAnalytics } from "./components/analytics";
import { GYM_TABS, type GymTabId } from "./config/gym-tabs.config";
import { WORKOUT_VIEWS, type WorkoutViewId } from "./config/workout-views.config";

export const GymPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [createWorkoutModalOpen, setCreateWorkoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<GymTabId>("workouts");
  const [workoutView, setWorkoutView] = useState<WorkoutViewId>(WORKOUT_VIEWS.LIST);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const handleFilterChange = (filters: { fromDate?: string; toDate?: string }) => {
    setFromDate(filters.fromDate);
    setToDate(filters.toDate);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <GymCategoriesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CreateWorkoutModal
        isOpen={createWorkoutModalOpen}
        onClose={() => setCreateWorkoutModalOpen(false)}
        onCreate={(workout) => navigate(`/dashboard/gym/workout/${workout.uuid}`)}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <GymHeader
          onOpenMenu={() => setMenuOpen(true)}
          onCreateWorkout={() => setCreateWorkoutModalOpen(true)}
        />

        <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-1 md:w-auto md:inline-flex">
          {GYM_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-initial px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "workouts" && (
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Workouts</h2>
              <div className="flex gap-1 bg-slate-900/60 rounded-lg border border-slate-800/80 p-1 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setWorkoutView(WORKOUT_VIEWS.LIST)}
                  className={`flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded transition-all flex-1 sm:flex-initial ${
                    workoutView === WORKOUT_VIEWS.LIST
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden xs:inline">List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWorkoutView(WORKOUT_VIEWS.CALENDAR)}
                  className={`flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded transition-all flex-1 sm:flex-initial ${
                    workoutView === WORKOUT_VIEWS.CALENDAR
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden xs:inline">Calendar</span>
                </button>
              </div>
            </div>
            {workoutView === WORKOUT_VIEWS.LIST ? (
              <WorkoutsList
                fromDate={fromDate}
                toDate={toDate}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <WorkoutsCalendar />
            )}
          </section>
        )}

        {activeTab === "analytics" && <GymAnalytics />}
      </div>
    </div>
  );
};
