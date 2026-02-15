export function StatsCardSkeleton() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 bg-slate-800 rounded" />
        <div className="h-8 bg-slate-800 rounded w-32" />
      </div>
      <div className="h-4 bg-slate-800 rounded w-24" />
    </div>
  );
}
