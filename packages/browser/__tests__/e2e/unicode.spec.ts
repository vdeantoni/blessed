import { test, expect } from "@playwright/test";

/**
 * E2E tests for Unicode and Emoji support
 * Tests emoji rendering, box-drawing characters, and Unicode version support
 */

test.describe("Unicode and Emoji Support", () => {
  // Setup: navigate to test fixture before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/__tests__/e2e/fixtures/unicode-emoji.html");
    await page.waitForFunction(() => window.testReady === true);
  });

  test("terminal has Unicode 11 support configured", async ({ page }) => {
    const unicodeInfo = await page.evaluate(() => ({
      versions: window.testTerminal.unicode.versions,
      activeVersion: window.testTerminal.unicode.activeVersion,
    }));

    expect(unicodeInfo.versions).toBeDefined();
    expect(unicodeInfo.versions.length).toBeGreaterThan(0);
    expect(unicodeInfo.activeVersion).toBeDefined();
    expect(unicodeInfo.versions).toContain(unicodeInfo.activeVersion);
  });

  test("emojis render correctly (not replaced with ?)", async ({ page }) => {
    const terminalContent = await page.evaluate(() => {
      const term = window.testTerminal;
      let text = "";

      // Read all terminal buffer content
      for (let row = 0; row < term.rows; row++) {
        const line = term.buffer.active.getLine(row);
        if (line) {
          text += line.translateToString(true) + "\n";
        }
      }

      return text;
    });

    // Verify specific emojis are present (not replaced with "?")
    expect(terminalContent).toContain("💬"); // Speech balloon
    expect(terminalContent).toContain("🤖"); // Robot face
    expect(terminalContent).toContain("✓"); // Checkmark
    expect(terminalContent).toContain("✨"); // Sparkles
    expect(terminalContent).toContain("📁"); // Folder
    expect(terminalContent).toContain("🚀"); // Rocket

    // Ensure emojis are NOT replaced with "?"
    const emojiLines = terminalContent
      .split("\n")
      .filter((line) => line.includes("Speech") || line.includes("Robot"));
    expect(emojiLines.some((line) => line.includes("?"))).toBe(false);
  });

  test("box-drawing characters render correctly", async ({ page }) => {
    const terminalContent = await page.evaluate(() => {
      const term = window.testTerminal;
      let text = "";

      for (let row = 0; row < term.rows; row++) {
        const line = term.buffer.active.getLine(row);
        if (line) {
          text += line.translateToString(true) + "\n";
        }
      }

      return text;
    });

    // Verify box-drawing characters are present
    expect(terminalContent).toContain("━"); // Horizontal line
    expect(terminalContent).toContain("│"); // Vertical line
    expect(terminalContent).toContain("┌"); // Top-left corner
    expect(terminalContent).toContain("└"); // Bottom-left corner
  });

  test("log widget displays emojis correctly", async ({ page }) => {
    const logContent = await page.evaluate(() => window.testLog.getContent());

    // Log should contain emojis and messages
    expect(logContent).toContain("💬");
    expect(logContent).toContain("🤖");
    expect(logContent).toContain("✓");
    expect(logContent).toContain("Message");
  });

  test("screen renders without Unicode errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.evaluate(() => window.testScreen.render());
    await page.waitForTimeout(100);

    // Should not have Unicode-related errors
    const unicodeErrors = errors.filter(
      (err) =>
        err.toLowerCase().includes("unicode") ||
        err.toLowerCase().includes("emoji"),
    );

    expect(unicodeErrors.length).toBe(0);
  });
});
