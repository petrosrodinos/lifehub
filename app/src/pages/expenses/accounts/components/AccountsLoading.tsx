export function AccountsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/40 border border-slate-800/50 rounded-lg p-3 animate-pulse"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800/50" />
            <div className="flex-1">
              <div className="h-3 w-20 bg-slate-800/50 rounded" />
            </div>
          </div>
          <div className="h-5 w-24 bg-slate-800/50 rounded" />
        </div>
      ))}
    </div>
  )
}
