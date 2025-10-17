/**
 * ansiimage.ts - render PNGS/GIFS as ANSI
 */

/**
 * Modules
 */

import type { ANSIImageOptions } from '../types';
import { getRuntime } from '../runtime-context.js';
import colors from '../lib/colors.js';
import Box from './box.js';
import tng from '../lib/image-renderer.js';

/**
 * ANSIImage
 */

class ANSIImage extends Box {
  override type = 'ansiimage';
  declare options: ANSIImageOptions; // Type refinement - initialized by parent
  scale: number;
  override _noFill: boolean;
  file?: string;
  /**
   * Image object from the PNG reader.
   * Contains the parsed image data and animation frames if applicable.
   */
  img?: any;
  cellmap?: any;
  static curl: (url: string) => any;

  constructor(options: ANSIImageOptions = {}) {
    options.shrink = true;

    super(options);

    this.scale = this.options.scale || 1.0;
    this.options.animate = this.options.animate !== false;
    this._noFill = true;

    if (this.options.file) {
      this.setImage(this.options.file);
    }

    this.screen.on('prerender', () => {
      const lpos = this.lpos;
      if (!lpos) return;
      // prevent image from blending with itself if there are alpha channels
      this.screen.clearRegion(lpos.xi, lpos.xl, lpos.yi, lpos.yl);
    });

    this.on('destroy', () => {
      this.stop();
    });
  }

    /**
   * Set the image in the box to a new path.
   * Supports local file paths and HTTP(S) URLs.
   * @param file - Path to the image file or URL
   */
    setImage(file: any): void {
        this.file = typeof file === 'string' ? file : undefined;

        if (/^https?:/.test(file)) {
            file = ANSIImage.curl(file);
        }

        var width = this.position.width;
        var height = this.position.height;

        if (width != null) {
            width = this.width;
        }

        if (height != null) {
            height = this.height;
        }

        try {
            this.setContent('');

            this.img = tng(file, {
                colors: colors,
                width: width,
                height: height,
                scale: this.scale,
                ascii: this.options.ascii,
                speed: this.options.speed,
                filename: this.file
            });

            if (width == null || height == null) {
                this.width = this.img.cellmap[0].length;
                this.height = this.img.cellmap.length;
            }

            if (this.img.frames && this.options.animate) {
                this.play();
            } else {
                this.cellmap = this.img.cellmap;
            }
        } catch (e: any) {
            this.setContent('Image Error: ' + e.message);
            this.img = null;
            this.cellmap = null;
        }
    };

    /**
   * Play animation if it has been paused or stopped.
   * Only works for animated GIFs.
   * @returns Animation handle
   */
    play(): any {
        if (!this.img) return;
        return this.img.play((_bmp: any, cellmap: any) => {
            this.cellmap = cellmap;
            this.screen.render();
        });
    };

    /**
   * Pause animation.
   * Only works for animated GIFs that are currently playing.
   * @returns Pause operation result
   */
    pause(): any {
        if (!this.img) return;
        return this.img.pause();
    };

    /**
   * Stop animation.
   * Only works for animated GIFs. Resets to the first frame.
   * @returns Stop operation result
   */
    stop(): any {
        if (!this.img) return;
        return this.img.stop();
    };

    /**
   * Clear the current image.
   * Removes the image from the box and stops any animation.
   */
    clearImage(): void {
        this.stop();
        this.setContent('');
        this.img = null;
        this.cellmap = null;
    };

    override render(): any {
        const coords = super.render();
        if (!coords) return;

        if (this.img && this.cellmap) {
            this.img.renderElement(this.cellmap, this);
        }

        return coords;
    };
}

ANSIImage.curl = function(url: string): any {
  const runtime = getRuntime();
  try {
    return runtime.processes!.childProcess.execFileSync('curl',
      ['-s', '-A', '', url],
      { stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    ;
  }
  try {
    return runtime.processes!.childProcess.execFileSync('wget',
      ['-U', '', '-O', '-', url],
      { stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    ;
  }
  throw new Error('curl or wget failed.');
};

/**
 * Expose
 */

export default ANSIImage;
export { ANSIImage };
