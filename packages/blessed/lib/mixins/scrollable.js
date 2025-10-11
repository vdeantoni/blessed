/**
 * scrollable.js - scrollable mixin for blessed elements
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Scrollable Mixin
 * Adds scrollable behavior to any element
 *
 * Note: This provides basic scrollable functionality. ScrollableBox may override
 * these methods with more sophisticated implementations.
 */

// Basic scroll method implementations for elements that aren't ScrollableBox subclasses
const scrollMethods = {
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
  },

  scrollTo(offset, always) {
    // XXX
    // At first, this appeared to account for the first new calculation of childBase:
    this.scroll(0);
    return this.scroll(offset - (this.childBase + this.childOffset), always);
  },

  setScroll(...args) {
    return this.scrollTo(...args);
  },

  getScroll() {
    return this.childBase + this.childOffset;
  },

  scroll(offset, always) {
    if (!this.scrollable) return;

    if (this.detached) return;

    // Handle scrolling.
    let visible = this.height - this.iheight;
    const base = this.childBase;
    let d, p, t, b, max, emax;

    if (this.alwaysScroll || always) {
      // Semi-workaround
      this.childOffset = offset > 0 ? visible - 1 + offset : offset;
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
  },

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
  },

  resetScroll() {
    if (!this.scrollable) return;
    this.childOffset = 0;
    this.childBase = 0;
    return this.emit('scroll');
  },

  getScrollHeight() {
    return Math.max(this._clines.length, this._scrollBottom());
  },

  getScrollPerc(s) {
    const pos = this.lpos || this._getCoords();
    if (!pos) return s ? -1 : 0;

    const height = pos.yl - pos.yi - this.iheight;
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
  },

  setScrollPerc(i) {
    // XXX
    // const m = this.getScrollHeight();
    const m = Math.max(this._clines.length, this._scrollBottom());
    return this.scrollTo(((i / 100) * m) | 0);
  },
};

/**
 * Make an element scrollable
 * @param {Element} element - The element to make scrollable
 * @param {Object} options - Scrollable options
 */
export function makeScrollable(element, options = {}) {
  if (options.scrollable === false) {
    return;
  }

  element.scrollable = true;
  element.childOffset = 0;
  element.childBase = 0;
  element.baseLimit = options.baseLimit || Infinity;
  element.alwaysScroll = options.alwaysScroll;

  element.scrollbar = options.scrollbar;
  if (element.scrollbar) {
    element.scrollbar.ch = element.scrollbar.ch || ' ';
    element.style.scrollbar =
      element.style.scrollbar || element.scrollbar.style;
    if (!element.style.scrollbar) {
      element.style.scrollbar = {};
      element.style.scrollbar.fg = element.scrollbar.fg;
      element.style.scrollbar.bg = element.scrollbar.bg;
      element.style.scrollbar.bold = element.scrollbar.bold;
      element.style.scrollbar.underline = element.scrollbar.underline;
      element.style.scrollbar.inverse = element.scrollbar.inverse;
      element.style.scrollbar.invisible = element.scrollbar.invisible;
    }
    //element.scrollbar.style = element.style.scrollbar;
    if (element.track || element.scrollbar.track) {
      element.track = element.scrollbar.track || element.track;
      element.style.track =
        element.style.scrollbar.track || element.style.track;
      element.track.ch = element.track.ch || ' ';
      element.style.track = element.style.track || element.track.style;
      if (!element.style.track) {
        element.style.track = {};
        element.style.track.fg = element.track.fg;
        element.style.track.bg = element.track.bg;
        element.style.track.bold = element.track.bold;
        element.style.track.underline = element.track.underline;
        element.style.track.inverse = element.track.inverse;
        element.style.track.invisible = element.track.invisible;
      }
      element.track.style = element.style.track;
    }
    // Allow controlling of the scrollbar via the mouse:
    if (options.mouse) {
      element.on('mousedown', data => {
        if (element._scrollingBar) {
          // Do not allow dragging on the scrollbar:
          delete element.screen._dragging;
          delete element._drag;
          return;
        }
        const x = data.x - element.aleft;
        const y = data.y - element.atop;
        if (x === element.width - element.iright - 1) {
          // Do not allow dragging on the scrollbar:
          delete element.screen._dragging;
          delete element._drag;
          const perc = (y - element.itop) / (element.height - element.iheight);
          element.setScrollPerc((perc * 100) | 0);
          element.screen.render();
          let smd, smu;
          element._scrollingBar = true;
          element.onScreenEvent(
            'mousedown',
            (smd = data => {
              const y = data.y - element.atop;
              const perc = y / element.height;
              element.setScrollPerc((perc * 100) | 0);
              element.screen.render();
            })
          );
          // If mouseup occurs out of the window, no mouseup event fires, and
          // scrollbar will drag again on mousedown until another mouseup
          // occurs.
          element.onScreenEvent(
            'mouseup',
            (smu = () => {
              element._scrollingBar = false;
              element.removeScreenEvent('mousedown', smd);
              element.removeScreenEvent('mouseup', smu);
            })
          );
        }
      });
    }
  }

  if (options.mouse) {
    element.on('wheeldown', () => {
      element.scroll((element.height / 2) | 0 || 1);
      element.screen.render();
    });
    element.on('wheelup', () => {
      element.scroll(-((element.height / 2) | 0) || -1);
      element.screen.render();
    });
  }

  if (options.keys && !options.ignoreKeys) {
    element.on('keypress', (ch, key) => {
      if (key.name === 'up' || (options.vi && key.name === 'k')) {
        element.scroll(-1);
        element.screen.render();
        return;
      }
      if (key.name === 'down' || (options.vi && key.name === 'j')) {
        element.scroll(1);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'u' && key.ctrl) {
        element.scroll(-((element.height / 2) | 0) || -1);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'd' && key.ctrl) {
        element.scroll((element.height / 2) | 0 || 1);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'b' && key.ctrl) {
        element.scroll(-element.height || -1);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'f' && key.ctrl) {
        element.scroll(element.height || 1);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'g' && !key.shift) {
        element.scrollTo(0);
        element.screen.render();
        return;
      }
      if (options.vi && key.name === 'g' && key.shift) {
        element.scrollTo(element.getScrollHeight());
        element.screen.render();
        return;
      }
    });
  }

  element.on('parsed content', () => {
    if (element._recalculateIndex) {
      element._recalculateIndex();
    }
  });

  // Mix in scroll methods if not already present (ScrollableBox provides its own)
  // Add to prototype if element has a constructor, otherwise to instance
  const target =
    element.constructor && element.constructor.prototype
      ? element.constructor.prototype
      : element;

  Object.keys(scrollMethods).forEach(method => {
    if (!target[method]) {
      target[method] = scrollMethods[method];
    }
  });

  // Add getter properties
  if (!Object.getOwnPropertyDescriptor(element, 'reallyScrollable')) {
    Object.defineProperty(element, 'reallyScrollable', {
      get() {
        if (this.shrink) return this.scrollable;
        return this.getScrollHeight() > this.height;
      },
      configurable: true,
    });
  }

  // Initialize scroll position
  if (element._recalculateIndex) {
    element._recalculateIndex();
  }
}

export default makeScrollable;
