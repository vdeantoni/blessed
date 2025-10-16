import { defineConfig } from 'vite';
import blessedBrowser from '../../dist/vite-plugin';

export default defineConfig({
  plugins: [blessedBrowser()],
  server: {
    port: 3000,
  },
});
