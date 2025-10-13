# @vdeantoni/blessed-browser

Browser-compatible version of the blessed TUI library with xterm.js integration.

## Features

- ✅ **Zero Configuration** - Just import and use, no setup required!
- ✅ Runs blessed TUI apps in the browser using xterm.js
- ✅ Auto-initialized polyfills for Node.js APIs
- ✅ Inlined terminfo/termcap data (no filesystem dependencies)
- ✅ TypeScript support
- ✅ ESM and IIFE bundles
- ✅ Works with any bundler (Vite, webpack, parcel, rollup) or no bundler (CDN)
- ⚠️ Some widgets unavailable (filemanager, video, image processing)

## Installation

```bash
npm install @vdeantoni/blessed-browser xterm
```

## Quick Start

That's it - just 3 lines of code! No bundler config, no manual polyfills, no complex setup.

```typescript
import { Terminal } from 'xterm';
import { createXTermScreen } from '@vdeantoni/blessed-browser';
import 'xterm/css/xterm.css';

// Create xterm.js terminal
const term = new Terminal();
term.open(document.getElementById('terminal'));

// Create blessed screen - that's it!
const screen = createXTermScreen({ terminal: term });

// Use blessed API as normal
const box = screen.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello from blessed in the browser!',
  border: { type: 'line' }
});

screen.append(box);
screen.render();

// Handle quit
screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});
```

## Example

See the `example/` directory for a complete demo application.

```bash
cd example
npm install
npm run dev
```

## API

### `createXTermScreen(options)`

Creates a blessed screen instance configured for xterm.js with auto-initialization.

**Options:**
- `terminal` (Terminal, required): xterm.js Terminal instance
- `mouse` (boolean, optional): Enable mouse support (default: true)
- `term` (string, optional): Terminal type (default: 'xterm-256color')

**Returns:** A blessed Screen instance ready to use

## Limitations

The following widgets are not available in browser build due to Node.js dependencies:
- `filemanager` - uses fs extensively
- `video` - uses child_process
- `ansiimage` - uses child_process
- `overlayimage` - uses child_process
- `bigtext` - uses fs

All other blessed widgets work as expected.

## How It Works

1. **Auto-Initialization**: Node.js globals (process, Buffer) are automatically set up when you import the package
2. **Polyfills**: Node.js APIs (fs, child_process, net, tty) are stubbed with no-ops or browser-compatible alternatives
3. **Terminfo/Termcap**: Data is inlined at build time (no filesystem access needed)
4. **xterm.js Integration**: XTermAdapter bridges blessed's Program API to xterm.js Terminal
5. **Build**: Self-contained bundles work with any bundler or directly in the browser

## Advanced Usage

### Optional: Vite Plugin for Optimization

If you're using Vite and want additional optimizations for dev mode, you can optionally use the Vite plugin:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import blessedBrowser from '@vdeantoni/blessed-browser/vite-plugin';

export default defineConfig({
  plugins: [blessedBrowser()]
});
```

**Note**: The plugin is **completely optional**. blessed-browser works perfectly without it. The plugin just provides:
- Better HMR in dev mode
- Slightly smaller dev bundles
- Auto-configured aliases for your own imports

### Manual XTermAdapter Usage

For more control, use the XTermAdapter directly:

```typescript
import { XTermAdapter, blessed } from '@vdeantoni/blessed-browser';

const adapter = new XTermAdapter({
  terminal: term,
  mouse: true,
});

const screen = blessed.screen({
  input: adapter as any,
  output: adapter as any,
  terminal: 'xterm-256color',
});
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run example
cd example
pnpm dev
```

## License

MIT - Original blessed by Christopher Jeffrey, browser port by Victor De Antoni

## Related

- [blessed](https://github.com/vdeantoni/blessed) - Original blessed library (modernized)
- [xterm.js](https://github.com/xtermjs/xterm.js) - Terminal emulator for the web
