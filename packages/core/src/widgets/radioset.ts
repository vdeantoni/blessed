/**
 * radioset.ts - radio set element for blessed
 */

/**
 * Modules
 */

import type { RadioSetOptions } from "../types";
import Box from "./box.js";

/**
 * RadioSet
 */

class RadioSet extends Box {
  override type = "radio-set";

  constructor(options: RadioSetOptions = {}) {
    // Possibly inherit parent's style.
    // options.style = this.parent.style;
    super(options);
  }
}

/**
 * Expose
 */

export default RadioSet;
export { RadioSet };
