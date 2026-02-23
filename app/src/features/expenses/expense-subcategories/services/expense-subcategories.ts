import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ExpenseSubcategory,
  CreateExpenseSubcategoryDto,
  UpdateExpenseSubcategoryDto,
} from '../interfaces/expense-subcategories.interfaces'

export const getExpenseSubcategories = async (): Promise<ExpenseSubcategory[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.subcategories.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense subcategories')
  }
}

export const getExpenseSubcategory = async (uuid: string): Promise<ExpenseSubcategory> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.subcategories.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense subcategory')
  }
}

export const createExpenseSubcategory = async (data: CreateExpenseSubcategoryDto): Promise<ExpenseSubcategory> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.expenses.subcategories.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create expense subcategory')
  }
}

export const updateExpenseSubcategory = async (
  uuid: string,
  data: UpdateExpenseSubcategoryDto
): Promise<ExpenseSubcategory> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.expenses.subcategories.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update expense subcategory')
  }
}

export const deleteExpenseSubcategory = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.expenses.subcategories.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete expense subcategory')
  }
}
