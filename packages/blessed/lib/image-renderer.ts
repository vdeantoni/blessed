/**
 * tng.ts - png/gif image renderer for terminals
 * Copyright (c) 2015, Christopher Jeffrey (MIT License).
 * https://github.com/chjj/tng
 *
 * Refactored to use pngjs and omggif libraries
 */

import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import { PNG } from 'pngjs';
import { GifReader } from 'omggif';
import type colors from '../lib/colors.ts';

const exec = cp.execFileSync;

interface ImageOptions {
  filename?: string;
  colors?: typeof colors;
  optimization?: 'mem' | 'cpu';
  speed?: number;
  width?: number;
  height?: number;
  scale?: number;
  ascii?: boolean;
  log?: (...args: any[]) => void;
  debug?: boolean;
}

interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

type Bitmap = Pixel[][];
type Cellmap = Pixel[][];

interface Frame {
  actl?: { numFrames: number; numPlays: number };
  fctl: {
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
    delayNum: number;
    delayDen: number;
    disposeOp: number;
    blendOp: number;
  };
  delay: number;
  bmp: Bitmap;
  cellmap?: Cellmap;
}

/**
 * ImageRenderer - Main class for rendering images to terminal
 */
class ImageRenderer {
  options: ImageOptions;
  colors: typeof colors;
  optimization: 'mem' | 'cpu';
  speed: number;
  file: string | null;
  format: string;
  width: number = 0;
  height: number = 0;
  bmp: Bitmap = [];
  cellmap: Cellmap = [];
  frames?: Frame[];
  actl?: { numFrames: number; numPlays: number };
  private _control?: (state: number) => void;
  private _curBmp: Bitmap | null = null;
  private _lastBmp: Bitmap | null = null;

  constructor(file: string | Buffer, options: ImageOptions = {}) {
    this.options = options;
    this.colors = options.colors!;
    this.optimization = options.optimization || 'mem';
    this.speed = options.speed || 1;

    let buf: Buffer;

    if (Buffer.isBuffer(file)) {
      this.file = options.filename || null;
      buf = file;
    } else {
      this.options.filename = file;
      this.file = path.resolve(process.cwd(), file);
      buf = fs.readFileSync(this.file);
    }

    // Detect format
    this.format = buf.readUInt32BE(0) === 0x89504e47 ? 'png'
      : buf.slice(0, 3).toString('ascii') === 'GIF' ? 'gif'
      : buf.readUInt16BE(0) === 0xffd8 ? 'jpg'
      : path.extname(this.file || '').slice(1).toLowerCase() || 'png';

    if (this.format !== 'png' && this.format !== 'gif') {
      this.convertToPNG(buf);
      return;
    }

    if (this.format === 'png') {
      this.parsePNG(buf);
    } else if (this.format === 'gif') {
      this.parseGIF(buf);
    }

    this.cellmap = this.createCellmap(this.bmp);
  }

  /**
   * Parse PNG using pngjs
   */
  private parsePNG(buf: Buffer): void {
    const png = PNG.sync.read(buf);

    this.width = png.width;
    this.height = png.height;

    // Convert raw pixel data to bitmap
    const pixels: Pixel[] = [];
    for (let i = 0; i < png.data.length; i += 4) {
      pixels.push({
        r: png.data[i],
        g: png.data[i + 1],
        b: png.data[i + 2],
        a: png.data[i + 3]
      });
    }

    // Convert to 2D bitmap
    this.bmp = [];
    for (let i = 0; i < pixels.length; i += this.width) {
      this.bmp.push(pixels.slice(i, i + this.width));
    }
  }

  /**
   * Parse GIF using omggif
   */
  private parseGIF(buf: Buffer): void {
    const reader = new GifReader(buf);

    this.width = reader.width;
    this.height = reader.height;

    const numFrames = reader.numFrames();

    if (numFrames > 1) {
      // Animated GIF
      this.frames = [];
      this.actl = { numFrames, numPlays: reader.loopCount() };

      for (let i = 0; i < numFrames; i++) {
        const frameInfo = reader.frameInfo(i);
        const pixels = new Uint8Array(this.width * this.height * 4);
        reader.decodeAndBlitFrameRGBA(i, pixels);

        const bmp = this.pixelArrayToBitmap(pixels, this.width, this.height);

        this.frames.push({
          fctl: {
            width: frameInfo.width,
            height: frameInfo.height,
            xOffset: frameInfo.x,
            yOffset: frameInfo.y,
            delayNum: frameInfo.delay || 10,
            delayDen: 100,
            disposeOp: frameInfo.disposal,
            blendOp: 0
          },
          delay: (frameInfo.delay || 10) * 10, // Convert to milliseconds
          bmp
        });
      }

      this.bmp = this.frames[0].bmp;
    } else {
      // Static GIF
      const pixels = new Uint8Array(this.width * this.height * 4);
      reader.decodeAndBlitFrameRGBA(0, pixels);
      this.bmp = this.pixelArrayToBitmap(pixels, this.width, this.height);
    }
  }

