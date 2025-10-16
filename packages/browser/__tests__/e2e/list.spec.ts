import { test, expect } from '@playwright/test';

/**
 * E2E tests for list widgets
 * Tests: List, ListBar, ListTable
 */

test.describe('List Widgets', () => {
  test.describe('List', () => {
    test('navigates with arrow keys', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/list-navigation.html');
      await page.waitForFunction(() => window.testReady === true);

      // Get initial selection
      const initialIndex = await page.evaluate(() => {
        return window.testList.selected;
      });

      // Press down arrow
      await page.click('#terminal');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);

      const newIndex = await page.evaluate(() => {
        return window.testList.selected;
      });

      expect(newIndex).toBe(initialIndex + 1);
    });

    test('fires select event', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/list-navigation.html');
      await page.waitForFunction(() => window.testReady === true);

      // Press Enter to select
      await page.click('#terminal');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      const statusText = await page.evaluate(() => {
        return window.testStatus.content;
      });

      expect(statusText).toMatch(/Selected: Item \d+ \(index: \d+\)/);
    });

    test('list has correct item count', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/list-navigation.html');
      await page.waitForFunction(() => window.testReady === true);

      const itemCount = await page.evaluate(() => {
        return window.testList.items.length;
      });

      expect(itemCount).toBe(5);
    });
  });

  test.describe('ListBar', () => {
    test('renders listbar widget', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/listbar-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const hasCommands = await page.evaluate(() => {
        return window.testListBar.commands && Object.keys(window.testListBar.commands).length > 0;
      });

      expect(hasCommands).toBe(true);
    });

    test('listbar navigates between items', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/listbar-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      await page.click('#terminal');
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      const selectedCommand = await page.evaluate(() => {
        return window.selectedCommand;
      });

      expect(selectedCommand).toBeTruthy();
    });

    test('listbar triggers command via keyboard shortcut', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/listbar-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      // Press 'e' to directly trigger Edit command
      await page.click('#terminal');
      await page.keyboard.press('e');
      await page.waitForTimeout(100);

      const selectedCommand = await page.evaluate(() => {
        return window.selectedCommand;
      });

      expect(selectedCommand).toBe('Edit');
    });
  });

  test.describe('ListTable', () => {
    test('renders table with rows', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/listtable-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const rowCount = await page.evaluate(() => {
        return window.testListTable.rows && window.testListTable.rows.length;
      });

      expect(rowCount).toBeGreaterThan(0);
    });

    test('listtable supports navigation', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/listtable-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const initialRow = await page.evaluate(() => {
        return window.testListTable.selected;
      });

      await page.click('#terminal');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);

      const newRow = await page.evaluate(() => {
        return window.testListTable.selected;
      });

      expect(newRow).toBe(initialRow + 1);
    });
  });
});
