import { useCreateExpenseReceipt } from "../../../../../features/expenses/expense-receipt/hooks/use-expense-receipt"
import type { CreateExpenseReceiptDto } from "../../../../../features/expenses/expense-receipt/interfaces/expense-receipt.interfaces"
import { ReceiptForm } from "./ReceiptForm"
import { Modal } from "../../../../../components/ui/Modal"

type CreateReceiptModalProps = {
  isOpen: boolean
  onClose: () => void
  storeUuid?: string
}

export function CreateReceiptModal({ isOpen, onClose, storeUuid }: CreateReceiptModalProps) {
  const createReceipt = useCreateExpenseReceipt()

  const handleSubmit = (data: CreateExpenseReceiptDto) => {
    createReceipt.mutate(data, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Receipt">
      <ReceiptForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Create"
        isPending={createReceipt.isPending}
        initialData={storeUuid ? { store_uuid: storeUuid } : undefined}
      />
    </Modal>
  )
}

