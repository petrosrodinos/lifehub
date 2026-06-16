export const WORKOUT_SET_ACTIONS = {
  EDIT: 'edit',
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
} as const

export type WorkoutSetAction = (typeof WORKOUT_SET_ACTIONS)[keyof typeof WORKOUT_SET_ACTIONS]

export const WORKOUT_SET_ACTION_OPTIONS = [
  { value: WORKOUT_SET_ACTIONS.EDIT, label: 'Edit' },
  { value: WORKOUT_SET_ACTIONS.DUPLICATE, label: 'Duplicate' },
  { value: WORKOUT_SET_ACTIONS.DELETE, label: 'Delete' },
] as const
