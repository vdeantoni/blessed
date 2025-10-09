/**
 * scrollabletext.js - scrollable text element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const ScrollableBox = require('./scrollablebox');

/**
 * ScrollableText
 */

class ScrollableText extends ScrollableBox {
  type = 'scrollable-text';

  constructor(options = {}) {
    options.alwaysScroll = true;
    super(options);
  }
}

/**
 * Expose
 */

module.exports = ScrollableText;