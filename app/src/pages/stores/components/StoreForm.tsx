import { useState } from "react"
import type {
  CreateExpenseStoreDto,
  UpdateExpenseStoreDto,
} from "../../../features/receipts/expense-store/interfaces/expense-store.interfaces"

type StoreFormProps<T extends CreateExpenseStoreDto | UpdateExpenseStoreDto> = {
  onSubmit: (data: T) => void
  onCancel: () => void
  submitLabel: string
  isPending?: boolean
  initialData?: {
    name?: string
  }
}

export function StoreForm<T extends CreateExpenseStoreDto | UpdateExpenseStoreDto>({
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
  initialData,
}: StoreFormProps<T>) {
  const [name, setName] = useState(initialData?.name || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) return

    onSubmit({ name: trimmedName } as T)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="store-name" className="block text-sm font-semibold text-slate-300">
          Store Name
        </label>
        <input
          id="store-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Lidl, Kaufland, Amazon"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
          autoFocus
          disabled={isPending}
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending || !name.trim()}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
