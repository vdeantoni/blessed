/**
 * types.ts - Type definitions for @unblessed/react
 */

import { Screen } from "@unblessed/core";
import type { FlexboxProps } from "@unblessed/layout";
import type { ReactNode } from "react";

/**
 * Props for Box component (container with flexbox layout)
 */
export interface BoxProps extends FlexboxProps {
  /**
   * Content to display in the box
   */
  children?: ReactNode;

  /**
   * Border style (applied to all sides)
   */
  borderStyle?: "single" | "double" | "round" | "bold" | "classic";

  /**
   * Border color (applied to all sides)
   */
  borderColor?: string;

  /**
   * Dim all borders
   */
  borderDimColor?: boolean;

  /**
   * Per-side border colors
   */
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;

  /**
   * Per-side border dim flags
   */
  borderTopDim?: boolean;
  borderBottomDim?: boolean;
  borderLeftDim?: boolean;
  borderRightDim?: boolean;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Foreground color
   */
  color?: string;

  /**
   * Whether to parse {tags} in content
   */
  tags?: boolean;
}

/**
 * Props for Text component (text rendering with styling)
 */
export interface TextProps {
  /**
   * Text content
   */
  children?: ReactNode;

  /**
   * Text color
   */
  color?: string;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Bold text
   */
  bold?: boolean;

  /**
   * Italic text
   */
  italic?: boolean;

  /**
   * Underline text
   */
  underline?: boolean;

  /**
   * Strikethrough text
   */
  strikethrough?: boolean;

  /**
   * Inverse colors
   */
  inverse?: boolean;

  /**
   * Dim text
   */
  dim?: boolean;
}

/**
 * Options for the render() function
 */
export interface RenderOptions {
  /**
   * Screen instance to render to (required)
   * Create this from @unblessed/node or @unblessed/browser
   */
  screen: Screen;

  /**
   * Debug mode - logs render cycles
   */
  debug?: boolean;
}

/**
 * Instance returned by render()
 */
export interface RenderInstance {
  /**
   * Unmount the React tree and clean up
   */
  unmount: () => void;

  /**
   * Re-render with new element
   */
  rerender: (element: ReactNode) => void;

  /**
   * Wait for exit (Promise that resolves when unmounted)
   */
  waitUntilExit: () => Promise<void>;
}
