import { Receipt } from 'lucide-react'

export function TransactionsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg p-12 text-center">
        <div className="inline-flex p-4 bg-slate-800/30 rounded-xl mb-4">
          <Receipt className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-medium text-slate-300 mb-2">No Transactions Yet</h3>
        <p className="text-sm text-slate-500">
          Transactions will appear here once you start tracking your expenses
        </p>
      </div>
    </div>
  )
}
