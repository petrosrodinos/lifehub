export const INSTALL_PLATFORMS = {
  ANDROID: "android",
  IOS: "ios",
} as const;

export type InstallPlatform = (typeof INSTALL_PLATFORMS)[keyof typeof INSTALL_PLATFORMS];

export const INSTALL_STEPS = {
  [INSTALL_PLATFORMS.ANDROID]: [
    "Open LifeHub in Chrome on your Android phone",
    "Tap the three-dot menu in the top-right corner",
    'Tap "Install app" or "Add to Home screen"',
    "Confirm, then open LifeHub from your home screen like an app",
  ],
  [INSTALL_PLATFORMS.IOS]: [
    "Open LifeHub in Safari on your iPhone or iPad",
    "Tap the Share button (square with an upward arrow)",
    'Scroll and tap "Add to Home Screen"',
    'Tap "Add" — LifeHub will appear on your home screen',
  ],
} as const;
