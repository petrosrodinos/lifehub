export interface Activity {
  id?: number
  uuid: string
  user_uuid: string
  name: string
  description?: string | null
  icon?: string | null
  color: string
  visible?: boolean
  current_schedule?: HabitSchedule | null
  today_occurrence?: HabitOccurrence | null
  analytics?: ActivityProgressResponse
  created_at?: string
  updated_at?: string
}

export interface CreateActivityDto {
  name: string
  description?: string
  icon?: string
  color?: string
  visible?: boolean
}

export interface UpdateActivityDto {
  name?: string
  description?: string
  icon?: string
  color?: string
  visible?: boolean
}

export type ActivityRepeatType = 'DAILY' | 'WEEKDAYS' | 'INTERVAL' | 'DATES' | 'FREQUENCY'
export type ActivityTargetType = 'BOOLEAN' | 'QUANTITY'
export type ActivityTargetUnit = 'PAGES' | 'MINUTES' | 'KM' | 'TIMES' | 'CUSTOM'
export type FrequencyPeriod = 'WEEK' | 'MONTH'
export type OccurrenceStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'FAILED'

export interface HabitSchedule {
  uuid: string
  activity_uuid: string
  user_uuid: string
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
}

export interface HabitOccurrence {
  uuid: string
  activity_uuid: string
  schedule_uuid: string
  user_uuid: string
  scheduled_for: string
  status: OccurrenceStatus
  created_at?: string
  updated_at?: string
}

export interface ActivityProgressResponse {
  range: '7d' | '30d' | '90d' | '1y'
  completion_rate: number
  total_completed: number
  total_skipped: number
  total_failed: number
  streak: {
    currentStreak: number
    longestStreak: number
  }
}
