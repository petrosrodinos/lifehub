import {
  ExpenseRecurrenceFrequencies,
  type ExpenseRecurrenceFrequency,
} from '../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'

export const PRESET_RECURRENCE_FREQUENCY = {
  WEEKLY: ExpenseRecurrenceFrequencies.WEEKLY,
  MONTHLY: ExpenseRecurrenceFrequencies.MONTHLY,
  YEARLY: ExpenseRecurrenceFrequencies.YEARLY,
} as const

export type PresetRecurrenceFrequencyOption = (typeof PRESET_RECURRENCE_FREQUENCY)[keyof typeof PRESET_RECURRENCE_FREQUENCY]

export const PRESET_RECURRENCE_FREQUENCY_OPTIONS = [
  { value: PRESET_RECURRENCE_FREQUENCY.WEEKLY, label: 'Weekly' },
  { value: PRESET_RECURRENCE_FREQUENCY.MONTHLY, label: 'Monthly' },
  { value: PRESET_RECURRENCE_FREQUENCY.YEARLY, label: 'Yearly' },
] as const

export const PRESET_RECURRENCE_WEEKDAY_OPTIONS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
] as const

export const PRESET_RECURRENCE_MONTH_OPTIONS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
] as const

export const PRESET_RECURRENCE_DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => {
  const value = index + 1

  return { value, label: String(value) }
}) as ReadonlyArray<{ value: number; label: string }>

export const PRESET_RECURRENCE_WEEKDAY_LABELS: Record<number, string> = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
}

export const PRESET_RECURRENCE_MONTH_LABELS: Record<number, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

export const PRESET_RECURRENCE_FREQUENCY_LABELS: Record<ExpenseRecurrenceFrequency, string> = {
  [ExpenseRecurrenceFrequencies.WEEKLY]: 'Weekly',
  [ExpenseRecurrenceFrequencies.MONTHLY]: 'Monthly',
  [ExpenseRecurrenceFrequencies.YEARLY]: 'Yearly',
}
