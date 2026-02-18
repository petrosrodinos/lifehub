import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ActivityScheduleWeekDay,
  CreateActivityScheduleWeekDayDto,
  UpdateActivityScheduleWeekDayDto,
} from '../interfaces/activity-schdule-week-days.interface'

export const getActivitySchduleWeekDays = async (): Promise<ActivityScheduleWeekDay[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.schduleWeekDays.list)
  return response.data
}

export const getActivitySchduleWeekDay = async (id: number): Promise<ActivityScheduleWeekDay> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.schduleWeekDays.get(id))
  return response.data
}

export const createActivitySchduleWeekDay = async (
  data: CreateActivityScheduleWeekDayDto,
): Promise<ActivityScheduleWeekDay> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.schduleWeekDays.create, data)
  return response.data
}

export const updateActivitySchduleWeekDay = async (
  id: number,
  data: UpdateActivityScheduleWeekDayDto,
): Promise<ActivityScheduleWeekDay> => {
  const response = await axiosInstance.patch(ApiRoutes.habbits.schduleWeekDays.update(id), data)
  return response.data
}

export const deleteActivitySchduleWeekDay = async (id: number): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.habbits.schduleWeekDays.delete(id))
}
