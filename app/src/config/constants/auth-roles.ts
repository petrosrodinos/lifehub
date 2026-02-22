export const AUTH_ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    SUPPORT: 'SUPPORT',
    SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
