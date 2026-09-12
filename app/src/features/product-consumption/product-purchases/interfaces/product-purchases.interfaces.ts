import type { ExpenseProduct } from "../../../receipts/expense-products/interfaces/expense-products.interfaces"
import type { ExpenseEntry } from "../../../expenses/expense-entries/interfaces/expense-entries.interfaces"
import type { PaginationMeta } from "../../../../interfaces/pagination.interfaces"

export const ProductTrackingMethods = {
  START_FINISH: 'START_FINISH',
  QUANTITY_DOSE: 'QUANTITY_DOSE',
} as const

export type ProductTrackingMethod = (typeof ProductTrackingMethods)[keyof typeof ProductTrackingMethods]

export const ProductPurchaseStatuses = {
  NOT_STARTED: 'NOT_STARTED',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED',
  PAUSED: 'PAUSED',
  DISCARDED: 'DISCARDED',
} as const

export type ProductPurchaseStatus = (typeof ProductPurchaseStatuses)[keyof typeof ProductPurchaseStatuses]

export interface ProductPurchase {
  id?: number
  uuid: string
  user_uuid: string
  product_uuid: string
  expense_entry_uuid?: string | null
  tracking_method: ProductTrackingMethod
  status: ProductPurchaseStatus
  purchase_price: string | number
  purchase_date: string
  start_date?: string | null
  actual_finish_date?: string | null
  total_units?: string | number | null
  unit_label?: string | null
  consumption_amount?: string | number | null
  consumption_period_days?: number | null
  notes?: string | null
  created_at: string
  updated_at: string
  product?: ExpenseProduct
  expense_entry?: ExpenseEntry

  // Server-computed, present on every read
  cost_per_unit: number | null
  cost_per_use: number | null
  cost_per_day: number | null
  cost_per_day_is_provisional: boolean
  cost_per_month: number | null
  cost_per_year: number | null
  expected_lifespan_days: number | null
  actual_lifespan_days: number | null
  estimated_finish_date: string | null
  remaining_days: number | null
}

export interface CreateProductPurchaseDto {
  product_uuid: string
  expense_entry_uuid?: string
  create_expense?: boolean
  from_account_uuid?: string
  category_uuid?: string
  subcategory_uuid?: string
  description?: string
  purchase_price?: number
  purchase_date?: string
  tracking_method: ProductTrackingMethod
  status?: ProductPurchaseStatus
  start_date?: string
  actual_finish_date?: string
  total_units?: number
  unit_label?: string
  consumption_amount?: number
  consumption_period_days?: number
  notes?: string
}

export type UpdateProductPurchaseDto = Partial<
  Pick<
    CreateProductPurchaseDto,
    'tracking_method' | 'status' | 'start_date' | 'actual_finish_date' | 'total_units' | 'unit_label' | 'consumption_amount' | 'consumption_period_days' | 'notes' | 'product_uuid'
  >
>

export interface InlineProductInput {
  name: string
  brand?: string
  unit?: string
  size?: number
  category_uuid?: string
  subcategory_uuid?: string
}

export interface CreateFromExpenseDto {
  product_uuid?: string
  product?: InlineProductInput
  tracking_method: ProductTrackingMethod
  start_date?: string
  total_units?: number
  unit_label?: string
  consumption_amount?: number
  consumption_period_days?: number
  notes?: string
}

export interface ProductPurchasesQueryParams {
  page?: number
  limit?: number
  product_uuid?: string
  status?: ProductPurchaseStatus
  tracking_method?: ProductTrackingMethod
  search?: string
}

export interface ProductPurchasesResponse {
  data: ProductPurchase[]
  pagination: PaginationMeta
}

export interface DashboardSummaryData {
  active_products: number
  total_daily_cost: number
  total_monthly_cost: number
  total_annual_cost: number
  provisional_count: number
  finishing_soon: ProductPurchase[]
}

export interface DashboardQueryParams {
  finishing_soon_days?: number
}

export interface ProductSummaryData {
  product: ExpenseProduct
  purchases: ProductPurchase[]
  current_purchase: ProductPurchase | null
  purchase_count: number
  lifetime_spend: number
  average_purchase_price: number
  average_lifespan_days: number | null
  average_cost_per_day: number | null
  repurchase_interval_days: number | null
}

export interface ProductAnalyticsQueryParams {
  from_date?: string
  to_date?: string
  category_uuid?: string
  limit?: number
}

export interface ProductRollup {
  product: ExpenseProduct
  purchase_count: number
  average_cost_per_day: number | null
  average_lifespan_days: number | null
  average_purchase_price: number
  repurchase_interval_days: number | null
  total_spend: number
  latest_status: ProductPurchaseStatus
}

export interface ProductRollupWithMonthlyCost extends ProductRollup {
  average_cost_per_month: number
}

export interface CategoryConsumptionCostData {
  uuid: string
  name: string
  color: string
  total_monthly_cost: number
  product_count: number
}

export interface ComparisonEntry {
  product: ExpenseProduct
  latest_purchase_price: number | null
  average_cost_per_day: number | null
  average_lifespan_days: number | null
  purchase_count: number
}

export interface ComparisonInsight {
  cheaper_product_uuid: string
  pricier_product_uuid: string
  percent_cheaper_per_day: number
  price_difference: number
}

export interface ComparisonData {
  products: ComparisonEntry[]
  insight: ComparisonInsight | null
}
