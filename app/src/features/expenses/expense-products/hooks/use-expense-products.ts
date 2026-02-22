import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
    CreateExpenseProductDto,
    UpdateExpenseProductDto,
} from '../interfaces/expense-products.interfaces'
import {
    getExpenseProducts,
    getExpenseProduct,
    createExpenseProduct,
    updateExpenseProduct,
    deleteExpenseProduct,
} from '../services/expense-products'

const QUERY_KEYS = {
    expenseProducts: ['expense-products'],
    expenseProduct: (uuid: string) => ['expense-products', uuid],
}

export function useExpenseProducts() {
    return useQuery({
        queryKey: QUERY_KEYS.expenseProducts,
        queryFn: getExpenseProducts,
    })
}

export function useExpenseProduct(uuid: string) {
    return useQuery({
        queryKey: QUERY_KEYS.expenseProduct(uuid),
        queryFn: () => getExpenseProduct(uuid),
        enabled: !!uuid,
    })
}

export function useCreateExpenseProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateExpenseProductDto) => createExpenseProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseProducts })
            toast.success('Product created successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create product', { duration: 3000 })
        },
    })
}

export function useUpdateExpenseProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateExpenseProductDto }) =>
            updateExpenseProduct(uuid, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseProducts })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseProduct(variables.uuid) })
            toast.success('Product updated successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update product', { duration: 3000 })
        },
    })
}

export function useDeleteExpenseProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteExpenseProduct(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenseProducts })
            toast.success('Product deleted successfully', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete product', { duration: 3000 })
        },
    })
}
