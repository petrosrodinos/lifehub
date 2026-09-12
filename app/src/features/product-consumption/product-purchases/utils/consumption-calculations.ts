import { ProductTrackingMethods, type ProductTrackingMethod } from '../interfaces/product-purchases.interfaces'

const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 365

/**
 * Minimal client-side mirror of the backend's consumption-calculations utils, used only for an
 * instant live preview while filling in the tracking form. Everything else (rankings, averages,
 * comparison insight text) comes from the API response and must not be recomputed here, to avoid
 * two implementations of the same formulas drifting apart.
 */
export function previewCostPerDay(input: {
  tracking_method: ProductTrackingMethod
  purchase_price?: number
  total_units?: number
  consumption_amount?: number
  consumption_period_days?: number
}): number | null {
  const { tracking_method, purchase_price, total_units, consumption_amount, consumption_period_days } = input

  if (!purchase_price || purchase_price <= 0) {
    return null
  }

  if (tracking_method === ProductTrackingMethods.QUANTITY_DOSE) {
    if (!total_units || !consumption_amount || !consumption_period_days) {
      return null
    }

    const costPerUnit = purchase_price / total_units
    const unitsPerDay = consumption_amount / consumption_period_days

    return costPerUnit * unitsPerDay
  }

  return null
}

export function previewCostPerMonth(dailyCost: number): number {
  return dailyCost * DAYS_PER_MONTH
}

export function previewCostPerYear(dailyCost: number): number {
  return dailyCost * DAYS_PER_YEAR
}

export function previewExpectedLifespanDays(input: { total_units?: number; consumption_amount?: number; consumption_period_days?: number }): number | null {
  const { total_units, consumption_amount, consumption_period_days } = input

  if (!total_units || !consumption_amount || !consumption_period_days) {
    return null
  }

  const unitsPerDay = consumption_amount / consumption_period_days

  return total_units / unitsPerDay
}

export function previewEstimatedFinishDate(startDate: string, expectedLifespanDays: number): Date {
  const date = new Date(startDate)
  date.setDate(date.getDate() + Math.round(expectedLifespanDays))

  return date
}
