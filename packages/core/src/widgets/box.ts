/**
 * box.ts - box element for blessed
 */

/**
 * Modules
 */

import Element from "./element.js";
import type { BoxOptions } from "../types";

/**
 * Box
 */

class Box extends Element {
  override type = "box";

  constructor(options: BoxOptions = {}) {
    super(options);
  }
}

/**
 * Expose
 */

export default Box;
export { Box };
