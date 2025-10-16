import { test, expect } from '@playwright/test';

/**
 * E2E tests for layout widget
 * Tests: Layout
 */

test.describe('Layout Widget', () => {
  test.describe('Layout', () => {
    test('renders layout widget', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/layout-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const hasLayout = await page.evaluate(() => {
        return !!(window.testLayout && window.testLayout.type === 'layout');
      });

      expect(hasLayout).toBe(true);
    });

    test('layout has children', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/layout-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const childCount = await page.evaluate(() => {
        return window.testLayout.children.length;
      });

      expect(childCount).toBeGreaterThan(0);
    });

    test('layout renders children inline', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/layout-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const layoutType = await page.evaluate(() => {
        return window.testLayout.options.layout;
      });

      expect(layoutType).toBe('inline');
    });
  });
});
