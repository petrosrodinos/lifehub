import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Store, Globe, Pencil } from "lucide-react"
import type { ExpenseStore } from "../../../features/receipts/expense-store/interfaces/expense-store.interfaces"
import { EditStoreModal } from "./EditStoreModal"

type StoreCardProps = {
  store: ExpenseStore
}

export function StoreCard({ store }: StoreCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const navigate = useNavigate()

  const isPlatformStore = !store.user_uuid

  const handleCardClick = () => {
    navigate(`/dashboard/stores/${store.uuid}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditModalOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCardClick}
        className="w-full text-left bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg p-3 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0 group-hover:bg-violet-500/25 transition-colors">
            <Store className="w-4 h-4 text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">{store.name}</h3>
          </div>
          {isPlatformStore && (
            <span title="Platform store">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </span>
          )}
          <button
            type="button"
            onClick={handleEditClick}
            className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </button>

      <EditStoreModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        store={store}
      />
    </>
  )
}
