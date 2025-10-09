/**
 * prompt.js - prompt element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');
const Button = require('./button');
const Textbox = require('./textbox');
const ScrollableBox = require('./scrollablebox');

/**
 * Prompt
 */

class Prompt extends Box {
  type = 'prompt';

  constructor(options = {}) {
    // Handle scrollable workaround - copy methods when Element returns ScrollableBox
    if (options.scrollable && !options._promptInit) {
      options._ignore = false;
      options._promptInit = true;
      const instance = super(options);

      // Copy Prompt methods to the ScrollableBox instance
      if (instance instanceof ScrollableBox) {
        instance.readInput = Prompt.prototype.readInput;
        Object.defineProperty(instance, 'input', {
          get() { return this.readInput; }
        });
        Object.defineProperty(instance, 'setInput', {
          get() { return this.readInput; }
        });
        instance.type = 'prompt';
      }

      return instance;
    }

    options.hidden = true;

    super(options);

    this._.input = new Textbox({
      parent: this,
      top: 3,
      height: 1,
      left: 2,
      right: 2,
      bg: 'black'
    });

    this._.okay = new Button({
      parent: this,
      top: 5,
      height: 1,
      left: 2,
      width: 6,
      content: 'Okay',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true
    });

    this._.cancel = new Button({
      parent: this,
      top: 5,
      height: 1,
      shrink: true,
      left: 10,
      width: 8,
      content: 'Cancel',
      align: 'center',
      bg: 'black',
      hoverBg: 'blue',
      autoFocus: false,
      mouse: true
    });
  }

  readInput(text, value, callback) {
    let okay, cancel;

    if (!callback) {
      callback = value;
      value = '';
    }

    // Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.show();
    this.setContent(' ' + text);

    this._.input.value = value;

    this.screen.saveFocus();

    this._.okay.on('press', okay = () => {
      this._.input.submit();
    });

    this._.cancel.on('press', cancel = () => {
      this._.input.cancel();
    });

    this._.input.readInput((err, data) => {
      this.hide();
      this.screen.restoreFocus();
      this._.okay.removeListener('press', okay);
      this._.cancel.removeListener('press', cancel);
      return callback(err, data);
    });

    this.screen.render();
  }

  get input() {
    return this.readInput;
  }

  get setInput() {
    return this.readInput;
  }
}

/**
 * Expose
 */

module.exports = Prompt;
