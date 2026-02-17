import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "../../../../components/ui/Modal";
import { useExercises } from "../../../../features/exercises/hooks/use-exercises";
import { useCreateWorkoutSet, useUpdateWorkoutSet } from "../../../../features/workout-sets/hooks/use-workout-sets";
import type { WorkoutSet } from "../../../../features/workout-sets/interfaces/workout-sets.interface";
import { ExerciseTypes } from "../../../../features/exercises/interfaces/exercises.interface";

type AddSetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workoutUuid: string;
  set?: WorkoutSet;
  mode?: "create" | "edit";
};

export function AddSetModal({ isOpen, onClose, workoutUuid, set, mode = "create" }: AddSetModalProps) {
  const { data: exercises = [] } = useExercises();
  const createSet = useCreateWorkoutSet();
  const updateSet = useUpdateWorkoutSet();

  const isEditMode = mode === "edit" && !!set;

  const [exerciseUuid, setExerciseUuid] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [durationSeconds, setDurationSeconds] = useState("");
  const [distanceMeters, setDistanceMeters] = useState("");
  const [resetSeconds, setResetSeconds] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSetType, setSelectedSetType] = useState<"normal" | "warmup" | "dropset" | "amrap" | "superset" | "cooldown">("normal");

  const selectedExercise = exercises.find((ex) => ex.uuid === exerciseUuid);
  const exerciseType = selectedExercise?.type || ExerciseTypes.REPS;

  useEffect(() => {
    if (isEditMode && set) {
      setExerciseUuid(set.exercise_uuid);
      setReps(set.reps?.toString() || "");
      setWeight(set.weight?.toString() || "");
      setDurationSeconds(set.duration_seconds?.toString() || "");
      setDistanceMeters(set.distance_meters?.toString() || "");
      setResetSeconds(set.rest_seconds?.toString() || "");
      setNotes(set.notes || "");

      if (set.is_warmup) setSelectedSetType("warmup");
      else if (set.is_dropset) setSelectedSetType("dropset");
      else if (set.is_amrap) setSelectedSetType("amrap");
      else if (set.is_super_set) setSelectedSetType("superset");
      else if (set.is_cooldown) setSelectedSetType("cooldown");
      else setSelectedSetType("normal");
    } else {
      setExerciseUuid("");
      setReps("");
      setWeight("");
      setDurationSeconds("");
      setDistanceMeters("");
      setResetSeconds("");
      setNotes("");
      setSelectedSetType("normal");
    }
  }, [isEditMode, set, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!exerciseUuid) {
      return;
    }

    const data: any = {
      workout_uuid: workoutUuid,
      exercise_uuid: exerciseUuid,
      type: exerciseType,
      order: isEditMode ? set.order : 1,
    };

    if (exerciseType === ExerciseTypes.REPS) {
      if (reps) data.reps = parseInt(reps);
      if (weight) data.weight = parseFloat(weight);
    }

    if (exerciseType === ExerciseTypes.TIME) {
      if (durationSeconds) data.duration_seconds = parseInt(durationSeconds);
      if (distanceMeters) data.distance_meters = parseInt(distanceMeters);
    }

    if (resetSeconds) data.rest_seconds = parseInt(resetSeconds);
    if (notes.trim()) data.notes = notes.trim();

    data.is_warmup = selectedSetType === "warmup";
    data.is_dropset = selectedSetType === "dropset";
    data.is_amrap = selectedSetType === "amrap";
    data.is_super_set = selectedSetType === "superset";
    data.is_cooldown = selectedSetType === "cooldown";

    if (isEditMode) {
      updateSet.mutate(
        { uuid: set.uuid, data },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      createSet.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending = isEditMode ? updateSet.isPending : createSet.isPending;

  const isFormValid = () => {
    if (!exerciseUuid) return false;

    if (exerciseType === ExerciseTypes.REPS) {
      return reps !== "" || weight !== "";
    }

    if (exerciseType === ExerciseTypes.TIME) {
      return durationSeconds !== "" || distanceMeters !== "";
    }

    return false;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Set" : "Add Set"} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Exercise *</label>
          <select 
            value={exerciseUuid} 
            onChange={(e) => setExerciseUuid(e.target.value)} 
            required 
            disabled={isEditMode}
            className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${!exerciseUuid ? "border-red-500/50" : "border-slate-600"}`}
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.uuid} value={exercise.uuid}>
                {exercise.name} ({exercise.muscle_group?.name})
              </option>
            ))}
          </select>
          {!exerciseUuid && !isEditMode && <p className="text-xs text-red-400 mt-1">Exercise is required</p>}
        </div>

        {exerciseType === ExerciseTypes.REPS && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reps</label>
              <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="12" className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${reps === "" && weight === "" ? "border-red-500/50" : "border-slate-600"}`} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Weight (kg)</label>
              <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="60" className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${reps === "" && weight === "" ? "border-red-500/50" : "border-slate-600"}`} />
            </div>
          </div>
        )}
        {exerciseType === ExerciseTypes.REPS && reps === "" && weight === "" && <p className="text-xs text-red-400 -mt-2">At least reps or weight is required</p>}

        {exerciseType === ExerciseTypes.TIME && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duration (seconds)</label>
              <input type="number" value={durationSeconds} onChange={(e) => setDurationSeconds(e.target.value)} placeholder="60" className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${durationSeconds === "" && distanceMeters === "" ? "border-red-500/50" : "border-slate-600"}`} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Distance (meters)</label>
              <input type="number" value={distanceMeters} onChange={(e) => setDistanceMeters(e.target.value)} placeholder="100" className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${durationSeconds === "" && distanceMeters === "" ? "border-red-500/50" : "border-slate-600"}`} />
            </div>
          </div>
        )}
        {exerciseType === ExerciseTypes.TIME && durationSeconds === "" && distanceMeters === "" && <p className="text-xs text-red-400 -mt-2">At least duration or distance is required</p>}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Rest (seconds)</label>
          <input type="number" value={resetSeconds} onChange={(e) => setResetSeconds(e.target.value)} placeholder="90" className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes about this set..." rows={2} className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Set Type</label>
          <select value={selectedSetType} onChange={(e) => setSelectedSetType(e.target.value as typeof selectedSetType)} className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
            <option value="normal">Normal</option>
            <option value="warmup">Warmup</option>
            <option value="dropset">Dropset</option>
            <option value="amrap">AMRAP</option>
            <option value="superset">Superset</option>
            <option value="cooldown">Cooldown</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={isPending || !isFormValid()} className="flex-1 px-4 py-2.5 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditMode ? "Save Changes" : "Add Set"}
          </button>
          <button type="button" onClick={onClose} disabled={isPending} className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
