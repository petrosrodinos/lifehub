import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../../../store/auth-store'
import { AccountsHeaderActionsDropdown } from './AccountsHeaderActionsDropdown'

type AccountsHeaderProps = {
  onCreateClick: () => void
  onCategoriesClick: () => void
  onTagsClick: () => void
}

export function AccountsHeader({ onCreateClick, onCategoriesClick, onTagsClick }: AccountsHeaderProps) {
  const showAccountBalances = useAuthStore((state) => state.showAccountBalances)
  const setShowAccountBalances = useAuthStore((state) => state.setShowAccountBalances)

  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[10px]">
          <h1 className="text-2xl font-semibold text-white">Accounts</h1>
          <button
            type="button"
            onClick={() => setShowAccountBalances(!showAccountBalances)}
            className="p-2.5 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-800/50 transition-colors"
            title={showAccountBalances ? 'Hide balances' : 'Show balances'}
          >
            {showAccountBalances ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-sm text-slate-500 mt-0.5">Manage your financial accounts</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <AccountsHeaderActionsDropdown onCreateClick={onCreateClick} onCategoriesClick={onCategoriesClick} onTagsClick={onTagsClick} />
      </div>
    </header>
  )
}
