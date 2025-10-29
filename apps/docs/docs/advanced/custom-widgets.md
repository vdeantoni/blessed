---
sidebar_position: 2
---

# Custom Widgets

Learn how to create reusable custom widgets by extending base classes.

## Overview

unblessed provides a flexible widget system that you can extend to create custom components. By extending base classes like `Box`, `Element`, or `Node`, you can build specialized widgets tailored to your application's needs.

## Quick Start

### Basic Custom Widget

```typescript
import { Box, type BoxOptions } from "@unblessed/node";

interface StatusBarOptions extends BoxOptions {
  status?: string;
  showClock?: boolean;
}

export class StatusBar extends Box {
  private status: string;
  private showClock: boolean;
  private interval?: NodeJS.Timeout;

  constructor(options: StatusBarOptions = {}) {
    const { status = "Ready", showClock = true, ...opts } = options;

    super({
      ...opts,
      bottom: 0,
      left: 0,
      width: "100%",
      height: 3,
      style: {
        bg: "blue",
        fg: "white",
        ...opts.style,
      },
      tags: true,
    });

    this.type = "statusbar";
    this.status = status;
    this.showClock = showClock;

    this.updateContent();
  }

  setStatus(status: string) {
    this.status = status;
    this.updateContent();
    this.screen?.render();
  }

  private updateContent() {
    const time = this.showClock ? new Date().toLocaleTimeString() : "";

    this.setContent(`{left}  ${this.status}{/left}{right}${time}  {/right}`);
  }

  start() {
    if (this.showClock && !this.interval) {
      this.interval = setInterval(() => {
        this.updateContent();
        this.screen?.render();
      }, 1000);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  destroy() {
    this.stop();
    super.destroy();
  }
}

// Usage
const statusBar = new StatusBar({
  parent: screen,
  status: "Loading...",
  showClock: true,
});

statusBar.start();
statusBar.setStatus("Ready!");
```

## Widget Hierarchy

### Base Classes

unblessed provides three levels of base classes:

```typescript
Node              // Basic tree node
  └─ Element      // Adds positioning, sizing, rendering
      └─ Box      // Adds borders, padding, scrolling, content
```

**When to extend:**

- **Node**: When you need basic tree structure and events
- **Element**: When you need positioning and layout
- **Box**: Most common - when you need content, borders, and styling

### Choosing a Base Class

```typescript
// Extend Node for minimal widgets
class TreeNode extends Node {
  // Only tree structure and events
}

// Extend Element for layout widgets
class Spacer extends Element {
  // Positioning and sizing, no content
}

// Extend Box for content widgets
class Badge extends Box {
  // Full featured with content and styling
}
```

## Widget Options

### Defining Custom Options

Use TypeScript interfaces to define widget-specific options:

```typescript
import { Box, type BoxOptions } from "@unblessed/node";

// Extend BoxOptions for type safety
export interface BadgeOptions extends BoxOptions {
  value?: number;
  color?: "red" | "green" | "blue" | "yellow";
  pulse?: boolean;
}

export class Badge extends Box {
  private _value: number;
  private color: string;
  private pulse: boolean;

  constructor(options: BadgeOptions = {}) {
    // Extract custom options with defaults
    const { value = 0, color = "blue", pulse = false, ...boxOptions } = options;

    // Pass remaining options to parent
    super({
      ...boxOptions,
      width: 10,
      height: 3,
      tags: true,
    });

    this.type = "badge";
    this._value = value;
    this.color = color;
    this.pulse = pulse;

    this.updateDisplay();
  }

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
    this.updateDisplay();
    this.screen?.render();
  }

  private updateDisplay() {
    const colorTag = `{${this.color}-fg}`;
    const bold = this.pulse ? "{bold}" : "";
    this.setContent(`{center}${bold}${colorTag}${this._value}{/}{/}{/center}`);
  }
}

// Usage
const badge = new Badge({
  parent: screen,
  top: 0,
  right: 0,
  value: 5,
  color: "red",
  pulse: true,
});

badge.value = 10; // Update value
```

## Custom Rendering

### Override Render Method

For custom rendering logic:

