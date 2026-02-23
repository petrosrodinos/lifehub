import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
    CreateExpenseReceiptItemDto,
    UpdateExpenseReceiptItemDto,
} from '../interfaces/expense-receipt-item.interfaces'
import type { PriceEvolutionQuery } from '../interfaces/price-evolution.interfaces'
import {
    getExpenseReceiptItems,
    getExpenseReceiptItem,
    createExpenseReceiptItem,
    updateExpenseReceiptItem,
    deleteExpenseReceiptItem,
    getPriceEvolution,
} from '../services/expense-receipt-item'

const QUERY_KEYS = {
    expenseReceiptItems: (receipt_uuid: string) => ['expense-receipt-items', receipt_uuid],
    expenseReceiptItem: (uuid: string) => ['expense-receipt-items', 'item', uuid],
    expenseReceipts: ['expense-receipts'],
    priceEvolution: (params: PriceEvolutionQuery) => ['price-evolution', params],
}

export function useExpenseReceiptItems(receipt_uuid: string) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseReceiptItems(receipt_uuid),
        queryFn: () => getExpenseReceiptItems(receipt_uuid),
        enabled: !!receipt_uuid,
    })
}

export function useExpenseReceiptItem(uuid: string) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseReceiptItem(uuid),
        queryFn: () => getExpenseReceiptItem(uuid),
        enabled: !!uuid,
    })
}

export function useCreateExpenseReceiptItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateExpenseReceiptItemDto) => createExpenseReceiptItem(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceiptItems(variables.receipt_uuid) })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            toast.success('Receipt item created successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create receipt item', { duration: 3000 })
        },
    })
}

export function useUpdateExpenseReceiptItem(receipt_uuid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseReceiptItemDto }) =>
            updateExpenseReceiptItem(uuid, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceiptItems(receipt_uuid) })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceiptItem(variables.uuid) })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            toast.success('Receipt item updated successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update receipt item', { duration: 3000 })
        },
    })
}

export function useDeleteExpenseReceiptItem(receipt_uuid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteExpenseReceiptItem(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceiptItems(receipt_uuid) })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseReceipts })
            toast.success('Receipt item deleted successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete receipt item', { duration: 3000 })
        },
    })
}

export function usePriceEvolution(params: PriceEvolutionQuery) {
    return useQuery({
        queryKey: QUERY_KEYS.priceEvolution(params),
        queryFn: () => getPriceEvolution(params),
        enabled: !!params.product_uuid,
    })
}
