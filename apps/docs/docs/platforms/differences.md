---
sidebar_position: 3
---

# Platform Differences

Key differences between Node.js and Browser platforms.

## Quick Comparison

| Feature         | Node.js              | Browser                   |
| --------------- | -------------------- | ------------------------- |
| **Runtime**     | Native Node.js APIs  | Polyfills + XTerm.js      |
| **Terminal**    | Direct TTY           | XTerm.js emulation        |
| **File System** | Full access          | Bundled terminfo only     |
| **Process**     | Full process control | Limited polyfill          |
| **Exit**        | `process.exit()`     | Destroy screen + terminal |
| **Streams**     | Native streams       | stream-browserify         |
| **Buffer**      | Native Buffer        | buffer package            |
| **Performance** | Faster (native)      | Slower (emulation)        |
| **Bundle Size** | N/A                  | ~150KB gzipped            |
| **Mouse**       | Terminal-dependent   | Always available          |
| **Resize**      | SIGWINCH signal      | Window resize events      |

## Installation

### Node.js

```bash
pnpm add @unblessed/node
```

Includes:

- Node.js runtime implementation
- All core widgets
- Direct TTY support

### Browser

```bash
pnpm add @unblessed/browser xterm
```

Includes:

- Browser runtime with polyfills
- All core widgets
- XTerm.js integration

## Initialization

### Node.js

Automatic runtime initialization:

```typescript
import { Screen, Box } from "@unblessed/node";

// Runtime auto-initialized with Node.js APIs
const screen = new Screen();
```

### Browser

Requires XTerm.js terminal:

```typescript
import { Terminal } from "xterm";
import { Screen, Box } from "@unblessed/browser";

// Create and mount terminal
const term = new Terminal();
term.open(document.getElementById("terminal"));

// Runtime auto-initialized with polyfills
const screen = new Screen({ terminal: term });
```

## API Differences

### Screen Creation

**Node.js**:

```typescript
const screen = new Screen({
  input: process.stdin, // Node.js stream
  output: process.stdout, // Node.js stream
  terminal: "xterm-256color",
});
```

**Browser**:

```typescript
const screen = new Screen({
  terminal: term, // XTerm.js Terminal instance
});
```

### Exiting

**Node.js**:

```typescript
screen.key(["q", "C-c"], () => {
  process.exit(0); // Works in Node.js
});
```

**Browser**:

```typescript
screen.key(["q", "C-c"], () => {
  screen.destroy();
  term.dispose(); // Can't actually exit browser
});
```

### File Access

**Node.js**:

```typescript
import { readFileSync } from "fs";

const data = readFileSync("./config.json", "utf8");
box.setContent(data);
```

**Browser**:

```typescript
// Use fetch API instead
const response = await fetch("/api/config.json");
const data = await response.text();
box.setContent(data);
```

### Environment Variables

**Node.js**:

```typescript
const apiKey = process.env.API_KEY;
const isDev = process.env.NODE_ENV === "development";
```

**Browser**:

```typescript
// process.env is empty object
// Use build-time env variables instead
const apiKey = import.meta.env.VITE_API_KEY;
const isDev = import.meta.env.DEV;
```

## Feature Availability

### Available in Both

✅ All widgets (Box, List, Table, Form, etc.)
✅ Event system
✅ Keyboard input
✅ Mouse support
✅ Rendering pipeline
✅ Styling and colors
✅ Content tags
✅ Focus management

### Node.js Only

✅ Direct TTY control
✅ File system access
✅ Child processes
✅ Process signals (SIGINT, SIGTERM)
✅ Native streams
✅ `process.exit()`

### Browser Only

✅ XTerm.js integration
✅ DOM integration
✅ Full-screen mode
✅ Browser DevTools
✅ requestAnimationFrame
✅ ResizeObserver
✅ WebWorkers (for async tasks)

## Performance Differences

### Node.js

**Advantages**:

- Direct TTY access (no emulation)
- Faster rendering (~6.5ms empty screen)
- Lower memory usage
- Native Buffer operations

**Use cases**:

- CLI tools
- Server monitoring
- Build tools
- System utilities

### Browser

**Advantages**:

- Works in web browsers
- No installation required
- Cross-platform web apps
- Better for demos/documentation

**Trade-offs**:

- Slower rendering (~10-15ms empty screen)
- Higher memory usage
- Larger bundle size (~150KB)
- XTerm.js emulation overhead

**Use cases**:

- Web-based terminals
- Interactive documentation
- Browser DevTools
- Remote terminals

## Code Compatibility

### Write Once, Run Anywhere

Most code works identically:

```typescript
// Works in both Node.js and Browser!
import { Screen, Box, List } from "@unblessed/node"; // or browser

const screen = new Screen(/* platform-specific options */);

const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello World!",
  border: { type: "line" },
});

screen.key("q", () => {
  /* platform-specific cleanup */
});

screen.render();
```

### Platform Detection

Detect current platform:

```typescript
import { getRuntime } from "@unblessed/core/runtime-context";

const runtime = getRuntime();

if (runtime.process.platform === "browser") {
  // Browser-specific code
  console.log("Running in browser");
} else {
  // Node.js-specific code
  console.log("Running in Node.js");
}
```

### Conditional Imports

