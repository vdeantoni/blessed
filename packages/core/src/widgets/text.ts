/**
 * text.ts - text element for blessed
 */

/**
 * Modules
 */

import type { TextOptions } from "../types";
import Element from "./element.js";

/**
 * Text
 */

class Text extends Element {
  override type = "text";

  constructor(options: TextOptions = {}) {
    options.shrink = true;
    super(options);
  }
}

/**
 * Expose
 */

export default Text;
export { Text };
