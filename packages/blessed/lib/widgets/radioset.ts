/**
 * radioset.ts - radio set element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { RadioSetOptions } from '../types';
import Box from './box.js';

/**
 * RadioSet
 */

class RadioSet extends Box {
  type = 'radio-set';

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
