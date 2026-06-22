import { DateTime } from 'luxon';

type MonthlyBudgetProgressInput = {
  totalIncome: number;
  totalExpense: number;
  firstIncomeDate: Date | null;
  monthStartKey: string;
  monthEndKey: string;
};

export type MonthlyBudgetProgressResult = {
  totalIncome: number;
  totalExpense: number;
  remaining: number;
  progressPercentage: number;
  firstIncomeDate: string | null;
  monthStart: string;
  monthEnd: string;
};

export type MonthUtcDateRange = {
  monthStart: Date;
  monthEndExclusive: Date;
  monthStartKey: string;
  monthEndKey: string;
};

export const buildMonthUtcDateRange = (year: number, month: number): MonthUtcDateRange => {
  const monthStartKey = `${year}-${String(month).padStart(2, '0')}-01`;
  const nextMonth = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
  const monthEndExclusiveKey = `${nextMonth.year}-${String(nextMonth.month).padStart(2, '0')}-01`;
  const monthEndKey = DateTime.fromISO(monthStartKey, { zone: 'utc' }).endOf('month').toISODate() ?? monthStartKey;

  return {
    monthStart: new Date(`${monthStartKey}T00:00:00.000Z`),
    monthEndExclusive: new Date(`${monthEndExclusiveKey}T00:00:00.000Z`),
    monthStartKey,
    monthEndKey,
  };
};

export const getCurrentMonthUtcDateRange = (year?: number, month?: number): MonthUtcDateRange => {
  const now = DateTime.local();
  const targetYear = year ?? now.year;
  const targetMonth = month ?? now.month;

  return buildMonthUtcDateRange(targetYear, targetMonth);
};

const toDateKey = (date: Date): string => date.toISOString().split('T')[0];

export const calculateMonthlyBudgetProgress = (
  input: MonthlyBudgetProgressInput,
): MonthlyBudgetProgressResult => {
  const { totalIncome, totalExpense, firstIncomeDate, monthStartKey, monthEndKey } = input;
  const remaining = totalIncome - totalExpense;
  const progressPercentage = totalIncome > 0 ? Math.min(100, (totalExpense / totalIncome) * 100) : 0;

  return {
    totalIncome,
    totalExpense,
    remaining,
    progressPercentage,
    firstIncomeDate: firstIncomeDate ? toDateKey(firstIncomeDate) : null,
    monthStart: monthStartKey,
    monthEnd: monthEndKey,
  };
};
