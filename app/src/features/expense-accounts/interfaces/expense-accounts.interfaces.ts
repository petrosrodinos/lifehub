export interface ExpenseAccount {
  id?: number
  uuid: string
  user_uuid: string
  name: string
  icon?: string
  color?: string
  balance: string | number
  created_at?: string
  updated_at?: string
}

export interface CreateExpenseAccountDto {
  name: string
  icon?: string
  color?: string
  balance?: number
}

export interface UpdateExpenseAccountDto {
  name?: string
  icon?: string
  color?: string
  balance?: number
}
