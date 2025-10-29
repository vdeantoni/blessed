---
sidebar_position: 1
---

# Introduction

Welcome to **unblessed** - a modern, platform-agnostic terminal UI library built with TypeScript.

## What is unblessed?

unblessed is a complete modernization of the popular [blessed](https://github.com/chjj/blessed) TUI library, bringing it to modern TypeScript standards while maintaining 100% backward compatibility.

### Key Features

- **TypeScript-First**: Built from the ground up with TypeScript in strict mode
- **Cross-Platform**: Run your TUI apps in Node.js AND browsers with XTerm.js
- **100% Compatible**: Drop-in replacement for blessed via `@unblessed/blessed`
- **Modern Tooling**: ESM + CJS builds, comprehensive tests, semantic versioning
- **Modular**: Install only what you need

## Quick Example

```typescript
import { Screen, Box } from "@unblessed/node";

const screen = new Screen({ smartCSR: true });

const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello {bold}unblessed{/bold}!",
  tags: true,
  border: { type: "line" },
  style: {
    fg: "white",
    border: { fg: "cyan" },
  },
});

screen.key(["q", "C-c"], () => process.exit(0));
screen.render();
```

## Next Steps

- [Installation](./installation) - Get started with unblessed
- [Quick Start](./quick-start) - Build your first TUI app
- [Migration from blessed](./migration-from-blessed) - Convert existing blessed apps
