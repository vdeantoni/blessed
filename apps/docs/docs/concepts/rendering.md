---
sidebar_position: 4
---

# Rendering

Understanding unblessed's rendering system and optimization techniques.

## Overview

unblessed uses a smart rendering system that minimizes terminal updates for smooth, efficient TUIs. The rendering pipeline tracks changes, computes diffs, and sends only necessary updates to the terminal.

## The Rendering Pipeline

### 1. Dirty Tracking

Widgets are marked as "dirty" when they change:

```typescript
box.setContent('New content');  // Marks box as dirty
box.style.fg = 'red';           // Marks box as dirty
box.hide();                     // Marks box as dirty
```

**Dirty flag**: Internal flag indicating the widget needs re-rendering.

### 2. Screen Render

Call `screen.render()` to update the display:

```typescript
// Make multiple changes
box1.setContent('Changed');
box2.style.bg = 'blue';
list.select(5);

// Single render updates all changes
screen.render();
```

**Why batch**: More efficient than rendering after each change.

### 3. Widget Rendering

Each dirty widget renders its content to an internal buffer:

```typescript
class Element {
  render() {
    // 1. Calculate position and size
    const { left, top, width, height } = this._getCoords();

    // 2. Render content with styles
    const lines = this._renderContent();

    // 3. Apply borders
    if (this.border) {
      this._renderBorder();
    }

    // 4. Update screen buffer
    this.screen._buf.push(left, top, lines);
  }
}
```

### 4. Screen Diff

The screen compares the new buffer with the previous frame:

```typescript
class Screen {
  render() {
    // Collect all dirty widgets
    const dirty = this._collectDirty();

    // Render each dirty widget
    for (const widget of dirty) {
      widget.render();
    }

    // Compute diff between old and new buffers
    const diff = this._diff(this._obuf, this._buf);

    // Send minimal updates to terminal
    this._write(diff);

    // Swap buffers
    this._obuf = this._buf;
    this._buf = [];
  }
}
```

### 5. Terminal Update

Only changed cells are written to the terminal:

```typescript
// Example diff output
[
  { x: 10, y: 5, text: 'Hello', attr: { fg: 'cyan' } },
  { x: 10, y: 6, text: 'World', attr: { fg: 'cyan' } },
]

// Sent to terminal as escape sequences
\x1b[5;10H\x1b[36mHello\x1b[0m
\x1b[6;10H\x1b[36mWorld\x1b[0m
```

## Smart Rendering Features

### Smart CSR (Change Scroll Region)

Efficiently scroll content using terminal scroll regions:

```typescript
const screen = new Screen({
  smartCSR: true  // Enable smart scroll regions
});
```

**How it works**: When scrolling, uses `\x1b[L` (insert line) and `\x1b[M` (delete line) instead of redrawing everything.

**Benefits**:
- Faster scrolling in lists and logs
- Reduced flickering
- Less bandwidth

### Fast CSR

Even more aggressive scroll optimization:

```typescript
const screen = new Screen({
  smartCSR: true,
  fastCSR: true  // More aggressive optimization
});
```

**Trade-off**: May have minor visual artifacts on some terminals.

### Full Unicode

Support for wide characters and emojis:

```typescript
const screen = new Screen({
  fullUnicode: true  // Enable full Unicode support
});
```

**Features**:
- Correct width calculation for emoji and CJK characters
- Proper alignment with wide characters
- Better international support

## Rendering Modes

### Synchronous Rendering

Default mode - renders immediately:

```typescript
box.setContent('Update');
screen.render();  // Blocks until complete
```

**Use case**: Simple apps, immediate feedback needed

### Deferred Rendering

Batch multiple updates:

```typescript
// Queue multiple renders
box1.setContent('A');
screen.render();  // Queued
box2.setContent('B');
screen.render();  // Queued
box3.setContent('C');
screen.render();  // Queued

// Next tick: all renders batched into one
```

**How**: Uses `process.nextTick()` or `requestAnimationFrame()` to batch.

**Benefits**:
- Fewer actual renders
- Better performance
- Smoother animations

### Manual Control

Disable auto-rendering for fine control:

```typescript
const screen = new Screen({
  autoRender: false
});

// Make changes
box.setContent('A');
box.style.fg = 'red';

// Manually trigger render when ready
screen.render();
```

## Optimization Techniques

### 1. Batch Updates

```typescript
// ❌ Inefficient - renders 3 times
box.setContent('Line 1');
screen.render();
box.setContent('Line 2');
screen.render();
box.setContent('Line 3');
screen.render();

// ✅ Efficient - renders once
box.setContent('Line 1');
box.setContent('Line 2');
box.setContent('Line 3');
screen.render();
```

### 2. Avoid Unnecessary Renders

```typescript
// ❌ Renders even if content unchanged
box.setContent(box.content);
screen.render();

// ✅ Check before updating
if (newContent !== box.content) {
  box.setContent(newContent);
  screen.render();
}
```

### 3. Use Hidden Widgets

```typescript
// ❌ Renders offscreen widget
const hiddenBox = new Box({
  parent: screen,
  top: 1000,  // Offscreen
  content: 'Hidden'
});

// ✅ Use hidden flag
const hiddenBox = new Box({
  parent: screen,
  hidden: true,  // Not rendered
  content: 'Hidden'
});

// Show when needed
hiddenBox.show();
screen.render();
```

### 4. Limit Scrollable Content

