import { useState } from "react"
import { Receipt } from "lucide-react"
import type { ExpenseReceipt } from "../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"
import { ReceiptDetailModal } from "./ReceiptDetailModal"
import { formatReceiptDate, formatReceiptAmount, parseNumericValue } from "../utils/receipt.utils"

const MAX_VISIBLE_ITEMS = 4

type ReceiptCardProps = {
  receipt: ExpenseReceipt
}

export function ReceiptCard({ receipt }: ReceiptCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const items = receipt.items || []
  const itemCount = items.length
  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)
  const remainingCount = itemCount - MAX_VISIBLE_ITEMS

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDetailOpen(true)}
        className="w-full text-left bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg p-3 sm:p-4 transition-all duration-200"
      >
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-violet-500/15 rounded-lg shrink-0 mt-0.5 sm:mt-0">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-white truncate">
                  {receipt.store?.name || "Receipt"}
                </p>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-400 mt-0.5">
                  <span className="shrink-0">{formatReceiptDate(receipt.receipt_date)}</span>
                  <span>•</span>
                  <span className="shrink-0">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                </div>
              </div>

              <div className="text-sm sm:text-base font-semibold text-emerald-400 shrink-0">
                {formatReceiptAmount(receipt.total_amount)}
              </div>
            </div>
          </div>
        </div>

        {itemCount > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/50 space-y-1.5">
            {visibleItems.map((item) => (
              <div key={item.uuid} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] sm:text-xs text-slate-500 shrink-0">
                    {parseNumericValue(item.quantity)}x
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-300 truncate">
                    {item?.product?.name || "Unknown Product"}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-slate-400 shrink-0">
                  {formatReceiptAmount(item.total_price)}
                </span>
              </div>
            ))}
            {remainingCount > 0 && (
              <p className="text-[10px] sm:text-xs text-slate-500 text-center pt-0.5">
                +{remainingCount} more item{remainingCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}
      </button>

      <ReceiptDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        receipt={receipt}
      />
    </>
  )
}
