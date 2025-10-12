/**
 * log.ts - log element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { LogOptions } from '../types/options.js';
import util from 'util';
import ScrollableText from './scrollabletext.js';

const nextTick = global.setImmediate || process.nextTick.bind(process);

/**
 * Log
 */

class Log extends ScrollableText {
    type = 'log';
    scrollback: number;
    scrollOnInput: boolean | undefined;
    _userScrolled: boolean = false;

    constructor(options: LogOptions = {}) {
        super(options);

        this.scrollback = options.scrollback != null
            ? options.scrollback
            : Infinity;
        this.scrollOnInput = options.scrollOnInput;

        this.on('set content', () => {
            if (!this._userScrolled || this.scrollOnInput) {
                nextTick(() => {
                    this.setScrollPerc?.(100);
                    this._userScrolled = false;
                    this.screen.render();
                });
            }
        });
    }

    log(...args: any[]) {
        return this.add(...args);
    }

    add(...args: any[]) {
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

    // @ts-expect-error - Override ScrollableText scroll property with Log-specific method
    scroll(offset: number, always?: any) {
        if (offset === 0) return this._scroll(offset, always);
        this._userScrolled = true;
        const ret = this._scroll(offset, always);
        if ((this.getScrollPerc?.() || 0) === 100) {
            this._userScrolled = false;
        }
        return ret;
    }

    // Access parent scroll via prototype to avoid property/method conflict
    _scroll(offset: number, always?: any) {
        return ScrollableText.prototype.scroll?.call(this, offset, always);
    }
}

/**
 * Expose
 */

export default Log;
export { Log };
