import { test, expect } from '@playwright/test';

/**
 * E2E tests for basic blessed widgets
 * Tests: Box, Text, ScrollableBox, ScrollableText, Line
 */

test.describe('Basic Widgets', () => {
  test.describe('Box', () => {
    test('renders box with content', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const boxContent = await page.evaluate(() => {
        return window.testBox.content;
      });

      expect(boxContent).toBe('Test Box Content');
    });

    test('box has correct dimensions', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const dimensions = await page.evaluate(() => {
        return {
          width: window.testBox.width,
          height: window.testBox.height,
        };
      });

      expect(dimensions.width).toBe(30);
      expect(dimensions.height).toBe(10);
    });

    test('box supports style changes', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/basic-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const hasStyle = await page.evaluate(() => {
        return !!(window.testBox.style && window.testBox.style.fg);
      });

      expect(hasStyle).toBe(true);
    });
  });

  test.describe('Text', () => {
    test('renders text widget', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/text-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const content = await page.evaluate(() => {
        return window.testText.content;
      });

      expect(content).toContain('Static Text');
    });

    test('text widget updates content', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/text-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      await page.evaluate(() => {
        window.testText.setContent('Updated Text');
        window.testScreen.render();
      });

      const content = await page.evaluate(() => {
        return window.testText.content;
      });

      expect(content).toBe('Updated Text');
    });
  });

  test.describe('ScrollableBox', () => {
    test('renders scrollable content', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/scrollable-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const hasContent = await page.evaluate(() => {
        return window.testScrollBox.getScrollHeight() > 0;
      });

      expect(hasContent).toBe(true);
    });

    test('scrollable box responds to scroll', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/scrollable-box.html');
      await page.waitForFunction(() => window.testReady === true);

      const initialScroll = await page.evaluate(() => {
        return window.testScrollBox.getScrollPerc();
      });

      await page.evaluate(() => {
        window.testScrollBox.scroll(5);
        window.testScreen.render();
      });

      const newScroll = await page.evaluate(() => {
        return window.testScrollBox.getScrollPerc();
      });

      expect(newScroll).not.toBe(initialScroll);
    });
  });

  test.describe('Line', () => {
    test('renders line widget', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/line-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const lineType = await page.evaluate(() => {
        return window.testLine.type;
      });

      expect(lineType).toBe('line');
    });
  });

  test.describe('ScrollableText', () => {
    test('renders scrollabletext widget', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/scrollabletext-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const hasScrollableText = await page.evaluate(() => {
        return !!(window.testScrollableText && window.testScrollableText.type === 'scrollable-text');
      });

      expect(hasScrollableText).toBe(true);
    });

    test('scrollabletext has alwaysScroll enabled', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/scrollabletext-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const alwaysScroll = await page.evaluate(() => {
        return window.testScrollableText.alwaysScroll;
      });

      expect(alwaysScroll).toBe(true);
    });

    test('scrollabletext can scroll', async ({ page }) => {
      await page.goto('/__tests__/e2e/fixtures/scrollabletext-widget.html');
      await page.waitForFunction(() => window.testReady === true);

      const canScroll = await page.evaluate(() => {
        return typeof window.testScrollableText.scroll === 'function';
      });

      expect(canScroll).toBe(true);
    });
  });
});
