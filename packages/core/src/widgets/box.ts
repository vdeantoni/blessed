/**
 * box.ts - box element for blessed
 */

/**
 * Modules
 */

import type { BoxOptions } from "../types";
import Element from "./element.js";

/**
 * Box - The fundamental building block for creating rectangular UI components.
 *
 * @remarks
 * Box is the most basic and versatile widget in unblessed. It extends {@link Element}
 * and provides a rectangular container that can:
 * - Display content with optional borders
 * - Position children with flexible layout options
 * - Handle mouse and keyboard input
 * - Apply styling (colors, padding, alignment)
 *
 * Almost all other widgets inherit from Box, making it the foundation of the widget system.
 *
 * @example Basic usage
 * ```typescript
 * import { Screen, Box } from '@unblessed/node';
 *
 * const screen = new Screen();
 *
 * const box = new Box({
 *   parent: screen,
 *   top: 'center',
 *   left: 'center',
 *   width: '50%',
 *   height: '50%',
 *   content: 'Hello World!',
 *   border: {
 *     type: 'line'
 *   },
 *   style: {
 *     fg: 'white',
 *     bg: 'blue',
 *     border: {
 *       fg: '#f0f0f0'
 *     }
 *   }
 * });
 *
 * screen.render();
 * ```
 *
 * @example With dynamic content
 * ```typescript
 * const box = new Box({
 *   parent: screen,
 *   content: 'Loading...'
 * });
 *
 * // Update content later
 * box.setContent('Data loaded!');
 * screen.render();
 * ```
 *
 * @see {@link Element} for inherited properties and methods
 * @see {@link BoxOptions} for all available configuration options
 */
class Box extends Element {
  override type = "box";

  /**
   * Creates a new Box widget.
   *
   * @param options - Configuration options for the box
   * @see {@link BoxOptions} for available options
   */
  constructor(options: BoxOptions = {}) {
    super(options);
  }
}

/**
 * Expose
 */

export default Box;
export { Box };
