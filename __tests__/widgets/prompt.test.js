import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Prompt from '../../lib/widgets/prompt.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Prompt', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a prompt instance', () => {
      const prompt = new Prompt({ screen });

      expect(prompt).toBeDefined();
      expect(prompt.type).toBe('prompt');
    });

    it('should work as factory function', () => {
      const prompt = Prompt({ screen });

      expect(prompt).toBeDefined();
      expect(prompt.type).toBe('prompt');
    });

    it('should inherit from Box', () => {
      const prompt = new Prompt({ screen });

      expect(prompt.screen).toBe(screen);
      expect(typeof prompt.append).toBe('function');
    });

    it('should be hidden by default', () => {
      const prompt = new Prompt({ screen });

      expect(prompt.options.hidden).toBe(true);
    });

    it('should create input textbox', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.input).toBeDefined();
      expect(prompt._.input.options.top).toBe(3);
      expect(prompt._.input.options.height).toBe(1);
    });

    it('should create okay button', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.okay).toBeDefined();
      expect(prompt._.okay.content).toBe('Okay');
      expect(prompt._.okay.width).toBe(6);
    });

    it('should create cancel button', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.cancel).toBeDefined();
      expect(prompt._.cancel.content).toBe('Cancel');
      expect(prompt._.cancel.width).toBe(8);
    });

    it('should position buttons at same height', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.okay.options.top).toBe(5);
      expect(prompt._.cancel.options.top).toBe(5);
    });

    it('should enable mouse on buttons', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.okay.options.mouse).toBe(true);
      expect(prompt._.cancel.options.mouse).toBe(true);
    });

    it('should set button hover styles', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.okay.options.hoverBg).toBe('blue');
      expect(prompt._.cancel.options.hoverBg).toBe('blue');
    });

    it('should disable auto focus on buttons', () => {
      const prompt = new Prompt({ screen });

      expect(prompt._.okay.options.autoFocus).toBe(false);
      expect(prompt._.cancel.options.autoFocus).toBe(false);
    });
  });

  describe('input() / setInput() / readInput()', () => {
    it('should show the prompt', () => {
      const prompt = new Prompt({ screen });
      prompt.show = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter name:', vi.fn());

      expect(prompt.show).toHaveBeenCalled();
    });

    it('should set prompt text', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter value:', vi.fn());

      expect(prompt.content).toBe(' Enter value:');
    });

    it('should accept default value', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter name:', 'John', vi.fn());

      expect(prompt._.input.value).toBe('John');
    });

    it('should default value to empty string', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter name:', vi.fn());

      expect(prompt._.input.value).toBe('');
    });

    it('should save focus', () => {
      const prompt = new Prompt({ screen });
      screen.saveFocus = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Text:', vi.fn());

      expect(screen.saveFocus).toHaveBeenCalled();
    });

    it('should call readInput on input textbox', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.input('Text:', vi.fn());

      expect(prompt._.input.readInput).toHaveBeenCalled();
    });

    it('should render screen', () => {
      const prompt = new Prompt({ screen });
      screen.render = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Text:', vi.fn());

      expect(screen.render).toHaveBeenCalled();
    });

    it('should work as setInput', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.setInput('Text:', vi.fn());

      expect(prompt._.input.readInput).toHaveBeenCalled();
    });

    it('should work as readInput', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.readInput('Text:', vi.fn());

      expect(prompt._.input.readInput).toHaveBeenCalled();
    });
  });

  describe('callback handling', () => {
    it('should call callback on input submit', () => {
      const prompt = new Prompt({ screen });
      const callback = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', callback);

      inputCallback(null, 'result');

      expect(callback).toHaveBeenCalledWith(null, 'result');
    });

    it('should hide prompt on completion', () => {
      const prompt = new Prompt({ screen });
      prompt.hide = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', vi.fn());

      inputCallback(null, 'data');

      expect(prompt.hide).toHaveBeenCalled();
    });

    it('should restore focus on completion', () => {
      const prompt = new Prompt({ screen });
      screen.restoreFocus = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', vi.fn());

      inputCallback(null, 'data');

      expect(screen.restoreFocus).toHaveBeenCalled();
    });

    it('should handle error in callback', () => {
      const prompt = new Prompt({ screen });
      const callback = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', callback);

      const error = new Error('Input error');
      inputCallback(error, null);

      expect(callback).toHaveBeenCalledWith(error, null);
    });
  });

  describe('button interactions', () => {
    it('should submit on okay button press', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.submit = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Text:', vi.fn());

      prompt._.okay.emit('press');

      expect(prompt._.input.submit).toHaveBeenCalled();
    });

    it('should cancel on cancel button press', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.cancel = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Text:', vi.fn());

      prompt._.cancel.emit('press');

      expect(prompt._.input.cancel).toHaveBeenCalled();
    });

    it('should remove okay listener after completion', () => {
      const prompt = new Prompt({ screen });
      prompt._.okay.removeListener = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', vi.fn());

      inputCallback(null, 'data');

      expect(prompt._.okay.removeListener).toHaveBeenCalledWith('press', expect.any(Function));
    });

    it('should remove cancel listener after completion', () => {
      const prompt = new Prompt({ screen });
      prompt._.cancel.removeListener = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Text:', vi.fn());

      inputCallback(null, 'data');

      expect(prompt._.cancel.removeListener).toHaveBeenCalledWith('press', expect.any(Function));
    });
  });

  describe('common use cases', () => {
    it('should create a text input prompt', () => {
      const prompt = new Prompt({
        screen,
        top: 'center',
        left: 'center',
        width: 50,
        height: 8,
        border: 'line',
        label: ' Input '
      });

      const callback = vi.fn();
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter your name:', callback);

      expect(prompt.content).toContain('Enter your name:');
    });

    it('should create a prompt with default value', () => {
      const prompt = new Prompt({ screen });
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter email:', 'user@example.com', vi.fn());

      expect(prompt._.input.value).toBe('user@example.com');
    });

    it('should handle user confirmation', () => {
      const prompt = new Prompt({ screen });
      const callback = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Are you sure?', callback);

      prompt._.okay.emit('press');

      // Simulate textbox submitting
      prompt._.input.emit('submit');
    });

    it('should handle cancellation', () => {
      const prompt = new Prompt({ screen });
      const callback = vi.fn();
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      prompt.input('Enter value:', callback);

      prompt._.cancel.emit('press');

      // Simulate textbox canceling
      prompt._.input.emit('cancel');
    });

    it('should support multiple prompts in sequence', () => {
      const prompt = new Prompt({ screen });
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      let inputCallback1, inputCallback2;

      prompt._.input.readInput = vi.fn((cb) => {
        if (!inputCallback1) {
          inputCallback1 = cb;
        } else {
          inputCallback2 = cb;
        }
      });

      prompt.input('First prompt:', callback1);
      inputCallback1(null, 'first');

      expect(callback1).toHaveBeenCalledWith(null, 'first');

      prompt.input('Second prompt:', callback2);
      inputCallback2(null, 'second');

      expect(callback2).toHaveBeenCalledWith(null, 'second');
    });

    it('should create a password prompt', () => {
      const prompt = new Prompt({
        screen,
        border: 'line',
        label: ' Password '
      });

      prompt._.input.options.censor = true;
      prompt._.input.readInput = vi.fn();

      prompt.input('Enter password:', vi.fn());

      expect(prompt._.input.options.censor).toBe(true);
    });

    it('should validate and re-prompt on error', () => {
      const prompt = new Prompt({ screen });
      let attempt = 0;
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      const validateAndPrompt = () => {
        prompt.input('Enter number:', (err, value) => {
          attempt++;
          if (isNaN(value) && attempt < 3) {
            validateAndPrompt();
          }
        });
      };

      validateAndPrompt();
      inputCallback(null, 'abc'); // Invalid

      expect(attempt).toBe(1);
    });

    it('should create a form-like prompt', () => {
      const prompt = new Prompt({
        screen,
        top: 'center',
        left: 'center',
        width: 60,
        height: 9,
        border: 'line',
        style: {
          border: { fg: 'cyan' }
        }
      });

      prompt._.input.readInput = vi.fn();

      prompt.input('Enter configuration value:', 'default', vi.fn());

      expect(prompt.content).toContain('Enter configuration value:');
      expect(prompt._.input.value).toBe('default');
    });

    it('should handle async operations', () => {
      const prompt = new Prompt({ screen });
      let inputCallback;

      prompt._.input.readInput = vi.fn((cb) => {
        inputCallback = cb;
      });

      const asyncCallback = vi.fn((err, data) => {
        // Simulate async operation
        setTimeout(() => {
          expect(data).toBe('async result');
        }, 0);
      });

      prompt.input('Enter value:', asyncCallback);
      inputCallback(null, 'async result');

      expect(asyncCallback).toHaveBeenCalled();
    });
  });
});
