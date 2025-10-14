/**
 * input.ts - abstract input element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { InputOptions } from '../types';
import Box from './box.js';

/**
 * Input
 */

class Input extends Box {
  type = 'input';

  constructor(options: InputOptions = {}) {
    super(options);
  }
}

/**
 * Expose
 */

export default Input;
export { Input };
