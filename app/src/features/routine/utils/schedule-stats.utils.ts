import type { ScheduleDay, ScheduleSlot } from '../../../features/routine/interfaces/routine.interface'
import { SCHEDULE_DAYS } from '../../../features/routine/interfaces/routine.interface'
import { slotDurationMinutes } from '../../../pages/routine/utils/time.utils'

export type ActivityMinutes = {
  name: string
  value: number
  color: string
  minutes?: number
}

export type ColorMap = Record<string, string>

const DEFAULT_COLOR = '#64748b'

function parseActivityMinutes(slot: ScheduleSlot): Array<{ name: string; minutes: number; color: string }> {
  const duration = slotDurationMinutes(slot.start_time, slot.end_time)
  const name = slot.activity?.name ?? 'unknown'
  const color = slot.activity?.color ?? DEFAULT_COLOR

  return [{ name: name.toLowerCase(), minutes: duration, color }]
}

export function getDayActivityStats(
  day: ScheduleDay,
  slots: ScheduleSlot[]
): ActivityMinutes[] {
  const daySlots = slots.filter(slot => slot.day === day)
  const totals: Record<string, { minutes: number; color: string }> = {}

  for (const slot of daySlots) {
    const parts = parseActivityMinutes(slot)
    for (const { name, minutes, color } of parts) {
      if (!totals[name]) {
        totals[name] = { minutes: 0, color }
      }
      totals[name].minutes += minutes
    }
  }

  return Object.entries(totals)
    .filter(([, data]) => data.minutes > 0)
    .map(([name, data]) => ({
      name,
      value: Math.round(data.minutes),
      color: data.color,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getWeekActivityStats(slots: ScheduleSlot[]): ActivityMinutes[] {
  const totals: Record<string, { minutes: number; color: string }> = {}

  for (const slot of slots) {
    const parts = parseActivityMinutes(slot)
    for (const { name, minutes, color } of parts) {
      if (!totals[name]) {
        totals[name] = { minutes: 0, color }
      }
      totals[name].minutes += minutes
    }
  }

  return Object.entries(totals)
    .filter(([, data]) => data.minutes > 0)
    .map(([name, data]) => ({
      name,
      value: Math.round(data.minutes),
      color: data.color,
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
