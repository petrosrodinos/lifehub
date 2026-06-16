import { Injectable, Logger } from '@nestjs/common';
import { ExercisesService } from '@/modules/gym/exercises/exercises.service';
import { MuscleGroupsService } from '@/modules/gym/muscle-groups/muscle-groups.service';
import { WorkoutEntriesService } from '@/modules/gym/workout-entries/workout-entries.service';
import { WorkoutsService } from '@/modules/gym/workouts/workouts.service';
import { resolveExercise, resolveMuscleGroup } from '@/assistant/utils/gym-entity-resolver.helper';

export interface WorkoutFilters {
    from_date?: string;
    to_date?: string;
    limit?: number;
}

export interface ExerciseFilters {
    muscle_group_name?: string;
}

export interface ExerciseAnalyticsFilters {
    exercise_name: string;
    start_date?: string;
    end_date?: string;
}

export interface WorkoutEntryFilters {
    exercise_name?: string;
    workout_uuid?: string;
    limit?: number;
}

export interface SlimWorkoutExercise {
    name: string;
    muscle_group: string;
    sets_count: number;
    max_weight: number | null;
    total_volume: number | null;
}

export interface SlimWorkout {
    uuid: string;
    name: string | null;
    notes: string | null;
    started_at: string;
    finished_at: string | null;
    duration_minutes: number | null;
    exercise_count: number;
    total_sets: number;
    exercises: SlimWorkoutExercise[];
}

export interface WorkoutsResult {
    workouts: SlimWorkout[];
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
}

export interface SlimExercise {
    uuid: string;
    name: string;
    type: string;
    muscle_group: string;
    description: string | null;
}

export interface SlimMuscleGroup {
    uuid: string;
    name: string;
    color: string | null;
}

export interface ExerciseAnalyticsPoint {
    date: string;
    max_weight: number | null;
    max_reps: number | null;
    total_volume: number | null;
    total_sets: number;
    total_duration: number | null;
}

export interface ExerciseAnalyticsResult {
    exercise: string;
    data_points: ExerciseAnalyticsPoint[];
    summary: {
        sessions: number;
        best_max_weight: number | null;
        latest_max_weight: number | null;
        best_max_reps: number | null;
        total_volume: number | null;
        total_sets: number;
    };
}

export interface SlimWorkoutSet {
    order: number;
    reps: number | null;
    weight: number | null;
    duration_seconds: number | null;
    is_warmup: boolean;
    is_cooldown: boolean;
    is_rest: boolean;
}

export interface SlimWorkoutEntry {
    uuid: string;
    workout_name: string | null;
    workout_date: string;
    exercise: string;
    muscle_group: string;
    sets: SlimWorkoutSet[];
}

export interface WorkoutEntriesResult {
    entries: SlimWorkoutEntry[];
    total: number;
}

type ResolverError = {
    error: string;
    candidates?: Array<{ uuid: string; name: string; type: string }>;
};

@Injectable()
export class GymRetrievalService {
    private readonly logger = new Logger(GymRetrievalService.name);

    constructor(
        private readonly workoutsService: WorkoutsService,
        private readonly exercisesService: ExercisesService,
        private readonly workoutEntriesService: WorkoutEntriesService,
        private readonly muscleGroupsService: MuscleGroupsService,
    ) {}

    async listWorkouts(user_uuid: string, filters: WorkoutFilters): Promise<WorkoutsResult> {
        const limit = Math.min(filters.limit ?? 20, 50);
        const result = await this.workoutsService.findAll(user_uuid, {
            page: 1,
            limit,
            from_date: this.parseDate(filters.from_date),
            to_date: this.parseDate(filters.to_date),
            all: false,
        });

        if (Array.isArray(result)) {
            const workouts = result.map((workout) => this.toSlimWorkout(workout));

            this.logger.log(`Listed ${workouts.length} workouts for user ${user_uuid}`);

            return {
                workouts,
                total: workouts.length,
                page: 1,
                limit,
                hasNextPage: false,
            };
        }

        this.logger.log(`Listed ${result.data.length} workouts for user ${user_uuid}`);

        return {
            workouts: result.data.map((workout) => this.toSlimWorkout(workout)),
            total: result.meta.total,
            page: result.meta.page,
            limit: result.meta.limit,
            hasNextPage: result.meta.page < result.meta.totalPages,
        };
    }

    async listExercises(user_uuid: string, filters: ExerciseFilters): Promise<SlimExercise[] | ResolverError> {
        let muscleGroupUuid: string | undefined;

        if (filters.muscle_group_name) {
            const muscleGroups = await this.muscleGroupsService.findAll(user_uuid);
            const resolution = resolveMuscleGroup(muscleGroups, filters.muscle_group_name);

            if (resolution.ok === false) {
                return { error: resolution.error, candidates: resolution.candidates };
            }

            muscleGroupUuid = resolution.uuid;
        }

        const exercises = await this.exercisesService.findAll(user_uuid);
        const filtered = muscleGroupUuid
            ? exercises.filter((exercise) => exercise.muscle_group_uuid === muscleGroupUuid)
            : exercises;

        return filtered.map((exercise) => ({
            uuid: exercise.uuid,
            name: exercise.name,
            type: exercise.type,
            muscle_group: exercise.muscle_group.name,
            description: exercise.description,
        }));
    }

    async listMuscleGroups(user_uuid: string): Promise<SlimMuscleGroup[]> {
        const muscleGroups = await this.muscleGroupsService.findAll(user_uuid);

        return muscleGroups.map((group) => ({
            uuid: group.uuid,
            name: group.name,
            color: group.color,
        }));
    }

