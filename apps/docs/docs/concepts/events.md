---
sidebar_position: 5
---

# Events

Understanding event handling and propagation in unblessed.

## Overview

unblessed provides a rich event system inspired by DOM events. Widgets emit events for user interactions, state changes, and custom actions. Events can bubble up the widget tree and be captured at any level.

## Event System Basics

### Listening to Events

Use `.on()` to attach event listeners:

```typescript
box.on("click", () => {
  console.log("Box clicked!");
});

// With event data
list.on("select", (item, index) => {
  console.log(`Selected: ${item.getText()} at index ${index}`);
});

// Multiple handlers
box.on("focus", handler1);
box.on("focus", handler2);
```

### Emitting Events

Emit custom events with `.emit()`:

```typescript
// Emit event with no data
widget.emit("custom-event");

// Emit event with data
widget.emit("data-loaded", { rows: 100, time: 1234 });

// Emit event that bubbles
widget.emit("action", actionData, true); // true = bubble
```

### Removing Listeners

Clean up event listeners:

```typescript
// Remove specific listener
box.off("click", clickHandler);

// Remove all listeners for an event
box.removeAllListeners("click");

// Remove ALL listeners
box.removeAllListeners();
```

### Once Listeners

Listen to an event only once:

```typescript
box.once("load", () => {
  console.log("Loaded once");
});

// Equivalent to
const handler = () => {
  console.log("Loaded once");
  box.off("load", handler);
};
box.on("load", handler);
```

## Common Widget Events

### Focus Events

Fired when focus changes:

```typescript
box.on("focus", () => {
  console.log("Box focused");
  box.style.border.fg = "yellow";
  screen.render();
});

box.on("blur", () => {
  console.log("Box blurred");
  box.style.border.fg = "white";
  screen.render();
});
```

### Mouse Events

Mouse interactions:

```typescript
box.on("click", (data) => {
  console.log("Clicked at:", data.x, data.y);
});

box.on("mouse", (data) => {
  if (data.action === "mousedown") {
    console.log("Mouse down");
  } else if (data.action === "mouseup") {
    console.log("Mouse up");
  } else if (data.action === "mousemove") {
    console.log("Mouse move");
  }
});

box.on("wheeldown", () => {
  console.log("Scroll down");
});

box.on("wheelup", () => {
  console.log("Scroll up");
});
```

**Mouse data structure**:

```typescript
interface MouseData {
  x: number; // X coordinate
  y: number; // Y coordinate
  action: "mousedown" | "mouseup" | "mousemove" | "wheeldown" | "wheelup";
  button?: "left" | "middle" | "right";
  shift?: boolean;
  meta?: boolean;
  ctrl?: boolean;
}
```

### Keyboard Events

Key presses on focusable widgets:

```typescript
textbox.on("keypress", (ch, key) => {
  console.log("Character:", ch);
  console.log("Key:", key.name);
  console.log("Ctrl:", key.ctrl);
  console.log("Shift:", key.shift);
});

// Key object structure
interface Key {
  name: string; // 'a', 'enter', 'escape', 'up', etc.
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  sequence: string; // Raw escape sequence
  full: string; // Full key combo like 'C-a', 'M-x'
}
```

### List Events

List-specific events:

```typescript
list.on("select", (item, index) => {
  console.log(`Selected item ${index}: ${item.getText()}`);
});

list.on("select item", (item, index) => {
  // Alias for 'select'
});

list.on("cancel", () => {
  console.log("Selection cancelled (Escape pressed)");
});

list.on("action", (item, index) => {
  console.log(`Action on item ${index} (Enter pressed)`);
});
```

### Form Events

Form submission and validation:

```typescript
form.on("submit", (data) => {
  console.log("Form submitted:", data);
  // data = { fieldName: value, ... }
});

form.on("reset", () => {
  console.log("Form reset");
});

// Individual field events
textbox.on("submit", (value) => {
  console.log("Field submitted:", value);
});

textbox.on("cancel", () => {
  console.log("Input cancelled");
});
```

### Scroll Events

Scrollable widget events:

```typescript
box.on("scroll", () => {
  console.log("Scrolled to:", box.getScroll());
});

box.on("scroll up", () => {
  console.log("Scrolled up");
});

box.on("scroll down", () => {
  console.log("Scrolled down");
});
```

### Resize Events

Widget and screen resize:

```typescript
screen.on("resize", () => {
  console.log("Screen resized:", screen.width, screen.height);
  // Re-layout widgets if needed
});

box.on("resize", () => {
  console.log("Box resized:", box.width, box.height);
});
```

### Show/Hide Events

Visibility changes:

```typescript
box.on("show", () => {
  console.log("Box shown");
});

box.on("hide", () => {
  console.log("Box hidden");
});
```

## Global Key Handlers

Bind keys globally on the screen:

```typescript
// Single key
screen.key("q", () => {
  process.exit(0);
});

// Multiple keys
screen.key(["q", "C-c"], () => {
  process.exit(0);
});

// Key combination
screen.key("C-s", () => {
  saveFile();
});

// With event data
screen.key("/", (ch, key) => {
  searchBox.focus();
});
```

**Key notation**:

- `C-x`: Control+X
- `M-x`: Alt+X (Meta key)
- `S-x`: Shift+X
- `C-M-x`: Control+Alt+X
- Special keys: `enter`, `escape`, `tab`, `backspace`, `delete`, `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `f1`-`f12`

### Removing Key Handlers

```typescript
const handler = () => console.log("Q pressed");
screen.key("q", handler);

// Remove specific handler
screen.unkey("q", handler);

// Remove all handlers for a key
screen.unkey("q");
```

## Event Bubbling

Events can bubble up the widget tree:

```typescript
// Parent
const parent = new Box({ parent: screen });

