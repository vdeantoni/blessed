/**
 * loading.ts - loading element for blessed
 */

/**
 * Modules
 */

import type { LoadingOptions } from "../types";
import Box from "./box.js";
import Text from "./text.js";

/**
 * Private data for Loading widget
 */
interface LoadingData {
  icon: Text;
  timer?: ReturnType<typeof setInterval>;
  [key: string]: unknown;
}

/**
 * Loading
 */

class Loading extends Box {
  override type = "loading";
  declare _: LoadingData;

  constructor(options: LoadingOptions = {}) {
    super(options);

    this._.icon = new Text({
      parent: this,
      align: "center",
      top: 2,
      left: 1,
      right: 1,
      height: 1,
      content: "|",
    });
  }

  /**
   * Display the loading box and lock keys.
   * Shows animated spinner (|, /, -, \) rotating every 200ms.
   * Locks all keyboard input while loading.
   *
   * @param text - Loading message text to display
   * @example
   * loading.load('Processing...');
   * // Later...
   * loading.stop();
   */
  load(text: string): void {
    // XXX Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.show();
    this.setContent(text);

    if (this._.timer) {
      this.stop();
    }

    this.screen.lockKeys = true;

    this._.timer = setInterval(() => {
      if (this._.icon.content === "|") {
        this._.icon.setContent("/");
      } else if (this._.icon.content === "/") {
        this._.icon.setContent("-");
      } else if (this._.icon.content === "-") {
        this._.icon.setContent("\\");
      } else if (this._.icon.content === "\\") {
        this._.icon.setContent("|");
      }
      this.screen.render();
    }, 200);
  }

  /**
   * Hide the loading box and unlock keys.
   * Stops the spinner animation and restores keyboard input.
   *
   * @example
   * loading.stop();
   */
  stop(): void {
    this.screen.lockKeys = false;
    this.hide();
    if (this._.timer) {
      clearInterval(this._.timer);
      delete this._.timer;
    }
    this.screen.render();
  }
}

/**
 * Expose
 */

export default Loading;
export { Loading };
