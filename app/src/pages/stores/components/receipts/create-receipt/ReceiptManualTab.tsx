import type { ExpenseEntry } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import type { ExpenseStore } from "../../../../../features/receipts/expense-store/interfaces/expense-store.interfaces";

type ReceiptManualTabProps = {
  expenseEntryUuid: string;
  storeUuid: string;
  receiptDate: string;
  totalAmount: string;
  entries: ExpenseEntry[];
  stores: ExpenseStore[];
  isPending: boolean;
  isEntryDisabled: boolean;
  submitLabel: string;
  onExpenseEntryChange: (value: string) => void;
  onStoreChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export function ReceiptManualTab({ expenseEntryUuid, storeUuid, receiptDate, totalAmount, entries, stores, isPending, isEntryDisabled, submitLabel, onExpenseEntryChange, onStoreChange, onDateChange, onAmountChange, onSubmit, onCancel }: ReceiptManualTabProps) {
  const isSubmitDisabled = isPending || !expenseEntryUuid || !totalAmount;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="receipt-entry" className="block text-sm font-semibold text-slate-300">
          Expense Entry
        </label>

        <select id="receipt-entry" value={expenseEntryUuid} onChange={(e) => onExpenseEntryChange(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending || isEntryDisabled} required>
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

        <select id="receipt-store" value={storeUuid} onChange={(e) => onStoreChange(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending}>
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

          <input id="receipt-date" type="date" value={receiptDate} onChange={(e) => onDateChange(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} />
        </div>

        <div className="space-y-2">
          <label htmlFor="receipt-total" className="block text-sm font-semibold text-slate-300">
            Total Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>

            <input id="receipt-total" type="number" step="0.01" value={totalAmount} onChange={(e) => onAmountChange(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} required />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitDisabled} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitLabel}
        </button>

        <button type="button" onClick={onCancel} disabled={isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
