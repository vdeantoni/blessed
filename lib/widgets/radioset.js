/**
 * radioset.js - radio set element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');

/**
 * RadioSet
 */

class RadioSet extends Box {
  type = 'radio-set';

  constructor(options = {}) {
    // Possibly inherit parent's style.
    // options.style = this.parent.style;
    super(options);
  }
}

/**
 * Expose
 */

module.exports = RadioSet;