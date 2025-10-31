# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**unblessed** is a modernized, platform-agnostic terminal UI library based on blessed, organized as a monorepo with TypeScript, comprehensive tests, and multi-platform support.

### Architecture

```
@unblessed/core      → Platform-agnostic core (Runtime interface)
@unblessed/node      → Node.js runtime implementation
@unblessed/browser   → Browser runtime (XTerm.js integration)
@unblessed/blessed   → Backward-compatible wrapper
```

**Key Features:**
- Full TypeScript with strict mode
- Platform-agnostic via runtime dependency injection
- 1,987+ tests with 98.5% coverage
- Browser support via XTerm.js
- 100% backward compatible with blessed

**Current Version:** `1.0.0-alpha.10`

**Release Status:**
- ✅ Automated releases via semantic-release on `alpha` branch
- ✅ Published to npm with provenance
- ✅ Documentation site: https://unblessed.dev
- ✅ All packages use `workspace:^` for peerDependencies (auto-synced)

## Development Commands

### Prerequisites
- **Node.js:** >= 22.0.0
- **Package Manager:** pnpm (required, not npm)
- **Build Tool:** Turborepo + tsup

### Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm --filter @unblessed/core build
pnpm --filter @unblessed/browser build

# Watch mode for development
pnpm --filter @unblessed/core build:watch

# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @unblessed/core test
pnpm --filter @unblessed/browser test

# Run tests in watch mode
pnpm --filter @unblessed/core test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Lint & format
pnpm lint              # Auto-fix linting issues
pnpm lint:check        # Check only
pnpm format            # Auto-format code
pnpm format:check      # Check only

# Run benchmarks
pnpm --filter benchmarks bench

# Browser playground (development server)
pnpm --filter @unblessed/browser dev
# Then visit http://localhost:5173

# Clean build artifacts
pnpm clean
```

### Testing Individual Files

```bash
# Run specific test file
pnpm --filter @unblessed/core test -- __tests__/widgets/box.test.js

# Run tests matching pattern
pnpm --filter @unblessed/core test -- -t "Screen"

# Run with coverage for specific file
pnpm --filter @unblessed/core test:coverage -- __tests__/lib/colors.test.js
```

## Architecture & Key Patterns

### Runtime Dependency Injection

The core architectural pattern is **runtime dependency injection** for platform abstraction:

```typescript
// @unblessed/core defines the Runtime interface
export interface Runtime {
  fs: FileSystemAPI;
  process: ProcessAPI;
  tty: TtyAPI;
  buffer: BufferAPI;
  // ... other platform APIs
}

// Platform packages implement and initialize runtime
import { setRuntime } from '@unblessed/core';
setRuntime(new NodeRuntime());  // or BrowserRuntime()

// Core code accesses runtime via context
import { getRuntime } from './runtime-context';
const data = getRuntime().fs.readFileSync(path);
```

**Why this matters:**
- Single codebase works across Node.js, browsers, and future platforms
- Testable with mock runtimes
- Zero platform dependencies in @unblessed/core
- Easy to add new platforms (Deno, Bun, etc.)

### Package Responsibilities

**@unblessed/core** - Platform-agnostic core
- All widget logic, rendering engine, event handling
- Zero platform dependencies
- Defines Runtime interface
- Located in: `packages/core/`

**@unblessed/node** - Node.js runtime
- NodeRuntime implementation
- Auto-initializes on import
- Modern, class-based API
- Located in: `packages/node/`

**@unblessed/browser** - Browser runtime
- BrowserRuntime with polyfills
- XTerm.js integration
- Auto-initializes on import
- Interactive playground
- Located in: `packages/browser/`

**@unblessed/blessed** - Compatibility layer
- 100% backward compatible with blessed
- Thin wrapper over @unblessed/node
- Drop-in replacement
- Located in: `packages/blessed/`

### Key Architectural Decisions

Understanding these design decisions will help you maintain consistency:

**1. Auto-initialization Pattern**

Runtime packages auto-initialize on import - no manual setup required:

```typescript
// ✅ Simply import and use
import { Screen, Box } from '@unblessed/node';
const screen = new Screen({ smartCSR: true });

// ❌ Old pattern (removed) - no longer needed
import { initRuntime } from '@unblessed/node';
initRuntime();
```

**Why:** Reduces boilerplate and makes the API more ergonomic. Users shouldn't have to think about runtime initialization.

**2. Widget Attachment with `parent` Property**

Widgets attach to parents using the `parent` option:

```typescript
// ✅ Correct - use parent property
const box = new Box({
  parent: screen,
  content: 'Hello'
});

