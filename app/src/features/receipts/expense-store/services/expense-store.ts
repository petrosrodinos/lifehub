import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
    ExpenseStore,
    CreateExpenseStoreDto,
    UpdateExpenseStoreDto,
} from '../interfaces/expense-store.interfaces'

export const getExpenseStores = async (): Promise<ExpenseStore[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.stores.list)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense stores')
    }
}

export const getExpenseStore = async (uuid: string): Promise<ExpenseStore> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.stores.get(uuid))
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense store')
    }
}

export const createExpenseStore = async (data: CreateExpenseStoreDto): Promise<ExpenseStore> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.expenses.stores.create, data)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to create expense store')
    }
}

export const updateExpenseStore = async (
    uuid: string,
    data: UpdateExpenseStoreDto
): Promise<ExpenseStore> => {
    try {
        const response = await axiosInstance.patch(
            ApiRoutes.expenses.stores.update(uuid),
            data
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to update expense store')
    }
}

export const deleteExpenseStore = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.expenses.stores.delete(uuid))
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to delete expense store')
    }
}
