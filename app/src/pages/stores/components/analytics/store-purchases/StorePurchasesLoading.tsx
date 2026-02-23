export function StorePurchasesLoading() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="relative w-[260px] h-[260px]">
        <div className="absolute inset-0 rounded-full border-[32px] border-slate-800/60 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-slate-700/40 border-r-slate-700/40 animate-pulse delay-100" />
        <div className="absolute inset-[32px] rounded-full bg-slate-950/50" />
        <div className="absolute inset-[32px] flex items-center justify-center">
          <div className="h-4 w-16 bg-slate-800/60 rounded animate-pulse delay-200" />
        </div>
      </div>
    </div>
  )
}
