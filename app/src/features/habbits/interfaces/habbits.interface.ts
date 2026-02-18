export type ActivityRepeatType = 'DAILY' | 'WEEKDAYS' | 'INTERVAL' | 'DATES' | 'FREQUENCY'
export type ActivityTargetType = 'BOOLEAN' | 'QUANTITY'
export type ActivityTargetUnit = 'PAGES' | 'MINUTES' | 'KM' | 'TIMES' | 'CUSTOM'
export type FrequencyPeriod = 'WEEK' | 'MONTH'
export type OccurrenceStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'FAILED'
export type ProgressRange = '7d' | '30d' | '90d' | '1y'

export interface HabitActivity {
  uuid: string
  user_uuid: string
  name: string
  description?: string | null
  icon?: string | null
  color?: string | null
  visible: boolean
  current_schedule?: HabitScheduleWithRelations | null
  today_occurrence?: HabitOccurrence | null
  created_at: string
  updated_at: string
}

export interface HabitActivityDetail extends HabitActivity {
  activity_schedules?: HabitScheduleWithRelations[]
  activity_occurrences?: HabitOccurrence[]
  activity_logs?: HabitLog[]
  analytics?: HabitActivityProgress
}

export interface CreateHabitActivityDto {
  name: string
  description?: string
  icon?: string
  color?: string
  visible?: boolean
}

export interface UpdateHabitActivityDto {
  name?: string
  description?: string
  icon?: string
  color?: string
  visible?: boolean
}

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
}

export interface HabitScheduleWeekday {
  weekday: number
}

export interface HabitScheduleDate {
  date: string
}

export interface HabitScheduleWithRelations extends HabitSchedule {
  weekdays?: HabitScheduleWeekday[]
  specific_dates?: HabitScheduleDate[]
}

export interface CreateHabitScheduleDto {
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

export type UpdateHabitScheduleDto = Partial<CreateHabitScheduleDto>

export interface HabitOccurrence {
  uuid: string
  user_uuid: string
  activity_uuid: string
  schedule_uuid: string
  scheduled_for: string
  status: OccurrenceStatus
  created_at: string
  updated_at: string
}

export interface CompleteOccurrenceDto {
  value?: number
  notes?: string
}

export interface SkipOccurrenceDto {
  skip_reason?: string
  notes?: string
}

export interface HabitLog {
  uuid: string
  user_uuid: string
  activity_uuid: string
  schedule_uuid: string
  occurrence_uuid: string
  snapshot_target_type: ActivityTargetType
  snapshot_target_value?: number | null
  snapshot_target_unit?: ActivityTargetUnit | null
  snapshot_target_unit_label?: string | null
  value?: number | null
  completed: boolean
  completed_at?: string | null
  skipped: boolean
  skip_reason?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface HabitLogsQuery {
  activity_uuid?: string
  schedule_uuid?: string
  from_date?: string
  to_date?: string
  completed?: boolean
  skipped?: boolean
}

export interface HabitActivityProgress {
  range: ProgressRange
  completion_rate: number
  total_completed: number
  total_skipped: number
  total_failed: number
  streak: {
    currentStreak: number
    longestStreak: number
  }
  quantity?: {
    total_quantity_completed: number
    average_per_day: number
    average_per_week: number
    trend_vs_previous_period: number
    percent_of_target_achieved: number
  } | null
  frequency?: Array<{
    schedule_uuid: string
    frequency_period: FrequencyPeriod
    periods: Array<{
      period_key: string
      required_count: number
      completed_count: number
      success_rate: number
    }>
  }>
}

export interface HabitOverview {
  total_active_activities: number
  completion_rate_last_7_days: number
  best_streak_activity: {
    activity_uuid: string
    name: string
    current_streak: number
  } | null
  most_skipped_activity: {
    activity_uuid: string
    name: string
    skipped_count: number
  } | null
  daily_completion_heatmap: Array<{
    date: string
    count: number
  }>
}
