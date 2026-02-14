export const SCHEDULE_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const

export type ScheduleDay = (typeof SCHEDULE_DAYS)[number]
