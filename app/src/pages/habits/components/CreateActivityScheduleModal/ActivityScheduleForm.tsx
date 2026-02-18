import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ActivityRepeatTypes, ActivityTargetTypes, ActivityTargetUnits, FrequencyPeriods, type ActivityRepeatType, type ActivityTargetType, type ActivityTargetUnit, type CreateActivityScheduleDto, type FrequencyPeriod } from "../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface";
import type { Activity } from "../../../../features/activities/interfaces/activities.interface";
import { REPEAT_TYPE_OPTIONS, TARGET_TYPE_OPTIONS, TARGET_UNIT_OPTIONS, FREQUENCY_PERIOD_OPTIONS, WEEKDAY_OPTIONS } from "../../constants/schedule-options";

type ActivityScheduleFormProps = {
  activities: Activity[];
  onSubmit: (activityUuid: string, data: CreateActivityScheduleDto) => void;
  onCancel: () => void;
  isPending: boolean;
};

const INPUT_CLASS = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all";

export function ActivityScheduleForm({ activities, onSubmit, onCancel, isPending }: ActivityScheduleFormProps) {
  const [activityUuid, setActivityUuid] = useState("");
  const [repeatType, setRepeatType] = useState<ActivityRepeatType>(ActivityRepeatTypes.DAILY);
  const [intervalDays, setIntervalDays] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [frequencyValue, setFrequencyValue] = useState("");
  const [frequencyPeriod, setFrequencyPeriod] = useState<FrequencyPeriod>(FrequencyPeriods.WEEK);
  const [targetType, setTargetType] = useState<ActivityTargetType>(ActivityTargetTypes.BOOLEAN);
  const [targetValue, setTargetValue] = useState("");
  const [targetUnit, setTargetUnit] = useState<ActivityTargetUnit>(ActivityTargetUnits.MINUTES);
  const [targetUnitLabel, setTargetUnitLabel] = useState("");

  const isFormValid = activityUuid.length > 0 && (repeatType !== ActivityRepeatTypes.WEEKDAYS || weekdays.length > 0) && (repeatType !== ActivityRepeatTypes.INTERVAL || Number(intervalDays) > 0) && (repeatType !== ActivityRepeatTypes.FREQUENCY || Number(frequencyValue) > 0) && (targetType !== ActivityTargetTypes.QUANTITY || Number(targetValue) > 0);

  function toggleWeekday(day: number) {
    setWeekdays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const data: CreateActivityScheduleDto = {
      repeat_type: repeatType,
      target_type: targetType,
    };

    if (timeOfDay) data.time_of_day = `${timeOfDay}:00`;
    if (repeatType === ActivityRepeatTypes.INTERVAL) data.interval_days = Number(intervalDays);
    if (repeatType === ActivityRepeatTypes.WEEKDAYS) data.weekdays = weekdays;
    if (repeatType === ActivityRepeatTypes.FREQUENCY) {
      data.frequency_value = Number(frequencyValue);
      data.frequency_period = frequencyPeriod;
    }
    if (targetType === ActivityTargetTypes.QUANTITY) {
      data.target_value = Number(targetValue);
      data.target_unit = targetUnit;
      if (targetUnit === ActivityTargetUnits.CUSTOM && targetUnitLabel.trim()) {
        data.target_unit_label = targetUnitLabel.trim();
      }
    }

    onSubmit(activityUuid, data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="activity" className="block text-sm font-semibold text-slate-300">
          Activity
        </label>
        <select id="activity" value={activityUuid} onChange={(e) => setActivityUuid(e.target.value)} className={INPUT_CLASS} disabled={isPending} required>
          <option value="">Select an activity</option>
          {activities.map((activity) => (
            <option key={activity.uuid} value={activity.uuid}>
              {activity.icon ? `${activity.icon} ` : ""}
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="repeatType" className="block text-sm font-semibold text-slate-300">
          Repeat Type
        </label>
        <select id="repeatType" value={repeatType} onChange={(e) => setRepeatType(e.target.value as ActivityRepeatType)} className={INPUT_CLASS} disabled={isPending}>
          {REPEAT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {repeatType === ActivityRepeatTypes.WEEKDAYS && (
        <div className="space-y-2">
          <span className="block text-sm font-semibold text-slate-300">Weekdays</span>
          <div className="flex flex-wrap gap-2">
            {WEEKDAY_OPTIONS.map((day) => {
              const active = weekdays.includes(day.value);
              return (
                <button key={day.value} type="button" onClick={() => toggleWeekday(day.value)} disabled={isPending} className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${active ? "bg-violet-600 border-violet-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"} disabled:opacity-50`}>
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {repeatType === ActivityRepeatTypes.INTERVAL && (
        <div className="space-y-2">
          <label htmlFor="intervalDays" className="block text-sm font-semibold text-slate-300">
            Interval (days)
          </label>
          <input id="intervalDays" type="number" min="1" value={intervalDays} onChange={(e) => setIntervalDays(e.target.value)} placeholder="e.g., 2" className={INPUT_CLASS} disabled={isPending} required />
        </div>
      )}

      {repeatType === ActivityRepeatTypes.FREQUENCY && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label htmlFor="frequencyValue" className="block text-sm font-semibold text-slate-300">
              Times
            </label>
            <input id="frequencyValue" type="number" min="1" value={frequencyValue} onChange={(e) => setFrequencyValue(e.target.value)} placeholder="e.g., 3" className={INPUT_CLASS} disabled={isPending} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="frequencyPeriod" className="block text-sm font-semibold text-slate-300">
              Period
            </label>
            <select id="frequencyPeriod" value={frequencyPeriod} onChange={(e) => setFrequencyPeriod(e.target.value as FrequencyPeriod)} className={INPUT_CLASS} disabled={isPending}>
              {FREQUENCY_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="timeOfDay" className="block text-sm font-semibold text-slate-300">
          Time of Day
        </label>
        <input id="timeOfDay" type="time" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} className={INPUT_CLASS} disabled={isPending} />
      </div>

      <div className="space-y-2">
        <label htmlFor="targetType" className="block text-sm font-semibold text-slate-300">
          Target Type
        </label>
        <select id="targetType" value={targetType} onChange={(e) => setTargetType(e.target.value as ActivityTargetType)} className={INPUT_CLASS} disabled={isPending}>
          {TARGET_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {targetType === ActivityTargetTypes.QUANTITY && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label htmlFor="targetValue" className="block text-sm font-semibold text-slate-300">
              Target Value
            </label>
            <input id="targetValue" type="number" min="1" step="any" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} placeholder="e.g., 30" className={INPUT_CLASS} disabled={isPending} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="targetUnit" className="block text-sm font-semibold text-slate-300">
              Unit
            </label>
            <select id="targetUnit" value={targetUnit} onChange={(e) => setTargetUnit(e.target.value as ActivityTargetUnit)} className={INPUT_CLASS} disabled={isPending}>
              {TARGET_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {targetType === ActivityTargetTypes.QUANTITY && targetUnit === ActivityTargetUnits.CUSTOM && (
        <div className="space-y-2">
          <label htmlFor="targetUnitLabel" className="block text-sm font-semibold text-slate-300">
            Custom Unit Label
          </label>
          <input id="targetUnitLabel" type="text" value={targetUnitLabel} onChange={(e) => setTargetUnitLabel(e.target.value)} placeholder="e.g., laps" className={INPUT_CLASS} disabled={isPending} />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending || !isFormValid} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          Create Schedule
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
