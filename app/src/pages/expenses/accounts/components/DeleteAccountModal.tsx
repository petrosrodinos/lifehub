import { useDeleteExpenseAccount } from "../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount } from "../../../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import { useAuthStore } from "../../../../store/auth-store";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  account: ExpenseAccount;
};

export function DeleteAccountModal({ isOpen, onClose, onSuccess, account }: DeleteAccountModalProps) {
  const deleteAccount = useDeleteExpenseAccount();
  const defaultAccountUuid = useAuthStore((state) => state.defaultAccountUuid);
  const setDefaultAccountUuid = useAuthStore((state) => state.setDefaultAccountUuid);

  const handleConfirm = () => {
    deleteAccount.mutate(account.uuid, {
      onSuccess: () => {
        if (defaultAccountUuid === account.uuid) {
          setDefaultAccountUuid(null);
        }
        onClose();
        onSuccess?.();
      },
    });
  };

  return <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} title="Delete Account" description={`Are you sure you want to delete "${account.name}"? All associated expense entries will be affected. This action cannot be undone.`} confirmText="Delete" cancelText="Cancel" variant="danger" isPending={deleteAccount.isPending} />;
}
