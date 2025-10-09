/**
 * message.js - message element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');
const ScrollableBox = require('./scrollablebox');

/**
 * Message / Error
 */

class Message extends Box {
  type = 'message';

  constructor(options = {}) {
    options.tags = true;

    // If scrollable, we need to let Element create a ScrollableBox,
    // but we need to copy our methods to it
    if (options.scrollable && !options._messageInit) {
      options._ignore = false; // Let Element create ScrollableBox
      const instance = super(options);

      // Copy Message methods to the ScrollableBox instance
      if (instance instanceof ScrollableBox) {
        instance.display = Message.prototype.display;
        instance.error = Message.prototype.error;
        Object.defineProperty(instance, 'log', {
          get() { return this.display; }
        });
        instance.type = 'message';
      }
      return instance;
    }

    super(options);
  }

  display(text, time, callback) {
    if (typeof time === 'function') {
      callback = time;
      time = null;
    }

    if (time == null) time = 3;

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    if (this.scrollable) {
      this.screen.saveFocus();
      this.focus();
      this.scrollTo(0);
    }

    this.show();
    this.setContent(text);
    this.screen.render();

    if (time === Infinity || time === -1 || time === 0) {
      const end = () => {
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
        const keypressHandler = (ch, key) => {
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
          if (this.options.ignoreKeys && ~this.options.ignoreKeys.indexOf(key.name)) {
            return;
          }
          this.removeScreenEvent('keypress', keypressHandler);
          end();
        };
        this.onScreenEvent('keypress', keypressHandler);

        // XXX May be affected by new element.options.mouse option.
        if (!this.options.mouse) return;
        const mouseHandler = (data) => {
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
    }, time * 1000);
  }

  get log() {
    return this.display;
  }

  error(text, time, callback) {
    return this.display('{red-fg}Error: ' + text + '{/red-fg}', time, callback);
  }
}

/**
 * Expose
 */

module.exports = Message;
