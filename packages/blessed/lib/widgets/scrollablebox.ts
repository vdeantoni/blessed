/**
 * scrollablebox.ts - scrollable box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { ScrollableBoxOptions } from '../types/options.js';
import Box from './box.js';
import { makeScrollable } from '../mixins/scrollable.js';

/**
 * ScrollableBox
 */

class ScrollableBox extends Box {
  type = 'scrollable-box';

  constructor(options: ScrollableBoxOptions = {}) {
    super(options);
    makeScrollable(this, options);
  }
}

/**
 * Expose
 */

export default ScrollableBox;
export { ScrollableBox };
