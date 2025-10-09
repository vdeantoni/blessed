/**
 * box.js - box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Element = require('./element');

/**
 * Box
 */

class Box extends Element {
  type = 'box';

  constructor(options = {}) {
    super(options);
  }
}

/**
 * Expose
 */

module.exports = Box;
