/**
 * input.ts - abstract input element for blessed
 */

/**
 * Modules
 */

import type { InputOptions } from "../types";
import Box from "./box.js";

/**
 * Input
 */

class Input extends Box {
  override type = "input";
  keyable: boolean;

  constructor(options: InputOptions = {}) {
    options.input = true;

    if (options.tabIndex === undefined) {
      options.tabIndex = 0;
    }

    super(options);

    // Set instance property for form navigation
    this.keyable = true;
  }
}

/**
 * Expose
 */

export default Input;
export { Input };
