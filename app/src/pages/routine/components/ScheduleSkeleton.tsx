export function ScheduleSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <div className="h-8 w-64 bg-slate-800/50 rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-slate-800/50 rounded animate-pulse" />
        </header>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col min-w-[140px] flex-1">
              <div className="h-5 w-24 bg-slate-800/50 rounded animate-pulse mb-3 mx-auto" />
              <div className="relative flex-1 min-h-[320px] bg-slate-800/30 rounded-xl border border-slate-700/50 p-2 space-y-2">
                <div className="h-16 bg-slate-700/50 rounded-lg animate-pulse" />
                <div className="h-24 bg-slate-700/50 rounded-lg animate-pulse" />
                <div className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-7 w-20 bg-slate-800/50 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-slate-800/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-48 bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-800/50 rounded animate-pulse" />
        </header>

        <section className="mb-16">
          <div className="h-6 w-32 bg-slate-800/50 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-5 w-24 bg-slate-800/50 rounded animate-pulse mb-3" />
                <div className="w-[220px] h-[220px] rounded-full bg-slate-800/30 animate-pulse" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="h-6 w-32 bg-slate-800/50 rounded animate-pulse mb-6" />
          <div className="max-w-md mx-auto">
            <div className="w-full h-[320px] rounded-full bg-slate-800/30 animate-pulse" />
          </div>
        </section>
      </div>
    </div>
  )
}
