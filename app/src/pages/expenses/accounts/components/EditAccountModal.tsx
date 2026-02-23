import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useUpdateExpenseAccount } from "../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount, UpdateExpenseAccountDto } from "../../../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import { AccountForm } from "./AccountForm";
import { DeleteAccountModal } from "./DeleteAccountModal";
import { Modal } from "../../../../components/ui/Modal";

type EditAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  account: ExpenseAccount;
};

export function EditAccountModal({ isOpen, onClose, account }: EditAccountModalProps) {
  const updateAccount = useUpdateExpenseAccount();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = (data: UpdateExpenseAccountDto) => {
    updateAccount.mutate(
      { uuid: account.uuid, data },
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

  const initialData = {
    name: account.name,
    icon: account.icon,
    color: account.color,
    balance: typeof account.balance === "string" ? parseFloat(account.balance) : account.balance,
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Account"
        headerActions={
          <button type="button" onClick={handleDeleteClick} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        }
      >
        <AccountForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Save" isPending={updateAccount.isPending} initialData={initialData} />
      </Modal>

      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onSuccess={handleDeleteSuccess} account={account} />
    </>
  );
}
