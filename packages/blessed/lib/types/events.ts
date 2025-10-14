/**
 * Event type definitions for blessed.
 * Based on patterns from @types/blessed community types.
 */

import type { TMouseAction } from './common.js';

/**
 * Mouse event argument passed to mouse event handlers.
 * Contains information about the mouse action and position.
 */
export interface IMouseEventArg {
  /** X coordinate of the mouse event (column) */
  x: number;
  /** Y coordinate of the mouse event (row) */
  y: number;
  /** Type of mouse action that occurred */
  action: TMouseAction;
  /** Whether the Shift modifier key was held (optional) */
  shift?: boolean;
  /** Whether the Control modifier key was held (optional) */
  ctrl?: boolean;
  /** Whether the Meta/Alt modifier key was held (optional) */
  meta?: boolean;
}

/**
 * Key event argument passed to keypress event handlers.
 * Contains information about the key that was pressed including modifiers.
 */
export interface IKeyEventArg {
  /** Full key sequence (e.g., "C-c", "escape", "a") */
  full: string;
  /** Name of the key (e.g., "c", "escape", "return") */
  name: string;
  /** Whether the Shift modifier key was held */
  shift: boolean;
  /** Whether the Control modifier key was held */
  ctrl: boolean;
  /** Whether the Meta/Alt modifier key was held */
  meta: boolean;
  /** Raw escape sequence received from the terminal */
  sequence: string;
}

/**
 * Type alias for mouse event. Same as IMouseEventArg.
 */
export type MouseEvent = IMouseEventArg;

/**
 * Type alias for key event. Same as IKeyEventArg.
 */
export type KeyEvent = IKeyEventArg;

/**
 * Node event types that can be emitted by Node elements.
 */
export type NodeEventType =
  /** Received when node is added to a parent */
  | "adopt"
  /** Received when node is removed from its current parent */
  | "remove"
  /** Received when node gains a new parent */
  | "reparent"
  /** Received when node is attached to the screen directly or somewhere in its ancestry */
  | "attach"
  /** Received when node is detached from the screen directly or somewhere in its ancestry */
  | "detach";

/**
 * Screen-specific event types.
 */
export type NodeScreenEventType =
  /**
   * Received when the terminal window focuses.
   * Requires a terminal supporting the focus protocol and
   * focus needs to be passed to program.enableMouse().
   */
  | "focus"
  /**
   * Received when the terminal window blurs.
   * Requires a terminal supporting the focus protocol and
   * focus needs to be passed to program.enableMouse().
   */
  | "blur"
  /** Element was clicked (slightly smarter than mouseup) */
  | "click"
  | "element click"
  | "element mouseover"
  | "element mouseout"
  | "element mouseup";

/**
 * Mouse-related event types.
 */
export type NodeMouseEventType =
  | "mouse"
  | "mouseout"
  | "mouseover"
  | "mousedown"
  | "mouseup"
  | "mousewheel"
  | "wheeldown"
  | "wheelup"
  | "mousemove";

/**
 * Generic element event types.
 */
export type NodeGenericEventType =
  /** Received on screen resize */
  | "resize"
  /** Received before render */
  | "prerender"
  /** Received on render */
  | "render"
  /** Received when the screen is destroyed (only useful when using multiple screens) */
  | "destroy"
  /** Received when the element is moved */
  | "move"
  /** Received when element is shown */
  | "show"
  /** Received when element becomes hidden */
  | "hide"
  /** Received when content is set */
  | "set content"
  /** Received when content is parsed */
  | "parsed content";

/**
 * List element specific event types.
 */
export type ListElementEventType =
  /** List was canceled (when esc is pressed with the keys option) */
  | "cancel"
  /** Either a select or a cancel event was received */
  | "action"
  | "create item"
  | "add item"
  | "remove item"
  | "insert item"
  | "set items";

/**
 * Textarea element specific event types.
 */
export type TextareaElementEventType =
  /** Value is an error */
  | "error"
  /** Value is submitted (enter) */
  | "submit"
  /** Value is discarded (escape) */
  | "cancel"
  /** Either submit or cancel */
  | "action";
