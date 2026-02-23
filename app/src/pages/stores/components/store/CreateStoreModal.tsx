import { useCreateExpenseStore } from "../../../../features/receipts/expense-store/hooks/use-expense-store"
import type { CreateExpenseStoreDto } from "../../../../features/receipts/expense-store/interfaces/expense-store.interfaces"
import { Modal } from "../../../../components/ui/Modal"
import { StoreForm } from "./StoreForm"

type CreateStoreModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateStoreModal({ isOpen, onClose }: CreateStoreModalProps) {
  const createStore = useCreateExpenseStore()

  const handleSubmit = (data: CreateExpenseStoreDto) => {
    createStore.mutate(data, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Store">
      <StoreForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createStore.isPending} />
    </Modal>
  )
}
