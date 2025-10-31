/**
 * Common type definitions for blessed
 */

import type {
  BorderCharacters,
  BorderStyleName,
} from "../lib/border-styles.js";

/**
 * Position value for element layout.
 *
 * Supports flexible positioning with multiple formats:
 * - **Absolute cells**: `10`, `20` - Fixed position in terminal cells
 * - **Percentage**: `"50%"`, `"100%"` - Relative to parent size
 * - **Offset percentage**: `"50%+2"`, `"50%-5"` - Percentage with cell offset
 * - **Center**: `"center"` - Center alignment (for top/left)
 * - **Size keywords**: `"half"`, `"shrink"` - Special sizing (for width/height)
 *
 * @example
 * ```typescript
 * const box = new Box({
 *   top: 10,                // 10 cells from top
 *   left: "50%",            // Middle of parent
 *   width: "half",          // Half of parent width
 *   height: "50%-5"         // Middle minus 5 cells
 * });
 * ```
 */
export type PositionValue = number | string;

/**
 * Text alignment options.
 */
export type Alignment = "left" | "center" | "right";

/**
 * Mouse action types supported by blessed.
 */
export type MouseAction =
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
 *
 * All position and size properties accept flexible values:
 * - **Numbers**: Absolute cell positions/sizes
 * - **Percentages**: Relative to parent (`"50%"`)
 * - **Offset percentages**: Relative with adjustment (`"50%+2"`)
 * - **Keywords**: Special values like `"center"`, `"half"`, `"shrink"`
 *
 * @example
 * ```typescript
 * const box = new Box({
 *   top: "center",          // Vertically centered
 *   left: "50%-10",         // Horizontally centered, shifted left 10 cells
 *   width: "half",          // 50% of parent width
 *   height: 20              // Fixed 20 cells high
 * });
 * ```
 */
export interface Position {
  /** Left offset. Can be number, percentage, or "center" */
  left?: PositionValue;
  /** Right offset. Can be number or percentage */
  right?: PositionValue;
  /** Top offset. Can be number, percentage, or "center" */
  top?: PositionValue;
  /** Bottom offset. Can be number or percentage */
  bottom?: PositionValue;
  /** Width of element. Can be number, percentage, or keywords like "half" or "shrink" */
  width?: PositionValue;
  /** Height of element. Can be number, percentage, or keywords like "half" or "shrink" */
  height?: PositionValue;
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
  notop: PositionValue;
  /** Left offset without border/padding */
  noleft: PositionValue;
  /** Right offset without border/padding */
  noright: PositionValue;
  /** Bottom offset without border/padding */
  nobot: PositionValue;
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
  /**
   * Border style when type is "line".
   * Supports predefined styles ('single', 'double', 'round', 'bold', etc.)
   * or a custom BorderCharacters object.
   * @default 'single'
   */
  style?: BorderStyleName | BorderCharacters;
  /** Character to use if bg type. Default is space. */
  ch?: string;
  /** Border background color. Must be a number (-1 for default). */
  bg?: number;
  /** Border foreground color. Must be a number (-1 for default). */
  fg?: number;
  /** Bold attribute for border */
  bold?: boolean;
  /** Underline attribute for border */
  underline?: boolean;
  /** Whether to draw top border */
  top?: boolean;
  /** Whether to draw bottom border */
  bottom?: boolean;
  /** Whether to draw left border */
  left?: boolean;
  /** Whether to draw right border */
  right?: boolean;
  /** Top border color (overrides fg). Can be color name or number. */
  topColor?: number | string;
  /** Bottom border color (overrides fg). Can be color name or number. */
  bottomColor?: number | string;
  /** Left border color (overrides fg). Can be color name or number. */
  leftColor?: number | string;
  /** Right border color (overrides fg). Can be color name or number. */
  rightColor?: number | string;
  /** Dim all borders (50% opacity effect) */
  dim?: boolean;
  /** Dim top border */
  topDim?: boolean;
  /** Dim bottom border */
  bottomDim?: boolean;
  /** Dim left border */
  leftDim?: boolean;
  /** Dim right border */
  rightDim?: boolean;
  /**
   * Controls which border colors corners inherit.
   * - 'horizontal': corners use top/bottom border colors (Ink's approach)
   * - 'vertical': corners use left/right border colors
   * @default 'vertical'
   */
  cornerColorMode?: "horizontal" | "vertical";
  /**
   * Array of colors for each border cell (addressable, like LED strips).
   * Enables per-cell color control for animations (rainbow waves, chase effects, etc.).
   * Index 0 starts at top-left corner, proceeds clockwise around perimeter.
   * Can contain color names ("cyan"), hex codes ("#00ff00"), or numeric codes (6).
   */
  colors?: (string | number)[];
  /**
   * Whether to repeat the colors array if shorter than border perimeter.
   * When false, uses fallback colors (topColor/leftColor/fg) after array ends.
   * @default true
   */
  repeatColors?: boolean;
}

/**
 * Label options for element labels.
 */
export interface LabelOptions {
  /** Label text content */
  text: string;
  /** Side to place label on */
  side: Alignment;
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
export interface ImageData {
  /** Pixel width of the image */
  width: number;
  /** Pixel height of the image */
  height: number;
  /** Image bitmap data */
  bmp: any;
  /** Image cellmap (bitmap scaled down to cell size) */
  cellmap: any;
}