```typescript
// ❌ Renders all 10,000 lines
const log = new Log({
  parent: screen,
  scrollable: true,
  content: tenThousandLines
});

// ✅ Limit visible content
const log = new Log({
  parent: screen,
  scrollable: true,
  scrollback: 1000,  // Keep only last 1000 lines
  content: tenThousandLines
});
```

### 5. Throttle Rapid Updates

```typescript
let lastRender = 0;
const throttle = 16; // ~60 FPS

function updateProgress(value: number) {
  progressBar.setProgress(value);

  const now = Date.now();
  if (now - lastRender > throttle) {
    screen.render();
    lastRender = now;
  }
}
```

## Layout Calculation

### Coordinate System

Widgets use a hierarchical coordinate system:

```typescript
// Screen coordinates
screen: { x: 0, y: 0, width: 80, height: 24 }

// Parent box
parent: { x: 10, y: 5, width: 60, height: 14 }

// Child box (relative to parent)
child: {
  left: 5,    // Actual x: 10 + 5 = 15
  top: 2,     // Actual y: 5 + 2 = 7
  width: 30,  // Actual width: 30
  height: 8   // Actual height: 8
}
```

### Size Calculation

Supports various size formats:

```typescript
// Absolute
{ width: 50, height: 20 }
// Rendered as: 50x20

// Percentage
{ width: '50%', height: '80%' }
// Parent 100x30: 50x24

// Calculated
{ width: '100%-10', height: '100%-5' }
// Parent 100x30: 90x25

// Shrink to content
{ width: 'shrink', height: 'shrink' }
// Fits content exactly
```

### Position Calculation

Flexible positioning:

```typescript
// Absolute
{ top: 5, left: 10 }

// Center
{ top: 'center', left: 'center' }
// Centered in parent

// Right/Bottom aligned
{ right: 5, bottom: 2 }
// 5 from right, 2 from bottom

// Mixed
{ top: 'center', left: 5 }
// Vertically centered, 5 from left
```

## Buffer Management

### Double Buffering

unblessed uses double buffering to prevent tearing:

```typescript
class Screen {
  _buf: Buffer[];   // Current buffer being built
  _obuf: Buffer[];  // Previous rendered buffer

  render() {
    // Build new frame in _buf
    this._renderWidgets();

    // Diff against _obuf
    const changes = this._diff(this._obuf, this._buf);

    // Write changes
    this._write(changes);

    // Swap buffers
    [this._buf, this._obuf] = [this._obuf, this._buf];
  }
}
```

**Benefits**:
- No visual tearing
- Minimal terminal updates
- Smooth animations

### Buffer Format

Each buffer cell contains:

```typescript
interface Cell {
  ch: string;      // Character(s)
  attr: {
    fg: number;    // Foreground color
    bg: number;    // Background color
    bold: boolean;
    underline: boolean;
    // ... other attributes
  };
}
```

## Rendering Performance

### Benchmarks

On modern hardware:

| Operation | Time |
|-----------|------|
| Empty screen | ~6.5ms |
| 100 boxes | ~11ms |
| 1K list items | ~187ms |
| Full screen update | ~15ms |

### Profiling

Profile rendering performance:

```typescript
console.time('render');
screen.render();
console.timeEnd('render');
// render: 12.456ms

// Detailed profiling
const start = process.hrtime.bigint();
screen.render();
const end = process.hrtime.bigint();
const ms = Number(end - start) / 1_000_000;
console.log(`Render took ${ms.toFixed(3)}ms`);
```

## Common Issues

### Flickering

**Cause**: Rendering too frequently or clearing screen

**Solution**:
```typescript
// ❌ Causes flicker
screen.clear();
screen.render();

// ✅ Use dirty tracking
box.setContent('Update');
screen.render();  // Only updates changed area
```

### Slow Rendering

**Cause**: Too many widgets or large content

**Solution**:
```typescript
// ✅ Optimize widget count
// Use single scrollable box instead of many small boxes

// ✅ Limit content
log.setContent(content.slice(-1000));  // Last 1000 lines

// ✅ Use hidden flag
widget.hidden = !shouldShow;
```

### Rendering Artifacts

**Cause**: Terminal doesn't support CSR or Unicode

**Solution**:
```typescript
const screen = new Screen({
  smartCSR: false,      // Disable CSR if issues
  fullUnicode: false,   // Disable Unicode if needed
  dockBorders: true     // Prevent border artifacts
});
```

## Best Practices

### 1. Render Once Per Frame

```typescript
// ✅ Good
function updateDashboard() {
  header.setContent(getHeader());
  sidebar.setItems(getItems());
  content.setContent(getContent());
  screen.render();  // Single render
}
```

### 2. Use RAF for Animations

```typescript
function animate() {
  progressBar.setProgress(++value);
  screen.render();

  if (value < 100) {
    requestAnimationFrame(animate);
  }
}
```

### 3. Debounce Rapid Events

```typescript
let timeout: NodeJS.Timeout;

input.on('keypress', (ch, key) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    updateSearch(input.getValue());
    screen.render();
  }, 100);
});
```

### 4. Profile Before Optimizing

```typescript
// Measure actual performance
console.time('render');
screen.render();
console.timeEnd('render');

// Only optimize if slow (>16ms for 60fps)
```

## Next Steps

- [Events](./events) - Event handling and propagation
- [Performance](../advanced/performance) - Advanced optimization
- [Architecture](./architecture) - Understanding the rendering pipeline
