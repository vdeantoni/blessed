# Claude Context for @tui/core

This document provides architectural context and development guidelines for working on the `@tui/core` package.

## Overview

`@tui/core` is the **platform-agnostic core** of the Tui terminal UI library. It contains all widget logic, rendering code, and terminal control primitives while having **zero dependencies** on any specific platform (Node.js, browser, etc.).

**Key Principles:**
- Platform-agnostic design via runtime dependency injection
- Strict TypeScript with full type safety
- Comprehensive test coverage (100% - all 1,987 tests passing)
- Zero runtime dependencies

## Architecture

### Runtime Dependency Injection

All platform-specific operations go through a `Runtime` interface:

```typescript
// src/runtime.ts
export interface Runtime {
  fs: FileSystemAPI;        // File system operations
  path: PathAPI;            // Path manipulation
  process: ProcessAPI;      // Process I/O and environment
  childProcess: ChildProcessAPI;
  tty: TtyAPI;
  buffer: BufferAPI;        // Buffer operations
  stream: StreamAPI;        // Readable/Writable streams
  stringDecoder: StringDecoderAPI;
  url: UrlAPI;
  util: UtilAPI;
  net: NetAPI;
  png: PngAPI;              // PNG image library (pngjs)
  gif: GifAPI;              // GIF image library (omggif)
}
```

**Usage Pattern:**
```typescript
// ❌ Don't import platform APIs directly
import fs from 'fs';

// ✅ Use runtime context
import { getRuntime } from './runtime-context.js';
const runtime = getRuntime();
const data = runtime.fs.readFileSync(path);
```

### Runtime Context

Global singleton pattern for runtime access:

```typescript
// src/runtime-context.ts
let globalRuntime: Runtime | null = null;

export function setRuntime(runtime: Runtime): void {
  globalRuntime = runtime;
}

export function getRuntime(): Runtime {
  if (!globalRuntime) {
    throw new Error('Runtime not initialized');
  }
  return globalRuntime;
}
```

**Initialization:**
- Platform packages (@tui/node, @tui/browser) call `setRuntime()` at startup
- Core code accesses runtime via `getRuntime()`
- One runtime per process (Node.js) or browser tab

## Package Structure

```
packages/core/
├── src/
│   ├── index.ts              # Main entry point
│   ├── runtime.ts            # Runtime interface definitions
│   ├── runtime-context.ts    # Runtime context management
│   ├── lib/                  # Core library code
│   │   ├── colors.ts         # Color conversion utilities
│   │   ├── events.ts         # Event emitter
│   │   ├── gpmclient.ts      # GPM mouse protocol
│   │   ├── image-renderer.ts # PNG/GIF rendering
│   │   ├── keys.ts           # Keyboard event handling
│   │   ├── program.ts        # Terminal program interface
│   │   └── tput.ts           # Terminfo parser
│   ├── types/                # TypeScript type definitions
│   │   ├── common.ts         # Common types
│   │   ├── events.ts         # Event types
│   │   ├── options.ts        # Widget option types
│   │   └── style.ts          # Style types
│   └── widgets/              # Widget implementations
│       ├── index.ts          # Widget exports
│       ├── node.ts           # Base Node class
│       ├── screen.ts         # Screen widget
│       ├── element.ts        # Base Element class
│       ├── box.ts            # Box widget
│       └── ...               # Other widgets
├── data/
│   ├── terminfo/             # Terminfo database JSON files
│   └── fonts/                # Terminal font definitions
├── __tests__/
│   ├── helpers/
│   │   └── mock.js           # Test runtime mocking
│   ├── lib/                  # Library tests
│   └── widgets/              # Widget tests
├── package.json
├── tsconfig.json
├── tsup.config.ts            # Build configuration
├── vitest.config.ts          # Test configuration
├── README.md                 # User documentation
└── CLAUDE.md                 # This file
```

## Development Guidelines

### Adding New Platform Dependencies

If you need to use a new Node.js API:

