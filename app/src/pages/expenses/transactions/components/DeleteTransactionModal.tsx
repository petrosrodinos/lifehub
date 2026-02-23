import { useDeleteExpenseEntry } from "../../../../features/expenses/expense-entries/hooks/use-expense-entries";
import type { ExpenseEntry } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";

type DeleteTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  transaction: ExpenseEntry;
};

export function DeleteTransactionModal({ isOpen, onClose, onSuccess, transaction }: DeleteTransactionModalProps) {
  const deleteEntry = useDeleteExpenseEntry();

  const handleConfirm = () => {
    deleteEntry.mutate(transaction.uuid, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
    });
  };

  return <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} title="Delete Transaction" description="Are you sure you want to delete this transaction? This action cannot be undone." confirmText="Delete" cancelText="Cancel" variant="danger" isPending={deleteEntry.isPending} />;
}
