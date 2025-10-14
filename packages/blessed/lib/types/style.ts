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
