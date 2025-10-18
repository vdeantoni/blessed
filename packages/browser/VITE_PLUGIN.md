# @tui/browser Vite Plugin

## The Problem

The browser runtime must be initialized **before** any `@tui/core` code executes. However, ESM import hoisting means imports are always executed before module-level code, making it impossible to guarantee initialization order with normal bundling.

## The Solution: Vite Plugin

The vite plugin injects runtime initialization code directly into the HTML `<head>`, ensuring it runs before any bundled JavaScript modules load.

## Usage

### 1. Install the plugin in your vite.config.ts:

```typescript
import { defineConfig } from 'vite';
import tuiBrowser from '@tui/browser/vite-plugin';

export default defineConfig({
  plugins: [tuiBrowser()],
});
```

### 2. Use @tui/browser in your app:

```typescript
import { Screen, Box } from '@tui/browser';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

// Create xterm terminal
const term = new Terminal();
term.open(document.getElementById('terminal')!);

// Create screen (automatically sets up xterm adapter)
const screen = new Screen({ terminal: term });

// Use widgets
const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello from tui in the browser!',
  border: { type: 'line' }
});

screen.render();
```

## How It Works

1. **Plugin injects script into HTML** - The vite plugin adds a `<script type="module">` to the HTML head
2. **Script imports and initializes runtime** - The injected script:
   - Imports `BrowserRuntime` and `setRuntime`
   - Sets up global polyfills (`Buffer`, `process`)
   - Creates and registers the runtime via `setRuntime()`
3. **Main app loads** - Your bundled app loads and can safely use `@tui/core` widgets

## Plugin Options

```typescript
interface TuiBrowserPluginOptions {
  /**
   * Whether to optimize dependencies
   * @default true
   */
  optimizeDeps?: boolean;
}
```

## Without the Plugin (Standalone)

If you're not using Vite or want to initialize manually, you can do it in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { Buffer } from 'buffer';
    import { setRuntime } from '@tui/core';
    import { BrowserRuntime } from '@tui/browser';

    // Set up polyfills
    globalThis.Buffer = Buffer;

    // Initialize runtime
    const runtime = new BrowserRuntime();
    setRuntime(runtime);
    globalThis.__TUXE_BROWSER_INITIALIZED__ = true;
  </script>
</head>
<body>
  <div id="terminal"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

## Troubleshooting

### "Runtime not initialized" error

This means the runtime wasn't set up before `@tui/core` tried to use it. Make sure:

1. The vite plugin is installed and configured in vite.config.ts
2. The plugin is listed **before** other plugins that might bundle code
3. You've refreshed your browser (hard refresh with Cmd+Shift+R or Ctrl+Shift+R)

### Plugin not working

Check your browser console - you should see:
```
[tui-browser] Runtime initialized via vite plugin
```

If you don't see this message, the plugin's HTML injection may have failed. Check that:
- Your HTML has a `<head>` tag
- You're using vite's dev server (not a static file server)

## Development

The plugin source is in `packages/browser/src/vite-plugin/index.ts`.

Key points:
- Uses `transformIndexHtml` hook with `order: 'pre'` to inject before other transformations
- Injects runtime initialization as a module script (not inline script)
- Guards against double-initialization with `__TUXE_BROWSER_INITIALIZED__` flag
