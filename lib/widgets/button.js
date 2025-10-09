/**
 * button.js - button element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Input = require('./input');

/**
 * Button
 */

class Button extends Input {
  type = 'button';

  constructor(options = {}) {
    if (options.autoFocus == null) {
      options.autoFocus = false;
    }

    super(options);

    this.on('keypress', (ch, key) => {
      if (key.name === 'enter' || key.name === 'space') {
        return this.press();
      }
    });

    if (this.options.mouse) {
      this.on('click', () => {
        return this.press();
      });
    }
  }

  press() {
    this.focus();
    this.value = true;
    const result = this.emit('press');
    delete this.value;
    return result;
  }
}

/**
 * Expose
 */

module.exports = Button;
