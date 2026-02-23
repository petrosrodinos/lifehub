type ReceiptTabSwitcherProps = {
  activeTab: string
  onTabChange: (tab: 'manual' | 'upload') => void
}

const TABS = [
  { key: 'manual' as const, label: 'Manual entry' },
  { key: 'upload' as const, label: 'Receipt upload' },
] as const

export function ReceiptTabSwitcher({ activeTab, onTabChange }: ReceiptTabSwitcherProps) {
  return (
    <div className="flex gap-2 bg-slate-900/50 rounded-xl border border-slate-800/50 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab.key
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
