export interface ActivityScheduleWeekDay {
  id?: number
  schedule_uuid?: string
  weekday?: number
}

export interface CreateActivityScheduleWeekDayDto {
  schedule_uuid?: string
  weekday?: number
}

export interface UpdateActivityScheduleWeekDayDto {
  schedule_uuid?: string
  weekday?: number
}