  /**
   * Convert pixel array to 2D bitmap
   */
  private pixelArrayToBitmap(pixels: Uint8Array, width: number, height: number): Bitmap {
    const bmp: Bitmap = [];
    let idx = 0;

    for (let y = 0; y < height; y++) {
      const line: Pixel[] = [];
      for (let x = 0; x < width; x++) {
        line.push({
          r: pixels[idx++],
          g: pixels[idx++],
          b: pixels[idx++],
          a: pixels[idx++]
        });
      }
      bmp.push(line);
    }

    return bmp;
  }

  /**
   * Convert non-PNG/GIF images using ImageMagick
   */
  private convertToPNG(input: Buffer): void {
    try {
      const buf = exec('convert', [this.format + ':-', 'png:-'],
        { stdio: ['pipe', 'pipe', 'ignore'], input });
      const img = new ImageRenderer(buf, this.options);
      Object.assign(this, img);
    } catch (e) {
      throw new Error(`Failed to convert ${this.format} to PNG`);
    }
  }

  /**
   * Create cellmap - scale bitmap to terminal cell grid
   */
  createCellmap(bmp?: Bitmap, options?: ImageOptions): Cellmap {
    bmp = bmp || this.bmp;
    options = options || this.options;

    const cellmap: Cellmap = [];
    let scale = options.scale || 0.20;
    const height = bmp.length;
    const width = bmp[0].length;
    let cmwidth = options.width;
    let cmheight = options.height;

    if (cmwidth) {
      scale = cmwidth / width;
    } else if (cmheight) {
      scale = cmheight / height;
    }

    if (!cmheight) {
      cmheight = Math.round(height * scale);
    }

    if (!cmwidth) {
      cmwidth = Math.round(width * scale);
    }

    const ys = height / cmheight;
    const xs = width / cmwidth;

    for (let y = 0; y < bmp.length; y += ys) {
      const line: Pixel[] = [];
      const yy = Math.round(y);
      if (!bmp[yy]) break;

      for (let x = 0; x < bmp[yy].length; x += xs) {
        const xx = Math.round(x);
        if (!bmp[yy][xx]) break;
        line.push(bmp[yy][xx]);
      }
      cellmap.push(line);
    }

    return cellmap;
  }

  /**
   * Render to ANSI SGR codes
   */
  renderANSI(bmp: Bitmap): string {
    let out = '';

    bmp.forEach((line, y) => {
      line.forEach((pixel, x) => {
        const outch = this.getOutch(x, y, line, pixel);
        out += this.pixelToSGR(pixel, outch);
      });
      out += '\n';
    });

    return out;
  }

  /**
   * Render to blessed element (sets content)
   */
  renderContent(bmp: Bitmap, el: any): string {
    let out = '';

    bmp.forEach((line, y) => {
      line.forEach((pixel, x) => {
        const outch = this.getOutch(x, y, line, pixel);
        out += this.pixelToTags(pixel, outch);
      });
      out += '\n';
    });

    el.setContent(out);
    return out;
  }

  /**
   * Render directly to screen buffer
   */
  renderScreen(bmp: Bitmap, screen: any, xi: number, xl: number, yi: number, yl: number): void {
    const lines = screen.lines;

    const cellLines = bmp.reduce<any[]>((cellLines, line, y) => {
      const cellLine: any[] = [];
      line.forEach((pixel, x) => {
        const outch = this.getOutch(x, y, line, pixel);
        const cell = this.pixelToCell(pixel, outch);
        cellLine.push(cell);
      });
      cellLines.push(cellLine);
      return cellLines;
    }, []);

    for (let y = yi; y < yl; y++) {
      const yy = y - yi;
      for (let x = xi; x < xl; x++) {
        const xx = x - xi;
        if (lines[y] && lines[y][x] && cellLines[yy] && cellLines[yy][xx]) {
          const alpha = cellLines[yy][xx].pop();

          // Completely transparent
          if (alpha === 0.0) {
            continue;
          }

          // Translucency / blending
          if (alpha < 1.0) {
            const attr = cellLines[yy][xx][0];
            const ch = cellLines[yy][xx][1];
            lines[y][x][0] = this.colors.blend(lines[y][x][0], attr, alpha);
            if (ch !== ' ') lines[y][x][1] = ch;
            lines[y].dirty = true;
            continue;
          }

          // Completely opaque
          lines[y][x] = cellLines[yy][xx];
          lines[y].dirty = true;
        }
      }
    }
  }

