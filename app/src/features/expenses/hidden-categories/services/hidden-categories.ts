import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  HiddenCategory,
  CreateHiddenCategoryDto,
  UpdateHiddenCategoryDto,
} from '../interfaces/hidden-categories.interfaces'

export const getHiddenCategories = async (): Promise<HiddenCategory[]> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.hiddenCategories.list)
  return response.data
}

export const getHiddenCategory = async (uuid: string): Promise<HiddenCategory> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.hiddenCategories.get(uuid))
  return response.data
}

export const createHiddenCategory = async (data: CreateHiddenCategoryDto): Promise<HiddenCategory> => {
  const response = await axiosInstance.post(ApiRoutes.expenses.hiddenCategories.create, data)
  return response.data
}

export const updateHiddenCategory = async (
  uuid: string,
  data: UpdateHiddenCategoryDto
): Promise<HiddenCategory> => {
  const response = await axiosInstance.patch(
    ApiRoutes.expenses.hiddenCategories.update(uuid),
    data
  )
  return response.data
}

export const deleteHiddenCategory = async (uuid: string): Promise<HiddenCategory> => {
  const response = await axiosInstance.delete(ApiRoutes.expenses.hiddenCategories.delete(uuid))
  return response.data
}