```typescript
export class ProgressRing extends Element {
  private progress: number = 0;
  private radius: number;
  private thickness: number;

  constructor(options: ProgressRingOptions = {}) {
    super(options);
    this.type = "progress-ring";
    this.radius = options.radius || 10;
    this.thickness = options.thickness || 2;
  }

  setProgress(value: number) {
    this.progress = Math.max(0, Math.min(100, value));
    this.emit("progress", this.progress);
    this.screen?.render();
  }

  render(): any {
    // Call parent to set up coordinates
    const ret = super.render();
    if (!ret) return ret;

    const { xi, xl, yi, yl } = this.lpos!;
    if (xi == null || yi == null) return ret;

    // Custom drawing logic
    this.screen!.program.saveCursor();

    for (let y = yi; y < yl; y++) {
      for (let x = xi; x < xl; x++) {
        const dx = x - (xi + (xl - xi) / 2);
        const dy = y - (yi + (yl - yi) / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance >= this.radius - this.thickness &&
          distance <= this.radius
        ) {
          const angle = (Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI);
          const char = angle * 100 <= this.progress ? "█" : "░";

          this.screen!.program.move(x, y);
          this.screen!.program.write(char);
        }
      }
    }

    this.screen!.program.restoreCursor();
    return ret;
  }
}
```

### Using \_render for Element Content

```typescript
export class Graph extends Element {
  private data: number[] = [];

  setData(data: number[]) {
    this.data = data;
    this.screen?.render();
  }

  _render(): any {
    const ret = super._render();
    if (!ret) return ret;

    const { xi, xl, yi, yl } = ret;
    const width = xl - xi;
    const height = yl - yi;

    // Normalize data to height
    const max = Math.max(...this.data);
    const normalized = this.data.map((v) => (v / max) * height);

    // Draw graph
    for (let i = 0; i < Math.min(this.data.length, width); i++) {
      const barHeight = Math.floor(normalized[i]);
      const x = xi + i;

      for (let j = 0; j < barHeight; j++) {
        const y = yl - j - 1;
        this.screen!.draw.set(y, x, "█");
      }
    }

    return ret;
  }
}
```

## State Management

### Internal State

```typescript
export class Tabs extends Box {
  private tabs: string[] = [];
  private activeIndex: number = 0;
  private tabWidgets: Box[] = [];

  constructor(options: TabsOptions = {}) {
    super(options);
    this.type = "tabs";
    this.tabs = options.tabs || [];
    this.createTabs();
  }

  private createTabs() {
    // Clean up old tabs
    this.tabWidgets.forEach((t) => t.destroy());
    this.tabWidgets = [];

    const tabWidth = Math.floor(100 / this.tabs.length);

    this.tabs.forEach((label, index) => {
      const tab = new Box({
        parent: this,
        top: 0,
        left: `${index * tabWidth}%`,
        width: `${tabWidth}%`,
        height: 3,
        content: `{center}${label}{/center}`,
        tags: true,
        style: {
          bg: index === this.activeIndex ? "blue" : "black",
          fg: "white",
        },
        mouse: true,
      });

      tab.on("click", () => {
        this.setActiveTab(index);
      });

      this.tabWidgets.push(tab);
    });
  }

  setActiveTab(index: number) {
    if (index < 0 || index >= this.tabs.length) return;

    const oldIndex = this.activeIndex;
    this.activeIndex = index;

    // Update tab styles
    this.tabWidgets.forEach((tab, i) => {
      tab.style.bg = i === index ? "blue" : "black";
    });

    this.emit("tab-change", {
      oldIndex,
      newIndex: index,
      label: this.tabs[index],
    });

    this.screen?.render();
  }

  getActiveTab(): number {
    return this.activeIndex;
  }

  addTab(label: string) {
    this.tabs.push(label);
    this.createTabs();
    this.screen?.render();
  }

  removeTab(index: number) {
    if (index < 0 || index >= this.tabs.length) return;

    this.tabs.splice(index, 1);

    if (this.activeIndex >= this.tabs.length) {
      this.activeIndex = Math.max(0, this.tabs.length - 1);
    }

    this.createTabs();
    this.screen?.render();
  }
}

// Usage
const tabs = new Tabs({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  tabs: ["Home", "Profile", "Settings"],
});

tabs.on("tab-change", ({ newIndex, label }) => {
  console.log(`Switched to ${label} tab`);
});

tabs.setActiveTab(1); // Switch to Profile
tabs.addTab("Help"); // Add new tab
```

### Reactive Properties

