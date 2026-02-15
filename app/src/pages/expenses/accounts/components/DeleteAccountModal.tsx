import { AlertTriangle, X } from 'lucide-react'
import { useDeleteExpenseAccount } from '../../../../features/expense-accounts/hooks/use-expense-accounts'
import type { ExpenseAccount } from '../../../../features/expense-accounts/interfaces/expense-accounts.interfaces'

type DeleteAccountModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  account: ExpenseAccount
}

export function DeleteAccountModal({ isOpen, onClose, onSuccess, account }: DeleteAccountModalProps) {
  const deleteAccount = useDeleteExpenseAccount()

  if (!isOpen) return null

  const handleConfirm = () => {
    deleteAccount.mutate(account.uuid, {
      onSuccess: () => {
        onClose()
        onSuccess?.()
      },
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[111] p-4 overflow-y-auto">
        <div className="my-8">
          <div
            className="bg-slate-900 rounded-2xl border border-red-900/50 shadow-2xl max-w-md w-full"
            style={{
              animation: 'modalSlideIn 0.3s ease-out',
            }}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Delete Account</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-slate-300">
                  Are you sure you want to delete <span className="font-semibold text-white">{account.name}</span>?
                </p>
                <p className="text-sm text-slate-400">
                  This action cannot be undone. All associated expense entries will be affected.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={deleteAccount.isPending}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteAccount.isPending ? 'Deleting...' : 'Delete Account'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={deleteAccount.isPending}
                  className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
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
  )
}
