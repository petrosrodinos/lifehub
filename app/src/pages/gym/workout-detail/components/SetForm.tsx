import { useState, useEffect } from "react";
import { Minus, Plus, Loader2 } from "lucide-react";
import { ExerciseTypes } from "../../../../features/exercises/interfaces/exercises.interface";
import type { ExerciseType } from "../../../../features/exercises/interfaces/exercises.interface";

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

export type SetFormValues = {
  reps: number;
  weight: number;
  durationSeconds: number;
  distanceMeters: number;
};

type SetFormProps = {
  exerciseType: ExerciseType;
  initialValues?: Partial<SetFormValues>;
  onSave: (values: SetFormValues) => void;
  isPending: boolean;
  submitLabel?: string;
};

export function SetForm({ exerciseType, initialValues, onSave, isPending, submitLabel = "Save" }: SetFormProps) {
  const [reps, setReps] = useState(initialValues?.reps ?? 10);
  const [weight, setWeight] = useState(initialValues?.weight ?? 20);
  const [durationSeconds, setDurationSeconds] = useState(initialValues?.durationSeconds ?? 60);
  const [distanceMeters, setDistanceMeters] = useState(initialValues?.distanceMeters ?? 100);

  useEffect(() => {
    if (initialValues) {
      if (initialValues.reps !== undefined) setReps(initialValues.reps);
      if (initialValues.weight !== undefined) setWeight(initialValues.weight);
      if (initialValues.durationSeconds !== undefined) setDurationSeconds(initialValues.durationSeconds);
      if (initialValues.distanceMeters !== undefined) setDistanceMeters(initialValues.distanceMeters);
    }
  }, [initialValues?.reps, initialValues?.weight, initialValues?.durationSeconds, initialValues?.distanceMeters]);

  const handleDecrementReps = () => setReps((prev) => clamp(prev - REPS_STEP, REPS_MIN, REPS_MAX));
  const handleIncrementReps = () => setReps((prev) => clamp(prev + REPS_STEP, REPS_MIN, REPS_MAX));
  const handleDecrementWeight = () => setWeight((prev) => clamp(prev - WEIGHT_STEP, WEIGHT_MIN, WEIGHT_MAX));
  const handleIncrementWeight = () => setWeight((prev) => clamp(prev + WEIGHT_STEP, WEIGHT_MIN, WEIGHT_MAX));
  const handleDecrementDuration = () => setDurationSeconds((prev) => clamp(prev - DURATION_STEP, DURATION_MIN, DURATION_MAX));
  const handleIncrementDuration = () => setDurationSeconds((prev) => clamp(prev + DURATION_STEP, DURATION_MIN, DURATION_MAX));
  const handleDecrementDistance = () => setDistanceMeters((prev) => clamp(prev - DISTANCE_STEP, DISTANCE_MIN, DISTANCE_MAX));
  const handleIncrementDistance = () => setDistanceMeters((prev) => clamp(prev + DISTANCE_STEP, DISTANCE_MIN, DISTANCE_MAX));

  const handleSave = () => {
    onSave({ reps, weight, durationSeconds, distanceMeters });
  };

  return (
    <div className="space-y-5">
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

      <button type="button" onClick={handleSave} disabled={isPending} className="w-full py-3 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" strokeWidth={2.5} />}
        {isPending ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
