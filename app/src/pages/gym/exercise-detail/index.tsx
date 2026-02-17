import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { useWorkoutEntry } from "../../../features/workout-entries/hooks/use-workout-entries";
import { ExerciseDetailSkeleton } from "./ExerciseDetailSkeleton";
import { TrackTab } from "./TrackTab";
import { HistoryTab } from "./HistoryTab";
import { GymAnalytics } from "../components/analytics";

const TABS = [
  { id: "track", label: "Track" },
  { id: "history", label: "History" },
  { id: "graph", label: "Graph" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ExerciseDetailPage() {
  const { entryUuid } = useParams<{ entryUuid: string }>();
  const navigate = useNavigate();
  const { data: entry, isLoading } = useWorkoutEntry(entryUuid || "");
  const [activeTab, setActiveTab] = useState<TabId>("track");

  const exercise = entry?.exercise;
  const workoutUuid = entry?.workout_uuid;

  const handleBack = () => navigate(`/dashboard/gym/workout/${workoutUuid}`);

  if (isLoading) {
    return <ExerciseDetailSkeleton />;
  }

  if (!entry) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center py-12">
            <p className="text-slate-400">Workout entry not found</p>
            <button type="button" onClick={() => navigate("/dashboard/gym")} className="mt-4 text-violet-400 hover:text-violet-300">
              Back to Gym
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6">
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Workout</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{exercise?.name || "Unknown Exercise"}</h1>
            {exercise?.description && <p className="text-sm text-slate-400 mt-0.5">{exercise.description}</p>}
          </div>
        </div>

        <div className="flex gap-1 bg-slate-900/60 rounded-xl border border-slate-800/80 p-1">
          {TABS.map((tab) => (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "text-slate-400 hover:text-slate-200 border border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "track" && <TrackTab entry={entry} />}
        {activeTab === "history" && <HistoryTab exerciseUuid={entry.exercise_uuid} currentEntryUuid={entry.uuid} />}
        {activeTab === "graph" && <GymAnalytics exerciseUuid={entry.exercise_uuid} />}
      </div>
    </div>
  );
}