  /**
   * Render to blessed element (direct screen rendering)
   */
  renderElement(bmp: Bitmap, el: any): void {
    const xi = el.aleft + el.ileft;
    const xl = el.aleft + el.width - el.iright;
    const yi = el.atop + el.itop;
    const yl = el.atop + el.height - el.ibottom;

    this.renderScreen(bmp, el.screen, xi, xl, yi, yl);
  }

  /**
   * Convert pixel to ANSI SGR escape codes
   */
  pixelToSGR(pixel: Pixel, ch?: string): string {
    const bga = 1.0;
    const fga = 0.5;
    const a = pixel.a / 255;

    const bg = this.colors.match(
      pixel.r * a * bga | 0,
      pixel.g * a * bga | 0,
      pixel.b * a * bga | 0
    );

    if (ch && this.options.ascii) {
      const fg = this.colors.match(
        pixel.r * a * fga | 0,
        pixel.g * a * fga | 0,
        pixel.b * a * fga | 0
      );
      if (a === 0) {
        return `\x1b[38;5;${fg}m${ch}\x1b[m`;
      }
      return `\x1b[38;5;${fg}m\x1b[48;5;${bg}m${ch}\x1b[m`;
    }

    if (a === 0) return ' ';
    return `\x1b[48;5;${bg}m \x1b[m`;
  }

  /**
   * Convert pixel to blessed tags
   */
  pixelToTags(pixel: Pixel, ch?: string): string {
    const bga = 1.0;
    const fga = 0.5;
    const a = pixel.a / 255;

    const bg = this.colors.RGBToHex(
      pixel.r * a * bga | 0,
      pixel.g * a * bga | 0,
      pixel.b * a * bga | 0
    );

    if (ch && this.options.ascii) {
      const fg = this.colors.RGBToHex(
        pixel.r * a * fga | 0,
        pixel.g * a * fga | 0,
        pixel.b * a * fga | 0
      );
      if (a === 0) {
        return `{${fg}-fg}${ch}{/}`;
      }
      return `{${fg}-fg}{${bg}-bg}${ch}{/}`;
    }

    if (a === 0) return ' ';
    return `{${bg}-bg} {/${bg}-bg}`;
  }

  /**
   * Convert pixel to terminal cell [attr, char, alpha]
   */
  pixelToCell(pixel: Pixel, ch?: string): [number, string, number] {
    const bga = 1.0;
    const fga = 0.5;
    const a = pixel.a / 255;

    const bg = this.colors.match(
      pixel.r * bga | 0,
      pixel.g * bga | 0,
      pixel.b * bga | 0
    );

    let fg: number;
    if (ch && this.options.ascii) {
      fg = this.colors.match(
        pixel.r * fga | 0,
        pixel.g * fga | 0,
        pixel.b * fga | 0
      );
    } else {
      fg = 0x1ff;
      ch = undefined;
    }

    return [(0 << 18) | (fg << 9) | (bg << 0), ch || ' ', a];
  }

  /**
   * Get ASCII art character based on luminance (from libcaca)
   */
  getOutch(x: number, y: number, line: Pixel[], pixel: Pixel): string {
    const dchars = '????8@8@#8@8##8#MKXWwz$&%x><\\/xo;+=|^-:i\'.`,  `.        ';

    const a = pixel.a / 255;
    const r = pixel.r * a;
    const g = pixel.g * a;
    const b = pixel.b * a;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const lumi = l / 255;

    const outch = dchars[lumi * (dchars.length - 1) | 0];
    return outch;
  }

  /**
   * Animation methods
   */
  play(callback?: (bmp: Bitmap, cellmap?: Cellmap) => void): void {
    if (!this._control || callback) {
      this.stop();
      this._animate(callback);
      return;
    }
    this._control(1);
  }

  pause(): void {
    if (!this._control) return;
    this._control(0);
  }

  stop(): void {
    if (!this._control) return;
    this._control(-1);
  }

