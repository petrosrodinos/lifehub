import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { CreateActivityScheduleDto, ActivitySchedule, UpdateScheduleVars } from '../interfaces/activity-schedules.interface'

export const createActivitySchedule = async (
  activity_uuid: string,
  data: CreateActivityScheduleDto,
): Promise<ActivitySchedule> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.schedules.createForActivity(activity_uuid), data)
  return response.data
}

export const updateActivitySchedule = async (data: UpdateScheduleVars): Promise<ActivitySchedule> => {
  const response = await axiosInstance.patch(ApiRoutes.habbits.schedules.update(data.uuid), data.data)
  return response.data
}
