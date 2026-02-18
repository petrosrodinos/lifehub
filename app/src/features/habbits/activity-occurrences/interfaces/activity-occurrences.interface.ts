export type OccurrenceStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'FAILED'

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
