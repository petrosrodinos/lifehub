import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { HabitLog, HabitLogsQuery } from '../interfaces/activity-logs.interface'

export const getActivityLogs = async (query?: HabitLogsQuery): Promise<HabitLog[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.logs.list, { params: query })
  return response.data
}
