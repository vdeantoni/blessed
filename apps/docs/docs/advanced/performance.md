---
sidebar_position: 1
---

# Performance Optimization

Techniques and best practices for optimizing unblessed applications.

## Overview

unblessed is designed for performance, but understanding how to optimize your application can make a significant difference, especially for complex UIs or high-frequency updates.

## Rendering Optimization

### 1. Batch Updates

The most important optimization - minimize render calls:

```typescript
// ❌ Bad - renders 100 times
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
  screen.render();  // Renders after each update
}

// ✅ Good - renders once
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
}
screen.render();  // Single render for all changes

// ✅ Even better - use requestAnimationFrame
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
}
requestAnimationFrame(() => screen.render());
```

**Why**: Each `screen.render()` recalculates layouts, diffs buffers, and writes to terminal. Batching reduces this overhead significantly.

### 2. Throttle High-Frequency Updates

Limit render rate for animations or rapid updates:

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

// Use for rapid updates
progressBar.on('update', () => {
  scheduleRender();  // Automatically throttled to ~60 FPS
});
```

**Alternative with timestamp**:
```typescript
let lastRender = 0;
const THROTTLE_MS = 16;  // ~60 FPS

function throttledRender() {
  const now = Date.now();
  if (now - lastRender >= THROTTLE_MS) {
    screen.render();
    lastRender = now;
  }
}
```

### 3. Use Smart CSR

Enable Smart Change Scroll Region for better scrolling performance:

```typescript
const screen = new Screen({
  smartCSR: true,   // Use scroll regions instead of full redraw
  fastCSR: true     // Even faster (may have minor artifacts)
});
```

**Impact**: Up to 3-5x faster scrolling in lists and logs.

### 4. Avoid Unnecessary Dirty Flags

Only update when values actually change:

```typescript
class OptimizedBox extends Box {
  setContent(content: string) {
    // Skip if content hasn't changed
    if (this.content === content) {
      return;
    }
    super.setContent(content);
  }

  setStyle(style: Style) {
    // Deep equality check before updating
    if (isEqual(this.style, style)) {
      return;
    }
    super.setStyle(style);
  }
}
```

## Widget Optimization

### 1. Use Hidden Instead of Detach

Hiding is faster than detaching/reattaching:

```typescript
// ❌ Slow - rebuilds widget tree
if (shouldHide) {
  widget.detach();
} else {
  parent.append(widget);
}

// ✅ Fast - just skips rendering
widget.hidden = !shouldShow;
```

### 2. Minimize Widget Count

Fewer widgets = faster rendering:

```typescript
// ❌ Many widgets
for (let i = 0; i < 1000; i++) {
  new Box({
    parent: container,
    top: i,
    content: `Line ${i}`
  });
}

// ✅ Single scrollable widget with content
const log = new Log({
  parent: container,
  scrollable: true,
  content: lines.join('\n')
});
```

### 3. Virtualize Long Lists

Only render visible items:

```typescript
class VirtualList extends List {
  private allItems: string[] = [];
  private visibleCount = 20;

  setItems(items: string[]) {
    this.allItems = items;
    this.updateVisible();
  }

  private updateVisible() {
    const start = this.childBase;
    const end = start + this.visibleCount;
    const visible = this.allItems.slice(start, end);

    super.setItems(visible);
  }

  scroll(offset: number) {
    super.scroll(offset);
    this.updateVisible();
  }
}

// Usage
const list = new VirtualList({
  parent: screen,
  height: 20
});

// Only renders 20 items at a time, no matter the total
list.setItems(Array.from({ length: 10000 }, (_, i) => `Item ${i}`));
```

**Impact**: 10,000 items renders as fast as 20 items.

### 4. Lazy Content Loading

Defer content generation until needed:

```typescript
class LazyBox extends Box {
  private contentGenerator: () => string;

  constructor(options: BoxOptions & { generator: () => string }) {
    const { generator, ...opts } = options;
    super(opts);
    this.contentGenerator = generator;
  }

