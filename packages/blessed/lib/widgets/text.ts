/**
 * text.ts - text element for blessed
 */

/**
 * Modules
 */

import Element from './element.js';
import type { TextOptions } from '../types';

/**
 * Text
 */

class Text extends Element {
  type = 'text';

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
