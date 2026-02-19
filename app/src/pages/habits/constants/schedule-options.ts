import { ActivityRepeatTypes, ActivityTargetTypes, ActivityTargetUnits, FrequencyPeriods } from "../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface"

export const REPEAT_TYPE_OPTIONS = [
  { value: ActivityRepeatTypes.DAILY, label: 'Daily' },
  { value: ActivityRepeatTypes.WEEKDAYS, label: 'Specific weekdays' },
  { value: ActivityRepeatTypes.INTERVAL, label: 'Every N days' },
  { value: ActivityRepeatTypes.FREQUENCY, label: 'Frequency based' },
] as const

export const TARGET_TYPE_OPTIONS = [
  { value: ActivityTargetTypes.BOOLEAN, label: 'Boolean (done / not done)' },
  { value: ActivityTargetTypes.QUANTITY, label: 'Quantity' },
] as const

export const TARGET_UNIT_OPTIONS = [
  { value: ActivityTargetUnits.PAGES, label: 'Pages' },
  { value: ActivityTargetUnits.MINUTES, label: 'Minutes' },
  { value: ActivityTargetUnits.KM, label: 'Kilometers' },
  { value: ActivityTargetUnits.TIMES, label: 'Times' },
  { value: ActivityTargetUnits.CUSTOM, label: 'Custom' },
] as const

export const FREQUENCY_PERIOD_OPTIONS = [
  { value: FrequencyPeriods.WEEK, label: 'Per week' },
  { value: FrequencyPeriods.MONTH, label: 'Per month' },
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
