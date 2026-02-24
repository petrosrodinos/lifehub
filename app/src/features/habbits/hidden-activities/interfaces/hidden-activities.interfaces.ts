export interface HiddenActivity {
  id: number
  uuid: string
  user_uuid: string
  activity_uuid: string
  created_at: string
  updated_at: string
}

export interface CreateHiddenActivityDto {
  activity_uuid: string
}

export interface UpdateHiddenActivityDto {
  activity_uuid?: string
}
