import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { ExpenseTag, CreateExpenseTagDto, UpdateExpenseTagDto } from '../interfaces/expense-tags.interfaces'

export const getExpenseTags = async (): Promise<ExpenseTag[]> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.tags.list)
  return response.data
}

export const getExpenseTag = async (uuid: string): Promise<ExpenseTag> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.tags.get(uuid))
  return response.data
}

export const createExpenseTag = async (data: CreateExpenseTagDto): Promise<ExpenseTag> => {
  const response = await axiosInstance.post(ApiRoutes.expenses.tags.create, data)
  return response.data
}

export const updateExpenseTag = async (uuid: string, data: UpdateExpenseTagDto): Promise<ExpenseTag> => {
  const response = await axiosInstance.patch(ApiRoutes.expenses.tags.update(uuid), data)
  return response.data
}

export const deleteExpenseTag = async (uuid: string): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.expenses.tags.delete(uuid))
}
