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



export interface ActivityHabbitsQuery {
  date_from?: string
  date_to?: string
}

export interface ActivityHabitItem {
  activity: Activity
  schedule: ActivitySchedule | null
  status: OccurrenceStatus
  occurrence_uuid: string
  quantity_value: number | null
}

export interface ActivityProgressSummary {
  completion_rate_7d: number
  completion_rate_30d: number
  quantity_total_30d: number
  frequency_success_rate: number | null
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
