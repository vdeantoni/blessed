import { test, expect } from '@playwright/test';

/**
 * E2E tests for blessed-browser functionality
 * Tests IIFE bundle usage and basic widget interactions
 */

test.describe('blessed-browser', () => {
  test.describe('IIFE Bundle', () => {
    test('loads with IIFE bundle', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');

      // Wait for blessed-browser to be ready
      await page.waitForFunction(() => window.testReady === true, { timeout: 5000 });

      // Check that BlessedBrowser global exists
      const hasBlessedBrowser = await page.evaluate(() => {
        return typeof window.BlessedBrowser !== 'undefined';
      });
      expect(hasBlessedBrowser).toBe(true);

      // Check that test objects are exposed
      const hasTestObjects = await page.evaluate(() => {
        return !!(window.testBox && window.testScreen);
      });
      expect(hasTestObjects).toBe(true);
    });

    test('renders box content', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const boxContent = await page.evaluate(() => {
        return window.testBox.content;
      });

      expect(boxContent).toBe('Test Box Content');
    });

    test('has blessed API available', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const blessedAPIs = await page.evaluate(() => {
        const { blessed } = window.BlessedBrowser;
        return {
          hasBox: typeof blessed.box === 'function',
          hasList: typeof blessed.list === 'function',
          hasTextbox: typeof blessed.textbox === 'function',
          hasScreen: typeof blessed.screen === 'function',
        };
      });

      expect(blessedAPIs.hasBox).toBe(true);
      expect(blessedAPIs.hasList).toBe(true);
      expect(blessedAPIs.hasTextbox).toBe(true);
      expect(blessedAPIs.hasScreen).toBe(true);
    });
  });
});
