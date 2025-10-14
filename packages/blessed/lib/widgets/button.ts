/**
 * button.ts - button element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { ButtonOptions } from '../types/options.js';
import type { KeyEvent } from '../types/events.js';
import Input from './input.js';

/**
 * Button
 */

class Button extends Input {
  type = 'button';
  value?: boolean;

  constructor(options: ButtonOptions = {}) {
    if (options.autoFocus == null) {
      options.autoFocus = false;
    }

    super(options);

    this.on('keypress', (_ch: string, key: KeyEvent) => {
      if (key.name === 'enter' || key.name === 'space') {
        return this.press();
      }
    });

    if ((this.options as any).mouse) {
      this.on('click', () => {
        return this.press();
      });
    }
  }

  /**
   * Press the button.
   * Focuses the button, sets value to true, emits 'press' event, then deletes value.
   * Triggered by Enter, Space, or mouse click.
   *
   * @returns Result of emitting the 'press' event
   * @example
   * button.on('press', () => {
   *   console.log('Button pressed!');
   * });
   * button.press();
   */
  press(): any {
    this.focus();
    this.value = true;
    const result = this.emit('press');
    delete this.value;
    return result;
  }
}

/**
 * Expose
 */

export default Button;
export { Button };
