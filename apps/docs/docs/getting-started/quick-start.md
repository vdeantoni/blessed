---
sidebar_position: 3
---

# Quick Start

Build your first unblessed application in 5 minutes.

## Creating a Simple Dashboard

Let's create an interactive dashboard with a list, status box, and keyboard controls.

### 1. Initialize Project

```bash
mkdir my-tui-app
cd my-tui-app
pnpm init
pnpm add @unblessed/node tsx
```

### 2. Create the App

Create `index.ts`:

```typescript
import { Screen, Box, List } from "@unblessed/node";

// Create screen
const screen = new Screen({
  smartCSR: true,
  title: "My Dashboard",
});

// Header
const header = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content: "{center}{bold}Welcome to unblessed!{/bold}{/center}",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Sidebar menu
const menu = new List({
  parent: screen,
  top: 3,
  left: 0,
  width: "30%",
  height: "100%-6",
  label: " Menu ",
  border: { type: "line" },
  style: {
    border: { fg: "cyan" },
    selected: {
      bg: "cyan",
      fg: "black",
    },
  },
  keys: true,
  vi: true,
  mouse: true,
  items: ["Dashboard", "Settings", "Help", "Exit"],
});

// Content area
const content = new Box({
  parent: screen,
  top: 3,
  left: "30%",
  width: "70%",
  height: "100%-6",
  border: { type: "line" },
  label: " Content ",
  tags: true,
  content: "{center}Select a menu item{/center}",
});

// Footer
const footer = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 3,
  content: "{center}Press q to quit | Use arrow keys to navigate{/center}",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Handle menu selection
menu.on("select", (item, index) => {
  if (index === 3) {
    // Exit
    process.exit(0);
  }

  const selected = item.getText();
  content.setContent(
    `{center}{bold}${selected}{/bold}{/center}\\n\\nThis is the ${selected} page.`,
  );
  screen.render();
});

// Global key handlers
screen.key(["q", "C-c"], () => {
  process.exit(0);
});

// Focus menu and render
menu.focus();
screen.render();
```

### 3. Run the App

```bash
tsx index.ts
```

### 4. Interact

- **Arrow keys** or **j/k**: Navigate menu
- **Enter**: Select menu item
- **q** or **Ctrl+C**: Quit

## Understanding the Code

### Screen Creation

```typescript
const screen = new Screen({
  smartCSR: true, // Smart cursor save/restore
  title: "My Dashboard",
});
```

The Screen is the top-level container for your TUI.

### Widget Hierarchy

Widgets attach to parents using the `parent` option:

```typescript
const box = new Box({
  parent: screen, // Attach to screen
  // ... other options
});
```

### Positioning & Sizing

Use flexible positioning:

```typescript
{
  top: 'center',      // Center vertically
  left: '30%',        // 30% from left
  width: '50%',       // 50% of parent width
  height: '100%-6'    // Parent height minus 6 lines
}
```

### Styling

Apply colors and borders:

```typescript
{
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'blue',
    border: { fg: 'cyan' }
  }
}
```

### Event Handling

Listen to events:

```typescript
menu.on("select", (item, index) => {
  // Handle selection
});

screen.key(["q", "C-c"], () => {
  process.exit(0);
});
```

## Next Steps

- [API Reference](/docs/api/generated/widgets.screen.Class.Screen) - Explore all available widgets
- [Examples](/docs/examples) - Browse more examples
- [Platform Guides](/docs/platforms/nodejs) - Platform-specific features
