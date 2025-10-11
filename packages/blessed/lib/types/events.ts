/**
 * Event type definitions for blessed
 */

import type { TMouseAction } from './common.js';

export interface IMouseEventArg {
  x: number;
  y: number;
  action: TMouseAction;
}

export interface IKeyEventArg {
  full: string;
  name: string;
  shift: boolean;
  ctrl: boolean;
  meta: boolean;
  sequence: string;
}

export type NodeEventType =
  | "adopt"
  | "remove"
  | "reparent"
  | "attach"
  | "detach";

export type NodeScreenEventType =
  | "focus"
  | "blur"
  | "click"
  | "element click"
  | "element mouseover"
  | "element mouseout"
  | "element mouseup";

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

export type NodeGenericEventType =
  | "resize"
  | "prerender"
  | "render"
  | "destroy"
  | "move"
  | "show"
  | "hide"
  | "set content"
  | "parsed content";

export type ListElementEventType =
  | "cancel"
  | "action"
  | "create item"
  | "add item"
  | "remove item"
  | "insert item"
  | "set items";

export type TextareaElementEventType =
  | "error"
  | "submit"
  | "cancel"
  | "action";
