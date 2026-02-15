import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  ExpenseCategory,
  CreateExpenseCategoryDto,
  UpdateExpenseCategoryDto,
} from '../interfaces/expense-categories.interfaces'

export const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.categories.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense categories')
  }
}

export const getExpenseCategory = async (uuid: string): Promise<ExpenseCategory> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.categories.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense category')
  }
}

export const createExpenseCategory = async (data: CreateExpenseCategoryDto): Promise<ExpenseCategory> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.expenses.categories.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create expense category')
  }
}

export const updateExpenseCategory = async (
  uuid: string,
  data: UpdateExpenseCategoryDto
): Promise<ExpenseCategory> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.expenses.categories.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update expense category')
  }
}

export const deleteExpenseCategory = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.expenses.categories.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete expense category')
  }
}
