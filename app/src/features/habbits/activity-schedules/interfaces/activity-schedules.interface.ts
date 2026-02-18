export type ActivityRepeatType = 'DAILY' | 'WEEKDAYS' | 'INTERVAL' | 'DATES' | 'FREQUENCY'
export type ActivityTargetType = 'BOOLEAN' | 'QUANTITY'
export type ActivityTargetUnit = 'PAGES' | 'MINUTES' | 'KM' | 'TIMES' | 'CUSTOM'
export type FrequencyPeriod = 'WEEK' | 'MONTH'

export interface HabitSchedule {
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

export type UpdateActivityScheduleDto = Partial<CreateActivityScheduleDto>
