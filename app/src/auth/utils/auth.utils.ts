import type { LoggedInUser } from "../interfaces/auth.interface";

export const generateInitials = (value: string) => {
    if (!value) return "AN";
    const names = value.split(" ");
    const initials = names.map((name) => name[0]).join("").toUpperCase();
    return initials;
};

export const formatAuthUser = (data: any): LoggedInUser => {
    return {
        user_uuid: data.account.user_uuid,
        access_token: data.access_token,
        expires_in: data.expires_in,
        avatar: data?.account?.avatar?.url ?? null,
        full_name: `${data.account.first_name} ${data.account.last_name}`,
        role: data?.account?.user?.role ?? null,
    };
};