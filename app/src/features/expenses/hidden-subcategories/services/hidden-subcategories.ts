import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  HiddenSubcategory,
  CreateHiddenSubcategoryDto,
  UpdateHiddenSubcategoryDto,
} from '../interfaces/hidden-subcategories.interfaces'

export const getHiddenSubcategories = async (): Promise<HiddenSubcategory[]> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.hiddenSubcategories.list)
  return response.data
}

export const getHiddenSubcategory = async (uuid: string): Promise<HiddenSubcategory> => {
  const response = await axiosInstance.get(ApiRoutes.expenses.hiddenSubcategories.get(uuid))
  return response.data
}

export const createHiddenSubcategory = async (data: CreateHiddenSubcategoryDto): Promise<HiddenSubcategory> => {
  const response = await axiosInstance.post(ApiRoutes.expenses.hiddenSubcategories.create, data)
  return response.data
}

export const updateHiddenSubcategory = async (
  uuid: string,
  data: UpdateHiddenSubcategoryDto
): Promise<HiddenSubcategory> => {
  const response = await axiosInstance.patch(
    ApiRoutes.expenses.hiddenSubcategories.update(uuid),
    data
  )
  return response.data
}

export const deleteHiddenSubcategory = async (uuid: string): Promise<HiddenSubcategory> => {
  const response = await axiosInstance.delete(ApiRoutes.expenses.hiddenSubcategories.delete(uuid))
  return response.data
}
