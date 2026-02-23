import type { ExerciseType } from '../../exercises/interfaces/exercises.interface'
import type { WorkoutEntry } from '../../workout-entries/interfaces/workout-entries.interface'

export interface WorkoutSet {
  id?: number
  uuid: string
  workout_entry_uuid: string
  type: ExerciseType
  reps?: number | null
  weight?: number | null
  duration_seconds?: number | null
  distance_meters?: number | null
  rest_seconds?: number | null
  notes?: string | null
  is_dropset?: boolean
  is_amrap?: boolean
  is_rest?: boolean
  is_warmup?: boolean
  is_cooldown?: boolean
  is_super_set?: boolean
  order: number
  workout_entry?: WorkoutEntry
  created_at?: string
  updated_at?: string
}

export interface CreateWorkoutSetDto {
  workout_entry_uuid: string
  type: ExerciseType
  reps?: number
  weight?: number
  duration_seconds?: number
  distance_meters?: number
  rest_seconds?: number
  notes?: string
  is_dropset?: boolean
  is_amrap?: boolean
  is_rest?: boolean
  is_warmup?: boolean
  is_cooldown?: boolean
  is_super_set?: boolean
  order: number
}

export interface UpdateWorkoutSetDto {
  workout_entry_uuid?: string
  type?: ExerciseType
  reps?: number
  weight?: number
  duration_seconds?: number
  distance_meters?: number
  rest_seconds?: number
  notes?: string
  is_dropset?: boolean
  is_amrap?: boolean
  is_rest?: boolean
  is_warmup?: boolean
  is_cooldown?: boolean
  is_super_set?: boolean
  order?: number
}

export type ReorderWorkoutSetsPayload = { uuid: string; order: number }[]

