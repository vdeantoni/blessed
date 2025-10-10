/**
 * blessed - a high-level terminal interface library for node.js
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Blessed
 */

import ProgramClass from './program.js';
import Tput from './tput.js';
import widget from './widget.js';
import colors from './colors.js';
import unicode from './unicode.js';
import helpers from './helpers.js';

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

blessed.Program = ProgramClass;
blessed.Tput = Tput;
blessed.widget = widget;
blessed.colors = colors;
blessed.unicode = unicode;
blessed.helpers = helpers;
blessed.helpers.sprintf = Tput.sprintf;
blessed.helpers.tryRead = Tput.tryRead;
blessed.helpers.merge(blessed, blessed.helpers);
blessed.helpers.merge(blessed, blessed.widget);

/**
 * Expose
 */

export default blessed;
export { blessed };
