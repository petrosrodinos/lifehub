import type { Activity } from "../../activities/interfaces/activities.interface"

export type ActivityRepeatType = 'DAILY' | 'WEEKDAYS' | 'INTERVAL' | 'DATES' | 'FREQUENCY'
export type ActivityTargetType = 'BOOLEAN' | 'QUANTITY'
export type ActivityTargetUnit = 'PAGES' | 'MINUTES' | 'KM' | 'TIMES' | 'CUSTOM'
export type FrequencyPeriod = 'WEEK' | 'MONTH'
export type OccurrenceStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'FAILED'

export interface ScheduleSlot {
  id?: number
  uuid: string
  user_uuid: string
  activity_uuid: string
  day: ScheduleDay
  start_time: string
  end_time: string
  activity?: Activity
  created_at: string
  updated_at: string
}

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
}

export interface ActivityOccurrence {
  uuid: string
  user_uuid: string
  activity_uuid: string
  schedule_uuid: string
  scheduled_for: string
  status: OccurrenceStatus
  created_at: string
  updated_at: string
}

export interface CreateScheduleSlotDto {
  day: ScheduleDay
  start_time: string
  end_time: string
  activity_uuid: string
}

export interface UpdateScheduleSlotDto {
  day: ScheduleDay
  start_time: string
  end_time?: string
  activity_uuid?: string
}

export interface DuplicateDayDto {
  source_day: ScheduleDay
  target_days: ScheduleDay[]
}

export interface DuplicateSlotDto {
  slot_uuid: string
  target_days: ScheduleDay[]
}

export type ScheduleDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export const SCHEDULE_DAYS: ScheduleDay[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

export type ChartDisplayMode = 'hours' | 'percentage'
