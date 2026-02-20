import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { CreateActivityScheduleDto, ActivitySchedule, UpdateScheduleVars } from '../interfaces/activity-schedules.interface'

export const getAllActivitySchedules = async (): Promise<ActivitySchedule[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.schedules.listAll)
  return response.data
}

export const getActivitySchedules = async (activity_uuid: string): Promise<ActivitySchedule[]> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.schedules.list(activity_uuid))
  return response.data
}

export const getActivitySchedule = async (schedule_uuid: string): Promise<ActivitySchedule> => {
  const response = await axiosInstance.get(ApiRoutes.habbits.schedules.get(schedule_uuid))
  return response.data
}

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

export const deleteActivitySchedule = async (schedule_uuid: string): Promise<void> => {
  await axiosInstance.delete(ApiRoutes.habbits.schedules.delete(schedule_uuid))
}
