/**
 * input.js - abstract input element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');

/**
 * Input
 */

class Input extends Box {
  type = 'input';

  constructor(options = {}) {
    super(options);
  }
}

/**
 * Expose
 */

module.exports = Input;
