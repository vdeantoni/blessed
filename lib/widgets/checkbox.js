/**
 * checkbox.js - checkbox element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Input from './input.js';

/**
 * Checkbox
 */

class Checkbox extends Input {
  type = 'checkbox';

  constructor(options = {}) {
    super(options);

    this.text = options.content || options.text || '';
    this.checked = this.value = options.checked || false;

    this.on('keypress', (ch, key) => {
      if (key.name === 'enter' || key.name === 'space') {
        this.toggle();
        this.screen.render();
      }
    });

    if (options.mouse) {
      this.on('click', () => {
        this.toggle();
        this.screen.render();
      });
    }

    this.on('focus', () => {
      const lpos = this.lpos;
      if (!lpos) return;
      this.screen.program.lsaveCursor('checkbox');
      this.screen.program.cup(lpos.yi, lpos.xi + 1);
      this.screen.program.showCursor();
    });

    this.on('blur', () => {
      this.screen.program.lrestoreCursor('checkbox', true);
    });
  }

  render() {
    this.clearPos(true);
    this.setContent('[' + (this.checked ? 'x' : ' ') + '] ' + this.text, true);
    return super.render();
  }

  check() {
    if (this.checked) return;
    this.checked = this.value = true;
    this.emit('check');
  }

  uncheck() {
    if (!this.checked) return;
    this.checked = this.value = false;
    this.emit('uncheck');
  }

  toggle() {
    return this.checked
      ? this.uncheck()
      : this.check();
  }
}

/**
 * Expose
 */

export default Checkbox;
export { Checkbox };

