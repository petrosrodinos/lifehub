import { BarChart3, CalendarDays, Gauge, TrendingUp } from 'lucide-react'
import { useHabitsProgress } from './use-habits-progress'

function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

export function HabitsProgressSection() {
  const { progressSummary } = useHabitsProgress()
  const hasFrequency = progressSummary.frequencySuccessRate !== null
  const gridClass = hasFrequency ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Progress Summary</h3>
        <BarChart3 className="w-4 h-4 text-violet-400" />
      </div>

      <div className={`grid ${gridClass} gap-px bg-slate-700/30`}>
        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            7 days
          </p>
          <p className="text-2xl font-bold tabular-nums text-emerald-300">{formatPercent(progressSummary.completionRate7d)}</p>
          <p className="text-[11px] text-slate-500">completion rate</p>
        </div>

        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            30 days
          </p>
          <p className="text-2xl font-bold tabular-nums text-violet-300">{formatPercent(progressSummary.completionRate30d)}</p>
          <p className="text-[11px] text-slate-500">completion rate</p>
        </div>

        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            Quantity
          </p>
          <p className="text-2xl font-bold tabular-nums text-slate-100">{progressSummary.quantityTotal30d}</p>
          <p className="text-[11px] text-slate-500">total last 30d</p>
        </div>

        {hasFrequency ? (
          <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
            <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              Frequency
            </p>
            <p className="text-2xl font-bold tabular-nums text-cyan-300">{formatPercent(progressSummary.frequencySuccessRate as number)}</p>
            <p className="text-[11px] text-slate-500">target success rate</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
