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

  constructor(options: InputOptions = {}) {
    super(options);
  }
}

/**
 * Expose
 */

export default Input;
export { Input };
