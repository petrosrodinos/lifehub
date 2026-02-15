import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useUpdateExpenseAccount } from "../../../../features/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount, UpdateExpenseAccountDto } from "../../../../features/expense-accounts/interfaces/expense-accounts.interfaces";
import { AccountForm } from "./AccountForm";
import { DeleteAccountModal } from "./DeleteAccountModal";

type EditAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  account: ExpenseAccount;
};

export function EditAccountModal({ isOpen, onClose, account }: EditAccountModalProps) {
  const updateAccount = useUpdateExpenseAccount();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!isOpen) return null;

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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 overflow-y-auto">
        <div className="my-8">
          <div
            className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full"
            style={{
              animation: "modalSlideIn 0.3s ease-out",
            }}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Edit Account</h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleDeleteClick} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <AccountForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Save Changes" isPending={updateAccount.isPending} initialData={initialData} />
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onSuccess={handleDeleteSuccess} account={account} />

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
