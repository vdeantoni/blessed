/**
 * textbox.ts - textbox element for blessed
 */

/**
 * Modules
 */

import type { KeyEvent, TextboxOptions } from "../types";
import Textarea from "./textarea.js";

/**
 * Textbox widget for single-line text input.
 *
 * Extends Textarea with single-line behavior and password masking support.
 * When ENTER is pressed, automatically submits the parent Form (if inside one).
 *
 * @example Basic textbox
 * ```typescript
 * const textbox = new Textbox({
 *   parent: form,
 *   border: { type: 'line' },
 *   inputOnFocus: true
 * });
 *
 * textbox.on('submit', (value) => {
 *   console.log('Value:', value);
 * });
 * ```
 *
 * @example Password field
 * ```typescript
 * const password = new Textbox({
 *   parent: form,
 *   secret: true,  // Hide all text
 *   inputOnFocus: true
 * });
 * ```
 */
class Textbox extends Textarea {
  override type = "textbox";

  /**
   * Completely hide all text (no characters displayed).
   * Useful for password fields.
   *
   * @default false
   */
  secret: boolean;

  /**
   * Replace all characters with asterisks.
   * Useful for password fields with visual feedback.
   *
   * @default false
   */
  censor: boolean;

  private __olistener: any;

  constructor(options: TextboxOptions = {}) {
    options.scrollable = false;

    super(options);

    this.secret = options.secret || false;
    this.censor = options.censor || false;
    this.__olistener = super._listener;
  }

  override _listener(ch: any, key: KeyEvent) {
    if (key.name === "enter") {
      this._done(null, this.value);

      // Walk up parent tree to find Form
      let parent = this.parent;
      while (parent && parent.type !== "form" && parent.type !== "screen") {
        parent = parent.parent;
      }

      // Submit form if found
      if (parent && parent.type === "form") {
        (parent as any).submit();
      }

      return;
    }
    return this.__olistener.call(this, ch, key);
  }

  override setValue(value?: any) {
    let visible: number;
    let val: string;
    if (value == null) {
      value = this.value;
    } else if (this._value === value) {
      return;
    }
    value = value.replace(/\n/g, "");
    this.value = value;
    this._value = value;
    if (this.secret) {
      this.setContent("");
    } else if (this.censor) {
      this.setContent(Array(this.value.length + 1).join("*"));
    } else {
      visible = -(this.width - this.iwidth - 1);
      val = this.value.replace(/\t/g, this.screen.tabc);
      this.setContent(val.slice(visible));
    }
    this._updateCursor();
  }

  /**
   * Submit the textbox by simulating an ENTER key press.
   *
   * @example
   * ```typescript
   * textbox.submit(); // Triggers submit event
   * ```
   */
  override submit() {
    if (!this.__listener) return;
    return this.__listener("\r", { name: "enter" });
  }
}

/**
 * Expose
 */

export default Textbox;
export { Textbox };
