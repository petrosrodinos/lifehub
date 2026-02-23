export function ReceiptsLoading() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`receipt-skeleton-${i}`}
          className="bg-slate-900/40 border border-slate-800/50 rounded-lg p-3 sm:p-4 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-slate-800/50 rounded" />
              <div className="h-2.5 w-48 bg-slate-800/50 rounded" />
            </div>
            <div className="h-4 w-16 bg-slate-800/50 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
