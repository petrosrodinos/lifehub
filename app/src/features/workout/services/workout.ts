import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type { CreateWorkoutDto, UpdateWorkoutDto, Workout } from '../interfaces/workout.interface'

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workouts.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workouts')
  }
}

export const getWorkout = async (uuid: string): Promise<Workout> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.workouts.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch workout')
  }
}

export const createWorkout = async (data: CreateWorkoutDto): Promise<Workout> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.fitness.workouts.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create workout')
  }
}

export const updateWorkout = async (
  uuid: string,
  data: UpdateWorkoutDto
): Promise<Workout> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.fitness.workouts.update(uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update workout')
  }
}

export const deleteWorkout = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.fitness.workouts.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete workout')
  }
}
