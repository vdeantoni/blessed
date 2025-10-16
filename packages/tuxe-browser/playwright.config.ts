import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E tests
 * Tests blessed-browser in real browsers with xterm.js
 */
export default defineConfig({
  testDir: './__tests__/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Run local dev server before tests
  webServer: {
    command: 'npx http-server -p 8080 --silent',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    cwd: '.',
  },
});
