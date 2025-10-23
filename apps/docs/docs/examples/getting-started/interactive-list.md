---
sidebar_position: 2
---

# Interactive List

Create an interactive list widget with keyboard and mouse support.

## Code

```typescript
import { Screen, List, Box } from '@unblessed/node';

const screen = new Screen({ smartCSR: true });

const list = new List({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  label: ' {bold}{cyan-fg}Menu{/cyan-fg}{/bold} ',
  tags: true,
  keys: true,    // Enable keyboard navigation
  vi: true,      // Enable vi-style keys (j/k)
  mouse: true,   // Enable mouse selection
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: { fg: 'cyan' },
    selected: {
      bg: 'cyan',
      fg: 'black'
    }
  },
  items: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5'
  ]
});

const statusBox = new Box({
  parent: screen,
  top: 3,
  left: 'center',
  width: '50%',
  height: 3,
  content: 'Select an item with arrow keys or mouse',
  tags: true,
  style: {
    fg: 'yellow'
  }
});

list.on('select', (item, index) => {
  statusBox.setContent(`{bold}Selected:{/bold} ${item.getText()} (index: ${index})`);
  screen.render();
});

list.focus();
screen.key(['q', 'C-c'], () => process.exit(0));
screen.render();
```

## Try it Live

Visit the [Playground](/playground) and select "Interactive List" to try this example!

## Key Features

### Input Handling
- `keys: true` - Arrow key navigation
- `vi: true` - Vi-style j/k navigation
- `mouse: true` - Click to select

### Events
- `select` event - Fires when item is selected
- Returns selected item and index

### Styling Selected Items
```typescript
style: {
  selected: {
    bg: 'cyan',
    fg: 'black'
  }
}
```

## Next Steps

- Try [Tables](/docs/api/widgets/table)
- Learn about [Forms](/docs/api/widgets/form)
- Explore [all examples](/docs/examples)
