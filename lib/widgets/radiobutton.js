/**
 * radiobutton.js - radio button element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Checkbox = require('./checkbox');

/**
 * RadioButton
 */

class RadioButton extends Checkbox {
  type = 'radio-button';

  constructor(options = {}) {
    super(options);

    this.on('check', () => {
      let el = this;
      while (el = el.parent) {
        if (el.type === 'radio-set'
            || el.type === 'form') break;
      }
      el = el || this.parent;
      el.forDescendants((el) => {
        if (el.type !== 'radio-button' || el === this) {
          return;
        }
        el.uncheck();
      });
    });
  }

  render() {
    this.clearPos(true);
    this.setContent('(' + (this.checked ? '*' : ' ') + ') ' + this.text, true);
    return super.render();
  }
}

RadioButton.prototype.toggle = RadioButton.prototype.check;

/**
 * Expose
 */

module.exports = RadioButton;
