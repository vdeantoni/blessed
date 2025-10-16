/**
 * scrollabletext.ts - scrollable text element for blessed
 */

/**
 * Modules
 */

import type { ScrollableTextOptions } from '../types';
import ScrollableBox from './scrollablebox.js';

/**
 * ScrollableText
 */

class ScrollableText extends ScrollableBox {
  override type = 'scrollable-text';

  constructor(options: ScrollableTextOptions = {}) {
    options.alwaysScroll = true;
    super(options);
  }
}

/**
 * Expose
 */

export default ScrollableText;
export { ScrollableText };
