/**
 * table.ts - table element for blessed
 */

/**
 * Modules
 */

import type { StyleListTable, TableOptions } from '../types';
import Box from './box.js';

/**
 * Table
 */

class Table extends Box {
  type = 'table';
  declare style: StyleListTable;
  pad: number;
  rows: any[][] = []; // Initialize to empty array
  _maxes!: number[]; // Set by _calculateMaxes() method

  constructor(options: TableOptions = {}) {
    options.shrink = true;
    options.style = options.style || {};
    options.style.border = options.style.border || {};
    options.style.header = options.style.header || {};
    options.style.cell = options.style.cell || {};
    options.align = options.align || 'center';

    // Regular tables do not get custom height (this would
    // require extra padding). Maybe add in the future.
    delete options.height;

    super(options);

    this.pad = options.pad != null
      ? options.pad
      : 2;

    this.setData(options.rows || options.data || []);

    this.on('attach', () => {
      this.setContent('');
      this.setData(this.rows);
    });

    this.on('resize', () => {
      this.setContent('');
      this.setData(this.rows);
      this.screen.render();
    });
  }

  _calculateMaxes(): number[] | undefined {
    const maxes: number[] = [];

    if (this.detached) return undefined;

    this.rows = this.rows || [];

    this.rows.forEach((row) => {
      row.forEach((cell, i) => {
        const clen = this.strWidth(cell);
        if (!maxes[i] || maxes[i] < clen) {
          maxes[i] = clen;
        }
      });
    });

    let total = maxes.reduce((total, max) => {
      return total + max;
    }, 0);
    total += maxes.length + 1;

    // XXX There might be an issue with resizing where on the first resize event
    // width appears to be less than total if it's a percentage or left/right
    // combination.
    if (this.width < total) {
      delete this.position.width;
    }

    if (this.position.width != null) {
      const missing = this.width - total;
      const w = missing / maxes.length | 0;
      const wr = missing % maxes.length;
      return this._maxes = maxes.map((max, i) => {
        if (i === maxes.length - 1) {
          return max + w + wr;
        }
        return max + w;
      });
    } else {
      return this._maxes = maxes.map((max) => {
        return max + this.pad;
      });
    }
  }

