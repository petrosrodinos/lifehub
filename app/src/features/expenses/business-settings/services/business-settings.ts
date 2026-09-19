import { isAxiosError } from 'axios'
import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { BusinessSettings, UpdateBusinessSettingsDto } from '../interfaces/business-settings.interfaces'

const getErrorMessage = (error: unknown, fallback: string): string =>
  isAxiosError(error) ? error.response?.data?.message || fallback : fallback

export const getBusinessSettings = async (): Promise<BusinessSettings> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.expenses.businessSettings.get)
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to fetch business settings'))
  }
}

export const updateBusinessSettings = async (data: UpdateBusinessSettingsDto): Promise<BusinessSettings> => {
  try {
    const response = await axiosInstance.put(ApiRoutes.expenses.businessSettings.update, data)
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to update business settings'))
  }
}