  render() {
    // Generate content only when actually rendering
    if (!this.content && !this.hidden) {
      this.setContent(this.contentGenerator());
    }
    super.render();
  }
}
```

## Memory Optimization

### 1. Remove Event Listeners

Prevent memory leaks:

```typescript
class MyWidget extends Box {
  private interval?: NodeJS.Timeout;

  start() {
    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  destroy() {
    // Clean up timers
    if (this.interval) {
      clearInterval(this.interval);
    }

    // Remove all event listeners
    this.removeAllListeners();

    // Call parent destroy
    super.destroy();
  }
}
```

### 2. Limit Content Size

Keep content manageable:

```typescript
class LogBox extends Box {
  private maxLines = 1000;

  addLine(line: string) {
    const lines = this.getContent().split('\n');

    // Keep only last N lines
    if (lines.length >= this.maxLines) {
      lines.shift();
    }

    lines.push(line);
    this.setContent(lines.join('\n'));
  }
}
```

### 3. Reuse Buffers

For high-performance scenarios:

```typescript
class BufferPool {
  private pool: Buffer[] = [];

  get(size: number): Buffer {
    const buf = this.pool.pop();
    if (buf && buf.length >= size) {
      return buf.slice(0, size);
    }
    return Buffer.alloc(size);
  }

  release(buf: Buffer) {
    if (buf.length <= 4096) {  // Don't pool huge buffers
      this.pool.push(buf);
    }
  }
}
```

## Layout Optimization

### 1. Use Absolute Positioning

Absolute positioning is faster than relative:

```typescript
// ✅ Fast - absolute positions
const box1 = new Box({ top: 0, left: 0, width: 50, height: 10 });
const box2 = new Box({ top: 10, left: 0, width: 50, height: 10 });

// ⚠️ Slower - calculated positions
const box1 = new Box({ top: 'center', left: 'center', width: '50%', height: '50%' });
```

**Trade-off**: Absolute is faster but less flexible.

### 2. Cache Calculated Values

Avoid recalculating layouts:

```typescript
class OptimizedWidget extends Element {
  private cachedCoords?: Coordinates;
  private coordsVersion = 0;
  private lastVersion = -1;

  _getCoords() {
    // Only recalculate if layout changed
    if (this.lastVersion === this.coordsVersion && this.cachedCoords) {
      return this.cachedCoords;
    }

    this.cachedCoords = super._getCoords();
    this.lastVersion = this.coordsVersion;
    return this.cachedCoords;
  }

  // Invalidate cache on layout change
  setDimensions(dims: Dimensions) {
    super.setDimensions(dims);
    this.coordsVersion++;
  }
}
```

### 3. Minimize Border Calculations

Borders add rendering overhead:

```typescript
// ✅ Use borders only where needed
const container = new Box({
  border: false,  // No border = faster
  children: [
    new Box({ border: { type: 'line' } }),  // Only children have borders
    new Box({ border: { type: 'line' } })
  ]
});
```

## Event Optimization

### 1. Debounce Input Events

Limit handler calls:

```typescript
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

input.on('keypress', () => {
  debouncedSearch(input.getValue());
});
```

### 2. Use Event Delegation

Single handler for multiple children:

```typescript
// ❌ Many handlers
for (const item of items) {
  item.on('click', () => handleClick(item));
}

// ✅ Single handler
container.on('element click', (el) => {
  if (el.type === 'button') {
    handleClick(el);
  }
});
```

### 3. Remove Idle Listeners

Clean up when not needed:

```typescript
class SearchBox extends Textbox {
  private searchHandler?: Function;

  enableSearch() {
    this.searchHandler = (value: string) => performSearch(value);
    this.on('submit', this.searchHandler);
  }

