import { DateTime } from 'luxon';
import { ProductPurchaseStatus, ProductTrackingMethod } from '@/generated/prisma';

export const DAYS_PER_MONTH = 30;
export const DAYS_PER_YEAR = 365;

function toUtcStartOfDay(date: Date): DateTime {
  return DateTime.fromJSDate(date, { zone: 'utc' }).startOf('day');
}

/** Plain calendar-day subtraction (no +1), normalized to UTC midnight to avoid DST off-by-ones. */
export function lifespanDays(startDate: Date, finishDate: Date): number {
  return Math.floor(toUtcStartOfDay(finishDate).diff(toUtcStartOfDay(startDate), 'days').days);
}

export type DoseFields = {
  total_units?: number | null;
  consumption_amount?: number | null;
  consumption_period_days?: number | null;
};

export function unitsPerDay(fields: DoseFields): number | null {
  if (!fields.consumption_amount || !fields.consumption_period_days) {
    return null;
  }

  return fields.consumption_amount / fields.consumption_period_days;
}

export function expectedLifespanDays(input: { tracking_method: ProductTrackingMethod } & DoseFields): number | null {
  if (input.tracking_method !== ProductTrackingMethod.QUANTITY_DOSE || !input.total_units) {
    return null;
  }

  const perDay = unitsPerDay(input);

  if (!perDay) {
    return null;
  }

  return input.total_units / perDay;
}

export function actualLifespanDays(purchase: { start_date?: Date | null; actual_finish_date?: Date | null }): number | null {
  if (!purchase.start_date || !purchase.actual_finish_date) {
    return null;
  }

  return lifespanDays(purchase.start_date, purchase.actual_finish_date);
}

export function costPerUnit(price: number, totalUnits?: number | null): number | null {
  if (!totalUnits) {
    return null;
  }

  return price / totalUnits;
}

export function costPerUse(costPerUnitValue: number, consumptionAmount: number): number {
  return costPerUnitValue * consumptionAmount;
}

export type CostPerDayInput = {
  tracking_method: ProductTrackingMethod;
  purchase_price: number;
  total_units?: number | null;
  consumption_amount?: number | null;
  consumption_period_days?: number | null;
  start_date?: Date | null;
  actual_finish_date?: Date | null;
};

export type CostPerDayResult = {
  value: number | null;
  isProvisional: boolean;
};

/**
 * QUANTITY_DOSE is always a stable rate once total_units is set.
 * START_FINISH is stable once actual_finish_date is set, otherwise a provisional
 * "cost so far" using elapsed days since start_date (per product decision).
 */
export function costPerDay(purchase: CostPerDayInput, today: Date = new Date()): CostPerDayResult {
  if (purchase.tracking_method === ProductTrackingMethod.QUANTITY_DOSE) {
    const perUnit = costPerUnit(purchase.purchase_price, purchase.total_units);
    const perDay = unitsPerDay(purchase);

    if (perUnit === null || perDay === null) {
      return { value: null, isProvisional: false };
    }

    return { value: perUnit * perDay, isProvisional: false };
  }

  if (!purchase.start_date) {
    return { value: null, isProvisional: false };
  }

  if (purchase.actual_finish_date) {
    const days = lifespanDays(purchase.start_date, purchase.actual_finish_date);

    if (days <= 0) {
      return { value: null, isProvisional: false };
    }

    return { value: purchase.purchase_price / days, isProvisional: false };
  }

  const elapsedDays = Math.max(1, lifespanDays(purchase.start_date, today));

  return { value: purchase.purchase_price / elapsedDays, isProvisional: true };
}

export function costPerMonth(dailyCost: number): number {
  return dailyCost * DAYS_PER_MONTH;
}

export function costPerYear(dailyCost: number): number {
  return dailyCost * DAYS_PER_YEAR;
}

export function estimatedFinishDate(startDate: Date, expectedLifespanDaysValue: number): Date {
  return toUtcStartOfDay(startDate).plus({ days: expectedLifespanDaysValue }).toJSDate();
}

/** Positive = days remaining, negative = overdue. Caller/UI decides how to clamp/label. */
export function remainingDays(finishDate: Date, today: Date = new Date()): number {
  return lifespanDays(today, finishDate);
}

export function averageLifespan(purchases: { start_date: Date | null; actual_finish_date: Date | null }[]): number | null {
  const completed = purchases.filter((p) => p.start_date && p.actual_finish_date);

  if (completed.length === 0) {
    return null;
  }

  const total = completed.reduce((sum, p) => sum + lifespanDays(p.start_date as Date, p.actual_finish_date as Date), 0);

  return total / completed.length;
}

export function averageCostPerDay(costsPerDay: (number | null)[]): number | null {
  const values = costsPerDay.filter((v): v is number => v !== null);

  if (values.length === 0) {
    return null;
  }

  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function averagePurchasePrice(purchases: { purchase_price: number }[]): number {
  if (purchases.length === 0) {
    return 0;
  }

  return purchases.reduce((sum, p) => sum + p.purchase_price, 0) / purchases.length;
}

/** Average gap in days between consecutive purchase_date values, sorted ascending. Null if fewer than 2 purchases. */
export function repurchaseInterval(purchases: { purchase_date: Date }[]): number | null {
  if (purchases.length < 2) {
    return null;
  }

  const sorted = [...purchases].sort((a, b) => a.purchase_date.getTime() - b.purchase_date.getTime());
  let totalGap = 0;

  for (let i = 1; i < sorted.length; i++) {
    totalGap += lifespanDays(sorted[i - 1].purchase_date, sorted[i].purchase_date);
  }

  return totalGap / (sorted.length - 1);
}

export function totalProductSpend(purchases: { purchase_price: number }[]): number {
  return purchases.reduce((sum, p) => sum + p.purchase_price, 0);
}

/** Auto-derives NOT_STARTED -> ACTIVE -> FINISHED from dates unless explicitly overridden (needed for PAUSED/DISCARDED). */
export function deriveStatus(
  fields: { start_date?: Date | null; actual_finish_date?: Date | null },
  explicitStatus?: ProductPurchaseStatus | null,
): ProductPurchaseStatus {
  if (explicitStatus) {
    return explicitStatus;
  }

  if (fields.actual_finish_date) {
    return ProductPurchaseStatus.FINISHED;
  }

  if (fields.start_date) {
    return ProductPurchaseStatus.ACTIVE;
  }

  return ProductPurchaseStatus.NOT_STARTED;
}
