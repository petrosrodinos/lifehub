import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/auth-store";
import { useNavigate } from "react-router-dom";
import type { SignInUser, SignUpUser } from "../interfaces/auth.interface";
import { Routes } from "../../../routes/routes";
import type { LoggedInUser } from "../interfaces/auth.interface";
import { adminLoginToAccount, refreshAccountToken, signUp, signIn, updatePassword } from "../services/auth";


export function useSignin() {
    const { login } = useAuthStore((state) => state);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: SignInUser) => signIn(data),
        onSuccess: (data: LoggedInUser) => {
            login({
                ...data,
                isLoggedIn: true,
            });
            toast.success("You have successfully logged in", {
                duration: 2000,
            });
            navigate(Routes.dashboard);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unexpected error occurred", {
                duration: 3000,
            });
        },
    });
}


export function useSignup() {

    return useMutation({
        mutationFn: (data: SignUpUser) => signUp(data),
        onSuccess: () => {
            toast.success('Account created successfully!', {
                duration: 2000,
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                duration: 3000,
            });
        },
    });
}


export function useRefreshAccountToken() {
    const { login } = useAuthStore((state) => state);
    return useMutation({
        mutationFn: () => refreshAccountToken(),
        onSuccess: (data: LoggedInUser) => {
            login({ ...data, isLoggedIn: true });
        },
    });
}

export function useAdminLoginToAccount() {
    const { login } = useAuthStore((state) => state);

    return useMutation({
        mutationFn: (account_uuid: string) => adminLoginToAccount(account_uuid),
        onSuccess: (data: LoggedInUser) => {
            toast.success("You have successfully logged in as admin", {
                duration: 2000,
            });
            login({
                ...data,
                isLoggedIn: true,
            });
        },
        onError: (error: any) => {
            toast.error(error.message, {
                duration: 3000,
            });
        },
    });
}

export function useUpdatePassword() {
    return useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("You have successfully updated your password", {
                duration: 2000,
            });
        },
        onError: (error: any) => {
            toast.error(error.message, {
                duration: 3000,
            });
        },
    });
}