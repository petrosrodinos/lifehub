export function ExerciseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6">
        <div className="h-5 w-36 bg-slate-800 rounded animate-pulse" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 animate-pulse" />
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-slate-800/60 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
            <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 flex-1 bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-12 flex-1 bg-slate-800 rounded-xl animate-pulse" />
          </div>
          <div className="h-11 w-full bg-slate-800 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-900/60 rounded-xl border border-slate-800/80 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
