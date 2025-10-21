/**
 * bigtext.js - bigtext element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Box from './box.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * BigText
 */

class BigText extends Box {
  type = 'bigtext';

  constructor(options = {}) {
    options.font = options.font
      || __dirname + '/../../usr/fonts/ter-u14n.json';
    options.fontBold = options.font
      || __dirname + '/../../usr/fonts/ter-u14b.json';

    super(options);

    this.fch = options.fch;
    this.ratio = {};
    this.font = this.loadFont(options.font);
    this.fontBold = this.loadFont(options.font);

    if (this.style.bold) {
      this.font = this.fontBold;
    }
  }

    loadFont(filename) {
        let data;
        let font;

        data = JSON.parse(fs.readFileSync(filename, 'utf8'));

        this.ratio.width = data.width;
        this.ratio.height = data.height;

        const convertLetter = (ch, lines) => {
            let line, i;

            while (lines.length > this.ratio.height) {
                lines.shift();
                lines.pop();
            }

            lines = lines.map((line) => {
                let chs = line.split('');
                chs = chs.map((ch) => {
                    return ch === ' ' ? 0 : 1;
                });
                while (chs.length < this.ratio.width) {
                    chs.push(0);
                }
                return chs;
            });

            while (lines.length < this.ratio.height) {
                line = [];
                for (i = 0; i < this.ratio.width; i++) {
                    line.push(0);
                }
                lines.push(line);
            }

            return lines;
        }

        font = Object.keys(data.glyphs).reduce((out, ch) => {
            const lines = data.glyphs[ch].map;
            out[ch] = convertLetter(ch, lines);
            return out;
        }, {});

        delete font[' '];

        return font;
    }

    setContent(content) {
        this.content = '';
        this.text = content || '';
    };

    render() {
        if (this.position.width == null || this._shrinkWidth) {
            // if (this.width - this.iwidth < this.ratio.width * this.text.length + 1) {
            this.position.width = this.ratio.width * this.text.length + 1;
            this._shrinkWidth = true;
            // }
        }
        if (this.position.height == null || this._shrinkHeight) {
            // if (this.height - this.iheight < this.ratio.height + 0) {
            this.position.height = this.ratio.height + 0;
            this._shrinkHeight = true;
            // }
        }

        const coords = super.render();
        if (!coords) return;

        const lines = this.screen.lines;
        const left = coords.xi + this.ileft;
        const top = coords.yi + this.itop;
        const right = coords.xl - this.iright;
        const bottom = coords.yl - this.ibottom;

        const dattr = this.sattr(this.style);
        const bg = dattr & 0x1ff;
        const fg = (dattr >> 9) & 0x1ff;
        const flags = (dattr >> 18) & 0x1ff;
        const attr = (flags << 18) | (bg << 9) | fg;

        for (let x = left, i = 0; x < right; x += this.ratio.width, i++) {
            const ch = this.text[i];
            if (!ch) break;
            const map = this.font[ch];
            if (!map) continue;
            for (let y = top; y < Math.min(bottom, top + this.ratio.height); y++) {
                if (!lines[y]) continue;
                const mline = map[y - top];
                if (!mline) continue;
                for (let mx = 0; mx < this.ratio.width; mx++) {
                    const mcell = mline[mx];
                    if (mcell == null) break;
                    if (this.fch && this.fch !== ' ') {
                        lines[y][x + mx][0] = dattr;
                        lines[y][x + mx][1] = mcell === 1 ? this.fch : this.ch;
                    } else {
                        lines[y][x + mx][0] = mcell === 1 ? attr : dattr;
                        lines[y][x + mx][1] = mcell === 1 ? ' ' : this.ch;
                    }
                }
                lines[y].dirty = true;
            }
        }

        return coords;
    };
};


/**
 * Expose
 */

export default BigText;
export { BigText };

