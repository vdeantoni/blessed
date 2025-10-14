/**
 * prompt.ts - prompt element for blessed
 */

/**
 * Modules
 */

import type { PromptOptions } from '../types';
import Box from './box.js';
import Button from './button.js';
import Textbox from './textbox.js';

/**
 * Private data for Prompt widget
 */
interface PromptData {
  input: Textbox;
  okay: Button;
  cancel: Button;
  [key: string]: unknown;
}

/**
 * Prompt
 */

class Prompt extends Box {
  type = 'prompt';
  declare _: PromptData;

  constructor(options: PromptOptions = {}) {
    options.hidden = true;

    super(options);

    this._.input = new Textbox({
      parent: this,
      top: 3,
      height: 1,
      left: 2,
      right: 2,
      bg: 'black'
    });

    this._.okay = new Button({
      parent: this,
      top: 5,
      height: 1,
      left: 2,
      width: 6,
      content: 'Okay',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true
    });

    this._.cancel = new Button({
      parent: this,
      top: 5,
      height: 1,
      shrink: true,
      left: 10,
      width: 8,
      content: 'Cancel',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true
    });
  }

  /**
   * Show the prompt and wait for user input.
   * Displays Okay and Cancel buttons. Returns input value or null if cancelled.
   *
   * @param text - Prompt text to display
   * @param value - Initial value for input (or callback if omitted)
   * @param callback - Callback function receiving (err, inputValue)
   * @example
   * prompt.readInput('Enter your name:', 'John', (err, value) => {
   *   if (err) return console.error(err);
   *   console.log('Name:', value);
   * });
   */
  readInput(text: string, value?: string | ((err: any, data: any) => void), callback?: (err: any, data: any) => void): void {
    let okay: any, cancel: any;

    if (!callback) {
      callback = value as ((err: any, data: any) => void);
      value = '';
    }

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.show();
    this.setContent(' ' + text);

    this._.input.value = value;

    this.screen.saveFocus();

    this._.okay.on('press', okay = () => {
      this._.input.submit();
    });

    this._.cancel.on('press', cancel = () => {
      this._.input.cancel();
    });

    this._.input.readInput((err: any, data: any) => {
      this.hide();
      this.screen.restoreFocus();
      this._.okay.removeListener('press', okay);
      this._.cancel.removeListener('press', cancel);
      return callback!(err, data);
    });

    this.screen.render();
  }

  /**
   * Alias for readInput. Show prompt and wait for input.
   *
   * @example
   * prompt.input('Enter value:', (err, value) => {
   *   console.log(value);
   * });
   */
  get input(): (text: string, value?: string | ((err: any, data: any) => void), callback?: (err: any, data: any) => void) => void {
    return this.readInput;
  }

  /**
   * Alias for readInput. Show prompt and wait for input.
   *
   * @example
   * prompt.setInput('Enter value:', (err, value) => {
   *   console.log(value);
   * });
   */
  get setInput(): (text: string, value?: string | ((err: any, data: any) => void), callback?: (err: any, data: any) => void) => void {
    return this.readInput;
  }
}

/**
 * Expose
 */

export default Prompt;
export { Prompt };
