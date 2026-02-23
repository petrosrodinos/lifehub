import { useExpenseAccounts } from '../../../../features/expenses/expense-accounts/hooks/use-expense-accounts'
import { AccountCard } from './AccountCard'
import { AccountsLoading } from './AccountsLoading'

export function AccountsList() {
  const { data: accounts = [], isLoading } = useExpenseAccounts()

  if (isLoading) {
    return <AccountsLoading />
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-slate-500">No accounts yet. Create your first account to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {accounts.map((account) => (
        <AccountCard key={account.uuid} account={account} />
      ))}
    </div>
  )
}
