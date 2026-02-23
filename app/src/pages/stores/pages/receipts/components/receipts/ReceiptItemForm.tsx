import { useState } from "react"
import type { CreateExpenseReceiptItemDto } from "../../../../../../features/receipts/expense-receipt-item/interfaces/expense-receipt-item.interfaces"
import { useExpenseProducts } from "../../../../../../features/receipts/expense-products/hooks/use-expense-products"

type ReceiptItemFormProps = {
  onSubmit: (data: CreateExpenseReceiptItemDto) => void
  onCancel: () => void
  receiptUuid: string
  submitLabel: string
  isPending?: boolean
  initialData?: {
    product_uuid?: string
    quantity?: number
    unit_price?: number
    total_price?: number
  }
}

export function ReceiptItemForm({
  onSubmit,
  onCancel,
  receiptUuid,
  submitLabel,
  isPending = false,
  initialData,
}: ReceiptItemFormProps) {
  const [productUuid, setProductUuid] = useState(initialData?.product_uuid || "")
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "1")
  const [unitPrice, setUnitPrice] = useState(initialData?.unit_price?.toString() || "")
  const [totalPrice, setTotalPrice] = useState(initialData?.total_price?.toString() || "")

  const { data: products = [] } = useExpenseProducts()

  const selectedProduct = products.find((p) => p.uuid === productUuid)

  const handleUnitPriceChange = (value: string) => {
    setUnitPrice(value)

    const qty = parseFloat(quantity) || 1
    const price = parseFloat(value) || 0

    setTotalPrice((qty * price).toFixed(2))
  }

  const handleQuantityChange = (value: string) => {
    setQuantity(value)

    const qty = parseFloat(value) || 1
    const price = parseFloat(unitPrice) || 0

    setTotalPrice((qty * price).toFixed(2))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!productUuid || !selectedProduct || !unitPrice || !totalPrice) return

    const payload: CreateExpenseReceiptItemDto = {
      receipt_uuid: receiptUuid,
      product_uuid: productUuid,
      quantity: parseFloat(quantity) || 1,
      unit_price: parseFloat(unitPrice),
      total_price: parseFloat(totalPrice),
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="item-product" className="block text-sm font-semibold text-slate-300">
          Product
        </label>
        <select
          id="item-product"
          value={productUuid}
          onChange={(e) => setProductUuid(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
          disabled={isPending}
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.uuid} value={product.uuid}>
              {product.name}{product.brand ? ` – ${product.brand}` : ""}{product.size ? ` (${product.size}${product.unit || ""})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label htmlFor="item-quantity" className="block text-sm font-semibold text-slate-300">
            Qty
          </label>
          <input
            id="item-quantity"
            type="number"
            step="0.01"
            min="0.01"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="item-unit-price" className="block text-sm font-semibold text-slate-300">
            Unit Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              id="item-unit-price"
              type="number"
              step="0.01"
              value={unitPrice}
              onChange={(e) => handleUnitPriceChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
              disabled={isPending}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="item-total" className="block text-sm font-semibold text-slate-300">
            Total
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              id="item-total"
              type="number"
              step="0.01"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
              disabled={isPending}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending || !productUuid || !unitPrice || !totalPrice}
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
