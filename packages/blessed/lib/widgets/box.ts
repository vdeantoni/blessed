/**
 * box.ts - box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Element from './element.js';
import type { BoxOptions } from '../types/options.js';

/**
 * Box
 */

class Box extends Element {
  type = 'box';

  constructor(options: BoxOptions = {}) {
    super(options);
  }
}

/**
 * Expose
 */

export default Box;
export { Box };
