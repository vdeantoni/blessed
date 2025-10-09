/**
 * text.js - text element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Element = require('./element');

/**
 * Text
 */

class Text extends Element {
  type = 'text';

  constructor(options = {}) {
    options.shrink = true;
    super(options);
  }
}

/**
 * Expose
 */

module.exports = Text;
