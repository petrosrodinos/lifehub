import type { Activity } from '../../../features/activities/interfaces/activities.interface'
import type { ActivityLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import type { OccurrenceStatus } from '../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { ActivitySchedule } from '../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export interface ActivityTodayItem {
  activity: Activity
  schedule: ActivitySchedule | null
  status: OccurrenceStatus
  occurrence_uuid: string
  quantity_value: number | null
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
