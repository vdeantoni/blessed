---
sidebar_position: 3
---

# Troubleshooting

Common issues and how to resolve them.

## Overview

This guide covers common problems you might encounter when using unblessed, organized by category with detailed solutions and debugging strategies.

## Quick Diagnostic

### Problem Categories

| Symptom                    | Likely Cause                               | Section                                   |
| -------------------------- | ------------------------------------------ | ----------------------------------------- |
| Nothing renders            | Screen not initialized / render not called | [Rendering Issues](#rendering-issues)     |
| Keys don't work            | Keys/mouse not enabled                     | [Input Issues](#input-issues)             |
| Wrong size/position        | Coordinate calculation error               | [Layout Issues](#layout-issues)           |
| Slow performance           | Too many renders / large widget tree       | [Performance Issues](#performance-issues) |
| Flickering                 | Missing Smart CSR / too frequent renders   | [Visual Issues](#visual-issues)           |
| Memory leak                | Event listeners not cleaned up             | [Performance Issues](#memory-leak)        |
| Works in Node, not browser | Platform-specific code                     | [Platform Issues](#platform-issues)       |
| Widgets overlap            | Z-index or layout misconfiguration         | [Layout Issues](#layout-issues)           |

## Rendering Issues

### Nothing Renders

**Problem**: Screen is blank, widgets don't appear.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Forgot to call render()
const screen = new Screen();
const box = new Box({ parent: screen });
// Nothing appears!

// ✅ Solution: Always call render()
screen.render();
```

```typescript
// ❌ Problem 2: No parent attached
const box = new Box({
  // Missing: parent: screen
  content: "Hello",
});
screen.render();

// ✅ Solution: Attach to parent
const box = new Box({
  parent: screen, // Must have parent!
  content: "Hello",
});
screen.render();
```

```typescript
// ❌ Problem 3: Hidden or zero size
const box = new Box({
  parent: screen,
  width: 0, // Zero width!
  height: 0, // Zero height!
  hidden: true, // Hidden!
});

// ✅ Solution: Provide valid size
const box = new Box({
  parent: screen,
  width: 50,
  height: 10,
  hidden: false,
});
```

**Debug Steps**:

1. Check render was called:

```typescript
console.log("Before render");
screen.render();
console.log("After render");
```

2. Verify widget tree:

```typescript
console.log("Children:", screen.children.length);
screen.children.forEach((child, i) => {
  console.log(`Child ${i}:`, child.type, child.hidden);
});
```

3. Check coordinates:

```typescript
const coords = box.lpos;
console.log("Coordinates:", coords);
// Should have valid xi, yi, xl, yl
```

### Widgets Don't Update

**Problem**: Changes to widgets don't appear on screen.

**Causes and Solutions**:

```typescript
// ❌ Problem: Forgot to render after change
box.setContent("New content");
// Nothing happens

// ✅ Solution: Render after changes
box.setContent("New content");
screen.render();
```

```typescript
// ❌ Problem: Widget not marked dirty
box.content = "Direct assignment"; // Bypasses dirty tracking

// ✅ Solution: Use setter methods
box.setContent("Use setter method");
screen.render();
```

**Debug Steps**:

1. Check dirty flag:

```typescript
console.log("Dirty:", box.screen?.renders);
```

2. Force re-render:

```typescript
box.screen?.draw(0, box.screen.lines.length - 1);
```

### Partial Rendering

**Problem**: Only some widgets render, others missing.

**Causes and Solutions**:

```typescript
// ❌ Problem: Overlapping widgets
const box1 = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: 100,
  height: 100, // Very large!
});

const box2 = new Box({
  parent: screen,
  top: 5,
  left: 5,
  width: 50,
  height: 50, // Hidden behind box1!
});

// ✅ Solution: Check z-index or order
box2.setIndex(screen.children.length - 1); // Bring to front
```

**Debug**: Check rendering order:

```typescript
screen.children.forEach((child, i) => {
  const coords = child.lpos;
  console.log(`Widget ${i}:`, child.type, coords);
});
```

## Input Issues

### Keys Not Working

**Problem**: Keyboard input not captured.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Keys not enabled
const box = new Box({
  parent: screen,
  // Missing: keys: true
});

box.key("enter", () => {
  // Never called!
});

// ✅ Solution: Enable keys
const box = new Box({
  parent: screen,
  keys: true, // Must enable!
});
```

```typescript
// ❌ Problem 2: Widget not focused
box.key("enter", handler); // Won't work without focus

// ✅ Solution: Focus widget
box.focus();
```

```typescript
// ❌ Problem 3: Screen not grabbing keys
const screen = new Screen({
  // Missing: grabKeys: true
});

// ✅ Solution: Enable grabKeys
const screen = new Screen({
  grabKeys: true, // For global keys
});
```

**Debug Steps**:

1. Test keypress event:

```typescript
screen.on("keypress", (ch, key) => {
  console.log("Key:", key.full);
});
```

2. Check focus:

```typescript
console.log("Focused:", screen.focused);
console.log("Widget has focus:", box === screen.focused);
```

3. Verify key binding:

```typescript
console.log("Key bindings:", Object.keys(box._listenedKeys || {}));
```

### Mouse Not Working

**Problem**: Mouse events not firing.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Mouse not enabled
const box = new Box({
  parent: screen,
  // Missing: mouse: true
});

box.on("click", () => {
  // Never called!
});

// ✅ Solution: Enable mouse
const box = new Box({
  parent: screen,
  mouse: true,
});
```

```typescript
// ❌ Problem 2: Terminal doesn't support mouse
// Some terminals don't have mouse support

// ✅ Solution: Test mouse capability
const screen = new Screen({
  mouse: true,
  sendFocus: true,
});

screen.program.on("mouse", (data) => {
  console.log("Mouse supported!", data);
});
```

**Debug Steps**:

1. Check terminal mouse support:

```typescript
console.log("Mouse enabled:", screen.program.terminal.includes("xterm"));
```

2. Test raw mouse events:

```typescript
screen.program.enableMouse();
screen.program.on("mouse", (data) => {
  console.log("Mouse event:", data);
});
```

### Focus Issues

**Problem**: Wrong widget has focus.

**Causes and Solutions**:

```typescript
// ❌ Problem: Multiple focus() calls conflict
widget1.focus();
widget2.focus(); // widget1 loses focus
widget3.focus(); // widget2 loses focus

// ✅ Solution: Track focus changes
screen.on("element focus", (el) => {
  console.log("Focused:", el.type);
});

// ✅ Solution: Use focus groups
const form = new Form({ parent: screen });
const input1 = new Textbox({ parent: form });
const input2 = new Textbox({ parent: form });
// Tab key will cycle focus within form
```

**Debug**:

```typescript
console.log("Current focus:", screen.focused?.type);
console.log(
  "Focusable widgets:",
  screen.children.filter((c) => c.keyable).map((c) => c.type),
);
```

## Layout Issues

### Wrong Size

**Problem**: Widget is wrong size.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Percentage calculation wrong
const box = new Box({
  parent: screen,
  width: "50%", // 50% of what?
  height: "100%", // May not be what you expect
});

// ✅ Solution: Check parent size
console.log("Parent size:", {
  width: screen.width,
  height: screen.height,
});

// ✅ Solution: Use absolute sizing
const box = new Box({
  parent: screen,
  width: 40,
  height: 20,
});
```

```typescript
// ❌ Problem 2: Border/padding not accounted for
const box = new Box({
  parent: screen,
  width: 50,
  height: 10,
  border: { type: "line" }, // Takes 2 cells!
  padding: 2, // Takes 4 cells!
});
// Content area is actually 50-4=46 x 10-4=6

// ✅ Solution: Account for decorations
const innerWidth = 50 - 2 - 2 * 2; // width - border - padding
const innerHeight = 10 - 2 - 2 * 2; // height - border - padding
```

**Debug**:

```typescript
const coords = box.lpos;
console.log("Box dimensions:", {
  width: coords.xl - coords.xi,
  height: coords.yl - coords.yi,
  inner: {
    width: box.iwidth,
    height: box.iheight,
  },
});
```

### Wrong Position

**Problem**: Widget appears in wrong location.

**Causes and Solutions**:

```typescript
// ❌ Problem: Relative positioning misunderstood
const box = new Box({
  parent: screen,
  top: "50%", // 50% of screen height
  left: "center", // Centered
});
// May not be where you expect!

// ✅ Solution: Use absolute positioning
const box = new Box({
  parent: screen,
  top: 10,
  left: 20,
});
```

```typescript
// ❌ Problem: Parent offset not considered
const container = new Box({
  parent: screen,
  top: 5,
  left: 5,
});

const child = new Box({
  parent: container,
  top: 0, // Relative to container!
  left: 0, // Not screen
});
// Child is at screen coordinates (5, 5), not (0, 0)

// ✅ Solution: Understand coordinate systems
console.log("Child absolute position:", child.lpos);
```

**Debug**:

```typescript
function debugPosition(widget: Element) {
  const coords = widget.lpos!;
  console.log(`${widget.type}:`, {
    relative: { top: widget.top, left: widget.left },
    absolute: { xi: coords.xi, yi: coords.yi },
  });
}

debugPosition(container);
debugPosition(child);
```

### Overlapping Widgets

**Problem**: Widgets render on top of each other.

**Causes and Solutions**:

```typescript
// ❌ Problem: Same coordinates
const box1 = new Box({ parent: screen, top: 0, left: 0 });
const box2 = new Box({ parent: screen, top: 0, left: 0 });
// They overlap!

// ✅ Solution 1: Different positions
const box1 = new Box({ parent: screen, top: 0, left: 0 });
const box2 = new Box({ parent: screen, top: 5, left: 0 });

// ✅ Solution 2: Control z-index
box1.setIndex(0); // Behind
box2.setIndex(1); // In front
```

**Debug**:

```typescript
screen.children.forEach((child, index) => {
  console.log(`Z-index ${index}:`, child.type, child.lpos);
});
```

## Performance Issues

### Slow Rendering

**Problem**: Screen updates are slow.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Rendering inside loop
for (let i = 0; i < 100; i++) {
  box.setContent(`Item ${i}`);
  screen.render(); // 100 renders!
}

// ✅ Solution: Batch renders
for (let i = 0; i < 100; i++) {
  box.setContent(`Item ${i}`);
}
screen.render(); // 1 render
```

```typescript
// ❌ Problem 2: Too many widgets
for (let i = 0; i < 1000; i++) {
  new Box({ parent: screen, content: `Item ${i}` });
}
// Very slow!

// ✅ Solution: Virtualize list
class VirtualList extends List {
  renderVisibleOnly() {
    const start = this.childBase;
    const end = start + this.height;
    return this.items.slice(start, end);
  }
}
```

**Debug**:

```typescript
console.time("render");
screen.render();
console.timeEnd("render");
// Should be < 20ms for most screens

// Profile widget count
console.log("Total widgets:", screen.children.length);

function countAllWidgets(el: Node): number {
  let count = 1;
  el.children.forEach((child) => {
    count += countAllWidgets(child);
  });
  return count;
}

console.log("Total in tree:", countAllWidgets(screen));
```

### High CPU Usage

**Problem**: Process uses too much CPU.

**Causes and Solutions**:

```typescript
// ❌ Problem: Rendering in tight loop
setInterval(() => {
  box.setContent(new Date().toString());
  screen.render();
}, 1); // Every millisecond! Too fast!

// ✅ Solution: Throttle updates
let rafId: number | null = null;

function scheduleRender() {
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      screen.render();
      rafId = null;
    });
  }
}

setInterval(() => {
  box.setContent(new Date().toString());
  scheduleRender(); // Max ~60 FPS
}, 16);
```

**Debug**:

```typescript
let renderCount = 0;
const origRender = screen.render.bind(screen);

screen.render = function () {
  renderCount++;
  return origRender();
};

setInterval(() => {
  console.log("Renders per second:", renderCount);
  renderCount = 0;
}, 1000);
```

### Memory Leak

**Problem**: Memory usage grows over time.

**Causes and Solutions**:

```typescript
// ❌ Problem: Listeners not removed
function createWidget() {
  const box = new Box({ parent: screen });

  box.on("focus", () => {
    // Handler stays in memory even after box destroyed!
  });

  box.destroy(); // Listeners still attached!
}

// ✅ Solution: Clean up listeners
function createWidget() {
  const box = new Box({ parent: screen });

  const handler = () => {
    /* ... */
  };
  box.on("focus", handler);

  // Later
  box.off("focus", handler);
  box.removeAllListeners();
  box.destroy();
}
```

```typescript
// ❌ Problem: Circular references
class MyWidget extends Box {
  private data: any[] = [];

  addData(item: any) {
    item.widget = this; // Circular reference!
    this.data.push(item);
  }
}

// ✅ Solution: Use WeakMap
class MyWidget extends Box {
  private data: WeakMap<any, any> = new WeakMap();

  addData(item: any, value: any) {
    this.data.set(item, value); // Can be garbage collected
  }
}
```

**Debug**:

```typescript
const used = process.memoryUsage();
console.log({
  rss: `${(used.rss / 1024 / 1024).toFixed(2)} MB`,
  heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
});

// Track listener count
function countListeners(el: Node): number {
  let count = Object.keys(el._events || {}).length;
  el.children.forEach((child) => {
    count += countListeners(child);
  });
  return count;
}

console.log("Total listeners:", countListeners(screen));
```

## Visual Issues

### Flickering

**Problem**: Screen flickers during updates.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Smart CSR disabled
const screen = new Screen({
  smartCSR: false, // Full screen redraws
});

// ✅ Solution: Enable Smart CSR
const screen = new Screen({
  smartCSR: true, // Incremental updates
  fastCSR: true, // Even faster
});
```

```typescript
// ❌ Problem 2: Too frequent renders
setInterval(() => {
  screen.render();
}, 1); // Causes flickering

// ✅ Solution: Limit render rate
setInterval(() => {
  screen.render();
}, 16); // ~60 FPS max
```

**Debug**:

```typescript
console.log("Smart CSR:", screen.smartCSR);
console.log("Fast CSR:", screen.fastCSR);
```

### Wrong Colors

**Problem**: Colors don't appear as expected.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Terminal doesn't support color
const screen = new Screen({
  term: "dumb", // No color support!
});

// ✅ Solution: Use color-capable terminal
const screen = new Screen({
  term: "xterm-256color",
});

// Check color support
console.log("Terminal:", screen.tput.terminal);
console.log("Colors:", screen.tput.colors);
```

```typescript
// ❌ Problem 2: Invalid color format
box.style.fg = "#xyz"; // Invalid hex

// ✅ Solution: Use valid colors
box.style.fg = "red"; // Named color
box.style.fg = "#ff0000"; // Valid hex
box.style.fg = 196; // Color index
```

**Debug**:

```typescript
import colors from "@unblessed/core/lib/colors";

const converted = colors.convert("#ff0000");
console.log("Color value:", converted);

const reduced = colors.reduce(converted, 256);
console.log("Reduced to 256:", reduced);
```

### Garbled Characters

**Problem**: Unicode characters appear wrong.

**Causes and Solutions**:

```typescript
// ❌ Problem: Terminal encoding wrong
process.env.LANG = "C"; // No UTF-8

// ✅ Solution: Set UTF-8 encoding
process.env.LANG = "en_US.UTF-8";

const screen = new Screen({
  fullUnicode: true, // Enable full Unicode support
});
```

```typescript
// ❌ Problem: Wide characters misaligned
box.setContent("中文字符"); // Chinese characters

// ✅ Solution: Enable east asian width
const screen = new Screen({
  fullUnicode: true,
  forceUnicode: true,
});
```

## Platform Issues

### Browser vs Node.js

**Problem**: Code works in Node.js but not browser (or vice versa).

**Causes and Solutions**:

```typescript
// ❌ Problem: Using process.exit() in browser
screen.key("q", () => {
  process.exit(0); // Throws error in browser!
});

// ✅ Solution: Platform-specific code
import { getRuntime } from "@unblessed/core/runtime-context";

screen.key("q", () => {
  const runtime = getRuntime();
  if (runtime.process.platform === "browser") {
    screen.destroy();
    terminal.dispose();
  } else {
    process.exit(0);
  }
});
```

```typescript
// ❌ Problem: File system access in browser
import { readFileSync } from "fs";
const data = readFileSync("./file.txt"); // Fails in browser!

// ✅ Solution: Use fetch in browser
async function loadFile(path: string) {
  if (typeof window !== "undefined") {
    const response = await fetch(path);
    return response.text();
  } else {
    return readFileSync(path, "utf8");
  }
}
```

**Debug**:

```typescript
import { getRuntime } from "@unblessed/core/runtime-context";

const runtime = getRuntime();
console.log("Platform:", runtime.process.platform);
console.log("Node.js:", typeof process !== "undefined" && process.version);
console.log("Browser:", typeof window !== "undefined");
```

### XTerm.js Issues (Browser)

**Problem**: XTerm.js terminal not working correctly.

**Causes and Solutions**:

```typescript
// ❌ Problem 1: Terminal not attached to DOM
const term = new Terminal();
const screen = new Screen({ terminal: term });
// Terminal not visible!

// ✅ Solution: Attach to DOM first
const term = new Terminal();
term.open(document.getElementById("terminal"));
const screen = new Screen({ terminal: term });
```

```typescript
// ❌ Problem 2: FitAddon not loaded
const term = new Terminal();
term.open(element);
// Terminal has default size, doesn't fit container

// ✅ Solution: Use FitAddon
import { FitAddon } from "@xterm/addon-fit";

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(element);
fitAddon.fit();

window.addEventListener("resize", () => {
  fitAddon.fit();
});
```

**Debug**:

```typescript
console.log("Terminal rows:", term.rows);
console.log("Terminal cols:", term.cols);
console.log("Container size:", element.offsetWidth, element.offsetHeight);
```

## Runtime Errors

### Common Error Messages

#### "Cannot read property 'render' of undefined"

**Cause**: Widget not attached to screen.

**Solution**:

```typescript
// ❌ Wrong
const box = new Box({ content: "Hello" });
box.screen.render(); // screen is undefined!

// ✅ Correct
const box = new Box({ parent: screen, content: "Hello" });
screen.render();
```

#### "Maximum call stack size exceeded"

**Cause**: Circular reference or infinite recursion.

**Solution**:

```typescript
// ❌ Problem: Event causes another event
box.on("focus", () => {
  box.focus(); // Infinite recursion!
});

// ✅ Solution: Add guard
let isFocusing = false;
box.on("focus", () => {
  if (isFocusing) return;
  isFocusing = true;
  // ... do work
  isFocusing = false;
});
```

#### "Cannot attach to destroyed widget"

**Cause**: Trying to use widget after destroy().

**Solution**:

```typescript
// ❌ Wrong
box.destroy();
box.setContent("Hello"); // Error!

// ✅ Correct: Check before use
if (!box.destroyed) {
  box.setContent("Hello");
}
```

#### "process.exit is not a function"

**Cause**: Using Node.js APIs in browser.

**Solution**: See [Browser vs Node.js](#browser-vs-nodejs) above.

## Debugging Techniques

### Enable Debug Mode

```typescript
const screen = new Screen({
  debug: true,
  dump: true, // Dump output to string instead of terminal
  log: "./debug.log", // Log to file
});

// Check debug output
console.log(screen.screenshot());
```

### Visual Tree Inspection

```typescript
function printTree(node: Node, indent = 0) {
  const spaces = " ".repeat(indent * 2);
  console.log(`${spaces}${node.type} (${node.children.length} children)`);

  if ("lpos" in node) {
    const el = node as Element;
    const coords = el.lpos;
    console.log(`${spaces}  Position: (${coords.xi}, ${coords.yi})`);
    console.log(
      `${spaces}  Size: ${coords.xl - coords.xi} x ${coords.yl - coords.yi}`,
    );
  }

  node.children.forEach((child) => printTree(child, indent + 1));
}

printTree(screen);
```

### Screenshot Comparison

```typescript
// Take before/after screenshots
const before = screen.screenshot();

box.setContent("Changed!");
screen.render();

const after = screen.screenshot();

if (before === after) {
  console.log("❌ Nothing changed!");
} else {
  console.log("✅ Screen updated");
}
```

### Event Logging

```typescript
// Log all events on screen
const originalEmit = screen.emit.bind(screen);
screen.emit = function (event: string, ...args: any[]) {
  console.log("Event:", event, args);
  return originalEmit(event, ...args);
};

// Log specific widget events
["focus", "blur", "click", "keypress"].forEach((event) => {
  widget.on(event, (...args) => {
    console.log(`${widget.type}.${event}:`, args);
  });
});
```

### Performance Profiling

```typescript
// Profile render time
function profileRender() {
  const start = process.hrtime.bigint();
  screen.render();
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1_000_000;

  console.log(`Render: ${ms.toFixed(3)}ms`);

  if (ms > 20) {
    console.warn("⚠️ Slow render detected!");
  }
}

// Profile continuously
setInterval(profileRender, 1000);
```

### Memory Profiling

```typescript
function profileMemory() {
  const used = process.memoryUsage();

  console.log({
    rss: `${(used.rss / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    external: `${(used.external / 1024 / 1024).toFixed(2)} MB`,
  });

  // Trigger garbage collection (requires --expose-gc flag)
  if (global.gc) {
    global.gc();
    console.log("GC triggered");
  }
}

setInterval(profileMemory, 5000);
```

## Getting Help

### Before Asking for Help

1. **Check the console**: Look for error messages and stack traces
2. **Enable debug mode**: Use `{ debug: true, dump: true }`
3. **Simplify the problem**: Create minimal reproduction
4. **Check documentation**: Review relevant guides
5. **Search issues**: Look for similar problems on GitHub

### Creating a Minimal Reproduction

```typescript
// Minimal example that reproduces the issue
import { Screen, Box } from "@unblessed/node";

const screen = new Screen({ debug: true, dump: true });

const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: 50,
  height: 10,
  content: "Test",
  border: { type: "line" },
});

screen.render();

// Expected: Box appears centered
// Actual: Box appears in wrong position

console.log("Screenshot:", screen.screenshot());
console.log("Coordinates:", box.lpos);
```

### Information to Include

When reporting issues, include:

- **unblessed version**: `npm list @unblessed/core`
- **Node.js version**: `node --version`
- **Platform**: macOS / Linux / Windows
- **Terminal**: iTerm2, gnome-terminal, Windows Terminal, etc.
- **Minimal reproduction**: Code that demonstrates the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If visual issue
- **Error messages**: Full stack trace

### Useful Commands

```bash
# Check versions
npm list @unblessed/core
node --version

# Enable debug output
DEBUG=* node app.js

# Save output to file
node app.js > output.txt 2>&1

# Check terminal type
echo $TERM

# Test terminal colors
tput colors

# Check locale
echo $LANG
```

## FAQ

### Why is my screen blank?

Most common causes:

1. Forgot to call `screen.render()`
2. Widget not attached to parent
3. Widget is hidden or has zero size
4. Widget is positioned off-screen

### Why don't my colors work?

Check:

1. Terminal supports colors (`tput colors` should be 256+)
2. Using valid color format
3. `$TERM` environment variable is set correctly

### Why is rendering slow?

Common causes:

1. Too many `screen.render()` calls
2. Large widget tree (1000+ widgets)
3. Smart CSR disabled
4. Complex content with many tags

### Why do keys not work?

Check:

1. `keys: true` option enabled
2. Widget has focus (`widget.focus()`)
3. Key is not reserved by terminal

### Why does it work in Node.js but not browser?

Common causes:

1. Using Node.js-specific APIs (fs, process.exit, etc.)
2. XTerm.js not properly initialized
3. Missing browser polyfills

### How do I debug rendering issues?

1. Enable debug mode: `{ debug: true, dump: true }`
2. Take screenshots: `screen.screenshot()`
3. Check coordinates: `widget.lpos`
4. Verify widget tree: `screen.children`

## Next Steps

- [Performance Optimization](./performance) - Optimize your application
- [Custom Widgets](./custom-widgets) - Build custom components
- [API Reference](/docs/api/generated/widgets.screen.Class.Screen) - Detailed API documentation
