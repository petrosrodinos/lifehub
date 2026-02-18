export interface HabitLog {
  uuid: string
  user_uuid: string
  activity_uuid: string
  schedule_uuid: string
  occurrence_uuid: string
  snapshot_target_type: 'BOOLEAN' | 'QUANTITY'
  snapshot_target_value?: number | null
  snapshot_target_unit?: 'PAGES' | 'MINUTES' | 'KM' | 'TIMES' | 'CUSTOM' | null
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
