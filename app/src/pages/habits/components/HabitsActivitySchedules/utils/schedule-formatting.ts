import { DateTime } from 'luxon'
import {
  ActivityRepeatTypes,
  ActivityTargetTypes,
  type ActivitySchedule,
} from '../../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { WEEKDAY_NAMES } from '../../../constants/schedule-options'

export function formatDate(value?: string | null) {
  if (!value) return '—'
  const parsed = DateTime.fromISO(value)
  return parsed.isValid ? parsed.toFormat('MMM d, yyyy') : '—'
}

export function formatTarget(schedule: ActivitySchedule) {
  if (schedule.target_type === ActivityTargetTypes.BOOLEAN) return 'Mark as done'
  return `${schedule.target_value ?? 0} ${schedule.target_unit_label ?? schedule.target_unit?.toLowerCase() ?? 'units'}`
}

export function formatRepeatDetail(schedule: ActivitySchedule) {
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
