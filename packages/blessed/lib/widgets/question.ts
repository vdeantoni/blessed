/**
 * question.ts - question element for blessed
 */

/**
 * Modules
 */

import type { KeyEvent, QuestionOptions } from '../types';
import Box from './box.js';
import Button from './button.js';

/**
 * Private data for Question widget
 */
interface QuestionData {
  okay: Button;
  cancel: Button;
  [key: string]: unknown;
}

/**
 * Question
 */

class Question extends Box {
  override type = 'question';
  declare _: QuestionData;

  constructor(options: QuestionOptions = {}) {
    options.hidden = true;

    super(options);

    this._.okay = new Button({
      screen: this.screen,
      parent: this,
      top: 2,
      height: 1,
      left: 2,
      width: 6,
      content: 'Okay',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true,
    });

    this._.cancel = new Button({
      screen: this.screen,
      parent: this,
      top: 2,
      height: 1,
      shrink: true,
      left: 10,
      width: 8,
      content: 'Cancel',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true,
    });
  }

  /**
   * Ask a question and wait for yes/no response.
   * Displays Okay and Cancel buttons. Returns true for yes, false for no.
   * Accepts y, n, enter, escape, q keys for responses.
   *
   * @param text - Question text to display
   * @param callback - Callback function receiving (err, result) where result is boolean
   * @example
   * question.ask('Are you sure?', (err, result) => {
   *   if (err) return console.error(err);
   *   if (result) console.log('User confirmed');
   * });
   */
  ask(text: string, callback: (err: any, data: boolean) => void): void {
    let press: any, okay: any, cancel: any;

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.show();
    this.setContent(' ' + text);

    this.onScreenEvent(
      'keypress',
      (press = (_ch: any, key: KeyEvent) => {
        if (key.name === 'mouse') return;
        if (
          key.name !== 'enter' &&
          key.name !== 'escape' &&
          key.name !== 'q' &&
          key.name !== 'y' &&
          key.name !== 'n'
        ) {
          return;
        }
        done(null, key.name === 'enter' || key.name === 'y');
      })
    );

    this._.okay.on(
      'press',
      (okay = () => {
        done(null, true);
      })
    );

    this._.cancel.on(
      'press',
      (cancel = () => {
        done(null, false);
      })
    );

    this.screen.saveFocus();
    this.focus();

    const done = (err: any, data: boolean) => {
      this.hide();
      this.screen.restoreFocus();
      this.removeScreenEvent('keypress', press);
      this._.okay.removeListener('press', okay);
      this._.cancel.removeListener('press', cancel);
      return callback(err, data);
    };

    this.screen.render();
  }
}

/**
 * Expose
 */

export default Question;
export { Question };
