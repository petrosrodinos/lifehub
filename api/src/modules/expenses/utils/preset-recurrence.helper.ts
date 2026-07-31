import { ExpenseRecurrenceFrequency } from '@/generated/prisma';
import { DateTime } from 'luxon';

export type PresetRecurrenceConfig = {
  frequency: ExpenseRecurrenceFrequency;
  weekday?: number | null;
  day_of_month?: number | null;
  month?: number | null;
};

function clampDayOfMonth(year: number, month: number, day: number): number {
  const daysInMonth = DateTime.utc(year, month).daysInMonth ?? 28;

  return Math.min(day, daysInMonth);
}

function buildMonthlyOccurrence(year: number, month: number, dayOfMonth: number): DateTime {
  const day = clampDayOfMonth(year, month, dayOfMonth);

  return DateTime.utc(year, month, day).startOf('day');
}

function buildYearlyOccurrence(year: number, month: number, dayOfMonth: number): DateTime {
  return buildMonthlyOccurrence(year, month, dayOfMonth);
}

export function getNextOccurrenceDate(
  config: PresetRecurrenceConfig,
  from: Date,
  inclusive: boolean,
): Date {
  const start = DateTime.fromJSDate(from, { zone: 'utc' }).startOf('day');
  const cursor = inclusive ? start : start.plus({ days: 1 });

  if (config.frequency === ExpenseRecurrenceFrequency.WEEKLY) {
    const weekday = config.weekday ?? 1;
    let candidate = cursor;

    while (candidate.weekday !== weekday) {
      candidate = candidate.plus({ days: 1 });
    }

    return candidate.toJSDate();
  }

  if (config.frequency === ExpenseRecurrenceFrequency.MONTHLY) {
    const dayOfMonth = config.day_of_month ?? 1;
    let candidate = buildMonthlyOccurrence(cursor.year, cursor.month, dayOfMonth);

    if (candidate < cursor) {
      const nextMonth = cursor.plus({ months: 1 });
      candidate = buildMonthlyOccurrence(nextMonth.year, nextMonth.month, dayOfMonth);
    }

    return candidate.toJSDate();
  }

  const month = config.month ?? 1;
  const dayOfMonth = config.day_of_month ?? 1;
  let candidate = buildYearlyOccurrence(cursor.year, month, dayOfMonth);

  if (candidate < cursor) {
    candidate = buildYearlyOccurrence(cursor.year + 1, month, dayOfMonth);
  }

  return candidate.toJSDate();
}

export function buildRecurrenceConfig(input: {
  recurrence_frequency?: ExpenseRecurrenceFrequency | null;
  recurrence_weekday?: number | null;
  recurrence_day_of_month?: number | null;
  recurrence_month?: number | null;
}): PresetRecurrenceConfig | null {
  if (!input.recurrence_frequency) {
    return null;
  }

  return {
    frequency: input.recurrence_frequency,
    weekday: input.recurrence_weekday,
    day_of_month: input.recurrence_day_of_month,
    month: input.recurrence_month,
  };
}
