/**
 * terminal.ts - term.js terminal element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { TerminalOptions } from '../types/options.js';
import Box from './box.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextTick = global.setImmediate || process.nextTick.bind(process);

/**
 * Terminal
 */

class Terminal extends Box {
  type = 'terminal';
  handler?: (data: any) => void;
  shell: string;
  args: string[];
  cursor: any;
  cursorBlink: any;
  screenKeys: any;
  termName: string;
  term: any;
  pty: any;
  _onData!: (data: any) => void; // Set in bootstrap method
  dattr: any;
  title?: string;
  options!: TerminalOptions; // Set by parent Node constructor

  constructor(options: TerminalOptions = {}) {
    options.scrollable = false;

    super(options);

    // XXX Workaround for all motion
    if (this.screen.program.tmux && this.screen.program.tmuxVersion >= 2) {
      this.screen.program.enableMouse();
    }

    this.handler = options.handler;
    this.shell = options.shell || process.env.SHELL || 'sh';
    this.args = options.args || [];

    this.cursor = this.options.cursor;
    this.cursorBlink = this.options.cursorBlink;
    this.screenKeys = this.options.screenKeys;

    this.style = this.style || {};
    this.style.bg = this.style.bg || 'default';
    this.style.fg = this.style.fg || 'default';

    this.termName = options.terminal
      || options.term
      || process.env.TERM
      || 'xterm';

    this.bootstrap();
  }

    bootstrap(): void {
        const self = this;

        const element: any = {
            // window
            get document() { return element; },
            navigator: { userAgent: 'node.js' },

            // document
            get defaultView() { return element; },
            get documentElement() { return element; },
            createElement: function() { return element; },

            // element
            get ownerDocument() { return element; },
            addEventListener: function() {},
            removeEventListener: function() {},
            getElementsByTagName: function() { return [element]; },
            getElementById: function() { return element; },
            parentNode: null,
            offsetParent: null,
            appendChild: function() {},
            removeChild: function() {},
            setAttribute: function() {},
            getAttribute: function() {},
            style: {},
            focus: function() {},
            blur: function() {},
            console: console
        };

        element.parentNode = element;
        element.offsetParent = element;

        this.term = require('term.js')({
            termName: this.termName,
            cols: this.width - this.iwidth,
            rows: this.height - this.iheight,
            context: element,
            document: element,
            body: element,
            parent: element,
            cursorBlink: this.cursorBlink,
            screenKeys: this.screenKeys
        });

        this.term.refresh = function() {
            self.screen.render();
        };

        this.term.keyDown = function() {};
        this.term.keyPress = function() {};

        this.term.open(element);

        // Emits key sequences in html-land.
        // Technically not necessary here.
        // In reality if we wanted to be neat, we would overwrite the keyDown and
        // keyPress methods with our own node.js-keys->terminal-keys methods, but
        // since all the keys are already coming in as escape sequences, we can just
        // send the input directly to the handler/socket (see below).
        // this.term.on('data', function(data) {
        //   self.handler(data);
        // });

        // Incoming keys and mouse inputs.
        // NOTE: Cannot pass mouse events - coordinates will be off!
        this.screen.program.input.on('data', this._onData = function(data: any) {
            if (self.screen.focused === self && !self._isMouse(data)) {
                self.handler?.(data);
            }
        });

        this.onScreenEvent('mouse', function(data: any) {
            if (self.screen.focused !== self) return;

            if (data.x < self.aleft + self.ileft) return;
            if (data.y < self.atop + self.itop) return;
            if (data.x > self.aleft - self.ileft + self.width) return;
            if (data.y > self.atop - self.itop + self.height) return;

            if (self.term.x10Mouse
                || self.term.vt200Mouse
                || self.term.normalMouse
                || self.term.mouseEvents
                || self.term.utfMouse
                || self.term.sgrMouse
                || self.term.urxvtMouse) {
                ;
            } else {
                return;
            }

            let b = data.raw[0]
                , x = data.x - self.aleft
                , y = data.y - self.atop
                , s: string;

            if (self.term.urxvtMouse) {
                if (self.screen.program.sgrMouse) {
                    b += 32;
                }
                s = '\x1b[' + b + ';' + (x + 32) + ';' + (y + 32) + 'M';
            } else if (self.term.sgrMouse) {
                if (!self.screen.program.sgrMouse) {
                    b -= 32;
                }
                s = '\x1b[<' + b + ';' + x + ';' + y
                    + (data.action === 'mousedown' ? 'M' : 'm');
            } else {
                if (self.screen.program.sgrMouse) {
                    b += 32;
                }
                s = '\x1b[M'
                    + String.fromCharCode(b)
                    + String.fromCharCode(x + 32)
                    + String.fromCharCode(y + 32);
            }

            self.handler?.(s);
        });

        this.on('focus', function() {
            self.term.focus();
        });

        this.on('blur', function() {
            self.term.blur();
        });

        this.term.on('title', function(title: string) {
            self.title = title;
            self.emit('title', title);
        });

        this.term.on('passthrough', function(data: any) {
            self.screen.program.flush();
            self.screen.program._owrite(data);
        });

        this.on('resize', function() {
            nextTick(function() {
                self.term.resize(self.width - self.iwidth, self.height - self.iheight);
            });
        });

        this.once('render', function() {
            self.term.resize(self.width - self.iwidth, self.height - self.iheight);
        });

        this.on('destroy', function() {
            self.kill();
            self.screen.program.input.removeListener('data', self._onData);
        });

        if (this.handler) {
            return;
        }

        this.pty = require('pty.js').fork(this.shell, this.args, {
            name: this.termName,
            cols: this.width - this.iwidth,
            rows: this.height - this.iheight,
            cwd: process.env.HOME,
            env: this.options.env || process.env
        });

        this.on('resize', function() {
            nextTick(function() {
                try {
                    self.pty.resize(self.width - self.iwidth, self.height - self.iheight);
                } catch (e) {
                    ;
                }
            });
        });

        this.handler = function(data: any) {
            self.pty.write(data);
            self.screen.render();
        };

        this.pty.on('data', function(data: any) {
            self.write(data);
            self.screen.render();
        });

        this.pty.on('exit', function(code: number) {
            self.emit('exit', code || null);
        });

        this.onScreenEvent('keypress', function() {
            self.screen.render();
        });

        this.screen._listenKeys(this);
    }

