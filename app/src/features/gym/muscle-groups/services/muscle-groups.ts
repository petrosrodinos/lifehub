import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  CreateMuscleGroupDto,
  MuscleGroup,
  UpdateMuscleGroupDto,
} from '../interfaces/muscle-groups.interface'

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.muscleGroups.list)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch muscle groups')
  }
}

export const getMuscleGroup = async (uuid: string): Promise<MuscleGroup> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.fitness.muscleGroups.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch muscle group')
  }
}

export const createMuscleGroup = async (data: CreateMuscleGroupDto): Promise<MuscleGroup> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.fitness.muscleGroups.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create muscle group')
  }
}

export const updateMuscleGroup = async (
  uuid: string,
  data: UpdateMuscleGroupDto
): Promise<MuscleGroup> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.fitness.muscleGroups.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update muscle group')
  }
}

export const deleteMuscleGroup = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.fitness.muscleGroups.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete muscle group')
  }
}
