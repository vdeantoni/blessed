# @tui/node

Node.js runtime adapter for [@tui/core](../core) - Build beautiful terminal UIs with ease.

[![npm version](https://img.shields.io/npm/v/@tui/node)](https://www.npmjs.com/package/@tui/node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

## Overview

`@tui/node` brings the power of `@tui/core` terminal UI widgets to Node.js applications. It provides a Node.js runtime adapter that handles all platform-specific operations automatically.

**Features:**
- 🚀 **Auto-initialization** - Runtime sets up automatically on import
- 📦 **Zero configuration** - Just import and use
- 🎨 **Rich widget library** - 30+ widgets for building TUIs
- ⌨️ **Full keyboard & mouse support** - Interactive user interfaces
- 🎯 **TypeScript first** - Complete type safety
- 🔧 **Compatible** - Works with the original blessed API

## Installation

```bash
npm install @tui/node
# or
pnpm add @tui/node
# or
yarn add @tui/node
```

## Quick Start

```typescript
import { Screen, Box } from '@tui/node';

// Runtime auto-initializes - no setup needed!

const screen = new Screen({
  smartCSR: true,
  title: 'Hello Tuxe'
});

const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}{cyan-fg}Hello, World!{/cyan-fg}{/bold}\n\nPress {inverse} q {/inverse} to quit.',
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: '#f0f0f0' }
  }
});

screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

box.focus();
screen.render();
```

## Available Widgets

### Layout Widgets
- **Screen** - Root container for the application
- **Box** - Basic container with borders and styling
- **Layout** - Automatic layout manager (horizontal/vertical)
- **Line** - Horizontal or vertical line

### Input Widgets
- **Form** - Form container
- **Input** - Single-line text input
- **Textarea** - Multi-line text input
- **Textbox** - Editor-style text input
- **Button** - Clickable button
- **Checkbox** - Toggle checkbox
- **RadioButton** - Radio button
- **RadioSet** - Group of radio buttons

### Display Widgets
- **Text** - Static or dynamic text
- **List** - Scrollable list of items
- **ListTable** - Table with list-style rows
- **Table** - Grid-based table
- **Log** - Scrolling log widget
- **ProgressBar** - Progress indicator
- **Loading** - Loading spinner
- **Message** - Modal message box
- **Question** - Yes/no question dialog
- **Prompt** - Input prompt dialog
- **BigText** - ASCII art text
- **Image** - PNG/GIF image renderer
- **ANSIImage** - ANSI art image
- **OverlayImage** - Layered image
- **FileManager** - File browser
- **Listbar** - Navigation bar

### Container Widgets
- **ScrollableBox** - Box with scrolling
- **ScrollableText** - Text with scrolling

## Examples

Check out the [examples directory](./examples) for complete examples:

- **[hello-world.ts](./examples/hello-world.ts)** - Simple centered box
- **[interactive.ts](./examples/interactive.ts)** - Interactive form with inputs and buttons
- **[dashboard.ts](./examples/dashboard.ts)** - Complex dashboard with live updates

Run examples:
```bash
pnpm tsx examples/hello-world.ts
pnpm tsx examples/interactive.ts
pnpm tsx examples/dashboard.ts
```

## Common Patterns

### Creating Widgets

Always use `parent:` to attach widgets to their container:

```typescript
const container = new Box({
  parent: screen,  // Attach to screen
  // ... options
});

const button = new Button({
  parent: container,  // Attach to container
  // ... options
});
```

### Event Handling

```typescript
// Global keyboard shortcuts
screen.key(['escape', 'q'], () => {
  process.exit(0);
});

// Widget-specific events
button.on('press', () => {
  console.log('Button clicked!');
});

// Mouse events
box.on('click', (data) => {
  console.log('Clicked at', data.x, data.y);
});
```

### Styling

Use inline tags or style objects:

```typescript
// Inline tags
const text = new Text({
  parent: screen,
  content: '{bold}{red-fg}Error:{/red-fg}{/bold} Something went wrong',
  tags: true
});

// Style object
const box = new Box({
  parent: screen,
  style: {
    fg: 'white',
    bg: 'blue',
    border: { fg: 'cyan' },
    hover: { bg: 'green' },
    focus: { border: { fg: 'yellow' } }
  }
});
```

### Focus Management

```typescript
// Set initial focus
input.focus();

// Tab navigation
input.key('tab', () => {
  button.focus();
});

button.key('tab', () => {
  list.focus();
});
```

## API Reference

### Screen

The root container for your application.

```typescript
const screen = new Screen({
  smartCSR: true,      // Smart cursor save/restore
  fastCSR: true,       // Fast CSR for terminals that support it
  title: 'My App',     // Window title
  cursor: {
    artificial: true,  // Artificial cursor
    shape: 'block',    // Cursor shape
    blink: true        // Blinking cursor
  },
  fullUnicode: true,   // Full Unicode support
  dockBorders: true,   // Dock borders to edges
  ignoreDockContrast: true
});
```

### Box

Basic container widget.

```typescript
const box = new Box({
  parent: screen,
  top: 0,              // Position (number or string)
  left: 0,
  width: '50%',        // Size (number or string)
  height: 10,
  content: 'Hello',    // Text content
  tags: true,          // Enable inline tags
  border: {
    type: 'line'       // 'line', 'bg', or custom characters
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: { fg: 'cyan' }
  },
  padding: {
    left: 2,
    right: 2,
    top: 1,
    bottom: 1
  },
  scrollable: true,    // Enable scrolling
  mouse: true,         // Enable mouse events
  keys: true,          // Enable keyboard events
  vi: true            // Vi-style navigation
});
```

For complete widget options, see [@tui/core types](../core/src/types/options.ts).

## Architecture

`@tui/node` is a thin wrapper over `@tui/core` that:

1. **Provides NodeRuntime** - Implements the Runtime interface with Node.js APIs
2. **Auto-initializes** - Sets up the runtime when you import the package
3. **Re-exports widgets** - All `@tui/core` widgets available directly

```typescript
// Internal structure (simplified)
import { initCore } from '@tui/core';
import fs from 'fs';
import process from 'process';
// ... other Node.js modules

const runtime = {
  fs,
  process,
  // ... other Node.js APIs
};

// Initialize @tui/core with Node.js runtime
initCore(runtime);

// Re-export all widgets
export * from '@tui/core';
```

This means you get:
- ✅ Full Node.js file system access
- ✅ Real process I/O (stdin/stdout/stderr)
- ✅ Child process support (for Terminal widget)
- ✅ Native TTY detection
- ✅ All Node.js modules available

## Terminal Compatibility

Tested and supported terminals:

**macOS:**
- iTerm2 ✅
- Terminal.app ✅
- Alacritty ✅
- Kitty ✅

**Linux:**
- gnome-terminal ✅
- konsole ✅
- xterm ✅
- rxvt-unicode ✅

**Windows:**
- Windows Terminal ✅
- ConEmu ✅
- PowerShell ✅

**Multiplexers:**
- tmux ✅
- screen ✅

## Environment Variables

- `TERM` - Terminal type (default: auto-detected)
- `COLORTERM` - Color support indicator
- `NO_COLOR` - Disable colors when set

## Troubleshooting

**Terminal not rendering correctly?**
```bash
export TERM=xterm-256color
node your-app.js
```

**Mouse not working?**
- Check if your terminal supports mouse events
- Ensure `mouse: true` is set on widgets
- Some terminals in tmux/screen need additional config

**Widgets not showing?**
- Verify `parent: screen` is used for all top-level widgets
- Call `screen.render()` after creating widgets
- Check widget positioning (top, left, width, height)

**Keyboard input not working?**
- Widget must have focus: `widget.focus()`
- Enable keyboard: `keys: true`
- Use `screen.key()` for global shortcuts

## Migration from blessed

`@tui/node` is designed to be compatible with blessed:

```typescript
// Old blessed code
const blessed = require('blessed');
const screen = blessed.screen();

// New @tui/node code
import { Screen } from '@tui/node';
const screen = new Screen();
```

Or use `@tui/blessed` for 100% backward compatibility:

```bash
npm install @tui/blessed
```

## Performance

`@tui/node` is optimized for terminal rendering:

- **Smart CSR** - Only updates changed regions
- **Efficient diffing** - Minimal escape sequences
- **Buffered writes** - Batched terminal output
- **Event coalescing** - Reduced re-renders

Tips for best performance:
1. Use `smartCSR: true` in screen options
2. Batch widget updates before `render()`
3. Use `alwaysScroll: false` when possible
4. Limit expensive operations in render loops

## Contributing

See the main [tuxe repository](https://github.com/vdeantoni/tuxe) for contribution guidelines.

## License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

## Related

- [@tui/core](../core) - Core TUI library
- [@tui/browser](../browser) - Browser runtime adapter
- [@tui/blessed](../blessed) - Backward-compatible blessed API
- [blessed](https://github.com/chjj/blessed) - Original library
