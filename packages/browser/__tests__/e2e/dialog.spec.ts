import { test, expect } from "@playwright/test";

/**
 * E2E tests for dialog widgets
 * Tests: Loading, Message, Prompt, Question
 */

test.describe("Dialog Widgets", () => {
  test.describe("Loading", () => {
    test("renders loading widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-loading.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasLoading = await page.evaluate(() => {
        return !!(
          window.testLoading && typeof window.testLoading.load === "function"
        );
      });

      expect(hasLoading).toBe(true);
    });

    test("loading starts and stops spinner", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-loading.html");
      await page.waitForFunction(() => window.testReady === true);

      // Start loading
      await page.evaluate(() => {
        window.testLoading.load("Loading...");
        window.testScreen.render();
      });

      const isLoading = await page.evaluate(() => {
        return window.testLoading.visible;
      });

      expect(isLoading).toBe(true);

      // Stop loading
      await page.evaluate(() => {
        window.testLoading.stop();
      });

      const isStopped = await page.evaluate(() => {
        return !window.testLoading.visible;
      });

      expect(isStopped).toBe(true);
    });
  });

  test.describe("Message", () => {
    test("renders message widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-message.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasMessage = await page.evaluate(() => {
        return !!(
          window.testMessage && typeof window.testMessage.display === "function"
        );
      });

      expect(hasMessage).toBe(true);
    });

    test("message displays text", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-message.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.evaluate(() => {
        window.testMessage.display("Test message", 1);
        window.testScreen.render();
      });

      const content = await page.evaluate(() => {
        return window.testMessage.content;
      });

      expect(content).toContain("Test message");
    });
  });

  test.describe("Prompt", () => {
    test("renders prompt widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-prompt.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasPrompt = await page.evaluate(() => {
        return !!(
          window.testPrompt && typeof window.testPrompt.readInput === "function"
        );
      });

      expect(hasPrompt).toBe(true);
    });

    test("prompt has input and buttons", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-prompt.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasComponents = await page.evaluate(() => {
        return !!(
          window.testPrompt._.input &&
          window.testPrompt._.okay &&
          window.testPrompt._.cancel
        );
      });

      expect(hasComponents).toBe(true);
    });
  });

  test.describe("Question", () => {
    test("renders question widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-question.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasQuestion = await page.evaluate(() => {
        return !!(
          window.testQuestion && typeof window.testQuestion.ask === "function"
        );
      });

      expect(hasQuestion).toBe(true);
    });

    test("question has okay and cancel buttons", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/dialog-question.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasButtons = await page.evaluate(() => {
        return !!(window.testQuestion._.okay && window.testQuestion._.cancel);
      });

      expect(hasButtons).toBe(true);
    });
  });
});
