import { useCreateExpenseEntry } from "../../../../features/expenses/expense-entries/hooks/use-expense-entries";
import type { CreateExpenseEntryDto } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { TransactionForm } from "./TransactionForm";
import { Modal } from "../../../../components/ui/Modal";

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<CreateExpenseEntryDto>;
  formKey?: string;
};

export function CreateTransactionModal({ isOpen, onClose, initialData, formKey = "new" }: CreateTransactionModalProps) {
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
      <TransactionForm key={formKey} onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createEntry.isPending} initialData={initialData} showQuantity />
    </Modal>
  );
}
