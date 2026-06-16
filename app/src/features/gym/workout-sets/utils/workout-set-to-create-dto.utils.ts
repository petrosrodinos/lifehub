import type { CreateWorkoutSetDto, WorkoutSet } from '../interfaces/workout-sets.interface'

export function workoutSetToCreateDto(set: WorkoutSet, order: number): CreateWorkoutSetDto {
  const dto: CreateWorkoutSetDto = {
    workout_entry_uuid: set.workout_entry_uuid,
    type: set.type,
    order,
    is_warmup: set.is_warmup,
    is_dropset: set.is_dropset,
    is_amrap: set.is_amrap,
    is_super_set: set.is_super_set,
    is_cooldown: set.is_cooldown,
    is_rest: set.is_rest,
  }

  if (set.reps != null) dto.reps = set.reps
  if (set.weight != null) dto.weight = Number(set.weight)
  if (set.duration_seconds != null) dto.duration_seconds = set.duration_seconds
  if (set.distance_meters != null) dto.distance_meters = set.distance_meters
  if (set.rest_seconds != null) dto.rest_seconds = set.rest_seconds
  if (set.notes) dto.notes = set.notes

  return dto
}