parent.on("custom-event", (data) => {
  console.log("Parent received:", data);
});

// Child
const child = new Box({ parent: parent });

// Emit event that bubbles
child.emit("custom-event", { value: 42 }, true);
// Output: "Parent received: { value: 42 }"
```

**Bubbling behavior**:

- Third parameter `true` enables bubbling
- Event propagates up parent chain
- Stops if any handler calls `event.stopPropagation()`

### Stop Propagation

Prevent bubbling:

```typescript
child.on("custom-event", (data, event) => {
  console.log("Child handled");
  event.stopPropagation(); // Don't bubble to parent
});

parent.on("custom-event", (data) => {
  console.log("This will not be called");
});

child.emit("custom-event", {}, true);
// Output: "Child handled" only
```

## Custom Events

Create custom events for your widgets:

```typescript
export class DataTable extends Table {
  loadData(url: string) {
    // Emit loading event
    this.emit("load-start", { url });

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setData(data);

        // Emit success event
        this.emit("load-success", { url, rows: data.length });
      })
      .catch((error) => {
        // Emit error event
        this.emit("load-error", { url, error: error.message });
      });
  }
}

// Usage
const table = new DataTable({ parent: screen });

table.on("load-start", ({ url }) => {
  statusBar.setContent(`Loading ${url}...`);
});

table.on("load-success", ({ rows }) => {
  statusBar.setContent(`Loaded ${rows} rows`);
});

table.on("load-error", ({ error }) => {
  statusBar.setContent(`Error: ${error}`);
});

table.loadData("https://api.example.com/data");
```

## Event Patterns

### State Management

Use events to notify state changes:

```typescript
class TodoList extends List {
  private todos: Todo[] = [];

  addTodo(text: string) {
    const todo = { id: Date.now(), text, done: false };
    this.todos.push(todo);

    this.emit("todo-added", todo);
    this.emit("todos-changed", this.todos);
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.emit("todo-toggled", todo);
      this.emit("todos-changed", this.todos);
    }
  }
}

// Usage
todoList.on("todos-changed", (todos) => {
  updateStatusBar(todos);
  screen.render();
});
```

### Event Delegation

Handle events from multiple child widgets:

```typescript
const container = new Box({ parent: screen });

// Create many buttons
for (let i = 0; i < 10; i++) {
  const button = new Button({
    parent: container,
    content: `Button ${i}`,
    top: i * 3,
    data: { id: i }, // Attach data to widget
  });

  button.on("press", function () {
    // 'this' is the button widget
    container.emit("button-pressed", this.data.id);
  });
}

// Handle all button presses in one place
container.on("button-pressed", (id) => {
  console.log(`Button ${id} pressed`);
});
```

### Promise Events

Use events with promises:

```typescript
function submitForm(form: Form): Promise<any> {
  return new Promise((resolve, reject) => {
    form.once("submit", (data) => {
      resolve(data);
    });

    form.once("cancel", () => {
      reject(new Error("Form cancelled"));
    });
  });
}

// Usage
try {
  const data = await submitForm(myForm);
  console.log("Submitted:", data);
} catch (error) {
  console.log("Cancelled");
}
```

### Event Composition

Combine multiple events:

```typescript
function waitForAnyKey(screen: Screen): Promise<Key> {
  return new Promise((resolve) => {
    const handler = (ch: string, key: Key) => {
      screen.off("keypress", handler);
      resolve(key);
    };
    screen.on("keypress", handler);
  });
}

// Usage
statusBox.setContent("Press any key to continue...");
await waitForAnyKey(screen);
statusBox.setContent("Continuing...");
```

## Event Debugging

### Log All Events

Debug event flow:

```typescript
// Log all events on a widget
const originalEmit = box.emit.bind(box);
box.emit = function (event, ...args) {
  console.log("Event:", event, args);
  return originalEmit(event, ...args);
};

// Log all key events
screen.on("keypress", (ch, key) => {
  console.log("Key:", key.full || key.name);
});
```

### Event Counter

Track event frequency:

```typescript
const eventCounts = new Map<string, number>();

function trackEvent(widget: Element, event: string) {
  widget.on(event, () => {
    const count = (eventCounts.get(event) || 0) + 1;
    eventCounts.set(event, count);
    console.log(`${event}: ${count} times`);
  });
}

trackEvent(box, "click");
trackEvent(box, "focus");
```

## Best Practices

### 1. Remove Listeners

Always clean up:

```typescript
class MyWidget extends Box {
  private intervalId?: NodeJS.Timeout;

  start() {
    this.intervalId = setInterval(() => {
      this.emit("tick");
    }, 1000);
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.removeAllListeners();
    super.destroy();
  }
}
```

### 2. Use Named Functions

Easier to debug and remove:

```typescript
// ✅ Good
function handleClick() {
  console.log("Clicked");
}
box.on("click", handleClick);
box.off("click", handleClick);

// ❌ Harder to remove
box.on("click", () => console.log("Clicked"));
```

### 3. Avoid Memory Leaks

Don't create circular references:

```typescript
// ❌ Memory leak
box.on("click", () => {
  box.doSomething(); // References box
});

// ✅ Better
function handleClick() {
  this.doSomething();
}
box.on("click", handleClick.bind(box));
```

### 4. Debounce High-Frequency Events

```typescript
let timeout: NodeJS.Timeout;

input.on("keypress", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    performSearch(input.getValue());
  }, 300);
});
```

## Next Steps

- [Widgets](./widgets) - Widget system overview
- [Architecture](./architecture) - Event system architecture
- [Custom Widgets](../advanced/custom-widgets) - Create event-driven widgets
