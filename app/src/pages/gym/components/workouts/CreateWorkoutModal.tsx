import { Trash2 } from "lucide-react";
import { useCreateWorkout, useUpdateWorkout, useDeleteWorkout } from "../../../../features/workout/hooks/use-workout";
import { Modal } from "../../../../components/ui/Modal";
import type { CreateWorkoutDto, UpdateWorkoutDto, Workout } from "../../../../features/workout/interfaces/workout.interface";
import { WorkoutForm } from "./WorkoutForm";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import { useState } from "react";

type CreateWorkoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workout?: Workout;
  mode?: "create" | "edit";
};

export function CreateWorkoutModal({ isOpen, onClose, workout, mode = "create" }: CreateWorkoutModalProps) {
  const createWorkout = useCreateWorkout();
  const updateWorkout = useUpdateWorkout();
  const deleteWorkout = useDeleteWorkout();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isEditMode = mode === "edit" && workout;

  const handleSubmit = (data: CreateWorkoutDto | UpdateWorkoutDto) => {
    if (isEditMode) {
      updateWorkout.mutate(
        { uuid: workout.uuid, data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createWorkout.mutate(data as CreateWorkoutDto, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (workout) {
      deleteWorkout.mutate(workout.uuid, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          onClose();
        },
      });
    }
  };

  const initialData = isEditMode
    ? {
        name: workout.name || "",
        notes: workout.notes || "",
        started_at: workout.started_at || "",
        finished_at: workout.finished_at || "",
      }
    : undefined;

  const isPending = isEditMode ? updateWorkout.isPending : createWorkout.isPending;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditMode ? "Edit Workout" : "Create Workout"}
        headerActions={
          isEditMode ? (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          ) : undefined
        }
      >
        <WorkoutForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel={isEditMode ? "Save" : "Create"}
          isPending={isPending}
          initialData={initialData}
        />
      </Modal>

      {isEditMode && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Workout"
          description={`Are you sure you want to delete "${workout?.name || "Unnamed Workout"}"? This will also delete all sets associated with this workout.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isPending={deleteWorkout.isPending}
        />
      )}
    </>
  );
}
