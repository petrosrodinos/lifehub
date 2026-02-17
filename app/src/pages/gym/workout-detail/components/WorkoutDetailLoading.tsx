export function WorkoutDetailLoading() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 animate-pulse">
        <div className="flex items-center justify-between gap-4">
          <div className="h-10 w-32 bg-slate-800/50 rounded" />
          <div className="h-10 w-24 bg-slate-800/50 rounded" />
        </div>

        <div className="bg-slate-900/50 rounded-xl border border-slate-800/80 p-6">
          <div className="h-8 w-48 bg-slate-800/50 rounded mb-4" />
          <div className="h-4 w-full bg-slate-800/50 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-800/50 rounded" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl border border-slate-800/80 p-6">
              <div className="h-6 w-40 bg-slate-800/50 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-20 bg-slate-800/50 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
