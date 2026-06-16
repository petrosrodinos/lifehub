import { useExpenseAccountsBalance } from '../../../../features/expenses/expense-accounts/hooks/use-expense-accounts'
import { useAuthStore } from '../../../../store/auth-store'
import { formatAccountBalance } from '../../utils/format-account-balance'

export function TotalBalance() {
  const { data, isLoading } = useExpenseAccountsBalance()
  const showAccountBalances = useAuthStore((state) => state.showAccountBalances)
  const balance = formatAccountBalance(data?.balance ?? 0)

  return (
    <div>
      <p className="text-2xl font-semibold text-slate-400 mb-0.5">Balance</p>
      {isLoading ? (
        <div className="h-7 w-28 bg-slate-800/50 rounded animate-pulse" />
      ) : showAccountBalances ? (
        <p className={`text-xl font-semibold ${balance.isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
          {balance.formatted}
        </p>
      ) : (
        <p className="text-xl font-semibold text-slate-500">••••••</p>
      )}
    </div>
  )
}
