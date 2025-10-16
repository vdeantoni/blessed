import { defineConfig } from 'vite';
import blessedBrowserPlugin from '../../src/vite-plugin/index.js';

export default defineConfig({
  plugins: [blessedBrowserPlugin()],
  server: {
    host: '127.0.0.1',  // Use IPv4 only
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['@tui/browser', '@tui/core']
  }
});
