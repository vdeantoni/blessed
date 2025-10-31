# @unblessed/react

React renderer for unblessed with flexbox layout support.

[![npm version](https://img.shields.io/npm/v/@unblessed/react)](https://www.npmjs.com/package/@unblessed/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

> ⚠️ **ALPHA SOFTWARE / WORK IN PROGRESS** - This package is under active development. Core functionality is implemented but not all features are complete yet.

## Overview

`@unblessed/react` enables building terminal UIs using React components and JSX, with automatic flexbox layout powered by Yoga.

**Features:**

- 🎨 **React components** - Build UIs with familiar JSX syntax
- 📦 **Flexbox layout** - Automatic positioning via Yoga layout engine
- 🎯 **TypeScript first** - Full type safety
- 🌐 **Platform-agnostic** - Works in Node.js and browsers

## Installation

```bash
npm install @unblessed/react@alpha react
# or
pnpm add @unblessed/react@alpha react
```

**Also install a runtime:**

```bash
# For Node.js
npm install @unblessed/node@alpha

# For browser
npm install @unblessed/browser@alpha
```

**Requirements:**

- Node.js >= 22.0.0
- React ^18.0.0 or ^19.0.0

## Quick Start

```tsx
// IMPORTANT: Import runtime first to initialize
import "@unblessed/node";

import { render, Box, Text, Spacer } from "@unblessed/react";

const App = () => (
  <Box flexDirection="column" padding={1} gap={1}>
    <Box borderStyle="single" padding={1}>
      <Text color="green" bold>
        Hello from React!
      </Text>
    </Box>

    <Box flexDirection="row" gap={2}>
      <Box width={20}>Left</Box>
      <Spacer />
      <Box width={20}>Right</Box>
    </Box>
  </Box>
);

render(<App />);
```

## Components

### Box

Container component with flexbox layout support.

```tsx
<Box
  flexDirection="row" // Layout direction
  gap={2} // Gap between children
  padding={1} // Padding
  borderStyle="single" // Border style
  borderColor="cyan" // Border color
  width={40} // Fixed width
  flexGrow={1} // Grow to fill space
>
  {/* children */}
</Box>
```

**Flexbox Props:**

- `flexDirection`: 'row' | 'column' | 'row-reverse' | 'column-reverse'
- `justifyContent`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'stretch'
- `flexGrow`, `flexShrink`, `flexBasis`
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
- `padding`, `paddingX`, `paddingY`, `paddingTop`, etc.
- `margin`, `marginX`, `marginY`, `marginTop`, etc.
- `gap`, `rowGap`, `columnGap`

**Styling Props:**

- `borderStyle`: 'single' | 'double' | 'round' | 'bold' | 'classic'
- `borderColor`, `borderTopColor`, `borderBottomColor`, etc.
- `color` - Text color
- `backgroundColor` - Background color

### Text

Text component with styling support.

```tsx
<Text
  color="green" // Text color
  bold // Bold text
  italic // Italic text
  dim // Dim text
>
  Hello World!
</Text>
```

**Props:**

- `color`, `backgroundColor`
- `bold`, `italic`, `underline`, `strikethrough`
- `inverse`, `dim`

### Spacer

Flexible space component that expands to fill available space.

```tsx
<Box flexDirection="row">
  <Box width={20}>Left</Box>
  <Spacer /> {/* Fills remaining space */}
  <Box width={20}>Right</Box>
</Box>
```

Equivalent to `<Box flexGrow={1} />`.

## Examples

### Dashboard Layout

```tsx
const Dashboard = () => (
  <Box flexDirection="column" width={80} height={24}>
    {/* Header */}
    <Box height={3} borderStyle="single">
      <Text bold>Dashboard</Text>
    </Box>

    {/* Content area */}
    <Box flexDirection="row" flexGrow={1}>
      {/* Sidebar */}
      <Box width={20} borderStyle="single">
        <Text>Menu</Text>
      </Box>

      {/* Main content */}
      <Box flexGrow={1} borderStyle="single">
        <Text>Content area</Text>
      </Box>
    </Box>
  </Box>
);

render(<Dashboard />);
```

### Centered Content

```tsx
const Centered = () => (
  <Box justifyContent="center" alignItems="center" width={80} height={24}>
    <Box borderStyle="double" padding={2}>
      <Text color="cyan" bold>
        Centered!
      </Text>
    </Box>
  </Box>
);
```

## Architecture

@unblessed/react builds on top of:

- **@unblessed/core** - Widget library and terminal rendering
- **@unblessed/layout** - Yoga flexbox layout engine
- **react-reconciler** - React's custom renderer API

**Flow:**

```
React Components
    ↓
React Reconciler (creates LayoutNodes)
    ↓
LayoutManager (Yoga calculations)
    ↓
unblessed Widgets (positioned)
    ↓
Terminal Rendering
```

## Current Status

**✅ Implemented:**

- Package structure and build system
- React reconciler configuration
- LayoutManager integration
- Box, Text, Spacer components
- render() function
- Border colors with per-side support
- Absolute positioning from Yoga

**🚧 In Progress:**

- Text content rendering (basic working)
- Padding edge cases
- Event handling
- Full test coverage

**📋 Planned:**

- useInput hook for keyboard input
- useApp hook for lifecycle
- Text wrapping support
- More components (List, Button, etc.)
- Comprehensive tests and examples

## Contributing

See the main [unblessed repository](https://github.com/vdeantoni/unblessed) for contribution guidelines.

## License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

## Related

- [@unblessed/core](../core) - Core TUI library
- [@unblessed/layout](../layout) - Flexbox layout engine
- [@unblessed/node](../node) - Node.js runtime
- [@unblessed/browser](../browser) - Browser runtime
