import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useUpdateExpenseStore } from "../../../../features/receipts/expense-store/hooks/use-expense-store"
import type {
  ExpenseStore,
  UpdateExpenseStoreDto,
} from "../../../../features/receipts/expense-store/interfaces/expense-store.interfaces"
import { StoreForm } from "./StoreForm"
import { DeleteStoreModal } from "./DeleteStoreModal"
import { Modal } from "../../../../components/ui/Modal"

type EditStoreModalProps = {
  isOpen: boolean
  onClose: () => void
  store: ExpenseStore
}

export function EditStoreModal({ isOpen, onClose, store }: EditStoreModalProps) {
  const updateStore = useUpdateExpenseStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleSubmit = (data: UpdateExpenseStoreDto) => {
    updateStore.mutate(
      { uuid: store.uuid, data },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false)
    onClose()
  }

  const initialData = {
    name: store.name,
  }

  const isUserOwned = !!store.user_uuid

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Store"
        headerActions={
          isUserOwned ? (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          ) : undefined
        }
      >
        {isUserOwned ? (
          <StoreForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            submitLabel="Save"
            isPending={updateStore.isPending}
            initialData={initialData}
          />
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-slate-400">Platform stores cannot be edited.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {isUserOwned && (
        <DeleteStoreModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={handleDeleteSuccess}
          store={store}
        />
      )}
    </>
  )
}
