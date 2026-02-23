import { X } from "lucide-react"

type StorePurchasesFiltersProps = {
  fromDate: string
  toDate: string
  hasFilters: boolean
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
  onClearFilters: () => void
}

export function StorePurchasesFilters({
  fromDate,
  toDate,
  hasFilters,
  onFromDateChange,
  onToDateChange,
  onClearFilters,
}: StorePurchasesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 flex-1">
        <div>
          <label
            htmlFor="store-purchases-from-date"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            From
          </label>
          <input
            id="store-purchases-from-date"
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="store-purchases-to-date"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            To
          </label>
          <input
            id="store-purchases-to-date"
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
