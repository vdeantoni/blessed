---
sidebar_position: 2
---

# Browser Platform

Running unblessed in web browsers with XTerm.js.

## Installation

```bash
npm install @unblessed/browser xterm
# or
pnpm add @unblessed/browser xterm
# or
yarn add @unblessed/browser xterm
```

## Quick Start

### HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
</head>
<body>
  <div id="terminal"></div>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

### JavaScript/TypeScript

```typescript
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Screen, Box } from '@unblessed/browser';

// Create XTerm terminal
const term = new Terminal({
  cursorBlink: false,
  fontSize: 14,
  theme: {
    background: '#1e1e1e',
    foreground: '#d4d4d4'
  }
});

// Add fit addon
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

// Open terminal in DOM
term.open(document.getElementById('terminal'));
fitAddon.fit();

// Create unblessed screen with terminal
const screen = new Screen({ terminal: term });

// Create widgets
const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello from Browser!',
  border: { type: 'line' },
  style: { border: { fg: 'cyan' } }
});

// Render
screen.render();
```

## Runtime Auto-Initialization

`@unblessed/browser` automatically initializes the browser runtime:

```typescript
import { Screen } from '@unblessed/browser';

// Runtime is automatically initialized with polyfills
// - File system polyfills with bundled terminfo
// - Process polyfills for events
// - Buffer polyfills
// - Stream polyfills

const screen = new Screen({ terminal: term });
```

## XTerm.js Integration

### Screen Creation

The Screen automatically detects and wraps XTerm.js:

```typescript
import { Terminal } from 'xterm';
import { Screen } from '@unblessed/browser';

const term = new Terminal();
term.open(element);

// Screen auto-creates XTermAdapter
const screen = new Screen({
  terminal: term,
  smartCSR: true,    // Enabled by default
  fastCSR: true,     // Enabled by default
  fullUnicode: true  // Enabled by default
});
```

### Terminal Options

Configure XTerm.js terminal:

```typescript
const term = new Terminal({
  // Display
  cursorBlink: true,
  cursorStyle: 'block',
  fontSize: 14,
  fontFamily: 'Monaco, monospace',

  // Size
  rows: 24,
  cols: 80,

  // Theme
  theme: {
    background: '#000000',
    foreground: '#ffffff',
    cursor: '#ffffff',
    black: '#000000',
    red: '#cd0000',
    green: '#00cd00',
    yellow: '#cdcd00',
    blue: '#0000ee',
    magenta: '#cd00cd',
    cyan: '#00cdcd',
    white: '#e5e5e5'
  },

  // Scrolling
  scrollback: 1000,

  // Selection
  allowTransparency: true,
  allowProposedApi: true
});
```

### Addons

Use XTerm.js addons:

```typescript
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';

const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();
const searchAddon = new SearchAddon();

term.loadAddon(fitAddon);
term.loadAddon(webLinksAddon);
term.loadAddon(searchAddon);

// Fit terminal to container
fitAddon.fit();
```

## Browser-Specific Features

### Responsive Sizing

Handle window resize:

```typescript
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

window.addEventListener('resize', () => {
  fitAddon.fit();
  screen.render();
});
```

### Full Screen Mode

Toggle full screen:

```typescript
const container = document.getElementById('terminal');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

screen.key('f', toggleFullScreen);
```

### Copy/Paste

Enable clipboard integration:

```typescript
// Browser handles copy automatically
// Paste with Ctrl+V or Cmd+V
term.onData((data) => {
  // Handle pasted data
  screen.program.write(data);
});
```

### Mouse Support

Mouse events work automatically:

```typescript
const box = new Box({
  parent: screen,
  mouse: true  // Enable mouse
});

box.on('click', (data) => {
  console.log('Clicked at:', data.x, data.y);
});

box.on('wheeldown', () => {
  box.scroll(1);
  screen.render();
});
```

## Polyfills

### File System

Limited file system with bundled terminfo:

```typescript
// Only bundled files are accessible
// Primarily used internally for terminfo

// Available files:
// - /usr/share/terminfo/x/xterm
// - /usr/share/terminfo/x/xterm-256color
// etc.
```

### Process

Process polyfill for events:

```typescript
// process.env - empty object in browser
console.log(process.env);  // {}

// process.platform - always 'browser'
console.log(process.platform);  // 'browser'

// process.exit() - throws error in browser
// Don't use process.exit() in browser code!
```

### Buffer

Full Buffer API via `buffer` package:

```typescript
import { Buffer } from 'buffer';

const buf = Buffer.from('Hello');
console.log(buf.toString());  // 'Hello'
```

### Streams

Stream polyfills via `stream-browserify`:

```typescript
import { Readable, Writable } from 'stream';

// Works like Node.js streams
const readable = new Readable();
readable.push('data');
```

## Building for Production

### Vite

Recommended bundler for browser apps:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      buffer: 'buffer/',
      stream: 'stream-browserify',
      util: 'util/'
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['buffer', 'stream-browserify', 'util']
  }
});
```

### Webpack

Configure webpack:

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
};
```

### Bundle Size

