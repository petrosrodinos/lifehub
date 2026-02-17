export const WORKOUT_VIEWS = {
  LIST: 'list',
  CALENDAR: 'calendar',
} as const;

export type WorkoutViewId = typeof WORKOUT_VIEWS[keyof typeof WORKOUT_VIEWS];

export const WORKOUT_VIEW_OPTIONS = [
  { id: WORKOUT_VIEWS.LIST, label: 'List' },
  { id: WORKOUT_VIEWS.CALENDAR, label: 'Calendar' },
] as const;
