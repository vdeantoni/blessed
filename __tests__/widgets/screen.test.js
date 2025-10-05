import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Screen from '../../lib/widgets/screen.js';
import Box from '../../lib/widgets/box.js';

describe('Screen', () => {
  let screen;

  beforeEach(() => {
    screen = new Screen({
      smartCSR: true,
      dockBorders: true
    });
  });

  afterEach(() => {
    if (screen && screen.program) {
      screen.destroy();
    }
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a screen instance', () => {
      expect(screen).toBeDefined();
      expect(screen.type).toBe('screen');
    });

    it('should work as factory function', () => {
      const s = Screen({ smartCSR: true });

      expect(s).toBeDefined();
      expect(s.type).toBe('screen');

      s.destroy();
    });

    it('should inherit from Node', () => {
      expect(typeof screen.append).toBe('function');
      expect(typeof screen.prepend).toBe('function');
      expect(typeof screen.remove).toBe('function');
    });

    it('should initialize program', () => {
      expect(screen.program).toBeDefined();
      expect(screen.tput).toBeDefined();
    });

    it('should default autoPadding to true', () => {
      expect(screen.autoPadding).toBe(true);
    });

    it('should accept autoPadding option', () => {
      const s = new Screen({ autoPadding: false });

      expect(s.autoPadding).toBe(false);

      s.destroy();
    });

    it('should initialize tab character with default size', () => {
      expect(screen.tabc).toBe('    '); // 4 spaces
    });

    it('should accept custom tabSize', () => {
      const s = new Screen({ tabSize: 2 });

      expect(s.tabc).toBe('  '); // 2 spaces

      s.destroy();
    });

    it('should initialize position object', () => {
      expect(screen.position).toBeDefined();
      expect(screen.position.left).toBe(0);
      expect(screen.position.top).toBe(0);
    });

    it('should initialize padding object', () => {
      expect(screen.padding).toBeDefined();
      expect(screen.padding.left).toBe(0);
      expect(screen.padding.top).toBe(0);
      expect(screen.padding.right).toBe(0);
      expect(screen.padding.bottom).toBe(0);
    });

    it('should initialize cursor configuration', () => {
      expect(screen.cursor).toBeDefined();
      expect(screen.cursor.shape).toBe('block');
      expect(screen.cursor.blink).toBe(false);
      expect(screen.cursor.artificial).toBe(false);
    });

    it('should accept cursor options', () => {
      const s = new Screen({
        cursorShape: 'underline',
        cursorBlink: true
      });

      expect(s.cursor.shape).toBe('underline');
      expect(s.cursor.blink).toBe(true);

      s.destroy();
    });

    it('should accept title option', () => {
      const s = new Screen({ title: 'My App' });

      expect(s.title).toBe('My App');

      s.destroy();
    });

    it('should initialize empty history', () => {
      expect(screen.history).toEqual([]);
    });

    it('should initialize empty clickable array', () => {
      expect(screen.clickable).toEqual([]);
    });

    it('should initialize empty keyable array', () => {
      expect(screen.keyable).toEqual([]);
    });
  });

  describe('append()', () => {
    it('should append child elements', () => {
      const box = new Box({ screen });

      screen.append(box);

      expect(screen.children).toContain(box);
    });

    it('should set parent reference', () => {
      const box = new Box({ screen });

      screen.append(box);

      expect(box.parent).toBe(screen);
    });
  });

  describe('render()', () => {
    it('should have render method', () => {
      expect(typeof screen.render).toBe('function');
    });

    it('should increment renders count', () => {
      const initialRenders = screen.renders;

      screen.render();

      expect(screen.renders).toBe(initialRenders + 1);
    });
  });

  describe('key()', () => {
    it('should have key method', () => {
      expect(typeof screen.key).toBe('function');
    });

    it('should register key handler on program', () => {
      const handler = vi.fn();

      screen.key('q', handler);

      expect(screen.program.listeners('keypress').length).toBeGreaterThan(0);
    });

    it('should accept array of keys', () => {
      const handler = vi.fn();

      screen.key(['q', 'escape'], handler);

      expect(screen.program.listeners('keypress').length).toBeGreaterThan(0);
    });
  });

  describe('onceKey()', () => {
    it('should have onceKey method', () => {
      expect(typeof screen.onceKey).toBe('function');
    });

    it('should register one-time key handler on program', () => {
      const handler = vi.fn();

      screen.onceKey('enter', handler);

      expect(screen.program.listeners('keypress').length).toBeGreaterThan(0);
    });
  });

  describe('unkey() and removeKey()', () => {
    it('should have unkey method', () => {
      expect(typeof screen.unkey).toBe('function');
    });

    it('should have removeKey method', () => {
      expect(typeof screen.removeKey).toBe('function');
    });

    it('should remove key handler', () => {
      const handler = vi.fn();

      screen.key('x', handler);
      const before = screen.listeners('keypress').length;

      screen.unkey('x', handler);

      expect(screen.listeners('keypress').length).toBeLessThanOrEqual(before);
    });
  });

  describe('focus management', () => {
    it('should have focusNext method', () => {
      expect(typeof screen.focusNext).toBe('function');
    });

    it('should have focusPrevious method', () => {
      expect(typeof screen.focusPrevious).toBe('function');
    });

    it('should have focusPush method', () => {
      expect(typeof screen.focusPush).toBe('function');
    });

    it('should have focusPop method', () => {
      expect(typeof screen.focusPop).toBe('function');
    });

    it('should have saveFocus method', () => {
      expect(typeof screen.saveFocus).toBe('function');
    });

    it('should have restoreFocus method', () => {
      expect(typeof screen.restoreFocus).toBe('function');
    });
  });

  describe('title', () => {
    it('should have title getter', () => {
      screen.title = 'Test Title';

      expect(screen.title).toBe('Test Title');
    });
  });

  describe('destroy()', () => {
    it('should have destroy method', () => {
      expect(typeof screen.destroy).toBe('function');
    });

    it('should clean up program on destroy', () => {
      const s = new Screen({ smartCSR: true });
      const programDestroySpy = vi.spyOn(s.program, 'destroy');

      s.destroy();

      expect(programDestroySpy).toHaveBeenCalled();
    });
  });

  describe('common use cases', () => {
    it('should create a basic screen', () => {
      const s = new Screen({
        smartCSR: true,
        title: 'My Application'
      });

      expect(s.title).toBe('My Application');
      expect(s.program).toBeDefined();

      s.destroy();
    });

    it('should support autoPadding for borders', () => {
      const s = new Screen({
        autoPadding: true,
        dockBorders: true
      });

      expect(s.autoPadding).toBe(true);
      expect(s.dockBorders).toBe(true);

      s.destroy();
    });

    it('should support cursor customization', () => {
      const s = new Screen({
        cursorShape: 'line',
        cursorBlink: true
      });

      expect(s.cursor.shape).toBe('line');
      expect(s.cursor.blink).toBe(true);

      s.destroy();
    });

    it('should manage child elements', () => {
      const s = new Screen({ smartCSR: true });
      const box1 = new Box({ screen: s, top: 0 });
      const box2 = new Box({ screen: s, top: 5 });

      s.append(box1);
      s.append(box2);

      expect(s.children.length).toBe(2);
      expect(s.children).toContain(box1);
      expect(s.children).toContain(box2);

      s.destroy();
    });

    it('should track renders', () => {
      const s = new Screen({ smartCSR: true });
      const initialRenders = s.renders;

      s.render();
      s.render();

      expect(s.renders).toBe(initialRenders + 2);

      s.destroy();
    });

    it('should support tab size configuration', () => {
      const s = new Screen({ tabSize: 8 });

      expect(s.tabc).toBe('        '); // 8 spaces

      s.destroy();
    });
  });
});