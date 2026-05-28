export const Routes = {
    dashboard: "/dashboard",
    auth: {
        sign_in: "/auth/sign-in",
        sign_up: "/auth/sign-up",
    },
    user: {
        prefix: '/dashboard/user',
    },
    routine: {
        prefix: '/dashboard/routine',
    },
    expenses: {
        prefix: '/dashboard/expenses',
    },
    receipts: {
        prefix: '/dashboard/receipts',
    },
    habits: {
        prefix: '/dashboard/habits',
    },
    settings: {
        security: '/dashboard/settings/security',
        activities: '/dashboard/settings/activities',
        expenses: '/dashboard/settings/expenses',
    },
    gym: {
        prefix: '/dashboard/gym',
        workoutExercise: (workoutUuid: string, exerciseUuid: string) =>
            `/dashboard/gym/workout/${workoutUuid}/exercise/${exerciseUuid}`,
    },
    notes: {
        prefix: '/dashboard/notes',
        detail: (uuid: string) => `/dashboard/notes/${uuid}`,
        learn: {
            prefix: '/dashboard/notes/learn',
            cards: (uuid: string) => `/dashboard/notes/learn/cards/${uuid}`,
            quiz: (uuid: string) => `/dashboard/notes/learn/quizzes/${uuid}`,
        },
    },
    assistant: {
        prefix: '/dashboard/assistant',
    },
};