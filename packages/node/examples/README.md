# @unblessed/node Examples

Simple examples demonstrating how to use @unblessed/node.

## Prerequisites

```bash
# Install dependencies from the monorepo root
pnpm install

# Build @unblessed/core and @unblessed/node
pnpm build
```

## Running Examples

All examples can be run directly with `tsx`:

```bash
# From the packages/node directory:
pnpm tsx examples/hello-world.ts
pnpm tsx examples/interactive.ts
pnpm tsx examples/dashboard.ts
```

Or add a script to package.json and run with `pnpm`:

```bash
pnpm example:hello-world
```

## Examples

### hello-world.ts

The simplest possible example - shows a centered box with text.

**Features:**

- Basic screen creation
- Centered box with styled content
- Keyboard event handling (quit on Escape/q)

### interactive.ts

An interactive form with text input, buttons, and a list.

**Features:**

- Text input with focus styling
- Buttons with hover/press effects
- List widget with scrolling
- Tab navigation between elements
- Event handling

### dashboard.ts

A more complex example showing a dashboard layout with multiple widgets.

**Features:**

- Layout with header, sidebar, main content
- Progress bars
- Tables
- Live updating (simulated metrics)
- Multiple interactive widgets

## Code Structure

All examples follow this pattern:

```typescript
import { Screen, Box } from "@unblessed/node";

// 1. Create screen (runtime auto-initializes on import)
const screen = new Screen({
  smartCSR: true,
  title: "My App",
});

// 2. Create widgets with parent reference
const box = new Box({
  parent: screen, // IMPORTANT: Attach widget to screen
  // ... options
});

// 3. Set up event handlers
screen.key(["escape", "q", "C-c"], () => {
  process.exit(0);
});

// 4. Render
screen.render();
```

## Key Concepts

### Automatic Runtime Initialization

The runtime initializes automatically when you import from `@unblessed/node`. Just import and use:

```typescript
import { Screen, Box } from "@unblessed/node";

// That's it! Runtime is ready. Just use the widgets:
const screen = new Screen();
const box = new Box({
  parent: screen, // Attach to screen
  content: "Hello!",
});
screen.render();
```

**Why it's simple:**

- ✅ No manual initialization needed
- ✅ No helper functions required
- ✅ Just import widgets and use them
- ✅ Works like the original blessed library

### Widget Hierarchy

Widgets form a tree structure:

```typescript
const screen = new Screen(); // Root

const container = new Box({ parent: screen }); // Child of screen

const button = new Button({
  // Child of container
  parent: container,
});
```

**Important:** Always use `parent:` to attach widgets to their parent. This ensures they render and respond to events correctly.

### Focus Management

Use `screen.key()` for global keys, or `widget.key()` for widget-specific keys:

```typescript
// Global - works anywhere
screen.key("q", () => process.exit(0));

// Widget-specific - only when focused
button.key("enter", () => {
  // Handle button press
});
```

## Tips

1. **Use `smartCSR: true`** for better rendering performance
2. **Enable mouse support** with `mouse: true` on widgets
3. **Use tags** (`tags: true`) for inline styling: `{bold}text{/bold}`
4. **Handle Ctrl+C** with `screen.key('C-c', ...)` for graceful shutdown
5. **Focus widgets** before rendering to enable keyboard input

## Troubleshooting

**Widgets not showing up?**

- Make sure you use `parent: screen` to attach widgets
- Check that `screen.render()` is called after creating widgets

**Terminal not rendering correctly?**

- Try setting `TERM=xterm-256color`
- Use `smartCSR: true` in screen options

**Widgets not responding to keyboard?**

- Make sure the widget has focus: `widget.focus()`
- Enable keys on the widget: `keys: true`

**Mouse not working?**

- Enable mouse on the widget: `mouse: true`
- Some terminals don't support mouse events

## Next Steps

- Check the [API documentation](../README.md) for all available widgets
- Explore widget options in [@unblessed/core types](../../core/src/types/options.ts)
- Look at the test suite for more usage examples
