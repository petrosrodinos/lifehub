import type { WorkoutSet } from '../../workout-sets/interfaces/workout-sets.interface'

export interface Workout {
  id?: number
  uuid: string
  user_uuid?: string | null
  name?: string | null
  notes?: string | null
  started_at?: string
  finished_at?: string
  sets?: WorkoutSet[]
  created_at?: string
  updated_at?: string
}

export interface CreateWorkoutDto {
  name?: string
  notes?: string
  started_at?: string
  finished_at?: string
}

export interface UpdateWorkoutDto {
  name?: string
  notes?: string
  started_at?: string
  finished_at?: string
}
