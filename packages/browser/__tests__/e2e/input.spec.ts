import { expect, test } from "@playwright/test";

/**
 * E2E tests for input widgets
 * Tests: Textbox, Textarea, Input, Button
 */

test.describe("Input Widgets", () => {
  test.describe("Textbox", () => {
    test("accepts keyboard input", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/textbox-input.html");
      await page.waitForFunction(() => window.testReady === true);

      // Focus terminal and type
      await page.click("#terminal");
      await page.keyboard.type("hello");
      await page.waitForTimeout(100);

      const value = await page.evaluate(() => {
        return window.testTextbox.value;
      });

      expect(value).toContain("hello");
    });

    test("textbox is focused on load", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/textbox-input.html");
      await page.waitForFunction(() => window.testReady === true);

      const isFocused = await page.evaluate(() => {
        return window.testScreen.focused === window.testTextbox;
      });

      expect(isFocused).toBe(true);
    });
  });

  test.describe("Button", () => {
    test("renders button widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/button-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const buttonText = await page.evaluate(() => {
        return window.testButton.content;
      });

      expect(buttonText).toContain("Click Me");
    });

    test("button fires press event", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/button-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.click("#terminal");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(100);

      const clickCount = await page.evaluate(() => {
        return window.clickCount;
      });

      expect(clickCount).toBeGreaterThan(0);
    });
  });

  test.describe("Textarea", () => {
    test("accepts multiline input", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/textarea-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.click("#terminal");
      await page.keyboard.type("Line 1");
      await page.keyboard.press("Enter");
      await page.keyboard.type("Line 2");
      await page.waitForTimeout(100);

      const value = await page.evaluate(() => {
        return window.testTextarea.getValue();
      });

      expect(value).toContain("Line 1");
      expect(value).toContain("Line 2");
    });
  });

  test.describe("Input", () => {
    test("renders input widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/input-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasInput = await page.evaluate(() => {
        return !!(
          window.testInput && typeof window.testInput.setValue === "function"
        );
      });

      expect(hasInput).toBe(true);
    });

    test("input accepts text", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/input-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.click("#terminal");
      await page.keyboard.type("test input");
      await page.waitForTimeout(100);

      const value = await page.evaluate(() => {
        return window.testInput.value;
      });

      expect(value).toContain("test input");
    });
  });
});
