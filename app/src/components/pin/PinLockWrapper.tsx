import { type ReactNode, useEffect } from 'react';
import { useAuthStore } from '../../store/auth-store';
import { PinLock } from './PinLock';

interface PinLockWrapperProps {
  children: ReactNode;
}

export function PinLockWrapper({ children }: PinLockWrapperProps) {
  const { isLoggedIn, pinHash, isAppLocked, lockApp } = useAuthStore();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isLoggedIn && pinHash) {
        lockApp();
      }
    };

    const handleBeforeUnload = () => {
      if (isLoggedIn && pinHash) {
        lockApp();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn, pinHash, lockApp]);

  const shouldShowLock = isLoggedIn && pinHash && isAppLocked;

  if (shouldShowLock) {
    return <PinLock />;
  }

  return <>{children}</>;
}
