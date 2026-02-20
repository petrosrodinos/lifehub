function Bone({ className }: { className: string }) {
  return <div className={`rounded animate-pulse bg-slate-700/60 ${className}`} />
}

function ScheduleCardSkeletonItem() {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-3 sm:p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bone className="h-5 w-14" />
          <Bone className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Bone className="h-7 w-7" />
          <Bone className="h-7 w-7" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-4 sm:gap-y-2">
        <div className="space-y-1.5">
          <Bone className="h-3 w-12" />
          <Bone className="h-4 w-20" />
        </div>
        <div className="space-y-1.5">
          <Bone className="h-3 w-10" />
          <Bone className="h-4 w-24" />
        </div>
        <div className="space-y-1.5">
          <Bone className="h-3 w-8" />
          <Bone className="h-4 w-16" />
        </div>
        <div className="space-y-1.5">
          <Bone className="h-3 w-16" />
          <Bone className="h-4 w-20" />
          <Bone className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}

export function ScheduleCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ScheduleCardSkeletonItem key={i} />
      ))}
    </>
  )
}
