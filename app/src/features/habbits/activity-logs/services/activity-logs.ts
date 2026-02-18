import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { ActivityLog, ActivityLogsQuery } from '../interfaces/activity-logs.interface'

export const getActivityLogs = async (query?: ActivityLogsQuery): Promise<ActivityLog[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.logs.list, { params: query })
  return response.data
}
