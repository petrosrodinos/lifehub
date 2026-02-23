import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
    ExpenseReceiptItem,
    CreateExpenseReceiptItemDto,
    UpdateExpenseReceiptItemDto,
} from '../interfaces/expense-receipt-item.interfaces'
import type {
    PriceEvolutionPoint,
    PriceEvolutionQuery,
} from '../interfaces/price-evolution.interfaces'
import type {
    PurchasedProductPoint,
    PurchasedProductsQuery,
} from '../interfaces/purchased-products.interfaces'

export const getExpenseReceiptItems = async (receipt_uuid: string): Promise<ExpenseReceiptItem[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.receiptItems.list(receipt_uuid))
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense receipt items')
    }
}

export const getExpenseReceiptItem = async (uuid: string): Promise<ExpenseReceiptItem> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.receiptItems.get(uuid))
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense receipt item')
    }
}

export const createExpenseReceiptItem = async (data: CreateExpenseReceiptItemDto): Promise<ExpenseReceiptItem> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.expenses.receiptItems.create, data)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to create expense receipt item')
    }
}

export const updateExpenseReceiptItem = async (
    uuid: string,
    data: UpdateExpenseReceiptItemDto
): Promise<ExpenseReceiptItem> => {
    try {
        const response = await axiosInstance.patch(
            ApiRoutes.expenses.receiptItems.update(uuid),
            data
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to update expense receipt item')
    }
}

export const deleteExpenseReceiptItem = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.expenses.receiptItems.delete(uuid))
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to delete expense receipt item')
    }
}

export const getPriceEvolution = async (
    params: PriceEvolutionQuery
): Promise<PriceEvolutionPoint[]> => {
    try {
        const response = await axiosInstance.get(
            ApiRoutes.expenses.receiptItems.analytics.priceEvolution,
            { params }
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch price evolution data')
    }
}

export const getPurchasedProducts = async (
    params: PurchasedProductsQuery
): Promise<PurchasedProductPoint[]> => {
    try {
        const response = await axiosInstance.get(
            ApiRoutes.expenses.receiptItems.analytics.purchasedProducts,
            { params }
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch purchased products data')
    }
}
