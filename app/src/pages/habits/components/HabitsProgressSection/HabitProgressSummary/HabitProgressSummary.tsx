import { BarChart3, CalendarDays, Gauge, TrendingUp } from 'lucide-react'
import type { ActivityProgressSummaryData } from '../../../interfaces/habbits-tab.interface'

type HabitProgressSummaryProps = {
  progress: ActivityProgressSummaryData
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

export function HabitProgressSummary({ progress }: HabitProgressSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Progress Summary</h3>
        <BarChart3 className="w-4 h-4 text-violet-300" />
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            7 days
          </p>
          <p className="text-lg font-semibold text-emerald-300">{formatPercent(progress.completionRate7d)}</p>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            30 days
          </p>
          <p className="text-lg font-semibold text-violet-300">{formatPercent(progress.completionRate30d)}</p>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            Quantity total
          </p>
          <p className="text-lg font-semibold text-slate-100">{progress.quantityTotal30d}</p>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            Frequency success
          </p>
          <p className="text-lg font-semibold text-cyan-300">
            {progress.frequencySuccessRate === null ? 'N/A' : formatPercent(progress.frequencySuccessRate)}
          </p>
        </div>
      </div>
    </section>
  )
}
