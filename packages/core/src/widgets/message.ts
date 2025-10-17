/**
 * message.ts - message element for blessed
 */

/**
 * Modules
 */

import type { KeyEvent, MessageOptions, MouseEvent } from '../types';
import Box from './box.js';

/**
 * Message / Error
 */

class Message extends Box {
  override type = 'message';
  declare options: MessageOptions; // Type refinement - initialized by parent

  constructor(options: MessageOptions = {}) {
    options.tags = true;
    super(options);
  }

  /**
   * Display a message for a time period.
   * Can be dismissed by pressing a key or clicking (if mouse enabled).
   * Time=0, -1, or Infinity requires key/click to dismiss.
   *
   * @param text - Message text to display
   * @param time - Time in seconds to display (or callback if omitted). Default: 3 seconds
   * @param callback - Optional callback function called when message is dismissed
   * @example
   * // Show for 3 seconds (default)
   * message.display('Hello World');
   * // Show for 5 seconds
   * message.display('Processing...', 5);
   * // Show until dismissed
   * message.display('Press any key', 0, () => {
   *   console.log('Dismissed');
   * });
   */
  display(
    text: string,
    time?: number | ((err?: any, data?: any) => void),
    callback?: (err?: any, data?: any) => void
  ): void {
    if (typeof time === 'function') {
      callback = time;
      time = undefined;
    }

    if (time == null) time = 3;

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    if (this.scrollable) {
      this.screen.saveFocus();
      this.focus();
      this.scrollTo?.(0);
    }

    this.show();
    this.setContent(text);
    this.screen.render();

    if (time === Infinity || time === -1 || time === 0) {
      const end: any = () => {
        if (end.done) return;
        end.done = true;
        if (this.scrollable) {
          try {
            this.screen.restoreFocus();
          } catch (e) {}
        }
        this.hide();
        this.screen.render();
        if (callback) callback();
      };

      setTimeout(() => {
        const keypressHandler = (_ch: any, key: KeyEvent) => {
          if (key.name === 'mouse') return;
          if (this.scrollable) {
            if (
              key.name === 'up' ||
              (this.options.vi && key.name === 'k') ||
              key.name === 'down' ||
              (this.options.vi && key.name === 'j') ||
              (this.options.vi && key.name === 'u' && key.ctrl) ||
              (this.options.vi && key.name === 'd' && key.ctrl) ||
              (this.options.vi && key.name === 'b' && key.ctrl) ||
              (this.options.vi && key.name === 'f' && key.ctrl) ||
              (this.options.vi && key.name === 'g' && !key.shift) ||
              (this.options.vi && key.name === 'g' && key.shift)
            ) {
              return;
            }
          }
          if (
            Array.isArray(this.options.ignoreKeys) &&
            ~this.options.ignoreKeys.indexOf(key.name)
          ) {
            return;
          }
          this.removeScreenEvent('keypress', keypressHandler);
          end();
        };
        this.onScreenEvent('keypress', keypressHandler);

        // XXX May be affected by new element.options.mouse option.
        if (!this.options.mouse) return;
        const mouseHandler = (data: MouseEvent) => {
          if (data.action === 'mousemove') return;
          this.removeScreenEvent('mouse', mouseHandler);
          end();
        };
        this.onScreenEvent('mouse', mouseHandler);
      }, 10);

      return;
    }

    setTimeout(
      () => {
        this.hide();
        this.screen.render();
        if (callback) callback();
      },
      (time as number) * 1000
    );
  }

  /**
   * Alias for display. Display a message for a time period.
   *
   * @example
   * message.log('Status: OK', 5);
   */
  get log(): (
    text: string,
    time?: number | ((err?: any, data?: any) => void),
    callback?: (err?: any, data?: any) => void
  ) => void {
    return this.display;
  }

  /**
   * Display an error message (prefixed with red "Error:").
   *
   * @param text - Error message text
   * @param time - Time in seconds to display (or callback if omitted). Default: 3 seconds
   * @param callback - Optional callback function called when message is dismissed
   * @example
   * message.error('Failed to connect', 5);
   */
  error(
    text: string,
    time?: number | ((err?: any, data?: any) => void),
    callback?: (err?: any, data?: any) => void
  ): void {
    return this.display('{red-fg}Error: ' + text + '{/red-fg}', time, callback);
  }
}

/**
 * Expose
 */

export default Message;
export { Message };
