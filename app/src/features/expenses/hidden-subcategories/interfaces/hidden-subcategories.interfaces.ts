export interface HiddenSubcategory {
  id: number
  uuid: string
  user_uuid: string
  subcategory_uuid: string
  created_at: string
  updated_at: string
}

export interface CreateHiddenSubcategoryDto {
  subcategory_uuid: string
}

export interface UpdateHiddenSubcategoryDto {
  subcategory_uuid?: string
}
