import type { Exercise } from '../../exercises/interfaces/exercises.interface'
import type { Workout } from '../../workout/interfaces/workout.interface'
import type { WorkoutSet } from '../../workout-sets/interfaces/workout-sets.interface'

export interface WorkoutEntry {
  id?: number
  uuid: string
  workout_uuid: string
  exercise_uuid: string
  order: number
  workout?: Workout
  exercise?: Exercise
  sets?: WorkoutSet[]
  created_at?: string
  updated_at?: string
}

export interface CreateWorkoutEntryDto {
  workout_uuid: string
  exercise_uuid: string
  order: number
}

export interface UpdateWorkoutEntryDto {
  workout_uuid?: string
  exercise_uuid?: string
  order?: number
}
