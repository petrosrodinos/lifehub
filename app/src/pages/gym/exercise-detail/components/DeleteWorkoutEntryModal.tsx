import { useDeleteWorkoutEntry } from "../../../../features/gym/workout-entries/hooks/use-workout-entries";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import type { WorkoutEntry } from "../../../../features/gym/workout-entries/interfaces/workout-entries.interface";

type DeleteWorkoutEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entry: WorkoutEntry;
  onDeleted: () => void;
};

export function DeleteWorkoutEntryModal({ isOpen, onClose, entry, onDeleted }: DeleteWorkoutEntryModalProps) {
  const deleteEntry = useDeleteWorkoutEntry();

  const handleConfirm = () => {
    deleteEntry.mutate(entry.uuid, {
      onSuccess: () => {
        onClose();
        onDeleted();
      },
    });
  };

  const exerciseName = entry.exercise?.name || "this exercise";
  const setCount = entry.sets?.length ?? 0;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Remove Exercise"
      description={`Are you sure you want to remove "${exerciseName}" from this workout?${setCount > 0 ? ` This will also delete ${setCount} ${setCount === 1 ? "set" : "sets"}.` : ""} This action cannot be undone.`}
      confirmText="Remove"
      cancelText="Cancel"
      variant="danger"
      isPending={deleteEntry.isPending}
    />
  );
}
