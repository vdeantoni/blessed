/**
 * overlayimage.ts - w3m image element for blessed
 */

/**
 * Modules
 */

import type { OverlayImageOptions } from "../types";
import Box from "./box.js";
import helpers from "../lib/helpers";

/**
 * OverlayImage
 * Good example of w3mimgdisplay commands:
 * https://github.com/hut/ranger/blob/master/ranger/ext/img_display.py
 */

class OverlayImage extends Box {
  override type = "overlayimage";
  static w3mdisplay = "/usr/lib/w3m/w3mimgdisplay";
  static hasW3MDisplay?: boolean;

  declare options: OverlayImageOptions; // Type refinement - initialized by parent
  file?: string;
  _lastFile?: string;
  _needsRatio?: boolean;
  _noImage?: boolean;
  _props?: any;
  _lastSize?: any;
  _settingImage?: boolean;
  _queue?: any[];
  _ratio?: any;
  declare _drag?: boolean; // Type refinement from Element._drag: any

  constructor(options: OverlayImageOptions = {}) {
    super(options);

    if (options.w3m) {
      OverlayImage.w3mdisplay = options.w3m;
    }

    if (OverlayImage.hasW3MDisplay == null) {
      if (this.runtime.fs.existsSync(OverlayImage.w3mdisplay)) {
        OverlayImage.hasW3MDisplay = true;
      } else if (options.search !== false) {
        const file =
          helpers.findFile("/usr", "w3mimgdisplay") ||
          helpers.findFile("/lib", "w3mimgdisplay") ||
          helpers.findFile("/bin", "w3mimgdisplay");
        if (file) {
          OverlayImage.hasW3MDisplay = true;
          OverlayImage.w3mdisplay = file;
        } else {
          OverlayImage.hasW3MDisplay = false;
        }
      }
    }

    this.on("hide", () => {
      this._lastFile = this.file;
      this.clearImage();
    });

    this.on("show", () => {
      if (!this._lastFile) return;
      this.setImage(this._lastFile);
    });

    this.on("detach", () => {
      this._lastFile = this.file;
      this.clearImage();
    });

    this.on("attach", () => {
      if (!this._lastFile) return;
      this.setImage(this._lastFile);
    });

    this.onScreenEvent("resize", () => {
      this._needsRatio = true;
    });

    // Get images to overlap properly. Maybe not worth it:
    // this.onScreenEvent('render', function() {
    //   self.screen.program.flush();
    //   if (!self._noImage) return;
    //   function display(el, next) {
    //     if (el.type === 'w3mimage' && el.file) {
    //       el.setImage(el.file, next);
    //     } else {
    //       next();
    //     }
    //   }
    //   function done(el) {
    //     el.children.forEach(recurse);
    //   }
    //   function recurse(el) {
    //     display(el, function() {
    //       var pending = el.children.length;
    //       el.children.forEach(function(el) {
    //         display(el, function() {
    //           if (!--pending) done(el);
    //         });
    //       });
    //     });
    //   }
    //   recurse(self.screen);
    // });

    this.onScreenEvent("render", () => {
      this.screen.program.flush();
      if (!this._noImage) {
        this.setImage(this.file);
      }
    });

    if (this.options.file || this.options.img) {
      this.setImage(this.options.file || this.options.img);
    }
  }

  spawn(file: string, args: string[], opt?: any, callback?: any): any {
    const { spawn: spawnProcess } = this.runtime.processes!.childProcess;
    let ps: any;

    opt = opt || {};
    ps = spawnProcess(file, args, opt);

    ps.on("error", function (err: any) {
      if (!callback) return;
      return callback(err);
    });

    ps.on("exit", function (code: number) {
      if (!callback) return;
      if (code !== 0) return callback(new Error("Exit Code: " + code));
      return callback(null, code === 0);
    });

    return ps;
  }

