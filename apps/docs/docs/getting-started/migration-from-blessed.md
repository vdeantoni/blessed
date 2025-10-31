---
sidebar_position: 4
---

# Migration from blessed

Learn how to migrate your existing blessed applications to unblessed.

## About unblessed

**unblessed** is built on top of the original [blessed](https://github.com/chjj/blessed) library. It was born as a fork but has evolved to become its own modern, TypeScript-first terminal UI library with cross-platform support.

While unblessed brings modern features like TypeScript, browser support, and improved architecture, we understand that many applications depend on the blessed API. That's why we provide a **100% backward-compatible** package for seamless migration.

## Drop-in Replacement with @unblessed/blessed

The easiest and recommended way to migrate is using `@unblessed/blessed`, which provides complete API compatibility with blessed.

### Installation

```bash
npm install @unblessed/blessed@alpha
# or
pnpm add @unblessed/blessed@alpha
# or
yarn add @unblessed/blessed@alpha
```

### For CommonJS (require)

If your project uses CommonJS:

```diff
- const blessed = require('blessed');
+ const blessed = require('@unblessed/blessed');

const screen = blessed.screen({
  smartCSR: true
});

const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}World{/bold}!',
  tags: true,
  border: {
    type: 'line'
  }
});

screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

screen.render();
```

That's it! Your code should work without any other changes.

### For ES Modules (import)

If your project uses ES modules:

```diff
- import blessed from 'blessed';
+ import blessed from '@unblessed/blessed';

const screen = blessed.screen({
  smartCSR: true
});

const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}World{/bold}!',
  tags: true,
  border: {
    type: 'line'
  }
});

screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

screen.render();
```

### TypeScript Projects

For TypeScript projects, you can continue using `@types/blessed`:

```typescript
import blessed from "@unblessed/blessed";
import type { Widgets } from "@unblessed/blessed";

const screen: Widgets.Screen = blessed.screen({
  smartCSR: true,
});

const options: Widgets.BoxOptions = {
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello World!",
  border: { type: "line" },
};

const box: Widgets.BoxElement = blessed.box(options);
screen.render();
```

## Upgrading to Modern API (Optional)

Once your app is working with `@unblessed/blessed`, you can gradually migrate to the modern API for better TypeScript support and tree-shaking:

### Step 1: Switch to @unblessed/node

```bash
npm install @unblessed/node@alpha
```

### Step 2: Update imports

```diff
- import blessed from '@unblessed/blessed';
+ import { Screen, Box } from '@unblessed/node';
```

### Step 3: Update widget creation

```diff
- const screen = blessed.screen({
+ const screen = new Screen({
    smartCSR: true
  });

- const box = blessed.box({
+ const box = new Box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello World!',
    border: { type: 'line' }
  });
```

The modern API offers:

- ✅ Better TypeScript inference
- ✅ Tree-shakeable imports
- ✅ Class-based API with better IDE support
- ✅ Cleaner, more explicit code

## Compatibility Notes

### What Works Exactly the Same

- **All widgets**: Screen, Box, List, Form, Input, Table, etc.
- **All options**: Positioning, styling, borders, scrolling
- **All events**: Mouse, keyboard, focus, blur, etc.
- **All methods**: `.setContent()`, `.focus()`, `.render()`, etc.
- **Color system**: Named colors, hex colors, RGB
- **Tag system**: `{bold}`, `{red-fg}`, etc.

### Known Differences

There are very few differences from blessed:

1. **Runtime initialization**: unblessed uses runtime dependency injection, but this is handled automatically when you import the package
2. **Node.js version**: unblessed requires Node.js >= 22.0.0 (blessed worked on older versions)

If you encounter any behavior differences, please report them as bugs!

## Testing Your Migration

After migrating, thoroughly test your application:

1. **Visual testing**: Verify UI renders correctly
2. **Interaction testing**: Test keyboard and mouse events
3. **Edge cases**: Test scrolling, focus management, complex layouts
4. **Performance**: Compare render performance

Consider using the [@unblessed/vrt](/docs/advanced/testing) package for visual regression testing.

## Need Help?

If you encounter issues during migration:

### Report Issues

Please report bugs and compatibility issues on GitHub:

**[GitHub Issues](https://github.com/vdeantoni/unblessed/issues)**

When reporting, include:

- Your unblessed version
- Your Node.js version
- Minimal code to reproduce the issue
- Expected vs. actual behavior
- Screenshots if relevant

### Ask Questions

For questions about migration or unblessed features:

- **[GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)** - Ask questions, share tips
- **[Documentation](/docs/getting-started/introduction)** - Comprehensive guides and API reference

### Contribute

Found a compatibility issue and know how to fix it? Contributions are welcome!

- Fork the repository
- Create a feature branch
- Submit a pull request with tests

## Migration Checklist

- [ ] Install `@unblessed/blessed@alpha`
- [ ] Update imports from `blessed` to `@unblessed/blessed`
- [ ] Test core functionality (rendering, events, layout)
- [ ] Test edge cases (scrolling, focus, complex UIs)
- [ ] Update Node.js to >= 22.0.0 if needed
- [ ] (Optional) Gradually migrate to modern API with `@unblessed/node`
- [ ] Report any compatibility issues on GitHub

## Next Steps

- [Quick Start Guide](/docs/getting-started/quick-start) - Learn unblessed patterns
- [API Reference](/docs/api/generated/widgets.screen.Class.Screen) - Explore all widgets
- [Platform Guides](/docs/platforms/nodejs) - Node.js and browser support
- [Testing Guide](/docs/advanced/testing) - Test your terminal UIs
