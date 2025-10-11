/**
 * listtable.ts - list table element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import type { ListTableOptions } from '../types/options.js';
import Box from './box.js';
import List from './list.js';
import Table from './table.js';

/**
 * ListTable
 */

class ListTable extends List {
  type = 'list-table';
  __align: string;
  _header: any;
  pad: number;
  rows: any[];
  _maxes: any;

  constructor(options: ListTableOptions = {}) {
    // options.shrink = true;
    options.normalShrink = true;
    options.style = options.style || {};
    options.style.border = options.style.border || {};
    options.style.header = options.style.header || {};
    options.style.cell = options.style.cell || {};
    const align = options.align || 'center';
    delete options.align;

    options.style.selected = options.style.cell.selected;
    options.style.item = options.style.cell;

    const border = options.border;
    if (border
        && border.top === false
        && border.bottom === false
        && border.left === false
        && border.right === false) {
      delete options.border;
    }

    super(options);

    this.__align = align;
    options.border = border;

    this._header = new Box({
      parent: this,
      left: this.screen.autoPadding ? 0 : this.ileft,
      top: 0,
      width: 'shrink',
      height: 1,
      style: options.style.header,
      tags: options.parseTags || options.tags
    });

    this.on('scroll', () => {
      this._header.setFront();
      this._header.rtop = this.childBase;
      if (!this.screen.autoPadding) {
        this._header.rtop = this.childBase + (this.border ? 1 : 0);
      }
    });

    this.pad = options.pad != null
      ? options.pad
      : 2;

    this.setData(options.rows || options.data);

    this.on('attach', () => {
      this.setData(this.rows);
    });

    this.on('resize', () => {
      const selected = this.selected;
      this.setData(this.rows);
      this.select(selected);
      this.screen.render();
    });
  }

  _calculateMaxes() {
    return Table.prototype._calculateMaxes.call(this);
  }

  setRows(rows: any) {
    return this.setData(rows);
  }

  setData(rows: any) {
    const align = this.__align;
    const selected = this.selected;
    const original = this.items.slice();
    let sel = this.ritems[this.selected];

    if (this.visible && this.lpos) {
      this.clearPos();
    }

    this.clearItems();

    this.rows = rows || [];

    this._calculateMaxes();

    if (!this._maxes) return;

    this.addItem('');

    this.rows.forEach((row: any, i: number) => {
      const isHeader = i === 0;
      let text = '';
      row.forEach((cell: any, i: number) => {
        const width = this._maxes[i];
        let clen = this.strWidth(cell);

        if (i !== 0) {
          text += ' ';
        }

        while (clen < width) {
          if (align === 'center') {
            cell = ' ' + cell + ' ';
            clen += 2;
          } else if (align === 'left') {
            cell = cell + ' ';
            clen += 1;
          } else if (align === 'right') {
            cell = ' ' + cell;
            clen += 1;
          }
        }

        if (clen > width) {
          if (align === 'center') {
            cell = cell.substring(1);
            clen--;
          } else if (align === 'left') {
            cell = cell.slice(0, -1);
            clen--;
          } else if (align === 'right') {
            cell = cell.substring(1);
            clen--;
          }
        }

        text += cell;
      });
      if (isHeader) {
        this._header.setContent(text);
      } else {
        this.addItem(text);
      }
    });

    this._header.setFront();

    // Try to find our old item if it still exists.
    sel = this.ritems.indexOf(sel);
    if (~sel) {
      this.select(sel);
    } else if (this.items.length === original.length) {
      this.select(selected);
    } else {
      this.select(Math.min(selected, this.items.length - 1));
    }
  }

  _select(i: number) {
    return super.select(i);
  }

  select(i: number) {
    if (i === 0) {
      i = 1;
    }
    if (i <= this.childBase) {
      this.setScroll(this.childBase - 1);
    }
    return this._select(i);
  }

  render() {
    const coords = super.render();
    if (!coords) return;

    this._calculateMaxes();

    if (!this._maxes) return coords;

    const lines = this.screen.lines;
    const xi = coords.xi;
    const yi = coords.yi;
    let rx: number, ry: number, i: number;

    const battr = this.sattr(this.style.border);

    const height = coords.yl - coords.yi - this.ibottom;

    let border = this.border;
    if (!this.border && this.options.border) {
      border = this.options.border;
    }

    if (!border || this.options.noCellBorders) return coords;

    // Draw border with correct angles.
    ry = 0;
    for (i = 0; i < height + 1; i++) {
      if (!lines[yi + ry]) break;
      rx = 0;
      this._maxes.slice(0, -1).forEach((max: number) => {
        rx += max;
        if (!lines[yi + ry][xi + rx + 1]) return;
        // center
        if (ry === 0) {
          // top
          rx++;
          lines[yi + ry][xi + rx][0] = battr;
          lines[yi + ry][xi + rx][1] = '\u252c'; // '┬'
          // XXX If we alter iheight and itop for no borders - nothing should be written here
          if (!border.top) {
            lines[yi + ry][xi + rx][1] = '\u2502'; // '│'
          }
          lines[yi + ry].dirty = true;
        } else if (ry === height) {
          // bottom
          rx++;
          lines[yi + ry][xi + rx][0] = battr;
          lines[yi + ry][xi + rx][1] = '\u2534'; // '┴'
          // XXX If we alter iheight and ibottom for no borders - nothing should be written here
          if (!border.bottom) {
            lines[yi + ry][xi + rx][1] = '\u2502'; // '│'
          }
          lines[yi + ry].dirty = true;
        } else {
          // middle
          rx++;
        }
      });
      ry += 1;
    }

    // Draw internal borders.
    for (ry = 1; ry < height; ry++) {
      if (!lines[yi + ry]) break;
      rx = 0;
      this._maxes.slice(0, -1).forEach((max: number) => {
        rx += max;
        if (!lines[yi + ry][xi + rx + 1]) return;
        if (this.options.fillCellBorders !== false) {
          const lbg = lines[yi + ry][xi + rx][0] & 0x1ff;
          rx++;
          lines[yi + ry][xi + rx][0] = (battr & ~0x1ff) | lbg;
        } else {
          rx++;
          lines[yi + ry][xi + rx][0] = battr;
        }
        lines[yi + ry][xi + rx][1] = '\u2502'; // '│'
        lines[yi + ry].dirty = true;
      });
    }

    return coords;
  }
}

/**
 * Expose
 */

export default ListTable;
export { ListTable };
