import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ActivityScheduleDate,
  CreateActivityScheduleDateDto,
  UpdateActivityScheduleDateDto,
} from '../interfaces/activity-schedule-dates.interface'

export const getActivityScheduleDates = async (): Promise<ActivityScheduleDate[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.scheduleDates.list)
  return response.data
}

export const getActivityScheduleDate = async (id: number): Promise<ActivityScheduleDate> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.scheduleDates.get(id))
  return response.data
}

export const createActivityScheduleDate = async (
  data: CreateActivityScheduleDateDto,
): Promise<ActivityScheduleDate> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.scheduleDates.create, data)
  return response.data
}

export const updateActivityScheduleDate = async (
  id: number,
  data: UpdateActivityScheduleDateDto,
): Promise<ActivityScheduleDate> => {
  const response = await axiosInstance.patch(ApiRoutes.habbits.scheduleDates.update(id), data)
  return response.data
}

export const deleteActivityScheduleDate = async (id: number): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.habbits.scheduleDates.delete(id))
}
