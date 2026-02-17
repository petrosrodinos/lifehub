import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Calendar, Clock, Dumbbell, ChevronRight, Check } from "lucide-react";
import { useWorkout, useUpdateWorkout } from "../../../features/workout/hooks/use-workout";
import { CreateWorkoutModal } from "../components/workouts/CreateWorkoutModal";
import { SetCard } from "./components/SetCard";
import { AddExerciseModal } from "./components/AddExerciseModal";
import { WorkoutDetailLoading } from "./components/WorkoutDetailLoading";
import { DateTime } from "luxon";

export function WorkoutDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data: workout, isLoading } = useWorkout(uuid || "");
  const updateWorkout = useUpdateWorkout();

  const [isEditWorkoutModalOpen, setIsEditWorkoutModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return DateTime.fromISO(dateString).toFormat("EEEE, MMMM d, yyyy");
  };

  const calculateDuration = () => {
    if (!workout?.started_at || !workout?.finished_at) return null;
    const start = DateTime.fromISO(workout.started_at);
    const end = DateTime.fromISO(workout.finished_at);
    return Math.round(end.diff(start, "minutes").minutes);
  };

  const duration = calculateDuration();

  const entries = workout?.entries || [];
  const totalSets = entries.reduce((sum, entry) => sum + (entry.sets?.length || 0), 0);

  const handleFinishWorkout = () => {
    if (!uuid) return;
    updateWorkout.mutate({
      uuid,
      data: {
        finished_at: new Date().toISOString(),
      },
    });
  };

  if (isLoading) {
    return <WorkoutDetailLoading />;
  }

  if (!workout) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center py-12">
            <p className="text-slate-400">Workout not found</p>
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
      <CreateWorkoutModal isOpen={isEditWorkoutModalOpen} onClose={() => setIsEditWorkoutModalOpen(false)} onDelete={() => navigate("/dashboard/gym")} workout={workout} mode="edit" />

      <AddExerciseModal isOpen={isAddExerciseModalOpen} onClose={() => setIsAddExerciseModalOpen(false)} workoutUuid={workout.uuid} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => navigate("/dashboard/gym")} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Gym</span>
          </button>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setIsEditWorkoutModalOpen(true)} className="p-2.5 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-800/50 transition-colors" title="Edit workout">
              <Edit2 className="w-5 h-5" />
            </button>
            <button type="button" onClick={handleFinishWorkout} disabled={updateWorkout.isPending} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Check className="w-4 h-4" strokeWidth={2} />
              <span className="hidden sm:inline">Finish</span>
            </button>
            <button type="button" onClick={() => setIsAddExerciseModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4" strokeWidth={2} />
              <span className="hidden sm:inline">Add Exercise</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/80 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">{workout.name || "Unnamed Workout"}</h1>

          {workout.notes && <p className="text-slate-400 mb-6">{workout.notes}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="text-sm font-medium text-white">{formatDate(workout.started_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="text-sm font-medium text-white">{duration !== null ? `${duration} minutes` : "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Sets</p>
                <p className="text-sm font-medium text-white">{totalSets}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-300 font-medium">No exercises added yet</p>
              <p className="text-sm text-slate-500 mt-1">Start adding exercises to track your workout progress.</p>
              <button type="button" onClick={() => setIsAddExerciseModalOpen(true)} className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                Add First Exercise
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.uuid} className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/80 p-6">
                <button type="button" onClick={() => navigate(`/dashboard/gym/workout-entry/${entry.uuid}`)} className="flex items-center justify-between mb-4 w-full text-left group/header">
                  <div>
                    <h2 className="text-lg font-semibold text-white group-hover/header:text-violet-300 transition-colors">{entry.exercise?.name || "Unknown Exercise"}</h2>
                    {entry.exercise?.description && <p className="text-sm text-slate-400 mt-1">{entry.exercise.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 bg-slate-800 px-3 py-1 rounded-lg">
                      {entry.sets?.length || 0} {(entry.sets?.length || 0) === 1 ? "set" : "sets"}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover/header:text-violet-400 transition-colors" />
                  </div>
                </button>

                <div className="space-y-3">
                  {entry.sets?.map((set, index) => (
                    <SetCard key={set.uuid} set={set} setNumber={index + 1} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
