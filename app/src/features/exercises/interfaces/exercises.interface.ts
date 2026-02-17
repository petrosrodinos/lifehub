import type { MuscleGroup } from '../../muscle-groups/interfaces/muscle-groups.interface'
import type { WorkoutSet } from '../../workout-sets/interfaces/workout-sets.interface'

export interface Exercise {
  id?: number
  uuid: string
  user_uuid?: string | null
  muscle_group_uuid: string
  name: string
  description?: string | null
  type: ExerciseType
  muscle_group?: MuscleGroup
  sets?: WorkoutSet[]
  created_at?: string
  updated_at?: string
}

export interface CreateExerciseDto {
  muscle_group_uuid: string
  name: string
  description?: string
  type: ExerciseType
}

export interface UpdateExerciseDto {
  muscle_group_uuid?: string
  name?: string
  description?: string
  type?: ExerciseType
}

export const ExerciseTypes = {
  REPS: 'REPS',
  TIME: 'TIME',
} as const;

export type ExerciseType = (typeof ExerciseTypes)[keyof typeof ExerciseTypes];
