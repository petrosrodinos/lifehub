import { X } from "lucide-react";
import { useCreateExpenseAccount } from "../../../../features/expense-accounts/hooks/use-expense-accounts";
import type { CreateExpenseAccountDto } from "../../../../features/expense-accounts/interfaces/expense-accounts.interfaces";
import { AccountForm } from "./AccountForm";

type CreateAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const createAccount = useCreateExpenseAccount();

  if (!isOpen) return null;

  const handleSubmit = (data: CreateExpenseAccountDto) => {
    createAccount.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
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
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <AccountForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create Account" isPending={createAccount.isPending} />
            </div>
          </div>
        </div>
      </div>

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
