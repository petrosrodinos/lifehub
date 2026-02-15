export function TransactionsLoading() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-slate-900/40 border border-slate-800/50 rounded-lg p-4 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800/50 rounded-lg shrink-0" />

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-slate-800/50 rounded w-32" />
                <div className="h-3 bg-slate-800/50 rounded w-20" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 bg-slate-800/50 rounded w-24" />
                <div className="h-3 bg-slate-800/50 rounded w-16" />
              </div>
            </div>

            <div className="h-5 bg-slate-800/50 rounded w-20 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  )
}
