import { useDeleteExpenseReceipt } from "../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt"
import type { ExpenseReceipt } from "../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"
import { ConfirmationModal } from "../../../../../components/ui/ConfirmationModal"

type DeleteReceiptModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  receipt: ExpenseReceipt
}

export function DeleteReceiptModal({ isOpen, onClose, onSuccess, receipt }: DeleteReceiptModalProps) {
  const deleteReceipt = useDeleteExpenseReceipt()

  const handleConfirm = () => {
    deleteReceipt.mutate(receipt.uuid, {
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
      title="Delete Receipt"
      description={`Are you sure you want to delete this receipt? All associated items will also be deleted. This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      isPending={deleteReceipt.isPending}
    />
  )
}
