import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppSettingsStore {
    mobileMode: boolean;
    setMobileMode(enabled: boolean): void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
    persist(
        (set) => ({
            mobileMode: false,
            setMobileMode: (enabled: boolean) => set({ mobileMode: enabled }),
        }),
        {
            name: "lifehub-app-settings",
        }
    )
);
