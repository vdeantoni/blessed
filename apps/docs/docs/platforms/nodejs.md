---
sidebar_position: 1
---

# Node.js Platform

Using unblessed in Node.js applications.

## Installation

```bash
npm install @unblessed/node
# or
pnpm add @unblessed/node
# or
yarn add @unblessed/node
```

## Quick Start

```typescript
import { Screen, Box } from "@unblessed/node";

// Create screen
const screen = new Screen({
  smartCSR: true,
  title: "My TUI App",
});

// Create widget
const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello from Node.js!",
  border: { type: "line" },
  style: { border: { fg: "cyan" } },
});

// Global key handler
screen.key(["q", "C-c"], () => process.exit(0));

// Render
screen.render();
```

## Runtime Auto-Initialization

`@unblessed/node` automatically initializes the Node.js runtime when imported:

```typescript
// Happens automatically on import
import { Screen } from "@unblessed/node";

// Runtime is ready - no manual setup needed!
const screen = new Screen();
```

**How it works**: The package runs `auto-init.ts` which calls `setRuntime(new NodeRuntime())` before any widgets are created.

## Node.js-Specific Features

### Direct TTY Access

Full access to Node.js TTY capabilities:

```typescript
import { Screen } from "@unblessed/node";

const screen = new Screen({
  input: process.stdin, // Custom input stream
  output: process.stdout, // Custom output stream
  terminal: "xterm-256color", // Terminal type
});

// Access underlying TTY
const tty = screen.program.term;
console.log("Terminal:", tty);
```

### Process Integration

Integrates with Node.js process:

```typescript
// Exit handlers
process.on("exit", () => {
  screen.destroy();
  console.log("Cleanup complete");
});

// Signal handlers
process.on("SIGINT", () => {
  screen.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  screen.destroy();
  process.exit(0);
});

// Uncaught errors
process.on("uncaughtException", (error) => {
  screen.destroy();
  console.error("Error:", error);
  process.exit(1);
});
```

### File System Access

Read files for content or configuration:

```typescript
import { Box } from "@unblessed/node";
import { readFileSync } from "fs";

const content = readFileSync("./data.txt", "utf8");

const box = new Box({
  parent: screen,
  content: content,
  scrollable: true,
});
```

### Environment Variables

Access environment configuration:

```typescript
const isDev = process.env.NODE_ENV === "development";
const debugMode = process.env.DEBUG === "true";

const screen = new Screen({
  debug: debugMode,
  log: isDev ? "./debug.log" : undefined,
});
```

## Screen Options

### Full Option List

```typescript
interface ScreenOptions {
  // Program options
  input?: NodeJS.ReadStream; // Input stream (default: process.stdin)
  output?: NodeJS.WriteStream; // Output stream (default: process.stdout)
  terminal?: string; // Terminal type (default: auto-detect)

  // Display options
  smartCSR?: boolean; // Smart cursor save/restore (default: false)
  fastCSR?: boolean; // Fast CSR (default: false)
  resizeTimeout?: number; // Resize debounce (default: 300ms)
  useBCE?: boolean; // Use background color erase (default: false)
  fullUnicode?: boolean; // Full Unicode support (default: false)
  dockBorders?: boolean; // Dock borders (default: false)

  // Behavior options
  cursor?: {
    artificial?: boolean; // Artificial cursor (default: false)
    shape?: "block" | "underline" | "line";
    blink?: boolean;
    color?: string;
  };
  title?: string; // Window title
  forceUnicode?: boolean; // Force Unicode (default: false)
  dump?: boolean; // Dump output to file (default: false)
  log?: string; // Log file path
  debug?: boolean; // Debug mode (default: false)
  warnings?: boolean; // Show warnings (default: false)
  autoPadding?: boolean; // Auto padding (default: false)
  tabc?: string; // Tab char (default: spaces)
}
```

### Common Configurations

**High Performance**:

```typescript
const screen = new Screen({
  smartCSR: true,
  fastCSR: true,
  useBCE: true,
  resizeTimeout: 100,
});
```

**Unicode Support**:

```typescript
const screen = new Screen({
  fullUnicode: true,
  forceUnicode: true,
});
```

**Development/Debug**:

```typescript
const screen = new Screen({
  debug: true,
  log: "./debug.log",
  warnings: true,
  dump: true,
});
```

## Terminal Compatibility

### Supported Terminals

**macOS**:

- iTerm2 ✅
- Alacritty ✅
- Kitty ✅
- Terminal.app ✅

**Linux**:

