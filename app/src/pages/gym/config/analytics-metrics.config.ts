import type { ExerciseType } from '../../../features/exercises/interfaces/exercises.interface'

export const ANALYTICS_METRICS = [
  { id: 'max_weight', label: 'Max Weight (kg)', color: '#8b5cf6', exerciseTypes: ['REPS'] as ExerciseType[] },
  { id: 'max_reps', label: 'Max Reps', color: '#22c55e', exerciseTypes: ['REPS'] as ExerciseType[] },
  { id: 'total_volume', label: 'Total Volume (kg)', color: '#f59e0b', exerciseTypes: ['REPS'] as ExerciseType[] },
  { id: 'total_sets', label: 'Total Sets', color: '#06b6d4', exerciseTypes: ['REPS', 'TIME'] as ExerciseType[] },
  { id: 'total_duration', label: 'Duration (s)', color: '#ef4444', exerciseTypes: ['TIME'] as ExerciseType[] },
] as const

export type AnalyticsMetricId = (typeof ANALYTICS_METRICS)[number]['id']
