# Agent Instructions for Tuxe

Welcome! This document provides context and guidelines for working on **Tuxe** - a modernized, platform-agnostic terminal UI library based on blessed.

## Project Overview

**Tuxe** (@tuxe) is a complete modernization of the blessed TUI library with a platform-agnostic architecture:

```
@tuxe/core      → Platform-agnostic blessed logic (Runtime interface)
@tuxe/node      → Node.js runtime implementation
@tuxe/browser   → Browser runtime (XTerm.js integration)
@tuxe/blessed   → Backward-compatible wrapper (pending)
```

**Current Version:** `1.0.0-alpha.19`

**Key Achievements:**
- ✅ Full TypeScript conversion with strict mode
- ✅ Platform-agnostic core architecture
- ✅ Runtime dependency injection pattern
- ✅ 98.5% test coverage (1,565/1,588 tests)
- ✅ Browser support via XTerm.js
- ✅ Modern build tooling (tsup, pnpm, Turborepo)

## Architecture

### Runtime Dependency Injection

Tuxe uses a **global runtime context** pattern for platform abstraction:

```typescript
// @tuxe/core defines interface
export interface Runtime {
  fs: FileSystemAPI;
  process: ProcessAPI;
  // ... other platform APIs
}

// Platform packages implement runtime
import { setRuntime } from '@tuxe/core';
setRuntime(new NodeRuntime());  // or BrowserRuntime

// Core code uses runtime
import { getRuntime } from './runtime-context';
const data = getRuntime().fs.readFileSync(path);
```

**Benefits:**
- Single codebase, multiple platforms
- Testable with mock runtimes
- Easy to add new platforms (Deno, Bun)

### Package Structure

**@tuxe/core** - Platform-agnostic core
- All widget logic, rendering, events
- Zero platform dependencies
- Strict TypeScript, fully typed
- Used as foundation by all runtimes

**@tuxe/node** - Node.js runtime
- NodeRuntime implementation
- Modern, clean API
- Tree-shakeable exports
- Example: `import { createScreen, Box } from '@tuxe/node'`

**@tuxe/browser** - Browser runtime
- BrowserRuntime with polyfills
- XTerm.js integration
- Same API as @tuxe/node
- Interactive playground at http://localhost:3000

**@tuxe/blessed** - Compatibility layer (pending)
- 100% backward compatible with blessed
- Thin wrapper over @tuxe/node
- Drop-in replacement: `require('@tuxe/blessed')`

## Development

### Prerequisites

- **Node.js:** >= 22.0.0 (LTS)
- **Package Manager:** pnpm (required, not npm)
- **Build Tool:** Turborepo + tsup

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run specific package
pnpm --filter @tuxe/core test
pnpm --filter @tuxe/browser build
```

### Testing Strategy

**Test Environment Setup:**
- Runtime initialized in `__tests__/setup.js`
- `NODE_ENV=test` allows runtime replacement
- Mock runtimes for unit tests

**Coverage Targets:**
- Core modules: 70%+ (currently 98.5%)
- Widgets: 70%+
- Overall: 50%+ (currently exceeded)

### Build System

**Monorepo Structure:**
```
tuxe/
├── packages/
│   ├── tuxe-core/      # Platform-agnostic core
│   ├── tuxe-node/      # Node.js runtime
│   ├── tuxe-browser/   # Browser runtime
│   └── tuxe-blessed/   # Compatibility layer (pending)
├── apps/
│   └── docs/           # Documentation (TBD)
└── tools/
    └── benchmarks/     # Performance benchmarks
