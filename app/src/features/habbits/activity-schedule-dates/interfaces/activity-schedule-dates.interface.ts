export interface ActivityScheduleDate {
  id?: number
  schedule_uuid?: string
  date?: string
}

export interface CreateActivityScheduleDateDto {
  schedule_uuid?: string
  date?: string
}

export interface UpdateActivityScheduleDateDto {
  schedule_uuid?: string
  date?: string
}