  disableSearch() {
    if (this.searchHandler) {
      this.off('submit', this.searchHandler);
      this.searchHandler = undefined;
    }
  }
}
```

## Profiling

### Measure Performance

Use built-in profiling:

```typescript
// Time render
console.time('render');
screen.render();
console.timeEnd('render');
// render: 8.234ms

// High-resolution timing
const start = process.hrtime.bigint();
screen.render();
const end = process.hrtime.bigint();
const ms = Number(end - start) / 1_000_000;
console.log(`Render: ${ms.toFixed(3)}ms`);
```

### Profile Specific Operations

```typescript
class ProfiledWidget extends Box {
  render() {
    const start = Date.now();
    super.render();
    const duration = Date.now() - start;

    if (duration > 10) {
      console.warn(`Slow render: ${duration}ms in ${this.type}`);
    }
  }
}
```

### Memory Profiling

```typescript
// Check memory usage
const used = process.memoryUsage();
console.log({
  rss: `${(used.rss / 1024 / 1024).toFixed(2)} MB`,
  heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
  external: `${(used.external / 1024 / 1024).toFixed(2)} MB`
});
```

## Performance Targets

### Rendering Benchmarks

Target times on modern hardware:

| Operation | Target | Good | Acceptable |
|-----------|--------|------|------------|
| Empty screen | < 5ms | < 10ms | < 20ms |
| Simple screen (10 widgets) | < 10ms | < 15ms | < 30ms |
| Complex screen (100 widgets) | < 20ms | < 30ms | < 50ms |
| List (1K items) | < 100ms | < 200ms | < 400ms |
| Animation frame (60 FPS) | < 16ms | < 16ms | < 33ms (30 FPS) |

### Memory Usage

| Scenario | Target | Good | Acceptable |
|----------|--------|------|------------|
| Empty app | < 20 MB | < 30 MB | < 50 MB |
| Simple UI | < 50 MB | < 75 MB | < 100 MB |
| Complex UI | < 100 MB | < 150 MB | < 200 MB |
| With 10K list items | < 150 MB | < 200 MB | < 300 MB |

## Platform-Specific

### Node.js

```typescript
// Use smartCSR for better performance
const screen = new Screen({
  smartCSR: true,
  fastCSR: true,
  useBCE: true  // Background color erase
});

// Reduce resize debounce for responsive apps
screen.on('resize', debounce(() => {
  relayout();
  screen.render();
}, 50));  // 50ms instead of default 300ms
```

### Browser

```typescript
// Use requestAnimationFrame
function animate() {
  updateState();
  screen.render();
  requestAnimationFrame(animate);
}

// Optimize XTerm.js
const term = new Terminal({
  scrollback: 100,  // Reduce scrollback
  rendererType: 'canvas',  // Faster than DOM
  disableStdin: false,
  convertEol: true
});
```

## Best Practices Checklist

✅ **Batch renders** - Single render per frame
✅ **Throttle updates** - Use RAF or timestamps
✅ **Enable Smart CSR** - For better scrolling
✅ **Minimize widgets** - Combine where possible
✅ **Virtualize lists** - Only render visible items
✅ **Clean up resources** - Remove listeners and timers
✅ **Limit content size** - Cap logs and buffers
✅ **Cache calculations** - Avoid redundant work
✅ **Profile regularly** - Measure before optimizing
✅ **Use absolute positioning** - When possible

## Common Performance Issues

### Issue: Slow Rendering

**Symptoms**: Screen updates take > 50ms

**Solutions**:
1. Batch render calls
2. Reduce widget count
3. Enable Smart CSR
4. Profile to find bottleneck

### Issue: High Memory Usage

**Symptoms**: Memory grows over time

**Solutions**:
1. Remove event listeners
2. Limit content size
3. Clear old data
4. Check for circular references

### Issue: Choppy Animations

**Symptoms**: Animation not smooth

**Solutions**:
1. Use requestAnimationFrame
2. Throttle to 16ms (60 FPS)
3. Reduce render complexity
4. Simplify widget tree

## Next Steps

- [Custom Widgets](./custom-widgets) - Building efficient custom widgets
- [Troubleshooting](./troubleshooting) - Debugging performance issues
- [Rendering](../concepts/rendering) - Understanding the render pipeline
