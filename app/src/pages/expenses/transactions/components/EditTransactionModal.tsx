import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useUpdateExpenseEntry } from "../../../../features/expense-entries/hooks/use-expense-entries";
import type { ExpenseEntry, UpdateExpenseEntryDto, CreateExpenseEntryDto } from "../../../../features/expense-entries/interfaces/expense-entries.interfaces";
import { TransactionForm } from "./TransactionForm";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { Modal } from "../../../../components/ui/Modal";

type EditTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: ExpenseEntry;
};

export function EditTransactionModal({ isOpen, onClose, transaction }: EditTransactionModalProps) {
  const updateEntry = useUpdateExpenseEntry();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = (data: CreateExpenseEntryDto) => {
    const updateData: UpdateExpenseEntryDto = {
      type: data.type,
      amount: data.amount,
      description: data.description,
      from_account_uuid: data.from_account_uuid,
      to_account_uuid: data.to_account_uuid,
      category_uuid: data.category_uuid,
      subcategory_uuid: data.subcategory_uuid,
      entry_date: data.entry_date,
    };

    updateEntry.mutate(
      { uuid: transaction.uuid, data: updateData },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    onClose();
  };

  const initialData: Partial<CreateExpenseEntryDto> = {
    type: transaction.type,
    amount: typeof transaction.amount === "string" ? parseFloat(transaction.amount) : transaction.amount,
    description: transaction.description,
    from_account_uuid: transaction.from_account_uuid,
    to_account_uuid: transaction.to_account_uuid,
    category_uuid: transaction.category_uuid,
    subcategory_uuid: transaction.subcategory_uuid,
    entry_date: transaction.entry_date,
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Transaction"
        scrollable
        headerActions={
          <button type="button" onClick={handleDeleteClick} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        }
      >
        <TransactionForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Save" isPending={updateEntry.isPending} initialData={initialData} />
      </Modal>

      <DeleteTransactionModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onSuccess={handleDeleteSuccess} transaction={transaction} />
    </>
  );
}
