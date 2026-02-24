import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { LoggedInUser } from "../features/auth/interfaces/auth.interface";

interface UserStore extends LoggedInUser {
    pinHash: string | null;
    isAppLocked: boolean;
    showAccountBalances: boolean;
    login(user: any): void;
    logout(): void;
    updateUser(user: any): void;
    setPinHash(hash: string): void;
    lockApp(): void;
    unlockApp(): void;
    setShowAccountBalances(show: boolean): void;
}

const initialValues: Omit<UserStore, 'login' | 'logout' | 'updateUser' | 'setPinHash' | 'lockApp' | 'unlockApp' | 'setShowAccountBalances'> = {
    isLoggedIn: false,
    user_uuid: null,
    role: null,
    email: null,
    full_name: "",
    access_token: null,
    expires_in: null,
    avatar: null,
    pinHash: null,
    isAppLocked: false,
    showAccountBalances: true,
};

const STORE_KEY = `lifehub-auth`;

export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: LoggedInUser) => {
                    set((state) => ({
                        ...state,
                        ...user,
                        isAppLocked: state.pinHash ? true : false,
                    }));
                },
                logout: () => {
                    set(initialValues);
                    localStorage.removeItem(STORE_KEY);
                    window.location.href = "/auth/sign-in";
                },
                updateUser: async (user: Partial<LoggedInUser>) => {
                    set((state) => ({ ...state, ...user }));
                },
                setPinHash: (hash: string) => {
                    set((state) => ({ ...state, pinHash: hash }));
                },
                lockApp: () => {
                    set((state) => ({ ...state, isAppLocked: true }));
                },
                unlockApp: () => {
                    set((state) => ({ ...state, isAppLocked: false }));
                },
                setShowAccountBalances: (show: boolean) => {
                    set((state) => ({ ...state, showAccountBalances: show }));
                },
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getAuthStoreState = () => useAuthStore.getState();