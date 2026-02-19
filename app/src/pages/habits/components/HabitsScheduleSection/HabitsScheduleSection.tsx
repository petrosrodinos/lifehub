import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { HabitScheduleCard } from './HabitScheduleCard/HabitScheduleCard'
import { useHabitsSchedule } from './use-habits-schedule'

export function HabitsScheduleSection() {
  const { selectedHabit, isScheduleSaving, saveSchedule } = useHabitsSchedule()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="w-full flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left"
      >
        <span className="text-sm sm:text-base font-semibold">Schedule Summary</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-300" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-300" />
        )}
      </button>
      {isExpanded ? (
        <HabitScheduleCard
          selectedHabit={selectedHabit}
          isSaving={isScheduleSaving}
          onSave={saveSchedule}
        />
      ) : null}
    </section>
  )
}