// ❌ Wrong - don't pass screen directly
const box = new Box(screen, { content: 'Hello' });
```

**Why:** Consistent with blessed API and allows for cleaner option objects.

**3. Browser Screen Auto-detection**

Browser Screen automatically detects XTerm.js Terminal instances:

```typescript
// ✅ Screen auto-creates XTermAdapter
import { Screen } from '@unblessed/browser';
const screen = new Screen({ terminal: term });

// ❌ Old pattern (removed)
import { createXTermScreen } from '@unblessed/browser';
const screen = createXTermScreen({ terminal: term });
```

**Why:** Simplifies API, removes redundant helper functions, and sets sensible defaults (smartCSR, fastCSR, fullUnicode).

**4. Browser Polyfills from npm**

Browser runtime uses battle-tested npm packages instead of custom polyfills:

- `util` package → inspect, format functions
- `stream-browserify` → Readable, Writable streams
- Custom polyfills only where necessary (fs with bundled data, process with event management)

**Why:** Reduces maintenance burden, leverages community-tested code, smaller bundle size.

**5. Single Source of Truth for Polyfills**

Browser runtime handles all polyfill initialization in `auto-init.ts`:

- Vite plugin only handles build optimization
- Runtime class in separate file (`browser-runtime.ts`)
- Clear separation: initialization vs implementation vs build

**Why:** Prevents duplicate initialization, easier to debug, clearer code organization.

### Testing Strategy

**Test Environment Setup:**
- Runtime initialized in `__tests__/setup.js`
- `NODE_ENV=test` allows runtime replacement
- Mock runtimes for unit tests

**Test Structure:**
```
packages/*/
└── __tests__/
    ├── setup.js          # Test initialization
    ├── helpers/          # Test utilities
    │   └── mock.js       # Runtime mocking
    ├── lib/              # Library tests
    └── widgets/          # Widget tests
```

**Coverage Targets:**
- Core modules: 70%+ (currently 98.5%)
- Widgets: 70%+
- Overall: 50%+ (exceeded)

**Testing with Runtime:**
```typescript
import { setRuntime } from '@unblessed/core';
import { initTestRuntime } from '../helpers/mock.js';

beforeAll(() => {
  initTestRuntime();
});
```

### Build System

**Monorepo Structure:**
```
unblessed/
├── packages/
│   ├── core/         # Platform-agnostic core
│   ├── node/         # Node.js runtime
│   ├── browser/      # Browser runtime
│   └── blessed/      # Compatibility layer
├── apps/
│   └── docs/         # Documentation
├── tools/
│   └── benchmarks/   # Performance benchmarks
└── scripts/          # Build & release scripts
```

**Build Configuration:**
- TypeScript strict mode enabled (all 8 flags)
- tsup for library builds (CJS + ESM + DTS)
- Turborepo for monorepo orchestration
- Vitest for testing
- Playwright for browser E2E tests

**Turborepo Tasks:**
- Tasks automatically run dependencies (e.g., `test` depends on `build`)
- Tasks cache outputs for faster rebuilds
- Use `--filter` to target specific packages

## Common Development Tasks

### Adding a New Widget

1. Create widget file in `packages/core/src/widgets/`:
```typescript
import { Box, type BoxOptions } from './box.js';

export interface MyWidgetOptions extends BoxOptions {
  myOption?: string;
}

export class MyWidget extends Box {
  constructor(options: MyWidgetOptions = {}) {
    super(options);
    this.type = 'mywidget';
  }
}
```

2. Export from `packages/core/src/widgets/index.ts`
3. Add tests in `packages/core/__tests__/widgets/`
4. Update documentation

### Adding Runtime API

```typescript
// 1. Add to Runtime interface (@unblessed/core/src/runtime.ts)
export interface Runtime {
  newAPI: NewAPIType;
}

// 2. Implement in platform packages
// @unblessed/node/src/runtime.ts
this.newAPI = require('new-api');

// @unblessed/browser/src/browser-runtime.ts
this.newAPI = { /* browser polyfill */ };

// 3. Use in core code via getRuntime()
const api = getRuntime().newAPI;
```

### Working with Colors

```typescript
import colors from './lib/colors.js';

// Convert hex to terminal color
const color = colors.convert('#ff0000');

// Reduce to palette size
const reduced = colors.reduce(color, 256);

// Match closest color
const matched = colors.match('#ff0000');
```

## Code Quality Guidelines

### TypeScript

1. **Strict Mode:** All strict flags must pass
2. **Type-only imports** from @types/node in core:
   ```typescript
   // ✅ Good
   import type { Readable, Writable } from 'stream';

   // ❌ Bad - creates runtime dependency
   import { Readable, Writable } from 'stream';
   ```

3. **Never use Node.js globals directly in core:**
   ```typescript
   // ❌ Bad
   import { Buffer } from 'buffer';

   // ✅ Good
   const Buffer = getRuntime().buffer.Buffer;
   ```

### Platform Agnostic Code

**In @unblessed/core, always use runtime context:**
```typescript
// ❌ Don't import platform APIs
import fs from 'fs';

