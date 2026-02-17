import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  CreateExerciseDto,
  Exercise,
  UpdateExerciseDto,
} from '../interfaces/exercises.interface'

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.exercises.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch exercises')
  }
}

export const getExercise = async (uuid: string): Promise<Exercise> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.exercises.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch exercise')
  }
}

export const createExercise = async (data: CreateExerciseDto): Promise<Exercise> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.fitness.exercises.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create exercise')
  }
}

export const updateExercise = async (
  uuid: string,
  data: UpdateExerciseDto
): Promise<Exercise> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.fitness.exercises.update(uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update exercise')
  }
}

export const deleteExercise = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.fitness.exercises.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete exercise')
  }
}
