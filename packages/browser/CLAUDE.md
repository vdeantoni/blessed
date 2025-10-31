# Claude Context for @unblessed/browser

This document provides architectural context and development guidelines for the `@unblessed/browser` package.

## Overview

`@unblessed/browser` is a **browser runtime adapter** that enables @unblessed/core TUI applications to run in web browsers. It provides:

- Browser-compatible implementations of Node.js APIs
- XTerm.js integration for terminal rendering
- Automatic polyfill setup (process, Buffer, fs, path, etc.)
- Full widget support - all @unblessed/core widgets work unchanged

**Status:** ✅ **Fully functional** - All tests passing, dev server running

## Architecture

### Core Principle: Browser Compatibility Layer

`@unblessed/browser` bridges `@unblessed/core` (platform-agnostic) to the browser environment by:

1. **Providing BrowserRuntime** - Implements the Runtime interface with browser polyfills
2. **XTermAdapter** - Bridges Program API to xterm.js Terminal
3. **Auto-initialization** - Runtime set up automatically when importing the package
4. **Virtual filesystem** - Bundles necessary data (terminfo, fonts)

### Key Components

**BrowserRuntime** (`src/runtime/browser-runtime.ts`)

- Implements Runtime interface with browser polyfills
- Virtual filesystem with bundled terminfo/font data
- Uses npm packages for standard APIs (`util`, `stream-browserify`, `path-browserify`)
- Only custom code for filesystem (bundled data) and process (event management)
- ~257 lines (simplified from original ~319 lines)

**Auto-initialization** (`src/runtime/auto-init.ts`)

- Sets up global polyfills (process, Buffer, global)
- Creates and registers BrowserRuntime
- Runs automatically when package is imported
- ~90 lines (simplified from original ~390 lines)

**XTermAdapter** (`src/adapters/xterm-adapter.ts`)

- Bridges Program API to xterm.js Terminal
- Handles keyboard and mouse events
- Converts DOM events to terminal sequences

**Index** (`src/index.ts`)

- Entry point with runtime initialization
- Re-exports all @unblessed/core widgets
- Exports browser-specific Screen and XTermAdapter

**Vite Plugin** (`src/vite-plugin/index.ts`)

- Optional optimization plugin for Vite users
- Configures module resolution and dependency optimization
- Handles Node.js polyfills in browser environment

## Recent Improvements

**Code Organization (October 2025)**:

- ✅ Extracted BrowserRuntime to separate file (`browser-runtime.ts`)
- ✅ Simplified auto-init.ts from ~390 lines to ~90 lines
- ✅ Fixed duplicate utils assignment bug
- ✅ Removed HTML transform from Vite plugin (redundant with auto-init)
- ✅ Added deprecation warnings to `blessed` namespace
- ✅ **Replaced custom polyfills with npm packages** (62 lines saved)
  - Custom `browserUtil` → `util` package (inspect, format)
  - EventEmitter stream stubs → `stream-browserify` (Readable, Writable)
- ✅ All 20 unit tests passing

**Code Reduction Summary**:

- Initial: ~1,118 total lines
- After extraction: ~820 lines (~300 lines saved)
- After polyfill replacement: ~758 lines (~62 more lines saved)
- **Total reduction: ~360 lines (32% smaller)**

**Architecture Improvements**:

- Better separation of concerns (runtime vs initialization)
- Using battle-tested npm polyfills instead of custom code
- Single source of truth for polyfills
- Only custom code that's truly necessary (fs with bundled data)
- Cleaner, more maintainable codebase

## Runtime Initialization

### Critical: Auto Initialization

The runtime MUST be initialized **before** any @unblessed/core modules load:

```typescript
// src/runtime/auto-init.ts
import { setRuntime } from "@unblessed/core";

// Create BrowserRuntime with polyfills
const runtime = new BrowserRuntime();
setRuntime(runtime); // Register globally

console.log("[tui-browser] Runtime initialized");
```

**Why?** When `export * from '@unblessed/core'` executes in index.ts, widget modules load and some access `getRuntime()` during initialization. Without prior setup, you get "Runtime not initialized" errors.

## Global Polyfills

### Process Polyfill

Set up before any imports in `auto-init.ts`:

