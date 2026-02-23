import { useDeleteWorkoutSet } from "../../../../features/gym/workout-sets/hooks/use-workout-sets";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import type { WorkoutSet } from "../../../../features/gym/workout-sets/interfaces/workout-sets.interface";

type DeleteSetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  set: WorkoutSet;
};

export function DeleteSetModal({ isOpen, onClose, set }: DeleteSetModalProps) {
  const deleteSet = useDeleteWorkoutSet();

  const handleConfirm = () => {
    deleteSet.mutate(set.uuid, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const setDescription = set.workout_entry?.exercise?.name
    ? `${set.workout_entry.exercise.name} - Set #${set.order}`
    : `Set #${set.order}`;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Set"
      description={`Are you sure you want to delete ${setDescription}? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      isPending={deleteSet.isPending}
    />
  );
}
