/**
 * Style type definitions for blessed
 */

/**
 * Type for style color properties that can be static values or dynamic functions.
 * Dynamic functions are evaluated at render time with the element as context.
 * Colors can be strings (color names) or numbers (color codes).
 */
export type StyleColor =
  | string
  | number
  | ((element: any) => string | number | undefined);

/**
 * Type for style boolean properties that can be static values or dynamic functions.
 * Dynamic functions are evaluated at render time with the element as context.
 */
export type StyleBoolean = boolean | ((element: any) => boolean | undefined);

export interface StyleBorder {
  bg?: StyleColor;
  fg?: StyleColor;
}

export interface Effects {
  bg?: StyleColor;
  fg?: StyleColor;
  border?: StyleBorder;
}

export interface Style {
  /** Background color - can be static or a function evaluated at render time */
  bg?: StyleColor;
  /** Foreground color - can be static or a function evaluated at render time */
  fg?: StyleColor;
  ch?: string;
  /** Bold attribute - can be static or a function evaluated at render time */
  bold?: StyleBoolean;
  /** Underline attribute - can be static or a function evaluated at render time */
  underline?: StyleBoolean;
  /** Blink attribute - can be static or a function evaluated at render time */
  blink?: StyleBoolean;
  /** Inverse attribute - can be static or a function evaluated at render time */
  inverse?: StyleBoolean;
  /** Invisible attribute - can be static or a function evaluated at render time */
  invisible?: StyleBoolean;
  transparent?: boolean;
  border?: StyleBorder;
  hover?: Effects;
  focus?: Effects;
  label?: string;
  track?: { bg?: StyleColor; fg?: StyleColor };
  scrollbar?: { bg?: StyleColor; fg?: StyleColor };
  /** Progress bar fill style (for ProgressBar widget). Style object with fg/bg properties. */
  bar?: Partial<Style>;
  /** Prefix style (for Listbar widget). Style object with fg/bg properties. */
  prefix?: Partial<Style>;
}

export interface ListElementStyle extends Style {
  /**
   * Style for selected list item.
   * Kept as any to support truly dynamic styling properties.
   * Community @types/blessed also uses any for this property.
   */
  selected?: any;
  /**
   * Style for regular (unselected) list items.
   * Kept as any to support truly dynamic styling properties.
   * Community @types/blessed also uses any for this property.
   */
  item?: any;
}

export interface StyleListTable extends ListElementStyle {
  /**
   * Style for table header row.
   * Kept as any to support dynamic styling configurations.
   */
  header?: any;
  /**
   * Style for table cells.
   * Kept as any to support dynamic styling configurations.
   */
  cell?: any;
}

/**
 * Style for ProgressBar widget
 */
export interface ProgressBarStyle extends Style {
  // Inherits bar from base Style interface
}
