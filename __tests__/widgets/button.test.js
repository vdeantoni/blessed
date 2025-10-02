import { describe, it, expect, beforeEach, vi } from 'vitest';
import Button from '../../lib/widgets/button.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Button', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a button instance', () => {
      const button = new Button({ screen });

      expect(button).toBeDefined();
      expect(button.type).toBe('button');
    });

    it('should work as factory function', () => {
      const button = Button({ screen });

      expect(button).toBeDefined();
      expect(button.type).toBe('button');
    });

    it('should inherit from Input', () => {
      const button = new Button({ screen });

      expect(button.screen).toBe(screen);
      expect(typeof button.press).toBe('function');
    });

    it('should default autoFocus to false', () => {
      const button = new Button({ screen });

      expect(button.options.autoFocus).toBe(false);
    });

    it('should accept autoFocus option', () => {
      const button = new Button({
        screen,
        autoFocus: true
      });

      expect(button.options.autoFocus).toBe(true);
    });

    it('should accept content option', () => {
      const button = new Button({
        screen,
        content: 'Click Me'
      });

      expect(button.content).toBe('Click Me');
    });

    it('should accept style options', () => {
      const button = new Button({
        screen,
        style: {
          fg: 'white',
          bg: 'blue',
          focus: {
            bg: 'green'
          }
        }
      });

      expect(button.style.fg).toBe('white');
      expect(button.style.bg).toBe('blue');
    });
  });

  describe('press()', () => {
    it('should emit press event', () => {
      const button = new Button({ screen });
      const pressSpy = vi.fn();

      button.on('press', pressSpy);
      button.press();

      expect(pressSpy).toHaveBeenCalled();
    });

    it('should set value to true during press', () => {
      const button = new Button({ screen });
      let valueWhilePressed;

      button.on('press', () => {
        valueWhilePressed = button.value;
      });

      button.press();

      expect(valueWhilePressed).toBe(true);
    });

    it('should delete value after press', () => {
      const button = new Button({ screen });

      button.press();

      expect(button.value).toBeUndefined();
    });

    it('should focus button when pressed', () => {
      const button = new Button({ screen });
      button.focus = vi.fn();

      button.press();

      expect(button.focus).toHaveBeenCalled();
    });

    it('should return result of emit', () => {
      const button = new Button({ screen });

      // First listener returns true
      button.on('press', () => true);

      const result = button.press();
      expect(result).toBe(true);
    });
  });

  describe('keyboard interaction', () => {
    it('should press on enter key', () => {
      const button = new Button({ screen });
      button.press = vi.fn();

      button.emit('keypress', '\r', { name: 'enter' });

      expect(button.press).toHaveBeenCalled();
    });

    it('should press on space key', () => {
      const button = new Button({ screen });
      button.press = vi.fn();

      button.emit('keypress', ' ', { name: 'space' });

      expect(button.press).toHaveBeenCalled();
    });

    it('should not press on other keys', () => {
      const button = new Button({ screen });
      button.press = vi.fn();

      button.emit('keypress', 'a', { name: 'a' });

      expect(button.press).not.toHaveBeenCalled();
    });
  });

  describe('mouse interaction', () => {
    it('should press on click when mouse enabled', () => {
      const button = new Button({
        screen,
        mouse: true
      });
      button.press = vi.fn();

      button.emit('click');

      expect(button.press).toHaveBeenCalled();
    });

    it('should not handle clicks when mouse disabled', () => {
      const button = new Button({
        screen,
        mouse: false
      });
      const pressSpy = vi.fn();
      button.on('press', pressSpy);

      button.emit('click');

      expect(pressSpy).not.toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('should allow multiple press listeners', () => {
      const button = new Button({ screen });
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      button.on('press', listener1);
      button.on('press', listener2);

      button.press();

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it('should pass through event data', () => {
      const button = new Button({ screen });
      let receivedEvent;

      button.on('press', (data) => {
        receivedEvent = data;
      });

      button.press();

      expect(receivedEvent).toBeUndefined(); // press() doesn't pass data
    });
  });

  describe('common use cases', () => {
    it('should create submit button', () => {
      const button = new Button({
        screen,
        content: 'Submit',
        left: 'center',
        top: 10,
        shrink: true,
        style: {
          bg: 'blue',
          focus: {
            bg: 'green'
          }
        }
      });

      expect(button.content).toBe('Submit');
      expect(button.shrink).toBe(true);
    });

    it('should create cancel button', () => {
      const button = new Button({
        screen,
        content: 'Cancel',
        shrink: true,
        style: {
          bg: 'red'
        }
      });

      expect(button.content).toBe('Cancel');
    });

    it('should handle button in form', () => {
      const button = new Button({
        screen,
        content: 'OK',
        mouse: true
      });

      const submitHandler = vi.fn();
      button.on('press', submitHandler);

      // Simulate enter key
      button.emit('keypress', '\r', { name: 'enter' });
      expect(submitHandler).toHaveBeenCalledTimes(1);

      // Simulate mouse click
      button.emit('click');
      expect(submitHandler).toHaveBeenCalledTimes(2);
    });
  });
});