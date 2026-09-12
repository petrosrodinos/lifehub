import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
  CreateProductPurchaseDto,
  UpdateProductPurchaseDto,
  CreateFromExpenseDto,
  ProductPurchasesQueryParams,
  DashboardQueryParams,
  ProductAnalyticsQueryParams,
} from '../interfaces/product-purchases.interfaces'
import {
  getProductPurchases,
  getProductPurchase,
  createProductPurchase,
  createProductPurchaseFromExpense,
  updateProductPurchase,
  deleteProductPurchase,
  getDashboardSummary,
  getProductSummary,
  getMostExpensivePerDay,
  getMostExpensivePerMonth,
  getLongestLasting,
  getFastestConsumed,
  getMostFrequentlyPurchased,
  getCategoryConsumptionCost,
  compareProducts,
} from '../services/product-purchases'

const QUERY_KEYS = {
  productPurchases: (params?: ProductPurchasesQueryParams) => ['product-purchases', params],
  productPurchase: (uuid: string) => ['product-purchases', uuid],
  dashboard: (params?: DashboardQueryParams) => ['product-purchases', 'dashboard', params],
  productSummary: (product_uuid: string) => ['product-purchases', 'product-summary', product_uuid],
  analytics: {
    mostExpensivePerDay: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'most-expensive-per-day', params],
    mostExpensivePerMonth: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'most-expensive-per-month', params],
    longestLasting: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'longest-lasting', params],
    fastestConsumed: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'fastest-consumed', params],
    mostFrequentlyPurchased: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'most-frequently-purchased', params],
    categoryConsumptionCost: (params?: ProductAnalyticsQueryParams) => ['product-purchases', 'analytics', 'category-consumption-cost', params],
    compare: (product_uuids: string[]) => ['product-purchases', 'analytics', 'compare', product_uuids],
  },
}

export function useProductPurchases(params?: ProductPurchasesQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.productPurchases(params),
    queryFn: () => getProductPurchases(params),
  })
}

export function useProductPurchase(uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.productPurchase(uuid),
    queryFn: () => getProductPurchase(uuid),
    enabled: !!uuid,
  })
}

function invalidateProductPurchaseQueries(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ['product-purchases'] })
  queryClient.invalidateQueries({ queryKey: ['expense-entries'] })
  queryClient.invalidateQueries({ queryKey: ['expense-accounts'] })
}

export function useCreateProductPurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductPurchaseDto) => createProductPurchase(data),
    onSuccess: () => {
      invalidateProductPurchaseQueries(queryClient)
      toast.success('Product purchase created successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create product purchase', { duration: 3000 })
    },
  })
}

export function useCreateProductPurchaseFromExpense() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ expense_entry_uuid, data }: { expense_entry_uuid: string; data: CreateFromExpenseDto }) =>
      createProductPurchaseFromExpense(expense_entry_uuid, data),
    onSuccess: () => {
      invalidateProductPurchaseQueries(queryClient)
      toast.success('Now tracking this product', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to track product usage', { duration: 3000 })
    },
  })
}

export function useUpdateProductPurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateProductPurchaseDto }) => updateProductPurchase(uuid, data),
    onSuccess: (_, variables) => {
      invalidateProductPurchaseQueries(queryClient)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.productPurchase(variables.uuid) })
      toast.success('Product purchase updated successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update product purchase', { duration: 3000 })
    },
  })
}

export function useDeleteProductPurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (uuid: string) => deleteProductPurchase(uuid),
    onSuccess: () => {
      invalidateProductPurchaseQueries(queryClient)
      toast.success('Product purchase deleted successfully', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product purchase', { duration: 3000 })
    },
  })
}

export function useDashboardSummary(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard(params),
    queryFn: () => getDashboardSummary(params),
  })
}

export function useProductSummary(product_uuid: string) {
  return useQuery({
    queryKey: QUERY_KEYS.productSummary(product_uuid),
    queryFn: () => getProductSummary(product_uuid),
    enabled: !!product_uuid,
  })
}

export function useMostExpensivePerDay(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.mostExpensivePerDay(params),
    queryFn: () => getMostExpensivePerDay(params),
  })
}

export function useMostExpensivePerMonth(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.mostExpensivePerMonth(params),
    queryFn: () => getMostExpensivePerMonth(params),
  })
}

export function useLongestLasting(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.longestLasting(params),
    queryFn: () => getLongestLasting(params),
  })
}

export function useFastestConsumed(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.fastestConsumed(params),
    queryFn: () => getFastestConsumed(params),
  })
}

export function useMostFrequentlyPurchased(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.mostFrequentlyPurchased(params),
    queryFn: () => getMostFrequentlyPurchased(params),
  })
}

export function useCategoryConsumptionCost(params?: ProductAnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.categoryConsumptionCost(params),
    queryFn: () => getCategoryConsumptionCost(params),
  })
}

export function useCompareProducts(product_uuids: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.compare(product_uuids),
    queryFn: () => compareProducts(product_uuids),
    enabled: product_uuids.length >= 2,
  })
}
