import { X } from "lucide-react"
import type { ExpenseProduct } from "../../../../../features/receipts/expense-products/interfaces/expense-products.interfaces"

type PriceEvolutionFiltersProps = {
  products: ExpenseProduct[]
  isProductsLoading: boolean
  selectedProductUuid: string
  fromDate: string
  toDate: string
  onProductChange: (uuid: string) => void
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
  onClearDates: () => void
}

export function PriceEvolutionFilters({
  products,
  isProductsLoading,
  selectedProductUuid,
  fromDate,
  toDate,
  onProductChange,
  onFromDateChange,
  onToDateChange,
  onClearDates,
}: PriceEvolutionFiltersProps) {
  const hasDateFilters = fromDate || toDate

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <label
          htmlFor="product-filter"
          className="block text-xs font-medium text-slate-400 mb-1.5"
        >
          Product
        </label>

        <select
          id="product-filter"
          value={selectedProductUuid}
          onChange={(e) => onProductChange(e.target.value)}
          disabled={isProductsLoading}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all disabled:opacity-50"
        >
          <option value="">
            {isProductsLoading ? "Loading products..." : "Select a product"}
          </option>

          {products.map((product) => (
            <option key={product.uuid} value={product.uuid}>
              {product.name}
              {product.brand ? ` (${product.brand})` : ""}
              {product.size && product.unit
                ? ` — ${product.size}${product.unit}`
                : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
        <div>
          <label
            htmlFor="from-date-filter"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            From
          </label>

          <input
            id="from-date-filter"
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="to-date-filter"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            To
          </label>

          <input
            id="to-date-filter"
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
          />
        </div>

        {hasDateFilters && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={onClearDates}
              className="w-full sm:w-auto p-2.5 bg-slate-800/60 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              title="Clear date filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
