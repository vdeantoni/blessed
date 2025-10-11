/**
 * text.ts - text element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Element from './element.js';
import type { TextOptions } from '../types/options.js';

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
