import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Dumbbell } from "lucide-react";
import { useWorkoutEntry } from "../../../features/workout-entries/hooks/use-workout-entries";
import { useCreateWorkoutSet } from "../../../features/workout-sets/hooks/use-workout-sets";
import { ExerciseTypes } from "../../../features/exercises/interfaces/exercises.interface";
import type { CreateWorkoutSetDto } from "../../../features/workout-sets/interfaces/workout-sets.interface";
import { SetCard } from "../workout-detail/components/SetCard";
import { SetForm } from "../workout-detail/components/SetForm";
import type { SetFormValues } from "../workout-detail/components/SetForm";

export function ExerciseDetailPage() {
  const { entryUuid } = useParams<{ entryUuid: string }>();
  const navigate = useNavigate();
  const { data: entry, isLoading } = useWorkoutEntry(entryUuid || "");
  const createSet = useCreateWorkoutSet();

  const exercise = entry?.exercise;
  const exerciseSets = entry?.sets || [];
  const exerciseType = exercise?.type || ExerciseTypes.REPS;
  const workoutUuid = entry?.workout_uuid;

  const handleSave = (values: SetFormValues) => {
    if (!entryUuid) return;

    const data: CreateWorkoutSetDto = {
      workout_entry_uuid: entryUuid,
      type: exerciseType,
      order: exerciseSets.length + 1,
    };

    if (exerciseType === ExerciseTypes.REPS) {
      data.reps = values.reps;
      if (values.weight > 0) data.weight = values.weight;
    }

    if (exerciseType === ExerciseTypes.TIME) {
      if (values.durationSeconds > 0) data.duration_seconds = values.durationSeconds;
      if (values.distanceMeters > 0) data.distance_meters = values.distanceMeters;
    }

    createSet.mutate(data);
  };

  const handleBack = () => navigate(`/dashboard/gym/workout/${workoutUuid}`);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
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
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
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

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Add Set</h2>
          </div>

          <SetForm
            exerciseType={exerciseType}
            onSave={handleSave}
            isPending={createSet.isPending}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Sets ({exerciseSets.length})</h2>
          </div>

          {exerciseSets.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-slate-700 rounded-xl">
              <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 font-medium">No sets yet</p>
              <p className="text-sm text-slate-500 mt-1">Use the controls above to add your first set.</p>
            </div>
          ) : (
            exerciseSets.map((set, index) => <SetCard key={set.uuid} set={set} setNumber={index + 1} />)
          )}
        </div>
      </div>
    </div>
  );
}
