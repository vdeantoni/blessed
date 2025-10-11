/**
 * textbox.ts - textbox element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Textarea from './textarea.js';

/**
 * Textbox
 */

class Textbox extends Textarea {
  type = 'textbox';
  secret: boolean;
  censor: boolean;
  __olistener: any;

  constructor(options: any = {}) {
    options.scrollable = false;

    super(options);

    this.secret = options.secret;
    this.censor = options.censor;

    // Store the original listener
    this.__olistener = super._listener;
  }

  _listener(ch: any, key: any) {
    if (key.name === 'enter') {
      this._done(null, this.value);
      return;
    }
    return this.__olistener.call(this, ch, key);
  }

  setValue(value?: any) {
    let visible: number;
    let val: string;
    if (value == null) {
      value = this.value;
    } else if (this._value === value) {
      return;
    }
    value = value.replace(/\n/g, '');
    this.value = value;
    this._value = value;
    if (this.secret) {
      this.setContent('');
    } else if (this.censor) {
      this.setContent(Array(this.value.length + 1).join('*'));
    } else {
      visible = -(this.width - this.iwidth - 1);
      val = this.value.replace(/\t/g, this.screen.tabc);
      this.setContent(val.slice(visible));
    }
    this._updateCursor();
  }

  submit() {
    if (!this.__listener) return;
    return this.__listener('\r', { name: 'enter' });
  }
}

/**
 * Expose
 */

export default Textbox;
export { Textbox };
