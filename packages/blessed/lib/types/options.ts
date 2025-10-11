/**
 * Options type definitions for blessed widgets
 */

import type { Readable, Writable } from 'stream';
import type { TTopLeft, TPosition, TAlign, Border, Padding, Position, Cursor } from './common.js';
import type { Style, ListElementStyle, StyleListTable } from './style.js';

// Forward declarations for circular dependencies
export type Screen = any;
export type Node = any;
export type BlessedElement = any;

export interface INodeOptions {
  name?: string;
  screen?: Screen;
  parent?: Node;
  children?: Node[];
  focusable?: boolean;
  _isScreen?: boolean;
}

export interface ScrollbarConfig {
  ch?: string;
  style?: any;
  track?: TrackConfig;
  fg?: string;
  bg?: string;
  bold?: boolean;
  underline?: boolean;
  inverse?: boolean;
  invisible?: boolean;
}

export interface TrackConfig {
  ch?: string;
  style?: any;
  fg?: string;
  bg?: string;
  bold?: boolean;
  underline?: boolean;
  inverse?: boolean;
  invisible?: boolean;
}

export interface ScrollableOptions {
  scrollable?: boolean;
  baseLimit?: number;
  alwaysScroll?: boolean;
  scrollbar?: ScrollbarConfig;
  track?: TrackConfig;
  mouse?: boolean;
  keys?: boolean | string | string[];
  vi?: boolean;
  ignoreKeys?: boolean;
}

export interface ElementOptions extends INodeOptions, ScrollableOptions {
  tags?: boolean;
  fg?: string;
  bg?: string;
  bold?: string;
  underline?: string;
  style?: any;
  border?: Border | "line" | "bg";
  content?: string;
  clickable?: boolean;
  input?: boolean;
  keyable?: boolean;
  focused?: BlessedElement;
  hidden?: boolean;
  label?: string;
  hoverText?: string;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
  shrink?: boolean;
  padding?: number | Padding;
  top?: TTopLeft;
  left?: TTopLeft;
  right?: TPosition;
  bottom?: TPosition;
  width?: number | string;
  height?: number | string;
  position?: Position;
  ch?: string;
  draggable?: boolean;
  shadow?: boolean;
}

export interface ScrollableBoxOptions extends ElementOptions {
  // All scrollable properties inherited from ScrollableOptions via ElementOptions
}

export interface ScrollableTextOptions extends ScrollableBoxOptions {
  // All scrollable properties inherited from ScrollableOptions via ElementOptions
}

export interface BoxOptions extends ScrollableTextOptions {
  bindings?: any;
}

export interface TextOptions extends ElementOptions {
  fill?: boolean;
  align?: TAlign;
}

export interface LineOptions extends BoxOptions {
  orientation?: "vertical" | "horizontal";
  type?: string;
  bg?: string;
  fg?: string;
  ch?: string;
}

export interface BigTextOptions extends BoxOptions {
  font?: string;
  fontBold?: string;
  fch?: string;
}

export interface ListOptions<TStyle extends ListElementStyle = ListElementStyle> extends BoxOptions {
  style?: TStyle;
  items?: string[];
  search?(err: any, value?: string): void;
  interactive?: boolean;
  invertSelected?: boolean;
}

export interface FileManagerOptions extends ListOptions<ListElementStyle> {
  cwd?: string;
}

export interface ListTableOptions extends ListOptions<StyleListTable> {
  rows?: string[];
  data?: string[][];
  pad?: number;
  noCellBorders?: boolean;
  style?: StyleListTable;
}

export interface ListbarOptions extends BoxOptions {
  style?: ListElementStyle;
  commands?: any[];
  items?: any[];
  autoCommandKeys?: boolean;
}

export interface FormOptions extends BoxOptions {
  keys?: any;
  vi?: boolean;
}

export interface InputOptions extends BoxOptions {}

export interface TextareaOptions extends InputOptions {
  inputOnFocus?: boolean;
  value?: string;
  keys?: boolean | string | string[];
  vi?: boolean;
}

export interface TextboxOptions extends TextareaOptions {
  secret?: boolean;
  censor?: boolean;
}

export interface ButtonOptions extends BoxOptions {
  hoverBg?: string;
  autoFocus?: boolean;
}

export interface CheckboxOptions extends BoxOptions {
  checked?: boolean;
  mouse?: boolean;
  text?: string;
}

export interface RadioSetOptions extends BoxOptions {}

export interface RadioButtonOptions extends CheckboxOptions {}

export interface PromptOptions extends BoxOptions {}

export interface QuestionOptions extends BoxOptions {}

export interface MessageOptions extends BoxOptions {}

export interface LoadingOptions extends BoxOptions {}

export interface ProgressBarOptions extends BoxOptions {
  orientation?: string;
  pch?: string;
  filled?: number;
  value?: number;
  keys?: boolean;
  mouse?: boolean;
  barFg?: string;
  barBg?: string;
  bch?: string;
  ch?: string;
}

export interface LogOptions extends ScrollableTextOptions {
  scrollback?: number;
  scrollOnInput?: boolean;
}

export interface TableOptions extends BoxOptions {
  rows?: string[][];
  data?: string[][];
  pad?: number;
  noCellBorders?: boolean;
  fillCellBorders?: boolean;
}

export interface TerminalOptions extends BoxOptions {
  handler?(userInput: Buffer): void;
  shell?: string;
  args?: any;
  cursor?: "line" | "underline" | "block";
  terminal?: string;
  term?: string;
  env?: any;
  cursorBlink?: boolean;
  screenKeys?: boolean;
}

export interface ImageOptions extends BoxOptions {
  file?: string;
  type?: "ansi" | "overlay" | "w3m";
  itype?: "ansi" | "overlay" | "w3m";
}

export interface ANSIImageOptions extends BoxOptions {
  file?: string;
  scale?: number;
  width?: number | string;
  height?: number | string;
  ascii?: string;
  animate?: boolean;
  speed?: number;
  optimization?: "mem" | "cpu";
}

export interface OverlayImageOptions extends BoxOptions {
  file?: string;
  ansi?: boolean;
  w3m?: string;
  search?: boolean;
  img?: string;
  autofit?: boolean;
}

export interface VideoOptions extends BoxOptions {
  file?: string;
  start?: number;
}

export interface LayoutOptions extends ElementOptions {
  renderer?(): void;
  layout?: "inline" | "inline-block" | "grid";
}

export interface IScreenOptions extends INodeOptions {
  program?: any;
  smartCSR?: boolean;
  fastCSR?: boolean;
  useBCE?: boolean;
  resizeTimeout?: number;
  tabSize?: number;
  autoPadding?: boolean;
  cursor?: Cursor;
  log?: string;
  dump?: string | boolean;
  debug?: boolean;
  ignoreLocked?: string[];
  dockBorders?: boolean;
  ignoreDockContrast?: boolean;
  fullUnicode?: boolean;
  sendFocus?: boolean;
  warnings?: boolean;
  forceUnicode?: boolean;
  input?: Writable;
  output?: Readable;
  tput?: any;
  focused?: BlessedElement;
  width?: TPosition;
  height?: TPosition;
  cols?: number;
  rows?: number;
  top?: TTopLeft;
  left?: TTopLeft;
  right?: TPosition;
  bottom?: TPosition;
  atop?: TTopLeft;
  aleft?: TTopLeft;
  aright?: TPosition;
  abottom?: TPosition;
  grabKeys?: boolean;
  lockKeys?: boolean;
  hover?: any;
  terminal?: string;
  title?: string;
}