Use dynamic imports for platform-specific code:

```typescript
async function initApp() {
  if (typeof window !== "undefined") {
    // Browser
    const { Terminal } = await import("xterm");
    const { Screen } = await import("@unblessed/browser");

    const term = new Terminal();
    term.open(document.getElementById("terminal"));

    return new Screen({ terminal: term });
  } else {
    // Node.js
    const { Screen } = await import("@unblessed/node");
    return new Screen();
  }
}
```

## Migration Guide

### Node.js to Browser

1. **Add XTerm.js**:

```bash
pnpm add xterm @xterm/addon-fit
```

2. **Change imports**:

```typescript
// Before
import { Screen } from "@unblessed/node";

// After
import { Terminal } from "xterm";
import { Screen } from "@unblessed/browser";
```

3. **Create terminal**:

```typescript
// Add this
const term = new Terminal();
term.open(document.getElementById("terminal"));

// Update screen creation
const screen = new Screen({ terminal: term });
```

4. **Update file access**:

```typescript
// Before
import { readFileSync } from "fs";
const data = readFileSync("./data.txt", "utf8");

// After
const response = await fetch("/data.txt");
const data = await response.text();
```

5. **Update exit handling**:

```typescript
// Before
screen.key("q", () => process.exit(0));

// After
screen.key("q", () => {
  screen.destroy();
  term.dispose();
});
```

### Browser to Node.js

1. **Remove XTerm.js**:

```bash
pnpm remove xterm
```

2. **Change imports**:

```typescript
// Before
import { Terminal } from "xterm";
import { Screen } from "@unblessed/browser";

// After
import { Screen } from "@unblessed/node";
```

3. **Simplify screen creation**:

```typescript
// Before
const term = new Terminal();
term.open(element);
const screen = new Screen({ terminal: term });

// After
const screen = new Screen();
```

4. **Use Node.js APIs**:

```typescript
// Before
const response = await fetch("/data.txt");
const data = await response.text();

// After
import { readFileSync } from "fs";
const data = readFileSync("./data.txt", "utf8");
```

## Best Practices

### 1. Abstract Platform Differences

Create platform adapters:

```typescript
// platform.ts
export interface PlatformAdapter {
  createScreen(): Screen;
  readFile(path: string): Promise<string>;
  exit(): void;
}

// node-platform.ts
export class NodePlatform implements PlatformAdapter {
  createScreen() {
    return new Screen();
  }

  async readFile(path: string) {
    return readFileSync(path, "utf8");
  }

  exit() {
    process.exit(0);
  }
}

// browser-platform.ts
export class BrowserPlatform implements PlatformAdapter {
  constructor(private term: Terminal) {}

  createScreen() {
    return new Screen({ terminal: this.term });
  }

  async readFile(path: string) {
    const response = await fetch(path);
    return response.text();
  }

  exit() {
    // Can't exit browser
    console.log("Application closed");
  }
}
```

### 2. Feature Detection

Check for capabilities:

```typescript
function hasFileSystem(): boolean {
  try {
    const runtime = getRuntime();
    runtime.fs.existsSync("/");
    return true;
  } catch {
    return false;
  }
}

function canExit(): boolean {
  const runtime = getRuntime();
  return runtime.process.platform !== "browser";
}
```

### 3. Progressive Enhancement

Provide fallbacks:

```typescript
async function loadData(path: string) {
  const runtime = getRuntime();

  if (runtime.process.platform === "browser") {
    // Browser: fetch from server
    const response = await fetch(path);
    return response.json();
  } else {
    // Node.js: read from file system
    const data = readFileSync(path, "utf8");
    return JSON.parse(data);
  }
}
```

### 4. Shared Widgets

Write platform-agnostic widgets:

```typescript
export class StatusBar extends Box {
  constructor(options: BoxOptions) {
    super({
      ...options,
      height: 3,
      bottom: 0,
      left: 0,
      right: 0,
      style: { bg: "blue", fg: "white" },
    });
  }

  setStatus(message: string) {
    this.setContent(`  ${message}`);
    this.screen?.render();
  }
}

// Works in both platforms!
const status = new StatusBar({ parent: screen });
status.setStatus("Ready");
```

## Common Pitfalls

### ❌ Using process.exit() in Browser

```typescript
// DON'T
screen.key("q", () => process.exit(0)); // Throws error in browser

// DO
screen.key("q", () => {
  screen.destroy();
  if (typeof window === "undefined") {
    process.exit(0);
  }
});
```

### ❌ Assuming File System Exists

```typescript
// DON'T
const config = readFileSync("./config.json"); // Fails in browser

// DO
async function loadConfig() {
  if (hasFileSystem()) {
    return readFileSync("./config.json", "utf8");
  } else {
    const response = await fetch("/config.json");
    return response.text();
  }
}
```

### ❌ Forgetting XTerm.js in Browser

```typescript
// DON'T
const screen = new Screen(); // Missing terminal in browser

// DO
const term = new Terminal();
term.open(element);
const screen = new Screen({ terminal: term });
```

## Next Steps

- [Node.js Platform](./nodejs) - Node.js-specific features
- [Browser Platform](./browser) - Browser-specific features
- [Examples](/docs/examples) - Platform-specific examples
