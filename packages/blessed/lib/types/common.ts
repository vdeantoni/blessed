/**
 * Common type definitions for blessed
 */

export type TTopLeft = string | number | "center";
export type TPosition = string | number;
export type TAlign = "left" | "center" | "right";
export type TMouseAction = "mousedown" | "mouseup" | "mousemove";

export interface Padding {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface Position {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
}

export interface PositionCoords {
  xi: number;
  xl: number;
  yi: number;
  yl: number;
}

export interface Coords {
  xl: number;
  xi: number;
  yl: number;
  yi: number;
  base: number;
  _contentEnd: { x: number; y: number };
  notop: TTopLeft;
  noleft: TTopLeft;
  noright: TPosition;
  nobot: TPosition;
}

export interface Border {
  type?: "line" | "bg";
  ch?: string;
  bg?: number;
  fg?: number;
  bold?: string;
  underline?: string;
}

export interface LabelOptions {
  text: string;
  side: TAlign;
}

export interface Cursor {
  artificial: boolean;
  shape: "block" | "underline" | "line";
  blink: boolean;
  color: string;
}

export interface TImage {
  width: number;
  height: number;
  bmp: any;
  cellmap: any;
}
