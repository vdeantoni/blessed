/**
 * message.ts - message element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { MessageOptions } from '../types/options.js';
import Box from './box.js';

/**
 * Message / Error
 */

class Message extends Box {
  type = 'message';
  options: MessageOptions;

  constructor(options: MessageOptions = {}) {
    options.tags = true;
    super(options);
  }

  display(text: string, time?: number | ((err?: any, data?: any) => void), callback?: (err?: any, data?: any) => void): void {
    if (typeof time === 'function') {
      callback = time;
      time = undefined;
    }

    if (time == null) time = 3;

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    if (this.scrollable) {
      this.screen.saveFocus();
      this.focus();
      this.scrollTo?.(0);
    }

    this.show();
    this.setContent(text);
    this.screen.render();

    if (time === Infinity || time === -1 || time === 0) {
      const end: any = () => {
        if (end.done) return;
        end.done = true;
        if (this.scrollable) {
          try {
            this.screen.restoreFocus();
          } catch (e) {
            ;
          }
        }
        this.hide();
        this.screen.render();
        if (callback) callback();
      };

      setTimeout(() => {
        const keypressHandler = (ch: any, key: any) => {
          if (key.name === 'mouse') return;
          if (this.scrollable) {
            if ((key.name === 'up' || (this.options.vi && key.name === 'k'))
              || (key.name === 'down' || (this.options.vi && key.name === 'j'))
              || (this.options.vi && key.name === 'u' && key.ctrl)
              || (this.options.vi && key.name === 'd' && key.ctrl)
              || (this.options.vi && key.name === 'b' && key.ctrl)
              || (this.options.vi && key.name === 'f' && key.ctrl)
              || (this.options.vi && key.name === 'g' && !key.shift)
              || (this.options.vi && key.name === 'g' && key.shift)) {
              return;
            }
          }
          if (Array.isArray(this.options.ignoreKeys) && ~this.options.ignoreKeys.indexOf(key.name)) {
            return;
          }
          this.removeScreenEvent('keypress', keypressHandler);
          end();
        };
        this.onScreenEvent('keypress', keypressHandler);

        // XXX May be affected by new element.options.mouse option.
        if (!this.options.mouse) return;
        const mouseHandler = (data: any) => {
          if (data.action === 'mousemove') return;
          this.removeScreenEvent('mouse', mouseHandler);
          end();
        };
        this.onScreenEvent('mouse', mouseHandler);
      }, 10);

      return;
    }

    setTimeout(() => {
      this.hide();
      this.screen.render();
      if (callback) callback();
    }, (time as number) * 1000);
  }

  get log(): (text: string, time?: number | ((err?: any, data?: any) => void), callback?: (err?: any, data?: any) => void) => void {
    return this.display;
  }

  error(text: string, time?: number | ((err?: any, data?: any) => void), callback?: (err?: any, data?: any) => void): void {
    return this.display('{red-fg}Error: ' + text + '{/red-fg}', time, callback);
  }
}

/**
 * Expose
 */

export default Message;
export { Message };