  /**
   * Internal animation loop
   */
  private _animate(callback?: (bmp?: Bitmap, cellmap?: Cellmap) => void): void {
    if (!this.frames) {
      if (callback) callback(this.bmp, this.cellmap);
      return;
    }

    const numPlays = this.actl?.numPlays || Infinity;
    let running = 0;
    let i = -1;
    let playsLeft = numPlays;

    this._curBmp = null;
    this._lastBmp = null;

    const next = (): void => {
      if (!running) return;

      const frame = this.frames![++i];
      if (!frame) {
        if (!--playsLeft) {
          if (callback) callback();
          return;
        }
        i = -1;
        this._curBmp = null;
        this._lastBmp = null;
        setImmediate(next);
        return;
      }

      if (this.optimization === 'mem') {
        const renderBmp = this.renderFrame(frame.bmp, frame, i);
        const cellmap = this.createCellmap(renderBmp);
        if (callback) callback(renderBmp, cellmap);
      } else {
        if (callback) callback(frame.bmp, frame.cellmap);
      }

      setTimeout(next, frame.delay / this.speed | 0);
    };

    this._control = (state: number) => {
      if (state === -1) {
        i = -1;
        this._curBmp = null;
        this._lastBmp = null;
        running = 0;
        const firstFrame = this.frames![0];
        if (callback) {
          callback(
            firstFrame.bmp,
            firstFrame.cellmap || this.createCellmap(firstFrame.bmp)
          );
        }
        return;
      }
      if (state === running) return;
      running = state;
      next();
    };

    this._control(1);
  }

  /**
   * Render individual animation frame (handles disposal and blending)
   */
  private renderFrame(bmp: Bitmap, frame: Frame, i: number): Bitmap {
    const first = this.frames![0];
    const last = this.frames![i - 1];
    const fc = frame.fctl;
    const xo = fc.xOffset;
    const yo = fc.yOffset;

    if (!this._curBmp) {
      this._curBmp = [];
      for (let y = 0; y < first.fctl.height; y++) {
        const line: Pixel[] = [];
        for (let x = 0; x < first.fctl.width; x++) {
          const p = bmp[y][x];
          line.push({ r: p.r, g: p.g, b: p.b, a: p.a });
        }
        this._curBmp.push(line);
      }
    }

    // Handle disposal of previous frame
    if (last && last.fctl.disposeOp !== 0) {
      const lxo = last.fctl.xOffset;
      const lyo = last.fctl.yOffset;

      for (let y = 0; y < last.fctl.height; y++) {
        for (let x = 0; x < last.fctl.width; x++) {
          if (last.fctl.disposeOp === 1) {
            // Background / clear
            this._curBmp[lyo + y][lxo + x] = { r: 0, g: 0, b: 0, a: 0 };
          } else if (last.fctl.disposeOp === 2 && this._lastBmp) {
            // Previous / restore
            const p = this._lastBmp[y][x];
            this._curBmp[lyo + y][lxo + x] = { r: p.r, g: p.g, b: p.b, a: p.a };
          }
        }
      }
    }

    // Save current frame if disposal is "restore to previous"
    if (frame.fctl.disposeOp === 2) {
      this._lastBmp = [];
      for (let y = 0; y < frame.fctl.height; y++) {
        const line: Pixel[] = [];
        for (let x = 0; x < frame.fctl.width; x++) {
          const p = this._curBmp[yo + y][xo + x];
          line.push({ r: p.r, g: p.g, b: p.b, a: p.a });
        }
        this._lastBmp.push(line);
      }
    } else {
      this._lastBmp = null;
    }

    // Blend current frame
    for (let y = 0; y < frame.fctl.height; y++) {
      for (let x = 0; x < frame.fctl.width; x++) {
        const p = bmp[y][x];
        if (fc.blendOp === 0) {
          // Source
          this._curBmp[yo + y][xo + x] = { r: p.r, g: p.g, b: p.b, a: p.a };
        } else if (fc.blendOp === 1) {
          // Over
          if (p.a !== 0) {
            this._curBmp[yo + y][xo + x] = { r: p.r, g: p.g, b: p.b, a: p.a };
          }
        }
      }
    }

    return this._curBmp;
  }

  /**
   * Debug logging
   */
  private _debug(...args: any[]): void {
    if (!this.options.log) return;
    this.options.log(...args);
  }
}

/**
 * Exports
 */
export default function tng(file: string | Buffer, options?: ImageOptions): ImageRenderer {
  return new ImageRenderer(file, options);
}

export { ImageRenderer, tng };
