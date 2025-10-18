# @tui/browser

Browser runtime adapter for [@tui/core](../core) - Run terminal UIs in the browser with xterm.js integration.

[![npm version](https://img.shields.io/npm/v/@tui/browser)](https://www.npmjs.com/package/@tui/browser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

## Overview

`@tui/browser` enables terminal user interface (TUI) applications built with `@tui/core` to run in web browsers. It provides:

- **Browser polyfills** for Node.js APIs (fs, process, path, etc.)
- **xterm.js integration** for terminal rendering
- **Runtime adapter** that bridges @tui/core to the browser environment
- **Full widget support** - all @tui/core widgets work in the browser

## Installation

```bash
npm install @tui/browser xterm
# or
pnpm add @tui/browser xterm
# or
yarn add @tui/browser xterm
```

## Quick Start

### Basic Example

```typescript
import { Terminal } from 'xterm';
import { Screen, Box } from '@tui/browser';
import 'xterm/css/xterm.css';

// Create xterm.js terminal
const term = new Terminal({
  cursorBlink: true,
  fontSize: 14,
});

// Mount to DOM
term.open(document.getElementById('terminal')!);

// Create screen - automatically sets up xterm adapter
const screen = new Screen({ terminal: term });

// Build your TUI
const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}Hello from the browser!{/bold}',
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

// Handle key events
screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

// Render
box.focus();
screen.render();
```

### HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tui Browser Example</title>
  <link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #000;
    }
    #terminal {
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="terminal"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

## API Reference

### `Screen`

Browser-specific Screen class that automatically handles xterm.js integration.

```typescript
import { Screen } from '@tui/browser';
import { Terminal } from 'xterm';

const term = new Terminal();
term.open(document.getElementById('terminal')!);

const screen = new Screen({
  terminal: term,           // xterm.js Terminal instance (required)
  mouse: true,             // Enable mouse support (default: true)
  term: 'xterm-256color'   // Terminal type (default: 'xterm-256color')
});
```

**Options:**
- `terminal` (Terminal) - xterm.js Terminal instance - automatically creates XTermAdapter
- `mouse` (boolean) - Enable mouse events (default: true)
- `term` (string) - Terminal type string (default: 'xterm-256color')
- All standard ScreenOptions from @tui/core

**Returns:** Screen instance with xterm.js integration

### `XTermAdapter`

Low-level adapter for manual setup (rarely needed).

```typescript
import { XTermAdapter } from '@tui/browser';

const adapter = new XTermAdapter({
  terminal: term,
  mouse: true
});

// Use as input/output for custom Screen setup
```

### Runtime Access

Access the browser runtime for advanced use cases:

```typescript
import { getRuntime } from '@tui/core';

const runtime = getRuntime();
// Provides: fs, path, process, Buffer, etc.
// Runtime is automatically initialized when you import @tui/browser
```

> **Note:** The runtime is automatically initialized when you import from `@tui/browser`. You don't need to call any initialization functions.

### Widget Re-exports

All @tui/core widgets are re-exported for convenience:

```typescript
import { Box, List, Input, Form, Button } from '@tui/browser';

const box = new Box({ parent: screen, /* ... */ });
const list = new List({ parent: screen, /* ... */ });
```

## Features

### ✅ Complete Node.js API Polyfills

- **File System** - Virtual FS with terminfo/font data
- **Process** - Browser-compatible process object
- **Path** - Cross-platform path utilities
- **Buffer** - Full Buffer support
- **Events** - EventEmitter implementation
- **Streams** - Readable/Writable streams

### ✅ Full Widget Support

All @tui/core widgets work in the browser:
- Layout: Box, Layout, Line
- Input: Input, Textarea, Button, Checkbox, RadioButton, Form
- Display: Text, Log, List, Table, FileManager
- Advanced: ProgressBar, Loading, Terminal (limited)

### ✅ Mouse & Keyboard Events

Full support for:
- Click, hover, drag events
- Keyboard shortcuts
- Focus management
- Mouse wheel scrolling

### ✅ xterm.js Integration

- Terminal rendering via xterm.js
- Automatic resize handling
- SGR mouse encoding
- 256 color support

## Examples

### Interactive Form

```typescript
import { Form, Input, Button } from '@tui/browser';

const form = new Form({
  parent: screen,
  keys: true,
  left: 'center',
  top: 'center',
  width: 50,
  height: 12,
  border: { type: 'line' },
  label: ' Login '
});

const username = new Input({
  parent: form,
  name: 'username',
  top: 1,
  left: 1,
  height: 1,
  width: 45,
  label: ' Username: '
});

const password = new Input({
  parent: form,
  name: 'password',
  top: 3,
  left: 1,
  height: 1,
  width: 45,
  label: ' Password: ',
  censor: true
});

const submit = new Button({
  parent: form,
  top: 6,
  left: 'center',
  shrink: true,
  padding: { left: 2, right: 2 },
  content: 'Submit',
  style: {
    bg: 'blue',
    focus: { bg: 'red' }
  }
});

submit.on('press', () => {
  form.submit();
});

form.on('submit', (data) => {
  console.log('Form submitted:', data);
});

screen.render();
```

### File Manager

```typescript
import { FileManager } from '@tui/browser';

const fm = new FileManager({
  parent: screen,
  border: { type: 'line' },
  style: {
    border: { fg: 'cyan' },
    selected: { bg: 'blue' }
  },
  height: 'shrink',
  width: 'shrink',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}%path{/blue-fg} ',
  cwd: '/',
  keys: true,
  vi: true,
  scrollbar: {
    bg: 'white'
  }
});

fm.on('file', (file) => {
  console.log('Selected file:', file);
});

screen.render();
```

### Real-time Data Display

```typescript
import { Log } from '@tui/browser';

const log = new Log({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: { type: 'line' },
  label: ' Live Logs ',
  tags: true,
  scrollable: true,
  mouse: true,
  keys: true,
  vi: true,
  scrollbar: {
    ch: ' ',
    inverse: true
  }
});

// Simulate streaming logs
setInterval(() => {
  const timestamp = new Date().toISOString();
  const level = ['INFO', 'WARN', 'ERROR'][Math.floor(Math.random() * 3)];
  const color = { INFO: 'green', WARN: 'yellow', ERROR: 'red' }[level];

  log.log(`{${color}-fg}[${timestamp}]{/} {bold}${level}{/}: Sample log message`);
  screen.render();
}, 1000);
```

## Build Configuration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@tui/browser', '@tui/core']
  },
  resolve: {
    alias: {
      // If needed for older bundlers
      buffer: 'buffer/',
      process: 'process/browser'
    }
  }
});
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify')
    }
  }
};
```

## Architecture

### How It Works

1. **Runtime Abstraction**: @tui/core uses a runtime interface for all platform operations
2. **Browser Runtime**: This package provides browser-compatible implementations
3. **Automatic Initialization**: Runtime is set up when you import @tui/browser
4. **Widget Compatibility**: All widgets use the runtime interface, so they work unchanged

### Polyfills Provided

- `process` - Browser-compatible process object with env, platform, events
- `Buffer` - Full Buffer API via the buffer package
- `fs` - Virtual file system with bundled terminfo/font data
- `path` - Path manipulation via path-browserify
- `util` - Browser-compatible util.inspect and util.format
- Event system - Full EventEmitter support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any browser supporting ES2020

## Limitations

- No real file system access (virtual FS only)
- No child process support (Terminal widget limited)
- No native TTY detection (always reports TTY)
- Performance may vary on complex UIs

## Troubleshooting

### Module not found errors

If you see module resolution errors, ensure your bundler is configured to handle Node.js polyfills. See [Build Configuration](#build-configuration).

### Blank terminal

Make sure xterm.css is loaded:
```html
<link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
```

### Mouse events not working

Ensure mouse is enabled (it's enabled by default):
```typescript
new Screen({ terminal: term, mouse: true })
```

## Contributing

See the main [tui repository](https://github.com/vdeantoni/tui) for contribution guidelines.

## License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

## Related

- [@tui/core](../core) - Core TUI library
- [@tui/node](../node) - Node.js runtime adapter
- [xterm.js](https://xtermjs.org/) - Terminal emulator for the web
