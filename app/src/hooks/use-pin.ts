import { useCallback } from 'react';
import { useAuthStore } from '../store/auth-store';
import { hashPin, verifyPin } from '../utils/pin.utils';

export function usePin() {
  const { pinHash, setPinHash, lockApp, unlockApp } = useAuthStore();

  const hasPin = !!pinHash;

  const createPin = useCallback(async (pin: string): Promise<void> => {
    const hash = await hashPin(pin);
    setPinHash(hash);
  }, [setPinHash]);

  const validatePin = useCallback(async (pin: string): Promise<boolean> => {
    if (!pinHash) return false;
    return await verifyPin(pin, pinHash);
  }, [pinHash]);

  const lock = useCallback(() => {
    if (hasPin) {
      lockApp();
    }
  }, [hasPin, lockApp]);

  const unlock = useCallback(() => {
    unlockApp();
  }, [unlockApp]);

  return {
    hasPin,
    createPin,
    validatePin,
    lock,
    unlock,
  };
}
