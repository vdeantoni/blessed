# @tui/blessed

100% backward-compatible blessed API wrapper for [@tui/node](../node).

[![npm version](https://img.shields.io/npm/v/@tui/blessed)](https://www.npmjs.com/package/@tui/blessed)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

## Overview

`@tui/blessed` provides a 100% backward-compatible API with the original [blessed](https://github.com/chjj/blessed) library. It's a thin wrapper over `@tui/node` that maintains the exact same API surface, making migration seamless.

**Use this package if:**
- ✅ You have existing blessed code
- ✅ You want a drop-in replacement for blessed
- ✅ You need to maintain API compatibility
- ✅ You're migrating gradually from blessed

**Use [@tui/node](../node) instead if:**
- 🚀 You're starting a new project
- 🎯 You want a modern, typed API
- 📦 You prefer ES modules over CommonJS

## Installation

```bash
npm install @tui/blessed
# or
pnpm add @tui/blessed
# or
yarn add @tui/blessed
```

## Quick Start

### CommonJS (Original blessed style)

```javascript
const blessed = require('@tui/blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'My App'
});

const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}Hello from @tui/blessed!{/bold}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#f0f0f0'
    }
  }
});

screen.key(['escape', 'q', 'C-c'], () => {
  process.exit(0);
});

box.focus();
screen.render();
```

### ES Modules

```typescript
import blessed from '@tui/blessed';
// or
import * as blessed from '@tui/blessed';

const screen = blessed.screen({
  smartCSR: true
});

const box = blessed.box({
  parent: screen,
  content: 'Hello!'
});

screen.render();
```

## Complete Documentation

For comprehensive blessed documentation including all widgets, examples, and FAQ:

- **[Blessed Guide](./BLESSED_GUIDE.md)** - Complete blessed API reference with detailed examples, widget catalog, and FAQs
- **[API Reference](../../API_REFERENCE.md)** - Structured API compatibility baseline for all blessed v0.1.82 features

The Blessed Guide includes:
- Detailed widget documentation (27+ widgets)
- Tag system and content formatting
- Style and color system
- Event handling and bubbling
- Positioning and rendering
- Terminal compatibility notes
- Comprehensive FAQ

## API Compatibility

`@tui/blessed` maintains 100% API compatibility with blessed:

### Widget Factory Functions

```javascript
// Lowercase factory functions (blessed style)
blessed.screen()
blessed.box()
blessed.list()
blessed.form()
blessed.button()
blessed.textbox()
blessed.textarea()
blessed.checkbox()
blessed.radioset()
blessed.table()
blessed.listtable()
blessed.log()
blessed.progressbar()
blessed.filemanager()
// ... all blessed widgets

// PascalCase factory functions (also supported)
blessed.Screen()
blessed.Box()
blessed.List()
// ... all blessed widgets
```

### Widget Classes

```javascript
const { Box, List, Screen } = blessed;

const screen = new Screen();
const box = new Box({ parent: screen });
```

### Utility Functions

```javascript
blessed.program()     // Create a Program
blessed.tput()        // Access terminfo
blessed.colors        // Color utilities
blessed.unicode       // Unicode utilities
blessed.helpers       // Helper functions
```

## Migration from blessed

### Drop-in Replacement

Simply replace `blessed` with `@tui/blessed`:

```diff
- const blessed = require('blessed');
+ const blessed = require('@tui/blessed');
```

That's it! Your code should work without any other changes.

### Gradual Migration

You can migrate to `@tui/node` gradually:

1. **Step 1**: Replace `blessed` with `@tui/blessed` (no code changes)
2. **Step 2**: Test thoroughly
3. **Step 3**: Optionally migrate to `@tui/node` for modern API

```javascript
// @tui/blessed (backward compatible)
const blessed = require('@tui/blessed');
const screen = blessed.screen();

// @tui/node (modern API)
import { Screen } from '@tui/node';
const screen = new Screen();
```

## Differences from Original blessed

While `@tui/blessed` maintains API compatibility, there are some under-the-hood improvements:

**Improvements:**
- ✅ Full TypeScript support with types
- ✅ Modern ES modules + CommonJS dual build
- ✅ Better performance (smart rendering)
- ✅ Platform-agnostic architecture
- ✅ Active maintenance

**Behavioral Changes:**
- Runtime initialization is automatic (no setup needed)
- Some internal implementation details differ
- Uses modern Node.js APIs under the hood

**Not Yet Supported:**
- Some legacy/undocumented APIs may not be present
- Report any compatibility issues on GitHub

## TypeScript Support

`@tui/blessed` includes complete TypeScript definitions:

```typescript
import blessed from '@tui/blessed';
import type { Widgets } from '@tui/blessed';

const screen = blessed.screen({
  smartCSR: true
});

// Type-safe widget options
const box: Widgets.BoxElement = blessed.box({
  parent: screen,
  top: 0,
  left: 0
});
```

## Why Use This Package?

**Pros:**
- ✅ Zero code changes from blessed
- ✅ Immediate migration path
- ✅ Maintains muscle memory and documentation
- ✅ Compatible with blessed examples and tutorials
- ✅ TypeScript support included

**Cons:**
- ❌ Uses older factory function API
- ❌ Less modern than `@tui/node`
- ❌ Slightly larger bundle (includes compatibility layer)

For new projects, we recommend [@tui/node](../node) for a cleaner, more modern API.

## Examples

All original blessed examples should work. Here are a few:

### List Widget

```javascript
const blessed = require('@tui/blessed');

const screen = blessed.screen();

const list = blessed.list({
  parent: screen,
  border: 'line',
  width: '50%',
  height: '50%',
  top: 'center',
  left: 'center',
  label: ' My List ',
  keys: true,
  vi: true,
  style: {
    selected: {
      bg: 'blue'
    }
  }
});

list.setItems(['Item 1', 'Item 2', 'Item 3']);

list.on('select', (item, index) => {
  console.log('Selected:', item.getText());
});

screen.key(['escape', 'q'], () => process.exit(0));
screen.render();
```

### Form Widget

```javascript
const blessed = require('@tui/blessed');

const screen = blessed.screen();

const form = blessed.form({
  parent: screen,
  keys: true,
  left: 'center',
  top: 'center',
  width: 30,
  height: 10,
  border: 'line',
  label: ' Login '
});

const username = blessed.textbox({
  parent: form,
  name: 'username',
  top: 1,
  left: 1,
  height: 1,
  width: 25,
  label: ' Username: ',
  keys: true
});

const submit = blessed.button({
  parent: form,
  top: 6,
  left: 'center',
  shrink: true,
  padding: { left: 1, right: 1 },
  content: 'Submit',
  keys: true
});

submit.on('press', () => {
  form.submit();
});

form.on('submit', (data) => {
  console.log('Submitted:', data);
  process.exit(0);
});

screen.render();
```

## Troubleshooting

**Module not found errors?**

Make sure you have the latest version:
```bash
npm update @tui/blessed
```

**TypeScript errors?**

Include `@tui/blessed` types:
```json
{
  "compilerOptions": {
    "types": ["@tui/blessed"]
  }
}
```

**Runtime errors?**

Check that you're using Node.js >= 18:
```bash
node --version
```

## Resources

- [blessed Documentation](https://github.com/chjj/blessed) - Original blessed docs
- [@tui/node](../node) - Modern alternative
- [@tui/core](../core) - Core library
- [Examples](../node/examples) - Working examples

## License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

## Related

- [@tui/node](../node) - Node.js runtime adapter (modern API)
- [@tui/core](../core) - Core TUI library
- [@tui/browser](../browser) - Browser runtime adapter
- [blessed](https://github.com/chjj/blessed) - Original library
