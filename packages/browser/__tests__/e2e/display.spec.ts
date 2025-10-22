import { test, expect } from "@playwright/test";

/**
 * E2E tests for display widgets
 * Tests: ProgressBar, Table, Log
 */

test.describe("Display Widgets", () => {
  test.describe("ProgressBar", () => {
    test("renders progressbar", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/progressbar-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasProgressBar = await page.evaluate(() => {
        return !!(
          window.testProgressBar &&
          typeof window.testProgressBar.setProgress === "function" &&
          typeof window.testProgressBar.filled === "number"
        );
      });

      expect(hasProgressBar).toBe(true);
    });

    test("progressbar updates progress", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/progressbar-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const initialProgress = await page.evaluate(() => {
        return window.testProgressBar.filled;
      });

      await page.evaluate(() => {
        window.testProgressBar.setProgress(50);
        window.testScreen.render();
      });

      const newProgress = await page.evaluate(() => {
        return window.testProgressBar.filled;
      });

      expect(newProgress).toBe(50);
      expect(newProgress).toBeGreaterThan(initialProgress);
    });
  });

  test.describe("Table", () => {
    test("renders table widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/table-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasTable = await page.evaluate(() => {
        return !!(window.testTable && window.testTable.rows);
      });

      expect(hasTable).toBe(true);
    });

    test("table displays data", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/table-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const rowCount = await page.evaluate(() => {
        return window.testTable.rows && window.testTable.rows.length;
      });

      expect(rowCount).toBeGreaterThan(0);
    });
  });

  test.describe("Log", () => {
    test("renders log widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/log-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasLog = await page.evaluate(() => {
        return !!(window.testLog && typeof window.testLog.log === "function");
      });

      expect(hasLog).toBe(true);
    });

    test("log adds messages", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/log-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.evaluate(() => {
        window.testLog.log("New log message");
      });

      const logContent = await page.evaluate(() => {
        return window.testLog.getContent();
      });

      expect(logContent).toContain("New log message");
    });
  });
});
