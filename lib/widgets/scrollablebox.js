/**
 * scrollablebox.js - scrollable box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Box from './box.js';
import { makeScrollable } from '../mixins/scrollable.js';

/**
 * ScrollableBox
 */

class ScrollableBox extends Box {
  type = 'scrollable-box';

  constructor(options = {}) {
    super(options);
    makeScrollable(this, options);
  }

  get reallyScrollable() {
    if (this.shrink) return this.scrollable;
    return this.getScrollHeight() > this.height;
  }
}

/**
 * Expose
 */

export default ScrollableBox;
export { ScrollableBox };

