export interface ActivityOccurrence {
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

export const OccurrenceStatuses = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  FAILED: 'FAILED',
} as const

export type OccurrenceStatus = typeof OccurrenceStatuses[keyof typeof OccurrenceStatuses]
