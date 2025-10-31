# Claude Context for @unblessed/react

This document provides architectural context and development guidelines for the `@unblessed/react` package.

## Overview

`@unblessed/react` is a **React renderer** for unblessed that enables building terminal UIs using JSX and React components, with automatic flexbox layouts powered by Yoga.

**Purpose:** Provide a modern, declarative API for building terminal UIs with React

**Status:** 🚧 **Alpha/Work in Progress** - Core functionality working, some features incomplete

## What This Package Does

Enables writing terminal UIs like this:

```tsx
import { Screen } from "@unblessed/node";
import { render, Box, Text, Spacer } from "@unblessed/react";

const screen = new Screen();

render(
  <Box flexDirection="row" gap={2}>
    <Box width={20} borderStyle="single" borderColor="cyan">
      <Text>Left</Text>
    </Box>
    <Spacer />
    <Box width={20} borderStyle="single" borderColor="green">
      <Text>Right</Text>
    </Box>
  </Box>,
  { screen },
);
```

Instead of imperative blessed-style code.

## Architecture

```
React Components (<Box>, <Text>)
    ↓
React Reconciler (creates/updates LayoutNodes)
    ↓
@unblessed/layout (Yoga calculations)
    ↓
unblessed widgets (positioned)
    ↓
Terminal rendering
```

### Key Components

**1. reconciler.ts** - React reconciler configuration

- Handles React component lifecycle (create, update, delete)
- Creates LayoutNodes via LayoutManager
- Triggers layout calculation on commit

**2. dom.ts** - Virtual DOM

- DOMNode wraps LayoutNode with React metadata
- TextNode for text content
- Tree manipulation (appendChild, removeChild, etc.)

**3. render.ts** - Main render() function

- Creates Screen and LayoutManager
- Mounts React tree
- Returns instance with unmount/rerender methods

**4. Components**

- Box.tsx - Container with flexbox props
- Text.tsx - Text with styling
- Spacer.tsx - flexGrow={1} shorthand

## Critical Learnings

### Border Color Handling

**Problem:** unblessed expects border colors as numbers, React uses strings.

**Solution:** Convert color names to numbers using `colors.convert()`:

```typescript
// In reconciler.ts
import { colors } from "@unblessed/core";

// Convert border colors
if (props.borderColor) {
  border.fg = colors.convert(props.borderColor as string); // "cyan" → 6
}
```

**Border property mapping:**

- React prop → unblessed Border interface
- `borderTopColor` → `topColor` (NOT `borderTopColor`)
- `borderBottomColor` → `bottomColor`
- `borderLeftColor` → `leftColor`
- `borderRightColor` → `rightColor`
- `borderDimColor` → `dim` (NOT `borderDim`)
- `borderTopDim` → `topDim`

### style.border.fg Initialization

**Problem:** Border color not showing even when `border.fg` was set correctly.

**Cause:** unblessed copies `border.fg` to `style.border.fg` during initialization, but only if `style.border` is an object.

**Solution:** Pre-populate `style.border.fg` ourselves:

```typescript
// In propsToWidgetOptions()
if (widgetOptions.border) {
  widgetOptions.style = widgetOptions.style || {};
  widgetOptions.style.border = widgetOptions.style.border || {};

  // Copy border.fg to style.border.fg (where unblessed reads it from)
  if (widgetOptions.border.fg !== undefined) {
    widgetOptions.style.border.fg = widgetOptions.border.fg;
  }
}
```

### Coordinate System

**Critical Decision:** Use **absolute coordinates** from Yoga, not relative.

```typescript
// ✅ Correct
const widget = new Box({
  top: yogaLayout.top,    // Absolute
  left: yogaLayout.left,
  ...
});
parentWidget.append(widget);  // append() handles absolute coords

// ❌ Wrong
const widget = new Box({
  top: yogaTop - parentTop - parentBorder - parentPadding,  // Don't do this
  ...
});
```

**Why:** When using `widget.append()`, unblessed handles coordinate translation automatically. We tried converting to relative coordinates (subtracting parent position, border, padding) but it broke - absolute coordinates work.

### Text Color vs Border Color Conflict

**Problem:** Setting `style.fg` on Box widgets conflicts with border color initialization.

**Cause:** unblessed skips copying `border.fg` to `style.border.fg` if `style` already exists.

**Solution:** Only set `style.fg/bg` for Text widgets, not Box widgets:

```typescript
// In widget-sync.ts
if (!isTextWidget && widgetOpts.style) {
  delete widgetOpts.style.fg; // Remove text colors from Box widgets
  delete widgetOpts.style.bg;
}
```