```typescript
export class Counter extends Box {
  private _count: number = 0;

  constructor(options: CounterOptions = {}) {
    super({
      ...options,
      tags: true,
    });

    this._count = options.initialCount || 0;
    this.type = "counter";
    this.updateDisplay();
  }

  // Getter
  get count(): number {
    return this._count;
  }

  // Setter with side effects
  set count(value: number) {
    const oldValue = this._count;
    this._count = value;

    // Emit event
    this.emit("change", { oldValue, newValue: value });

    // Update display
    this.updateDisplay();

    // Trigger render
    this.screen?.render();
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  private updateDisplay() {
    this.setContent(`{center}{bold}Count: ${this._count}{/bold}{/center}`);
  }
}

// Usage
const counter = new Counter({
  parent: screen,
  initialCount: 0,
});

counter.on("change", ({ oldValue, newValue }) => {
  console.log(`Count changed: ${oldValue} → ${newValue}`);
});

counter.increment(); // Count: 1
```

## Event Handling

### Custom Events

```typescript
export class LoadingSpinner extends Box {
  private frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  private currentFrame = 0;
  private interval?: NodeJS.Timeout;
  private isLoading = false;

  constructor(options: BoxOptions = {}) {
    super({
      ...options,
      width: 5,
      height: 3,
      tags: true,
    });

    this.type = "spinner";
    this.updateFrame();
  }

  start() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.emit("start"); // Custom event

    this.interval = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      this.updateFrame();
      this.emit("tick", this.currentFrame); // Custom event
      this.screen?.render();
    }, 80);
  }

  stop() {
    if (!this.isLoading) return;

    this.isLoading = false;
    this.emit("stop"); // Custom event

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    this.setContent("{center}{green-fg}✓{/green-fg}{/center}");
    this.screen?.render();
  }

  private updateFrame() {
    const frame = this.frames[this.currentFrame];
    this.setContent(`{center}{cyan-fg}${frame}{/cyan-fg}{/center}`);
  }

  destroy() {
    this.stop();
    super.destroy();
  }
}

// Usage
const spinner = new LoadingSpinner({ parent: screen });

spinner.on("start", () => console.log("Loading started"));
spinner.on("tick", (frame) => console.log(`Frame: ${frame}`));
spinner.on("stop", () => console.log("Loading complete"));

spinner.start();
setTimeout(() => spinner.stop(), 3000);
```

### Keyboard Shortcuts

```typescript
export class SearchBox extends Box {
  private input: Textbox;
  private results: List;

  constructor(options: SearchBoxOptions = {}) {
    super({
      ...options,
      height: 20,
      keys: true,
      vi: true,
    });

    this.type = "searchbox";

    // Input field
    this.input = new Textbox({
      parent: this,
      top: 0,
      left: 0,
      width: "100%",
      height: 3,
      border: { type: "line" },
      label: " Search ",
      inputOnFocus: true,
    });

    // Results list
    this.results = new List({
      parent: this,
      top: 3,
      left: 0,
      width: "100%",
      height: "100%-3",
      border: { type: "line" },
      keys: true,
      vi: true,
      mouse: true,
    });

    this.setupKeyBindings();
  }

  private setupKeyBindings() {
    // Custom keyboard shortcuts
    this.key(["escape"], () => {
      this.input.clearValue();
      this.results.clearItems();
      this.emit("clear");
      this.screen?.render();
    });

    this.key(["C-a"], () => {
      this.results.select(0); // Select first result
      this.screen?.render();
    });

    this.key(["C-e"], () => {
      this.results.select(this.results.items.length - 1); // Select last
      this.screen?.render();
    });

    this.input.on("submit", (value) => {
      this.emit("search", value);
    });

    this.results.on("select", (item, index) => {
      this.emit("select", { item: item.getText(), index });
    });
  }

  setResults(items: string[]) {
    this.results.setItems(items);
    this.screen?.render();
  }

  focusInput() {
    this.input.focus();
  }
}

// Usage
const searchBox = new SearchBox({ parent: screen });

searchBox.on("search", (query) => {
  const results = performSearch(query);
  searchBox.setResults(results);
});

searchBox.on("select", ({ item, index }) => {
  console.log(`Selected: ${item} at ${index}`);
});

searchBox.focusInput();
```

## Composite Widgets

### Building Complex Widgets

