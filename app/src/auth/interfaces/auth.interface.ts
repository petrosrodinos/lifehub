export interface SignInUser {
    email: string;
    password: string;
}

export interface SignUpUser {
    email: string;
    password: string;
    phone: string;
    first_name: string;
    last_name: string;
}

export interface UpdatePasswordDto {
    current_password: string;
    new_password: string;
}

export interface LoggedInUser {
    user_uuid: string | null;
    access_token: string | null;
    expires_in: number | null;
    avatar?: string | null;
    full_name?: string | null;
    role?: string | null;
    isLoggedIn?: boolean | null;
}

