/**
 * log.ts - log element for blessed
 */

/**
 * Modules
 */

import type { LogOptions } from '../types';
import util from 'util';
import ScrollableText from './scrollabletext.js';

const nextTick = global.setImmediate || process.nextTick.bind(process);

/**
 * Log
 */

class Log extends ScrollableText {
  override type = 'log';
  /**
   * Amount of scrollback lines allowed.
   * When exceeded, oldest lines are removed.
   *
   * @default Infinity
   * @example
   * const log = blessed.log({ scrollback: 1000 });
   */
  scrollback: number;
  /**
   * Whether to automatically scroll to bottom on new input.
   *
   * @default false
   * @example
   * const log = blessed.log({ scrollOnInput: true });
   */
  scrollOnInput: boolean | undefined;
  _userScrolled: boolean = false;

  constructor(options: LogOptions = {}) {
    super(options);

    this.scrollback =
      options.scrollback != null ? options.scrollback : Infinity;
    this.scrollOnInput = options.scrollOnInput;

    this.on('set content', () => {
      if (!this._userScrolled || this.scrollOnInput) {
        nextTick(() => {
          this.setScrollPerc?.(100);
          this._userScrolled = false;
          this.screen.render();
        });
      }
    });
  }

  /**
   * Add a log line to the log element.
   * Alias for add().
   * Automatically scrolls to bottom unless user has scrolled manually.
   *
   * @param args - Content to log (can be multiple arguments, formatted like util.format)
   * @example
   * log.log('Server started');
   * log.log('User %s connected', username);
   */
  log(...args: any[]) {
    return this.add(...args);
  }

  /**
   * Add a log line to the log element.
   * Automatically scrolls to bottom unless user has scrolled manually.
   * Supports formatting like util.format.
   *
   * @param args - Content to add (can be multiple arguments, formatted like util.format)
   * @example
   * log.add('Status: OK');
   * log.add('Processing %d items', count);
   */
  add(...args: any[]) {
    if (typeof args[0] === 'object') {
      args[0] = util.inspect(args[0], true, 20, true);
    }
    const text = util.format(...args);
    this.emit('log', text);
    const ret = this.pushLine(text);
    if (this._clines.fake.length > this.scrollback) {
      this.shiftLine(0, (this.scrollback / 3) | 0);
    }
    return ret;
  }

  // @ts-expect-error - Override ScrollableText scroll property with Log-specific method
  scroll(offset: number, always?: any) {
    if (offset === 0) return this._scroll(offset, always);
    this._userScrolled = true;
    const ret = this._scroll(offset, always);
    if ((this.getScrollPerc?.() || 0) === 100) {
      this._userScrolled = false;
    }
    return ret;
  }

  // Access parent scroll via prototype to avoid property/method conflict
  _scroll(offset: number, always?: any) {
    return ScrollableText.prototype.scroll?.call(this, offset, always);
  }
}

/**
 * Expose
 */

export default Log;
export { Log };
