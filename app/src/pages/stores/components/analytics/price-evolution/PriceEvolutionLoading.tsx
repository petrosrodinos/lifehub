export function PriceEvolutionLoading() {
  return (
    <div className="h-[350px] w-full flex flex-col justify-end gap-2 p-4">
      <div className="flex items-end gap-1 h-full">
        <SkeletonBar height="45%" />

        <SkeletonBar height="60%" delay="delay-100" />

        <SkeletonBar height="35%" delay="delay-200" />

        <SkeletonBar height="75%" delay="delay-300" />

        <SkeletonBar height="50%" delay="delay-100" />

        <SkeletonBar height="85%" delay="delay-200" />

        <SkeletonBar height="55%" delay="delay-300" />

        <SkeletonBar height="70%" delay="delay-100" />

        <SkeletonBar height="40%" delay="delay-200" />

        <SkeletonBar height="65%" delay="delay-300" />

        <SkeletonBar height="80%" delay="delay-100" />

        <SkeletonBar height="50%" delay="delay-200" />
      </div>

      <div className="flex justify-between pt-2 border-t border-slate-800/50">
        <div className="h-3 w-12 bg-slate-800/80 rounded animate-pulse" />

        <div className="h-3 w-12 bg-slate-800/80 rounded animate-pulse delay-100" />

        <div className="h-3 w-12 bg-slate-800/80 rounded animate-pulse delay-200" />

        <div className="h-3 w-12 bg-slate-800/80 rounded animate-pulse delay-300" />
      </div>
    </div>
  )
}

type SkeletonBarProps = {
  height: string
  delay?: string
}

function SkeletonBar({ height, delay = "" }: SkeletonBarProps) {
  return (
    <div
      className={`flex-1 bg-slate-800/60 rounded-t-md animate-pulse ${delay}`}
      style={{ height }}
    />
  )
}
