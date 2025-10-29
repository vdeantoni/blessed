---
sidebar_position: 2
---

# Installation

Install unblessed based on your platform.

## Node.js

For server-side terminal applications:

```bash
pnpm add @unblessed/node
# or
npm install @unblessed/node
# or
yarn add @unblessed/node
```

**TypeScript types are included** - no need for separate `@types` packages.

## Browser

For browser-based terminal applications with XTerm.js:

```bash
pnpm add @unblessed/browser xterm @xterm/addon-fit
# or
npm install @unblessed/browser xterm @xterm/addon-fit
```

You'll also need to include the XTerm.js CSS:

```javascript
import "xterm/css/xterm.css";
```

## blessed Compatibility Layer

For existing blessed applications (100% backward compatible):

```bash
pnpm add @unblessed/blessed
# or
npm install @unblessed/blessed
```

Simply replace your blessed imports:

```diff
- import blessed from 'blessed';
+ import blessed from '@unblessed/blessed';
```

## Requirements

- **Node.js**: >= 22.0.0
- **Package Manager**: pnpm, npm, or yarn
- **TypeScript** (optional): >= 5.0.0

## Verify Installation

Create a simple test file:

```typescript
// test.ts
import { Screen, Box } from "@unblessed/node";

const screen = new Screen();
const box = new Box({
  parent: screen,
  content: "It works!",
  width: "50%",
  height: "50%",
  top: "center",
  left: "center",
  border: { type: "line" },
});

screen.render();
setTimeout(() => process.exit(0), 2000);
```

Run it:

```bash
tsx test.ts
# or
ts-node test.ts
# or compile and run
```

## Next Steps

- [Quick Start](./quick-start) - Build your first complete application
- [Platform Guides](/docs/platforms/nodejs) - Platform-specific details
