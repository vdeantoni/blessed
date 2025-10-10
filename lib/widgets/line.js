/**
 * line.js - line element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Box from './box.js';

/**
 * Line
 */

class Line extends Box {
  type = 'line';

  constructor(options = {}) {
    const orientation = options.orientation || 'vertical';
    delete options.orientation;

    if (orientation === 'vertical') {
      options.width = 1;
    } else {
      options.height = 1;
    }

    super(options);

    this.ch = !options.type || options.type === 'line'
      ? orientation === 'horizontal' ? '─' : '│'
      : options.ch || ' ';

    this.border = Object.create(this, {
      type: { value: 'bg', writable: true, enumerable: true, configurable: true }
    });

    this.style.border = this.style;
  }
}

/**
 * Expose
 */

export default Line;
export { Line };

