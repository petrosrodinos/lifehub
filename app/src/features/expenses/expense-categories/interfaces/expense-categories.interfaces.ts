export interface ExpenseCategory {
  id?: number
  uuid: string
  user_uuid?: string
  name: string
  icon?: string
  color?: string
  created_at?: string
  updated_at?: string
}

export interface CreateExpenseCategoryDto {
  name: string
  icon?: string
  color?: string
}

export interface UpdateExpenseCategoryDto {
  name?: string
  icon?: string
  color?: string
}
