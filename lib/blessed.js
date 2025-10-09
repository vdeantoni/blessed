/**
 * blessed - a high-level terminal interface library for node.js
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Blessed
 */

const ProgramClass = require('./program');
const Tput = require('./tput');

function blessed() {
  return new ProgramClass(...arguments);
}

// Factory functions for backward compatibility
blessed.program = function() {
  return new ProgramClass(...arguments);
};

blessed.tput = function() {
  return new Tput(...arguments);
};

// Expose the actual ES6 classes
blessed.Program = ProgramClass;
blessed.Tput = Tput;
blessed.widget = require('./widget');
blessed.colors = require('./colors');
blessed.unicode = require('./unicode');
blessed.helpers = require('./helpers');

blessed.helpers.sprintf = Tput.sprintf;
blessed.helpers.tryRead = Tput.tryRead;
blessed.helpers.merge(blessed, blessed.helpers);

blessed.helpers.merge(blessed, blessed.widget);

/**
 * Expose
 */

module.exports = blessed;
