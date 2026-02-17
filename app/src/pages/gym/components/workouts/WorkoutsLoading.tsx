export function WorkoutsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="h-5 w-32 bg-slate-800/50 rounded mb-2" />
              <div className="h-4 w-full bg-slate-800/50 rounded" />
            </div>
            <div className="w-5 h-5 bg-slate-800/50 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-slate-800/50 rounded" />
            <div className="h-4 w-16 bg-slate-800/50 rounded" />
            <div className="h-4 w-14 bg-slate-800/50 rounded" />
          </div>
          <div className="h-3 w-16 bg-slate-800/50 rounded mt-2" />
        </div>
      ))}
    </div>
  );
}
