import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Loader2, Dumbbell } from "lucide-react";
import { useWorkout } from "../../../features/workout/hooks/use-workout";
import { useCreateWorkoutSet } from "../../../features/workout-sets/hooks/use-workout-sets";
import { ExerciseTypes } from "../../../features/exercises/interfaces/exercises.interface";
import type { WorkoutSet, CreateWorkoutSetDto } from "../../../features/workout-sets/interfaces/workout-sets.interface";
import { SetCard } from "../workout-detail/components/SetCard";

const REPS_STEP = 1;
const REPS_MIN = 0;
const REPS_MAX = 999;
const WEIGHT_STEP = 2.5;
const WEIGHT_MIN = 0;
const WEIGHT_MAX = 999;
const DURATION_STEP = 5;
const DURATION_MIN = 0;
const DURATION_MAX = 3600;
const DISTANCE_STEP = 10;
const DISTANCE_MIN = 0;
const DISTANCE_MAX = 99999;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function ExerciseDetailPage() {
  const { workoutUuid, exerciseUuid } = useParams<{ workoutUuid: string; exerciseUuid: string }>();
  const navigate = useNavigate();
  const { data: workout, isLoading } = useWorkout(workoutUuid || "");
  const createSet = useCreateWorkoutSet();

  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(20);
  const [durationSeconds, setDurationSeconds] = useState(60);
  const [distanceMeters, setDistanceMeters] = useState(100);

  const exerciseSets: WorkoutSet[] = workout?.sets?.filter((s) => s.exercise_uuid === exerciseUuid) || [];
  const exercise = exerciseSets.length > 0 ? exerciseSets[0].exercise : undefined;
  const exerciseType = exercise?.type || ExerciseTypes.REPS;

  const handleDecrementReps = () => setReps((prev) => clamp(prev - REPS_STEP, REPS_MIN, REPS_MAX));
  const handleIncrementReps = () => setReps((prev) => clamp(prev + REPS_STEP, REPS_MIN, REPS_MAX));
  const handleDecrementWeight = () => setWeight((prev) => clamp(prev - WEIGHT_STEP, WEIGHT_MIN, WEIGHT_MAX));
  const handleIncrementWeight = () => setWeight((prev) => clamp(prev + WEIGHT_STEP, WEIGHT_MIN, WEIGHT_MAX));
  const handleDecrementDuration = () => setDurationSeconds((prev) => clamp(prev - DURATION_STEP, DURATION_MIN, DURATION_MAX));
  const handleIncrementDuration = () => setDurationSeconds((prev) => clamp(prev + DURATION_STEP, DURATION_MIN, DURATION_MAX));
  const handleDecrementDistance = () => setDistanceMeters((prev) => clamp(prev - DISTANCE_STEP, DISTANCE_MIN, DISTANCE_MAX));
  const handleIncrementDistance = () => setDistanceMeters((prev) => clamp(prev + DISTANCE_STEP, DISTANCE_MIN, DISTANCE_MAX));

  const handleSave = () => {
    if (!workoutUuid || !exerciseUuid) return;

    const data: CreateWorkoutSetDto = {
      workout_uuid: workoutUuid,
      exercise_uuid: exerciseUuid,
      type: exerciseType,
      order: exerciseSets.length + 1,
    };

    if (exerciseType === ExerciseTypes.REPS) {
      data.reps = reps;
      if (weight > 0) data.weight = weight;
    }

    if (exerciseType === ExerciseTypes.TIME) {
      if (durationSeconds > 0) data.duration_seconds = durationSeconds;
      if (distanceMeters > 0) data.distance_meters = distanceMeters;
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

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center py-12">
            <p className="text-slate-400">Workout not found</p>
            <button type="button" onClick={handleBack} className="mt-4 text-violet-400 hover:text-violet-300">
              Back to Workout
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

          {exerciseType === ExerciseTypes.REPS && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Reps</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleDecrementReps} disabled={reps <= REPS_MIN} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Minus className="w-4 h-4 text-slate-300" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-white tabular-nums">{reps}</span>
                  </div>
                  <button type="button" onClick={handleIncrementReps} disabled={reps >= REPS_MAX} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Plus className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Weight (kg)</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleDecrementWeight} disabled={weight <= WEIGHT_MIN} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Minus className="w-4 h-4 text-slate-300" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-white tabular-nums">{weight}</span>
                  </div>
                  <button type="button" onClick={handleIncrementWeight} disabled={weight >= WEIGHT_MAX} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Plus className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {exerciseType === ExerciseTypes.TIME && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Duration (seconds)</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleDecrementDuration} disabled={durationSeconds <= DURATION_MIN} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Minus className="w-4 h-4 text-slate-300" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-white tabular-nums">{durationSeconds}</span>
                  </div>
                  <button type="button" onClick={handleIncrementDuration} disabled={durationSeconds >= DURATION_MAX} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Plus className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Distance (meters)</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleDecrementDistance} disabled={distanceMeters <= DISTANCE_MIN} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Minus className="w-4 h-4 text-slate-300" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-white tabular-nums">{distanceMeters}</span>
                  </div>
                  <button type="button" onClick={handleIncrementDistance} disabled={distanceMeters >= DISTANCE_MAX} className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">
                    <Plus className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <button type="button" onClick={handleSave} disabled={createSet.isPending} className="w-full py-3 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {createSet.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" strokeWidth={2.5} />}
            {createSet.isPending ? "Saving..." : "Save"}
          </button>
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