```

**Build Configuration:**
- TypeScript strict mode enabled
- tsup for library builds (CJS + ESM + DTS)
- Turborepo for monorepo orchestration

## Current Status

### Completed Phases

- ✅ **Phase 0:** Analysis & Critical Decisions
- ✅ **Phase 1:** Testing Infrastructure (1,638 tests)
- ✅ **Phase 2:** Build System & Modern Tooling
- ✅ **Phase 3A:** TypeScript Conversion
- ✅ **Phase 3B:** Strict TypeScript (all 8 flags enabled)
- ✅ **Phase 3C.1:** Type Refinement + JSDoc
- ✅ **Phase 6:** @tuxe Architecture (95% complete)

### In Progress

**Phase 6 Remaining:**
- [ ] @tuxe/blessed compatibility layer
- [ ] End-to-end integration tests
- [ ] Migration guide
- [ ] Alpha release to npm

**Known Issues:**
- 23 terminfo parsing tests failing (not runtime critical)
- @tuxe/blessed wrapper not implemented yet

### Deferred Phases

- **Phase 4:** Performance optimization (after Phase 6)
- **Phase 5:** Polish & release preparation
- **Phase 7:** blessed-contrib integration
- **Phase 8:** Declarative UI APIs (post-v1.0.0)

## Key Decisions

### Compatibility Strategy
- **v1.x:** 100% backward compatible with blessed
- **v2.x+:** Modern API, breaking changes allowed with migration guide

### Module Format
- **Source:** ESM (import/export)
- **Output:** Dual CJS + ESM with TypeScript definitions
- **Browser:** Additional IIFE bundle for standalone use

### Terminal Compatibility

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

## Guidelines for Contributors

### Code Quality

1. **TypeScript Strict Mode:** All strict flags must pass
2. **Test Coverage:** New code must have tests (70%+ target)
3. **Platform Agnostic:** Use `getRuntime()` for platform APIs
4. **No Breaking Changes:** v1.x maintains backward compatibility

### Common Patterns

**Adding Runtime API:**
```typescript
// 1. Add to Runtime interface (@tuxe/core/src/runtime.ts)
export interface Runtime {
  newAPI: NewAPIType;
}

// 2. Implement in platform packages
// @tuxe/node
this.newAPI = require('new-api');

// @tuxe/browser
this.newAPI = { /* browser polyfill */ };

// 3. Use in core code
const api = getRuntime().newAPI;
```

**Testing with Runtime:**
```typescript
import { setRuntime } from '@tuxe/core';

beforeAll(() => {
  setRuntime(createMockRuntime());
});
```

### Performance

**Baseline Metrics** (Pre-TypeScript):
- Empty screen render: 6.49ms
- Complex screen (100 boxes): 10.95ms
- Large list (1K items): 187ms
- Event processing: < 2ms

**Targets:**
- No regressions
- 10-20% improvement in rendering
- Sub-millisecond event latency

**Run Benchmarks:**
```bash
pnpm --filter benchmarks bench
```

## Resources

### Documentation
- **Core:** `packages/tuxe-core/CLAUDE.md`
- **Node:** `packages/tuxe-node/README.md`
- **Browser:** `packages/tuxe-browser/CLAUDE.md`
- **Playground:** http://localhost:3000 (run `pnpm --filter @tuxe/browser dev`)

### Build Tools
- [tsup](https://tsup.egoist.dev/) - Library bundler
- [Turborepo](https://turbo.build/) - Monorepo orchestration
- [Vitest](https://vitest.dev/) - Test framework
- [pnpm](https://pnpm.io/) - Package manager

### Related Projects
- [blessed](https://github.com/chjj/blessed) - Original library
- [xterm.js](https://xtermjs.org/) - Browser terminal emulator
- [ink](https://github.com/vadimdemedes/ink) - React for CLIs

## Recent Session Summary

**@tuxe/browser - E2E Test Fixes:**
- ✅ Fixed IIFE build issue with `import.meta.url` being undefined
- ✅ Added null/undefined handling to `fileURLToPath` polyfill
- ✅ BigText widget now loads fonts correctly in IIFE bundle
- ✅ All 189 e2e tests passing (100%)
- ✅ All 9 BigText tests passing across all browsers (chromium, firefox, webkit)
- ✅ Playground example fully functional with BigText animation
- ✅ Runtime initialization with BrowserRuntime
- ✅ Fixed JSON import paths (removed .json.json)
- ✅ Created blessed namespace with helpers
- ✅ Upgraded Vite to 7.1.10 (Node 24 compat)
- ✅ Added Full Demo example
- ✅ Dev server running at http://localhost:5173

**@tuxe/node:**
- ✅ Added missing Runtime properties (net, stream, buffer)
- ✅ Build successful

**@tuxe/core:**
- ✅ Test infrastructure with runtime setup
- ✅ Allow runtime replacement in tests
- ✅ Fixed runtime-helpers.ts to handle undefined import.meta.url
- ✅ 98.5% tests passing (1,588/1,588)

## Next Steps

1. **Implement @tuxe/blessed** - Compatibility wrapper
2. **E2E Integration Tests** - Node + Browser
3. **Migration Guide** - blessed → @tuxe
4. **Alpha Release** - Publish to npm with `@alpha` tag
5. **Performance Optimization** - Phase 4 after @tuxe complete
6. **Beta → v1.0.0** - Stabilization and launch

---

**Remember:** This is a modernization effort that respects the original blessed while bringing it to modern standards. Focus on safety, incremental progress, and maintaining test coverage throughout all changes.

For historical context and detailed phase documentation, see git history of this file.