// ✅ Use runtime context
import { getRuntime } from './runtime-context.js';
const runtime = getRuntime();
const data = runtime.fs.readFileSync(path);
```

### Compatibility

- **v1.x:** 100% backward compatible with blessed
- **No breaking changes** in v1.x
- All blessed examples should work

## Git & Release Process

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature (minor bump: 1.0.0 → 1.1.0)
feat(core): add new widget type

# Bug fix (patch bump: 1.0.0 → 1.0.1)
fix(browser): resolve xterm rendering issue

# Breaking change (major bump: 1.0.0 → 2.0.0)
feat(core)!: redesign widget API
```

**Commit Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactoring
- `perf` - Performance
- `test` - Tests
- `build` - Build system
- `ci` - CI/CD
- `chore` - Other changes

**Scopes:**
- `core` - @unblessed/core
- `node` - @unblessed/node
- `browser` - @unblessed/browser
- `blessed` - @unblessed/blessed
- `deps` - Dependencies
- `ci` - CI/CD
- `dx` - Developer experience

### Automated Releases

**Releases are 100% automated:**
1. Commit with conventional format
2. Merge PR to main
3. Automatic:
   - Version bump from commits
   - All packages stay in sync
   - Changelog generation
   - npm publish with provenance
   - GitHub release creation

See [RELEASE.md](./RELEASE.md) for details.

## Terminal Compatibility

**Officially Supported:**
- iTerm2, Alacritty, Kitty (macOS)
- gnome-terminal, konsole, xterm (Linux)
- Windows Terminal (Windows)
- tmux, screen (multiplexers)

**Minimum Requirements:**
- 256 color support
- Mouse support (SGR protocol)
- Unicode support
- CSR (change scroll region)

## Performance Baselines

**Target Metrics:**
- Empty screen render: ~6.5ms
- Complex screen (100 boxes): ~11ms
- Large list (1K items): ~187ms
- Event processing: < 2ms

**Run Benchmarks:**
```bash
pnpm --filter benchmarks bench
```

## Current Status

### Completed
- ✅ Full TypeScript conversion with strict mode
- ✅ Platform-agnostic core architecture
- ✅ Runtime dependency injection pattern
- ✅ 100% test coverage (1,987/1,987 tests)
- ✅ Browser support via XTerm.js
- ✅ Modern build tooling (tsup, pnpm, Turborepo)
- ✅ @unblessed/blessed compatibility layer
- ✅ Automated alpha releases via semantic-release
- ✅ Documentation site deployed to Vercel
- ✅ Sentry error tracking integration
- ✅ npm publishing with provenance

### Current (Alpha Release)
- 🚀 Version 1.0.0-alpha.10 published to npm
- 📚 Documentation site live at https://unblessed.dev
- 🔄 CI/CD fully automated (GitHub Actions + semantic-release)
- 📦 All packages available: core, node, browser, blessed, vrt

### Roadmap
- Performance optimization (Phase 4)
- Polish & release preparation (Phase 5)
- blessed-contrib integration (Phase 7)
- Declarative UI APIs (Phase 8, post-v1.0.0)

## Resources

### Documentation
- [README.md](./README.md) - Main documentation
- [API_REFERENCE.md](./API_REFERENCE.md) - API compatibility baseline
- [packages/core/CLAUDE.md](./packages/core/CLAUDE.md) - Core package details
- [packages/browser/CLAUDE.md](./packages/browser/CLAUDE.md) - Browser package details

### Package Documentation
- [@unblessed/core](./packages/core/README.md)
- [@unblessed/node](./packages/node/README.md)
- [@unblessed/browser](./packages/browser/README.md)
- [@unblessed/blessed](./packages/blessed/README.md)

### External Resources
- [blessed](https://github.com/chjj/blessed) - Original library
- [xterm.js](https://xtermjs.org/) - Browser terminal emulator
- [tsup](https://tsup.egoist.dev/) - Library bundler
- [Turborepo](https://turbo.build/) - Monorepo orchestration
- [Vitest](https://vitest.dev/) - Test framework

## Important Principles

**This is a modernization effort that respects the original blessed while bringing it to modern standards:**

1. **Safety First** - Comprehensive tests before any changes
2. **Incremental Progress** - Small, tested steps
3. **Maintain Compatibility** - v1.x is 100% backward compatible
4. **Test Coverage** - All new code must have tests (70%+ target)
5. **Platform Agnostic** - Use `getRuntime()` for all platform APIs
6. **No Breaking Changes** - v1.x maintains backward compatibility
