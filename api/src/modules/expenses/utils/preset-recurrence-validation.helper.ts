import { BadRequestException } from '@nestjs/common';
import { ExpenseRecurrenceFrequency } from '@/generated/prisma';

type RecurrenceInput = {
  is_recurring?: boolean;
  recurrence_frequency?: ExpenseRecurrenceFrequency | null;
  recurrence_weekday?: number | null;
  recurrence_day_of_month?: number | null;
  recurrence_month?: number | null;
};

export function validatePresetRecurrence(input: RecurrenceInput): void {
  if (!input.is_recurring) {
    return;
  }

  if (!input.recurrence_frequency) {
    throw new BadRequestException('Recurrence frequency is required when recurring is enabled');
  }

  if (input.recurrence_frequency === ExpenseRecurrenceFrequency.WEEKLY) {
    if (input.recurrence_weekday == null || input.recurrence_weekday < 1 || input.recurrence_weekday > 7) {
      throw new BadRequestException('Weekday (1-7) is required for weekly recurrence');
    }

    return;
  }

  if (input.recurrence_frequency === ExpenseRecurrenceFrequency.MONTHLY) {
    if (
      input.recurrence_day_of_month == null ||
      input.recurrence_day_of_month < 1 ||
      input.recurrence_day_of_month > 31
    ) {
      throw new BadRequestException('Day of month (1-31) is required for monthly recurrence');
    }

    return;
  }

  if (
    input.recurrence_month == null ||
    input.recurrence_month < 1 ||
    input.recurrence_month > 12
  ) {
    throw new BadRequestException('Month (1-12) is required for yearly recurrence');
  }

  if (
    input.recurrence_day_of_month == null ||
    input.recurrence_day_of_month < 1 ||
    input.recurrence_day_of_month > 31
  ) {
    throw new BadRequestException('Day of month (1-31) is required for yearly recurrence');
  }
}

export function normalizePresetRecurrenceFields(input: RecurrenceInput) {
  if (!input.is_recurring) {
    return {
      is_recurring: false,
      recurrence_frequency: null,
      recurrence_weekday: null,
      recurrence_day_of_month: null,
      recurrence_month: null,
      next_run_at: null,
    };
  }

  const frequency = input.recurrence_frequency!;

  return {
    is_recurring: true,
    recurrence_frequency: frequency,
    recurrence_weekday: frequency === ExpenseRecurrenceFrequency.WEEKLY ? input.recurrence_weekday ?? null : null,
    recurrence_day_of_month:
      frequency === ExpenseRecurrenceFrequency.MONTHLY || frequency === ExpenseRecurrenceFrequency.YEARLY
        ? input.recurrence_day_of_month ?? null
        : null,
    recurrence_month: frequency === ExpenseRecurrenceFrequency.YEARLY ? input.recurrence_month ?? null : null,
  };
}