```typescript
if (typeof globalThis.process === 'undefined') {
  const listeners = new Map<string, Set<Function>>();

  (globalThis as any).process = {
    platform: 'browser',
    env: { TERM: 'xterm-256color' },
    cwd: () => '/',
    exit: (code?: number) => { /* ... */ },
    on: (event: string, listener: Function) => { /* ... */ },
    removeListener: (event: string, listener: Function) => { /* ... */ },
    removeAllListeners: (event?: string) => { /* ... */ },
    listeners: (event: string) => Function[] => { /* ... */ },
    nextTick: (fn: Function, ...args: any[]) => setTimeout(fn, 0, ...args),
  };
}
```

**Key Methods:**

- `removeAllListeners` - Used by program.ts in unshiftEvent()
- `listeners` - Used by screen.ts for event management
- `nextTick` - Implemented via setTimeout(fn, 0)

### Buffer Polyfill

```typescript
import { Buffer } from "buffer";

if (typeof globalThis.Buffer === "undefined") {
  (globalThis as any).Buffer = Buffer;
}
```

**Why global?** Some code uses `Buffer.from()` without importing it.

### Util Polyfill

Custom implementation to avoid circular dependencies:

```typescript
const browserUtil = {
  inspect: (obj: any, options?: any): string => {
    /* ... */
  },
  format: (format: string, ...args: any[]): string => {
    /* ... */
  },
};

this.util = browserUtil as Runtime["util"];
```

**Do NOT** import `import util from 'util'` - it causes "process is not defined" errors.

## XTerm.js Integration

### XTermAdapter

Implements a minimal Program-like interface for @unblessed/core:

```typescript
export class XTermAdapter extends EventEmitter {
  private terminal: Terminal;

  constructor(options: XTermAdapterOptions) {
    super();
    this.terminal = options.terminal;
    this.setupKeyboardHandling();
    this.setupMouseHandling();
    this.setupDataHandling();
  }

  // Implements write() for Program compatibility
  write(data: string): boolean {
    this.terminal.write(data);
    return true;
  }
}
```

### Mouse Event Encoding

Converts DOM MouseEvents to terminal sequences (SGR format):

