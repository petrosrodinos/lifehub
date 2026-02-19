import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  Activity,
  ActivityHabitItem,
  ActivityHabbitsQuery,
  ActivityProgressSummary,
  CompletionHeatmapsResponse,
  CreateActivityDto,
  UpdateActivityDto,
} from '../interfaces/activities.interface'


export const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch activities')
  }
}

export const getActivity = async (uuid: string): Promise<Activity> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch activity')
  }
}

export const createActivity = async (data: CreateActivityDto): Promise<Activity> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.routine.activities.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create activity')
  }
}

export const updateActivity = async (
  uuid: string,
  data: UpdateActivityDto
): Promise<Activity> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.routine.activities.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update activity')
  }
}

export const deleteActivity = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.routine.activities.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete activity')
  }
}

export const getActivityProgressSummary = async (
  query: ActivityHabbitsQuery,
): Promise<ActivityProgressSummary> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.progressSummary, { params: query })
    return response.data
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch activity progress summary')
  }
}

export const getCompletionHeatmaps = async (): Promise<CompletionHeatmapsResponse> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.heatmaps)
    return response.data
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch completion heatmaps')
  }
}

export const getActivityHabbits = async (query?: ActivityHabbitsQuery): Promise<ActivityHabitItem[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.habbits, {
      params: query,
    })
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch activity habbits'
    throw new Error(message)
  }
}
