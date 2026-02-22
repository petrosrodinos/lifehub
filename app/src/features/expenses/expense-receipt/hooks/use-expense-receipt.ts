import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
    CreateExpenseReceiptDto,
    UpdateExpenseReceiptDto,
    UploadReceiptPayload,
} from '../interfaces/expense-receipt.interfaces'
import {
    getExpenseReceipts,
    getExpenseReceipt,
    createExpenseReceipt,
    uploadReceipt,
    updateExpenseReceipt,
    deleteExpenseReceipt,
} from '../services/expense-receipt'

const QUERY_KEYS = {
    expenseReceipts: ['expense-receipts'],
    expenseReceipt: (uuid: string) => ['expense-receipts', uuid],
    expenseReceiptItems: (receipt_uuid: string) => ['expense-receipt-items', receipt_uuid],
    expenseEntries: ['expense-entries'],
}

export function useExpenseReceipts() {
    return useQuery({
        queryKey: QUERY_KEYS.expenseReceipts,
        queryFn: getExpenseReceipts,
    })
}

export function useExpenseReceipt(uuid: string) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseReceipt(uuid),
        queryFn: () => getExpenseReceipt(uuid),
        enabled: !!uuid,
    })
}

export function useCreateExpenseReceipt() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateExpenseReceiptDto) => createExpenseReceipt(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
            toast.success('Expense receipt created successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create expense receipt', { duration: 3000 })
        },
    })
}

export function useUploadReceipt() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: UploadReceiptPayload) => uploadReceipt(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
            queryClient.invalidateQueries({ queryKey: ['expense-receipt-items'] })
            toast.success('Receipt uploaded and expense created', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to upload receipt', { duration: 3000 })
        },
    })
}

export function useUpdateExpenseReceipt() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseReceiptDto }) =>
            updateExpenseReceipt(uuid, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipt(variables.uuid) })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
            toast.success('Expense receipt updated successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update expense receipt', { duration: 3000 })
        },
    })
}

export function useDeleteExpenseReceipt() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteExpenseReceipt(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseEntries })
            toast.success('Expense receipt deleted successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete expense receipt', { duration: 3000 })
        },
    })
}
