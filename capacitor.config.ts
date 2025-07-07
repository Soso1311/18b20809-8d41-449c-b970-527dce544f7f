
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.18b208098d41449cb970527dce544f7f',
  appName: '18b20809-8d41-449c-b970-527dce544f7f',
  webDir: 'dist',
  server: {
    url: 'https://18b20809-8d41-449c-b970-527dce544f7f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
