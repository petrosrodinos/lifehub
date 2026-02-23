import { useCreateExpenseStore, useExpenseStores } from "../../../../features/receipts/expense-store/hooks/use-expense-store"
import type { CreateExpenseStoreDto } from "../../../../features/receipts/expense-store/interfaces/expense-store.interfaces"
import { Modal } from "../../../../components/ui/Modal"
import { StoreForm } from "./StoreForm"
import { StoreCard } from "./StoreCard"

type CreateStoreModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateStoreModal({ isOpen, onClose }: CreateStoreModalProps) {
  const createStore = useCreateExpenseStore()
  const { data: stores = [], isLoading } = useExpenseStores({ enabled: isOpen })

  const handleSubmit = (data: CreateExpenseStoreDto) => {
    createStore.mutate(data, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Store" scrollable size="lg">
      <div className="space-y-6">
        <StoreForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createStore.isPending} />
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Your stores</h3>
          {isLoading ? (
            <div className="text-sm text-slate-500 py-4">Loading stores…</div>
          ) : stores.length === 0 ? (
            <div className="text-sm text-slate-500 py-4">No stores yet. Create one above.</div>
          ) : (
            <ul className="space-y-2">
              {stores.map((store) => (
                <li key={store.uuid}>
                  <StoreCard store={store} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  )
}
