/**
 * scrollablebox.ts - scrollable box element for blessed
 */

/**
 * Modules
 */

import type { ScrollableBoxOptions } from '../types';
import Box from './box.js';
import { makeScrollable } from '../mixins/scrollable.js';

/**
 * ScrollableBox
 */

class ScrollableBox extends Box {
  override type = 'scrollable-box';

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
