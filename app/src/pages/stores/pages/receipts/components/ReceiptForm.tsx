import { useState } from "react"
import { useExpenseStores } from "../../../../../features/receipts/expense-store/hooks/use-expense-store"
import { useExpenseEntries } from "../../../../../features/expenses/expense-entries/hooks/use-expense-entries"
import { useExpenseAccounts } from "../../../../../features/expenses/expense-accounts/hooks/use-expense-accounts"
import { useUploadReceipt } from "../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt"
import type { CreateExpenseReceiptDto } from "../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"

const RECEIPT_TABS = {
  MANUAL: "manual",
  UPLOAD: "upload",
} as const

type ReceiptTab = (typeof RECEIPT_TABS)[keyof typeof RECEIPT_TABS]

type ReceiptFormProps = {
  onSubmit: (data: CreateExpenseReceiptDto) => void
  onCancel: () => void
  submitLabel: string
  isPending?: boolean
  initialData?: {
    expense_entry_uuid?: string
    store_uuid?: string
    receipt_date?: string
    total_amount?: number
  }
  onUploadSuccess?: () => void
}

export function ReceiptForm({
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
  initialData,
  onUploadSuccess,
}: ReceiptFormProps) {
  const [activeTab, setActiveTab] = useState<ReceiptTab>(RECEIPT_TABS.MANUAL)
  const [expenseEntryUuid, setExpenseEntryUuid] = useState(initialData?.expense_entry_uuid || "")
  const [storeUuid, setStoreUuid] = useState(initialData?.store_uuid || "")
  const [receiptDate, setReceiptDate] = useState(initialData?.receipt_date?.slice(0, 10) || new Date().toISOString().slice(0, 10))
  const [totalAmount, setTotalAmount] = useState(initialData?.total_amount?.toString() || "")
  const [fromAccountUuid, setFromAccountUuid] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  const { data: stores = [] } = useExpenseStores()
  const { data: entriesData } = useExpenseEntries({ limit: 50 })
  const { data: accounts = [] } = useExpenseAccounts()
  const uploadReceipt = useUploadReceipt()

  const entries = entriesData?.data || []
  const isUploadPending = uploadReceipt.isPending
  const canSubmitUpload = fromAccountUuid && uploadFile

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!expenseEntryUuid || !totalAmount) return

    const payload: CreateExpenseReceiptDto = {
      expense_entry_uuid: expenseEntryUuid,
      total_amount: parseFloat(totalAmount),
      receipt_date: new Date(receiptDate).toISOString(),
    }

    if (storeUuid) {
      payload.store_uuid = storeUuid
    }

    onSubmit(payload)
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromAccountUuid || !uploadFile) return
    uploadReceipt.mutate(
      { file: uploadFile, from_account_uuid: fromAccountUuid },
      { onSuccess: onUploadSuccess }
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 bg-slate-900/50 rounded-xl border border-slate-800/50 p-1">
        <button
          type="button"
          onClick={() => setActiveTab(RECEIPT_TABS.MANUAL)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === RECEIPT_TABS.MANUAL
              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          Manual entry
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(RECEIPT_TABS.UPLOAD)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === RECEIPT_TABS.UPLOAD
              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          Receipt upload
        </button>
      </div>

      {activeTab === RECEIPT_TABS.MANUAL && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="receipt-entry" className="block text-sm font-semibold text-slate-300">
              Expense Entry
            </label>
            <select
              id="receipt-entry"
              value={expenseEntryUuid}
              onChange={(e) => setExpenseEntryUuid(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
              disabled={isPending || !!initialData?.expense_entry_uuid}
              required
            >
              <option value="">Select an expense entry</option>
              {entries.map((entry) => (
                <option key={entry.uuid} value={entry.uuid}>
                  {entry.description || entry.category?.name || "Entry"} — {typeof entry.amount === "string" ? parseFloat(entry.amount).toFixed(2) : Number(entry.amount).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="receipt-store" className="block text-sm font-semibold text-slate-300">
              Store <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <select
              id="receipt-store"
              value={storeUuid}
              onChange={(e) => setStoreUuid(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
              disabled={isPending}
            >
              <option value="">No store</option>
              {stores.map((store) => (
                <option key={store.uuid} value={store.uuid}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="receipt-date" className="block text-sm font-semibold text-slate-300">
                Receipt Date
              </label>
              <input
                id="receipt-date"
                type="date"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="receipt-total" className="block text-sm font-semibold text-slate-300">
                Total Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                <input
                  id="receipt-total"
                  type="number"
                  step="0.01"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                  disabled={isPending}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending || !expenseEntryUuid || !totalAmount}
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
      )}

      {activeTab === RECEIPT_TABS.UPLOAD && (
        <form onSubmit={handleUploadSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="upload-account" className="block text-sm font-semibold text-slate-300">
              Account
            </label>
            <select
              id="upload-account"
              value={fromAccountUuid}
              onChange={(e) => setFromAccountUuid(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
              disabled={isUploadPending}
              required
            >
              <option value="">Select an expense account</option>
              {accounts.map((account) => (
                <option key={account.uuid} value={account.uuid}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="upload-file" className="block text-sm font-semibold text-slate-300">
              Receipt file
            </label>
            <input
              id="upload-file"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white file:font-medium"
              disabled={isUploadPending}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isUploadPending || !canSubmitUpload}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploadPending && (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              Upload receipt
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isUploadPending}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
