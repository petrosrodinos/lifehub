import { Plus } from 'lucide-react'
import { useExpenseEntries } from '../../../../features/expense-entries/hooks/use-expense-entries'
import { useTransactionsPage } from '../hooks/use-transactions-page'
import { CreateTransactionModal } from './CreateTransactionModal'
import { TransactionCard } from './TransactionCard'
import { TransactionsLoading } from './TransactionsLoading'
import { TransactionsEmptyState } from './TransactionsEmptyState'
import { TransactionsPagination } from './TransactionsPagination'

const ITEMS_PER_PAGE = 10

export function TransactionsSection() {
  const { isCreateModalOpen, openCreateModal, closeCreateModal, currentPage, setCurrentPage } =
    useTransactionsPage()

  const { data, isLoading } = useExpenseEntries({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  const transactions = data?.data || []
  const pagination = data?.pagination
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1

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
