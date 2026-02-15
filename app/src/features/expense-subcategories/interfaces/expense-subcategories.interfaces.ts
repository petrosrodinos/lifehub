export interface ExpenseSubcategory {
  id?: number
  uuid: string
  user_uuid?: string
  category_uuid: string
  name: string
  created_at?: string
  updated_at?: string
}

export interface CreateExpenseSubcategoryDto {
  category_uuid: string
  name: string
}

export interface UpdateExpenseSubcategoryDto {
  category_uuid?: string
  name?: string
}
