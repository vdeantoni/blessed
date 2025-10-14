/**
 * blessed - a high-level terminal interface library for node.js
 */

/**
 * Blessed
 */

import ProgramClass from './program.js';
import Tput, { sprintf, tryRead } from './tput.js';
import widget from './widget.js';
import colors from './colors.js';
import unicode from './unicode.js';
import helpers from './helpers.js';

interface BlessedFunction {
  (...args: any[]): ProgramClass;
  program(...args: any[]): ProgramClass;
  tput(...args: any[]): Tput;
  Program: typeof ProgramClass;
  Tput: typeof Tput;
  widget: typeof widget;
  colors: typeof colors;
  unicode: typeof unicode;
  helpers: typeof helpers & {
    sprintf: typeof sprintf;
    tryRead: typeof tryRead;
  };
  [key: string]: any;
}

function blessed(...args: any[]): ProgramClass {
  return new ProgramClass(...args);
}

// Factory functions for backward compatibility
(blessed as any).program = function (...args: any[]): ProgramClass {
  return new ProgramClass(...args);
};

(blessed as any).tput = function (...args: any[]): Tput {
  return new Tput(...args);
};

(blessed as any).Program = ProgramClass;
(blessed as any).Tput = Tput;
(blessed as any).widget = widget;
(blessed as any).colors = colors;
(blessed as any).unicode = unicode;
(blessed as any).helpers = helpers;
(blessed as any).helpers.sprintf = sprintf;
(blessed as any).helpers.tryRead = tryRead;
helpers.merge(blessed as any, helpers);
helpers.merge(blessed as any, widget);

/**
 * Expose
 */

export default blessed as BlessedFunction;
export { blessed as blessed };