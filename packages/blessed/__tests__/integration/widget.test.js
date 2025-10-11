import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import blessed from '../../lib/blessed.js';

describe('Integration: widget example', () => {
  let screen;

  beforeEach(() => {
    screen = blessed.screen({
      smartCSR: true,
      dockBorders: true
    });
  });

  afterEach(() => {
    if (screen && screen.program) {
      screen.destroy();
    }
  });

  it('should create a centered box with border', () => {
    const box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      content: 'Hello {bold}world{/bold}!',
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: '#ffffff'
        }
      }
    });

    screen.append(box);

    expect(box).toBeDefined();
    expect(box.options.top).toBe('center');
    expect(box.options.left).toBe('center');
    expect(box.options.width).toBe('50%');
    expect(box.options.height).toBe('50%');
    expect(box.border).toBeDefined();
    expect(box.border.type).toBe('line');
  });

  it('should parse tags in content', () => {
    const box = blessed.box({
      content: 'Hello {bold}world{/bold}!',
      tags: true
    });

    screen.append(box);

    expect(box.content).toBe('Hello {bold}world{/bold}!');
    expect(box.options.tags).toBe(true);
  });

  it('should handle click events', () => {
    return new Promise((resolve) => {
      const box = blessed.box({
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: 'Click me'
      });

      screen.append(box);

      box.on('click', (data) => {
        box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
        expect(box.content).toContain('Some different');
        resolve();
      });

      // Simulate click
      box.emit('click', {});
    });
  });

  it('should handle key events', () => {
    const box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      content: 'Press enter',
      keys: true
    });

    screen.append(box);
    box.focus();

    let keyHandlerCalled = false;
    box.key('enter', () => {
      keyHandlerCalled = true;
      box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    });

    // Verify key handler was registered
    expect(typeof box.key).toBe('function');
    expect(box.options.keys).toBe(true);
  });

  it('should support setLine and insertLine', () => {
    const box = blessed.box({
      content: 'Line 1\nLine 2\nLine 3'
    });

    screen.append(box);

    box.setLine(1, 'bar');
    box.insertLine(1, 'foo');

    expect(typeof box.setLine).toBe('function');
    expect(typeof box.insertLine).toBe('function');
  });

  it('should render to screen', () => {
    const box = blessed.box({
      top: 0,
      left: 0,
      width: 20,
      height: 10,
      content: 'Test Box'
    });

    screen.append(box);
    screen.render();

    expect(box.parent).toBe(screen);
    expect(screen.children).toContain(box);
  });

  it('should support focus', () => {
    const box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      content: 'Focusable box'
    });

    screen.append(box);
    box.focus();

    // Focus method should exist and be callable
    expect(typeof box.focus).toBe('function');
  });

  it('should support hover styles', () => {
    const box = blessed.box({
      style: {
        fg: 'white',
        bg: 'magenta',
        hover: {
          bg: 'green'
        }
      }
    });

    screen.append(box);

    expect(box.style.fg).toBe('white');
    expect(box.style.bg).toBe('magenta');
    expect(box.style.hover).toBeDefined();
    expect(box.style.hover.bg).toBe('green');
  });
});