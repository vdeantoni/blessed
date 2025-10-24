---
sidebar_position: 1
---

# Simple Box

Create a basic box widget with styling and positioning.

## Code

```typescript
import { Screen, Box } from '@unblessed/node';

const screen = new Screen({ smartCSR: true });

const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}{cyan-fg}Hello unblessed!{/cyan-fg}{/bold}\\n\\n' +
           'This is a simple box widget.\\n\\n' +
           'Press q to quit.',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'cyan'
    }
  }
});

screen.key(['q', 'C-c'], () => process.exit(0));
screen.render();
```

## Try it Live

Visit the [Home Page](/) and select "Simple Box" from the examples to see this running in your browser!

## Key Concepts

### Positioning
- `top: 'center'` - Center vertically
- `left: 'center'` - Center horizontally
- Can use percentages (`'50%'`) or absolute values (`10`)

### Sizing
- `width: '50%'` - 50% of parent width
- `height: '50%'` - 50% of parent height

### Styling
- `tags: true` - Enable styled text tags like `{bold}` and `{cyan-fg}`
- `border` - Add borders (line, bg, none, etc.)
- `style` - Colors and attributes

## Next Steps

- Learn about [Interactive Lists](./interactive-list)
- Explore [all widgets](/docs/api/generated/widgets.box.Class.Box)
