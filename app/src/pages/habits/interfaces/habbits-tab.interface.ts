import type { Activity } from '../../../features/activities/interfaces/activities.interface'
import type { ActivityLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import type { OccurrenceStatus } from '../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { ActivitySchedule, UpdateActivityScheduleDto } from '../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export interface ActivityTodayItem {
  activity: Activity
  schedule: ActivitySchedule | null
  status: OccurrenceStatus
  occurrenceUuid: string | null
  quantityValue: number | null
}

export interface ActivityProgressSummaryData {
  completionRate7d: number
  completionRate30d: number
  quantityTotal30d: number
  frequencySuccessRate: number | null
}

export interface GroupedActivityLogs {
  date: string
  logs: ActivityLog[]
}

export interface OccurrenceCompletionPayload {
  occurrenceUuid: string
  value?: number
}

export interface OccurrenceSkipPayload {
  occurrenceUuid: string
  skipReason?: string
}

export interface ScheduleUpdatePayload {
  scheduleUuid: string
  data: UpdateActivityScheduleDto
}
