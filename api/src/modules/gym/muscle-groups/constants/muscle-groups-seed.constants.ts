import { ExerciseType } from '@/generated/prisma';

interface ExerciseSeed {
    readonly name: string;
    readonly type: ExerciseType;
}

interface MuscleGroupSeed {
    readonly name: string;
    readonly color: string;
    readonly exercises: readonly ExerciseSeed[];
}

export const MUSCLE_GROUPS_SEED: readonly MuscleGroupSeed[] = [
    {
        name: 'Chest',
        color: '#ef4444',
        exercises: [
            { name: 'Flat Barbell Bench Press', type: ExerciseType.REPS },
            { name: 'Incline Barbell Bench Press', type: ExerciseType.REPS },
            { name: 'Decline Barbell Bench Press', type: ExerciseType.REPS },
            { name: 'Flat Dumbbell Bench Press', type: ExerciseType.REPS },
            { name: 'Incline Dumbbell Bench Press', type: ExerciseType.REPS },
            { name: 'Dumbbell Fly', type: ExerciseType.REPS },
            { name: 'Cable Fly', type: ExerciseType.REPS },
            { name: 'Push Up', type: ExerciseType.REPS },
            { name: 'Chest Dip', type: ExerciseType.REPS },
            { name: 'Pec Deck Machine', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Back',
        color: '#3b82f6',
        exercises: [
            { name: 'Deadlift', type: ExerciseType.REPS },
            { name: 'Barbell Row', type: ExerciseType.REPS },
            { name: 'Dumbbell Row', type: ExerciseType.REPS },
            { name: 'Pull Up', type: ExerciseType.REPS },
            { name: 'Chin Up', type: ExerciseType.REPS },
            { name: 'Lat Pulldown', type: ExerciseType.REPS },
            { name: 'Seated Cable Row', type: ExerciseType.REPS },
            { name: 'T-Bar Row', type: ExerciseType.REPS },
            { name: 'Face Pull', type: ExerciseType.REPS },
            { name: 'Hyperextension', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Shoulders',
        color: '#f59e0b',
        exercises: [
            { name: 'Overhead Press', type: ExerciseType.REPS },
            { name: 'Dumbbell Shoulder Press', type: ExerciseType.REPS },
            { name: 'Arnold Press', type: ExerciseType.REPS },
            { name: 'Lateral Raise', type: ExerciseType.REPS },
            { name: 'Front Raise', type: ExerciseType.REPS },
            { name: 'Reverse Fly', type: ExerciseType.REPS },
            { name: 'Upright Row', type: ExerciseType.REPS },
            { name: 'Shrugs', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Biceps',
        color: '#10b981',
        exercises: [
            { name: 'Barbell Curl', type: ExerciseType.REPS },
            { name: 'Dumbbell Curl', type: ExerciseType.REPS },
            { name: 'Hammer Curl', type: ExerciseType.REPS },
            { name: 'Preacher Curl', type: ExerciseType.REPS },
            { name: 'Concentration Curl', type: ExerciseType.REPS },
            { name: 'Cable Curl', type: ExerciseType.REPS },
            { name: 'Incline Dumbbell Curl', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Triceps',
        color: '#8b5cf6',
        exercises: [
            { name: 'Close Grip Bench Press', type: ExerciseType.REPS },
            { name: 'Tricep Dip', type: ExerciseType.REPS },
            { name: 'Skull Crusher', type: ExerciseType.REPS },
            { name: 'Tricep Pushdown', type: ExerciseType.REPS },
            { name: 'Overhead Tricep Extension', type: ExerciseType.REPS },
            { name: 'Diamond Push Up', type: ExerciseType.REPS },
            { name: 'Kickback', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Legs',
        color: '#ec4899',
        exercises: [
            { name: 'Barbell Squat', type: ExerciseType.REPS },
            { name: 'Front Squat', type: ExerciseType.REPS },
            { name: 'Leg Press', type: ExerciseType.REPS },
            { name: 'Romanian Deadlift', type: ExerciseType.REPS },
            { name: 'Leg Extension', type: ExerciseType.REPS },
            { name: 'Leg Curl', type: ExerciseType.REPS },
            { name: 'Bulgarian Split Squat', type: ExerciseType.REPS },
            { name: 'Lunges', type: ExerciseType.REPS },
            { name: 'Hip Thrust', type: ExerciseType.REPS },
            { name: 'Goblet Squat', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Calves',
        color: '#f97316',
        exercises: [
            { name: 'Standing Calf Raise', type: ExerciseType.REPS },
            { name: 'Seated Calf Raise', type: ExerciseType.REPS },
            { name: 'Donkey Calf Raise', type: ExerciseType.REPS },
            { name: 'Calf Press on Leg Press', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Abs',
        color: '#06b6d4',
        exercises: [
            { name: 'Crunch', type: ExerciseType.REPS },
            { name: 'Sit Up', type: ExerciseType.REPS },
            { name: 'Leg Raise', type: ExerciseType.REPS },
            { name: 'Hanging Leg Raise', type: ExerciseType.REPS },
            { name: 'Plank', type: ExerciseType.TIME },
            { name: 'Russian Twist', type: ExerciseType.REPS },
            { name: 'Ab Wheel Rollout', type: ExerciseType.REPS },
            { name: 'Cable Crunch', type: ExerciseType.REPS },
            { name: 'Mountain Climber', type: ExerciseType.TIME },
        ],
    },
    {
        name: 'Forearms',
        color: '#84cc16',
        exercises: [
            { name: 'Wrist Curl', type: ExerciseType.REPS },
            { name: 'Reverse Wrist Curl', type: ExerciseType.REPS },
            { name: 'Farmer Walk', type: ExerciseType.TIME },
            { name: 'Dead Hang', type: ExerciseType.TIME },
        ],
    },
    {
        name: 'Glutes',
        color: '#e11d48',
        exercises: [
            { name: 'Hip Thrust', type: ExerciseType.REPS },
            { name: 'Glute Bridge', type: ExerciseType.REPS },
            { name: 'Cable Kickback', type: ExerciseType.REPS },
            { name: 'Sumo Deadlift', type: ExerciseType.REPS },
            { name: 'Step Up', type: ExerciseType.REPS },
        ],
    },
    {
        name: 'Cardio',
        color: '#0ea5e9',
        exercises: [
            { name: 'Treadmill Running', type: ExerciseType.TIME },
            { name: 'Cycling', type: ExerciseType.TIME },
            { name: 'Rowing Machine', type: ExerciseType.TIME },
            { name: 'Elliptical', type: ExerciseType.TIME },
            { name: 'Jump Rope', type: ExerciseType.TIME },
            { name: 'Stair Climber', type: ExerciseType.TIME },
        ],
    },
] as const;
