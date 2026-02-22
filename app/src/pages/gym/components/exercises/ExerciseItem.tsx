import { Edit2, Trash2 } from "lucide-react";
import type { Exercise } from "../../../../features/exercises/interfaces/exercises.interface";
import { ExerciseForm } from "./ExerciseForm";

type ExerciseItemProps = {
  exercise: Exercise;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (name: string, description: string, type: Exercise["type"]) => void;
  onDelete: () => void;
  isUpdatePending: boolean;
  canEditDelete: boolean;
};

export function ExerciseItem({
  exercise,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
  isUpdatePending,
  canEditDelete,
}: ExerciseItemProps) {
  if (isEditing) {
    return (
      <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
        <ExerciseForm
          initialName={exercise.name}
          initialDescription={exercise.description || ""}
          initialType={exercise.type}
          onSubmit={onSave}
          onCancel={onCancelEdit}
          submitLabel="Save"
          isPending={isUpdatePending}
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-white font-medium">{exercise.name}</p>
          {!!exercise.description && <p className="mt-1 text-sm text-slate-400">{exercise.description}</p>}
          <p className="mt-2 text-xs text-violet-300">{exercise.type === "REPS" ? "Reps based" : "Time based"}</p>
        </div>

        {canEditDelete && (
          <div className="flex gap-1 shrink-0">
            <button
              type="button"
              onClick={onStartEdit}
              className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
