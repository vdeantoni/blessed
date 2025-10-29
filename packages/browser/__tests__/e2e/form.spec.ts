import { expect, test } from "@playwright/test";

/**
 * E2E tests for form widgets
 * Tests: Form, Checkbox, RadioButton, RadioSet
 */

test.describe("Form Widgets", () => {
  test.describe("Form", () => {
    test("renders form with fields", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/form-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasForm = await page.evaluate(() => {
        return !!(window.testForm && window.testForm.children);
      });

      expect(hasForm).toBe(true);
    });

    test("form collects data from fields", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/form-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.click("#terminal");
      await page.keyboard.type("John Doe");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(150);
      await page.keyboard.type("john@example.com");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(150);
      await page.keyboard.press("Enter");
      await page.waitForTimeout(100);

      const formData = await page.evaluate(() => window.formData);

      expect(formData).not.toBeNull();
      expect(formData.name).toContain("John Doe");
      expect(formData.email).toContain("john@example.com");
    });
  });

  test.describe("Checkbox", () => {
    test("renders checkbox widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/checkbox-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasCheckbox = await page.evaluate(() => {
        return !!(
          window.testCheckbox && typeof window.testCheckbox.check === "function"
        );
      });

      expect(hasCheckbox).toBe(true);
    });

    test("checkbox toggles state", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/checkbox-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const initialState = await page.evaluate(() => {
        return window.testCheckbox.checked;
      });

      await page.click("#terminal");
      await page.keyboard.press("Space");
      await page.waitForTimeout(100);

      const newState = await page.evaluate(() => {
        return window.testCheckbox.checked;
      });

      expect(newState).not.toBe(initialState);
    });
  });

  test.describe("RadioButton", () => {
    test("renders radio buttons", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/radio-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasRadios = await page.evaluate(() => {
        return !!(window.testRadio1 && window.testRadio2);
      });

      expect(hasRadios).toBe(true);
    });

    test("radio buttons are mutually exclusive", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/radio-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      await page.evaluate(() => {
        window.testRadio1.check();
        window.testScreen.render();
      });

      const radio1Checked = await page.evaluate(
        () => window.testRadio1.checked,
      );
      expect(radio1Checked).toBe(true);

      await page.evaluate(() => {
        window.testRadio2.check();
        window.testScreen.render();
      });

      const radio1After = await page.evaluate(() => window.testRadio1.checked);
      const radio2After = await page.evaluate(() => window.testRadio2.checked);

      expect(radio1After).toBe(false);
      expect(radio2After).toBe(true);
    });
  });

  test.describe("RadioSet", () => {
    test("renders radioset widget", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/radioset-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasRadioSet = await page.evaluate(() => {
        return !!(
          window.testRadioSet && window.testRadioSet.type === "radio-set"
        );
      });

      expect(hasRadioSet).toBe(true);
    });

    test("radioset contains radio buttons", async ({ page }) => {
      await page.goto("/__tests__/e2e/fixtures/radioset-widget.html");
      await page.waitForFunction(() => window.testReady === true);

      const hasChildren = await page.evaluate(() => {
        return (
          window.testRadioSet.children &&
          window.testRadioSet.children.length > 0
        );
      });

      expect(hasChildren).toBe(true);
    });
  });
});