1. **Add to Runtime interface** (`src/runtime.ts`):
```typescript
import type * as newModule from 'new-module';

export interface NewModuleAPI {
  someFunction: typeof newModule.someFunction;
}

export interface Runtime {
  // ... existing APIs
  newModule: NewModuleAPI;
}
```

2. **Use via getRuntime()** in implementation code:
```typescript
import { getRuntime } from '../runtime-context.js';

function useNewAPI() {
  const runtime = getRuntime();
  return runtime.newModule.someFunction();
}
```

3. **Update test mocks** (`__tests__/helpers/mock.js`):
```javascript
import * as newModule from 'new-module';

function createMockRuntime() {
  return {
    // ... existing APIs
    newModule: {
      someFunction: newModule.someFunction
    }
  };
}
```

### Testing

The test suite uses a mock runtime that provides real Node.js implementations:

```javascript
// __tests__/helpers/mock.js
import { setRuntime } from '../../src/runtime-context.js';
import * as fs from 'fs';
import * as path from 'path';
// ... other Node.js imports

export function initTestRuntime() {
  const runtime = createMockRuntime();
  setRuntime(runtime);
  return runtime;
}
```

**Always initialize runtime in tests:**
```javascript
import { describe, it, beforeAll } from 'vitest';
import { initTestRuntime } from '../helpers/mock.js';

describe('MyModule', () => {
  beforeAll(() => {
    initTestRuntime();
  });

  it('should work', () => {
    // Test code
  });
});
```

**Testing with environment variables:**
```javascript
import { setTestEnv, getTestEnv } from '../helpers/mock.js';

// Set environment variable in mock runtime
setTestEnv('TERM_PROGRAM', 'iTerm.app');

// Clear environment variable
setTestEnv('TERM_PROGRAM', undefined);

// ❌ Don't use process.env directly - it won't affect the mock runtime
process.env.TERM_PROGRAM = 'iTerm.app'; // Wrong!

// ✅ Always use setTestEnv() to modify environment in tests
setTestEnv('TERM_PROGRAM', 'iTerm.app'); // Correct!
```

### Build System

The package uses `tsup` for building:

```typescript
// tsup.config.ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    runtime: 'src/runtime.ts',
    'widgets/index': 'src/widgets/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false
});
```

**Multiple entry points:**
- `index` - Main package entry
- `runtime` - Runtime interfaces for adapters
- `widgets/index` - Widget exports

**Build outputs:**
- ESM: `.js` files
- CommonJS: `.cjs` files
- TypeScript definitions: `.d.ts` and `.d.cts` files

### Type Safety

**Use type-only imports from @types/node:**
```typescript
// ✅ Good
import type { Readable, Writable } from 'stream';

// ❌ Bad - runtime import
import { Readable, Writable } from 'stream';
```

**Never use Node.js globals directly:**
```typescript
// ❌ Bad
import { Buffer } from 'buffer';
const buf = Buffer.from('data');

// ✅ Good
import { getRuntime, type BufferType } from './runtime-context.js';
const runtime = getRuntime();
const Buffer = runtime.buffer.Buffer;
const buf = Buffer.from('data');
```

### Error Handling

Don't use `assert()` - throw explicit errors:

```typescript
// ❌ Bad
import assert from 'assert';
assert(condition, 'Error message');

// ✅ Good
if (!condition) {
  throw new Error('Error message');
}
```

## Key Design Decisions

### 1. Why Runtime Dependency Injection?

**Problem**: Traditional terminal libraries are tightly coupled to Node.js APIs, making them impossible to use in browsers or other JavaScript environments.

**Solution**: Abstract all platform operations behind interfaces that can be implemented differently for each platform.

**Benefits**:
- Single codebase works in Node.js, browsers, Electron, etc.
- Platform adapters can optimize for their environment
- Testing is easier with mock implementations
- Zero dependencies = smaller bundle size

### 2. Why @types/node with type-only imports?

**Problem**: Importing Node.js modules creates runtime dependencies even if only using types.

**Solution**: Use `import type` syntax to ensure types are erased during compilation.

**Benefits**:
- TypeScript type safety without runtime dependencies
- No Node.js code bundled in the package
- Works in any JavaScript environment

