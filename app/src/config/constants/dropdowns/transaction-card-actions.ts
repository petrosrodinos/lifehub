export const TRANSACTION_CARD_ACTIONS = {
  DUPLICATE: 'duplicate',
  CREATE_PRESET: 'create_preset',
  TRACK_PRODUCT: 'track_product',
} as const

export type TransactionCardAction = (typeof TRANSACTION_CARD_ACTIONS)[keyof typeof TRANSACTION_CARD_ACTIONS]

export const TRANSACTION_CARD_ACTION_OPTIONS = [
  { value: TRANSACTION_CARD_ACTIONS.DUPLICATE, label: 'Duplicate' },
  { value: TRANSACTION_CARD_ACTIONS.CREATE_PRESET, label: 'Create preset' },
  { value: TRANSACTION_CARD_ACTIONS.TRACK_PRODUCT, label: 'Track product usage' },
] as const
