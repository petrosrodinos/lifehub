import { useState } from "react"
import { Trash2, Pencil } from "lucide-react"
import type { ExpenseReceiptItem } from "../../../../../features/receipts/expense-receipt-item/interfaces/expense-receipt-item.interfaces"
import { useUpdateExpenseReceiptItem, useDeleteExpenseReceiptItem } from "../../../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import type { UpdateExpenseReceiptItemDto } from "../../../../../features/receipts/expense-receipt-item/interfaces/expense-receipt-item.interfaces"
import { ReceiptItemForm } from "./ReceiptItemForm"
import { Modal } from "../../../../../components/ui/Modal"
import { ConfirmationModal } from "../../../../../components/ui/ConfirmationModal"
import { formatReceiptAmount, parseNumericValue } from "../utils/receipt.utils"

type ReceiptItemCardProps = {
  item: ExpenseReceiptItem
  receiptUuid: string
}

export function ReceiptItemCard({ item, receiptUuid }: ReceiptItemCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const updateItem = useUpdateExpenseReceiptItem(receiptUuid)
  const deleteItem = useDeleteExpenseReceiptItem(receiptUuid)

  const handleUpdate = (data: { receipt_uuid: string; quantity?: number; unit_price: number; total_price: number; product_uuid?: string }) => {
    const updateData: UpdateExpenseReceiptItemDto = {
      quantity: data.quantity,
      unit_price: data.unit_price,
      total_price: data.total_price,
      product_uuid: data.product_uuid,
    }

    updateItem.mutate(
      { uuid: item.uuid, data: updateData },
      { onSuccess: () => setIsEditOpen(false) },
    )
  }

  const handleDelete = () => {
    deleteItem.mutate(item.uuid, {
      onSuccess: () => setIsDeleteOpen(false),
    })
  }

  const quantity = parseNumericValue(item.quantity)
  const totalPrice = formatReceiptAmount(item.total_price)
  const unitPrice = formatReceiptAmount(item.unit_price)

  return (
    <>
      <div className="py-2 px-2.5 sm:py-2.5 sm:px-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors group">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-white truncate">{item.product?.name}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-400 mt-0.5">
              <span>{quantity}x {unitPrice}</span>
            </div>
          </div>

          <span className="hidden sm:inline text-sm font-semibold text-white shrink-0">{totalPrice}</span>

          <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex sm:hidden items-center justify-between mt-1.5 pt-1.5 border-t border-slate-700/30">
          <span className="text-xs font-semibold text-white">{totalPrice}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Item">
        <ReceiptItemForm
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
          receiptUuid={receiptUuid}
          submitLabel="Save"
          isPending={updateItem.isPending}
          initialData={{
            product_uuid: item.product_uuid || "",
            quantity: parseNumericValue(item.quantity),
            unit_price: parseNumericValue(item.unit_price),
            total_price: parseNumericValue(item.total_price),
          }}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        description={`Are you sure you want to delete "${item.product?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteItem.isPending}
      />
    </>
  )
}
