import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  CreateWorkoutSetDto,
  UpdateWorkoutSetDto,
  WorkoutSet,
} from '../interfaces/workout-sets.interface'

export const getWorkoutSets = async (): Promise<WorkoutSet[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workoutSets.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout sets')
  }
}

export const getWorkoutSet = async (uuid: string): Promise<WorkoutSet> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workoutSets.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout set')
  }
}

export const createWorkoutSet = async (data: CreateWorkoutSetDto): Promise<WorkoutSet> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.fitness.workoutSets.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create workout set')
  }
}

export const updateWorkoutSet = async (
  uuid: string,
  data: UpdateWorkoutSetDto
): Promise<WorkoutSet> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.fitness.workoutSets.update(uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update workout set')
  }
}

export const deleteWorkoutSet = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.fitness.workoutSets.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete workout set')
  }
}