  /**
   * Set the rows in the table.
   * Replaces all existing rows with the provided data.
   * Each row is an array of cell strings.
   *
   * @param rows - Array of row arrays (each row is an array of cell strings)
   * @example
   * table.setData([
   *   ['Name', 'Age', 'City'],
   *   ['Alice', '30', 'NYC'],
   *   ['Bob', '25', 'SF']
   * ]);
   */
  setData(rows: any[][]): void {
    let text = '';
    const align = this.align;

    this.rows = rows || [];

    this._calculateMaxes();

    if (!this._maxes) return;

    this.rows.forEach((row, i) => {
      const isFooter = i === this.rows.length - 1;
      row.forEach((cell, i) => {
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
      if (!isFooter) {
        text += '\n\n';
      }
    });

    // Temporarily remove align to let setContent handle default alignment
    const savedAlign: any = this.align;
    (this as any).align = undefined;
    this.setContent(text);
    this.align = savedAlign;
  }

  /**
   * Set the rows in the table (alias for setData).
   * Replaces all existing rows with the provided data.
   *
   * @example
   * table.setRows([
   *   ['Header 1', 'Header 2'],
   *   ['Cell 1', 'Cell 2']
   * ]);
   */
  get setRows(): (rows: any[][]) => void {
    return this.setData;
  }

  render(): any {
    const coords = super.render();
    if (!coords) return;

    this._calculateMaxes();

    if (!this._maxes) return coords;

    const lines = this.screen.lines;
    const xi = coords.xi;
    const yi = coords.yi;
    let rx: number, ry: number, i: number;

    const dattr = this.sattr(this.style);
    const hattr = this.sattr(this.style.header);
    const cattr = this.sattr(this.style.cell);
    const battr = this.sattr(this.style.border);

    const width = coords.xl - coords.xi - this.iright;
    const height = coords.yl - coords.yi - this.ibottom;

    // Apply attributes to header cells and cells.
    for (let y = this.itop; y < height; y++) {
      if (!lines[yi + y]) break;
      for (let x = this.ileft; x < width; x++) {
        if (!lines[yi + y][xi + x]) break;
        // Check to see if it's not the default attr. Allows for tags:
        if (lines[yi + y][xi + x][0] !== dattr) continue;
        if (y === this.itop) {
          lines[yi + y][xi + x][0] = hattr;
        } else {
          lines[yi + y][xi + x][0] = cattr;
        }
        lines[yi + y].dirty = true;
      }
    }

    if (!this.border || (this.options as any).noCellBorders) return coords;

    // Draw border with correct angles.
    const border = this.border; // Type narrowing: border is now definitely defined
    ry = 0;
    for (i = 0; i < this.rows.length + 1; i++) {
      if (!lines[yi + ry]) break;
      rx = 0;
      this._maxes.forEach((max, i) => {
        rx += max;
        if (i === 0) {
          if (!lines[yi + ry][xi + 0]) return;
          // left side
          if (ry === 0) {
            // top
            lines[yi + ry][xi + 0][0] = battr;
            // lines[yi + ry][xi + 0][1] = '\u250c'; // '┌'
          } else if (ry / 2 === this.rows.length) {
            // bottom
            lines[yi + ry][xi + 0][0] = battr;
            // lines[yi + ry][xi + 0][1] = '\u2514'; // '└'
          } else {
            // middle
            lines[yi + ry][xi + 0][0] = battr;
            lines[yi + ry][xi + 0][1] = '\u251c'; // '├'
            // XXX If we alter iwidth and ileft for no borders - nothing should be written here
            if (!border.left) {
              lines[yi + ry][xi + 0][1] = '\u2500'; // '─'
            }
          }
          lines[yi + ry].dirty = true;
        } else if (i === this._maxes.length - 1) {
          if (!lines[yi + ry][xi + rx + 1]) return;
          // right side
          if (ry === 0) {
            // top
            rx++;
            lines[yi + ry][xi + rx][0] = battr;
            // lines[yi + ry][xi + rx][1] = '\u2510'; // '┐'
          } else if (ry / 2 === this.rows.length) {
            // bottom
            rx++;
            lines[yi + ry][xi + rx][0] = battr;
            // lines[yi + ry][xi + rx][1] = '\u2518'; // '┘'
          } else {
            // middle
            rx++;
            lines[yi + ry][xi + rx][0] = battr;
            lines[yi + ry][xi + rx][1] = '\u2524'; // '┤'
            // XXX If we alter iwidth and iright for no borders - nothing should be written here
            if (!border.right) {
              lines[yi + ry][xi + rx][1] = '\u2500'; // '─'
            }
          }
          lines[yi + ry].dirty = true;
          return;
        }
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
        } else if (ry / 2 === this.rows.length) {
          // bottom
          rx++;
          lines[yi + ry][xi + rx][0] = battr;
          lines[yi + ry][xi + rx][1] = '\u2534'; // '┴'
          // XXX If we alter iheight and ibottom for no borders - nothing should be written here
          if (!border.bottom) {
            lines[yi + ry][xi + rx][1] = '\u2502'; // '│'
          }
        } else {
          // middle
          if ((this.options as any).fillCellBorders) {
            const lbg = (ry <= 2 ? hattr : cattr) & 0x1ff;
            rx++;
            lines[yi + ry][xi + rx][0] = (battr & ~0x1ff) | lbg;
          } else {
            rx++;
            lines[yi + ry][xi + rx][0] = battr;
          }
          lines[yi + ry][xi + rx][1] = '\u253c'; // '┼'
          // rx++;
        }
        lines[yi + ry].dirty = true;
      });
      ry += 2;
    }

    // Draw internal borders.
    for (ry = 1; ry < this.rows.length * 2; ry++) {
      if (!lines[yi + ry]) break;
      rx = 0;
      this._maxes.slice(0, -1).forEach((max) => {
        rx += max;
        if (!lines[yi + ry][xi + rx + 1]) return;
        if (ry % 2 !== 0) {
          if ((this.options as any).fillCellBorders) {
            const lbg = (ry <= 2 ? hattr : cattr) & 0x1ff;
            rx++;
            lines[yi + ry][xi + rx][0] = (battr & ~0x1ff) | lbg;
          } else {
            rx++;
            lines[yi + ry][xi + rx][0] = battr;
          }
          lines[yi + ry][xi + rx][1] = '\u2502'; // '│'
          lines[yi + ry].dirty = true;
        } else {
          rx++;
        }
      });
      rx = 1;
      this._maxes.forEach((max) => {
        while (max--) {
          if (ry % 2 === 0) {
            if (!lines[yi + ry]) break;
            if (!lines[yi + ry][xi + rx + 1]) break;
            if ((this.options as any).fillCellBorders) {
              const lbg = (ry <= 2 ? hattr : cattr) & 0x1ff;
              lines[yi + ry][xi + rx][0] = (battr & ~0x1ff) | lbg;
            } else {
              lines[yi + ry][xi + rx][0] = battr;
            }
            lines[yi + ry][xi + rx][1] = '\u2500'; // '─'
            lines[yi + ry].dirty = true;
          }
          rx++;
        }
        rx++;
      });
    }

    return coords;
  }
}

/**
 * Expose
 */

export default Table;
export { Table };
