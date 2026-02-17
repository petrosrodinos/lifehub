import { useState, useEffect } from "react";
import { Modal } from "../../../../components/ui/Modal";
import { useUpdateWorkoutSet } from "../../../../features/workout-sets/hooks/use-workout-sets";
import type { WorkoutSet, UpdateWorkoutSetDto } from "../../../../features/workout-sets/interfaces/workout-sets.interface";
import { ExerciseTypes } from "../../../../features/exercises/interfaces/exercises.interface";
import type { ExerciseType } from "../../../../features/exercises/interfaces/exercises.interface";
import { SetForm } from "./SetForm";
import type { SetFormValues } from "./SetForm";

const SET_TYPES = [
  { key: "normal", label: "Normal" },
  { key: "warmup", label: "Warmup" },
  { key: "dropset", label: "Dropset" },
  { key: "amrap", label: "AMRAP" },
  { key: "superset", label: "Superset" },
  { key: "cooldown", label: "Cooldown" },
  { key: "rest", label: "Rest" },
] as const;

type SetType = (typeof SET_TYPES)[number]["key"];

function resolveSetType(set: WorkoutSet): SetType {
  if (set.is_warmup) return "warmup";
  if (set.is_dropset) return "dropset";
  if (set.is_amrap) return "amrap";
  if (set.is_super_set) return "superset";
  if (set.is_cooldown) return "cooldown";
  if (set.is_rest) return "rest";
  return "normal";
}

type EditSetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  set: WorkoutSet;
};

export function EditSetModal({ isOpen, onClose, set }: EditSetModalProps) {
  const updateSet = useUpdateWorkoutSet();

  const exerciseType: ExerciseType = set.type || ExerciseTypes.REPS;

  const [notes, setNotes] = useState("");
  const [restSeconds, setRestSeconds] = useState("");
  const [selectedSetType, setSelectedSetType] = useState<SetType>("normal");

  useEffect(() => {
    if (isOpen) {
      setNotes(set.notes || "");
      setRestSeconds(set.rest_seconds?.toString() || "");
      setSelectedSetType(resolveSetType(set));
    }
  }, [isOpen, set]);

  const initialValues: SetFormValues = {
    reps: set.reps ?? 10,
    weight: set.weight ? Number(set.weight) : 20,
    durationSeconds: set.duration_seconds ?? 60,
    distanceMeters: set.distance_meters ?? 100,
  };

  const handleSave = (values: SetFormValues) => {
    const data: UpdateWorkoutSetDto = {
      type: exerciseType,
      is_warmup: selectedSetType === "warmup",
      is_dropset: selectedSetType === "dropset",
      is_amrap: selectedSetType === "amrap",
      is_super_set: selectedSetType === "superset",
      is_cooldown: selectedSetType === "cooldown",
      is_rest: selectedSetType === "rest",
    };

    if (notes.trim()) {
      data.notes = notes.trim();
    } else {
      data.notes = undefined;
    }

    if (restSeconds) {
      data.rest_seconds = parseInt(restSeconds);
    }

    if (exerciseType === ExerciseTypes.REPS) {
      data.reps = values.reps;
      if (values.weight > 0) data.weight = values.weight;
    }

    if (exerciseType === ExerciseTypes.TIME) {
      if (values.durationSeconds > 0) data.duration_seconds = values.durationSeconds;
      if (values.distanceMeters > 0) data.distance_meters = values.distanceMeters;
    }

    updateSet.mutate(
      { uuid: set.uuid, data },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Set" size="lg" scrollable>
      <div className="space-y-5">
        <SetForm
          exerciseType={exerciseType}
          initialValues={initialValues}
          onSave={handleSave}
          isPending={updateSet.isPending}
          submitLabel="Save Changes"
        />

        <div className="border-t border-slate-800 pt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rest (seconds)</label>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(e.target.value)}
              placeholder="90"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this set..."
              rows={2}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Set Type</label>
            <div className="flex flex-wrap gap-2">
              {SET_TYPES.map((type) => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => setSelectedSetType(type.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedSetType === type.key
                      ? "bg-violet-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={updateSet.isPending}
          className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