    write(data: any): any {
        return this.term.write(data);
    }

    render(): any {
        const ret = super.render();
        if (!ret) return;

        this.dattr = this.sattr(this.style);

        const xi = ret.xi + this.ileft
            , xl = ret.xl - this.iright
            , yi = ret.yi + this.itop
            , yl = ret.yl - this.ibottom;
        let cursor: number;

        const scrollback = this.term.lines.length - (yl - yi);

        for (let y = Math.max(yi, 0); y < yl; y++) {
            const line = this.screen.lines[y];
            if (!line || !this.term.lines[scrollback + y - yi]) break;

            if (y === yi + this.term.y
                && this.term.cursorState
                && this.screen.focused === this
                && (this.term.ydisp === this.term.ybase || this.term.selectMode)
                && !this.term.cursorHidden) {
                cursor = xi + this.term.x;
            } else {
                cursor = -1;
            }

            for (let x = Math.max(xi, 0); x < xl; x++) {
                if (!line[x] || !this.term.lines[scrollback + y - yi][x - xi]) break;

                line[x][0] = this.term.lines[scrollback + y - yi][x - xi][0];

                if (x === cursor) {
                    if (this.cursor === 'line') {
                        line[x][0] = this.dattr;
                        line[x][1] = '\u2502';
                        continue;
                    } else if (this.cursor === 'underline') {
                        line[x][0] = this.dattr | (2 << 18);
                    } else if (this.cursor === 'block' || !this.cursor) {
                        line[x][0] = this.dattr | (8 << 18);
                    }
                }

                line[x][1] = this.term.lines[scrollback + y - yi][x - xi][1];

                // default foreground = 257
                if (((line[x][0] >> 9) & 0x1ff) === 257) {
                    line[x][0] &= ~(0x1ff << 9);
                    line[x][0] |= ((this.dattr >> 9) & 0x1ff) << 9;
                }

                // default background = 256
                if ((line[x][0] & 0x1ff) === 256) {
                    line[x][0] &= ~0x1ff;
                    line[x][0] |= this.dattr & 0x1ff;
                }
            }

            line.dirty = true;
        }

        return ret;
    }

    _isMouse(buf: any): boolean {
        let s = buf;
        if (Buffer.isBuffer(s)) {
            if (s[0] > 127 && s[1] === undefined) {
                s[0] -= 128;
                s = '\x1b' + s.toString('utf-8');
            } else {
                s = s.toString('utf-8');
            }
        }
        return (buf[0] === 0x1b && buf[1] === 0x5b && buf[2] === 0x4d)
            || /^\x1b\[M([\x00\u0020-\uffff]{3})/.test(s)
            || /^\x1b\[(\d+;\d+;\d+)M/.test(s)
            || /^\x1b\[<(\d+;\d+;\d+)([mM])/.test(s)
            || /^\x1b\[<(\d+;\d+;\d+;\d+)&w/.test(s)
            || /^\x1b\[24([0135])~\[(\d+),(\d+)\]\r/.test(s)
            || /^\x1b\[(O|I)/.test(s);
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    scrollTo(offset: number): void {
        this.term.ydisp = offset;
        this.emit('scroll');
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    getScroll(): number {
        return this.term.ydisp;
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    scroll(offset: number): void {
        this.term.scrollDisp(offset);
        this.emit('scroll');
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    resetScroll(): void {
        this.term.ydisp = 0;
        this.term.ybase = 0;
        this.emit('scroll');
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    getScrollHeight(): number {
        return this.term.rows - 1;
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    getScrollPerc(): number {
        return (this.term.ydisp / this.term.ybase) * 100;
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    setScrollPerc(i: number): any {
        return this.setScroll((i / 100) * this.term.ybase | 0);
    }

    screenshot(xi?: number, xl?: number, yi?: number, yl?: number): any {
        xi = 0 + (xi || 0);
        if (xl != null) {
            xl = 0 + (xl || 0);
        } else {
            xl = this.term.lines[0].length;
        }
        yi = 0 + (yi || 0);
        if (yl != null) {
            yl = 0 + (yl || 0);
        } else {
            yl = this.term.lines.length;
        }
        return this.screen.screenshot(xi, xl, yi, yl, this.term);
    }

    kill(): void {
        if (this.pty) {
            this.pty.destroy();
            this.pty.kill();
        }
        this.term.refresh = function() {};
        this.term.write('\x1b[H\x1b[J');
        if (this.term._blink) {
            clearInterval(this.term._blink);
        }
        this.term.destroy();
    }

    // @ts-expect-error - Override Box scrollable property with Terminal-specific method
    setScroll(offset: number): void {
        this.scrollTo(offset);
    }
}

Terminal.prototype.setScroll = Terminal.prototype.scrollTo;

/**
 * Expose
 */

export default Terminal;
export { Terminal };
