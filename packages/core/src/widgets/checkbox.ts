/**
 * checkbox.ts - checkbox element for blessed
 */

/**
 * Modules
 */

import type { CheckboxOptions, KeyEvent } from '../types';
import Input from './input.js';

/**
 * Checkbox
 */

class Checkbox extends Input {
  override type = 'checkbox';
  /**
   * The text displayed next to the checkbox.
   *
   * @example
   * checkbox.text = 'Accept terms';
   */
  text: string;
  /**
   * Whether the checkbox is currently checked.
   *
   * @example
   * if (checkbox.checked) {
   *   console.log('Checkbox is checked');
   * }
   */
  checked: boolean;
  /**
   * The checkbox value (same as checked property).
   * Useful for form submission.
   *
   * @example
   * console.log(checkbox.value); // true or false
   */
  value: boolean;

  constructor(options: CheckboxOptions = {}) {
    super(options);

    this.text = options.content || options.text || '';
    this.checked = this.value = options.checked || false;

    this.on('keypress', (_ch: string, key: KeyEvent) => {
      if (key.name === 'enter' || key.name === 'space') {
        this.toggle();
        this.screen.render();
      }
    });

    if (options.mouse) {
      this.on('click', () => {
        this.toggle();
        this.screen.render();
      });
    }

    this.on('focus', () => {
      const lpos = this.lpos;
      if (!lpos) return;
      this.screen.program.lsaveCursor('checkbox');
      this.screen.program.cup(lpos.yi, lpos.xi + 1);
      this.screen.program.showCursor();
    });

    this.on('blur', () => {
      this.screen.program.lrestoreCursor('checkbox', true);
    });
  }

  override render(): any {
    this.clearPos(true);
    this.setContent('[' + (this.checked ? 'x' : ' ') + '] ' + this.text, true);
    return super.render();
  }

  /**
   * Check the checkbox.
   * Sets checked and value to true, emits 'check' event.
   * Only acts if not already checked.
   *
   * @example
   * checkbox.check();
   */
  check(): void {
    if (this.checked) return;
    this.checked = this.value = true;
    this.emit('check');
  }

  /**
   * Uncheck the checkbox.
   * Sets checked and value to false, emits 'uncheck' event.
   * Only acts if currently checked.
   *
   * @example
   * checkbox.uncheck();
   */
  uncheck(): void {
    if (!this.checked) return;
    this.checked = this.value = false;
    this.emit('uncheck');
  }

  /**
   * Toggle the checked state.
   * Calls check() if unchecked, or uncheck() if checked.
   *
   * @example
   * checkbox.toggle();
   */
  override toggle(): void {
    return this.checked
      ? this.uncheck()
      : this.check();
  }
}

/**
 * Expose
 */

export default Checkbox;
export { Checkbox };
