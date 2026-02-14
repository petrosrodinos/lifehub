import { AccountRoles } from "@/features/accounts/interfaces/accounts.interfaces";

export const AccountRolesLabels = {
    OWNER: "Owner",
    ADMIN: "Admin",
    EMPLOYEE: "Employee",
} as const;


export const AccountRoleOptions = [
    {
        label: AccountRolesLabels.OWNER,
        value: AccountRoles.OWNER,
    },
    {
        label: AccountRolesLabels.ADMIN,
        value: AccountRoles.ADMIN,
    },
    {
        label: AccountRolesLabels.EMPLOYEE,
        value: AccountRoles.EMPLOYEE,
    },
] as const;

export type AccountRoleLabel = (typeof AccountRolesLabels)[keyof typeof AccountRolesLabels];