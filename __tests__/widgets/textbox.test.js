import { describe, it, expect, beforeEach, vi } from 'vitest';
import Textbox from '../../lib/widgets/textbox.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Textbox', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a textbox instance', () => {
      const textbox = new Textbox({ screen });

      expect(textbox).toBeDefined();
      expect(textbox.type).toBe('textbox');
    });

    it('should work as factory function', () => {
      const textbox = Textbox({ screen });

      expect(textbox).toBeDefined();
      expect(textbox.type).toBe('textbox');
    });

    it('should inherit from Textarea', () => {
      const textbox = new Textbox({ screen });

      expect(textbox.screen).toBe(screen);
      expect(typeof textbox.readInput).toBe('function');
    });

    it('should set scrollable to false', () => {
      const textbox = new Textbox({ screen });

      expect(textbox.options.scrollable).toBe(false);
    });

    it('should support secret option', () => {
      const textbox = new Textbox({ screen, secret: true });

      expect(textbox.secret).toBe(true);
    });

    it('should support censor option', () => {
      const textbox = new Textbox({ screen, censor: true });

      expect(textbox.censor).toBe(true);
    });
  });

  describe('setValue()', () => {
    it('should set value', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('Hello');

      expect(textbox.value).toBe('Hello');
    });

    it('should strip newlines from value', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('Hello\nWorld');

      expect(textbox.value).toBe('HelloWorld');
    });

    it('should handle multiple newlines', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('Line1\n\nLine2\nLine3');

      expect(textbox.value).toBe('Line1Line2Line3');
    });

    it('should display censored text when censor is true', () => {
      const textbox = new Textbox({ screen, censor: true });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('password');

      expect(textbox.setContent).toHaveBeenCalledWith('********');
    });

    it('should hide content when secret is true', () => {
      const textbox = new Textbox({ screen, secret: true });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('password');

      expect(textbox.setContent).toHaveBeenCalledWith('');
    });

    it('should display normal text when neither secret nor censor', () => {
      const textbox = new Textbox({ screen, width: 20, height: 3 });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('Hello');

      expect(textbox.setContent).toHaveBeenCalled();
      const content = textbox.setContent.mock.calls[0][0];
      expect(content).toContain('Hello');
    });

    it('should use current value when no argument provided', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.value = 'existing';
      textbox.setValue();

      expect(textbox.value).toBe('existing');
    });

    it('should not update if value is the same', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('test');
      textbox.setContent = vi.fn();
      textbox.setValue('test');

      expect(textbox.setContent).not.toHaveBeenCalled();
    });

    it('should handle empty string', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('');

      expect(textbox.value).toBe('');
    });

    it('should handle null value', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.value = 'initial';
      textbox.setValue(null);

      expect(textbox.value).toBe('initial');
    });

    it('should replace tabs with screen.tabc', () => {
      const textbox = new Textbox({ screen, width: 30, height: 3 });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('Hello\tWorld');

      expect(textbox.setContent).toHaveBeenCalled();
      const content = textbox.setContent.mock.calls[0][0];
      expect(content).toContain('    '); // Default tabc is 4 spaces
    });
  });

  describe('_listener()', () => {
    it('should call _done on enter key', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox._done = vi.fn();
      textbox.value = 'test value';

      textbox._listener('\r', { name: 'enter' });

      expect(textbox._done).toHaveBeenCalledWith(null, 'test value');
    });

    it('should pass other keys to parent _listener', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__olistener = vi.fn();

      textbox._listener('a', { name: 'a' });

      expect(textbox.__olistener).toHaveBeenCalledWith('a', { name: 'a' });
    });

    it('should handle backspace', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__olistener = vi.fn();

      textbox._listener('\b', { name: 'backspace' });

      expect(textbox.__olistener).toHaveBeenCalledWith('\b', { name: 'backspace' });
    });

    it('should handle escape', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__olistener = vi.fn();

      textbox._listener('\x1b', { name: 'escape' });

      expect(textbox.__olistener).toHaveBeenCalledWith('\x1b', { name: 'escape' });
    });
  });

  describe('submit()', () => {
    it('should trigger enter key handler', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__listener = vi.fn();
      textbox.submit();

      expect(textbox.__listener).toHaveBeenCalledWith('\r', { name: 'enter' });
    });

    it('should do nothing if no listener attached', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__listener = null;
      const result = textbox.submit();

      expect(result).toBeUndefined();
    });

    it('should return listener result', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__listener = vi.fn().mockReturnValue('result');
      const result = textbox.submit();

      expect(result).toBe('result');
    });
  });

  describe('integration scenarios', () => {
    it('should work as password field with censor', () => {
      const textbox = new Textbox({
        screen,
        censor: true,
        width: 20,
        height: 3
      });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('mypassword');

      expect(textbox.value).toBe('mypassword');
      expect(textbox.setContent).toHaveBeenCalledWith('**********');
    });

    it('should work as completely hidden field with secret', () => {
      const textbox = new Textbox({
        screen,
        secret: true,
        width: 20,
        height: 3
      });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('secretdata');

      expect(textbox.value).toBe('secretdata');
      expect(textbox.setContent).toHaveBeenCalledWith('');
    });

    it('should handle form submission', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.__listener = vi.fn();
      textbox.setValue('form data');
      textbox.submit();

      expect(textbox.__listener).toHaveBeenCalledWith('\r', { name: 'enter' });
    });

    it('should strip newlines in multi-line paste', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('First Line\nSecond Line\nThird Line');

      expect(textbox.value).toBe('First LineSecond LineThird Line');
    });
  });

  describe('edge cases', () => {
    it('should handle very long text', () => {
      const textbox = new Textbox({ screen, width: 10, height: 3 });
      screen.append(textbox);

      const longText = 'a'.repeat(1000);
      textbox.setValue(longText);

      expect(textbox.value).toBe(longText);
    });

    it('should handle unicode characters', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('Hello 世界 🌍');

      expect(textbox.value).toBe('Hello 世界 🌍');
    });

    it('should handle special characters', () => {
      const textbox = new Textbox({ screen });
      screen.append(textbox);

      textbox.setValue('!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~');

      expect(textbox.value).toBe('!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~');
    });

    it('should handle censored empty string', () => {
      const textbox = new Textbox({ screen, censor: true });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('');

      expect(textbox.setContent).toHaveBeenCalledWith('');
    });

    it('should handle censored single character', () => {
      const textbox = new Textbox({ screen, censor: true });
      screen.append(textbox);

      textbox.setContent = vi.fn();
      textbox.setValue('x');

      expect(textbox.setContent).toHaveBeenCalledWith('*');
    });
  });
});