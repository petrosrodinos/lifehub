import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  ScheduleSlot,
  CreateScheduleSlotDto,
  UpdateScheduleSlotDto,
  ScheduleDay,
} from '../interfaces/routine.interface'

export const getScheduleSlots = async (day?: ScheduleDay): Promise<ScheduleSlot[]> => {
  try {
    const params = day ? { day } : {}
    const response = await axiosInstance.get(ApiRoutes.routine.scheduleSlots.list, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch schedule slots')
  }
}

export const getScheduleSlotsByDay = async (day: ScheduleDay): Promise<ScheduleSlot[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.scheduleSlots.byDay(day))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch schedule slots by day')
  }
}

export const getScheduleSlot = async (uuid: string): Promise<ScheduleSlot> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.routine.scheduleSlots.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch schedule slot')
  }
}

export const createScheduleSlot = async (
  data: CreateScheduleSlotDto
): Promise<ScheduleSlot> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.routine.scheduleSlots.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create schedule slot')
  }
}

export const updateScheduleSlot = async (
  uuid: string,
  data: UpdateScheduleSlotDto
): Promise<ScheduleSlot> => {
  try {
    const response = await axiosInstance.patch(
      ApiRoutes.routine.scheduleSlots.update(uuid),
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update schedule slot')
  }
}

export const deleteScheduleSlot = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.routine.scheduleSlots.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete schedule slot')
  }
}
