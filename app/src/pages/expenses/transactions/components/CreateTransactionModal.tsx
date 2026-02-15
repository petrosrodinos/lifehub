import { useCreateExpenseEntry } from "../../../../features/expense-entries/hooks/use-expense-entries";
import type { CreateExpenseEntryDto } from "../../../../features/expense-entries/interfaces/expense-entries.interfaces";
import { TransactionForm } from "./TransactionForm";
import { Modal } from "../../../../components/ui/Modal";

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateTransactionModal({ isOpen, onClose }: CreateTransactionModalProps) {
  const createEntry = useCreateExpenseEntry();

  const handleSubmit = (data: CreateExpenseEntryDto) => {
    createEntry.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction" scrollable>
      <TransactionForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createEntry.isPending} />
    </Modal>
  );
}
