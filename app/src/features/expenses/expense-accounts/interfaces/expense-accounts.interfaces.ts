export interface ExpenseAccount {
  id?: number
  uuid: string
  user_uuid: string
  name: string
  icon?: string
  color?: string
  balance: string | number
  is_professional?: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateExpenseAccountDto {
  name: string
  icon?: string
  color?: string
  balance?: number
  is_professional?: boolean
}

export interface UpdateExpenseAccountDto {
  name?: string
  icon?: string
  color?: string
  balance?: number
  is_professional?: boolean
}

export interface ExpenseAccountsBalance {
  balance: number
}
