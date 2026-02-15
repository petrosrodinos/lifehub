import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  ExpenseAccount,
  CreateExpenseAccountDto,
  UpdateExpenseAccountDto,
} from '../interfaces/expense-accounts.interfaces'

export const getExpenseAccounts = async (): Promise<ExpenseAccount[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.accounts.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense accounts')
  }
}

export const getExpenseAccount = async (uuid: string): Promise<ExpenseAccount> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.accounts.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense account')
  }
}

export const createExpenseAccount = async (data: CreateExpenseAccountDto): Promise<ExpenseAccount> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.expenses.accounts.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create expense account')
  }
}

export const updateExpenseAccount = async (
  uuid: string,
  data: UpdateExpenseAccountDto
): Promise<ExpenseAccount> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.expenses.accounts.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update expense account')
  }
}

export const deleteExpenseAccount = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.expenses.accounts.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete expense account')
  }
}
