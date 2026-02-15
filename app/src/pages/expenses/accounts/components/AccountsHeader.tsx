import { Plus } from 'lucide-react'

type AccountsHeaderProps = {
  onCreateClick: () => void
}

export function AccountsHeader({ onCreateClick }: AccountsHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">Accounts</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your financial accounts</p>
      </div>
      <button
        type="button"
        onClick={onCreateClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
        New
      </button>
    </header>
  )
}
