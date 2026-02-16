import type { Activity } from "../../activities/interfaces/activities.interface"

export interface ScheduleSlot {
  id?: number
  uuid: string
  user_uuid: string
  activity_uuid: string
  day: ScheduleDay
  start_time: string
  end_time: string
  activity?: Activity
  created_at: string
  updated_at: string
}

export interface CreateScheduleSlotDto {
  day: ScheduleDay
  start_time: string
  end_time: string
  activity_uuid: string
}

export interface UpdateScheduleSlotDto {
  day: ScheduleDay
  start_time: string
  end_time?: string
  activity_uuid?: string
}

export type ScheduleDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export const SCHEDULE_DAYS: ScheduleDay[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

export type ChartDisplayMode = 'hours' | 'percentage'
