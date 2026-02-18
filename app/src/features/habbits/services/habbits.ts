import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
  CompleteOccurrenceDto,
  CreateHabitActivityDto,
  CreateHabitScheduleDto,
  HabitActivity,
  HabitActivityDetail,
  HabitActivityProgress,
  HabitLog,
  HabitLogsQuery,
  HabitOccurrence,
  HabitOverview,
  HabitScheduleWithRelations,
  ProgressRange,
  SkipOccurrenceDto,
  UpdateHabitActivityDto,
  UpdateHabitScheduleDto,
} from '../interfaces/habbits.interface'

export const getHabitActivities = async (): Promise<HabitActivity[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.activities.list)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch habit activities'
    throw new Error(message)
  }
}

export const getHabitActivity = async (uuid: string): Promise<HabitActivityDetail> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.activities.get(uuid))
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch habit activity'
    throw new Error(message)
  }
}

export const createHabitActivity = async (data: CreateHabitActivityDto): Promise<HabitActivity> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.habbits.activities.create, data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create habit activity'
    throw new Error(message)
  }
}

export const updateHabitActivity = async (
  uuid: string,
  data: UpdateHabitActivityDto,
): Promise<HabitActivity> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.habbits.activities.update(uuid), data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update habit activity'
    throw new Error(message)
  }
}

export const deleteHabitActivity = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.habbits.activities.delete(uuid))
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete habit activity'
    throw new Error(message)
  }
}

export const createHabitSchedule = async (
  activity_uuid: string,
  data: CreateHabitScheduleDto,
): Promise<HabitScheduleWithRelations> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.habbits.schedules.createForActivity(activity_uuid), data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create schedule'
    throw new Error(message)
  }
}

export const updateHabitSchedule = async (
  uuid: string,
  data: UpdateHabitScheduleDto,
): Promise<HabitScheduleWithRelations> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.habbits.schedules.update(uuid), data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update schedule'
    throw new Error(message)
  }
}

export const completeHabitOccurrence = async (
  uuid: string,
  data: CompleteOccurrenceDto,
): Promise<HabitOccurrence> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.habbits.occurrences.complete(uuid), data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to complete occurrence'
    throw new Error(message)
  }
}

export const skipHabitOccurrence = async (
  uuid: string,
  data: SkipOccurrenceDto,
): Promise<HabitOccurrence> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.habbits.occurrences.skip(uuid), data)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to skip occurrence'
    throw new Error(message)
  }
}

export const getHabitLogs = async (query?: HabitLogsQuery): Promise<HabitLog[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.logs.list, { params: query })
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch logs'
    throw new Error(message)
  }
}

export const getHabitActivityProgress = async (
  activity_uuid: string,
  range: ProgressRange = '30d',
): Promise<HabitActivityProgress> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.activities.progress(activity_uuid), { params: { range } })
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch activity progress'
    throw new Error(message)
  }
}

export const getHabitOverview = async (): Promise<HabitOverview> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.habbits.analytics.overview)
    return response.data
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch overview analytics'
    throw new Error(message)
  }
}
