import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { AlertTriangle, CalendarRange, Clock3, PencilLine, Save } from 'lucide-react'
import type { UpdateActivityScheduleDto } from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'

type HabitScheduleCardProps = {
  selectedHabit: ActivityTodayItem | null
  isSaving: boolean
  onSave: (scheduleUuid: string, data: UpdateActivityScheduleDto) => Promise<void>
}

const repeatTypeLabels: Record<string, string> = {
  DAILY: 'Daily',
  WEEKDAYS: 'Weekdays',
  INTERVAL: 'Every N days',
  DATES: 'Specific dates',
  FREQUENCY: 'Frequency based',
}

function formatDate(value?: string | null) {
  if (!value) return '-'
  const parsed = DateTime.fromISO(value)
  if (!parsed.isValid) return '-'
  return parsed.toFormat('MMM d, yyyy')
}

export function HabitScheduleCard({ selectedHabit, isSaving, onSave }: HabitScheduleCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [repeatType, setRepeatType] = useState('DAILY')
  const [targetType, setTargetType] = useState<'BOOLEAN' | 'QUANTITY'>('BOOLEAN')
  const [targetValue, setTargetValue] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('')

  const schedule = selectedHabit?.schedule ?? null

  useEffect(() => {
    if (!schedule) return
    setRepeatType(schedule.repeat_type)
    setTargetType(schedule.target_type)
    setTargetValue(schedule.target_value ? String(schedule.target_value) : '')
    setTimeOfDay(schedule.time_of_day?.slice(0, 5) ?? '')
  }, [schedule])

  if (!selectedHabit || !schedule) {
    return (
      <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-white mb-2">Schedule</h3>
        <p className="text-sm text-slate-400">Select an activity to inspect schedule details.</p>
      </section>
    )
  }
  const activeSchedule = schedule

  async function handleSave() {
    const nextTargetValue = targetValue ? Number(targetValue) : undefined
    await onSave(activeSchedule.uuid, {
      repeat_type: repeatType as UpdateActivityScheduleDto['repeat_type'],
      target_type: targetType,
      target_value: nextTargetValue,
      time_of_day: timeOfDay ? `${timeOfDay}:00` : undefined,
    })
    setIsEditing(false)
  }

  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Schedule</h3>
        <button
          type="button"
          onClick={() => setIsEditing((value) => !value)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <PencilLine className="w-3.5 h-3.5" />
          Edit schedule
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-400 mb-1">Repeat rule</p>
          <p className="text-slate-100">{repeatTypeLabels[activeSchedule.repeat_type] ?? activeSchedule.repeat_type}</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-400 mb-1">Target</p>
          <p className="text-slate-100">
            {activeSchedule.target_type === 'BOOLEAN'
              ? 'Mark as done'
              : `${activeSchedule.target_value ?? 0} ${activeSchedule.target_unit_label ?? activeSchedule.target_unit?.toLowerCase() ?? 'units'}`}
          </p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-400 mb-1">Start date</p>
          <p className="text-slate-100">{formatDate(activeSchedule.valid_from)}</p>
        </div>
      </div>

      {isEditing ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Changes affect future occurrences only
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs text-slate-300 inline-flex items-center gap-1.5">
                <CalendarRange className="w-3.5 h-3.5" />
                Repeat type
              </span>
              <select
                value={repeatType}
                onChange={(event) => setRepeatType(event.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKDAYS">Weekdays</option>
                <option value="INTERVAL">Interval</option>
                <option value="DATES">Specific dates</option>
                <option value="FREQUENCY">Frequency</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-slate-300">Target type</span>
              <select
                value={targetType}
                onChange={(event) => setTargetType(event.target.value as 'BOOLEAN' | 'QUANTITY')}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="BOOLEAN">Boolean</option>
                <option value="QUANTITY">Quantity</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-slate-300">Target value</span>
              <input
                type="number"
                min="0"
                value={targetValue}
                onChange={(event) => setTargetValue(event.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-slate-300 inline-flex items-center gap-1.5">
                <Clock3 className="w-3.5 h-3.5" />
                Time of day
              </span>
              <input
                type="time"
                value={timeOfDay}
                onChange={(event) => setTimeOfDay(event.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </label>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm disabled:opacity-60 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save schedule
          </button>
        </div>
      ) : null}
    </section>
  )
}
