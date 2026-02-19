import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { AlertTriangle, CalendarDays, CalendarRange, Clock3, PencilLine, RepeatIcon, Save, Target, X } from "lucide-react";
import { ActivityRepeatTypes, ActivityTargetTypes, type ActivityTargetType, type UpdateActivityScheduleDto } from "../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface";
import type { ActivityRepeatType } from "../../../../features/routine/interfaces/routine.interface";
import { useHabitsSchedule } from "./use-habits-schedule";

const REPEAT_TYPE_LABELS: Record<string, string> = {
  DAILY: "Daily",
  WEEKDAYS: "Weekdays",
  INTERVAL: "Every N days",
  DATES: "Specific dates",
  FREQUENCY: "Frequency based",
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const parsed = DateTime.fromISO(value);
  if (!parsed.isValid) return "-";
  return parsed.toFormat("MMM d, yyyy");
}

function formatTarget(schedule: { target_type: string; target_value?: number | null; target_unit_label?: string | null; target_unit?: string | null } | null) {
  if (!schedule) return "-";
  if (schedule.target_type === ActivityTargetTypes.BOOLEAN) return "Mark as done";
  return `${schedule.target_value ?? 0} ${schedule.target_unit_label ?? schedule.target_unit?.toLowerCase() ?? "units"}`;
}

export function HabitsScheduleSection() {
  const { selectedHabit, isScheduleSaving, saveSchedule } = useHabitsSchedule();
  const [isEditing, setIsEditing] = useState(false);
  const [repeatType, setRepeatType] = useState<ActivityRepeatType>(ActivityRepeatTypes.DAILY);
  const [targetType, setTargetType] = useState<ActivityTargetType>(ActivityTargetTypes.BOOLEAN);
  const [targetValue, setTargetValue] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  const schedule = selectedHabit?.schedule ?? null;

  useEffect(() => {
    if (!schedule) return;
    setRepeatType(schedule.repeat_type);
    setTargetType(schedule.target_type as ActivityTargetType);
    setTargetValue(schedule.target_value ? String(schedule.target_value) : "");
    setTimeOfDay(schedule.time_of_day?.slice(0, 5) ?? "");
    setIsEditing(false);
  }, [schedule]);

  async function handleSave() {
    if (!schedule) return;
    const nextTargetValue = targetValue ? Number(targetValue) : undefined;
    await saveSchedule(schedule.uuid, {
      repeat_type: repeatType as UpdateActivityScheduleDto["repeat_type"],
      target_type: targetType,
      target_value: nextTargetValue,
      time_of_day: timeOfDay ? `${timeOfDay}:00` : undefined,
    });
    setIsEditing(false);
  }

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Schedule Summary</h3>
        {schedule ? (
          <button type="button" onClick={() => setIsEditing((v) => !v)} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${isEditing ? "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700" : "border-slate-600/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}>
            {isEditing ? <X className="w-3.5 h-3.5" /> : <PencilLine className="w-3.5 h-3.5" />}
            {isEditing ? "Cancel" : "Edit"}
          </button>
        ) : null}
      </div>

      {!selectedHabit || !schedule ? (
        <div className="px-4 sm:px-5 py-8 text-center">
          <CalendarDays className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Select an activity to view its schedule.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-700/30">
            <div className="bg-slate-900/60 px-4 py-3.5 flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
                <RepeatIcon className="w-3.5 h-3.5" />
                Repeat rule
              </p>
              <p className="text-sm font-medium text-slate-100">{REPEAT_TYPE_LABELS[schedule.repeat_type] ?? schedule.repeat_type}</p>
            </div>
            <div className="bg-slate-900/60 px-4 py-3.5 flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Target
              </p>
              <p className="text-sm font-medium text-slate-100">{formatTarget(schedule)}</p>
            </div>
            <div className="bg-slate-900/60 px-4 py-3.5 flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Start date
              </p>
              <p className="text-sm font-medium text-slate-100">{formatDate(schedule.valid_from)}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="px-4 sm:px-5 py-4 border-t border-slate-700/60 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Changes apply to future occurrences only
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 inline-flex items-center gap-1.5">
                    <CalendarRange className="w-3.5 h-3.5" />
                    Repeat type
                  </span>
                  <select value={repeatType} onChange={(event) => setRepeatType(event.target.value as ActivityRepeatType)} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500 transition-colors">
                    <option value={ActivityRepeatTypes.DAILY}>Daily</option>
                    <option value={ActivityRepeatTypes.WEEKDAYS}>Weekdays</option>
                    <option value={ActivityRepeatTypes.INTERVAL}>Interval</option>
                    <option value={ActivityRepeatTypes.DATES}>Specific dates</option>
                    <option value={ActivityRepeatTypes.FREQUENCY}>Frequency</option>
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 inline-flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Target type
                  </span>
                  <select value={targetType} onChange={(event) => setTargetType(event.target.value as "BOOLEAN" | "QUANTITY")} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500 transition-colors">
                    <option value={ActivityTargetTypes.BOOLEAN}>Boolean</option>
                    <option value={ActivityTargetTypes.QUANTITY}>Quantity</option>
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300">Target value</span>
                  <input type="number" min="0" value={targetValue} onChange={(event) => setTargetValue(event.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500 transition-colors" />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 inline-flex items-center gap-1.5">
                    <Clock3 className="w-3.5 h-3.5" />
                    Time of day
                  </span>
                  <input type="time" value={timeOfDay} onChange={(event) => setTimeOfDay(event.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-violet-500 transition-colors" />
                </label>
              </div>

              <button type="button" disabled={isScheduleSaving} onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium disabled:opacity-60 transition-colors">
                <Save className="w-4 h-4" />
                {isScheduleSaving ? "Saving…" : "Save schedule"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