```typescript
function encodeMouseEvent(e: MouseEvent, action: string): string {
  const col = Math.floor(e.offsetX / cellWidth);
  const row = Math.floor(e.offsetY / cellHeight);
  const button = e.button;
  const cb = action === "mousemove" ? 32 : button;

  return `\x1b[<${cb};${col + 1};${row + 1}M`; // SGR encoding
}
```

## File System Polyfill

### Virtual FS with Bundled Data

The browser can't access real files, so we bundle necessary data:

```typescript
import xtermData from "@unblessed/core/data/terminfo/xterm-256color.json";
import terU14n from "@unblessed/core/data/fonts/ter-u14n.json";
import terU14b from "@unblessed/core/data/fonts/ter-u14b.json";

// In BrowserRuntime
this.fs = {
  readFileSync: (filePath: PathLike, encoding?: any) => {
    const pathStr = filePath.toString();

    if (pathStr.includes("xterm")) {
      // Return bundled terminfo
      const base64Data = xtermData.data;
      const buffer = Buffer.from(atob(base64Data), "binary");
      return encoding ? buffer.toString(encoding) : buffer;
    }

    if (pathStr.endsWith("ter-u14n.json")) {
      return JSON.stringify(terU14n);
    }

    // ... handle other bundled files
    throw new Error(`File not found: ${pathStr}`);
  },
  // ... other fs methods
};
```

### What's Bundled

- `xterm-256color` terminfo (base64 encoded binary)
- `ter-u14n.json` - Terminal font data (normal)
- `ter-u14b.json` - Terminal font data (bold)

## Common Issues & Solutions

### Issue: "Runtime not initialized"

**Cause:** Runtime accessed before auto-initialization completes.

**Solution:** Runtime auto-initializes when you import from `@unblessed/browser`. Ensure you import from `@unblessed/browser` (not `@unblessed/core` directly) at the entry point of your application.

### Issue: "process is not defined"

**Cause:** Code tries to access `process` before polyfill is loaded.

**Solution:** Ensure process polyfill is at the TOP of runtime.ts, before any other imports (even type-only imports can cause issues due to ESM hoisting).

### Issue: "Buffer is not defined"

**Cause:** Code uses Buffer without importing it, and it's not global.

**Solution:** Set `globalThis.Buffer = Buffer` in runtime.ts.

### Issue: "removeAllListeners is not a function"

**Cause:** Process polyfill missing this method.

**Solution:** Add to process polyfill:

```typescript
removeAllListeners: (event?: string) => {
  if (event) listeners.delete(event);
  else listeners.clear();
};
```

### Issue: ESM Import Hoisting

**Problem:** Even type-only imports execute before top-level code:

```typescript
import { Buffer } from "buffer"; // Executes FIRST
globalThis.Buffer = Buffer; // Executes SECOND
```

**Solution:** Put all polyfill setup BEFORE any imports.

## Development Guidelines

### Adding New Runtime APIs

If @unblessed/core needs a new Node.js API:

1. **Add to Runtime interface** in @unblessed/core:

```typescript
export interface Runtime {
  // ... existing
  newAPI: NewAPIType;
}
```

2. **Implement in BrowserRuntime**:

```typescript
export class BrowserRuntime implements Runtime {
  constructor() {
    // ...
    this.newAPI = {
      method: () => {
        /* browser implementation */
      },
    };
  }
}
```

3. **Test with e2e tests** in `__tests__/e2e/`

### Module Load Order

**Correct order** in runtime.ts:

1. Type-only imports (`import type`)
2. Buffer import and global assignment
3. Process polyfill setup
4. Util polyfill setup
5. Regular imports
6. Class definition

### Avoiding Module-Level process Access

**Bad:**

```typescript
const TERM = process.env.TERM; // Fails if process not defined yet

export class Foo {
  // ...
}
```

**Good:**

```typescript
import { getRuntime } from "./runtime-context.js";

export class Foo {
  getTerm() {
    return getRuntime().process.env.TERM;
  }
}
```

## Build System

### tsup Configuration

```typescript
export default defineConfig({
  entry: {
    index: "src/index.ts",
    runtime: "src/runtime.ts",
  },
  format: ["esm", "cjs"], // ESM for modern, CJS for compat
  dts: true,
  sourcemap: true,
  external: ["xterm"], // xterm is a peer dependency
  noExternal: ["buffer", "events", "path-browserify", "string_decoder"], // Bundle polyfills
});
```

### Key Points

- **ESM** for modern bundlers (Vite, Rollup)
- **CJS** for older tools (webpack 4)
- Bundle all polyfills except xterm
- Source maps for debugging

## Vite Plugin

The browser runtime must be initialized **before** any `@unblessed/core` code executes. However, ESM import hoisting means imports are always executed before module-level code, making it impossible to guarantee initialization order with normal bundling.

### The Solution

The vite plugin injects runtime initialization code directly into the HTML `<head>`, ensuring it runs before any bundled JavaScript modules load.

### Usage

**1. Install the plugin in your vite.config.ts:**

```typescript
import { defineConfig } from "vite";
import tuiBrowser from "@unblessed/browser/vite-plugin";

export default defineConfig({
  plugins: [tuiBrowser()],
});
```

**2. Use @unblessed/browser in your app:**

```typescript
import { Screen, Box } from "@unblessed/browser";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

// Create xterm terminal
const term = new Terminal();
term.open(document.getElementById("terminal")!);

// Create screen (automatically sets up xterm adapter)
const screen = new Screen({ terminal: term });

// Use widgets
const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello from unblessed in the browser!",
  border: { type: "line" },
});

screen.render();
```

### How It Works

1. **Plugin injects script into HTML** - The vite plugin adds a `<script type="module">` to the HTML head
2. **Script imports and initializes runtime** - The injected script:
   - Imports `BrowserRuntime` and `setRuntime`
   - Sets up global polyfills (`Buffer`, `process`)
   - Creates and registers the runtime via `setRuntime()`
3. **Main app loads** - Your bundled app loads and can safely use `@unblessed/core` widgets

### Plugin Options

```typescript
interface TuiBrowserPluginOptions {
  /**
   * Whether to optimize dependencies
   * @default true
   */
  optimizeDeps?: boolean;
}
```

### Without the Plugin (Standalone)

If you're not using Vite or want to initialize manually, you can do it in your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { Buffer } from "buffer";
      import { setRuntime } from "@unblessed/core";
      import { BrowserRuntime } from "@unblessed/browser";

      // Set up polyfills
      globalThis.Buffer = Buffer;

      // Initialize runtime
      const runtime = new BrowserRuntime();
      setRuntime(runtime);
      globalThis.__TUI_BROWSER_INITIALIZED__ = true;
    </script>
  </head>
  <body>
    <div id="terminal"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### Troubleshooting

**"Runtime not initialized" error:**

This means the runtime wasn't set up before `@unblessed/core` tried to use it. Make sure:

1. The vite plugin is installed and configured in vite.config.ts
2. The plugin is listed **before** other plugins that might bundle code
3. You've refreshed your browser (hard refresh with Cmd+Shift+R or Ctrl+Shift+R)

**Plugin not working:**

Check your browser console - you should see:

```
[tui-browser] Runtime initialized via vite plugin
```

If you don't see this message, the plugin's HTML injection may have failed. Check that:

- Your HTML has a `<head>` tag
- You're using vite's dev server (not a static file server)

## Testing Strategy

### Unit Tests (`__tests__/*.test.ts`)

Test runtime polyfills in isolation:

- Process polyfill event system
- Buffer operations
- Path operations
- XTermAdapter methods

### E2E Tests (`__tests__/e2e/*.spec.ts`)

Test full widget rendering with Playwright:

- Widget creation and display
- User interactions (click, type, etc.)
- Layout and styling
- Examples from examples/ directory

### Test Helpers (`__tests__/e2e/fixtures/`)

Reusable test utilities:

- `tui-page.ts` - Page object for common operations
- `example-runner.ts` - Load and run example files

## Performance Considerations

### Terminal Rendering

- XTermAdapter buffers writes, flushes on nextTick
- Use `smartCSR: true` to minimize redraws
- Virtual scrollback limited to 1000 lines

### Memory Management

- Screen.destroy() removes all event listeners
- XTermAdapter.destroy() cleans up DOM handlers
- Clear intervals/timeouts on widget destroy

### Bundle Size

- Core + Browser runtime: ~1.2MB minified
- With all widgets: ~1.5MB minified

## Future Enhancements

### Potential Improvements

1. **Worker Thread Support** - Run terminal logic in web worker
2. **Canvas Rendering** - Direct canvas rendering for better performance
3. **WebGL Renderer** - GPU-accelerated text rendering
4. **IndexedDB FS** - Persistent virtual file system
5. **WASM Terminal** - Compile terminfo parsing to WASM
6. **Clipboard API** - Real copy/paste support
7. **Touch Support** - Mobile-friendly interactions

### Architecture Considerations

- Keep runtime adapter thin - complex logic in @unblessed/core
- Minimize browser-specific code
- Test in multiple browsers (not just Chrome)
- Consider bundle size impact of new features

## Debugging Tips

### Enable Debug Logging

```typescript
const screen = new Screen({
  terminal: term,
  debug: true,
  log: "console", // Or file path (won't work in browser)
});
```

### Inspect Runtime State

```typescript
import { getRuntime } from "@unblessed/core";

const runtime = getRuntime();
console.log("Platform:", runtime.process.platform);
console.log("Env:", runtime.process.env);
console.log("FS methods:", Object.keys(runtime.fs));
```

### Browser DevTools

- Network tab: Check if xterm.css loaded
- Console: Look for polyfill setup logs
- Elements: Inspect xterm DOM structure
- Performance: Profile render cycles

### Common Breakpoints

- `runtime/auto-init.ts` - Runtime initialization
- `xterm-adapter.ts:write()` - Terminal output
- `screen.ts` - Browser Screen creation
- Widget render methods - Layout issues

## Migration from Blessed

### Key Differences

- **No real FS access** - Use virtual FS or HTTP for data
- **No child processes** - Terminal widget won't work
- **Different I/O model** - Uses xterm.js instead of TTY
- **Browser constraints** - No SIGTERM, etc.

### Compatibility Notes

- 95% of blessed widgets work unchanged
- Image widgets need adaptation (use canvas)
- File operations limited to virtual FS
- Terminal widget (pty.js based) won't work

## Resources

- [xterm.js API](https://xtermjs.org/docs/api/terminal/)
- [Node.js Process API](https://nodejs.org/api/process.html)
- [Buffer polyfill](https://github.com/feross/buffer)
- [path-browserify](https://github.com/browserify/path-browserify)
- [@unblessed/core CLAUDE.md](../core/CLAUDE.md)

## Getting Help

When debugging issues:

1. Check if @unblessed/browser is imported (runtime auto-initializes on import)
2. Verify global polyfills are set (`process`, `Buffer`)
3. Look for ESM hoisting issues (imports before polyfills)
4. Test in a clean browser profile (disable extensions)
5. Compare with working examples in `examples/`

## Summary

The key to @unblessed/browser is understanding the **initialization order**:

1. Global polyfills set up (process, Buffer)
2. Runtime created and registered
3. @unblessed/core modules loaded
4. XTerm adapter bridges to browser
5. Widgets work unchanged!

Always remember: **Runtime MUST be ready BEFORE any @unblessed/core module tries to use it.**