Box widgets should only have border colors in `style.border.*`, not text colors in `style.*`.

## Package Structure

```
packages/react/
├── src/
│   ├── index.ts              # Main exports
│   ├── types.ts              # TypeScript definitions
│   ├── dom.ts                # Virtual DOM (wraps LayoutNode)
│   ├── reconciler.ts         # React reconciler config
│   ├── render.ts             # render() function
│   └── components/
│       ├── Box.tsx           # Box component
│       ├── Text.tsx          # Text component
│       └── Spacer.tsx        # Spacer component
├── __tests__/
│   ├── setup.ts              # Test setup
│   └── render.test.tsx       # Basic rendering tests
├── examples/
│   └── hello-react.tsx       # Example app
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── vitest.config.ts
```

## How Props Flow

**React → Flexbox → Yoga:**

```tsx
<Box padding={1} border={1} borderColor="cyan">
```

**Reconciler splits props:**

```typescript
// flexboxProps (for Yoga layout)
{
  padding: 1,
  border: 1  // Tells Yoga to reserve space
}

// widgetOptions (for unblessed widget)
{
  border: {
    type: "line",
    style: "single",
    fg: 6  // Cyan converted to number
  },
  style: {
    border: { fg: 6 }  // Pre-populate for unblessed
  }
}
```

**LayoutManager:**

- Creates LayoutNode with flexbox props
- Stores widgetOptions for later

**Yoga calculates layout:**

- Accounts for border (1 char) in positioning

**widget-sync.ts:**

- Creates widget with Yoga coordinates + widgetOptions
- Spreads widgetOptions into widget constructor

## Current State

**✅ Working:**

- React reconciler integration
- Box, Text, Spacer components
- Flexbox layout (flexGrow, justifyContent, gap, etc.)
- Border styles and colors
- Absolute positioning
- 4 basic tests passing

**🚧 Known Issues:**

- Padding positioning (visual spacing correct but may have edge cases)
- Text content rendering (basic working, needs refinement)
- Event handling not implemented (no useInput, useApp hooks yet)
- No comprehensive test coverage

**📋 TODO:**

- Remove debug logging
- Fix remaining padding edge cases
- Add useInput hook for keyboard
- Add useApp hook for lifecycle
- Comprehensive tests
- Text wrapping support
- More component wrappers (List, Button, etc.)

## Testing

**Current tests (4):**

- Basic rendering without crashing
- Box component rendering
- Flexbox layout with flexGrow
- Spacer component

**To run:**

```bash
pnpm --filter @unblessed/react test
```

**Example to run:**

```bash
tsx packages/react/examples/hello-react.tsx
```

## Development Tips

### Running Examples in Development

Due to monorepo dual-package issues (source vs dist), examples need explicit runtime init:

```tsx
// WORKAROUND: In development
import { initCore } from "@unblessed/core";
import { NodeRuntime } from "@unblessed/node";
initCore(new NodeRuntime());
```

This won't be needed in production when packages are installed from npm.

### Debug Mode

Enable debug logging:

```tsx
render(<App />, {
  screen,
  debug: true, // Logs layout calculations
});
```

And in LayoutManager:

```tsx
const manager = new LayoutManager({ screen, debug: true });
```

### Border Props Checklist

When adding border support, remember:

1. ✅ Convert color strings to numbers (`colors.convert()`)
2. ✅ Map to correct Border interface names (`topColor` not `borderTopColor`)
3. ✅ Set `style.border.fg` explicitly (don't rely on unblessed copying)
4. ✅ Tell Yoga about border (`border: 1` in flexbox props)
5. ✅ Don't set `style.fg` on Box widgets (conflicts with border colors)

## Future Work

### Phase 2: Text Rendering

- Implement text wrapping
- Add Yoga measure function for text
- Support multi-line text

### Phase 3: Event Handling

- useInput hook for keyboard
- useApp hook for lifecycle
- useFocus hook for Tab navigation

### Phase 4: More Components

- List component wrapper
- Button component wrapper
- Form components
- ProgressBar, etc.

## Summary

**@unblessed/react** brings React's declarative component model to terminal UIs. It integrates React's reconciler with @unblessed/layout's Yoga engine and unblessed's rendering capabilities.

**Key insight:** The reconciler's job is to manage LayoutNodes, not widgets directly. LayoutManager handles the Yoga calculations and widget synchronization.

**Status:** Core functionality proven, ready for feature expansion.
