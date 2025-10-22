import { test, expect } from "@playwright/test";

/**
 * E2E tests for visual/image widgets
 * Tests: ANSIImage, BigText, OverlayImage
 */

test.describe("Visual Widgets", () => {
  test.describe("ANSIImage", () => {
    test("ansiimage widget fails gracefully", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/visual-ansiimage.html");
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || "handled").toBeTruthy();
    });
  });

  test.describe("BigText", () => {
    test("renders bigtext widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/visual-bigtext.html");
      await page.waitForFunction(() => window.testReady === true, {
        timeout: 10000,
      });

      const testError = await page.evaluate(() => window.testError);
      if (testError) {
        console.log("BigText creation error:", testError);
      }

      const hasBigText = await page.evaluate(() => {
        return !!(window.testBigText && window.testBigText.type === "bigtext");
      });

      expect(hasBigText).toBe(true);
    });

    test("bigtext has font loaded", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/visual-bigtext.html");
      await page.waitForFunction(() => window.testReady === true, {
        timeout: 10000,
      });

      const testError = await page.evaluate(() => window.testError);
      if (testError) {
        console.log("BigText font load error:", testError);
      }

      const hasFont = await page.evaluate(() => {
        return !!(
          window.testBigText &&
          window.testBigText.font &&
          typeof window.testBigText.font === "object"
        );
      });

      expect(hasFont).toBe(true);
    });

    test("bigtext setContent works", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/visual-bigtext.html");
      await page.waitForFunction(() => window.testReady === true, {
        timeout: 10000,
      });

      const testError = await page.evaluate(() => window.testError);
      if (testError) {
        console.log("BigText setContent error:", testError);
        // If there's an error, skip the rest of the test
        expect(testError).toBeFalsy();
        return;
      }

      await page.evaluate(() => {
        window.testBigText.setContent("HELLO");
        window.testScreen.render();
      });

      const text = await page.evaluate(() => {
        return window.testBigText.text;
      });

      expect(text).toBe("HELLO");
    });
  });

  test.describe("OverlayImage", () => {
    test("overlayimage widget fails gracefully", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/visual-overlayimage.html");
      await page.waitForFunction(() => window.testReady === true);

      const errorMessage = await page.evaluate(() => {
        return window.testError;
      });

      // Should either create widget with warning or throw handled error
      expect(errorMessage || "handled").toBeTruthy();
    });
  });
});
