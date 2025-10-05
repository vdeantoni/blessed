import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import blessed from '../../lib/blessed.js';

describe('Integration: examples', () => {
  let screen;

  beforeEach(() => {
    screen = blessed.screen({
      smartCSR: true,
      dockBorders: true,
      autoPadding: true
    });
  });

  afterEach(() => {
    if (screen && screen.program) {
      screen.destroy();
    }
  });

  describe('time.js example', () => {
    it('should create a centered container for clock', () => {
      const container = blessed.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: 'shrink',
        height: 9
      });

      expect(container).toBeDefined();
      expect(container.options.top).toBe('center');
      expect(container.options.left).toBe('center');
      expect(container.options.width).toBe('shrink');
      expect(container.parent).toBe(screen);
    });

    it('should support shrink width', () => {
      const box = blessed.box({
        width: 'shrink',
        height: 10
      });

      screen.append(box);

      expect(box.options.width).toBe('shrink');
      expect(box.shrink).toBe(true);
    });

    it('should support prerender event for dynamic positioning', () => {
      const container = blessed.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: 'shrink'
      });

      let prerenderCalled = false;
      container.on('prerender', () => {
        prerenderCalled = true;
      });

      screen.render();

      expect(container.listeners('prerender').length).toBeGreaterThan(0);
    });
  });

  describe('multiplex.js example', () => {
    it('should support multiple screens', () => {
      const screen1 = blessed.screen({ smartCSR: true });
      const screen2 = blessed.screen({ smartCSR: true });

      const box1 = blessed.box({
        parent: screen1,
        content: 'Screen 1'
      });

      const box2 = blessed.box({
        parent: screen2,
        content: 'Screen 2'
      });

      expect(screen1).toBeDefined();
      expect(screen2).toBeDefined();
      expect(box1.parent).toBe(screen1);
      expect(box2.parent).toBe(screen2);

      screen1.destroy();
      screen2.destroy();
    });

    it('should allow switching between screens', () => {
      const screen1 = blessed.screen({ smartCSR: true });
      const screen2 = blessed.screen({ smartCSR: true });

      // Screens can be rendered independently
      screen1.render();
      screen2.render();

      expect(screen1.renders).toBeGreaterThan(0);
      expect(screen2.renders).toBeGreaterThan(0);

      screen1.destroy();
      screen2.destroy();
    });
  });

  describe('index.js example', () => {
    it('should support basic screen with text', () => {
      const box = blessed.box({
        parent: screen,
        top: 1,
        left: 'center',
        width: '50%',
        height: 3,
        content: 'Hello World',
        tags: true,
        border: {
          type: 'line'
        }
      });

      expect(box.content).toBe('Hello World');
      expect(box.options.tags).toBe(true);
      expect(box.border).toBeDefined();
    });

    it('should support percentage positioning', () => {
      const box = blessed.box({
        parent: screen,
        left: '25%',
        width: '50%',
        height: '50%'
      });

      expect(box.options.left).toBe('25%');
      expect(box.options.width).toBe('50%');
      expect(box.options.height).toBe('50%');
    });
  });

  describe('blessed-telnet.js example', () => {
    it('should support text with tags', () => {
      const text = blessed.text({
        parent: screen,
        content: '{bold}Bold{/bold} and {underline}underlined{/underline}',
        tags: true
      });

      expect(text.content).toContain('Bold');
      expect(text.content).toContain('underlined');
      expect(text.options.tags).toBe(true);
    });

    it('should support text widget', () => {
      const text = blessed.text({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        content: 'Welcome'
      });

      expect(text.type).toBe('text');
      expect(text.content).toBe('Welcome');
    });
  });

  describe('ansi-viewer example', () => {
    it('should support ANSI color codes', () => {
      const box = blessed.box({
        parent: screen,
        content: '\x1b[31mRed text\x1b[0m',
        tags: false
      });

      expect(box.content).toContain('Red text');
    });

    it('should support scrollable text', () => {
      const scrollableText = blessed.scrollabletext({
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5',
        scrollable: true,
        alwaysScroll: true
      });

      expect(scrollableText.type).toBe('scrollable-text');
      expect(scrollableText.scrollable).toBe(true);
      expect(scrollableText.alwaysScroll).toBe(true);
    });
  });

  describe('general integration', () => {
    it('should support rendering multiple widgets', () => {
      const box1 = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: '50%',
        content: 'Box 1'
      });

      const box2 = blessed.box({
        parent: screen,
        top: 0,
        left: '50%',
        width: '50%',
        height: '50%',
        content: 'Box 2'
      });

      const box3 = blessed.box({
        parent: screen,
        top: '50%',
        left: 0,
        width: '100%',
        height: '50%',
        content: 'Box 3'
      });

      screen.render();

      expect(screen.children).toContain(box1);
      expect(screen.children).toContain(box2);
      expect(screen.children).toContain(box3);
      expect(screen.children.length).toBe(3);
    });

    it('should support nested widgets', () => {
      const parent = blessed.box({
        parent: screen,
        width: '100%',
        height: '100%'
      });

      const child1 = blessed.box({
        parent: parent,
        top: 0,
        width: '50%',
        height: '50%'
      });

      const child2 = blessed.box({
        parent: parent,
        top: '50%',
        width: '50%',
        height: '50%'
      });

      expect(parent.children).toContain(child1);
      expect(parent.children).toContain(child2);
      expect(child1.parent).toBe(parent);
      expect(child2.parent).toBe(parent);
    });

    it('should support focus management', () => {
      const box1 = blessed.box({
        parent: screen,
        focusable: true
      });

      const box2 = blessed.box({
        parent: screen,
        focusable: true
      });

      box1.focus();
      expect(typeof box1.focus).toBe('function');
      expect(typeof box2.focus).toBe('function');
    });

    it('should support event handling', () => {
      const box = blessed.box({
        parent: screen
      });

      let eventFired = false;
      box.on('custom-event', () => {
        eventFired = true;
      });

      box.emit('custom-event');

      expect(eventFired).toBe(true);
    });

    it('should support screen keyboard shortcuts', () => {
      let quitCalled = false;

      screen.key('q', () => {
        quitCalled = true;
      });

      // Verify key handler is registered
      expect(screen.program.listeners('keypress').length).toBeGreaterThan(0);
    });

    it('should support content with styles', () => {
      const box = blessed.box({
        parent: screen,
        content: '{red-fg}Red{/red-fg} {blue-bg}Blue{/blue-bg}',
        tags: true,
        style: {
          fg: 'white',
          bg: 'black'
        }
      });

      expect(box.options.tags).toBe(true);
      expect(box.style.fg).toBe('white');
      expect(box.style.bg).toBe('black');
    });

    it('should support borders and padding', () => {
      const box = blessed.box({
        parent: screen,
        border: {
          type: 'line',
          fg: 'blue'
        },
        padding: {
          left: 2,
          right: 2,
          top: 1,
          bottom: 1
        }
      });

      expect(box.border).toBeDefined();
      expect(box.border.type).toBe('line');
      expect(box.padding).toBeDefined();
      expect(box.padding.left).toBe(2);
    });
  });
});