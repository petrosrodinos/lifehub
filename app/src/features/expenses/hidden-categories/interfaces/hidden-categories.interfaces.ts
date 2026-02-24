export interface HiddenCategory {
  id: number
  uuid: string
  user_uuid: string
  category_uuid: string
  created_at: string
  updated_at: string
}

export interface CreateHiddenCategoryDto {
  category_uuid: string
}

export interface UpdateHiddenCategoryDto {
  category_uuid?: string
}
