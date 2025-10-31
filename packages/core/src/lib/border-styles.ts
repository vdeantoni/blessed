/**
 * Border style definitions.
 * Character sets for different border styles (single, double, round, etc.).
 */

export interface BorderCharacters {
  /** Top-left corner character */
  topLeft: string;
  /** Top border character */
  top: string;
  /** Top-right corner character */
  topRight: string;
  /** Right border character */
  right: string;
  /** Bottom-right corner character */
  bottomRight: string;
  /** Bottom border character */
  bottom: string;
  /** Bottom-left corner character */
  bottomLeft: string;
  /** Left border character */
  left: string;
}

/**
 * Available border style names.
 */
export type BorderStyleName =
  | "single"
  | "double"
  | "round"
  | "bold"
  | "singleDouble"
  | "doubleSingle"
  | "classic"
  | "arrow";

/**
 * Predefined border styles.
 *
 * Includes common Unicode box-drawing characters and ASCII fallback.
 */
export const borderStyles: Record<BorderStyleName, BorderCharacters> = {
  /**
   * Standard single-line box drawing characters.
   * Unicode: U+2500 block.
   */
  single: {
    topLeft: "┌",
    top: "─",
    topRight: "┐",
    right: "│",
    bottomRight: "┘",
    bottom: "─",
    bottomLeft: "└",
    left: "│",
  },

  /**
   * Double-line box drawing characters.
   * Unicode: U+2550 block.
   */
  double: {
    topLeft: "╔",
    top: "═",
    topRight: "╗",
    right: "║",
    bottomRight: "╝",
    bottom: "═",
    bottomLeft: "╚",
    left: "║",
  },

  /**
   * Rounded corners with single-line sides.
   * Unicode: U+256D (rounded corners) + U+2500 (lines).
   */
  round: {
    topLeft: "╭",
    top: "─",
    topRight: "╮",
    right: "│",
    bottomRight: "╯",
    bottom: "─",
    bottomLeft: "╰",
    left: "│",
  },

  /**
   * Bold/heavy line box drawing characters.
   * Unicode: U+250F block.
   */
  bold: {
    topLeft: "┏",
    top: "━",
    topRight: "┓",
    right: "┃",
    bottomRight: "┛",
    bottom: "━",
    bottomLeft: "┗",
    left: "┃",
  },

  /**
   * Mixed style: single horizontal, double vertical.
   * Unicode: U+2553 block.
   */
  singleDouble: {
    topLeft: "╓",
    top: "─",
    topRight: "╖",
    right: "║",
    bottomRight: "╜",
    bottom: "─",
    bottomLeft: "╙",
    left: "║",
  },

  /**
   * Mixed style: double horizontal, single vertical.
   * Unicode: U+2552 block.
   */
  doubleSingle: {
    topLeft: "╒",
    top: "═",
    topRight: "╕",
    right: "│",
    bottomRight: "╛",
    bottom: "═",
    bottomLeft: "╘",
    left: "│",
  },

  /**
   * Classic ASCII box drawing (fallback for limited terminals).
   * ASCII characters only.
   */
  classic: {
    topLeft: "+",
    top: "-",
    topRight: "+",
    right: "|",
    bottomRight: "+",
    bottom: "-",
    bottomLeft: "+",
    left: "|",
  },

  /**
   * Arrow-based border (decorative).
   * Unicode: U+2190-2199 block.
   */
  arrow: {
    topLeft: "↘",
    top: "↓",
    topRight: "↙",
    right: "←",
    bottomRight: "↖",
    bottom: "↑",
    bottomLeft: "↗",
    left: "→",
  },
};

/**
 * Get border characters for a given style name.
 *
 * @param style - The border style name or custom character set
 * @returns Border characters for the specified style
 * @throws {Error} If style name is invalid
 *
 * @example
 * ```typescript
 * const chars = getBorderChars('double');
 * // => { topLeft: '╔', top: '═', ... }
 *
 * // Custom characters
 * const custom = getBorderChars({
 *   topLeft: '*', top: '-', topRight: '*',
 *   right: '|', bottomRight: '*', bottom: '-',
 *   bottomLeft: '*', left: '|'
 * });
 * ```
 */
export function getBorderChars(
  style: BorderStyleName | BorderCharacters,
): BorderCharacters {
  if (typeof style === "string") {
    const chars = borderStyles[style];
    if (!chars) {
      throw new Error(
        `Invalid border style: "${style}". ` +
          `Available styles: ${Object.keys(borderStyles).join(", ")}`,
      );
    }
    return chars;
  }

  // Custom character set provided
  return style;
}

/**
 * Check if a border style name is valid.
 *
 * @param style - The style name to check
 * @returns True if the style exists
 */
export function isValidBorderStyle(style: string): style is BorderStyleName {
  return style in borderStyles;
}
