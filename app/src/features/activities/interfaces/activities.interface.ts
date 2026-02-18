import type { HabitSchedule } from '../../habbits/activity-schedules/interfaces/activity-schedules.interface'
import type { HabitOccurrence } from '../../habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { HabitLog } from '../../habbits/activity-logs/interfaces/activity-logs.interface'
import type { FrequencyPeriod } from '../../routine/interfaces/routine.interface'

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

export interface ActivityDetail extends Activity {
  activity_schedules?: HabitSchedule[]
  activity_occurrences?: HabitOccurrence[]
  activity_logs?: HabitLog[]
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


export type ProgressRange = '7d' | '30d' | '90d' | '1y'

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
