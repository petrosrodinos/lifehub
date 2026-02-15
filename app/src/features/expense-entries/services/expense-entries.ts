import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  ExpenseEntry,
  CreateExpenseEntryDto,
  UpdateExpenseEntryDto,
  ExpenseEntriesQueryParams,
  ExpenseEntriesResponse,
} from '../interfaces/expense-entries.interfaces'

export const getExpenseEntries = async (
  params?: ExpenseEntriesQueryParams
): Promise<ExpenseEntriesResponse> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.entries.list, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense entries')
  }
}

export const getExpenseEntry = async (uuid: string): Promise<ExpenseEntry> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.entries.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch expense entry')
  }
}

export const createExpenseEntry = async (data: CreateExpenseEntryDto): Promise<ExpenseEntry> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.expenses.entries.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create expense entry')
  }
}

export const updateExpenseEntry = async (
  uuid: string,
  data: UpdateExpenseEntryDto
): Promise<ExpenseEntry> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.expenses.entries.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update expense entry')
  }
}

export const deleteExpenseEntry = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.expenses.entries.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete expense entry')
  }
}
