/**
 * Style type definitions for blessed
 */

export interface StyleBorder {
  bg?: string;
  fg?: string;
}

export interface Effects {
  bg?: string;
  fg?: string;
  border?: StyleBorder;
}

export interface Style {
  bg?: string;
  fg?: string;
  ch?: string;
  bold?: boolean;
  underline?: boolean;
  blink?: boolean;
  inverse?: boolean;
  invisible?: boolean;
  transparent?: boolean;
  border?: StyleBorder;
  hover?: Effects;
  focus?: Effects;
  label?: string;
  track?: { bg?: string; fg?: string };
  scrollbar?: { bg?: string; fg?: string };
}

export interface ListElementStyle extends Style {
  selected?: any;
  item?: any;
}

export interface StyleListTable extends ListElementStyle {
  header?: any;
  cell?: any;
}
