export interface ActivitySchedule {
  uuid: string
  user_uuid: string
  activity_uuid: string
  valid_from: string
  valid_until?: string | null
  repeat_type: ActivityRepeatType
  interval_days?: number | null
  time_of_day?: string | null
  frequency_value?: number | null
  frequency_period?: FrequencyPeriod | null
  target_type: ActivityTargetType
  target_value?: number | null
  target_unit?: ActivityTargetUnit | null
  target_unit_label?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  weekdays?: Array<{ weekday: number }>
  specific_dates?: Array<{ date: string }>
}

export interface CreateActivityScheduleDto {
  repeat_type: ActivityRepeatType
  interval_days?: number
  time_of_day?: string
  frequency_value?: number
  frequency_period?: FrequencyPeriod
  target_type: ActivityTargetType
  target_value?: number
  target_unit?: ActivityTargetUnit
  target_unit_label?: string
  weekdays?: number[]
  specific_dates?: string[]
}

export interface UpdateActivityScheduleDto {
  repeat_type?: ActivityRepeatType
  interval_days?: number
  time_of_day?: string
  frequency_value?: number
  frequency_period?: FrequencyPeriod
  target_type?: ActivityTargetType
  target_value?: number
}

export const ActivityRepeatTypes = {
  DAILY: 'DAILY',
  WEEKDAYS: 'WEEKDAYS',
  INTERVAL: 'INTERVAL',
  DATES: 'DATES',
  FREQUENCY: 'FREQUENCY',
} as const

export const ActivityTargetTypes = {
  BOOLEAN: 'BOOLEAN',
  QUANTITY: 'QUANTITY',
}

export const ActivityTargetUnits = {
  PAGES: 'PAGES',
  MINUTES: 'MINUTES',
  KM: 'KM',
  TIMES: 'TIMES',
  CUSTOM: 'CUSTOM',
} as const

export const FrequencyPeriods = {
  WEEK: 'WEEK',
  MONTH: 'MONTH',
} as const


export type ActivityRepeatType = typeof ActivityRepeatTypes[keyof typeof ActivityRepeatTypes]
export type ActivityTargetType = typeof ActivityTargetTypes[keyof typeof ActivityTargetTypes]
export type ActivityTargetUnit = typeof ActivityTargetUnits[keyof typeof ActivityTargetUnits]
export type FrequencyPeriod = typeof FrequencyPeriods[keyof typeof FrequencyPeriods]
