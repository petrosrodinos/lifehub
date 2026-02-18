import { ActivityRepeatType, ActivitySchedule, ActivityScheduleDate, ActivityScheduleWeekday } from '@/generated/prisma'
import { DateTime } from 'luxon'
import { buildTimeOnDate, endOfDay, endOfMonth, endOfWeekIso, startOfDay, startOfMonth, startOfWeekIso, toDayKey } from './habit-date.utils'

type ScheduleWithOptions = ActivitySchedule & {
  weekdays: ActivityScheduleWeekday[]
  specific_dates: ActivityScheduleDate[]
}

export const generateOccurrencesForSchedule = (
  schedule: ScheduleWithOptions,
  rangeStart: Date,
  rangeEnd: Date,
): Date[] => {
  const start = startOfDay(rangeStart)
  const end = endOfDay(rangeEnd)

  if (schedule.repeat_type === ActivityRepeatType.DAILY) {
    return generateDaily(schedule, start, end)
  }
  if (schedule.repeat_type === ActivityRepeatType.WEEKDAYS) {
    return generateWeekdays(schedule, start, end)
  }
  if (schedule.repeat_type === ActivityRepeatType.INTERVAL) {
    return generateInterval(schedule, start, end)
  }
  if (schedule.repeat_type === ActivityRepeatType.DATES) {
    return generateSpecificDates(schedule, start, end)
  }
  return generateFrequency(schedule, start, end)
}

const generateDaily = (schedule: ScheduleWithOptions, start: Date, end: Date): Date[] => {
  const results: Date[] = []
  let cursor = DateTime.fromJSDate(start).startOf('day')
  const endDate = DateTime.fromJSDate(end).endOf('day')

  while (cursor <= endDate) {
    results.push(buildTimeOnDate(cursor.toJSDate(), schedule.time_of_day))
    cursor = cursor.plus({ days: 1 })
  }

  return results
}

const generateWeekdays = (schedule: ScheduleWithOptions, start: Date, end: Date): Date[] => {
  const allowedWeekdays = new Set(schedule.weekdays.map((day) => day.weekday))
  const results: Date[] = []
  let cursor = DateTime.fromJSDate(start).startOf('day')
  const endDate = DateTime.fromJSDate(end).endOf('day')

  while (cursor <= endDate) {
    if (allowedWeekdays.has(cursor.weekday)) {
      results.push(buildTimeOnDate(cursor.toJSDate(), schedule.time_of_day))
    }
    cursor = cursor.plus({ days: 1 })
  }

  return results
}

const generateInterval = (schedule: ScheduleWithOptions, start: Date, end: Date): Date[] => {
  const interval = Math.max(1, schedule.interval_days ?? 1)
  const results: Date[] = []
  const anchor = DateTime.fromJSDate(schedule.valid_from).startOf('day')
  let cursor = anchor
  const startDate = DateTime.fromJSDate(start).startOf('day')
  const endDate = DateTime.fromJSDate(end).endOf('day')

  while (cursor < startDate) {
    cursor = cursor.plus({ days: interval })
  }

  while (cursor <= endDate) {
    results.push(buildTimeOnDate(cursor.toJSDate(), schedule.time_of_day))
    cursor = cursor.plus({ days: interval })
  }

  return results
}

const generateSpecificDates = (schedule: ScheduleWithOptions, start: Date, end: Date): Date[] => {
  return schedule.specific_dates
    .map((entry) => entry.date)
    .filter((date) => date >= start && date <= end)
    .map((date) => buildTimeOnDate(date, schedule.time_of_day))
}

const generateFrequency = (schedule: ScheduleWithOptions, start: Date, end: Date): Date[] => {
  const frequency = Math.max(1, schedule.frequency_value ?? 1)
  const results: Date[] = []
  const seen = new Set<string>()
  let periodStart = DateTime.fromJSDate(start).startOf('day')
  const endDate = DateTime.fromJSDate(end).endOf('day')

  while (periodStart <= endDate) {
    const periodEnd = schedule.frequency_period === 'MONTH' ? DateTime.fromJSDate(endOfMonth(periodStart.toJSDate())) : DateTime.fromJSDate(endOfWeekIso(periodStart.toJSDate()))
    const scopedStart = periodStart < DateTime.fromJSDate(start) ? DateTime.fromJSDate(start) : periodStart
    const scopedEnd = periodEnd > endDate ? endDate : periodEnd
    const totalDays = Math.max(1, Math.floor(scopedEnd.diff(scopedStart, 'days').days) + 1)

    for (let index = 0; index < frequency; index += 1) {
      const dayOffset = Math.floor((index * totalDays) / frequency)
      const candidate = scopedStart.plus({ days: dayOffset })
      const key = toDayKey(candidate.toJSDate())
      if (!seen.has(key)) {
        seen.add(key)
        results.push(buildTimeOnDate(candidate.toJSDate(), schedule.time_of_day))
      }
    }

    periodStart =
      schedule.frequency_period === 'MONTH'
        ? DateTime.fromJSDate(startOfMonth(periodStart.plus({ months: 1 }).toJSDate()))
        : DateTime.fromJSDate(startOfWeekIso(periodStart.plus({ weeks: 1 }).toJSDate()))
  }

  return results
}
