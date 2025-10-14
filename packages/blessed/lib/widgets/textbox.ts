/**
 * textbox.ts - textbox element for blessed
 */

/**
 * Modules
 */

import type { KeyEvent, TextboxOptions } from '../types';
import Textarea from './textarea.js';

/**
 * Textbox
 */

class Textbox extends Textarea {
  type = 'textbox';
  /**
   * Completely hide all text (no characters displayed).
   * Useful for password fields.
   *
   * @example
   * const passwordBox = blessed.textbox({ secret: true });
   */
  secret: boolean;
  /**
   * Replace all characters with asterisks.
   * Useful for password fields with visual feedback.
   *
   * @example
   * const passwordBox = blessed.textbox({ censor: true });
   */
  censor: boolean;
  __olistener: any;

  constructor(options: TextboxOptions = {}) {
    options.scrollable = false;

    super(options);

    this.secret = options.secret || false;
    this.censor = options.censor || false;

    // Store the original listener
    this.__olistener = super._listener;
  }

  _listener(ch: any, key: KeyEvent) {
    if (key.name === 'enter') {
      this._done(null, this.value);
      return;
    }
    return this.__olistener.call(this, ch, key);
  }

  setValue(value?: any) {
    let visible: number;
    let val: string;
    if (value == null) {
      value = this.value;
    } else if (this._value === value) {
      return;
    }
    value = value.replace(/\n/g, '');
    this.value = value;
    this._value = value;
    if (this.secret) {
      this.setContent('');
    } else if (this.censor) {
      this.setContent(Array(this.value.length + 1).join('*'));
    } else {
      visible = -(this.width - this.iwidth - 1);
      val = this.value.replace(/\t/g, this.screen.tabc);
      this.setContent(val.slice(visible));
    }
    this._updateCursor();
  }

  submit() {
    if (!this.__listener) return;
    return this.__listener('\r', { name: 'enter' });
  }
}

/**
 * Expose
 */

export default Textbox;
export { Textbox };
