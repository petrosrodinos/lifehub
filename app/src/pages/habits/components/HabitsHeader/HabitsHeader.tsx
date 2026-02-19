import { useState } from 'react'
import { Flame, Plus } from 'lucide-react'
import { CreateActivityScheduleModal } from './CreateActivityScheduleModal/CreateActivityScheduleModal'
import { useHabitsHeader } from './use-habits-header'

export function HabitsHeader() {
  const { dateLabel, completedToday, totalToday, overview } = useHabitsHeader()
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false)

  return (
    <>
      <header className="rounded-2xl border border-slate-700/60 bg-slate-900/65 backdrop-blur-sm px-4 sm:px-5 py-4">
        <p className="text-xs sm:text-sm text-slate-300">{dateLabel}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Habbits</h1>
            <p className="text-sm text-slate-300 mt-1">
              {completedToday} of {totalToday} completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreateScheduleOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-200 text-xs sm:text-sm hover:bg-emerald-500/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-violet-500/35 bg-violet-500/10 text-violet-200 text-xs sm:text-sm">
              <Flame className="w-4 h-4" />
              <span>{overview?.best_streak_activity?.current_streak ?? 0} day streak</span>
            </div>
          </div>
        </div>
      </header>

      <CreateActivityScheduleModal
        isOpen={isCreateScheduleOpen}
        onClose={() => setIsCreateScheduleOpen(false)}
      />
    </>
  )
}