- gnome-terminal ✅
- konsole ✅
- xterm ✅
- terminator ✅

**Windows**:

- Windows Terminal ✅
- ConEmu (partial)
- cmd.exe (limited)

### Terminal Detection

Automatic terminal detection:

```typescript
import { Screen } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true, // Auto-detected based on terminal
});

// Check detected terminal
console.log("Terminal:", screen.program.terminal);
console.log("Supports 256 colors:", screen.program.has256);
console.log("Supports true color:", screen.program.hasTrueColor);
```

### Manual Terminal Override

Override detected terminal:

```typescript
const screen = new Screen({
  terminal: "xterm-256color", // Force specific terminal type
});
```

## Input Handling

### Keyboard Input

Handle keyboard events:

```typescript
// Global keys
screen.key(["C-c", "q"], () => {
  process.exit(0);
});

// Widget-specific keys
textbox.key(["enter"], () => {
  form.submit();
});

// Raw key data
screen.on("keypress", (ch, key) => {
  console.log("Pressed:", key.full);
});
```

### Mouse Input

Enable mouse support:

```typescript
const screen = new Screen({
  mouse: true,
  sendFocus: true,
});

box.on("click", (data) => {
  console.log("Clicked at:", data.x, data.y);
});

box.on("wheeldown", () => {
  box.scroll(1);
  screen.render();
});
```

### Raw Mode

Control raw terminal mode:

```typescript
// Enable raw mode (default)
screen.program.setRaw(true);

// Disable raw mode
screen.program.setRaw(false);

// Restore mode on exit
process.on("exit", () => {
  screen.program.setRaw(false);
});
```

## Output Control

### Writing to Terminal

Direct terminal output:

```typescript
// Write via screen
screen.write("Hello\n");

// Write escape sequences
screen.program.write("\x1b[32mGreen text\x1b[0m\n");

// Position cursor
screen.program.move(10, 5); // Column 10, Row 5
screen.program.write("At position");
```

### Screen Clearing

Clear screen methods:

```typescript
// Clear entire screen
screen.clearRegion(0, screen.width, 0, screen.height);

// Clear specific region
screen.clearRegion(x, x + width, y, y + height);

// Full clear and reset
screen.program.clear();
screen.program.home();
```

## Performance Optimization

### Batch Updates

Minimize renders:

```typescript
// ❌ Inefficient
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
  screen.render();
}

// ✅ Efficient
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
}
screen.render(); // Single render
```

### Throttle Rendering

For rapid updates:

```typescript
let lastRender = 0;
const THROTTLE = 16; // ~60 FPS

function update() {
  const now = Date.now();
  if (now - lastRender > THROTTLE) {
    screen.render();
    lastRender = now;
  }
}
```

### Use Smart CSR

Enable for better performance:

```typescript
const screen = new Screen({
  smartCSR: true, // Uses scroll regions
  fastCSR: true, // Even faster (may have artifacts)
});
```

## Debugging

### Debug Mode

Enable debugging:

```typescript
const screen = new Screen({
  debug: true,
  log: "./debug.log",
});

// Log messages
screen.debug("Something happened");
```

### Logging

Write to log file:

```typescript
const screen = new Screen({
  log: "./app.log",
});

// Logs to file
screen.log("Application started");
screen.log("User action:", action);
```

### Dump Output

Save screen buffer:

```typescript
const screen = new Screen({
  dump: true, // Saves to ./blessed-${timestamp}.log
});

// Or manually
screen.dumpOutput("./screen-dump.txt");
```

## Best Practices

### 1. Clean Exit

Always clean up:

```typescript
function cleanup() {
  screen.destroy();
}

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(0);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(0);
});
```

### 2. Error Handling

Catch and display errors:

```typescript
process.on("uncaughtException", (error) => {
  // Clean up screen first
  screen.destroy();

  // Then display error
  console.error("Uncaught error:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  screen.destroy();
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});
```

### 3. Resize Handling

Handle terminal resize:

```typescript
screen.on("resize", () => {
  // Re-layout widgets
  sidebar.width = "30%";
  content.width = "70%";

  // Re-render
  screen.render();
});
```

### 4. Use TypeScript

Get full type safety:

```typescript
import { Screen, Box, type BoxOptions } from "@unblessed/node";

const options: BoxOptions = {
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: 10,
};

const box = new Box(options);
```

## Next Steps

- [Browser Platform](./browser) - Running in browsers
- [Platform Differences](./differences) - Key differences between platforms
- [Examples](/docs/examples/getting-started/simple-box) - Example applications
