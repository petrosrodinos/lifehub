import type { LoggedInUser } from "../interfaces/auth.interface";

export const generateInitials = (value: string) => {
    if (!value) return "AN";
    const names = value.split(" ");
    const initials = names.map((name) => name[0]).join("").toUpperCase();
    return initials;
};

export const formatAuthUser = (data: any): LoggedInUser => {
    return {
        user_uuid: data.user.uuid,
        access_token: data.access_token,
        expires_in: data.expires_in,
        email: data.user.email,
        avatar: null,
        full_name: `${data.user.first_name} ${data.user.last_name}`,
        role: data.user.role,
    };
};