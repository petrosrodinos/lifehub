import { useDeleteExpenseStore } from "../../../../features/receipts/expense-store/hooks/use-expense-store"
import type { ExpenseStore } from "../../../../features/receipts/expense-store/interfaces/expense-store.interfaces"
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal"

type DeleteStoreModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  store: ExpenseStore
}

export function DeleteStoreModal({ isOpen, onClose, onSuccess, store }: DeleteStoreModalProps) {
  const deleteStore = useDeleteExpenseStore()

  const handleConfirm = () => {
    deleteStore.mutate(store.uuid, {
      onSuccess: () => {
        onClose()
        onSuccess?.()
      },
    })
  }

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Store"
      description={`Are you sure you want to delete "${store.name}"? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      isPending={deleteStore.isPending}
    />
  )
}
