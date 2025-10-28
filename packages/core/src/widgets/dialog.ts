/**
 * dialog.ts - dialog element for blessed
 * Specialized overlay widget for modal dialogs
 */

/**
 * Modules
 */

import type { DialogOptions } from "../types";
import Box from "./box.js";

/**
 * Dialog widget for modal dialogs and overlays.
 *
 * A specialized widget for creating modal dialogs with sensible defaults
 * for centered positioning, shadows, and automatic focus management.
 *
 * **Key behaviors:**
 * - **ESC**: Automatically hides the dialog when pressed on dialog or any child element
 *
 * @example Basic dialog
 * ```typescript
 * const dialog = new Dialog({
 *   parent: screen,
 *   width: '50%',
 *   height: '50%',
 *   content: 'Dialog content',
 *   border: { type: 'line' },
 *   label: ' Dialog Title '
 * });
 *
 * dialog.show();
 * screen.render();
 *
 * // ESC key automatically hides the dialog
 * // Or manually:
 * dialog.hide();
 * screen.render();
 * ```
 *
 * @example Dialog with focus management
 * ```typescript
 * const dialog = new Dialog({
 *   parent: screen,
 *   width: '50%',
 *   height: '50%',
 *   border: { type: 'line' }
 * });
 *
 * dialog.show();
 * screen.render();
 * // Focus is automatically saved and restored
 * ```
 */
class Dialog extends Box {
  override type = "dialog";
  declare options: DialogOptions;

  constructor(options: DialogOptions = {}) {
    const dialogOptions: DialogOptions = {
      hidden: true,
      left: "center",
      top: "center",
      shadow: true,
      focusable: true,
      ...options,
    };

    super(dialogOptions);

    // Handle ESC key to close dialog when dialog or any child is focused
    this.on("element keypress", (_el: any, _ch: any, key: any) => {
      if (key.name === "escape" && !this.hidden) {
        this.hide();
        if (this.screen) {
          this.screen.render();
        }
      }
    });
  }

  /**
   * Show the dialog and optionally save current focus.
   *
   * @param saveFocus - Whether to save the current focus (default: true)
   */
  override show(saveFocus: boolean = true): void {
    if (saveFocus && this.screen) {
      this.screen.saveFocus();
    }

    super.show();

    if (this.options.focusable !== false && this.screen) {
      this.focus();
    }
  }

  /**
   * Hide the dialog and optionally restore previous focus.
   *
   * @param restoreFocus - Whether to restore the previous focus (default: true)
   */
  override hide(restoreFocus: boolean = true): void {
    super.hide();

    if (restoreFocus && this.screen) {
      try {
        this.screen.restoreFocus();
      } catch (e) {
        // Ignore errors if focus cannot be restored
      }
    }
  }

  /**
   * Display the dialog (alias for show).
   */
  display(): void {
    this.show();
  }

  /**
   * Close the dialog (alias for hide).
   */
  close(): void {
    this.hide();
  }
}

/**
 * Expose
 */

export default Dialog;
export { Dialog };
