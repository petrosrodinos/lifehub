import type { Activity } from "../../../activities/interfaces/activities.interface"
import type { ActivityTargetType, ActivityTargetUnit } from "../../activity-schedules/interfaces/activity-schedules.interface"

export interface ActivityLog {
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
  activity?: Activity
}

export interface ActivityLogsQuery {
  activity_uuid?: string
  schedule_uuid?: string
  from_date?: string
  to_date?: string
  completed?: boolean
  skipped?: boolean
  page?: number
  page_size?: number
}

export interface ActivityLogsResponse {
  data: ActivityLog[]
  total: number
  page: number
  page_size: number
}

export interface GroupedActivityLogsItem {
  date: string
  logs: ActivityLog[]
}

export interface ActivityLogsGroupedResponse {
  data: GroupedActivityLogsItem[]
  total: number
  page: number
  page_size: number
}
