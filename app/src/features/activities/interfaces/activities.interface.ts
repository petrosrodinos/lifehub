export interface Activity {
  id?: number
  uuid: string
  user_uuid: string
  name: string
  color: string
  is_default?: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateActivityDto {
  name: string
  color: string
}

export interface UpdateActivityDto {
  name?: string
  color?: string
}
