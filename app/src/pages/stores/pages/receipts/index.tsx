import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Plus, ArrowLeft } from "lucide-react"
import { useExpenseReceipts } from "../../../../features/expenses/expense-receipt/hooks/use-expense-receipt"
import { useExpenseStore } from "../../../../features/expenses/expense-store/hooks/use-expense-store"
import { ReceiptCard } from "./components/ReceiptCard"
import { ReceiptsLoading } from "./components/ReceiptsLoading"
import { CreateReceiptModal } from "./components/CreateReceiptModal"

export function ReceiptsPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data: store } = useExpenseStore(uuid || "")
  const { data: allReceipts = [], isLoading } = useExpenseReceipts()

  const receipts = uuid
    ? allReceipts.filter((r) => r.store_uuid === uuid)
    : allReceipts

  const handleBack = () => {
    navigate("/dashboard/stores")
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-white truncate">
                {store?.name || "Receipts"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {receipts.length} receipt{receipts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 sm:px-4 px-2 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Receipt</span>
          </button>
        </header>

        {isLoading ? (
          <ReceiptsLoading />
        ) : receipts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500">No receipts yet for this store.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.uuid} receipt={receipt} />
            ))}
          </div>
        )}
      </div>

      <CreateReceiptModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        storeUuid={uuid}
      />
    </div>
  )
}
