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
    news: {
        prefix: "/news",
        news: (news_uuid: string) => `/news/${news_uuid}`,
    },
    users: {
        prefix: "/users",
        me: "/users/me",
        user: (user_uuid: string) => `/users/${user_uuid}`,
    },
    accounts: {
        prefix: "/accounts",
        account: (account_uuid: string) => `/accounts/${account_uuid}`,
        me: "/accounts/me",
    },
    clients: {
        prefix: "/clients",
        client: (client_uuid: string) => `/clients/${client_uuid}`,
    },
    offices: {
        prefix: "/offices",
        office: (office_uuid: string) => `/offices/${office_uuid}`,
    },
    projects: {
        prefix: "/projects",
        project: (project_uuid: string) => `/projects/${project_uuid}`,
    },
    google_maps: {
        timezone: "/google-maps/timezone",
    },
}