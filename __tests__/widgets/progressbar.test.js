import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProgressBar from '../../lib/widgets/progressbar.js';
import { createMockScreen } from '../helpers/mock.js';

describe('ProgressBar', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a progressbar instance', () => {
      const progressbar = new ProgressBar({ screen });

      expect(progressbar).toBeDefined();
      expect(progressbar.type).toBe('progress-bar');
    });

    it('should work as factory function', () => {
      const progressbar = ProgressBar({ screen });

      expect(progressbar).toBeDefined();
      expect(progressbar.type).toBe('progress-bar');
    });

    it('should inherit from Input', () => {
      const progressbar = new ProgressBar({ screen });

      expect(progressbar.screen).toBe(screen);
      expect(typeof progressbar.render).toBe('function');
    });

    it('should default filled to 0', () => {
      const progressbar = new ProgressBar({ screen });

      expect(progressbar.filled).toBe(0);
      expect(progressbar.value).toBe(0);
    });

    it('should accept filled option as number', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      expect(progressbar.filled).toBe(50);
      expect(progressbar.value).toBe(50);
    });

    it('should accept filled option as string percentage', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: '75%'
      });

      expect(progressbar.filled).toBe(75);
      expect(progressbar.value).toBe(75);
    });

    it('should accept pch (progress character) option', () => {
      const progressbar = new ProgressBar({
        screen,
        pch: '█'
      });

      expect(progressbar.pch).toBe('█');
    });

    it('should default pch to space', () => {
      const progressbar = new ProgressBar({ screen });

      expect(progressbar.pch).toBe(' ');
    });

    it('should accept ch option as pch (legacy)', () => {
      const progressbar = new ProgressBar({
        screen,
        ch: '█'
      });

      expect(progressbar.pch).toBe('█');
      expect(progressbar.ch).toBe(' ');
    });

    it('should accept bch (background character) option', () => {
      const progressbar = new ProgressBar({
        screen,
        bch: '░'
      });

      expect(progressbar.ch).toBe('░');
    });

    it('should accept bar style options', () => {
      const progressbar = new ProgressBar({
        screen,
        barFg: 'green',
        barBg: 'blue'
      });

      expect(progressbar.style.bar.fg).toBe('green');
      expect(progressbar.style.bar.bg).toBe('blue');
    });

    it('should accept orientation option', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'vertical'
      });

      expect(progressbar.orientation).toBe('vertical');
    });

    it('should default orientation to horizontal', () => {
      const progressbar = new ProgressBar({ screen });

      expect(progressbar.orientation).toBe('horizontal');
    });
  });

  describe('progress()', () => {
    it('should increase progress by specified amount', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 20
      });

      progressbar.progress(30);

      expect(progressbar.filled).toBe(50);
      expect(progressbar.value).toBe(50);
    });

    it('should decrease progress by negative amount', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      progressbar.progress(-20);

      expect(progressbar.filled).toBe(30);
      expect(progressbar.value).toBe(30);
    });

    it('should not allow progress below 0', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 20
      });

      progressbar.progress(-50);

      expect(progressbar.filled).toBe(0);
    });

    it('should not allow progress above 100', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 90
      });

      progressbar.progress(50);

      expect(progressbar.filled).toBe(100);
    });

    it('should emit complete event when reaching 100%', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      const completeSpy = vi.fn();
      progressbar.on('complete', completeSpy);

      progressbar.progress(50);

      expect(completeSpy).toHaveBeenCalled();
      expect(progressbar.filled).toBe(100);
    });

    it('should not emit complete event when not reaching 100%', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      const completeSpy = vi.fn();
      progressbar.on('complete', completeSpy);

      progressbar.progress(40);

      expect(completeSpy).not.toHaveBeenCalled();
      expect(progressbar.filled).toBe(90);
    });
  });

  describe('setProgress()', () => {
    it('should set progress to absolute value', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      progressbar.setProgress(75);

      expect(progressbar.filled).toBe(75);
      expect(progressbar.value).toBe(75);
    });

    it('should reset to zero then set new value', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 30
      });

      progressbar.setProgress(60);

      expect(progressbar.filled).toBe(60);
    });

    it('should emit complete event when setting to 100', () => {
      const progressbar = new ProgressBar({ screen });
      const completeSpy = vi.fn();
      progressbar.on('complete', completeSpy);

      progressbar.setProgress(100);

      expect(completeSpy).toHaveBeenCalled();
      expect(progressbar.filled).toBe(100);
    });
  });

  describe('reset()', () => {
    it('should reset progress to zero', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 75
      });

      progressbar.reset();

      expect(progressbar.filled).toBe(0);
      expect(progressbar.value).toBe(0);
    });

    it('should emit reset event', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      const resetSpy = vi.fn();
      progressbar.on('reset', resetSpy);

      progressbar.reset();

      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('keyboard interaction with horizontal orientation', () => {
    it('should decrease progress on left key when keys enabled', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        filled: 50
      });

      screen.render = vi.fn();
      progressbar.emit('keypress', null, { name: 'left' });

      expect(progressbar.filled).toBe(45);
      expect(screen.render).toHaveBeenCalled();
    });

    it('should increase progress on right key when keys enabled', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        filled: 50
      });

      screen.render = vi.fn();
      progressbar.emit('keypress', null, { name: 'right' });

      expect(progressbar.filled).toBe(55);
      expect(screen.render).toHaveBeenCalled();
    });

    it('should support vi keys with vi option', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        vi: true,
        filled: 50
      });

      screen.render = vi.fn();

      // h key (vi left)
      progressbar.emit('keypress', null, { name: 'h' });
      expect(progressbar.filled).toBe(45);

      // l key (vi right)
      progressbar.emit('keypress', null, { name: 'l' });
      expect(progressbar.filled).toBe(50);
    });

    it('should not handle keys when keys option is false', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: false,
        filled: 50
      });

      progressbar.emit('keypress', null, { name: 'left' });

      expect(progressbar.filled).toBe(50);
    });
  });

  describe('keyboard interaction with vertical orientation', () => {
    it('should decrease progress on down key when keys enabled', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        orientation: 'vertical',
        filled: 50
      });

      screen.render = vi.fn();
      progressbar.emit('keypress', null, { name: 'down' });

      expect(progressbar.filled).toBe(45);
      expect(screen.render).toHaveBeenCalled();
    });

    it('should increase progress on up key when keys enabled', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        orientation: 'vertical',
        filled: 50
      });

      screen.render = vi.fn();
      progressbar.emit('keypress', null, { name: 'up' });

      expect(progressbar.filled).toBe(55);
      expect(screen.render).toHaveBeenCalled();
    });

    it('should support vi keys with vi option', () => {
      const progressbar = new ProgressBar({
        screen,
        keys: true,
        vi: true,
        orientation: 'vertical',
        filled: 50
      });

      screen.render = vi.fn();

      // j key (vi down)
      progressbar.emit('keypress', null, { name: 'j' });
      expect(progressbar.filled).toBe(45);

      // k key (vi up)
      progressbar.emit('keypress', null, { name: 'k' });
      expect(progressbar.filled).toBe(50);
    });
  });

  describe('mouse interaction', () => {
    it('should set progress on click for horizontal progressbar', () => {
      const progressbar = new ProgressBar({
        screen,
        mouse: true,
        orientation: 'horizontal',
        left: 0,
        top: 0,
        width: 20,
        height: 3
      });

      // Mock lpos (last position)
      progressbar.lpos = {
        xi: 1,
        xl: 19,
        yi: 1,
        yl: 3
      };

      // Click at 50% position (xi + half of width)
      progressbar.emit('click', { x: 10, y: 1 });

      expect(progressbar.filled).toBe(50);
    });

    it('should set progress on click for vertical progressbar', () => {
      const progressbar = new ProgressBar({
        screen,
        mouse: true,
        orientation: 'vertical',
        left: 0,
        top: 0,
        width: 5,
        height: 20
      });

      // Mock lpos
      progressbar.lpos = {
        xi: 1,
        xl: 5,
        yi: 1,
        yl: 19
      };

      // Click at 50% position
      progressbar.emit('click', { x: 1, y: 10 });

      expect(progressbar.filled).toBe(50);
    });

    it('should not handle clicks when lpos is undefined', () => {
      const progressbar = new ProgressBar({
        screen,
        mouse: true,
        filled: 50
      });

      progressbar.lpos = null;
      progressbar.emit('click', { x: 10, y: 1 });

      expect(progressbar.filled).toBe(50); // unchanged
    });

    it('should not handle clicks when mouse is disabled', () => {
      const progressbar = new ProgressBar({
        screen,
        mouse: false,
        filled: 50
      });

      progressbar.lpos = {
        xi: 1,
        xl: 19,
        yi: 1,
        yl: 3
      };

      progressbar.emit('click', { x: 10, y: 1 });

      expect(progressbar.filled).toBe(50); // unchanged
    });
  });

  describe('common use cases', () => {
    it('should create a download progress bar', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 0,
        pch: '█',
        style: {
          bar: {
            bg: 'blue'
          }
        }
      });

      // Simulate download progress
      progressbar.setProgress(25);
      expect(progressbar.filled).toBe(25);

      progressbar.progress(25);
      expect(progressbar.filled).toBe(50);

      progressbar.setProgress(100);
      expect(progressbar.filled).toBe(100);
    });

    it('should create a vertical loading indicator', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'vertical',
        filled: 0,
        pch: '│',
        barFg: 'green'
      });

      expect(progressbar.orientation).toBe('vertical');
      expect(progressbar.style.bar.fg).toBe('green');
    });

    it('should handle complete workflow', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 0
      });

      const completeSpy = vi.fn();
      const resetSpy = vi.fn();

      progressbar.on('complete', completeSpy);
      progressbar.on('reset', resetSpy);

      // Start progress
      progressbar.setProgress(0);
      expect(progressbar.filled).toBe(0);

      // Make progress
      progressbar.progress(33);
      expect(progressbar.filled).toBe(33);

      progressbar.progress(33);
      expect(progressbar.filled).toBe(66);

      progressbar.progress(34);
      expect(progressbar.filled).toBe(100);
      expect(completeSpy).toHaveBeenCalled();

      // Reset for new task
      progressbar.reset();
      expect(progressbar.filled).toBe(0);
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should clamp values at boundaries', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      // Try to go above 100
      progressbar.progress(100);
      expect(progressbar.filled).toBe(100);

      // Try to go below 0
      progressbar.progress(-200);
      expect(progressbar.filled).toBe(0);
    });
  });

  describe('real execution coverage tests', () => {
    it('should execute render for horizontal progressbar', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 50,
        width: 20,
        height: 3,
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      // Mock _render to provide structure
      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 3
      });

      // Execute real render (lines 99-129)
      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should execute render for vertical progressbar', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'vertical',
        filled: 75,
        width: 5,
        height: 20,
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 5,
        yi: 0,
        yl: 20
      });

      // Execute real render for vertical (lines 113-114)
      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should execute render with border', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 60,
        width: 20,
        height: 5,
        border: 'line',
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      // Mock the element's _render to provide necessary structure
      progressbar._render = vi.fn().mockReturnValue({
        xi: 1,
        xl: 19,
        yi: 1,
        yl: 4
      });

      // Execute real render with border adjustment (line 109)
      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should execute render with content overlay', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 40,
        width: 20,
        height: 3,
        content: 'Loading...',
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 3
      });

      // Execute real render with content (lines 121-127)
      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should execute progress and emit complete', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 95
      });

      let completed = false;
      progressbar.on('complete', () => {
        completed = true;
      });

      // Execute progress to 100 and trigger complete emit (lines 136-138)
      progressbar.progress(5);

      expect(progressbar.filled).toBe(100);
      expect(completed).toBe(true);
    });

    it('should execute progress without complete', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 50
      });

      // Execute progress without reaching 100 (line 139)
      progressbar.progress(30);

      expect(progressbar.filled).toBe(80);
      expect(progressbar.value).toBe(80);
    });

    it('should execute setProgress through progress', () => {
      const progressbar = new ProgressBar({
        screen,
        filled: 40
      });

      // setProgress calls progress (lines 142-144)
      progressbar.setProgress(70);

      expect(progressbar.filled).toBe(70);
      expect(progressbar.value).toBe(70);
    });

    it('should render at 0%', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 0,
        width: 20,
        height: 3,
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 3
      });

      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should render at 100%', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 100,
        width: 20,
        height: 3,
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 3
      });

      const result = progressbar.render();
      expect(result).toBeDefined();
    });

    it('should execute render with custom style', () => {
      const progressbar = new ProgressBar({
        screen,
        orientation: 'horizontal',
        filled: 50,
        width: 20,
        height: 3,
        style: {
          bar: {
            bg: 'blue',
            fg: 'white'
          }
        },
        left: 0,
        top: 0
      });
      screen.append(progressbar);

      progressbar._render = vi.fn().mockReturnValue({
        xi: 0,
        xl: 20,
        yi: 0,
        yl: 3
      });

      // Execute render with sattr call (line 117)
      const result = progressbar.render();
      expect(result).toBeDefined();
    });
  });
});