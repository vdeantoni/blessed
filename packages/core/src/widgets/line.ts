/**
 * line.ts - line element for blessed
 */

/**
 * Modules
 */

import type { LineOptions } from "../types";
import Box from "./box.js";

/**
 * Line
 */

class Line extends Box {
  override type = "line";
  override ch: string;
  override border: any;

  constructor(options: LineOptions = {}) {
    const orientation = options.orientation || "vertical";
    delete options.orientation;

    if (orientation === "vertical") {
      options.width = 1;
    } else {
      options.height = 1;
    }

    super(options);

    this.ch =
      !options.type || options.type === "line"
        ? orientation === "horizontal"
          ? "─"
          : "│"
        : options.ch || " ";

    this.border = Object.create(this, {
      type: {
        value: "bg",
        writable: true,
        enumerable: true,
        configurable: true,
      },
    });

    this.style.border = this.style;
  }
}

/**
 * Expose
 */

export default Line;
export { Line };
