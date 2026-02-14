export const PIN_CONFIG = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 6,
  MAX_ATTEMPTS: 3,
  LOCKOUT_DURATION_MS: 300000,
} as const;

export type PinLength = 4 | 5 | 6;
