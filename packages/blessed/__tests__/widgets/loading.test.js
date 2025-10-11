import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Loading from '../../lib/widgets/loading.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Loading', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should create a loading instance', () => {
      const loading = new Loading({ screen });

      expect(loading).toBeDefined();
      expect(loading.type).toBe('loading');
    });

    it('should inherit from Box', () => {
      const loading = new Loading({ screen });

      expect(loading.screen).toBe(screen);
      expect(typeof loading.append).toBe('function');
    });

    it('should preserve methods when scrollable is true', () => {
      const loading = new Loading({ screen, scrollable: true });

      expect(loading.type).toBe('loading');
      expect(typeof loading.load).toBe('function');
      expect(typeof loading.stop).toBe('function');
    });

    it('should create icon text element', () => {
      const loading = new Loading({ screen });

      expect(loading._.icon).toBeDefined();
      expect(loading._.icon.content).toBe('|');
    });

    it('should position icon in center', () => {
      const loading = new Loading({ screen });

      expect(loading._.icon.align).toBe('center');
      expect(loading._.icon.height).toBe(1);
    });

    it('should position icon with proper spacing', () => {
      const loading = new Loading({ screen });

      expect(loading._.icon.options.top).toBe(2);
      expect(loading._.icon.options.left).toBe(1);
      expect(loading._.icon.options.right).toBe(1);
    });

    it('should set icon as child', () => {
      const loading = new Loading({ screen });

      expect(loading._.icon.parent).toBe(loading);
    });
  });

  describe('load()', () => {
    it('should show the loading widget', () => {
      const loading = new Loading({ screen });
      loading.show = vi.fn();

      loading.load('Loading...');

      expect(loading.show).toHaveBeenCalled();
    });

    it('should set content text', () => {
      const loading = new Loading({ screen });

      loading.load('Please wait...');

      expect(loading.content).toBe('Please wait...');
    });

    it('should lock keyboard', () => {
      const loading = new Loading({ screen });

      loading.load('Loading...');

      expect(screen.lockKeys).toBe(true);
    });

    it('should start animation timer', () => {
      const loading = new Loading({ screen });

      loading.load('Loading...');

      expect(loading._.timer).toBeDefined();
    });

    it('should stop previous timer if exists', () => {
      const loading = new Loading({ screen });
      loading.stop = vi.fn();

      loading.load('First');
      const firstTimer = loading._.timer;

      loading.load('Second');

      expect(loading.stop).toHaveBeenCalled();
    });

    it('should animate icon through cycle', () => {
      const loading = new Loading({ screen });
      screen.render = vi.fn();

      loading.load('Loading...');

      expect(loading._.icon.content).toBe('|');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('/');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('-');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('\\');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('|');
    });

    it('should render on each animation frame', () => {
      const loading = new Loading({ screen });
      screen.render = vi.fn();

      loading.load('Loading...');

      const renderCount = screen.render.mock.calls.length;

      vi.advanceTimersByTime(200);

      expect(screen.render.mock.calls.length).toBeGreaterThan(renderCount);
    });

    it('should cycle animation continuously', () => {
      const loading = new Loading({ screen });

      loading.load('Loading...');

      vi.advanceTimersByTime(800); // Full cycle
      expect(loading._.icon.content).toBe('|');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('/');
    });

    it('should update at 200ms intervals', () => {
      const loading = new Loading({ screen });

      loading.load('Loading...');

      expect(loading._.icon.content).toBe('|');

      vi.advanceTimersByTime(199);
      expect(loading._.icon.content).toBe('|');

      vi.advanceTimersByTime(1);
      expect(loading._.icon.content).toBe('/');
    });
  });

  describe('stop()', () => {
    it('should unlock keyboard', () => {
      const loading = new Loading({ screen });
      loading.load('Loading...');

      loading.stop();

      expect(screen.lockKeys).toBe(false);
    });

    it('should hide the loading widget', () => {
      const loading = new Loading({ screen });
      loading.hide = vi.fn();
      loading.load('Loading...');

      loading.stop();

      expect(loading.hide).toHaveBeenCalled();
    });

    it('should clear the timer', () => {
      const loading = new Loading({ screen });
      loading.load('Loading...');

      loading.stop();

      expect(loading._.timer).toBeUndefined();
    });

    it('should stop animation', () => {
      const loading = new Loading({ screen });
      loading.load('Loading...');

      const iconBefore = loading._.icon.content;
      loading.stop();

      vi.advanceTimersByTime(200);

      expect(loading._.icon.content).toBe(iconBefore);
    });

    it('should render screen', () => {
      const loading = new Loading({ screen });
      screen.render = vi.fn();
      loading.load('Loading...');

      const renderCount = screen.render.mock.calls.length;
      loading.stop();

      expect(screen.render.mock.calls.length).toBeGreaterThan(renderCount);
    });

    it('should handle being called without timer', () => {
      const loading = new Loading({ screen });

      expect(() => loading.stop()).not.toThrow();
    });

    it('should prevent timer from running after stop', () => {
      const loading = new Loading({ screen });
      screen.render = vi.fn();

      loading.load('Loading...');
      loading.stop();

      const renderCount = screen.render.mock.calls.length;
      vi.advanceTimersByTime(1000);

      // Render should not be called by timer anymore
      expect(screen.render.mock.calls.length).toBe(renderCount);
    });
  });

  describe('common use cases', () => {
    it('should create a centered loading indicator', () => {
      const loading = new Loading({
        screen,
        top: 'center',
        left: 'center',
        width: 40,
        height: 5,
        border: 'line',
        label: ' Loading ',
        style: {
          border: { fg: 'cyan' }
        }
      });

      loading.load('Please wait...');

      expect(loading.content).toBe('Please wait...');
      expect(screen.lockKeys).toBe(true);
    });

    it('should show loading during operation', () => {
      const loading = new Loading({ screen });

      loading.load('Processing data...');
      expect(screen.lockKeys).toBe(true);

      vi.advanceTimersByTime(600);
      // Icon should have changed (not initial state)
      expect(loading._.icon.content).not.toBe('|');

      loading.stop();
      expect(screen.lockKeys).toBe(false);
    });

    it('should handle multiple load/stop cycles', () => {
      const loading = new Loading({ screen });

      loading.load('First task');
      expect(screen.lockKeys).toBe(true);
      loading.stop();
      expect(screen.lockKeys).toBe(false);

      loading.load('Second task');
      expect(screen.lockKeys).toBe(true);
      loading.stop();
      expect(screen.lockKeys).toBe(false);
    });

    it('should update message during loading', () => {
      const loading = new Loading({ screen });

      loading.load('Starting...');
      expect(loading.content).toBe('Starting...');

      vi.advanceTimersByTime(400);

      loading.load('Almost done...');
      expect(loading.content).toBe('Almost done...');
    });

    it('should animate while visible', () => {
      const loading = new Loading({ screen });
      loading.show = vi.fn();
      screen.render = vi.fn();

      loading.load('Loading files...');

      expect(loading.show).toHaveBeenCalled();

      // Verify animation is running
      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('/');

      vi.advanceTimersByTime(200);
      expect(loading._.icon.content).toBe('-');
    });

    it('should create a modal-style loading overlay', () => {
      const loading = new Loading({
        screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: 7,
        border: 'line',
        align: 'center',
        style: {
          border: { fg: 'blue' },
          bg: 'black'
        }
      });

      loading.load('Downloading...');

      expect(loading.content).toBe('Downloading...');
    });

    it('should complete full animation cycle', () => {
      const loading = new Loading({ screen });

      loading.load('Processing...');

      const states = [];
      states.push(loading._.icon.content);

      vi.advanceTimersByTime(200);
      states.push(loading._.icon.content);

      vi.advanceTimersByTime(200);
      states.push(loading._.icon.content);

      vi.advanceTimersByTime(200);
      states.push(loading._.icon.content);

      vi.advanceTimersByTime(200);
      states.push(loading._.icon.content);

      expect(states).toEqual(['|', '/', '-', '\\', '|']);
    });

    it('should handle rapid load/stop', () => {
      const loading = new Loading({ screen });

      loading.load('Task 1');
      loading.stop();
      loading.load('Task 2');
      loading.stop();
      loading.load('Task 3');

      expect(screen.lockKeys).toBe(true);

      loading.stop();

      expect(screen.lockKeys).toBe(false);
    });

    it('should maintain animation speed', () => {
      const loading = new Loading({ screen });

      loading.load('Loading...');

      for (let i = 0; i < 10; i++) {
        const before = loading._.icon.content;
        vi.advanceTimersByTime(200);
        const after = loading._.icon.content;

        expect(before).not.toBe(after);
      }
    });
  });
});
