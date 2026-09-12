import { useExpenseEntries } from '../../../../features/expenses/expense-entries/hooks/use-expense-entries'
import type { ExpenseEntry, ExpenseEntryType } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import { ExpenseEntryTypes } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import { formatAmount } from '../../utils/transaction'
import { TransactionCard } from './TransactionCard'
import { TransactionsLoading } from './TransactionsLoading'
import { TransactionsEmptyState } from './TransactionsEmptyState'
import { TransactionsPagination } from './TransactionsPagination'

const ITEMS_PER_PAGE = 10

type TransactionsListSectionProps = {
  selectedAccounts: string[]
  fromDate: string
  toDate: string
  type: ExpenseEntryType | ''
  categoryUuid: string
  subcategoryUuid: string
  currentPage: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  showQuickStats?: boolean
  hasVatOnly?: boolean
  onDuplicate?: (transaction: ExpenseEntry) => void
  onCreatePreset?: (transaction: ExpenseEntry) => void
  onTrackProduct?: (transaction: ExpenseEntry) => void
}

export function TransactionsListSection({
  selectedAccounts,
  fromDate,
  toDate,
  type,
  categoryUuid,
  subcategoryUuid,
  currentPage,
  onPageChange,
  itemsPerPage = ITEMS_PER_PAGE,
  showQuickStats = true,
  hasVatOnly = false,
  onDuplicate,
  onCreatePreset,
  onTrackProduct,
}: TransactionsListSectionProps) {
  const { data, isLoading } = useExpenseEntries({
    page: currentPage,
    limit: itemsPerPage,
    ...(type && { type }),
    ...(categoryUuid && { category_uuid: categoryUuid }),
    ...(subcategoryUuid && { subcategory_uuid: subcategoryUuid }),
    ...(selectedAccounts.length > 0 && { account_uuids: selectedAccounts.join(',') }),
    ...(fromDate && { from_date: fromDate }),
    ...(toDate && { to_date: toDate }),
    ...(hasVatOnly && { has_vat: true }),
  })

  const transactions = data?.data || []
  const pagination = data?.pagination
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1

  const totalIncome = transactions
    .filter((t) => t.type === ExpenseEntryTypes.INCOME)
    .reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
  const totalExpense = transactions
    .filter((t) => t.type === ExpenseEntryTypes.EXPENSE)
    .reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
  const net = totalIncome - totalExpense

  return (
    <div className="space-y-4">
      {showQuickStats && !isLoading && pagination && pagination.total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Transactions</p>
            <p className="text-sm font-semibold text-white">{pagination.total}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Income</p>
            <p className="text-sm font-semibold text-emerald-400">+{formatAmount(totalIncome)}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Expenses</p>
            <p className="text-sm font-semibold text-red-400">-{formatAmount(totalExpense)}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Net</p>
            <p className={`text-sm font-semibold ${net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {net >= 0 ? '+' : '-'}{formatAmount(Math.abs(net))}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <TransactionsLoading />
      ) : transactions.length === 0 ? (
        <TransactionsEmptyState />
      ) : (
        <>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.uuid}
                transaction={transaction}
                onDuplicate={onDuplicate}
                onCreatePreset={onCreatePreset}
                onTrackProduct={onTrackProduct}
                showVatDetails={hasVatOnly}
              />
            ))}
          </div>

          <TransactionsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  )
}
