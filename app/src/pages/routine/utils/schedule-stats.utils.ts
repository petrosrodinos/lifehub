import { SCHEDULE_DAYS, type ScheduleDay, type ScheduleSlot } from '../config/schedule.config'
import { slotDurationMinutes } from './time.utils'

export type ActivityMinutes = {
  name: string
  value: number
  color: string
  minutes?: number
}

export type ColorMap = Record<string, string>

export type ScheduleMap = Record<ScheduleDay, ScheduleSlot[]>

const DEFAULT_COLOR = '#64748b'

function getActivityColor(name: string, colorMap: ColorMap): string {
  return colorMap[name.toLowerCase()] ?? DEFAULT_COLOR
}

function parseActivityMinutes(slot: ScheduleSlot): Array<{ name: string; minutes: number }> {
  const duration = slotDurationMinutes(slot.start, slot.end)
  const labels = slot.label.split(',').map((l) => l.trim().toLowerCase())
  const minutesPerLabel = duration / labels.length

  return labels.map((name) => ({ name, minutes: minutesPerLabel }))
}

export function getDayActivityStats(
  day: ScheduleDay,
  colorMap: ColorMap,
  schedule: ScheduleMap
): ActivityMinutes[] {
  const slots = schedule[day] ?? []
  const totals: Record<string, number> = {}

  for (const slot of slots) {
    const parts = parseActivityMinutes(slot)
    for (const { name, minutes } of parts) {
      totals[name] = (totals[name] ?? 0) + minutes
    }
  }

  return Object.entries(totals)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: getActivityColor(name, colorMap),
    }))
    .sort((a, b) => b.value - a.value)
}

export function getWeekActivityStats(
  colorMap: ColorMap,
  schedule: ScheduleMap
): ActivityMinutes[] {
  const totals: Record<string, number> = {}

  for (const day of SCHEDULE_DAYS) {
    const dayStats = getDayActivityStats(day, colorMap, schedule)
    for (const { name, value } of dayStats) {
      totals[name] = (totals[name] ?? 0) + value
    }
  }

  return Object.entries(totals)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
      color: getActivityColor(name, colorMap),
    }))
    .sort((a, b) => b.value - a.value)
}

export function formatMinutesToHours(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

const MINUTES_PER_DAY = 24 * 60

export function toPercentageData(
  data: ActivityMinutes[],
  totalMinutes: number
): ActivityMinutes[] {
  const total = totalMinutes || 1
  const scheduled = data.reduce((sum, d) => sum + d.value, 0)
  const unscheduled = Math.max(0, total - scheduled)

  const result: ActivityMinutes[] = data.map((d) => ({
    ...d,
    value: Math.round((d.value / total) * 1000) / 10,
    minutes: d.value,
  }))

  if (unscheduled > 0) {
    result.push({
      name: 'unscheduled',
      value: Math.round((unscheduled / total) * 1000) / 10,
      color: '#334155',
      minutes: unscheduled,
    })
  }

  return result.sort((a, b) => b.value - a.value)
}

export function getDayTotalMinutes(): number {
  return MINUTES_PER_DAY
}

export function getWeekTotalMinutes(): number {
  return SCHEDULE_DAYS.length * MINUTES_PER_DAY
}
