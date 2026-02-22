import { Prisma } from "@/generated/prisma"

export type ActivityLogInclude = {
    activity: true
    schedule: true
    occurrence: true
}

export type ActivityLogWithRelations = Prisma.ActivityLogGetPayload<{
    include: ActivityLogInclude
}>

export type OccurrenceWithRelationsInclude = {
    activity: true
    schedule: true
    log: true
}

export type OccurrenceWithRelations = Prisma.ActivityOccurrenceGetPayload<{
    include: OccurrenceWithRelationsInclude
}>

export interface ActivityLogResponse { data: ActivityLogWithRelations[]; total: number; page: number; page_size: number }

export interface GroupedLogEntry {
    uuid: string
    user_uuid: string
    activity_uuid: string
    schedule_uuid: string
    occurrence_uuid: string
    occurrence_status: string
    snapshot_target_type: string | null
    snapshot_target_value: number | null
    snapshot_target_unit: string | null
    snapshot_target_unit_label: string | null
    value: number | null
    completed: boolean
    completed_at: Date | null
    skipped: boolean
    skip_reason: string | null
    notes: string | null
    scheduled_for: Date
    created_at: Date
    updated_at: Date
    activity: OccurrenceWithRelations['activity']
    schedule: OccurrenceWithRelations['schedule']
}

export interface ActivityLogGrouped {
    data: Array<{ date: string; logs: GroupedLogEntry[] }>
    total: number
    page: number
    page_size: number
}