import { AuthRoles } from "@/features/user/interfaces/user.interfaces";
import { type AuthRoleType } from "@/features/user/interfaces/user.interfaces";

export interface AuthorizationGuardRole {
  [key: string]: AuthRoleType[];
}

export const AuthorizationGuardRoles: AuthorizationGuardRole = {
  DELETE_BOOKING: [AuthRoles.ADMIN, AuthRoles.SUPPORT],
  VIEW_BOOKING_CLIENT_TIMEZONE: [AuthRoles.ADMIN, AuthRoles.SUPPORT],
} as AuthorizationGuardRole;
