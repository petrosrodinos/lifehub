export interface ExpenseTag {
  id?: number
  uuid: string
  user_uuid: string
  title: string
  color: string
  created_at: string
  updated_at: string
}

export interface CreateExpenseTagDto {
  title: string
  color?: string
}

export interface UpdateExpenseTagDto {
  title?: string
  color?: string
}
