import { useState } from 'react'
import { Flame, Plus } from 'lucide-react'
import { ActivityScheduleForm } from '../HabitsActivitySchedulesSection/ActivityScheduleForm'
import { HabitsActivitySchedulesSection } from '../HabitsActivitySchedulesSection'
import { useHabitsHeader } from './use-habits-header'

export function HabitsHeader() {
  const { dateLabel, completedToday, totalToday, overview } = useHabitsHeader()
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false)

  return (
    <>
      <header className="rounded-2xl border border-slate-700/60 bg-slate-900/65 backdrop-blur-sm px-4 sm:px-5 py-4">
        <p className="text-xs sm:text-sm text-slate-300">{dateLabel}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight truncate">Habbits</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {completedToday} of {totalToday} completed
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCreateScheduleOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-200 text-xs xs:text-sm hover:bg-emerald-500/20 transition-colors"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline">Schedule</span>
            </button>
            <HabitsActivitySchedulesSection />
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-xl border border-violet-500/35 bg-violet-500/10 text-violet-200 text-xs xs:text-sm">
              <Flame className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline whitespace-nowrap">{overview?.best_streak_activity?.current_streak ?? 0} day streak</span>
              <span className="xs:hidden font-semibold">{overview?.best_streak_activity?.current_streak ?? 0}d</span>
            </div>
          </div>
        </div>
      </header>

      <ActivityScheduleForm
        isOpen={isCreateScheduleOpen}
        onClose={() => setIsCreateScheduleOpen(false)}
      />
    </>
  )
}