### 3. Why separate packages for adapters?

**Problem**: Different platforms have different requirements and dependencies.

**Solution**: Core package has zero dependencies, adapter packages (`@tui/node`, `@tui/browser`) provide implementations.

**Benefits**:
- Users only install what they need
- Adapter-specific optimizations possible
- Clear separation of concerns

## Common Tasks

### Adding a New Widget

1. Create widget file in `src/widgets/`:
```typescript
import { Box, type BoxOptions } from './box.js';

export interface MyWidgetOptions extends BoxOptions {
  myOption?: string;
}

export class MyWidget extends Box {
  options!: MyWidgetOptions;

  constructor(options: MyWidgetOptions = {}) {
    super(options);
    this.type = 'mywidget';
    // Initialize widget
  }
}

export default MyWidget;
```

2. Export from `src/widgets/index.ts`:
```typescript
export { MyWidget } from './mywidget.js';
export type { MyWidgetOptions } from './mywidget.js';
```

3. Add tests in `__tests__/widgets/mywidget.test.js`

4. Document in README.md

### Adding Terminal Capabilities

Terminal capabilities come from terminfo/termcap databases:

1. **Parse terminfo**: `src/lib/tput.ts` handles terminfo parsing
2. **Capability methods**: `src/lib/program.ts` provides high-level methods
3. **Raw control**: Use `program._write()` for raw escape sequences

**Bundled Terminfo Files:**

The core package includes fallback terminfo/termcap files in `data/`:
- `xterm.terminfo` - Binary terminfo database
- `xterm.termcap` - Text termcap database

**Accessing Bundled Data:**

Use the `getDataPath()` helper to resolve paths to bundled data files:

```typescript
import { getDataPath, getRuntime } from './runtime-helpers.js';

// Get path to data directory
const dataDir = getDataPath();

// Load bundled terminfo file
const terminfo = runtime.fs.readFileSync(
  runtime.path.join(getDataPath(), 'xterm.terminfo')
);
```

**Terminfo Loading Order** (`tput.ts`):
1. System terminfo files (e.g., `/usr/share/terminfo/`)
2. User terminfo files (`~/.terminfo/`)
3. Bundled fallback files in `data/` directory
4. Compiled-in definitions

### Working with Colors

The `colors` module (`src/lib/colors.ts`) handles color conversion:

```typescript
import colors from './lib/colors.js';

// Convert hex to terminal color
const color = colors.convert('#ff0000');

// Reduce to palette size
const reduced = colors.reduce(color, 256);

// Match closest color
const matched = colors.match('#ff0000');
```

### Handling Images

Image rendering (`src/lib/image-renderer.ts`) supports PNG and GIF:

```typescript
import { ImageRenderer } from './lib/image-renderer.js';
import colors from './lib/colors.js';

const img = new ImageRenderer(buffer, {
  colors: colors,
  width: 80,
  height: 24,
  ascii: true  // Use ASCII for better rendering
});

// Get terminal-ready cellmap
const cellmap = img.cellmap;

// Render to screen
img.renderScreen(cellmap, screen, 0, screen.width, 0, screen.height);
```

## Known Issues

### EventEmitter.listenerCount

TypeScript reports an error about `EventEmitter.listenerCount` in `src/lib/keys.ts`:

```
error TS2339: Property 'listenerCount' does not exist on type 'typeof EventEmitter'.
```

**Reason**: Node.js v18+ moved `listenerCount` from static method to instance method.

**Impact**: Minimal - the code works at runtime in Node.js environments.

**Solution**: This is a minor compatibility issue that should be addressed by updating to use instance method or using a polyfill in the runtime.

### Property Name Collisions with Terminfo

The `Program` class copies all terminfo capabilities to itself via `setupTput()`. This can cause collisions with Program properties if they share names with terminfo capabilities.

**Example Collision:**
- Terminfo has an `index` capability (ESC D - Index)
- Program had a property to track its instance index

**Solution**: Use namespaced property names for Program internals:
```typescript
// ❌ Bad - collides with terminfo 'index' capability
get index(): number {
  return this._programIndex;
}

// ✅ Good - namespaced to avoid collision
get programIndex(): number {
  return this._programIndex ?? -1;
}
```

