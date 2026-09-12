import axiosInstance from '../../../../config/api/axios'
import { ApiRoutes } from '../../../../config/api/routes'
import type {
  ProductPurchase,
  CreateProductPurchaseDto,
  UpdateProductPurchaseDto,
  CreateFromExpenseDto,
  ProductPurchasesQueryParams,
  ProductPurchasesResponse,
  DashboardSummaryData,
  DashboardQueryParams,
  ProductSummaryData,
  ProductAnalyticsQueryParams,
  ProductRollup,
  ProductRollupWithMonthlyCost,
  CategoryConsumptionCostData,
  ComparisonData,
} from '../interfaces/product-purchases.interfaces'

export const getProductPurchases = async (params?: ProductPurchasesQueryParams): Promise<ProductPurchasesResponse> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.list, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product purchases')
  }
}

export const getProductPurchase = async (uuid: string): Promise<ProductPurchase> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.get(uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product purchase')
  }
}

export const createProductPurchase = async (data: CreateProductPurchaseDto): Promise<ProductPurchase> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.productConsumption.purchases.create, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create product purchase')
  }
}

export const createProductPurchaseFromExpense = async (
  expense_entry_uuid: string,
  data: CreateFromExpenseDto,
): Promise<ProductPurchase> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.productConsumption.purchases.createFromExpense(expense_entry_uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to track product usage')
  }
}

export const updateProductPurchase = async (uuid: string, data: UpdateProductPurchaseDto): Promise<ProductPurchase> => {
  try {
    const response = await axiosInstance.patch(ApiRoutes.productConsumption.purchases.update(uuid), data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update product purchase')
  }
}

export const deleteProductPurchase = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(ApiRoutes.productConsumption.purchases.delete(uuid))
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete product purchase')
  }
}

export const getDashboardSummary = async (params?: DashboardQueryParams): Promise<DashboardSummaryData> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.dashboard, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard summary')
  }
}

export const getProductSummary = async (product_uuid: string): Promise<ProductSummaryData> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.productSummary(product_uuid))
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product summary')
  }
}

export const getMostExpensivePerDay = async (params?: ProductAnalyticsQueryParams): Promise<ProductRollup[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.mostExpensivePerDay, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch most expensive per day analytics')
  }
}

export const getMostExpensivePerMonth = async (params?: ProductAnalyticsQueryParams): Promise<ProductRollupWithMonthlyCost[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.mostExpensivePerMonth, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch most expensive per month analytics')
  }
}

export const getLongestLasting = async (params?: ProductAnalyticsQueryParams): Promise<ProductRollup[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.longestLasting, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch longest lasting analytics')
  }
}

export const getFastestConsumed = async (params?: ProductAnalyticsQueryParams): Promise<ProductRollup[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.fastestConsumed, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch fastest consumed analytics')
  }
}

export const getMostFrequentlyPurchased = async (params?: ProductAnalyticsQueryParams): Promise<ProductRollup[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.mostFrequentlyPurchased, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch most frequently purchased analytics')
  }
}

export const getCategoryConsumptionCost = async (params?: ProductAnalyticsQueryParams): Promise<CategoryConsumptionCostData[]> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.categoryConsumptionCost, { params })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch category consumption cost analytics')
  }
}

export const compareProducts = async (product_uuids: string[]): Promise<ComparisonData> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.productConsumption.purchases.analytics.compare, {
      params: { product_uuids: product_uuids.join(',') },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to compare products')
  }
}
