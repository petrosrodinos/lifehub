import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifehub.app',
  appName: 'LifeHub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
