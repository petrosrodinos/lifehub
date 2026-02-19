import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { HabitHistoryList } from './HabitHistoryList/HabitHistoryList'
import { useHabitsHistory } from './use-habits-history'

export function HabitsHistorySection() {
  const { groupedSelectedLogs } = useHabitsHistory()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="w-full flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left"
      >
        <span className="text-sm sm:text-base font-semibold">Habit History</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-300" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-300" />
        )}
      </button>
      {isExpanded ? <HabitHistoryList groupedLogs={groupedSelectedLogs} /> : null}
    </section>
  )
}
