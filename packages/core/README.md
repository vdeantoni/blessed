# @tui/core

Platform-agnostic TUI (Text User Interface) core library with runtime dependency injection.

## Overview

`@tui/core` is a modern, TypeScript-based terminal UI library that provides a complete set of widgets and terminal control primitives. Unlike traditional terminal libraries, it's designed to be truly platform-agnostic through runtime dependency injection, allowing it to run in Node.js, browsers, and other JavaScript environments.

## Features

- **Platform-Agnostic**: Zero runtime dependencies on Node.js - works anywhere JavaScript runs
- **Runtime Injection**: Platform-specific implementations (fs, process, etc.) provided via dependency injection
- **Rich Widget Library**: Full set of interactive widgets (boxes, lists, forms, inputs, etc.)
- **Terminal Control**: Complete terminal manipulation (colors, cursor, mouse, keyboard)
- **Image Rendering**: PNG and GIF support with terminal rendering
- **TypeScript**: Full type safety with comprehensive type definitions
- **Terminfo Support**: Complete terminfo/termcap database integration

## Installation

```bash
npm install @tui/core
```

**Note**: You'll also need a platform adapter:

```bash
# For Node.js applications
npm install @tui/node

# For browser applications
npm install @tui/browser
```

## Quick Start

### Node.js

```typescript
import { Screen, Box } from '@tui/core';
import { createNodeRuntime } from '@tui/node';

// Initialize runtime for Node.js
createNodeRuntime();

// Create a screen
const screen = new Screen({
  smartCSR: true,
  title: 'My App'
});

// Create a box widget
const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#f0f0f0'
    }
  }
});

// Handle keyboard input
screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

// Render the screen
screen.render();
```

### Browser

```typescript
import { Screen, Box } from '@tui/core';
import { createBrowserRuntime } from '@tui/browser';

// Initialize runtime for browser
createBrowserRuntime();

// Create screen attached to a canvas or div
const screen = new Screen({
  terminal: document.getElementById('terminal')
});

// Rest is the same as Node.js...
```

## Architecture

### Runtime Dependency Injection

`@tui/core` uses a runtime abstraction layer that defines interfaces for all platform-specific operations:

```typescript
interface Runtime {
  fs: FileSystemAPI;      // File system operations
  path: PathAPI;          // Path manipulation
  process: ProcessAPI;    // Process information and I/O
  childProcess: ChildProcessAPI;
  tty: TtyAPI;
  buffer: BufferAPI;
  stream: StreamAPI;
  // ... and more
}
```

Platform adapters (`@tui/node`, `@tui/browser`) provide concrete implementations:

```typescript
// @tui/node provides Node.js implementations
import { createNodeRuntime } from '@tui/node';
createNodeRuntime();

// @tui/browser provides browser polyfills
import { createBrowserRuntime } from '@tui/browser';
createBrowserRuntime();
```

## Available Widgets

### Layout Widgets
- `Screen` - Root container and terminal manager
- `Box` - Basic rectangular container
- `Layout` - Grid-based layout manager
- `Line` - Horizontal or vertical line

### Interactive Widgets
- `List` - Scrollable list with selection
- `Form` - Form container with input handling
- `Input` / `Textbox` - Text input field
- `Textarea` - Multi-line text editor
- `Button` - Clickable button
- `Checkbox` - Toggle checkbox
- `RadioSet` / `RadioButton` - Radio button group
- `ProgressBar` - Progress indicator
- `FileManager` - File browser

### Display Widgets
- `Text` - Static text display
- `Log` - Scrollable log viewer
- `Table` - Data table with rows/columns
- `ListTable` - List displayed as table
- `Listbar` - Horizontal list/menu bar
- `Image` / `ANSIImage` / `OverlayImage` - Image rendering
- `Video` - Video playback
- `BigText` - Large ASCII art text
- `Terminal` - Embedded terminal emulator

### Specialized Widgets
- `ScrollableBox` - Box with scrolling
- `ScrollableText` - Text with scrolling
- `Message` / `Question` / `Loading` - Dialog helpers

## Core APIs

### Program API

Low-level terminal control:

```typescript
import { Program } from '@tui/core';

const program = new Program({
  input: process.stdin,
  output: process.stdout
});

program.alternateBuffer();
program.hideCursor();
program.enableMouse();
program.clear();
```

### Terminfo/Termcap

Terminal capability database:

```typescript
import { Tput } from '@tui/core';

const tput = new Tput({
  terminal: 'xterm-256color',
  extended: true
});

// Use terminal capabilities
tput.cup(10, 20);  // Move cursor to row 10, col 20
tput.setaf(4);     // Set foreground color to blue
```

### Colors

Color conversion and manipulation:

```typescript
import { colors } from '@tui/core';

// Convert hex to terminal color
const color = colors.convert('#ff0000');  // Returns closest terminal color

// Reduce color to palette
const reduced = colors.reduce(196, 256);  // Reduce to 256-color palette
```

## Styling

Widgets support comprehensive styling:

