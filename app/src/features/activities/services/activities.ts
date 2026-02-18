import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  Activity,
  CreateActivityDto,
  UpdateActivityDto,
} from '../interfaces/activities.interface'
import type { HabitActivityProgress, HabitOverview, ProgressRange } from '../interfaces/activities.interface'


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

export const getHabitActivityProgress = async (
  activity_uuid: string,
  range: ProgressRange = '30d',
): Promise<HabitActivityProgress> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.activities.progress(activity_uuid), { params: { range } })
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch activity progress'
    throw new Error(message)
  }
}

export const getHabitOverview = async (): Promise<HabitOverview> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.analytics.overview)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch overview analytics'
    throw new Error(message)
  }
}
