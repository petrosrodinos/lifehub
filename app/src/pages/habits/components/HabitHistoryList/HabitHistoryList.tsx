import { useMemo, useState } from 'react'
import { CalendarClock, CheckCircle2, CircleX, FileText, MinusCircle } from 'lucide-react'
import { DateTime } from 'luxon'
import type { GroupedActivityLogs } from '../../interfaces/habbits-tab.interface'

type HabitHistoryListProps = {
  groupedLogs: GroupedActivityLogs[]
}

const PAGE_SIZE = 8

function statusIcon(completed: boolean, skipped: boolean) {
  if (completed) return <CheckCircle2 className="w-4 h-4 text-emerald-300" />
  if (skipped) return <MinusCircle className="w-4 h-4 text-amber-300" />
  return <CircleX className="w-4 h-4 text-rose-300" />
}

function formatQuantity(value?: number | null) {
  if (value === null || value === undefined) return '-'
  return String(value)
}

export function HabitHistoryList({ groupedLogs }: HabitHistoryListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const flattenedLogs = useMemo(
    () =>
      groupedLogs.flatMap((group) =>
        group.logs.map((log) => ({
          date: group.date,
          log,
        })),
      ),
    [groupedLogs],
  )

  const visibleLogs = flattenedLogs.slice(0, visibleCount)
  const hasMore = visibleCount < flattenedLogs.length

  if (flattenedLogs.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5">
        <header className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-white">History</h3>
          <CalendarClock className="w-4 h-4 text-slate-400" />
        </header>
        <p className="text-sm text-slate-400">No history yet for this activity.</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">History</h3>
        <CalendarClock className="w-4 h-4 text-violet-300" />
      </header>

      <div className="space-y-2">
        {visibleLogs.map(({ date, log }) => (
          <div key={log.uuid} className="rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-300">{DateTime.fromISO(date).toFormat('EEE, MMM d')}</p>
              <div className="inline-flex items-center gap-2 text-xs">
                {statusIcon(log.completed, log.skipped)}
                <span className="text-slate-300">{formatQuantity(log.value)}</span>
                {log.notes ? <FileText className="w-3.5 h-3.5 text-slate-400" /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          className="w-full py-2.5 rounded-xl border border-slate-700/70 text-sm text-slate-200 hover:bg-slate-800 transition-colors"
        >
          View more
        </button>
      ) : null}
    </section>
  )
}
