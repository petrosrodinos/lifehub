import { ACTIVITIES_STORAGE_KEY, type Activity } from '../config/activities.config'
import { DEFAULT_ACTIVITIES } from '../config/activities.config'
import {
  SCHEDULE_STORAGE_KEY,
  SCHEDULE_DAYS,
  DEFAULT_SCHEDULE,
  type ScheduleDay,
  type ScheduleSlot,
} from '../config/schedule.config'

export function loadActivities(): Activity[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY)
    if (!raw) return DEFAULT_ACTIVITIES
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return DEFAULT_ACTIVITIES
    const valid = parsed.filter(
      (a): a is Activity =>
        typeof a === 'object' &&
        a !== null &&
        typeof (a as Activity).id === 'string' &&
        typeof (a as Activity).name === 'string' &&
        typeof (a as Activity).color === 'string'
    )
    return valid.length > 0 ? valid : DEFAULT_ACTIVITIES
  } catch {
    return DEFAULT_ACTIVITIES
  }
}

export function saveActivities(activities: Activity[]): void {
  localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities))
}

function isValidSlot(value: unknown): value is ScheduleSlot {
  if (typeof value !== 'object' || value === null) return false
  const s = value as ScheduleSlot
  return (
    typeof s.start === 'string' &&
    /^\d{2}:\d{2}$/.test(s.start) &&
    typeof s.end === 'string' &&
    /^\d{2}:\d{2}$/.test(s.end) &&
    typeof s.label === 'string' &&
    s.label.length > 0
  )
}

export function loadSchedule(): Record<ScheduleDay, ScheduleSlot[]> {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY)
    if (!raw) return structuredClone(DEFAULT_SCHEDULE)
    const parsed = JSON.parse(raw) as unknown
    if (typeof parsed !== 'object' || parsed === null) return structuredClone(DEFAULT_SCHEDULE)
    const result = {} as Record<ScheduleDay, ScheduleSlot[]>
    for (const day of SCHEDULE_DAYS) {
      const daySlots = (parsed as Record<string, unknown>)[day]
      if (!Array.isArray(daySlots)) {
        result[day] = [...DEFAULT_SCHEDULE[day]]
        continue
      }
      result[day] = daySlots.filter(isValidSlot)
      if (result[day].length === 0) result[day] = [...DEFAULT_SCHEDULE[day]]
    }
    return result
  } catch {
    return structuredClone(DEFAULT_SCHEDULE)
  }
}

export function saveSchedule(schedule: Record<ScheduleDay, ScheduleSlot[]>): void {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule))
}
