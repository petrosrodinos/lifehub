import { DateTime } from 'luxon'

export const getDateRangeByPreset = (preset: '7d' | '30d' | '90d' | '1y'): { start: Date; end: Date } => {
  const end = DateTime.now().endOf('day')
  const start =
    preset === '7d'
      ? end.minus({ days: 6 }).startOf('day')
      : preset === '30d'
        ? end.minus({ days: 29 }).startOf('day')
        : preset === '90d'
          ? end.minus({ days: 89 }).startOf('day')
          : end.minus({ years: 1 }).plus({ days: 1 }).startOf('day')

  return { start: start.toJSDate(), end: end.toJSDate() }
}

export const buildTimeOnDate = (date: Date, timeOfDay?: string | null): Date => {
  const safeTime = timeOfDay ?? '00:00'
  const [hourRaw, minuteRaw] = safeTime.split(':')
  const hour = Number(hourRaw)
  const minute = Number(minuteRaw)

  return DateTime.fromJSDate(date)
    .set({ hour: Number.isFinite(hour) ? hour : 0, minute: Number.isFinite(minute) ? minute : 0, second: 0, millisecond: 0 })
    .toJSDate()
}

export const toDayKey = (date: Date): string => DateTime.fromJSDate(date).toISODate() ?? ''

export const startOfDay = (date: Date): Date => DateTime.fromJSDate(date).startOf('day').toJSDate()

export const endOfDay = (date: Date): Date => DateTime.fromJSDate(date).endOf('day').toJSDate()

export const startOfWeekIso = (date: Date): Date => DateTime.fromJSDate(date).startOf('week').toJSDate()

export const endOfWeekIso = (date: Date): Date => DateTime.fromJSDate(date).endOf('week').toJSDate()

export const startOfMonth = (date: Date): Date => DateTime.fromJSDate(date).startOf('month').toJSDate()

export const endOfMonth = (date: Date): Date => DateTime.fromJSDate(date).endOf('month').toJSDate()
