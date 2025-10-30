/**
 * log.ts - log element for blessed
 */

/**
 * Modules
 */

import { getNextTick } from "../lib/runtime-helpers";
import type { LogOptions } from "../types";
import Box from "./box.js";
import ScrollableText from "./scrollabletext.js";

/**
 * Log widget for displaying scrolling log messages.
 *
 * A specialized scrollable text widget optimized for log output with
 * automatic scrolling, scrollback limits, and optional static header/footer.
 *
 * @example Basic log
 * ```typescript
 * const log = new Log({
 *   parent: screen,
 *   scrollback: 1000,
 *   border: { type: 'line' }
 * });
 *
 * log.log('Server started');
 * log.log('User %s connected', username);
 * ```
 *
 * @example With static header and footer
 * ```typescript
 * const log = new Log({
 *   parent: screen,
 *   scrollback: 1000,
 *   staticHeader: '=== Application Logs ===',
 *   staticFooter: '[↑/↓] Scroll | [Q] Quit'
 * });
 * ```
 */
class Log extends ScrollableText {
  override type = "log";

  /**
   * Amount of scrollback lines allowed.
   * When exceeded, oldest lines are removed.
   *
   * @default Infinity
   */
  scrollback: number;

  /**
   * Whether to automatically scroll to bottom on new input.
   *
   * @default false
   */
  scrollOnInput: boolean | undefined;

  private _userScrolled: boolean = false;
  private _staticHeaderWidget?: Box;
  private _staticFooterWidget?: Box;

  constructor(options: LogOptions = {}) {
    super(options);

    this.scrollback =
      options.scrollback != null ? options.scrollback : Infinity;
    this.scrollOnInput = options.scrollOnInput;

    if (options.staticHeader) {
      this._staticHeaderWidget = new Box({
        parent: this,
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        content: options.staticHeader,
        style: options.style,
        tags: this.parseTags,
      });
    }

    if (options.staticFooter) {
      this._staticFooterWidget = new Box({
        parent: this,
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        content: options.staticFooter,
        style: options.style,
        tags: this.parseTags,
      });
    }

    this.on("set content", () => {
      if (!this._userScrolled || this.scrollOnInput) {
        getNextTick()(() => {
          this.setScrollPerc?.(100);
          this._userScrolled = false;
          this.screen.render();
        });
      }
    });
  }

  /**
   * Set the static header text.
   *
   * @param text - Header text to display
   */
  setStaticHeader(text: string): void {
    if (!this._staticHeaderWidget) {
      this._staticHeaderWidget = new Box({
        parent: this,
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        content: text,
        style: this.style,
        tags: this.parseTags,
      });
    } else {
      this._staticHeaderWidget.setContent(text);
    }
  }

  /**
   * Set the static footer text.
   *
   * @param text - Footer text to display
   */
  setStaticFooter(text: string): void {
    if (!this._staticFooterWidget) {
      this._staticFooterWidget = new Box({
        parent: this,
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        content: text,
        style: this.style,
        tags: this.parseTags,
      });
    } else {
      this._staticFooterWidget.setContent(text);
    }
  }

  /**
   * Add a log line to the log element.
   * Alias for add().
   * Automatically scrolls to bottom unless user has scrolled manually.
   *
   * @param args - Content to log (can be multiple arguments, formatted like util.format)
   *
   * @example
   * ```typescript
   * log.log('Server started');
   * log.log('User %s connected', username);
   * ```
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
   * @returns Result from pushLine() operation
   *
   * @example
   * ```typescript
   * log.add('Status: OK');
   * log.add('Processing %d items', count);
   * ```
   */
  add(...args: any[]): any {
    if (typeof args[0] === "object") {
      args[0] = this.runtime.util.inspect(args[0], true, 20, true);
    }
    const text = this.runtime.util.format(args[0], ...args.slice(1));
    this.emit("log", text);
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
  private _scroll(offset: number, always?: any) {
    return ScrollableText.prototype.scroll?.call(this, offset, always);
  }
}

/**
 * Expose
 */

export default Log;
export { Log };
