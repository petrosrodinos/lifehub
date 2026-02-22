import type { ActivitySchedule } from '../../habbits/activity-schedules/interfaces/activity-schedules.interface'
import type { ActivityOccurrence, OccurrenceStatus } from '../../habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { ActivityLog } from '../../habbits/activity-logs/interfaces/activity-logs.interface'

export interface Activity {
  id?: number
  uuid: string
  user_uuid: string
  name: string
  description?: string | null
  icon?: string | null
  color: string
  visible?: boolean
  current_schedule?: ActivitySchedule | null
  today_occurrence?: ActivityOccurrence | null
  analytics?: ActivityProgressResponse
  created_at?: string
  updated_at?: string
}

export interface ActivityDetail extends Activity {
  activity_schedules?: ActivitySchedule[]
  activity_occurrences?: ActivityOccurrence[]
  activity_logs?: ActivityLog[]
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

export interface ActivityProgressQuantity {
  total_quantity_completed: number
  average_per_day: number
  average_per_week: number
  trend_vs_previous_period: number
  percent_of_target_achieved: number
}

export interface ActivityProgressFrequencyPeriod {
  period_key: string
  required_count: number
  completed_count: number
  success_rate: number
}

export interface ActivityProgressFrequency {
  schedule_uuid: string
  frequency_period: string
  periods: ActivityProgressFrequencyPeriod[]
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
  quantity: ActivityProgressQuantity | null
  frequency: ActivityProgressFrequency[]
}

export interface ActivityProgressSummary {
  completion_rate_7d: number
  completion_rate_30d: number
  quantity_total_30d: number
  frequency_success_rate: number | null
  progress_7d: ActivityProgressResponse
  progress_30d: ActivityProgressResponse
  most_skipped_activity: {
    activity_uuid: string
    name: string
    skipped_count: number
  } | null
}

export interface CompletionHeatmapItem {
  date: string
  completed: number
  skipped: number
  failed: number
}

export interface CompletionHeatmapsResponse {
  daily_completion_heatmap: CompletionHeatmapItem[]
  activity_heatmaps: Array<{
    activity_uuid: string
    name: string
    heatmap: CompletionHeatmapItem[]
  }>
}

export interface ActivityHabbitsQuery {
  date_from?: string
  date_to?: string
  activity_uuid?: string
  status?: OccurrenceStatus
  page?: number
  page_size?: number
}

export interface ActivityHabitItem {
  activity: Activity
  schedule: ActivitySchedule | null
  status: OccurrenceStatus
  occurrence_uuid: string
  quantity_value: number | null
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

export const ProgressRanges = {
  '7d': '7d',
  '30d': '30d',
  '90d': '90d',
  '1y': '1y',
} as const

export type ProgressRange = typeof ProgressRanges[keyof typeof ProgressRanges]
