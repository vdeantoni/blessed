---
sidebar_position: 3
---

# Dashboard Layout

Create a multi-pane layout with header, sidebar, content, and footer.

## Code

```typescript
import { Screen, Box, List } from "@unblessed/node";

const screen = new Screen({ smartCSR: true });

const container = new Box({
  parent: screen,
  width: "100%",
  height: "100%",
});

// Header
const header = new Box({
  parent: container,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content: "{center}{bold}{cyan-fg}My Dashboard{/cyan-fg}{/bold}{/center}",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Sidebar
const sidebar = new List({
  parent: container,
  top: 3,
  left: 0,
  width: "30%",
  height: "100%-6",
  label: " {bold}Menu{/bold} ",
  tags: true,
  keys: true,
  mouse: true,
  border: { type: "line" },
  style: {
    border: { fg: "cyan" },
    selected: { bg: "cyan", fg: "black" },
  },
  items: ["Dashboard", "Users", "Settings", "Reports", "Help"],
});

// Main content
const content = new Box({
  parent: container,
  top: 3,
  left: "30%",
  width: "70%",
  height: "100%-6",
  border: { type: "line" },
  style: { border: { fg: "cyan" } },
  label: " {bold}Content{/bold} ",
  tags: true,
  content: "{center}Select a menu item{/center}",
  scrollable: true,
});

// Footer
const footer = new Box({
  parent: container,
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

sidebar.on("select", (item) => {
  const selected = item.getText();
  content.setContent(
    `{center}{bold}${selected}{/bold}{/center}\\n\\nThis is the ${selected} page.`,
  );
  screen.render();
});

sidebar.focus();
screen.key(["q", "C-c"], () => process.exit(0));
screen.render();
```

## Try it Live

Visit the [Home Page](/) and select "Dashboard Layout" from the examples to see this in action!

## Layout Tips

### Percentage-based Sizing

Use percentages for responsive layouts:

- `width: '30%'` - Takes 30% of parent width
- `height: '100%-6'` - Full height minus 6 lines

### Absolute Positioning

- `top: 0` - Top edge
- `bottom: 0` - Bottom edge
- `left: '30%'` - 30% from left

## Next Steps

- Explore [more examples](/docs/examples)
- Learn about [Performance](/docs/advanced/performance)
