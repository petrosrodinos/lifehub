import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  HiddenActivity,
  CreateHiddenActivityDto,
  UpdateHiddenActivityDto,
} from '../interfaces/hidden-activities.interfaces'

export const getHiddenActivities = async (): Promise<HiddenActivity[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.hiddenActivities.list)
  return response.data
}

export const getHiddenActivity = async (uuid: string): Promise<HiddenActivity> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.hiddenActivities.get(uuid))
  return response.data
}

export const createHiddenActivity = async (data: CreateHiddenActivityDto): Promise<HiddenActivity> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.hiddenActivities.create, data)
  return response.data
}

export const updateHiddenActivity = async (
  uuid: string,
  data: UpdateHiddenActivityDto
): Promise<HiddenActivity> => {
  const response = await axiosInstance.patch(
    ApiRoutes.habbits.hiddenActivities.update(uuid),
    data
  )
  return response.data
}

export const deleteHiddenActivity = async (uuid: string): Promise<HiddenActivity> => {
  const response = await axiosInstance.delete(ApiRoutes.habbits.hiddenActivities.delete(uuid))
  return response.data
}
