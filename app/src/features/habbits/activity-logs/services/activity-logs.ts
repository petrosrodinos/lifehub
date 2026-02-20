import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ActivityLogsGroupedResponse,
  ActivityLogsQuery,
  ActivityLogsResponse,
} from '../interfaces/activity-logs.interface'

export const getActivityLogs = async (query?: ActivityLogsQuery): Promise<ActivityLogsResponse> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.logs.list, { params: query })
  return response.data
}

export const getActivityLogsGrouped = async (
  query?: ActivityLogsQuery,
): Promise<ActivityLogsGroupedResponse> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.logs.grouped, { params: query })
  return response.data
}
