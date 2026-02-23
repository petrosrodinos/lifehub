import { X } from "lucide-react"
import type { ExpenseStore } from "../../../../../features/receipts/expense-store/interfaces/expense-store.interfaces"

type PurchasedProductsFiltersProps = {
  stores: ExpenseStore[]
  isStoresLoading: boolean
  selectedStoreUuid: string
  fromDate: string
  toDate: string
  hasFilters: boolean
  onStoreChange: (uuid: string) => void
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
  onClearFilters: () => void
}

export function PurchasedProductsFilters({
  stores,
  isStoresLoading,
  selectedStoreUuid,
  fromDate,
  toDate,
  hasFilters,
  onStoreChange,
  onFromDateChange,
  onToDateChange,
  onClearFilters,
}: PurchasedProductsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <label
          htmlFor="store-filter"
          className="block text-xs font-medium text-slate-400 mb-1.5"
        >
          Store
        </label>

        <select
          id="store-filter"
          value={selectedStoreUuid}
          onChange={(e) => onStoreChange(e.target.value)}
          disabled={isStoresLoading}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all disabled:opacity-50"
        >
          <option value="">
            {isStoresLoading ? "Loading stores..." : "All stores"}
          </option>

          {stores.map((store) => (
            <option key={store.uuid} value={store.uuid}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
        <div>
          <label
            htmlFor="purchased-from-date"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            From
          </label>

          <input
            id="purchased-from-date"
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="purchased-to-date"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            To
          </label>

          <input
            id="purchased-to-date"
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
          />
        </div>

        {hasFilters && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={onClearFilters}
              className="w-full sm:w-auto p-2.5 bg-slate-800/60 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              title="Clear all filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
