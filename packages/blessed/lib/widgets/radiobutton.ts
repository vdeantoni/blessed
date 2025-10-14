/**
 * radiobutton.ts - radio button element for blessed
 */

/**
 * Modules
 */

import type { RadioButtonOptions } from '../types';
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
