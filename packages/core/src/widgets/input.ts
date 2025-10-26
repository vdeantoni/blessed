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
    // Input widgets should be keyable by default for form navigation
    options.input = true;
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
