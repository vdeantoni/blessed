import { describe, it, expect, beforeEach } from 'vitest';
import Text from '../../src/widgets/text.js';
import Box from '../../src/widgets/box.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Text', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a text instance', () => {
      const text = new Text({ screen });

      expect(text).toBeDefined();
      expect(text.type).toBe('text');
    });

    it('should inherit from Element', () => {
      const text = new Text({ screen });

      expect(text.screen).toBe(screen);
      expect(typeof text.render).toBe('function');
    });

    it('should automatically enable shrink', () => {
      const text = new Text({ screen });

      expect(text.shrink).toBe(true);
    });

    it('should accept content option', () => {
      const text = new Text({
        screen,
        content: 'Hello World'
      });

      expect(text.content).toBe('Hello World');
    });

    it('should accept position options', () => {
      const text = new Text({
        screen,
        left: 5,
        top: 10
      });

      expect(text.position.left).toBe(5);
      expect(text.position.top).toBe(10);
    });

    it('should accept style options', () => {
      const text = new Text({
        screen,
        style: {
          fg: 'red',
          bg: 'blue'
        }
      });

      expect(text.style.fg).toBe('red');
      expect(text.style.bg).toBe('blue');
    });

    it('should support multiline text', () => {
      const text = new Text({
        screen,
        content: 'Line 1\\nLine 2\\nLine 3'
      });

      expect(text.content).toContain('\\n');
    });

    it('should accept tags option', () => {
      const text = new Text({
        screen,
        tags: true,
        content: '{red-fg}Red text{/red-fg}'
      });

      expect(text.parseTags).toBe(true);
    });

    it('should accept align option', () => {
      const text = new Text({
        screen,
        align: 'center'
      });

      expect(text.align).toBe('center');
    });

    it('should accept valign option', () => {
      const text = new Text({
        screen,
        valign: 'middle'
      });

      expect(text.valign).toBe('middle');
    });
  });

  describe('content management', () => {
    it('should set content', () => {
      const text = new Text({ screen });
      text.setContent('New content');

      expect(text.content).toBe('New content');
    });

    it('should get content', () => {
      const text = new Text({
        screen,
        content: 'Initial content'
      });

      expect(typeof text.getContent()).toBe('string');
      expect(text.content).toBe('Initial content');
    });

    it('should handle empty content', () => {
      const text = new Text({ screen });

      expect(text.content).toBe('');
    });

    it('should update content multiple times', () => {
      const text = new Text({ screen });

      text.setContent('First');
      expect(text.content).toBe('First');

      text.setContent('Second');
      expect(text.content).toBe('Second');

      text.setContent('Third');
      expect(text.content).toBe('Third');
    });
  });

  describe('hierarchy', () => {
    it('should be added to screen', () => {
      const text = new Text({ screen });
      screen.append(text);

      expect(screen.children).toContain(text);
      expect(text.parent).toBe(screen);
    });

    it('should be added to box', () => {
      const box = new Box({ screen });
      const text = new Text({ screen });

      box.append(text);

      expect(box.children).toContain(text);
      expect(text.parent).toBe(box);
    });

    it('should be removed from parent', () => {
      const text = new Text({ screen });
      screen.append(text);
      screen.remove(text);

      expect(screen.children).not.toContain(text);
      expect(text.parent).toBeNull();
    });
  });

  describe('shrink behavior', () => {
    it('should always have shrink enabled', () => {
      const text1 = new Text({ screen });
      expect(text1.shrink).toBe(true);

      const text2 = new Text({ screen, shrink: false });
      expect(text2.shrink).toBe(true); // Text always shrinks

      const text3 = new Text({ screen, width: 50 });
      expect(text3.shrink).toBe(true);
    });
  });

  describe('styling', () => {
    it('should accept fg color', () => {
      const text = new Text({
        screen,
        fg: 'green'
      });

      expect(text.style.fg).toBe('green');
    });

    it('should accept bg color', () => {
      const text = new Text({
        screen,
        bg: 'blue'
      });

      expect(text.style.bg).toBe('blue');
    });

    it('should accept bold', () => {
      const text = new Text({
        screen,
        bold: true
      });

      expect(text.style.bold).toBe(true);
    });

    it('should accept underline', () => {
      const text = new Text({
        screen,
        underline: true
      });

      expect(text.style.underline).toBe(true);
    });
  });
});
