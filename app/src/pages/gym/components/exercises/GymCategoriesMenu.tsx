import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import type { Exercise } from "../../../../features/gym/exercises/interfaces/exercises.interface";
import type { MuscleGroup } from "../../../../features/gym/muscle-groups/interfaces/muscle-groups.interface";
import {
  useCreateExercise,
  useDeleteExercise,
  useExercises,
  useUpdateExercise,
} from "../../../../features/gym/exercises/hooks/use-exercises";
import {
  useCreateMuscleGroup,
  useDeleteMuscleGroup,
  useMuscleGroups,
  useUpdateMuscleGroup,
} from "../../../../features/gym/muscle-groups/hooks/use-muscle-groups";
import { GymEmptyState } from "./GymEmptyState";
import { MuscleGroupForm } from "./MuscleGroupForm";
import { MuscleGroupItem } from "./MuscleGroupItem";
import { useAuthStore } from "../../../../store/auth-store";
import { AUTH_ROLES } from "../../../../config/constants/auth-roles";

type GymCategoriesMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function GymCategoriesMenu({ isOpen, onClose }: GymCategoriesMenuProps) {
  const { data: muscleGroups = [], isLoading: muscleGroupsLoading } = useMuscleGroups();
  const { data: exercises = [], isLoading: exercisesLoading } = useExercises();

  const createMuscleGroup = useCreateMuscleGroup();
  const updateMuscleGroup = useUpdateMuscleGroup();
  const deleteMuscleGroup = useDeleteMuscleGroup();

  const createExercise = useCreateExercise();
  const updateExercise = useUpdateExercise();
  const deleteExercise = useDeleteExercise();

  const userRole = useAuthStore((state) => state.role);

  const isAdmin = userRole === AUTH_ROLES.ADMIN;

  const canEditDeleteMuscleGroup = useCallback(
    (muscleGroup: MuscleGroup) => !!muscleGroup.user_uuid || isAdmin,
    [isAdmin]
  );

  const canEditDeleteExercise = useCallback(
    (exercise: Exercise) => !!exercise.user_uuid || isAdmin,
    [isAdmin]
  );

  const [expandedMuscleGroups, setExpandedMuscleGroups] = useState<Set<string>>(new Set());
  const [editingMuscleGroupUuid, setEditingMuscleGroupUuid] = useState<string | null>(null);
  const [editingExerciseUuid, setEditingExerciseUuid] = useState<string | null>(null);
  const [isAddingMuscleGroup, setIsAddingMuscleGroup] = useState(false);
  const [addingExerciseToMuscleGroupUuid, setAddingExerciseToMuscleGroupUuid] = useState<string | null>(null);
  const [deletingMuscleGroup, setDeletingMuscleGroup] = useState<MuscleGroup | null>(null);
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const toggleMuscleGroup = (uuid: string) => {
    setExpandedMuscleGroups((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) {
        next.delete(uuid);
      } else {
        next.add(uuid);
      }
      return next;
    });
  };

  const handleAddMuscleGroup = (name: string, color: string) => {
    createMuscleGroup.mutate(
      { name, color: color || undefined },
      {
        onSuccess: () => {
          setIsAddingMuscleGroup(false);
        },
      }
    );
  };

  const handleUpdateMuscleGroup = (uuid: string, name: string, color: string) => {
    updateMuscleGroup.mutate(
      { uuid, data: { name, color: color || undefined } },
      {
        onSuccess: () => {
          setEditingMuscleGroupUuid(null);
        },
      }
    );
  };

  const handleAddExercise = (
    muscleGroupUuid: string,
    name: string,
    description: string,
    type: Exercise["type"]
  ) => {
    createExercise.mutate(
      {
        muscle_group_uuid: muscleGroupUuid,
        name,
        description: description || undefined,
        type,
      },
      {
        onSuccess: () => {
          setAddingExerciseToMuscleGroupUuid(null);
        },
      }
    );
  };

  const handleUpdateExercise = (
    exerciseUuid: string,
    name: string,
    description: string,
    type: Exercise["type"]
  ) => {
    updateExercise.mutate(
      {
        uuid: exerciseUuid,
        data: {
          name,
          description: description || undefined,
          type,
        },
      },
      {
        onSuccess: () => {
          setEditingExerciseUuid(null);
        },
      }
    );
  };

  const handleDeleteMuscleGroupConfirm = () => {
    if (deletingMuscleGroup) {
      deleteMuscleGroup.mutate(deletingMuscleGroup.uuid, {
        onSuccess: () => {
          setDeletingMuscleGroup(null);
        },
      });
    }
  };

  const handleDeleteExerciseConfirm = () => {
    if (deletingExercise) {
      deleteExercise.mutate(deletingExercise.uuid, {
        onSuccess: () => {
          setDeletingExercise(null);
        },
      });
    }
  };

  const getExercisesForMuscleGroup = (muscleGroupUuid: string) =>
    exercises.filter((exercise) => exercise.muscle_group_uuid === muscleGroupUuid);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[90]" onClick={onClose} />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-slate-900 border-l border-slate-700 z-[91] flex flex-col shadow-xl"
        role="dialog"
        aria-label="Gym categories menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Muscle Groups & Exercises</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAddingMuscleGroup ? (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Add muscle group</h3>
              <MuscleGroupForm
                initialName=""
                initialColor="#8b5cf6"
                onSubmit={handleAddMuscleGroup}
                onCancel={() => setIsAddingMuscleGroup(false)}
                submitLabel="Add"
                isPending={createMuscleGroup.isPending}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingMuscleGroup(true)}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors font-medium"
            >
              + Add muscle group
            </button>
          )}

          <div className="space-y-2">
            {muscleGroupsLoading || exercisesLoading ? (
              <div className="text-center py-8 text-slate-400">Loading gym catalog...</div>
            ) : muscleGroups.length === 0 ? (
              <GymEmptyState onCreateClick={() => setIsAddingMuscleGroup(true)} />
            ) : (
              muscleGroups.map((muscleGroup) => {
                const groupExercises = getExercisesForMuscleGroup(muscleGroup.uuid);
                const isExpanded = expandedMuscleGroups.has(muscleGroup.uuid);

                return (
                  <MuscleGroupItem
                    key={muscleGroup.uuid}
                    muscleGroup={muscleGroup}
                    exercises={groupExercises}
                    isExpanded={isExpanded}
                    onToggle={() => toggleMuscleGroup(muscleGroup.uuid)}
                    isEditing={editingMuscleGroupUuid === muscleGroup.uuid}
                    onStartEdit={() => setEditingMuscleGroupUuid(muscleGroup.uuid)}
                    onCancelEdit={() => setEditingMuscleGroupUuid(null)}
                    onSave={(name, color) => handleUpdateMuscleGroup(muscleGroup.uuid, name, color)}
                    onDelete={() => setDeletingMuscleGroup(muscleGroup)}
                    isUpdatePending={updateMuscleGroup.isPending}
                    addingExercise={addingExerciseToMuscleGroupUuid === muscleGroup.uuid}
                    onStartAddingExercise={() => setAddingExerciseToMuscleGroupUuid(muscleGroup.uuid)}
                    onCancelAddingExercise={() => setAddingExerciseToMuscleGroupUuid(null)}
                    onCreateExercise={(name, description, type) =>
                      handleAddExercise(muscleGroup.uuid, name, description, type)
                    }
                    isCreateExercisePending={createExercise.isPending}
                    editingExerciseUuid={editingExerciseUuid}
                    onStartEditExercise={setEditingExerciseUuid}
                    onCancelEditExercise={() => setEditingExerciseUuid(null)}
                    onUpdateExercise={handleUpdateExercise}
                    onDeleteExercise={setDeletingExercise}
                    isUpdateExercisePending={updateExercise.isPending}
                    canEditDelete={canEditDeleteMuscleGroup(muscleGroup)}
                    canEditDeleteExercise={canEditDeleteExercise}
                  />
                );
              })
            )}
          </div>
        </div>
      </aside>

      <ConfirmationModal
        isOpen={!!deletingMuscleGroup}
        onClose={() => setDeletingMuscleGroup(null)}
        onConfirm={handleDeleteMuscleGroupConfirm}
        title="Delete Muscle Group"
        description={`Are you sure you want to delete "${deletingMuscleGroup?.name}"? This will also delete exercises linked to this group.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteMuscleGroup.isPending}
      />

      <ConfirmationModal
        isOpen={!!deletingExercise}
        onClose={() => setDeletingExercise(null)}
        onConfirm={handleDeleteExerciseConfirm}
        title="Delete Exercise"
        description={`Are you sure you want to delete "${deletingExercise?.name}"? Existing workout sets using it may be affected.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteExercise.isPending}
      />
    </>
  );
}
