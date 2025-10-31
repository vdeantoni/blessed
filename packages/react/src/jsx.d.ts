/**
 * jsx.d.ts - JSX type definitions for @unblessed/react
 *
 * Declares the custom intrinsic JSX elements (box, text) that our reconciler handles.
 */

import type { BoxProps, TextProps } from "./types.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      box: BoxProps & { ref?: any };
      text: TextProps & { ref?: any };
      root: any;
    }
  }
}

export {};
