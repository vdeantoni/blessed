/**
 * radiobutton.ts - radio button element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { RadioButtonOptions } from '../types/options.js';
import Checkbox from './checkbox.js';

/**
 * RadioButton
 */

class RadioButton extends Checkbox {
  type = 'radio-button';

  constructor(options: RadioButtonOptions = {}) {
    super(options);

    this.on('check', () => {
      let el: any = this;
      while (el = el.parent) {
        if (el.type === 'radio-set'
            || el.type === 'form') break;
      }
      el = el || this.parent;
      el.forDescendants((el: any) => {
        if (el.type !== 'radio-button' || el === this) {
          return;
        }
        el.uncheck();
      });
    });
  }

  render(): any {
    this.clearPos(true);
    this.setContent('(' + (this.checked ? '*' : ' ') + ') ' + this.text, true);
    return super.render();
  }
}

(RadioButton.prototype as any).toggle = RadioButton.prototype.check;

/**
 * Expose
 */

export default RadioButton;
export { RadioButton };
