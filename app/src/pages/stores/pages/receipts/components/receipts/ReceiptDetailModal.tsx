import { useState } from "react"
import { Trash2, Pencil, Plus, Receipt, Store, Calendar, ShoppingBag } from "lucide-react"
import type { ExpenseReceipt, CreateExpenseReceiptDto } from "../../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"
import { useUpdateExpenseReceipt } from "../../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt"
import { useExpenseReceiptItems } from "../../../../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import { useCreateExpenseReceiptItem } from "../../../../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import type { CreateExpenseReceiptItemDto } from "../../../../../../features/receipts/expense-receipt-item/interfaces/expense-receipt-item.interfaces"
import { Modal } from "../../../../../../components/ui/Modal"
import { DeleteReceiptModal } from "./DeleteReceiptModal"
import { ReceiptForm } from "./create-receipt/ReceiptForm"
import { formatReceiptDate, formatReceiptAmount, parseNumericValue } from "../../utils/receipt.utils"
import { ReceiptItemCard } from "./ReceiptItemCard"
import { ReceiptItemForm } from "./ReceiptItemForm"

type ReceiptDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  receipt: ExpenseReceipt
}

export function ReceiptDetailModal({ isOpen, onClose, receipt }: ReceiptDetailModalProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { data: items = [], isLoading: itemsLoading } = useExpenseReceiptItems(isOpen ? receipt.uuid : "")
  const createItem = useCreateExpenseReceiptItem()
  const updateReceipt = useUpdateExpenseReceipt()

  const handleAddItem = (data: CreateExpenseReceiptItemDto) => {
    createItem.mutate(data, {
      onSuccess: () => setIsAddItemOpen(false),
    })
  }

  const handleUpdateReceipt = (data: CreateExpenseReceiptDto) => {
    const { expense_entry_uuid: _, ...updateData } = data

    updateReceipt.mutate(
      { uuid: receipt.uuid, data: updateData },
      { onSuccess: () => setIsEditing(false) },
    )
  }

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false)
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditing ? "Edit Receipt" : "Receipt Details"}
        size="lg"
        scrollable
        headerActions={
          <div className="flex items-center gap-1">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        }
      >
        {isEditing ? (
          <ReceiptForm
            onSubmit={handleUpdateReceipt}
            onCancel={() => setIsEditing(false)}
            submitLabel="Save"
            isPending={updateReceipt.isPending}
            initialData={{
              expense_entry_uuid: receipt.expense_entry_uuid,
              store_uuid: receipt.store_uuid || "",
              receipt_date: receipt.receipt_date,
              total_amount: parseNumericValue(receipt.total_amount),
            }}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/40 rounded-lg">
                <Store className="w-4 h-4 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Store</p>
                  <p className="text-sm font-medium text-white">{receipt.store?.name || "No store"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/40 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="text-sm font-medium text-white">{formatReceiptDate(receipt.receipt_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/40 rounded-lg">
                <Receipt className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-sm font-semibold text-emerald-400">{formatReceiptAmount(receipt.total_amount)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/40 rounded-lg">
                <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Items</p>
                  <p className="text-sm font-medium text-white">{items.length}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Items</h3>
                <button
                  type="button"
                  onClick={() => setIsAddItemOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              {itemsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`item-skeleton-${i}`} className="h-14 bg-slate-800/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-500">No items yet. Add your first item.</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <ReceiptItemCard key={item.uuid} item={item} receiptUuid={receipt.uuid} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isAddItemOpen} onClose={() => setIsAddItemOpen(false)} title="Add Item">
        <ReceiptItemForm
          onSubmit={handleAddItem}
          onCancel={() => setIsAddItemOpen(false)}
          receiptUuid={receipt.uuid}
          submitLabel="Add"
          isPending={createItem.isPending}
        />
      </Modal>

      <DeleteReceiptModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
        receipt={receipt}
      />
    </>
  )
}
