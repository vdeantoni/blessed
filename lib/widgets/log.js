/**
 * log.js - log element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const util = require('util');

const nextTick = global.setImmediate || process.nextTick.bind(process);

const ScrollableText = require('./scrollabletext');

/**
 * Log
 */

class Log extends ScrollableText {
    type = 'log';

    constructor(options = {}) {
        super(options);

        this.scrollback = options.scrollback != null
            ? options.scrollback
            : Infinity;
        this.scrollOnInput = options.scrollOnInput;

        this.on('set content', () => {
            if (!this._userScrolled || this.scrollOnInput) {
                nextTick(() => {
                    this.setScrollPerc(100);
                    this._userScrolled = false;
                    this.screen.render();
                });
            }
        });
    }

    log(...args) {
        return this.add(...args);
    }

    add(...args) {
        if (typeof args[0] === 'object') {
            args[0] = util.inspect(args[0], true, 20, true);
        }
        const text = util.format(...args);
        this.emit('log', text);
        const ret = this.pushLine(text);
        if (this._clines.fake.length > this.scrollback) {
            this.shiftLine(0, (this.scrollback / 3) | 0);
        }
        return ret;
    }

    scroll(offset, always) {
        if (offset === 0) return this._scroll(offset, always);
        this._userScrolled = true;
        const ret = this._scroll(offset, always);
        if (this.getScrollPerc() === 100) {
            this._userScrolled = false;
        }
        return ret;
    }

    // Save parent's scroll method as _scroll
    _scroll(offset, always) {
        return super.scroll(offset, always);
    }
}

/**
 * Expose
 */

module.exports = Log;