import type { Exercise } from '../../exercises/interfaces/exercises.interface'

export interface MuscleGroup {
  id?: number
  uuid: string
  user_uuid?: string | null
  name: string
  color?: string | null
  exercises?: Exercise[]
  created_at?: string
  updated_at?: string
}

export interface CreateMuscleGroupDto {
  name: string
  color?: string
}

export interface UpdateMuscleGroupDto {
  name?: string
  color?: string
}
