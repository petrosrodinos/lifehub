import type { Activity } from '../../../features/activities/interfaces/activities.interface'
import type { HabitLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import type { OccurrenceStatus } from '../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { HabitSchedule, UpdateActivityScheduleDto } from '../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export interface ActivityTodayItem {
  activity: Activity
  schedule: HabitSchedule | null
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
  logs: HabitLog[]
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
