export const REPEAT_TYPE_OPTIONS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKDAYS', label: 'Specific weekdays' },
  { value: 'INTERVAL', label: 'Every N days' },
  { value: 'FREQUENCY', label: 'Frequency based' },
] as const

export const TARGET_TYPE_OPTIONS = [
  { value: 'BOOLEAN', label: 'Boolean (done / not done)' },
  { value: 'QUANTITY', label: 'Quantity' },
] as const

export const TARGET_UNIT_OPTIONS = [
  { value: 'PAGES', label: 'Pages' },
  { value: 'MINUTES', label: 'Minutes' },
  { value: 'KM', label: 'Kilometers' },
  { value: 'TIMES', label: 'Times' },
  { value: 'CUSTOM', label: 'Custom' },
] as const

export const FREQUENCY_PERIOD_OPTIONS = [
  { value: 'WEEK', label: 'Per week' },
  { value: 'MONTH', label: 'Per month' },
] as const

export const WEEKDAY_OPTIONS = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
  { value: 7, label: 'Sun' },
] as const