    async getExerciseAnalytics(
        user_uuid: string,
        filters: ExerciseAnalyticsFilters,
    ): Promise<ExerciseAnalyticsResult | ResolverError> {
        const exercises = await this.exercisesService.findAll(user_uuid);
        const resolution = resolveExercise(exercises, filters.exercise_name);

        if (resolution.ok === false) {
            return { error: resolution.error, candidates: resolution.candidates };
        }

        const exercise = exercises.find((item) => item.uuid === resolution.uuid)!;
        const dataPoints = await this.workoutEntriesService.getAnalytics(user_uuid, {
            exercise_uuid: resolution.uuid,
            start_date: filters.start_date,
            end_date: filters.end_date,
        });

        const weights = dataPoints.map((point) => point.max_weight).filter((value): value is number => value !== null);
        const reps = dataPoints.map((point) => point.max_reps).filter((value): value is number => value !== null);
        const volumes = dataPoints.map((point) => point.total_volume).filter((value): value is number => value !== null);

        return {
            exercise: exercise.name,
            data_points: dataPoints,
            summary: {
                sessions: dataPoints.length,
                best_max_weight: weights.length > 0 ? Math.max(...weights) : null,
                latest_max_weight: weights.length > 0 ? weights[weights.length - 1] : null,
                best_max_reps: reps.length > 0 ? Math.max(...reps) : null,
                total_volume: volumes.length > 0 ? volumes.reduce((sum, value) => sum + value, 0) : null,
                total_sets: dataPoints.reduce((sum, point) => sum + point.total_sets, 0),
            },
        };
    }

    async listWorkoutEntries(
        user_uuid: string,
        filters: WorkoutEntryFilters,
    ): Promise<WorkoutEntriesResult | ResolverError> {
        let exerciseUuid: string | undefined;

        if (filters.exercise_name) {
            const exercises = await this.exercisesService.findAll(user_uuid);
            const resolution = resolveExercise(exercises, filters.exercise_name);

            if (resolution.ok === false) {
                return { error: resolution.error, candidates: resolution.candidates };
            }

            exerciseUuid = resolution.uuid;
        }

        const entries = await this.workoutEntriesService.findAll(user_uuid, {
            exercise_uuid: exerciseUuid,
            workout_uuid: filters.workout_uuid,
        });

        const limit = Math.min(filters.limit ?? 20, 50);
        const limitedEntries = entries.slice(0, limit);

        this.logger.log(`Listed ${limitedEntries.length} workout entries for user ${user_uuid}`);

        return {
            entries: limitedEntries.map((entry) => ({
                uuid: entry.uuid,
                workout_name: entry.workout.name,
                workout_date: entry.workout.started_at.toISOString(),
                exercise: entry.exercise.name,
                muscle_group: entry.exercise.muscle_group.name,
                sets: entry.sets.map((set) => ({
                    order: set.order,
                    reps: set.reps,
                    weight: set.weight !== null ? Number(set.weight) : null,
                    duration_seconds: set.duration_seconds,
                    is_warmup: set.is_warmup,
                    is_cooldown: set.is_cooldown,
                    is_rest: set.is_rest,
                })),
            })),
            total: entries.length,
        };
    }

    private parseDate(value?: string): Date | undefined {
        if (!value) {
            return undefined;
        }

        const parsed = new Date(value);

        if (Number.isNaN(parsed.getTime())) {
            return undefined;
        }

        return parsed;
    }

    private toSlimWorkout(workout: {
        uuid: string;
        name: string | null;
        notes: string | null;
        started_at: Date;
        finished_at: Date | null;
        entries: Array<{
            exercise: { name: string; muscle_group: { name: string } };
            sets: Array<{ weight: unknown; reps: number | null; is_warmup: boolean; is_cooldown: boolean; is_rest: boolean }>;
        }>;
    }): SlimWorkout {
        const workingSets = (sets: Array<{ weight: unknown; reps: number | null; is_warmup: boolean; is_cooldown: boolean; is_rest: boolean }>) =>
            sets.filter((set) => !set.is_warmup && !set.is_cooldown && !set.is_rest);

        const exercises = workout.entries.map((entry) => {
            const sets = workingSets(entry.sets);
            const weights = sets.map((set) => Number(set.weight) || 0).filter((weight) => weight > 0);
            const totalVolume = sets.reduce((sum, set) => {
                const weight = Number(set.weight) || 0;
                const reps = set.reps || 0;
                return sum + weight * reps;
            }, 0);

            return {
                name: entry.exercise.name,
                muscle_group: entry.exercise.muscle_group.name,
                sets_count: sets.length,
                max_weight: weights.length > 0 ? Math.max(...weights) : null,
                total_volume: totalVolume > 0 ? totalVolume : null,
            };
        });

        const durationMinutes =
            workout.started_at && workout.finished_at
                ? Math.round((workout.finished_at.getTime() - workout.started_at.getTime()) / 60000)
                : null;

        return {
            uuid: workout.uuid,
            name: workout.name,
            notes: workout.notes,
            started_at: workout.started_at.toISOString(),
            finished_at: workout.finished_at?.toISOString() ?? null,
            duration_minutes: durationMinutes,
            exercise_count: exercises.length,
            total_sets: exercises.reduce((sum, exercise) => sum + exercise.sets_count, 0),
            exercises,
        };
    }
}
