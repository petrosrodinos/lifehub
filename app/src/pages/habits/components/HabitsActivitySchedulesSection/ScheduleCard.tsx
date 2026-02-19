import { CalendarDays, CheckCircle2, ChevronUp, Clock3, PencilLine, RepeatIcon, Target, Trash2 } from 'lucide-react'
import { DateTime } from 'luxon'
import { ActivityRepeatTypes, ActivityTargetTypes, type ActivitySchedule, type UpdateActivityScheduleDto } from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { REPEAT_LABELS, WEEKDAY_NAMES } from '../../constants/schedule-options'
import { ScheduleEditForm } from './ScheduleEditForm'

function formatDate(value?: string | null) {
  if (!value) return '—'
  const parsed = DateTime.fromISO(value)
  return parsed.isValid ? parsed.toFormat('MMM d, yyyy') : '—'
}

function formatTarget(schedule: ActivitySchedule) {
  if (schedule.target_type === ActivityTargetTypes.BOOLEAN) return 'Mark as done'
  return `${schedule.target_value ?? 0} ${schedule.target_unit_label ?? schedule.target_unit?.toLowerCase() ?? 'units'}`
}

function formatRepeatDetail(schedule: ActivitySchedule) {
  if (schedule.repeat_type === ActivityRepeatTypes.INTERVAL) {
    return `every ${schedule.interval_days} day${(schedule.interval_days ?? 1) > 1 ? 's' : ''}`
  }
  if (schedule.repeat_type === ActivityRepeatTypes.WEEKDAYS && schedule.weekdays?.length) {
    return schedule.weekdays.map((w) => WEEKDAY_NAMES[w.weekday]).join(', ')
  }
  if (schedule.repeat_type === ActivityRepeatTypes.FREQUENCY) {
    return `${schedule.frequency_value}x per ${schedule.frequency_period?.toLowerCase() ?? ''}`
  }
  return null
}

type StatCellProps = {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string | null
}

function StatCell({ icon, label, value, sub }: StatCellProps) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="text-slate-500 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-xs sm:text-sm text-slate-200 font-medium truncate">{value}</p>
        {sub && <p className="text-[11px] text-slate-400 truncate">{sub}</p>}
      </div>
    </div>
  )
}

type ScheduleCardProps = {
  schedule: ActivitySchedule
  isEditOpen: boolean
  onToggleEdit: () => void
  onSave: (data: UpdateActivityScheduleDto) => void
  onDelete: () => void
  isUpdating: boolean
}

export function ScheduleCard({ schedule, isEditOpen, onToggleEdit, onSave, onDelete, isUpdating }: ScheduleCardProps) {
  const repeatDetail = formatRepeatDetail(schedule)

  return (
    <div className={`rounded-xl border p-3 sm:p-4 transition-colors ${schedule.is_active ? 'border-violet-500/40 bg-violet-500/5' : 'border-slate-700/50 bg-slate-800/40'}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {schedule.is_active ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          ) : (
            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-700/60 text-slate-400 border border-slate-600/40 shrink-0">
              Inactive
            </span>
          )}
          {schedule.activity && (
            <span className="text-xs text-slate-400 truncate">
              {schedule.activity.icon ? `${schedule.activity.icon} ` : ''}{schedule.activity.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={onToggleEdit}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            title="Edit schedule"
          >
            {isEditOpen ? <ChevronUp className="w-4 h-4" /> : <PencilLine className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Deactivate schedule"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-4 sm:gap-y-2">
        <StatCell
          icon={<RepeatIcon className="w-3.5 h-3.5" />}
          label="Repeat"
          value={REPEAT_LABELS[schedule.repeat_type] ?? schedule.repeat_type}
          sub={repeatDetail}
        />
        <StatCell
          icon={<Target className="w-3.5 h-3.5" />}
          label="Target"
          value={formatTarget(schedule)}
        />
        {schedule.time_of_day && (
          <StatCell
            icon={<Clock3 className="w-3.5 h-3.5" />}
            label="Time"
            value={schedule.time_of_day.slice(0, 5)}
          />
        )}
        <StatCell
          icon={<CalendarDays className="w-3.5 h-3.5" />}
          label="Active from"
          value={formatDate(schedule.valid_from)}
          sub={schedule.valid_until ? `until ${formatDate(schedule.valid_until)}` : null}
        />
      </div>

      {isEditOpen && (
        <ScheduleEditForm
          schedule={schedule}
          onSave={onSave}
          onCancel={onToggleEdit}
          isPending={isUpdating}
        />
      )}
    </div>
  )
}
