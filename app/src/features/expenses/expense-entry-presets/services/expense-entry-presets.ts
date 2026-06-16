import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ExpenseEntryPreset,
  CreateExpenseEntryPresetDto,
  UpdateExpenseEntryPresetDto,
} from '../interfaces/expense-entry-presets.interfaces'

export const getExpenseEntryPresets = async (): Promise<ExpenseEntryPreset[]> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.presets.list)
  return response.data
}

export const getExpenseEntryPreset = async (uuid: string): Promise<ExpenseEntryPreset> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.presets.get(uuid))
  return response.data
}

export const createExpenseEntryPreset = async (data: CreateExpenseEntryPresetDto): Promise<ExpenseEntryPreset> => {
  const response = await axiosInstance.post(ApiRoutes.expenses.presets.create, data)
  return response.data
}

export const updateExpenseEntryPreset = async (
  uuid: string,
  data: UpdateExpenseEntryPresetDto,
): Promise<ExpenseEntryPreset> => {
  const response = await axiosInstance.patch(ApiRoutes.expenses.presets.update(uuid), data)
  return response.data
}

export const deleteExpenseEntryPreset = async (uuid: string): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.expenses.presets.delete(uuid))
}
