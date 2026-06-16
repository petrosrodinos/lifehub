export const EXPENSE_ACCOUNTS_HEADER_ACTIONS = {
  NEW_ACCOUNT: 'new_account',
  MANAGE_CATEGORIES: 'manage_categories',
  MANAGE_TAGS: 'manage_tags',
  MANAGE_PRESETS: 'manage_presets',
} as const

export type ExpenseAccountsHeaderAction =
  (typeof EXPENSE_ACCOUNTS_HEADER_ACTIONS)[keyof typeof EXPENSE_ACCOUNTS_HEADER_ACTIONS]

export const EXPENSE_ACCOUNTS_HEADER_ACTION_OPTIONS = [
  { value: EXPENSE_ACCOUNTS_HEADER_ACTIONS.NEW_ACCOUNT, label: 'New account' },
  { value: EXPENSE_ACCOUNTS_HEADER_ACTIONS.MANAGE_CATEGORIES, label: 'Manage categories' },
  { value: EXPENSE_ACCOUNTS_HEADER_ACTIONS.MANAGE_TAGS, label: 'Manage tags' },
  { value: EXPENSE_ACCOUNTS_HEADER_ACTIONS.MANAGE_PRESETS, label: 'Preset transactions' },
] as const
