/**
 * Box.tsx - Box component for @unblessed/react
 */

import { forwardRef, type PropsWithChildren } from "react";
import type { BoxProps } from "../types.js";

/**
 * Box component - Container with flexbox layout support
 *
 * @example
 * ```tsx
 * <Box
 *   flexDirection="row"
 *   gap={2}
 *   padding={1}
 *   borderStyle="single"
 *   borderColor="cyan"
 * >
 *   <Box width={20}>Left</Box>
 *   <Box flexGrow={1}>Middle</Box>
 *   <Box width={20}>Right</Box>
 * </Box>
 * ```
 */
export const Box = forwardRef<any, PropsWithChildren<BoxProps>>(
  ({ children, ...props }, ref) => {
    return (
      <box ref={ref} {...props}>
        {children}
      </box>
    );
  },
);

Box.displayName = "Box";
