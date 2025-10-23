---
sidebar_position: 4
---

# Migration from blessed

Learn how to migrate your existing blessed applications to unblessed.

## Drop-in Replacement

The easiest way to migrate is using `@unblessed/blessed`:

```bash
pnpm add @unblessed/blessed
```

Update your imports:

```diff
- import blessed from 'blessed';
+ import blessed from '@unblessed/blessed';
```

That's it\! Your app should work without any other changes.

## Modern API

For new projects or gradual migration, use the modern API:

```diff
- const blessed = require('blessed');
- const screen = blessed.screen();
+ import { Screen } from '@unblessed/node';
+ const screen = new Screen();
```

## Compatibility

unblessed is **100% backward compatible** with blessed v1.x in terms of API.

More migration details coming soon...
