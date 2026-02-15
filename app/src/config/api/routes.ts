export const ApiRoutes = {
    auth: {
        email: {
            login: "/auth/email/login",
            register: "/auth/email/register",
            change_password: "/auth/email/change-password",
            refresh_token: "/auth/email/refresh-token",
            admin_login_to_account: (account_uuid: string) => `/auth/email/${account_uuid}/admin-login`,
            forgot_password: "/auth/forgot-password",
            reset_password: "/auth/reset-password",
            verify_email: "/auth/verify-email",
            resend_verification_email: "/auth/resend-verification-email",
        },
    },
    users: {
        prefix: "/users",
        me: "/users/me",
        user: (user_uuid: string) => `/users/${user_uuid}`,
    },
    routine: {
        activities: {
            list: "/activities",
            create: "/activities",
            get: (uuid: string) => `/activities/${uuid}`,
            update: (uuid: string) => `/activities/${uuid}`,
            delete: (uuid: string) => `/activities/${uuid}`,
        },
        scheduleSlots: {
            list: "/schedule-slots",
            create: "/schedule-slots",
            byDay: (day: string) => `/schedule-slots/by-day/${day}`,
            get: (uuid: string) => `/schedule-slots/${uuid}`,
            update: (uuid: string) => `/schedule-slots/${uuid}`,
            delete: (uuid: string) => `/schedule-slots/${uuid}`,
        },
    },
    expenses: {
        accounts: {
            list: "/expense-accounts",
            create: "/expense-accounts",
            get: (uuid: string) => `/expense-accounts/${uuid}`,
            update: (uuid: string) => `/expense-accounts/${uuid}`,
            delete: (uuid: string) => `/expense-accounts/${uuid}`,
        },
        categories: {
            list: "/expense-categories",
            create: "/expense-categories",
            get: (uuid: string) => `/expense-categories/${uuid}`,
            update: (uuid: string) => `/expense-categories/${uuid}`,
            delete: (uuid: string) => `/expense-categories/${uuid}`,
        },
        subcategories: {
            list: "/expense-subcategories",
            create: "/expense-subcategories",
            get: (uuid: string) => `/expense-subcategories/${uuid}`,
            update: (uuid: string) => `/expense-subcategories/${uuid}`,
            delete: (uuid: string) => `/expense-subcategories/${uuid}`,
        },
        entries: {
            list: "/expense-entries",
            create: "/expense-entries",
            get: (uuid: string) => `/expense-entries/${uuid}`,
            update: (uuid: string) => `/expense-entries/${uuid}`,
            delete: (uuid: string) => `/expense-entries/${uuid}`,
            analytics: {
                balanceTrend: "/expense-entries/analytics/balance-trend",
                incomeExpense: "/expense-entries/analytics/income-expense",
                stats: "/expense-entries/analytics/stats",
            },
        },
    },
}