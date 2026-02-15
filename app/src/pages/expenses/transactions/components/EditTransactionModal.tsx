import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useUpdateExpenseEntry } from '../../../../features/expense-entries/hooks/use-expense-entries'
import type {
  ExpenseEntry,
  UpdateExpenseEntryDto,
  CreateExpenseEntryDto,
} from '../../../../features/expense-entries/interfaces/expense-entries.interfaces'
import { TransactionForm } from './TransactionForm'
import { DeleteTransactionModal } from './DeleteTransactionModal'

type EditTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  transaction: ExpenseEntry
}

export function EditTransactionModal({ isOpen, onClose, transaction }: EditTransactionModalProps) {
  const updateEntry = useUpdateExpenseEntry()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  if (!isOpen) return null

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
    }

    updateEntry.mutate(
      { uuid: transaction.uuid, data: updateData },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false)
    onClose()
  }

  const initialData: Partial<CreateExpenseEntryDto> = {
    type: transaction.type,
    amount: typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount,
    description: transaction.description,
    from_account_uuid: transaction.from_account_uuid,
    to_account_uuid: transaction.to_account_uuid,
    category_uuid: transaction.category_uuid,
    subcategory_uuid: transaction.subcategory_uuid,
    entry_date: transaction.entry_date,
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 overflow-y-auto">
        <div className="my-8">
          <div
            className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full"
            style={{
              animation: 'modalSlideIn 0.3s ease-out',
            }}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Edit Transaction</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <TransactionForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                submitLabel="Save Changes"
                isPending={updateEntry.isPending}
                initialData={initialData}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteTransactionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
        transaction={transaction}
      />

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
