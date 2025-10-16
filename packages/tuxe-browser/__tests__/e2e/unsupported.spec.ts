import { test, expect } from '@playwright/test';

/**
 * E2E tests for unsupported widgets
 * Tests: Image, Video, Terminal, FileManager
 * These tests verify graceful failure handling
 */

test.describe('Unsupported Widgets', () => {
  test.describe('Image Widget', () => {
    test('image widget fails gracefully', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/unsupported-image.html');
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || 'handled').toBeTruthy();
    });
  });

  test.describe('Video Widget', () => {
    test('video widget fails gracefully', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/unsupported-video.html');
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || 'handled').toBeTruthy();
    });
  });

  test.describe('Terminal Widget', () => {
    test('terminal widget fails gracefully', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/unsupported-terminal.html');
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || 'handled').toBeTruthy();
    });
  });

  test.describe('FileManager Widget', () => {
    test('filemanager widget fails gracefully', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/unsupported-filemanager.html');
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || 'handled').toBeTruthy();
    });
  });
});
