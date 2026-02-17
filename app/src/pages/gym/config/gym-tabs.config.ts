export const GYM_TABS = [
  { id: 'workouts', label: 'Workouts' },
  { id: 'analytics', label: 'Analytics' },
] as const

export type GymTabId = (typeof GYM_TABS)[number]['id']
