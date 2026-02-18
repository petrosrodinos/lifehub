import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type { CompleteOccurrenceDto, ActivityOccurrence, SkipOccurrenceDto } from '../interfaces/activity-occurrences.interface'

export const completeActivityOccurrence = async (
  uuid: string,
  data: CompleteOccurrenceDto,
): Promise<ActivityOccurrence> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.occurrences.complete(uuid), data)
  return response.data
}

export const skipActivityOccurrence = async (
  uuid: string,
  data: SkipOccurrenceDto,
): Promise<ActivityOccurrence> => {
  const response = await axiosInstance.post(ApiRoutes.habbits.occurrences.skip(uuid), data)
  return response.data
}