  /**
   * Set the image in the box to a new path.
   * Supports local file paths and HTTP(S) URLs.
   * @param img - Path to the image file or URL
   * @param callback - Optional callback function called with (err, success)
   * @returns Operation result
   */
  setImage(img: any, callback?: any): any {
    var self = this;

    if (this._settingImage) {
      this._queue = this._queue || [];
      this._queue.push([img, callback]);
      return;
    }
    this._settingImage = true;

    var reset = function () {
      self._settingImage = false;
      self._queue = self._queue || [];
      var item = self._queue.shift();
      if (item) {
        self.setImage(item[0], item[1]);
      }
    };

    if (OverlayImage.hasW3MDisplay === false) {
      reset();
      if (!callback) return;
      return callback(new Error("W3M Image Display not available."));
    }

    if (!img) {
      reset();
      if (!callback) return;
      return callback(new Error("No image."));
    }

    this.file = img;

    return this.getPixelRatio(function (err: any, ratio: any) {
      if (err) {
        reset();
        if (!callback) return;
        return callback(err);
      }

      return self.renderImage(img, ratio, function (err: any, success: any) {
        if (err) {
          reset();
          if (!callback) return;
          return callback(err);
        }

        if (self.shrink || self.options.autofit) {
          delete self.shrink;
          delete self.options.shrink;
          self.options.autofit = true;
          return self.imageSize(function (err: any, size: any) {
            if (err) {
              reset();
              if (!callback) return;
              return callback(err);
            }

            if (
              self._lastSize &&
              ratio.tw === self._lastSize.tw &&
              ratio.th === self._lastSize.th &&
              size.width === self._lastSize.width &&
              size.height === self._lastSize.height &&
              self.aleft === self._lastSize.aleft &&
              self.atop === self._lastSize.atop
            ) {
              reset();
              if (!callback) return;
              return callback(null, success);
            }

            self._lastSize = {
              tw: ratio.tw,
              th: ratio.th,
              width: size.width,
              height: size.height,
              aleft: self.aleft,
              atop: self.atop,
            };

            self.position.width = (size.width / ratio.tw) | 0;
            self.position.height = (size.height / ratio.th) | 0;

            self._noImage = true;
            self.screen.render();
            self._noImage = false;

            reset();
            return self.renderImage(img, ratio, callback);
          });
        }

        reset();
        if (!callback) return;
        return callback(null, success);
      });
    });
  }

  renderImage(img: string, ratio: any, callback?: any): any {
    callback =
      callback ||
      function (_err: any, result: any) {
        return result;
      };
    try {
      return callback(null, this.renderImageSync(img, ratio));
    } catch (e) {
      return callback(e);
    }
  }

  /**
   * Clear the current image.
   * Removes the image from the screen.
   * @param callback - Optional callback function called with (err, success)
   * @returns Operation result
   */
  clearImage(callback?: any): any {
    callback =
      callback ||
      function (_err: any, result: any) {
        return result;
      };
    try {
      return callback(null, this.clearImageSync());
    } catch (e) {
      return callback(e);
    }
  }

  /**
   * Get the size of an image file in pixels.
   * @param callback - Optional callback function called with (err, {raw, width, height})
   * @returns Operation result with image dimensions
   */
  imageSize(callback?: any): any {
    callback =
      callback ||
      function (_err: any, result: any) {
        return result;
      };
    try {
      return callback(null, this.imageSizeSync());
    } catch (e) {
      return callback(e);
    }
  }

  /**
   * Get the size of the terminal in pixels.
   * @param callback - Optional callback function called with (err, {raw, width, height})
   * @returns Operation result with terminal dimensions in pixels
   */
  termSize(callback?: any): any {
    callback =
      callback ||
      function (_err: any, result: any) {
        return result;
      };
    try {
      return callback(null, this.termSizeSync());
    } catch (e) {
      return callback(e);
    }
  }

  /**
   * Get the pixel to cell ratio for the terminal.
   * Calculates how many pixels correspond to each character cell.
   * @param callback - Optional callback function called with (err, {tw, th})
   * @returns Operation result with pixel ratios (tw = pixels per cell width, th = pixels per cell height)
   */
  getPixelRatio(callback?: any): any {
    callback =
      callback ||
      function (_err: any, result: any) {
        return result;
      };
    try {
      return callback(null, this.getPixelRatioSync());
    } catch (e) {
      return callback(e);
    }
  }

