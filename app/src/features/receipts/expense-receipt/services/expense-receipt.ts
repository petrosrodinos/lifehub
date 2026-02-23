import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
    ExpenseReceipt,
    CreateExpenseReceiptDto,
    UpdateExpenseReceiptDto,
    UploadReceiptPayload,
    ExpenseReceiptsQueryParams,
} from '../interfaces/expense-receipt.interfaces'

export const getExpenseReceipts = async (params?: ExpenseReceiptsQueryParams): Promise<ExpenseReceipt[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.receipts.list, { params })
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense receipts')
    }
}

export const getExpenseReceipt = async (uuid: string): Promise<ExpenseReceipt> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.expenses.receipts.get(uuid))
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to fetch expense receipt')
    }
}

export const createExpenseReceipt = async (data: CreateExpenseReceiptDto): Promise<ExpenseReceipt> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.expenses.receipts.create, data)
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to create expense receipt')
    }
}

export const uploadReceipt = async (payload: UploadReceiptPayload): Promise<ExpenseReceipt> => {
    try {
        const formData = new FormData()
        formData.append('receipt', payload.file)
        formData.append('from_account_uuid', payload.from_account_uuid)
        const response = await axiosInstance.post(ApiRoutes.expenses.receipts.upload, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to upload receipt')
    }
}

export const updateExpenseReceipt = async (
    uuid: string,
    data: UpdateExpenseReceiptDto
): Promise<ExpenseReceipt> => {
    try {
        const response = await axiosInstance.patch(
            ApiRoutes.expenses.receipts.update(uuid),
            data
        )
        return response.data
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to update expense receipt')
    }
}

export const deleteExpenseReceipt = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.expenses.receipts.delete(uuid))
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } }
        throw new Error(err.response?.data?.message || 'Failed to delete expense receipt')
    }
}
