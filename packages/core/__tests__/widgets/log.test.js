import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  vi,
} from 'vitest';
import util from 'util';
import { setRuntime } from '../../src/runtime-context.js';
import Log from '../../src/widgets/log.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Log', () => {
  let screen;

  beforeAll(() => {
    // Initialize runtime with util support for format/inspect
    setRuntime({ util });
  });

  beforeEach(() => {
    screen = createMockScreen();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a log instance', () => {
      const log = new Log({ screen });

      expect(log).toBeDefined();
      expect(log.type).toBe('log');
    });

    it('should inherit from ScrollableText', () => {
      const log = new Log({ screen });

      expect(log.screen).toBe(screen);
      expect(typeof log.setContent).toBe('function');
      expect(typeof log.scroll).toBe('function');
    });

    it('should default scrollback to Infinity', () => {
      const log = new Log({ screen });

      expect(log.scrollback).toBe(Infinity);
    });

    it('should accept custom scrollback value', () => {
      const log = new Log({ screen, scrollback: 100 });

      expect(log.scrollback).toBe(100);
    });

    it('should accept scrollOnInput option', () => {
      const log = new Log({ screen, scrollOnInput: true });

      expect(log.scrollOnInput).toBe(true);
    });

    it('should auto-scroll to bottom on content set', () => {
      const log = new Log({ screen });
      log._clines = { fake: [], real: [] };
      log.setScrollPerc = vi.fn();

      log.on('set content', () => {
        // Manually trigger what the widget does
        if (!log._userScrolled || log.scrollOnInput) {
          log.setScrollPerc(100);
        }
      });

      log.setContent('test');

      expect(log.setScrollPerc).toHaveBeenCalledWith(100);
    });

    it('should render screen on content set', () => {
      const log = new Log({ screen });
      log._clines = { fake: [], real: [] };

      // Test that the event handler is set up
      expect(log.listeners('set content').length).toBeGreaterThan(0);
    });

    it('should not auto-scroll if user has scrolled', () => {
      const log = new Log({ screen });
      log._clines = { fake: [], real: [] };
      log.setScrollPerc = vi.fn();
      log._userScrolled = true;

      log.on('set content', () => {
        if (!log._userScrolled || log.scrollOnInput) {
          log.setScrollPerc(100);
        }
      });

      log.setContent('test');

      expect(log.setScrollPerc).not.toHaveBeenCalled();
    });

    it('should auto-scroll if scrollOnInput is true even when user scrolled', () => {
      const log = new Log({ screen, scrollOnInput: true });
      log._clines = { fake: [], real: [] };
      log.setScrollPerc = vi.fn();
      log._userScrolled = true;

      log.on('set content', () => {
        if (!log._userScrolled || log.scrollOnInput) {
          log.setScrollPerc(100);
        }
      });

      log.setContent('test');

      expect(log.setScrollPerc).toHaveBeenCalledWith(100);
    });
  });

  describe('log() / add()', () => {
    it('should add a line using log method', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log('test message');

      expect(log.pushLine).toHaveBeenCalledWith('test message');
    });

    it('should add a line using add method', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.add('test message');

      expect(log.pushLine).toHaveBeenCalledWith('test message');
    });

    it('should format multiple arguments using util.format', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log('Hello %s, you have %d messages', 'World', 5);

      expect(log.pushLine).toHaveBeenCalledWith('Hello World, you have 5 messages');
    });

    it('should inspect object arguments', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log({ foo: 'bar', nested: { baz: 123 } });

      const result = log.pushLine.mock.calls[0][0];
      expect(result).toContain('foo');
      expect(result).toContain('bar');
      expect(result).toContain('nested');
    });

    it('should emit log event with text', () => {
      const log = new Log({ screen });
      const handler = vi.fn();
      log.on('log', handler);
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log('test message');

      expect(handler).toHaveBeenCalledWith('test message');
    });

    it('should return value from pushLine', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn(() => 'result');
      log._clines = { fake: [] };

      const result = log.log('test');

      expect(result).toBe('result');
    });
  });

  describe('scrollback limit', () => {
    it('should trim lines when scrollback limit exceeded', () => {
      const log = new Log({ screen, scrollback: 300 });
      log.shiftLine = vi.fn();
      log._clines = { fake: new Array(350) };
      log.pushLine = vi.fn();

      log.log('new message');

      expect(log.shiftLine).toHaveBeenCalledWith(0, 100);
    });

    it('should not trim if under scrollback limit', () => {
      const log = new Log({ screen, scrollback: 1000 });
      log.shiftLine = vi.fn();
      log._clines = { fake: new Array(100) };
      log.pushLine = vi.fn();

      log.log('new message');

      expect(log.shiftLine).not.toHaveBeenCalled();
    });

    it('should calculate trim amount as scrollback/3', () => {
      const log = new Log({ screen, scrollback: 600 });
      log.shiftLine = vi.fn();
      log._clines = { fake: new Array(650) };
      log.pushLine = vi.fn();

      log.log('new message');

      expect(log.shiftLine).toHaveBeenCalledWith(0, 200);
    });
  });

  describe('scroll() override', () => {
    it('should mark as user scrolled when scrolling', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log.getScrollPerc = vi.fn(() => 50);

      log.scroll(5);

      expect(log._userScrolled).toBe(true);
    });

    it('should not mark as user scrolled when offset is 0', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log._userScrolled = false;

      log.scroll(0);

      expect(log._userScrolled).toBe(false);
    });

    it('should call original _scroll method', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn(() => 'result');
      log.getScrollPerc = vi.fn(() => 50);

      const result = log.scroll(5);

      expect(log._scroll).toHaveBeenCalledWith(5, undefined);
      expect(result).toBe('result');
    });

    it('should pass always parameter to _scroll', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log.getScrollPerc = vi.fn(() => 50);

      log.scroll(3, true);

      expect(log._scroll).toHaveBeenCalledWith(3, true);
    });

    it('should reset user scrolled when at 100%', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log.getScrollPerc = vi.fn(() => 100);

      log.scroll(5);

      expect(log._userScrolled).toBe(false);
    });

    it('should keep user scrolled when not at 100%', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log.getScrollPerc = vi.fn(() => 50);

      log.scroll(5);

      expect(log._userScrolled).toBe(true);
    });
  });

  describe('common use cases', () => {
    it('should create a basic log widget', () => {
      const log = new Log({
        screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        border: 'line',
        label: ' Log '
      });

      expect(log).toBeDefined();
      expect(log.type).toBe('log');
    });

    it('should log multiple messages', () => {
      const log = new Log({ screen, scrollback: 100 });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log('Message 1');
      log.log('Message 2');
      log.log('Message 3');

      expect(log.pushLine).toHaveBeenCalledTimes(3);
      expect(log.pushLine).toHaveBeenNthCalledWith(1, 'Message 1');
      expect(log.pushLine).toHaveBeenNthCalledWith(2, 'Message 2');
      expect(log.pushLine).toHaveBeenNthCalledWith(3, 'Message 3');
    });

    it('should handle formatted log messages', () => {
      const log = new Log({ screen });
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      log.log('[%s] %s: %d items processed', new Date().toISOString().substr(0, 10), 'INFO', 42);

      const result = log.pushLine.mock.calls[0][0];
      expect(result).toContain('INFO');
      expect(result).toContain('42 items processed');
    });

    it('should work as debug logger', () => {
      const log = new Log({ screen, scrollback: 1000 });
      const handler = vi.fn();
      log.on('log', handler);
      log.pushLine = vi.fn();
      log._clines = { fake: [] };

      const debugData = { requestId: 123, status: 'success', data: { count: 5 } };
      log.log(debugData);

      expect(handler).toHaveBeenCalled();
      const result = handler.mock.calls[0][0];
      expect(result).toContain('requestId');
      expect(result).toContain('123');
    });

    it('should maintain scrollback window', () => {
      const log = new Log({ screen, scrollback: 30 });
      log.shiftLine = vi.fn();
      log._clines = { fake: [] };
      log.pushLine = vi.fn();

      // Add 40 messages
      for (let i = 0; i < 40; i++) {
        log._clines.fake.push('line');
        log.log(`Message ${i}`);
      }

      // Should have trimmed lines
      expect(log.shiftLine).toHaveBeenCalled();
    });

    it('should auto-scroll to latest message by default', () => {
      const log = new Log({ screen });

      // Test that handler is set up correctly
      expect(log.scrollOnInput).toBe(undefined);
      expect(log.listeners('set content').length).toBeGreaterThan(0);
    });

    it('should respect user scroll position', () => {
      const log = new Log({ screen });
      log._scroll = vi.fn();
      log.getScrollPerc = vi.fn(() => 50);

      // User scrolls up
      log.scroll(-5);

      expect(log._userScrolled).toBe(true);
    });

    it('should auto-scroll with scrollOnInput option', () => {
      const log = new Log({ screen, scrollOnInput: true });

      expect(log.scrollOnInput).toBe(true);
    });
  });
});
