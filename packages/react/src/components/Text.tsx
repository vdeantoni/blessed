/**
 * Text.tsx - Text component for @unblessed/react
 */

import { forwardRef, type PropsWithChildren } from "react";
import type { TextProps } from "../types.js";

/**
 * Text component - Renders text with styling
 *
 * @example
 * ```tsx
 * <Text color="green" bold>
 *   Hello World!
 * </Text>
 * ```
 *
 * @example With nested text
 * ```tsx
 * <Text>
 *   Hello <Text color="red">World</Text>!
 * </Text>
 * ```
 */
export const Text = forwardRef<any, PropsWithChildren<TextProps>>(
  ({ children, ...props }, ref) => {
    return (
      <text ref={ref} {...props}>
        {children}
      </text>
    );
  },
);

Text.displayName = "Text";