```typescript
export class Dashboard extends Box {
  private header: Box;
  private sidebar: List;
  private content: Box;
  private footer: StatusBar;

  constructor(options: DashboardOptions = {}) {
    super({
      ...options,
      width: "100%",
      height: "100%",
    });

    this.type = "dashboard";
    this.createLayout();
  }

  private createLayout() {
    // Header
    this.header = new Box({
      parent: this,
      top: 0,
      left: 0,
      width: "100%",
      height: 3,
      content: "{center}{bold}Dashboard{/bold}{/center}",
      tags: true,
      style: { bg: "blue", fg: "white" },
    });

    // Sidebar
    this.sidebar = new List({
      parent: this,
      top: 3,
      left: 0,
      width: "20%",
      height: "100%-6",
      label: " Menu ",
      border: { type: "line" },
      keys: true,
      vi: true,
      mouse: true,
      style: {
        selected: { bg: "blue", fg: "white" },
      },
      items: ["Overview", "Analytics", "Settings"],
    });

    // Content area
    this.content = new Box({
      parent: this,
      top: 3,
      left: "20%",
      width: "80%",
      height: "100%-6",
      border: { type: "line" },
      scrollable: true,
      mouse: true,
      keys: true,
    });

    // Footer
    this.footer = new StatusBar({
      parent: this,
      status: "Ready",
    });

    this.setupNavigation();
  }

  private setupNavigation() {
    this.sidebar.on("select", (item) => {
      const page = item.getText();
      this.loadPage(page);
    });

    this.sidebar.focus();
  }

  loadPage(name: string) {
    this.content.setContent(`{center}Loading ${name}...{/center}`);
    this.footer.setStatus(`Viewing: ${name}`);
    this.emit("page-change", name);
    this.screen?.render();
  }

  setContent(content: string) {
    this.content.setContent(content);
    this.screen?.render();
  }

  setStatus(status: string) {
    this.footer.setStatus(status);
  }
}

// Usage
const dashboard = new Dashboard({ parent: screen });

dashboard.on("page-change", (page) => {
  // Load page content
  const content = loadPageContent(page);
  dashboard.setContent(content);
});

screen.render();
```

## Lifecycle Methods

### Initialization and Cleanup

```typescript
export class DataTable extends Box {
  private data: any[] = [];
  private headers: string[] = [];
  private pollInterval?: NodeJS.Timeout;

  constructor(options: DataTableOptions = {}) {
    super(options);
    this.type = "datatable";

    // Initialize state
    this.data = options.data || [];
    this.headers = options.headers || [];

    // Defer heavy initialization
    this.once("attach", () => {
      this.initialize();
    });
  }

  // Called when widget is attached to screen
  private initialize() {
    this.emit("init");
    this.renderTable();

    // Start polling if configured
    if (this.options.autoPoll) {
      this.startPolling();
    }
  }

  // Set up data polling
  private startPolling() {
    this.pollInterval = setInterval(() => {
      this.emit("poll");
      this.refresh();
    }, this.options.pollInterval || 5000);
  }

  private stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = undefined;
    }
  }

  // Update display
  private renderTable() {
    let content = this.headers.join(" | ") + "\n";
    content += "-".repeat(50) + "\n";

    this.data.forEach((row) => {
      content += this.headers.map((h) => row[h]).join(" | ") + "\n";
    });

    this.setContent(content);
  }

  // Public API
  setData(data: any[]) {
    this.data = data;
    this.renderTable();
    this.screen?.render();
  }

  refresh() {
    this.emit("refresh");
    this.renderTable();
    this.screen?.render();
  }

  // Cleanup
  destroy() {
    this.stopPolling();
    this.removeAllListeners();
    super.destroy();
  }
}
```

## Testing Custom Widgets

### Unit Testing

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { Screen } from "@unblessed/node";
import { Counter } from "./counter.js";

describe("Counter Widget", () => {
  let screen: Screen;
  let counter: Counter;

  beforeEach(() => {
    screen = new Screen({ dump: true });
    counter = new Counter({
      parent: screen,
      initialCount: 0,
    });
  });

  it("should initialize with count 0", () => {
    expect(counter.count).toBe(0);
  });

  it("should increment count", () => {
    counter.increment();
    expect(counter.count).toBe(1);
  });

  it("should decrement count", () => {
    counter.count = 5;
    counter.decrement();
    expect(counter.count).toBe(4);
  });

  it("should emit change events", () => {
    let changed = false;
    let oldValue: number;
    let newValue: number;

    counter.on("change", (data) => {
      changed = true;
      oldValue = data.oldValue;
      newValue = data.newValue;
    });

    counter.count = 10;

    expect(changed).toBe(true);
    expect(oldValue).toBe(0);
    expect(newValue).toBe(10);
  });

  it("should reset count", () => {
    counter.count = 100;
    counter.reset();
    expect(counter.count).toBe(0);
  });

  it("should update display", () => {
    counter.count = 42;
    screen.render();

    const output = screen.screenshot();
    expect(output).toContain("Count: 42");
  });
});
```

### Integration Testing

```typescript
describe("Dashboard Widget", () => {
  let screen: Screen;
  let dashboard: Dashboard;

  beforeEach(() => {
    screen = new Screen({ dump: true });
    dashboard = new Dashboard({ parent: screen });
  });

  it("should render all components", () => {
    screen.render();
    const output = screen.screenshot();

    expect(output).toContain("Dashboard"); // Header
    expect(output).toContain("Menu"); // Sidebar
    expect(output).toContain("Ready"); // Footer
  });

  it("should navigate between pages", () => {
    let pageChanged = false;
    let currentPage: string;

    dashboard.on("page-change", (page) => {
      pageChanged = true;
      currentPage = page;
    });

    dashboard.loadPage("Settings");

    expect(pageChanged).toBe(true);
    expect(currentPage).toBe("Settings");
  });

  it("should update status", () => {
    dashboard.setStatus("Loading...");
    screen.render();

    const output = screen.screenshot();
    expect(output).toContain("Loading...");
  });
});
```

## Best Practices

### 1. Type Safety

Always define option interfaces:

```typescript
// ✅ Good
interface MyWidgetOptions extends BoxOptions {
  customProp?: string;
}

