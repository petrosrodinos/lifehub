import { useCreateExpenseAccount } from "../../../../features/expense-accounts/hooks/use-expense-accounts";
import type { CreateExpenseAccountDto } from "../../../../features/expense-accounts/interfaces/expense-accounts.interfaces";
import { AccountForm } from "./AccountForm";
import { Modal } from "../../../../components/ui/Modal";

type CreateAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const createAccount = useCreateExpenseAccount();

  const handleSubmit = (data: CreateExpenseAccountDto) => {
    createAccount.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
      <AccountForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createAccount.isPending} />
    </Modal>
  );
}