```typescript
const box = new Box({
  style: {
    fg: 'white',           // Foreground color
    bg: 'blue',            // Background color
    bold: true,
    underline: false,
    border: {
      fg: 'yellow',
      bg: 'black'
    },
    scrollbar: {
      bg: 'blue'
    },
    focus: {
      border: {
        fg: 'green'
      }
    },
    hover: {
      bg: 'cyan'
    }
  }
});
```

Colors can be:
- Named colors: `'red'`, `'blue'`, `'green'`
- Hex colors: `'#ff0000'`, `'#00ff00'`
- RGB: `'rgb(255, 0, 0)'`
- 256-color indices: `196`

## Events

All widgets emit events:

```typescript
box.on('click', (data) => {
  console.log('Clicked at', data.x, data.y);
});

box.on('keypress', (ch, key) => {
  if (key.name === 'enter') {
    // Handle enter key
  }
});

box.on('focus', () => {
  box.style.border.fg = 'green';
  screen.render();
});

box.on('blur', () => {
  box.style.border.fg = 'white';
  screen.render();
});
```

## Mouse Support

Enable mouse tracking:

```typescript
const screen = new Screen({
  mouse: true,
  sendFocus: true
});

box.on('mouse', (data) => {
  if (data.action === 'mousedown') {
    console.log('Mouse down at', data.x, data.y);
  }
});
```

## Keyboard Handling

```typescript
// Global key handling
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0);
});

// Widget-specific keys
box.key('enter', () => {
  console.log('Enter pressed on box');
});

// Key combinations
screen.key('C-s', () => {
  // Ctrl+S
});

screen.key('M-x', () => {
  // Alt+X
});
```

## Advanced Features

### Image Rendering

```typescript
import { ANSIImage } from '@tui/core';

const image = new ANSIImage({
  parent: screen,
  file: './image.png',
  width: '50%',
  height: '50%',
  ascii: true  // Use ASCII characters for better fidelity
});
```

### Forms and Input Validation

```typescript
import { Form, Textbox, Button } from '@tui/core';

const form = new Form({
  parent: screen,
  keys: true
});

const username = new Textbox({
  parent: form,
  name: 'username',
  label: 'Username:',
  inputOnFocus: true
});

const password = new Textbox({
  parent: form,
  name: 'password',
  label: 'Password:',
  censor: true
});

const submit = new Button({
  parent: form,
  content: 'Submit',
  top: 10
});

submit.on('press', () => {
  form.submit();
});

form.on('submit', (data) => {
  console.log('Form data:', data);
  // { username: '...', password: '...' }
});
```

### Scrollable Content

```typescript
import { ScrollableBox } from '@tui/core';

const box = new ScrollableBox({
  parent: screen,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: ' ',
    style: {
      bg: 'blue'
    }
  },
  keys: true,  // Enable vi-style scrolling keys
  mouse: true  // Enable mouse wheel scrolling
});

// Programmatic scrolling
box.scroll(10);      // Scroll down 10 lines
box.scroll(-5);      // Scroll up 5 lines
box.scrollTo(0);     // Scroll to top
box.setScrollPerc(50); // Scroll to 50%
```

### Terminal Emulation

```typescript
import { Terminal } from '@tui/core';

const terminal = new Terminal({
  parent: screen,
  shell: '/bin/bash',
  args: [],
  env: process.env,
  cwd: process.cwd(),
  width: '100%',
  height: '100%'
});

terminal.on('exit', (code) => {
  console.log('Terminal exited with code', code);
});
```

## API Documentation

For complete API documentation, see the TypeScript definitions included with the package. The library is fully typed with comprehensive JSDoc comments.

## Package Structure

```
@tui/core/
├── dist/
│   ├── index.js          # Main entry point
│   ├── runtime.js        # Runtime interfaces
│   └── widgets/          # Widget exports
├── data/
│   ├── terminfo/         # Terminfo database
│   └── fonts/            # Terminal fonts
└── types/                # TypeScript definitions
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm build:watch

# Run tests
pnpm test

# Watch tests
pnpm test:watch

# Lint
pnpm lint

# Format
pnpm format
```

## Testing

The library includes comprehensive tests covering:
- All widget types and behaviors
- Terminal control primitives
- Color conversion and manipulation
- Image rendering (PNG/GIF)
- Keyboard and mouse event handling
- Layout and positioning
- Scrolling and content management

Run tests with:

```bash
pnpm test
```

## Browser Support

When using `@tui/browser`, the library provides browser-compatible implementations using:
- Canvas rendering for terminal output
- WebSocket connections for PTY
- IndexedDB for file system operations
- Browser APIs for all platform operations

## Related Packages

- [`@tui/node`](../tui-node) - Node.js runtime adapter
- [`@tui/browser`](../tui-browser) - Browser runtime adapter with xterm.js integration

## Acknowledgments

This project is a modern TypeScript rewrite and enhancement of [blessed](https://github.com/chjj/blessed), the excellent terminal UI library by Christopher Jeffrey. While the architecture has been completely redesigned for platform-agnosticism, the core widget concepts and terminal handling draw inspiration from blessed's proven design.

## License

MIT

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/vdeantoni/tui) for contribution guidelines.

## Support

- GitHub Issues: https://github.com/vdeantoni/tui/issues
- Documentation: https://github.com/vdeantoni/tui/tree/master/packages/core
