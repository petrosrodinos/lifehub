import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
    CreateExpenseStoreDto,
    UpdateExpenseStoreDto,
} from '../interfaces/expense-store.interfaces'
import {
    getExpenseStores,
    getExpenseStore,
    createExpenseStore,
    updateExpenseStore,
    deleteExpenseStore,
} from '../services/expense-store'

const QUERY_KEYS = {
    expenseStores: ['expense-stores'],
    expenseStore: (uuid: string) => ['expense-stores', uuid],
}

export function useExpenseStores(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseStores,
        queryFn: getExpenseStores,
        enabled: options?.enabled ?? true,
    })
}

export function useExpenseStore(uuid: string) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseStore(uuid),
        queryFn: () => getExpenseStore(uuid),
        enabled: !!uuid,
    })
}

export function useCreateExpenseStore() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateExpenseStoreDto) => createExpenseStore(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseStores })
            toast.success('Expense store created successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create expense store', { duration: 3000 })
        },
    })
}

export function useUpdateExpenseStore() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseStoreDto }) =>
            updateExpenseStore(uuid, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseStores })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseStore(variables.uuid) })
            toast.success('Expense store updated successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update expense store', { duration: 3000 })
        },
    })
}

export function useDeleteExpenseStore() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteExpenseStore(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseStores })
            toast.success('Expense store deleted successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete expense store', { duration: 3000 })
        },
    })
}
