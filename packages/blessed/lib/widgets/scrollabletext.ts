/**
 * scrollabletext.ts - scrollable text element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import ScrollableBox from './scrollablebox.js';

/**
 * ScrollableText
 */

class ScrollableText extends ScrollableBox {
  type = 'scrollable-text';

  constructor(options: any = {}) {
    options.alwaysScroll = true;
    super(options);
  }
}

/**
 * Expose
 */

export default ScrollableText;
export { ScrollableText };
