export const SCHEDULE_STORAGE_KEY = 'tracker-schedule' as const

export const SCHEDULE_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
] as const

export type ScheduleDay = (typeof SCHEDULE_DAYS)[number]

export type ScheduleSlot = {
  start: string
  end: string
  label: string
}

export const DEFAULT_SCHEDULE: Record<ScheduleDay, ScheduleSlot[]> = {
  MONDAY: [
    { start: '05:00', end: '07:00', label: 'hustle' },
    { start: '07:00', end: '08:00', label: 'gym' },
    { start: '08:15', end: '08:30', label: 'meditation' },
    { start: '08:30', end: '18:00', label: 'work' },
    { start: '18:00', end: '18:30', label: 'book' },
    { start: '18:30', end: '22:00', label: 'hustle' },
  ],
  TUESDAY: [
    { start: '05:00', end: '09:00', label: 'hustle' },
    { start: '09:00', end: '16:00', label: 'work' },
    { start: '16:00', end: '16:30', label: 'book, meditation' },
    { start: '16:30', end: '18:30', label: 'hustle' },
  ],
  WEDNESDAY: [
    { start: '09:00', end: '16:00', label: 'work' },
    { start: '16:00', end: '16:30', label: 'book, meditation' },
    { start: '16:30', end: '17:30', label: 'cook' },
    { start: '17:30', end: '18:30', label: 'hustle' },
    { start: '18:45', end: '20:30', label: 'box' },
    { start: '20:30', end: '22:00', label: 'hustle' },
  ],
  THURSDAY: [
    { start: '05:00', end: '07:00', label: 'hustle' },
    { start: '07:00', end: '08:00', label: 'gym' },
    { start: '08:15', end: '08:30', label: 'meditation' },
    { start: '09:00', end: '18:00', label: 'work' },
    { start: '18:00', end: '18:30', label: 'book' },
    { start: '18:45', end: '20:30', label: 'box' },
    { start: '20:30', end: '22:00', label: 'hustle' },
  ],
  FRIDAY: [
    { start: '05:00', end: '09:00', label: 'hustle' },
    { start: '09:00', end: '16:00', label: 'work' },
    { start: '16:00', end: '16:30', label: 'book, meditation' },
    { start: '16:30', end: '18:45', label: 'hustle' },
    { start: '18:45', end: '21:00', label: 'box' },
    { start: '21:30', end: '22:00', label: 'hustle' },
  ],
}

export const TAB_OPTIONS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'charts', label: 'Pie Charts' },
] as const

export type TabId = (typeof TAB_OPTIONS)[number]['id']

export const CHART_DISPLAY_OPTIONS = [
  { id: 'hours', label: 'Hours' },
  { id: 'percentage', label: 'Percentage' },
] as const

export type ChartDisplayMode = (typeof CHART_DISPLAY_OPTIONS)[number]['id']
