/**
 * scrollablebox.js - scrollable box element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

const Box = require('./box');

/**
 * ScrollableBox
 */

class ScrollableBox extends Box {
  type = 'scrollable-box';

  constructor(options = {}) {
    super(options);

    if (options.scrollable === false) {
      return this;
    }

    this.scrollable = true;
    this.childOffset = 0;
    this.childBase = 0;
    this.baseLimit = options.baseLimit || Infinity;
    this.alwaysScroll = options.alwaysScroll;

    this.scrollbar = options.scrollbar;
    if (this.scrollbar) {
      this.scrollbar.ch = this.scrollbar.ch || ' ';
      this.style.scrollbar = this.style.scrollbar || this.scrollbar.style;
      if (!this.style.scrollbar) {
        this.style.scrollbar = {};
        this.style.scrollbar.fg = this.scrollbar.fg;
        this.style.scrollbar.bg = this.scrollbar.bg;
        this.style.scrollbar.bold = this.scrollbar.bold;
        this.style.scrollbar.underline = this.scrollbar.underline;
        this.style.scrollbar.inverse = this.scrollbar.inverse;
        this.style.scrollbar.invisible = this.scrollbar.invisible;
      }
      //this.scrollbar.style = this.style.scrollbar;
      if (this.track || this.scrollbar.track) {
        this.track = this.scrollbar.track || this.track;
        this.style.track = this.style.scrollbar.track || this.style.track;
        this.track.ch = this.track.ch || ' ';
        this.style.track = this.style.track || this.track.style;
        if (!this.style.track) {
          this.style.track = {};
          this.style.track.fg = this.track.fg;
          this.style.track.bg = this.track.bg;
          this.style.track.bold = this.track.bold;
          this.style.track.underline = this.track.underline;
          this.style.track.inverse = this.track.inverse;
          this.style.track.invisible = this.track.invisible;
        }
        this.track.style = this.style.track;
      }
      // Allow controlling of the scrollbar via the mouse:
      if (options.mouse) {
        this.on('mousedown', (data) => {
          if (this._scrollingBar) {
            // Do not allow dragging on the scrollbar:
            delete this.screen._dragging;
            delete this._drag;
            return;
          }
          const x = data.x - this.aleft;
          const y = data.y - this.atop;
          if (x === this.width - this.iright - 1) {
            // Do not allow dragging on the scrollbar:
            delete this.screen._dragging;
            delete this._drag;
            const perc = (y - this.itop) / (this.height - this.iheight);
            this.setScrollPerc(perc * 100 | 0);
            this.screen.render();
            let smd, smu;
            this._scrollingBar = true;
            this.onScreenEvent('mousedown', smd = (data) => {
              const y = data.y - this.atop;
              const perc = y / this.height;
              this.setScrollPerc(perc * 100 | 0);
              this.screen.render();
            });
            // If mouseup occurs out of the window, no mouseup event fires, and
            // scrollbar will drag again on mousedown until another mouseup
            // occurs.
            this.onScreenEvent('mouseup', smu = () => {
              this._scrollingBar = false;
              this.removeScreenEvent('mousedown', smd);
              this.removeScreenEvent('mouseup', smu);
            });
          }
        });
      }
    }

    if (options.mouse) {
      this.on('wheeldown', () => {
        this.scroll(this.height / 2 | 0 || 1);
        this.screen.render();
      });
      this.on('wheelup', () => {
        this.scroll(-(this.height / 2 | 0) || -1);
        this.screen.render();
      });
    }

    if (options.keys && !options.ignoreKeys) {
      this.on('keypress', (ch, key) => {
        if (key.name === 'up' || (options.vi && key.name === 'k')) {
          this.scroll(-1);
          this.screen.render();
          return;
        }
        if (key.name === 'down' || (options.vi && key.name === 'j')) {
          this.scroll(1);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'u' && key.ctrl) {
          this.scroll(-(this.height / 2 | 0) || -1);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'd' && key.ctrl) {
          this.scroll(this.height / 2 | 0 || 1);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'b' && key.ctrl) {
          this.scroll(-this.height || -1);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'f' && key.ctrl) {
          this.scroll(this.height || 1);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'g' && !key.shift) {
          this.scrollTo(0);
          this.screen.render();
          return;
        }
        if (options.vi && key.name === 'g' && key.shift) {
          this.scrollTo(this.getScrollHeight());
          this.screen.render();
          return;
        }
      });
    }

    this.on('parsed content', () => {
      this._recalculateIndex();
    });

    this._recalculateIndex();
  }

  get reallyScrollable() {
    if (this.shrink) return this.scrollable;
    return this.getScrollHeight() > this.height;
  }

