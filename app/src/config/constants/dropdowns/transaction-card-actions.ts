export const TRANSACTION_CARD_ACTIONS = {
  DUPLICATE: 'duplicate',
  CREATE_PRESET: 'create_preset',
} as const

export type TransactionCardAction = (typeof TRANSACTION_CARD_ACTIONS)[keyof typeof TRANSACTION_CARD_ACTIONS]

export const TRANSACTION_CARD_ACTION_OPTIONS = [
  { value: TRANSACTION_CARD_ACTIONS.DUPLICATE, label: 'Duplicate' },
  { value: TRANSACTION_CARD_ACTIONS.CREATE_PRESET, label: 'Create preset' },
] as const
