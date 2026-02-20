import { useState } from 'react'
import { AlertTriangle, Clock3, Loader2, Save, X } from 'lucide-react'
import {
  ActivityRepeatTypes,
  ActivityTargetTypes,
  FrequencyPeriods,
  type ActivityRepeatType,
  type ActivitySchedule,
  type ActivityTargetType,
  type FrequencyPeriod,
  type UpdateActivityScheduleDto,
} from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import {
  FREQUENCY_PERIOD_OPTIONS,
  REPEAT_TYPE_OPTIONS,
  TARGET_TYPE_OPTIONS,
} from '../../constants/schedule-options'

const INPUT_CLASS =
  'w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50'

type ScheduleEditFormProps = {
  schedule: ActivitySchedule
  onSave: (data: UpdateActivityScheduleDto) => void
  onCancel: () => void
  isPending: boolean
}

export function ScheduleEditForm({ schedule, onSave, onCancel, isPending }: ScheduleEditFormProps) {
  const [repeatType, setRepeatType] = useState<ActivityRepeatType>(schedule.repeat_type)
  const [targetType, setTargetType] = useState<ActivityTargetType>(schedule.target_type as ActivityTargetType)
  const [targetValue, setTargetValue] = useState(schedule.target_value ? String(schedule.target_value) : '')
  const [timeOfDay, setTimeOfDay] = useState(schedule.time_of_day?.slice(0, 5) ?? '')
  const [intervalDays, setIntervalDays] = useState(schedule.interval_days ? String(schedule.interval_days) : '')
  const [frequencyValue, setFrequencyValue] = useState(schedule.frequency_value ? String(schedule.frequency_value) : '')
  const [frequencyPeriod, setFrequencyPeriod] = useState<FrequencyPeriod>(
    (schedule.frequency_period as FrequencyPeriod) ?? FrequencyPeriods.WEEK,
  )

  function handleSave() {
    const dto: UpdateActivityScheduleDto = {
      repeat_type: repeatType,
      target_type: targetType,
      target_value: targetValue ? Number(targetValue) : undefined,
      time_of_day: timeOfDay ? `${timeOfDay}:00` : undefined,
      interval_days: repeatType === ActivityRepeatTypes.INTERVAL ? Number(intervalDays) : undefined,
      frequency_value: repeatType === ActivityRepeatTypes.FREQUENCY ? Number(frequencyValue) : undefined,
      frequency_period:
        repeatType === ActivityRepeatTypes.FREQUENCY
          ? (frequencyPeriod as UpdateActivityScheduleDto['frequency_period'])
          : undefined,
    }
    onSave(dto)
  }

  return (
    <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-3">
      <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        Changes create a new schedule version
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1">
          <span className="text-xs font-medium text-slate-400">Repeat type</span>
          <select value={repeatType} onChange={(e) => setRepeatType(e.target.value as ActivityRepeatType)} className={INPUT_CLASS} disabled={isPending}>
            {REPEAT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-medium text-slate-400">Target type</span>
          <select value={targetType} onChange={(e) => setTargetType(e.target.value as ActivityTargetType)} className={INPUT_CLASS} disabled={isPending}>
            {TARGET_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        {repeatType === ActivityRepeatTypes.INTERVAL && (
          <label className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Interval (days)</span>
            <input type="number" min="1" value={intervalDays} onChange={(e) => setIntervalDays(e.target.value)} className={INPUT_CLASS} disabled={isPending} />
          </label>
        )}

        {repeatType === ActivityRepeatTypes.FREQUENCY && (
          <>
            <label className="space-y-1">
              <span className="text-xs font-medium text-slate-400">Times</span>
              <input type="number" min="1" value={frequencyValue} onChange={(e) => setFrequencyValue(e.target.value)} className={INPUT_CLASS} disabled={isPending} />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-medium text-slate-400">Period</span>
              <select value={frequencyPeriod} onChange={(e) => setFrequencyPeriod(e.target.value as FrequencyPeriod)} className={INPUT_CLASS} disabled={isPending}>
                {FREQUENCY_PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </>
        )}

        {targetType === ActivityTargetTypes.QUANTITY && (
          <label className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Target value</span>
            <input type="number" min="0" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} className={INPUT_CLASS} disabled={isPending} />
          </label>
        )}

        <label className="space-y-1">
          <span className="text-xs font-medium text-slate-400 inline-flex items-center gap-1">
            <Clock3 className="w-3 h-3" />
            Time of day
          </span>
          <input type="time" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} className={INPUT_CLASS} disabled={isPending} />
        </label>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={handleSave} disabled={isPending} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium disabled:opacity-60 transition-colors">
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium disabled:opacity-60 transition-colors">
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </div>
  )
}
