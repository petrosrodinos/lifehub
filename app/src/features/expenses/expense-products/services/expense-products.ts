import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
    ExpenseProduct,
    CreateExpenseProductDto,
    UpdateExpenseProductDto,
} from '../interfaces/expense-products.interfaces'

export const getExpenseProducts = async (): Promise<ExpenseProduct[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.products.list)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense products')
    }
}

export const getExpenseProduct = async (uuid: string): Promise<ExpenseProduct> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.products.get(uuid))
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense product')
    }
}

export const createExpenseProduct = async (data: CreateExpenseProductDto): Promise<ExpenseProduct> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.expenses.products.create, data)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to create expense product')
    }
}

export const updateExpenseProduct = async (
    uuid: string,
    data: UpdateExpenseProductDto
): Promise<ExpenseProduct> => {
    try {
        const response = await axiosInstance.patch(
            ApiRoutes.expenses.products.update(uuid),
            data
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to update expense product')
    }
}

export const deleteExpenseProduct = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.expenses.products.delete(uuid))
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to delete expense product')
    }
}
