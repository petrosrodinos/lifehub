export const CREATE_TRANSACTION_TABS = {
  MANUAL: 'manual',
  PRESETS: 'presets',
} as const

export type CreateTransactionTab =
  (typeof CREATE_TRANSACTION_TABS)[keyof typeof CREATE_TRANSACTION_TABS]

export const CREATE_TRANSACTION_TAB_OPTIONS = [
  { value: CREATE_TRANSACTION_TABS.MANUAL, label: 'Manual entry' },
  { value: CREATE_TRANSACTION_TABS.PRESETS, label: 'From preset' },
] as const
