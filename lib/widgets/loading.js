/**
 * loading.js - loading element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');
const Text = require('./text');
const ScrollableBox = require('./scrollablebox');

/**
 * Loading
 */

class Loading extends Box {
  type = 'loading';

  constructor(options = {}) {
    // Handle scrollable workaround - copy methods when Element returns ScrollableBox
    if (options.scrollable && !options._loadingInit) {
      options._ignore = false;
      options._loadingInit = true;
      const instance = super(options);

      // Copy Loading methods to the ScrollableBox instance
      if (instance instanceof ScrollableBox) {
        instance.load = Loading.prototype.load;
        instance.stop = Loading.prototype.stop;
        instance.type = 'loading';
      }

      return instance;
    }

    super(options);

    this._.icon = new Text({
      parent: this,
      align: 'center',
      top: 2,
      left: 1,
      right: 1,
      height: 1,
      content: '|'
    });
  }

  load(text) {
    // XXX Keep above:
    // var parent = this.parent;
    // this.detach();
    // parent.append(this);

    this.show();
    this.setContent(text);

    if (this._.timer) {
      this.stop();
    }

    this.screen.lockKeys = true;

    this._.timer = setInterval(() => {
      if (this._.icon.content === '|') {
        this._.icon.setContent('/');
      } else if (this._.icon.content === '/') {
        this._.icon.setContent('-');
      } else if (this._.icon.content === '-') {
        this._.icon.setContent('\\');
      } else if (this._.icon.content === '\\') {
        this._.icon.setContent('|');
      }
      this.screen.render();
    }, 200);
  }

  stop() {
    this.screen.lockKeys = false;
    this.hide();
    if (this._.timer) {
      clearInterval(this._.timer);
      delete this._.timer;
    }
    this.screen.render();
  }
}

/**
 * Expose
 */

module.exports = Loading;