  renderImageSync(img: string, ratio: any): boolean {
    if (OverlayImage.hasW3MDisplay === false) {
      throw new Error("W3M Image Display not available.");
    }

    if (!ratio) {
      throw new Error("No ratio.");
    }

    // clearImage unsets these:
    var _file = this.file;
    var _lastSize = this._lastSize;

    this.clearImageSync();

    this.file = _file;
    this._lastSize = _lastSize;

    var width = (this.width * ratio.tw) | 0,
      height = (this.height * ratio.th) | 0,
      aleft = (this.aleft * ratio.tw) | 0,
      atop = (this.atop * ratio.th) | 0;

    var input =
      "0;1;" +
      aleft +
      ";" +
      atop +
      ";" +
      width +
      ";" +
      height +
      ";;;;;" +
      img +
      "\n4;\n3;\n";

    this._props = {
      aleft: aleft,
      atop: atop,
      width: width,
      height: height,
    };

    try {
      this.runtime.processes!.childProcess.execFileSync(
        OverlayImage.w3mdisplay,
        [],
        {
          env: this.runtime.process.env as Record<string, string>,
          encoding: "utf8",
          input: input,
          timeout: 1000,
        },
      );
    } catch (e) {}

    return true;
  }

  clearImageSync(): boolean {
    if (OverlayImage.hasW3MDisplay === false) {
      throw new Error("W3M Image Display not available.");
    }

    if (!this._props) {
      return false;
    }

    var width = this._props.width + 2,
      height = this._props.height + 2,
      aleft = this._props.aleft,
      atop = this._props.atop;

    if (this._drag) {
      aleft -= 10;
      atop -= 10;
      width += 10;
      height += 10;
    }

    var input =
      "6;" + aleft + ";" + atop + ";" + width + ";" + height + "\n4;\n3;\n";

    delete this.file;
    delete this._props;
    delete this._lastSize;

    try {
      this.runtime.processes!.childProcess.execFileSync(
        OverlayImage.w3mdisplay,
        [],
        {
          env: this.runtime.process.env as Record<string, string>,
          encoding: "utf8",
          input: input,
          timeout: 1000,
        },
      );
    } catch (e) {}

    return true;
  }

  imageSizeSync(): any {
    var img = this.file;

    if (OverlayImage.hasW3MDisplay === false) {
      throw new Error("W3M Image Display not available.");
    }

    if (!img) {
      throw new Error("No image.");
    }

    var buf = "";
    var input = "5;" + img + "\n";

    try {
      buf = this.runtime.processes!.childProcess.execFileSync(
        OverlayImage.w3mdisplay,
        [],
        {
          env: this.runtime.process.env as Record<string, string>,
          encoding: "utf8",
          input: input,
          timeout: 1000,
        },
      ) as string;
    } catch (e) {}

    var size = buf.trim().split(/\s+/);

    return {
      raw: buf.trim(),
      width: +size[0],
      height: +size[1],
    };
  }

  termSizeSync(_?: any, recurse?: number): any {
    if (OverlayImage.hasW3MDisplay === false) {
      throw new Error("W3M Image Display not available.");
    }

    var buf = "";

    try {
      buf = this.runtime.processes!.childProcess.execFileSync(
        OverlayImage.w3mdisplay,
        ["-test"],
        {
          env: this.runtime.process.env as Record<string, string>,
          encoding: "utf8",
          timeout: 1000,
        },
      ) as string;
    } catch (e) {}

    if (!buf.trim()) {
      // Bug: w3mimgdisplay will sometimes
      // output nothing. Try again:
      recurse = recurse || 0;
      if (++recurse === 5) {
        throw new Error("Term size not determined.");
      }
      return this.termSizeSync(_, recurse);
    }

    var size = buf.trim().split(/\s+/);

    return {
      raw: buf.trim(),
      width: +size[0],
      height: +size[1],
    };
  }

  getPixelRatioSync(): any {
    // XXX We could cache this, but sometimes it's better
    // to recalculate to be pixel perfect.
    if (this._ratio && !this._needsRatio) {
      return this._ratio;
    }
    this._needsRatio = false;

    var dimensions = this.termSizeSync();

    this._ratio = {
      tw: dimensions.width / this.screen.width,
      th: dimensions.height / this.screen.height,
    };

    return this._ratio;
  }

  displayImage(callback?: any): any {
    return this.screen.displayImage(this.file, callback);
  }
}

/**
 * Expose
 */

export default OverlayImage;
export { OverlayImage };