**Known Safe Property Names:**
- `programIndex` - Instance index in Program.instances array
- Internal properties prefixed with `_` (e.g., `_programIndex`)

**Checking for Collisions:**
1. Search terminfo database for capability names
2. Avoid short, generic names like `index`, `tab`, `clear`
3. Prefix Program-specific properties with `program*` or `_`

## Testing Strategy

The package has comprehensive test coverage:

- **Unit tests**: All core libraries and utilities
- **Widget tests**: Each widget type and behavior
- **Integration tests**: Screen rendering, event handling
- **Image tests**: PNG/GIF parsing and rendering

**Test utilities** (`__tests__/helpers/mock.js`):
- `createMockRuntime()`: Creates a runtime with real Node.js implementations
- `initTestRuntime()`: Initializes and sets the global runtime
- `createMockScreen()`: Creates a mock screen for widget testing

**Running tests:**
```bash
pnpm test              # Run all tests once
pnpm test:watch        # Watch mode
pnpm test -- --ui      # Interactive UI
pnpm test -- --coverage # Coverage report
```

## Performance Considerations

### Screen Rendering

- **Smart CSR**: Use `smartCSR: true` to minimize screen updates
- **Dirty tracking**: Only re-render changed regions
- **Buffer optimization**: Minimize escape sequence output

### Memory Usage

- **Cellmap caching**: Cache rendered cellmaps for images
- **Event listener cleanup**: Always remove listeners when destroying widgets
- **Screen buffer**: Reuse screen buffer arrays

### Optimization Tips

1. **Batch updates**: Use `screen.render()` once after multiple changes
2. **Avoid unnecessary renders**: Check if content actually changed
3. **Use alwaysScroll: false**: Unless you need continuous scrolling
4. **Limit image sizes**: Scale images before rendering

## Debugging Tips

### Enable Debug Logging

```typescript
const screen = new Screen({
  debug: true,
  log: './debug.log'
});
```

### Inspect Screen Buffer

```typescript
console.log(screen.lines);  // View screen buffer
console.log(screen.olines); // View old buffer for diffing
```

### Check Widget Tree

```typescript
function printTree(node, indent = 0) {
  console.log('  '.repeat(indent) + node.type);
  node.children.forEach(child => printTree(child, indent + 1));
}

printTree(screen);
```

### Mouse Event Debugging

```typescript
screen.on('mouse', (data) => {
  console.log('Mouse:', data.action, data.x, data.y, data.button);
});
```

## Migration from Blessed

If migrating from blessed:

1. **Install runtime adapter**:
   ```bash
   npm install @tui/node
   ```

2. **Initialize runtime**:
   ```typescript
   import { createNodeRuntime } from '@tui/node';
   createNodeRuntime();
   ```

3. **Update imports**:
   ```typescript
   // Before
   import blessed from 'blessed';

   // After
   import { Screen, Box, List } from '@tui/core';
   ```

4. **API is mostly compatible** - Most blessed code should work with minimal changes

## Future Enhancements

Potential areas for improvement:

- [ ] Complete browser support with WebGL rendering
- [ ] WebSocket-based PTY for browser terminal
- [ ] Better mobile/touch support
- [ ] Accessibility features (screen readers)
- [ ] Better Unicode/emoji handling
- [ ] Animation support
- [ ] Theme system
- [ ] Plugin architecture
- [ ] Performance profiling tools

## Resources

- **Original blessed**: https://github.com/chjj/blessed
- **Terminfo docs**: https://man7.org/linux/man-pages/man5/terminfo.5.html
- **ANSI escape codes**: https://en.wikipedia.org/wiki/ANSI_escape_code
- **XTerm control sequences**: https://invisible-island.net/xterm/ctlseqs/ctlseqs.html

## Getting Help

- Check the test suite for usage examples
- Review widget implementations for patterns
- Read the original blessed documentation (most concepts apply)
- Look at platform adapter implementations (`@tui/node`, `@tui/browser`)
