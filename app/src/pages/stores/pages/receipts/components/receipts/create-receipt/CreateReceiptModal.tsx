import { useCreateExpenseReceipt } from "../../../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt"
import type { CreateExpenseReceiptDto } from "../../../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"
import { Modal } from "../../../../../../../components/ui/Modal"
import { ReceiptForm } from "./ReceiptForm"

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
        onUploadSuccess={onClose}
      />
    </Modal>
  )
}