Optimize bundle size:

```typescript
// Only import what you need
import { Screen, Box, List } from '@unblessed/browser';

// Tree-shaking removes unused widgets
// Final bundle: ~150KB gzipped (including XTerm.js)
```

## Examples

### Interactive Dashboard

```typescript
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Screen, Box, List } from '@unblessed/browser';

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();

const screen = new Screen({ terminal: term });

const header = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: '{center}{bold}Dashboard{/bold}{/center}',
  tags: true,
  style: { bg: 'blue', fg: 'white' }
});

const sidebar = new List({
  parent: screen,
  top: 3,
  left: 0,
  width: '30%',
  height: '100%-3',
  items: ['Overview', 'Analytics', 'Settings'],
  keys: true,
  mouse: true,
  style: {
    selected: { bg: 'cyan', fg: 'black' }
  }
});

const content = new Box({
  parent: screen,
  top: 3,
  left: '30%',
  width: '70%',
  height: '100%-3',
  border: { type: 'line' }
});

sidebar.on('select', (item) => {
  content.setContent(`Selected: ${item.getText()}`);
  screen.render();
});

sidebar.focus();
screen.render();
```

### Live Code Editor

```typescript
import { Terminal } from 'xterm';
import { Screen, Box, Textbox } from '@unblessed/browser';

const term = new Terminal();
term.open(document.getElementById('terminal'));

const screen = new Screen({ terminal: term });

const editor = new Textbox({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: '50%',
  border: { type: 'line' },
  label: ' Editor ',
  inputOnFocus: true,
  keys: true,
  mouse: true
});

const output = new Box({
  parent: screen,
  top: '50%',
  left: 0,
  width: '100%',
  height: '50%',
  border: { type: 'line' },
  label: ' Output ',
  scrollable: true,
  mouse: true
});

editor.on('submit', (value) => {
  try {
    const result = eval(value);
    output.setContent(`> ${result}`);
  } catch (error) {
    output.setContent(`Error: ${error.message}`);
  }
  screen.render();
});

editor.focus();
screen.render();
```

## Performance Tips

### 1. Throttle Renders

Limit render frequency:

```typescript
let rafId: number | null = null;

function scheduleRender() {
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      screen.render();
      rafId = null;
    });
  }
}

// Use instead of direct screen.render()
box.setContent('Update');
scheduleRender();
```

### 2. Virtualize Long Lists

Only render visible items:

```typescript
class VirtualList extends List {
  renderVisibleItems() {
    const start = this.childBase;
    const end = start + this.height;

    // Only render items in view
    return this.items.slice(start, end);
  }
}
```

### 3. Debounce Resize

Prevent excessive re-renders:

```typescript
let resizeTimeout: number;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    fitAddon.fit();
    screen.render();
  }, 100);
});
```

## Debugging

### Console Logging

Debug to browser console:

```typescript
screen.on('keypress', (ch, key) => {
  console.log('Key:', key);
});

box.on('click', (data) => {
  console.log('Click:', data);
});
```

### DevTools

Use browser DevTools:

```typescript
// Expose screen globally for debugging
(window as any).screen = screen;

// In console:
// > screen.children
// > screen.render()
```

### Performance Profiling

Use Chrome DevTools Performance tab:

```typescript
console.time('render');
screen.render();
console.timeEnd('render');
```

## Limitations

### No Process.exit()

Can't exit browser:

```typescript
// ❌ Don't use
screen.key('q', () => process.exit(0));

// ✅ Use instead
screen.key('q', () => {
  screen.destroy();
  term.dispose();
});
```

### No File System

Limited to bundled files:

```typescript
// ❌ Won't work
fs.readFileSync('./myfile.txt');

// ✅ Fetch from server instead
fetch('/api/myfile.txt')
  .then(res => res.text())
  .then(data => box.setContent(data));
```

### No Child Processes

Can't spawn processes:

```typescript
// ❌ Not available
child_process.spawn('ls');

// ✅ Use web APIs instead
// - WebWorkers for background tasks
// - WebSockets for server communication
```

## Best Practices

### 1. Handle Terminal Lifecycle

Clean up properly:

```typescript
function cleanup() {
  screen.destroy();
  term.dispose();
}

window.addEventListener('beforeunload', cleanup);
```

### 2. Responsive Design

Adapt to container size:

```typescript
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

const resizeObserver = new ResizeObserver(() => {
  fitAddon.fit();
  screen.render();
});

resizeObserver.observe(container);
```

### 3. Error Boundaries

Catch and display errors:

```typescript
window.addEventListener('error', (event) => {
  errorBox.setContent(`Error: ${event.message}`);
  screen.render();
});
```

### 4. Progressive Enhancement

Detect browser capabilities:

```typescript
const hasClipboard = !!navigator.clipboard;
const hasFullscreen = !!document.fullscreenEnabled;

if (hasFullscreen) {
  screen.key('f', toggleFullScreen);
}
```

## Next Steps

- [Node.js Platform](./nodejs) - Running in Node.js
- [Platform Differences](./differences) - Key differences
- [Examples](/docs/examples) - More examples
