/**
 * Common type definitions for blessed
 */

/**
 * Type for positioning relative to top or left edge.
 * Can be a pixel value, percentage string, or "center" keyword.
 */
export type TTopLeft = string | number | "center";

/**
 * Type for positioning values.
 * Can be a pixel value or percentage string.
 */
export type TPosition = string | number;

/**
 * Text alignment options.
 */
export type TAlign = "left" | "center" | "right";

/**
 * Mouse action types supported by blessed.
 */
export type TMouseAction =
  | "mousedown"
  | "mouseup"
  | "mousemove"
  | "mousewheel"
  | "wheeldown"
  | "wheelup";

/**
 * Padding specification for elements.
 * Amount of padding on the inside of the element.
 */
export interface Padding {
  /** Left padding in cells (defaults to 0) */
  left: number;
  /** Right padding in cells (defaults to 0) */
  right: number;
  /** Top padding in cells (defaults to 0) */
  top: number;
  /** Bottom padding in cells (defaults to 0) */
  bottom: number;
}

/**
 * Position specification for elements.
 * Offsets can be numbers (cells), percentages (e.g., "50%"), or keywords like "center".
 * Percentages can also have offsets (e.g., "50%+1", "50%-1").
 */
export interface Position {
  /** Left offset. Can be number, percentage, or "center" */
  left?: number | string;
  /** Right offset. Can be number or percentage */
  right?: number | string;
  /** Top offset. Can be number, percentage, or "center" */
  top?: number | string;
  /** Bottom offset. Can be number or percentage */
  bottom?: number | string;
  /** Width of element. Can be number, percentage, or keywords like "half" or "shrink" */
  width?: number | string;
  /** Height of element. Can be number, percentage, or keywords like "half" or "shrink" */
  height?: number | string;
}

/**
 * Internal position coordinates in cells.
 * These are the calculated absolute positions after rendering.
 */
export interface PositionCoords {
  /** Internal x coordinate (left edge) */
  xi: number;
  /** x limit (right edge) */
  xl: number;
  /** Internal y coordinate (top edge) */
  yi: number;
  /** y limit (bottom edge) */
  yl: number;
}

/**
 * Extended coordinate information including content positioning.
 */
export interface Coords {
  /** x limit (right edge) */
  xl: number;
  /** Internal x coordinate (left edge) */
  xi: number;
  /** y limit (bottom edge) */
  yl: number;
  /** Internal y coordinate (top edge) */
  yi: number;
  /** Base line for scrolling */
  base: number;
  /** Content end position */
  _contentEnd: { x: number; y: number };
  /** Top offset without border/padding */
  notop: TTopLeft;
  /** Left offset without border/padding */
  noleft: TTopLeft;
  /** Right offset without border/padding */
  noright: TPosition;
  /** Bottom offset without border/padding */
  nobot: TPosition;
}

/**
 * Render coordinates returned by _getCoords.
 * Contains position information and clipping flags.
 */
export interface RenderCoords {
  /** Internal x coordinate (left edge) */
  xi: number;
  /** x limit (right edge) */
  xl: number;
  /** Internal y coordinate (top edge) */
  yi: number;
  /** y limit (bottom edge) */
  yl: number;
  /** Base line for scrolling */
  base: number;
  /** Whether left side is clipped */
  noleft: boolean;
  /** Whether right side is clipped */
  noright: boolean;
  /** Whether top side is clipped */
  notop: boolean;
  /** Whether bottom side is clipped */
  nobot: boolean;
  /** Render counter */
  renders: number;
  /** Absolute left position */
  aleft?: number;
  /** Absolute top position */
  atop?: number;
  /** Absolute right position */
  aright?: number;
  /** Absolute bottom position */
  abottom?: number;
  /** Width of the element */
  width?: number;
  /** Height of the element */
  height?: number;
}

/**
 * Border specification for elements.
 * Can be "line" (uses line characters) or "bg" (uses background character).
 */
export interface Border {
  /** Type of border: "line" or "bg". bg by default. */
  type?: "line" | "bg";
  /** Character to use if bg type. Default is space. */
  ch?: string;
  /** Border background color. Must be a number (-1 for default). */
  bg?: number;
  /** Border foreground color. Must be a number (-1 for default). */
  fg?: number;
  /** Bold attribute for border */
  bold?: string;
  /** Underline attribute for border */
  underline?: string;
  /** Whether to draw top border */
  top?: boolean;
  /** Whether to draw bottom border */
  bottom?: boolean;
  /** Whether to draw left border */
  left?: boolean;
  /** Whether to draw right border */
  right?: boolean;
}

/**
 * Label options for element labels.
 */
export interface LabelOptions {
  /** Label text content */
  text: string;
  /** Side to place label on */
  side: TAlign;
}

/**
 * Cursor configuration for elements with cursor support.
 * Have blessed draw a custom cursor and hide the terminal cursor (experimental).
 */
export interface Cursor {
  /** Have blessed draw a custom cursor and hide the terminal cursor (experimental) */
  artificial: boolean;
  /** Shape of the cursor: block, underline, or line */
  shape: "block" | "underline" | "line";
  /** Whether the cursor blinks */
  blink: boolean;
  /** Color of the cursor. Accepts any valid color value (null is default) */
  color: string;
}

/**
 * Image data structure for ANSIImage and OverlayImage widgets.
 */
export interface TImage {
  /** Pixel width of the image */
  width: number;
  /** Pixel height of the image */
  height: number;
  /** Image bitmap data */
  bmp: any;
  /** Image cellmap (bitmap scaled down to cell size) */
  cellmap: any;
}
