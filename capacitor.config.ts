import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EcommerceTesis',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#FFFFFF',
    }
  },
  android: {
    path: 'android',
  }
};

export default config;
