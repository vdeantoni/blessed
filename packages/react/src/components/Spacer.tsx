/**
 * Spacer.tsx - Spacer component for @unblessed/react
 */

import { Box } from "./Box.js";

/**
 * Spacer component - Flexible space that expands to fill available space
 *
 * This is a convenience component that renders a Box with flexGrow={1}.
 * It's useful for creating space-between layouts.
 *
 * @example
 * ```tsx
 * <Box flexDirection="row">
 *   <Box width={20}>Left</Box>
 *   <Spacer />
 *   <Box width={20}>Right</Box>
 * </Box>
 * ```
 */
export const Spacer = () => {
  return <Box flexGrow={1} />;
};

Spacer.displayName = "Spacer";
