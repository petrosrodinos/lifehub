export function ChartSkeleton() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 animate-pulse">
      <div className="h-6 bg-slate-800 rounded w-48 mb-4" />
      <div className="h-[300px] bg-slate-800/50 rounded" />
    </div>
  );
}
