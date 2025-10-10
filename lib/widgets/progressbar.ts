/**
 * progressbar.ts - progress bar element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Input from './input.js';

/**
 * ProgressBar
 */

class ProgressBar extends Input {
  type = 'progress-bar';
  filled: number;
  value: number;
  pch: string;
  orientation: string;

  constructor(options: any = {}) {
    super(options);

    let filled: number | string = options.filled || 0;
    if (typeof filled === 'string') {
      filled = +filled.slice(0, -1);
    }
    this.filled = filled;
    this.value = this.filled;

    this.pch = options.pch || ' ';

    // XXX Workaround that predates the usage of `el.ch`.
    if (options.ch) {
      this.pch = options.ch;
      this.ch = ' ';
    }
    if (options.bch) {
      this.ch = options.bch;
    }

    if (!this.style.bar) {
      this.style.bar = {};
      this.style.bar.fg = options.barFg;
      this.style.bar.bg = options.barBg;
    }

    this.orientation = options.orientation || 'horizontal';

    if (options.keys) {
      this.on('keypress', (ch: any, key: any) => {
        let back: string[], forward: string[];
        if (this.orientation === 'horizontal') {
          back = ['left', 'h'];
          forward = ['right', 'l'];
        } else if (this.orientation === 'vertical') {
          back = ['down', 'j'];
          forward = ['up', 'k'];
        }
        if (key.name === back[0] || (options.vi && key.name === back[1])) {
          this.progress(-5);
          this.screen.render();
          return;
        }
        if (key.name === forward[0] || (options.vi && key.name === forward[1])) {
          this.progress(5);
          this.screen.render();
          return;
        }
      });
    }

    if (options.mouse) {
      this.on('click', (data: any) => {
        let x: number, y: number, m: number, p: number;
        if (!this.lpos) return;
        if (this.orientation === 'horizontal') {
          x = data.x - this.lpos.xi;
          m = (this.lpos.xl - this.lpos.xi) - this.iwidth;
          p = x / m * 100 | 0;
        } else if (this.orientation === 'vertical') {
          y = data.y - this.lpos.yi;
          m = (this.lpos.yl - this.lpos.yi) - this.iheight;
          p = y / m * 100 | 0;
        }
        this.setProgress(p);
      });
    }
  }

  render(): any {
    const ret = super.render();
    if (!ret) return;

    let xi = ret.xi;
    let xl = ret.xl;
    let yi = ret.yi;
    let yl = ret.yl;
    let dattr: number;

    if (this.border) xi++, yi++, xl--, yl--;

    if (this.orientation === 'horizontal') {
      xl = xi + ((xl - xi) * (this.filled / 100)) | 0;
    } else if (this.orientation === 'vertical') {
      yi = yi + ((yl - yi) - (((yl - yi) * (this.filled / 100)) | 0));
    }

    dattr = this.sattr(this.style.bar);

    this.screen.fillRegion(dattr, this.pch, xi, xl, yi, yl);

    if (this.content) {
      const line = this.screen.lines[yi];
      for (let i = 0; i < this.content.length; i++) {
        line[xi + i][1] = this.content[i];
      }
      line.dirty = true;
    }

    return ret;
  }

  progress(filled: number): void {
    this.filled += filled;
    if (this.filled < 0) this.filled = 0;
    else if (this.filled > 100) this.filled = 100;
    if (this.filled === 100) {
      this.emit('complete');
    }
    this.value = this.filled;
  }

  setProgress(filled: number): void {
    this.filled = 0;
    this.progress(filled);
  }

  reset(): void {
    this.emit('reset');
    this.filled = 0;
    this.value = this.filled;
  }
}

/**
 * Expose
 */

export default ProgressBar;
export { ProgressBar };
