import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  CreateWorkoutEntryDto,
  UpdateWorkoutEntryDto,
  WorkoutEntry,
  WorkoutEntryAnalyticsParams,
  WorkoutEntryProgressPoint,
} from '../interfaces/workout-entries.interface'

export const getWorkoutEntries = async (params?: { exercise_uuid?: string; workout_uuid?: string }): Promise<WorkoutEntry[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workoutEntries.list, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout entries')
  }
}

export const getWorkoutEntry = async (uuid: string): Promise<WorkoutEntry> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workoutEntries.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout entry')
  }
}

export const createWorkoutEntry = async (data: CreateWorkoutEntryDto): Promise<WorkoutEntry> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.fitness.workoutEntries.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create workout entry')
  }
}

export const updateWorkoutEntry = async (
  uuid: string,
  data: UpdateWorkoutEntryDto
): Promise<WorkoutEntry> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.fitness.workoutEntries.update(uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update workout entry')
  }
}

export const deleteWorkoutEntry = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.fitness.workoutEntries.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete workout entry')
  }
}

export const getWorkoutEntryAnalytics = async (
  params: WorkoutEntryAnalyticsParams
): Promise<WorkoutEntryProgressPoint[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workoutEntries.analytics.progress, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout analytics')
  }
}
