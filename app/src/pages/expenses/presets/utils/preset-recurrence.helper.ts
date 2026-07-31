import type {
  CreateExpenseEntryPresetDto,
  ExpenseEntryPreset,
  ExpenseRecurrenceFrequency,
} from '../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'
import { ExpenseRecurrenceFrequencies } from '../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'
import {
  PRESET_RECURRENCE_FREQUENCY_LABELS,
  PRESET_RECURRENCE_MONTH_LABELS,
  PRESET_RECURRENCE_WEEKDAY_LABELS,
} from '../../../../config/constants/dropdowns/preset-recurrence'

export function formatPresetRecurrenceLabel(preset: Pick<
  ExpenseEntryPreset,
  'is_recurring' | 'recurrence_frequency' | 'recurrence_weekday' | 'recurrence_day_of_month' | 'recurrence_month'
>): string | null {
  if (!preset.is_recurring || !preset.recurrence_frequency) {
    return null
  }

  const frequencyLabel = PRESET_RECURRENCE_FREQUENCY_LABELS[preset.recurrence_frequency]

  if (preset.recurrence_frequency === ExpenseRecurrenceFrequencies.WEEKLY) {
    const weekday = preset.recurrence_weekday
      ? PRESET_RECURRENCE_WEEKDAY_LABELS[preset.recurrence_weekday]
      : null

    return weekday ? `${frequencyLabel} · ${weekday}` : frequencyLabel
  }

  if (preset.recurrence_frequency === ExpenseRecurrenceFrequencies.MONTHLY) {
    const day = preset.recurrence_day_of_month

    return day ? `${frequencyLabel} · day ${day}` : frequencyLabel
  }

  const month = preset.recurrence_month ? PRESET_RECURRENCE_MONTH_LABELS[preset.recurrence_month] : null
  const day = preset.recurrence_day_of_month

  if (month && day) {
    return `${frequencyLabel} · ${month} ${day}`
  }

  return frequencyLabel
}

export function isPresetRecurrenceValid(data: {
  is_recurring: boolean
  recurrence_frequency: ExpenseRecurrenceFrequency | ''
  recurrence_weekday: number | ''
  recurrence_day_of_month: number | ''
  recurrence_month: number | ''
}): boolean {
  if (!data.is_recurring) {
    return true
  }

  if (!data.recurrence_frequency) {
    return false
  }

  if (data.recurrence_frequency === ExpenseRecurrenceFrequencies.WEEKLY) {
    return data.recurrence_weekday !== ''
  }

  if (data.recurrence_frequency === ExpenseRecurrenceFrequencies.MONTHLY) {
    return data.recurrence_day_of_month !== ''
  }

  return data.recurrence_month !== '' && data.recurrence_day_of_month !== ''
}

export function buildPresetRecurrencePayload(data: {
  is_recurring: boolean
  recurrence_frequency: ExpenseRecurrenceFrequency | ''
  recurrence_weekday: number | ''
  recurrence_day_of_month: number | ''
  recurrence_month: number | ''
}): Pick<
  CreateExpenseEntryPresetDto,
  'is_recurring' | 'recurrence_frequency' | 'recurrence_weekday' | 'recurrence_day_of_month' | 'recurrence_month'
> {
  if (!data.is_recurring || !data.recurrence_frequency) {
    return { is_recurring: false }
  }

  if (data.recurrence_frequency === ExpenseRecurrenceFrequencies.WEEKLY) {
    return {
      is_recurring: true,
      recurrence_frequency: data.recurrence_frequency,
      recurrence_weekday: data.recurrence_weekday === '' ? undefined : data.recurrence_weekday,
    }
  }

  if (data.recurrence_frequency === ExpenseRecurrenceFrequencies.MONTHLY) {
    return {
      is_recurring: true,
      recurrence_frequency: data.recurrence_frequency,
      recurrence_day_of_month: data.recurrence_day_of_month === '' ? undefined : data.recurrence_day_of_month,
    }
  }

  return {
    is_recurring: true,
    recurrence_frequency: data.recurrence_frequency,
    recurrence_day_of_month: data.recurrence_day_of_month === '' ? undefined : data.recurrence_day_of_month,
    recurrence_month: data.recurrence_month === '' ? undefined : data.recurrence_month,
  }
}
