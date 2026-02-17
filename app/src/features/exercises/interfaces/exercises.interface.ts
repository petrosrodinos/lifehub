import type { MuscleGroup } from '../../muscle-groups/interfaces/muscle-groups.interface'
import type { WorkoutSet } from '../../workout-sets/interfaces/workout-sets.interface'

export type ExerciseType = 'REPS' | 'TIME'

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
