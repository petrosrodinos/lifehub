import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { CreateActivityScheduleDto, HabitSchedule, UpdateActivityScheduleDto } from '../interfaces/activity-schedules.interface'

export const createActivitySchedule = async (
  activity_uuid: string,
  data: CreateActivityScheduleDto,
): Promise<HabitSchedule> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.schedules.createForActivity(activity_uuid), data)
  return response.data
}

export const updateActivitySchedule = async (
  uuid: string,
  data: UpdateActivityScheduleDto,
): Promise<HabitSchedule> => {
  const response = await axiosInstance.patch(ApiRoutes.habbits.schedules.update(uuid), data)
  return response.data
}
