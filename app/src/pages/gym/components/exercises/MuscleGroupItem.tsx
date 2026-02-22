import { ChevronDown, ChevronRight, Edit2, Plus, Trash2 } from "lucide-react";
import type { Exercise } from "../../../../features/exercises/interfaces/exercises.interface";
import type { MuscleGroup } from "../../../../features/muscle-groups/interfaces/muscle-groups.interface";
import { ExerciseForm } from "./ExerciseForm";
import { ExerciseItem } from "./ExerciseItem";
import { MuscleGroupForm } from "./MuscleGroupForm";

type MuscleGroupItemProps = {
  muscleGroup: MuscleGroup;
  exercises: Exercise[];
  isExpanded: boolean;
  onToggle: () => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (name: string, color: string) => void;
  onDelete: () => void;
  isUpdatePending: boolean;
  addingExercise: boolean;
  onStartAddingExercise: () => void;
  onCancelAddingExercise: () => void;
  onCreateExercise: (name: string, description: string, type: Exercise["type"]) => void;
  isCreateExercisePending: boolean;
  editingExerciseUuid: string | null;
  onStartEditExercise: (uuid: string) => void;
  onCancelEditExercise: () => void;
  onUpdateExercise: (exerciseUuid: string, name: string, description: string, type: Exercise["type"]) => void;
  onDeleteExercise: (exercise: Exercise) => void;
  isUpdateExercisePending: boolean;
  canEditDelete: boolean;
  canEditDeleteExercise: (exercise: Exercise) => boolean;
};

export function MuscleGroupItem({
  muscleGroup,
  exercises,
  isExpanded,
  onToggle,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
  isUpdatePending,
  addingExercise,
  onStartAddingExercise,
  onCancelAddingExercise,
  onCreateExercise,
  isCreateExercisePending,
  editingExerciseUuid,
  onStartEditExercise,
  onCancelEditExercise,
  onUpdateExercise,
  onDeleteExercise,
  isUpdateExercisePending,
  canEditDelete,
  canEditDeleteExercise,
}: MuscleGroupItemProps) {
  if (isEditing) {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-3">
        <MuscleGroupForm
          initialName={muscleGroup.name}
          initialColor={muscleGroup.color || "#8b5cf6"}
          onSubmit={onSave}
          onCancel={onCancelEdit}
          submitLabel="Save"
          isPending={isUpdatePending}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex items-center gap-3 p-3">
        <button type="button" onClick={onToggle} className="p-1 text-slate-400 hover:text-white transition-colors">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="w-8 h-8 rounded-lg shrink-0 border border-slate-600"
            style={{ backgroundColor: muscleGroup.color || "#8b5cf6" }}
          />
          <span className="truncate text-white font-medium">{muscleGroup.name}</span>
          <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">{exercises.length}</span>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={onStartAddingExercise}
            className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          {canEditDelete && (
            <>
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
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 pl-12 space-y-2">
          {addingExercise && (
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
              <ExerciseForm
                initialName=""
                initialDescription=""
                initialType="REPS"
                onSubmit={onCreateExercise}
                onCancel={onCancelAddingExercise}
                submitLabel="Add"
                isPending={isCreateExercisePending}
              />
            </div>
          )}

          {exercises.length === 0 && !addingExercise ? (
            <p className="text-sm text-slate-500 py-2">No exercises yet</p>
          ) : (
            exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.uuid}
                exercise={exercise}
                isEditing={editingExerciseUuid === exercise.uuid}
                onStartEdit={() => onStartEditExercise(exercise.uuid)}
                onCancelEdit={onCancelEditExercise}
                onSave={(name, description, type) =>
                  onUpdateExercise(exercise.uuid, name, description, type)
                }
                onDelete={() => onDeleteExercise(exercise)}
                isUpdatePending={isUpdateExercisePending}
                canEditDelete={canEditDeleteExercise(exercise)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
