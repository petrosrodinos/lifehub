import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useExpenseEntries } from '../../../../features/expenses/expense-entries/hooks/use-expense-entries'
import type { ExpenseEntryType } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import { ExpenseEntryTypes } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import { useTransactionsPage } from '../hooks/use-transactions-page'
import { AccountFilters } from '../../analytics/components/account-overview/AccountFilters'
import { formatAmount } from '../../utils/transaction'
import { CreateTransactionModal } from './CreateTransactionModal'
import { TransactionCard } from './TransactionCard'
import { TransactionsLoading } from './TransactionsLoading'
import { TransactionsEmptyState } from './TransactionsEmptyState'
import { TransactionsPagination } from './TransactionsPagination'

const ITEMS_PER_PAGE = 10

export function TransactionsSection() {
  const { isCreateModalOpen, openCreateModal, closeCreateModal, currentPage, setCurrentPage } =
    useTransactionsPage()

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [type, setType] = useState<ExpenseEntryType | ''>('')
  const [categoryUuid, setCategoryUuid] = useState('')
  const [subcategoryUuid, setSubcategoryUuid] = useState('')

  const handleFilterChange = (setter: (v: any) => void) => (v: any) => {
    setter(v)
    setCurrentPage(1)
  }

  const { data, isLoading } = useExpenseEntries({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    ...(type && { type }),
    ...(categoryUuid && { category_uuid: categoryUuid }),
    ...(subcategoryUuid && { subcategory_uuid: subcategoryUuid }),
    ...(selectedAccounts.length === 1 && { from_account_uuid: selectedAccounts[0] }),
    ...(fromDate && { from_date: fromDate }),
    ...(toDate && { to_date: toDate }),
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
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 sm:px-4 px-2 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        </div>

        <AccountFilters
          selectedAccounts={selectedAccounts}
          onAccountsChange={handleFilterChange(setSelectedAccounts)}
          fromDate={fromDate}
          onFromDateChange={handleFilterChange(setFromDate)}
          toDate={toDate}
          onToDateChange={handleFilterChange(setToDate)}
          type={type}
          onTypeChange={handleFilterChange(setType)}
          categoryUuid={categoryUuid}
          onCategoryChange={handleFilterChange(setCategoryUuid)}
          subcategoryUuid={subcategoryUuid}
          onSubcategoryChange={handleFilterChange(setSubcategoryUuid)}
        />

        {!isLoading && pagination && pagination.total > 0 && (
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
                <TransactionCard key={transaction.uuid} transaction={transaction} />
              ))}
            </div>

            <TransactionsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
            />
          </>
        )}
      </div>

      <CreateTransactionModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </>
  )
}