class MyWidget extends Box {
  constructor(options: MyWidgetOptions = {}) {}
}

// ❌ Bad
class MyWidget extends Box {
  constructor(options: any = {}) {}
}
```

### 2. Clean Up Resources

Always clean up in `destroy()`:

```typescript
class MyWidget extends Box {
  private interval?: NodeJS.Timeout;

  destroy() {
    // Clean up timers
    if (this.interval) {
      clearInterval(this.interval);
    }

    // Remove listeners
    this.removeAllListeners();

    // Call parent
    super.destroy();
  }
}
```

### 3. Emit Meaningful Events

```typescript
// ✅ Good - specific events with data
this.emit("item-select", { item, index });
this.emit("search-complete", { query, results });

// ❌ Bad - generic events
this.emit("change");
this.emit("update");
```

### 4. Provide Sensible Defaults

```typescript
constructor(options: MyWidgetOptions = {}) {
  const {
    color = 'blue',
    size = 'medium',
    enabled = true,
    ...opts
  } = options;

  super({
    ...opts,
    // Apply defaults
    style: {
      fg: color,
      ...opts.style
    }
  });
}
```

### 5. Document Your Widget

````typescript
/**
 * A customizable progress indicator that displays completion percentage.
 *
 * @example
 * ```typescript
 * const progress = new ProgressIndicator({
 *   parent: screen,
 *   total: 100,
 *   showPercentage: true
 * });
 *
 * progress.on('complete', () => {
 *   console.log('Done!');
 * });
 *
 * progress.increment(50);  // 50%
 * ```
 */
export class ProgressIndicator extends Box {
  // ...
}
````

## Common Patterns

### Loading States

```typescript
class DataWidget extends Box {
  private state: "idle" | "loading" | "error" | "success" = "idle";

  async loadData() {
    this.setState("loading");

    try {
      const data = await fetchData();
      this.setData(data);
      this.setState("success");
    } catch (error) {
      this.setError(error.message);
      this.setState("error");
    }
  }

  private setState(state: typeof this.state) {
    this.state = state;
    this.updateDisplay();
  }

  private updateDisplay() {
    switch (this.state) {
      case "loading":
        this.setContent("{center}Loading...{/center}");
        break;
      case "error":
        this.setContent("{center}{red-fg}Error!{/red-fg}{/center}");
        break;
      case "success":
        // Show data
        break;
    }
    this.screen?.render();
  }
}
```

### Pagination

```typescript
class PaginatedList extends List {
  private allItems: string[] = [];
  private currentPage = 0;
  private pageSize = 10;

  setAllItems(items: string[]) {
    this.allItems = items;
    this.currentPage = 0;
    this.updatePage();
  }

  nextPage() {
    const maxPage = Math.ceil(this.allItems.length / this.pageSize) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage();
    }
  }

  private updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const pageItems = this.allItems.slice(start, end);

    this.setItems(pageItems);
    this.emit("page-change", {
      page: this.currentPage,
      totalPages: Math.ceil(this.allItems.length / this.pageSize),
    });

    this.screen?.render();
  }
}
```

## Next Steps

- [Performance Optimization](./performance) - Optimize custom widgets
- [Troubleshooting](./troubleshooting) - Debug widget issues
- [Widget API Reference](/docs/api/generated/widgets.box.Class.Box) - Base widget APIs
