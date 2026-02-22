import { Capacitor } from '@capacitor/core';

export function useIsMobile(): boolean {
    return Capacitor.isNativePlatform();
}
