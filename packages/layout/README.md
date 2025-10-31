# @unblessed/layout

Flexbox layout engine for unblessed using Facebook's Yoga layout library.

[![npm version](https://img.shields.io/npm/v/@unblessed/layout)](https://www.npmjs.com/package/@unblessed/layout)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

> ⚠️ **ALPHA SOFTWARE** - This package is part of the unblessed alpha release. API may change between alpha versions.

## Overview

`@unblessed/layout` bridges Facebook's Yoga layout engine to unblessed widgets, enabling modern flexbox-style layouts in terminal UIs. It's designed to be the foundation for `@unblessed/react` and other framework integrations.

**Key Features:**

- 🎯 **Flexbox layout** powered by Yoga
- 🔄 **Automatic synchronization** between Yoga and unblessed widgets
- 🏗️ **Framework-agnostic** - Usable by React, Vue, Svelte, etc.
- 📦 **Zero changes to core** - Works with existing unblessed widgets
- 🧪 **Fully tested** - Comprehensive test coverage

## Installation

```bash
npm install @unblessed/layout@alpha
# or
pnpm add @unblessed/layout@alpha
```

**Requirements:** Node.js >= 22.0.0

## Quick Start

```typescript
import { Screen } from "@unblessed/node";
import { LayoutManager } from "@unblessed/layout";

const screen = new Screen();
const manager = new LayoutManager({ screen });

// Create flexbox container
const container = manager.createNode("container", {
  flexDirection: "row",
  gap: 2,
  padding: 1,
});

// Create children with flexbox properties
const left = manager.createNode(
  "left",
  { width: 20, height: 5 },
  { content: "Left", border: { type: "line" } },
);

const spacer = manager.createNode("spacer", { flexGrow: 1 });

const right = manager.createNode(
  "right",
  { width: 20, height: 5 },
  { content: "Right", border: { type: "line" } },
);

// Build tree
manager.appendChild(container, left);
manager.appendChild(container, spacer);
manager.appendChild(container, right);

// Calculate layout and render
manager.performLayout(container);

// Result: Left and Right boxes separated by flexible space
```

## Architecture

### How It Works

```
React/Framework → LayoutManager → Yoga Layout → unblessed Widgets
```

1. **Framework Layer** creates layout nodes with flexbox props
2. **LayoutManager** applies props to Yoga nodes
3. **Yoga calculates** actual positions (top, left, width, height)
4. **Widget Sync** creates/updates unblessed widgets with calculated positions
5. **unblessed renders** to terminal

### The Key Principle

**Yoga is always the source of truth for positions.**

Every time `performLayout()` is called:

1. Yoga recalculates layout
2. Widget positions are OVERWRITTEN with Yoga's output
3. This prevents desynchronization

## API Reference

### LayoutManager

Main class for managing flexbox layouts.

```typescript
const manager = new LayoutManager({
  screen: Screen,
  debug?: boolean
});
```

#### Methods

**`createNode(type, flexboxProps, widgetOptions)`**

Creates a new layout node.

```typescript
const node = manager.createNode(
  "box", // Type identifier
  {
    // Flexbox props
    flexGrow: 1,
    width: "50%",
    padding: 2,
  },
  {
    // unblessed widget options
    content: "Hello",
    border: { type: "line" },
    style: { fg: "cyan" },
  },
);
```

**`appendChild(parent, child)`**

Appends a child node to parent.

```typescript
manager.appendChild(parent, child);
```

**`insertBefore(parent, child, referenceChild)`**

Inserts child before reference child.

**`removeChild(parent, child)`**

Removes child from parent.

**`performLayout(rootNode)`**

Calculates layout and syncs widgets. This is the main function that:

1. Runs Yoga layout calculation
2. Extracts computed positions
3. Creates/updates unblessed widgets
4. Renders the screen

```typescript
manager.performLayout(rootNode);
```

**`destroy(node)`**

Cleans up layout node and all resources.

```typescript
manager.destroy(rootNode);
```

### Flexbox Properties

All standard flexbox properties are supported:

**Container Properties:**

- `flexDirection`: 'row' | 'column' | 'row-reverse' | 'column-reverse'
- `justifyContent`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'stretch'
- `flexWrap`: 'nowrap' | 'wrap' | 'wrap-reverse'
- `gap`, `rowGap`, `columnGap`: number

**Item Properties:**

- `flexGrow`: number (default: 0)
- `flexShrink`: number (default: 1)
- `flexBasis`: number | string
- `alignSelf`: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch'

**Dimensions:**

- `width`, `height`: number | string ('50%' | 'auto')
- `minWidth`, `minHeight`: number | string
- `maxWidth`, `maxHeight`: number | string

**Spacing:**

- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `paddingX`, `paddingY`
- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `marginX`, `marginY`

**Other:**

- `position`: 'relative' | 'absolute'
- `display`: 'flex' | 'none'

## Examples

### Space Between Layout

```typescript
const container = manager.createNode("container", {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 80,
});

const left = manager.createNode("left", { width: 20 }, { content: "Left" });
const right = manager.createNode("right", { width: 20 }, { content: "Right" });

manager.appendChild(container, left);
manager.appendChild(container, right);

manager.performLayout(container);
// Result: Left at position 0, Right at position 60 (80-20)
```

### Centered Layout

```typescript
const container = manager.createNode("container", {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  height: 24,
});

const box = manager.createNode(
  "box",
  { width: 40, height: 10 },
  { content: "Centered!", border: { type: "line" } },
);

manager.appendChild(container, box);
manager.performLayout(container);
// Result: Box centered in terminal
```

### Responsive Grid

```typescript
const grid = manager.createNode("grid", {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 1,
});

for (let i = 0; i < 9; i++) {
  const cell = manager.createNode(
    `cell-${i}`,
    { width: 25, height: 7 },
    { content: `Cell ${i + 1}`, border: { type: "line" } },
  );
  manager.appendChild(grid, cell);
}

manager.performLayout(grid);
// Result: 3x3 grid with automatic wrapping
```

## Use Cases

### 1. Framework Integration

Primary use case - building React/Vue/Svelte renderers:

```typescript
// In @unblessed/react reconciler
const manager = new LayoutManager({ screen });

// React creates components → reconciler creates layout nodes
const node = manager.createNode("box", reactProps);

// React reconciler commits → trigger layout
manager.performLayout(rootNode);
```

### 2. Standalone Layout

Can be used directly for complex layouts:

```typescript
// Build dashboard with flexbox
const dashboard = buildDashboard(manager);
manager.performLayout(dashboard);

// Update on resize
screen.on("resize", () => {
  manager.performLayout(dashboard);
});
```

## Technical Details

### Yoga Integration

Uses Yoga 3.1.0+ for layout calculations:

- Full flexbox specification support
- Gap support (flexbox gap)
- Percentage and auto sizing
- Efficient layout algorithm

### Widget Synchronization

**One-way data flow:**

```
Yoga (source of truth) → unblessed widgets
```

Widgets never modify their own positions - only Yoga does. This prevents:

- ❌ Desynchronization between layout and widgets
- ❌ Race conditions
- ❌ Unpredictable behavior

### Memory Management

Always clean up to prevent leaks:

```typescript
// When done with layout
manager.destroy(rootNode);

// Also clean up screen
screen.destroy();
```

Yoga nodes must be explicitly freed - this is handled automatically by `destroy()`.

## Limitations

- **Declarative only** - Widget positions controlled by Yoga, not imperative APIs
- **No drag-and-drop** - Can't use `widget.enableDrag()` with Yoga-managed layouts
- **Recalculates on every update** - Full layout recalculation (fast, but be aware)

These are intentional trade-offs for predictable, maintainable layouts.

## Performance

Yoga layout is fast:

- Simple layout (3-5 nodes): < 1ms
- Complex layout (50-100 nodes): < 5ms
- Very complex (500+ nodes): ~20-30ms

Benchmarked on modern hardware (M1/M2 Macs, modern Intel CPUs).

## Contributing

See the main [unblessed repository](https://github.com/vdeantoni/unblessed) for contribution guidelines.

## License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

## Related

- [@unblessed/core](../core) - Core TUI library
- [@unblessed/node](../node) - Node.js runtime adapter
- [@unblessed/react](../react) - React renderer (coming soon)
- [Yoga Layout](https://yogalayout.com/) - Layout engine