  _scrollBottom() {
    if (!this.scrollable) return 0;

    // We could just calculate the children, but we can
    // optimize for lists by just returning the items.length.
    if (this._isList) {
      return this.items ? this.items.length : 0;
    }

    if (this.lpos && this.lpos._scrollBottom) {
      return this.lpos._scrollBottom;
    }

    const bottom = this.children.reduce((current, el) => {
      // el.height alone does not calculate the shrunken height, we need to use
      // getCoords. A shrunken box inside a scrollable element will not grow any
      // larger than the scrollable element's context regardless of how much
      // content is in the shrunken box, unless we do this (call getCoords
      // without the scrollable calculation):
      // See: $ node test/widget-shrink-fail-2.js
      if (!el.detached) {
        const lpos = el._getCoords(false, true);
        if (lpos) {
          return Math.max(current, el.rtop + (lpos.yl - lpos.yi));
        }
      }
      return Math.max(current, el.rtop + el.height);
    }, 0);

    // XXX Use this? Makes .getScrollHeight() useless!
    // if (bottom < this._clines.length) bottom = this._clines.length;

    if (this.lpos) this.lpos._scrollBottom = bottom;

    return bottom;
  }

  scrollTo(offset, always) {
    // XXX
    // At first, this appeared to account for the first new calculation of childBase:
    this.scroll(0);
    return this.scroll(offset - (this.childBase + this.childOffset), always);
  }

  get setScroll() {
    return this.scrollTo;
  }

  getScroll() {
    return this.childBase + this.childOffset;
  }

  scroll(offset, always) {
    if (!this.scrollable) return;

    if (this.detached) return;

    // Handle scrolling.
    let visible = this.height - this.iheight;
    const base = this.childBase;
    let d, p, t, b, max, emax;

    if (this.alwaysScroll || always) {
      // Semi-workaround
      this.childOffset = offset > 0
        ? visible - 1 + offset
        : offset;
    } else {
      this.childOffset += offset;
    }

    if (this.childOffset > visible - 1) {
      d = this.childOffset - (visible - 1);
      this.childOffset -= d;
      this.childBase += d;
    } else if (this.childOffset < 0) {
      d = this.childOffset;
      this.childOffset += -d;
      this.childBase += d;
    }

    if (this.childBase < 0) {
      this.childBase = 0;
    } else if (this.childBase > this.baseLimit) {
      this.childBase = this.baseLimit;
    }

    // Find max "bottom" value for
    // content and descendant elements.
    // Scroll the content if necessary.
    if (this.childBase === base) {
      return this.emit('scroll');
    }

    // When scrolling text, we want to be able to handle SGR codes as well as line
    // feeds. This allows us to take preformatted text output from other programs
    // and put it in a scrollable text box.
    this.parseContent();

    // XXX
    // max = this.getScrollHeight() - (this.height - this.iheight);

    max = this._clines.length - (this.height - this.iheight);
    if (max < 0) max = 0;
    emax = this._scrollBottom() - (this.height - this.iheight);
    if (emax < 0) emax = 0;

    this.childBase = Math.min(this.childBase, Math.max(emax, max));

    if (this.childBase < 0) {
      this.childBase = 0;
    } else if (this.childBase > this.baseLimit) {
      this.childBase = this.baseLimit;
    }

    // Optimize scrolling with CSR + IL/DL.
    p = this.lpos;
    // Only really need _getCoords() if we want
    // to allow nestable scrolling elements...
    // or if we **really** want shrinkable
    // scrolling elements.
    // p = this._getCoords();
    if (p && this.childBase !== base && this.screen.cleanSides(this)) {
      t = p.yi + this.itop;
      b = p.yl - this.ibottom - 1;
      d = this.childBase - base;

      if (d > 0 && d < visible) {
        // scrolled down
        this.screen.deleteLine(d, t, t, b);
      } else if (d < 0 && -d < visible) {
        // scrolled up
        d = -d;
        this.screen.insertLine(d, t, t, b);
      }
    }

    return this.emit('scroll');
  }

  _recalculateIndex() {
    let max, emax;

    if (this.detached || !this.scrollable) {
      return 0;
    }

    // XXX
    // max = this.getScrollHeight() - (this.height - this.iheight);

    max = this._clines.length - (this.height - this.iheight);
    if (max < 0) max = 0;
    emax = this._scrollBottom() - (this.height - this.iheight);
    if (emax < 0) emax = 0;

    this.childBase = Math.min(this.childBase, Math.max(emax, max));

    if (this.childBase < 0) {
      this.childBase = 0;
    } else if (this.childBase > this.baseLimit) {
      this.childBase = this.baseLimit;
    }
  }

  resetScroll() {
    if (!this.scrollable) return;
    this.childOffset = 0;
    this.childBase = 0;
    return this.emit('scroll');
  }

  getScrollHeight() {
    return Math.max(this._clines.length, this._scrollBottom());
  }

  getScrollPerc(s) {
    const pos = this.lpos || this._getCoords();
    if (!pos) return s ? -1 : 0;

    const height = (pos.yl - pos.yi) - this.iheight;
    const i = this.getScrollHeight();
    let p;

    if (height < i) {
      if (this.alwaysScroll) {
        p = this.childBase / (i - height);
      } else {
        p = (this.childBase + this.childOffset) / (i - 1);
      }
      return p * 100;
    }

    return s ? -1 : 0;
  }

  setScrollPerc(i) {
    // XXX
    // const m = this.getScrollHeight();
    const m = Math.max(this._clines.length, this._scrollBottom());
    return this.scrollTo((i / 100) * m | 0);
  }
}

/**
 * Expose
 */

module.exports = ScrollableBox;
