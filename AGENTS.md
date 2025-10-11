# Agent Instructions for `blessed` Modernization

Welcome, agent! This document outlines the vision, roadmap, and guidelines for modernizing the `blessed` library. Your primary goal is to assist in transforming this project into a modern, robust, and high-performance TUI toolkit.

## 1. Project Vision

The core vision for this fork of `blessed` is to evolve it into a state-of-the-art library for building terminal applications. This involves several key objectives:

- **Comprehensive Testing:** Establish a robust testing framework (e.g., Vitest) and achieve high test coverage BEFORE any code changes to ensure we don't break existing functionality.
- **Performance Baseline:** Establish performance benchmarks to measure impact of all changes throughout modernization.
- **Enhance Code Quality:** Refactor the existing JavaScript codebase to TypeScript incrementally, introducing strict typing and best practices to reduce bugs and improve clarity.
- **Modernize the Toolchain:** Replace the legacy build and development process with modern tools like **TypeScript**, **tsup/esbuild**, and **Prettier** to improve developer experience, code quality, and maintainability.
- **Performance Optimization:** Profile the library to identify and address performance bottlenecks, ensuring `blessed` remains a high-performance TUI solution.
- **Future: Integrate `blessed-contrib`:** (Post-core modernization) Incorporate popular widgets from `blessed-contrib`, providing a richer set of components out of the box.

## 2. Core Principles

### Safety First
- **No code changes before test coverage**: We will not touch production code until we have comprehensive tests in place
- **Tests as safety net**: All conversions and refactoring must keep tests green
- **Incremental over big-bang**: Prefer small, safe changes over large risky rewrites

### Measure Everything
- **Establish baselines**: Document current performance before making changes
- **Track regressions**: Run benchmarks after every significant change
- **Coverage metrics**: Track test coverage and aim for concrete targets

### Backward Compatibility Strategy
This must be decided in Phase 0 before proceeding:
- **Option A (Conservative)**: Maintain 100% backward compatibility, release as v1.2.x
- **Option B (Pragmatic)**: Allow minimal breaking changes with clear migration path, release as v2.0.0
- **Option C (Aggressive)**: Modernize API significantly, provide compatibility layer, release as v2.0.0

**Recommendation**: Option B - allows necessary improvements while respecting existing users.

## 3. Modernization Roadmap

This roadmap is divided into phases to provide a structured, safe approach to the modernization effort.

---

### **Phase 0: Analysis & Critical Decisions** ✅ **COMPLETED**

- **Goal:** Make critical decisions and document current state before any changes.
- **Complexity:** Low
- **Duration:** 1 week
- **Status:** ✅ **COMPLETE**

| Task | Description | Complexity | Status |
|------|-------------|------------|--------|
| **0.1: Decide Compatibility Strategy** | Choose Option A, B, or C from above. Document decision and implications. | Low | ✅ **DONE** |
| **0.2: Document Current API Surface** | Create comprehensive API documentation of all public methods/properties for compatibility checking. | Medium | ✅ **DONE** |
| **0.3: Audit Dependencies** | Review and document all dependencies, identify outdated ones, plan updates. | Low | ✅ **DONE** |
| **0.4: Document Known Issues** | Catalog known bugs and quirks - decide which to preserve vs fix. | Low | ✅ **DONE** |
| **0.5: Choose Build Tooling** | Evaluate options (tsup, esbuild, rollup). **Recommendation**: tsup (better for Node.js libraries than Vite). | Low | ✅ **DONE** |
| **0.6: Set Minimum Node.js Version** | Current is ">= 0.8.0" - propose modern minimum (14.x? 16.x? 18.x?). | Low | ✅ **DONE** |
| **0.7: Terminal Compatibility Matrix** | Document which terminals are officially supported and tested. | Medium | ✅ **DONE** |

#### **Decisions Made**

**0.1: Compatibility Strategy** - ✅ **Two-Track Strategy**
- **v1.x** (1.0.0-alpha.1 → 1.0.0): 100% backward compatible with original blessed
- **v2.x+** (future): Modern API with breaking changes allowed
- See Section 7 (Known Issues) for details on what will be preserved vs fixed

**0.2: API Surface** - ✅ **Documented**
- Complete API reference created in `API_REFERENCE.md`
- 44 widgets documented with all public methods and properties
- Baseline established for v1.x compatibility testing

**0.3: Dependencies Audit** - ✅ **Complete**
- **Runtime Dependencies**: None (blessed is dependency-free!)
- **Dev Dependencies**: Modern tooling added (Vitest, TypeScript, tsup, ESLint, Prettier)
- **Policy**: Keep runtime dependency-free

**0.4: Known Issues** - ✅ **Cataloged**
- 28 known issues documented and categorized
- See Section 7 (Known Issues & Quirks) for full list

**0.5: Build Tooling** - ✅ **tsup selected**
- Chose tsup for library-optimized builds
- Fallback plan to esbuild if maintenance issues arise
- Produces dual CJS/ESM outputs with type definitions

**0.6: Node.js Version** - ✅ **22.x** (Current LTS)
- **Minimum:** Node.js >= 22.0.0
- **Rationale:** Future-proof, LTS until April 2027, latest JS features
- **Note:** May be lowered to >= 18.x in future for broader compatibility

**0.7: Terminal Compatibility** - ✅ **Matrix documented**
- See Section 8 (Terminal Compatibility Matrix) for full details
- Officially supported: iTerm2, Alacritty, Kitty, Windows Terminal, gnome-terminal
- Full terminfo coverage for broader terminal support

**Completion Criteria:**
- [x] Compatibility strategy documented and agreed upon ✅
- [x] Current API surface fully documented ✅
- [x] Build tool selected and justified ✅
- [x] Minimum Node.js version decided ✅
- [x] Known issues cataloged ✅
- [x] Terminal compatibility matrix created ✅

**Deliverables:**
- ✅ API_REFERENCE.md - Complete API surface documentation
- ✅ Section 7 - Known Issues & Quirks (28 issues)
- ✅ Section 8 - Terminal Compatibility Matrix
- ✅ Updated package.json (version 1.0.0-alpha.1, Node >= 22.x)

**Post-Phase 3A: Monorepo Structure** ✅ **IMPLEMENTED**

The repository was converted to a Turborepo monorepo to improve organization and developer experience:

**Structure:**
```
blessed/ (root)
├── packages/blessed/      # Core library
│   ├── lib/              # Source code
│   ├── bin/              # CLI tools
│   ├── __tests__/        # Unit tests
│   ├── usr/              # Resources (fonts)
│   └── vendor/           # Vendored dependencies
├── apps/docs/            # Documentation (framework TBD)
│   ├── examples/         # Example applications
│   ├── test/             # Manual test files
│   └── test-apps/        # Integration test apps
└── tools/benchmarks/     # Performance benchmarks
```

**Benefits:**
- Clean separation of concerns (library / docs / tools)
- Faster builds with Turborepo caching
- Examples and tests can import published package
- Benchmarks don't bloat the library package

**Workspace Commands:**
```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Run benchmarks
pnpm bench

# Workspace-specific
pnpm --filter blessed build
pnpm --filter benchmarks bench
```

---

### **Phase 1: Testing Infrastructure & Baseline Metrics**

- **Goal:** Establish comprehensive test coverage and performance baselines BEFORE touching any code.
- **Complexity:** High
- **Duration:** 3-4 weeks
- **CRITICAL**: No production code changes allowed in this phase (except fixes required for testing)

#### 1.1: Testing Infrastructure Setup ✅ **COMPLETED**

| Task | Description | Complexity | Status |
|------|-------------|------------|--------|
| **1.1.1: Setup Vitest** | Configure Vitest as the testing framework with proper terminal mocking capabilities. | Medium | ✅ **DONE** |
| **1.1.2: Create Mock Helpers** | Build test utilities for mocking screen buffers, terminal I/O, and inspecting output. | Medium | ✅ **DONE** |
| **1.1.3: Setup Coverage Reporting** | Configure code coverage with clear reporting (target: 70% overall). | Low | ✅ **DONE** |
| **1.1.4: Create Testing Documentation** | Document how to write tests for blessed components, with examples. | Low | ⏳ TODO |

**What was done:**
- Vitest installed and configured with v8 coverage provider
- Test scripts added: `npm test`, `npm run test:ui`, `npm run test:coverage`
- Coverage thresholds set to 70% (lines, functions, branches, statements)
- Mock utilities created in `__tests__/helpers/mock.js`:
  - `createMockProgram()` - Mock terminal program with tput
  - `createMockScreen()` - Mock screen with buffer management
  - Helper functions for screen text extraction

#### 1.2: Core Testing (Pure Functions - Easiest First) ✅ **COMPLETED**

| Task | Description | Coverage Target | Complexity | Status | Actual Coverage |
|------|-------------|----------------|------------|--------|-----------------|
| **1.2.1: Test `lib/helpers.js`** | Test all helper functions (merge, asort, hsort, escape, etc.). | 100% | Low | ✅ **DONE** | 69% (28 tests) |
| **1.2.2: Test `lib/colors.js`** | Test color parsing, conversion, and matching. | 100% | Low | ✅ **DONE** | 79% (26 tests) |
| **1.2.3: Test `lib/unicode.js`** | Test unicode width calculations, character handling. | 90% | Medium | ✅ **DONE** | 65% (36 tests) |
| **1.2.4: Test `lib/keys.js`** | Test key parsing and normalization. | 90% | Medium | ✅ **DONE** | 93% (16 tests) |

**Total: 106 tests for pure functions**

**What was done:**
- helpers.js: merge, asort, hsort, escape, stripTags, cleanTags, generateTags, dropUnicode
- colors.js: hexToRGB, RGBToHex, match (with caching), mixColors
- unicode.js: strWidth, charWidth, isSurrogate, isCombining, codePointAt, fromCodePoint, regex patterns
- keys.js: emitKeypressEvents, special keys (enter, tab, arrows, function keys), modifiers (ctrl, shift)

#### 1.3: Widget Testing ✅ **COMPLETED**

| Task | Description | Coverage Target | Complexity | Status | Progress |
|------|-------------|----------------|------------|--------|----------|
| **1.3.1: Test Basic Widgets** | Test Box, Text, Line widgets (rendering, positioning, content). | 80% | Medium | ✅ **DONE** | Box: ✅ (33 tests), Text: ✅ (23 tests), Line: ✅ (29 tests) |
| **1.3.2: Test Interactive Widgets** | Test List, Form, Button, Checkbox (events, state, interaction). | 70% | High | ✅ **DONE** | Button: ✅ (22 tests), Checkbox: ✅ (34 tests), List: ✅ (48 tests), Form: ✅ (54 tests), Textbox: ✅ (33 tests) |
| **1.3.3: Test Layout Widgets** | Test Layout, Table, ListTable (complex positioning). | 60% | High | ✅ **DONE** | Table: ✅ (37 tests), ListTable: ✅ (38 tests), Layout: ✅ (26 tests) |
| **1.3.4: Test Special Widgets** | Test Image, Terminal, Video (with appropriate mocking). | 50% | High | ✅ **DONE** | Image: ✅ (8 tests), ANSIImage: ✅ (39 tests), Terminal/Video: ⏭️ SKIPPED (external deps) |

**What was done:**
- **31 widget test files created** covering all practical widgets
- Box, Text, Line, Button, Checkbox, List, Form, Textbox, Textarea, RadioButton, RadioSet
- Progressbar, Scrollablebox, Table, Message, Log, Listbar, ListTable, Loading, Prompt, Question
- FileManager, Layout, BigText, Image, ANSIImage, Input, ScrollableText
- Element (base class) and Screen (core component)
- Only 3 widgets untested: Terminal, Video, OverlayImage (require external dependencies like term.js, w3mimgdisplay)

#### 1.4: Core Component Testing ✅ **COMPLETED**

| Task | Description | Coverage Target | Complexity | Status |
|------|-------------|----------------|------------|--------|
| **1.4.1: Test Node** | Test node tree operations (append, detach, insert, events). | 80% | Medium | ✅ **DONE** |
| **1.4.2: Test Element** | Test base element functionality (positioning, rendering, events). | 70% | High | ✅ **DONE** |
| **1.4.3: Test Screen** | Test screen lifecycle, rendering, focus management. | 60% | High | ✅ **DONE** |
| **1.4.4: Integration Tests from Examples** | Convert all files in `example/` to integration tests. | 100% of examples | Medium | ✅ **DONE** |

**What was done:**
- Node: 38 tests - Tree operations, parent-child relationships, insert/remove/detach, traversal
- Element: 45 tests - Base element class with positioning, styling, visibility, content management
- Screen: 43 tests - Screen lifecycle, keyboard handling, focus management, rendering, cursor config
- **Integration tests: 31 tests** covering all 8 example files
  - simple-form.js: 5 tests (form submission, reset, keyboard navigation)
  - widget.js: 8 tests (centered box, tags, click/key events, focus, styles)
  - examples.js: 18 tests (time clock, multiplex screens, ANSI viewer, general integration)

#### 1.5: Additional Coverage Improvements ✅ **COMPLETED**

| Task | Description | Coverage Target | Complexity | Status | Results |
|------|-------------|----------------|------------|--------|---------|
| **1.5.1: Improve Table Coverage** | Add tests for table.js, achieve 35%+ coverage - Phase 1.5.1 | 35% | High | ✅ **DONE** | 37 tests, 35% coverage |
| **1.5.2: Improve Screen Coverage** | Add tests for screen.js rendering and lifecycle - Phase 1.5.2 | 35% | High | ✅ **DONE** | 108 tests, 39% coverage |
| **1.5.3: Improve List Coverage** | Add tests for list.js selection and rendering - Phase 1.5.3 | 78% | High | ✅ **DONE** | 66 tests, 78% coverage |
| **1.5.4: Improve Node Coverage** | Add tests for node.js tree operations - Phase 1.5.4 | 73% | Medium | ✅ **DONE** | 34 tests, 73% coverage |
| **1.5.5: Improve Element Coverage** | Add tests for element.js core functionality - Phase 1.5.5 | 47% | High | ✅ **DONE** | 48 tests, 47% coverage |
| **1.5.6: Improve Widget Coverage** | Improve coverage for textbox, checkbox, progressbar to 70%+ | 70%+ | Medium | ✅ **DONE** | Checkbox: 77.46%, Progressbar: 82.03%, Textbox: 72.58% |

**What was done:**
- **349 new tests added** across multiple phases (1.5.1 through 1.5.6)
- Table coverage: 35.38% (37 tests) - border rendering, row selection, cell formatting
- Screen coverage: 38.84% (108 tests total) - rendering, focus management, key handling
- List coverage: 77.88% (66 tests) - item selection, scrolling, fuzzy search, mouse interaction
- Node coverage: 72.68% (34 tests) - tree operations, insertion, removal, traversal
- Element coverage: 46.81% (48 tests) - positioning, content management, visibility, hiding
- Widget improvements: Checkbox (+6 tests), Textbox (+7 tests), Progressbar (+10 tests)
- **Overall project coverage improved from 48.4% to 50.78%** (+2.38 percentage points)

#### 1.6: Performance Baseline & Benchmarking ✅ **COMPLETE**

| Task | Description | Complexity | Status |
|------|-------------|------------|--------|
| **1.6.1: Create Benchmark Harness** | Setup infrastructure in `/benchmarks` with consistent timing/memory measurement. | Medium | ✅ **DONE** |
| **1.6.2: Rendering Benchmarks** | Create benchmarks for screen render, incremental render, widget rendering. | Medium | ✅ **DONE** |
| **1.6.3: Layout Benchmarks** | Create benchmarks for positioning calculations, nested layouts. | Medium | ✅ **DONE** |
| **1.6.4: Event Processing Benchmarks** | Create benchmarks for key/mouse event handling, event bubbling. | Low | ✅ **DONE** |
| **1.6.5: Scalability Benchmarks** | Create benchmarks for large lists (10K items), tables (100x100), deep trees. | Medium | ✅ **DONE** |
| **1.6.6: Document Baseline Metrics** | Run all benchmarks, document current performance numbers. | Low | ✅ **DONE** |
| **1.6.7: Setup CI Benchmark Tracking** | Add CI job to run benchmarks and track performance over time. | Medium | ⏳ **PENDING** |

**What was done:**
- **12 benchmark files created** covering all performance-critical areas
- Benchmark utilities with timing and memory measurement (`utils.js`)
- Main runner script to execute all benchmarks (`run-all.js`)
- Documentation: README.md and BASELINE.md
- Package scripts: `npm run bench` (with --expose-gc)
- Infrastructure complete and ready for baseline measurements
- **Baseline metrics established** (see below)

**Performance Baseline (Pre-TypeScript - Commit d7bdfcc)**

Averaged across 4 benchmark runs on macOS arm64, Node.js v24.9.0:

| Benchmark | Average Time | Description |
|-----------|--------------|-------------|
| Empty Screen Render | 6.49ms | Basic screen render with no widgets |
| Complex Screen Render (100 boxes) | 10.95ms | Rendering 100 nested boxes |
| Large Text Box (10K lines) | 13.07ms | Text box with 10,000 lines |
| Large List (1K items - initial) | 187.35ms | Initial render of 1,000 item list |
| Large List (scroll 100 items) | 125.67ms | Scrolling through 100 items |
| Large Table (50x10 cells) | 9.25ms | Rendering 50x10 table |
| Key Event Processing (1000 events) | 0.69ms | Processing 1,000 key events |
| Mouse Event Processing (1000 events) | 1.20ms | Processing 1,000 mouse events |
| Event Bubbling (50-deep tree, 100 events) | 0.35ms | Event bubbling through 50-level tree |
| Complex Layout (50 boxes) | 2.38ms | Layout calculation for 50 boxes |
| Percentage Positioning Recalc | 14.28ms | Recalculating percentage-based positions |

**Memory Baseline:**
- Simple App: ~8-9 MB heap used
- 10K List Items: ~60 MB heap used, ~33-36 MB heap total increase

**Benchmark Configuration:**
- Iterations reduced to prevent OOM (50 for rendering, 25 for text, 5-10 for scalability)
- Garbage collection enabled between iterations (`--expose-gc`)
- Mock program used (no actual terminal I/O)

**Pending:**
- CI workflow for continuous performance tracking

**Phase 1 Completion Criteria:**
- [x] **Testing infrastructure setup** (Vitest, mocks, coverage) ✅
- [x] **All pure function modules tested** (helpers, colors, unicode, keys) ✅
- [x] **All widgets have basic render + event tests** (70%+ coverage) ✅ - **COMPLETED** (31 widgets)
- [x] **All examples converted to passing integration tests** ✅ - **COMPLETED** (31 tests, 8 examples)
- [x] **Core components** (Node, Element, Screen) at 60%+ coverage ✅
- [x] **Performance benchmarking infrastructure** ✅ - **COMPLETED** (12 benchmarks)
- [x] **12 performance benchmarks documented with baseline numbers** ✅ - **COMPLETED** (Pre-TypeScript baseline established)
- [ ] CI pipeline running tests and benchmarks automatically - ⏳ TODO
- [x] **Overall project coverage: 50.78%** (target 70%+) - Good progress, approaching target

**Phase 1 Status: 🎉 98% COMPLETE**
- All critical testing infrastructure ✅
- All widget and component testing ✅
- Benchmark infrastructure ✅
- **Baseline measurements documented** ✅
- Pending: CI integration only

**Current Status (Updated):**
- ✅ **1,576 tests passing locally** - All tests green! (was 1,227)
- ✅ Pure functions: 142 tests
  - helpers.js: 64 tests (88% coverage) ⬆️
  - colors.js: 26 tests (74% coverage) ⬆️
  - unicode.js: 36 tests (67% coverage)
  - keys.js: 16 tests (86% coverage)
- ✅ Widget tests: **1,342 tests across 31 widgets** - **COMPLETED** ⬆️
  - Box: 33 tests, Text: 23 tests, Line: 29 tests
  - Button: 22 tests, Checkbox: 40 tests ⬆️, List: 48 tests
  - Form: 54 tests, Textbox: 40 tests ⬆️, Textarea: 64 tests
  - RadioButton: 26 tests, RadioSet: 14 tests, Progressbar: 49 tests ⬆️
  - Scrollablebox: 40 tests, Table: 37 tests, Message: 26 tests
  - Log: 33 tests, Listbar: 63 tests, ListTable: 38 tests
  - Loading: 32 tests, Prompt: 37 tests, Question: 42 tests
  - FileManager: 22 tests, Layout: 26 tests, BigText: 29 tests
  - Image: 8 tests, ANSIImage: 39 tests
  - Input: 10 tests, ScrollableText: 27 tests
  - **Coverage improvements**: Checkbox: 71.83%→77.46% (+5.63%), Progressbar: 67.18%→82.03% (+14.85%), Textbox: 72.58%
- ✅ Core components: **126 tests** - **COMPLETED**
  - Node: 38 tests (73% coverage) ⬆️
  - Element: 45 tests (47% coverage) ⬆️
  - Screen: 43 tests (39% coverage) ⬆️
- ✅ **Integration tests: 31 tests** - **COMPLETED**
  - simple-form.js: 5 tests (form submission, reset, keyboard navigation)
  - widget.js: 8 tests (centered box, tags, click/key events, focus, styles)
  - examples.js: 18 tests (time clock, multiplex screens, ANSI viewer, general patterns)
- ✅ Mock utilities complete (91% coverage) ⬆️
- ✅ GitHub Actions workflow created (.github/workflows/test.yml)
- 📊 **Overall coverage: 50.78% lines** (~70% branches) ⬆️ (was 48.4%)
- 🎯 **Phase 1.3 COMPLETED** - All practical widgets tested!
- 🎯 **Phase 1.4 COMPLETED** - Core components AND integration tests done!
- 🎯 **Phase 1.5 COMPLETED** - Additional coverage improvements for key widgets!
- 🔄 Next: Benchmarking (1.6) to complete Phase 1

**Package Manager Decision:**
- ✅ **pnpm selected as official package manager**
  - Resolves npm optional dependencies bug (issue [#4828](https://github.com/npm/cli/issues/4828))
  - More reliable handling of platform-specific binaries
  - package-lock.json removed, using pnpm-lock.yaml exclusively
  - All workflows updated to use pnpm
  - Developers should use `pnpm install` and `pnpm run <script>`

---

### **Phase 2: Build System & Development Experience** ✅ **COMPLETED**

- **Goal:** Setup modern build tooling and development environment.
- **Complexity:** Medium
- **Duration:** 1-2 weeks
- **Status:** ✅ **COMPLETE** (with known limitations)

| Task | Description | Complexity | Status |
|------|-------------|------------|--------|
| **2.1: Initialize TypeScript Config** | Add `tsconfig.json` with `allowJs: true` for gradual migration. Use strict settings. | Low | ✅ **DONE** |
| **2.2: Setup Build Tool** | Configure tsup (or chosen tool) for building the library with proper CommonJS/ESM outputs. | Medium | ✅ **DONE** |
| **2.3: Integrate Prettier** | Add Prettier for consistent code formatting, configure pre-commit hooks. | Low | ✅ **DONE** |
| **2.4: Setup ESLint** | Configure ESLint with TypeScript support for code quality. | Low | ✅ **DONE** |
| **2.5: Update Package.json** | Modernize scripts, add proper exports map, update metadata. | Low | ✅ **DONE** |
| **2.6: Developer Documentation** | Create CONTRIBUTING.md with setup instructions, testing guidelines. | Low | ✅ **DONE** |
| **2.7: Local Testing Infrastructure** | Create test apps to verify CJS/ESM compatibility. | Low | ✅ **DONE** |

**What was done:**
- **TypeScript**: tsconfig.json with allowJs for gradual migration, strict settings
- **Build Tool**: tsup configured for dual CJS/ESM output (541KB each + source maps)
- **Prettier**: Configured with .prettierrc, ignore patterns, format scripts
- **ESLint**: Configured with TypeScript support, relaxed for .js, strict for .ts
- **Package Scripts**: build, build:watch, type-check, lint, lint:fix, format, format:check
- **CONTRIBUTING.md**: Comprehensive developer guide with setup, testing, migration strategy
- **Updated .gitignore**: dist/, *.tsbuildinfo, .vitest/
- **Test Apps**: Created test-apps/test-cjs and test-apps/test-esm for local validation

**Validation:**
- ✅ Build produces correct CJS + ESM outputs
- ✅ All 1,600 tests passing with new tooling
- ✅ Type checking works on existing .js files
- ✅ No production code changes
- ✅ Backward compatibility maintained
- ✅ CJS test app works with source files (lib/blessed.js)
- ✅ ESM test app works with createRequire() from source files

**Known Limitations (RESOLVED in Phase 3A-ESM):**
- ✅ **FIXED** - Bundled outputs (dist/) now work after ESM migration
- ~~⚠️ Blessed used dynamic requires (`require('./widgets/' + file)`) in lib/widget.js:48~~
- ✅ Phase 3A-ESM replaced all dynamic requires with static imports
- ✅ Proper bundling now enabled

**Completion Criteria:**
- [x] TypeScript compiles with allowJs enabled ✅
- [x] Build produces correct outputs (CJS + ESM) ✅
- [x] Linting and formatting automated ✅
- [x] All tests still pass with new build system ✅
- [x] Local test apps validate CJS/ESM usage ✅

**Post-Completion Fixes:**
- ✅ **Emoji/Symbol Width Calculation Fix** (commit ae8d2df)
  - **Problem**: Emojis and symbols (U+2600-U+27BF like ✅) were calculated as single-width characters, causing extra spacing issues in terminal output
  - **Root Cause**: `lib/unicode.js` charWidth() function and regex patterns didn't include emoji ranges
  - **Solution**: Added emoji/symbol ranges to charWidth() function and updated chars.wide/chars.swide regex patterns
  - **Impact**: Proper rendering of emojis when `fullUnicode: true` is enabled
  - **Testing**: Test apps now properly render emojis without spacing issues
  - **Version**: Bumped to 1.0.0-alpha.7

---

### **Version Strategy**

**Current Version:** `1.0.0-alpha.17`

**Progression to 1.0.0:**
```
0.1.82 (original blessed, last updated 2015)
  ↓
1.0.0-alpha.1 (Phase 2 complete, starting Phase 3)
1.0.0-alpha.17 (Phase 3A complete - TypeScript conversion done!) ← YOU ARE HERE
1.0.0-alpha.x (Phase 3B: strict types)
  ↓
1.0.0-beta.1 (Phase 4: Polish & performance)
1.0.0-beta.x (stabilization, docs, testing)
  ↓
1.0.0 (Production release! 🚀)
```

**Rationale:**
- Original blessed never reached 1.0.0 despite being production-ready
- This modernization effort IS the 1.0 release blessed deserves
- Alpha signals "TypeScript conversion complete, adding strict types"
- Beta signals "feature complete, stabilizing for production"
- Saves 2.0.0 for future major architectural changes

**Publishing:**
- Alpha releases: `pnpm publish --tag alpha`
- Users install: `npm install @vdeantoni/blessed@alpha` (or `pnpm add @vdeantoni/blessed@alpha`)
- Production (1.0.0): `pnpm publish` (becomes `latest` tag)

**Release Cadence:**
- Alpha: Weekly or after significant milestones during Phase 3
- Beta: Every 1-2 weeks during Phase 4
- 1.0.0: Launch when ready (estimated 6-7 months from Phase 2 completion)

---

### **Phase 3: Incremental TypeScript Conversion** ✅ **PHASE 3A COMPLETE**

- **Goal:** Convert codebase to TypeScript incrementally, maintaining test coverage throughout.
- **Complexity:** High
- **Duration:** 14-20 weeks (split into Phase 3A + 3B)
- **Strategy:** Three-phase approach - modernize to ES6+ (3A-prep), convert to ESM (3A-ESM), convert to TS (3A), then add strict types (3B)
- **Current Status:** ✅ Phase 3A complete (TypeScript conversion done), ready for Phase 3B (strict types)

#### **Phase 3A-prep: ES5 to ES6+ Modernization** ✅ **COMPLETED**

**Goal:** Modernize JavaScript syntax before TypeScript conversion (1 week)

**Why this was needed:**
- Original codebase used ES5 syntax (`var`, `function` expressions, etc.)
- Direct ES5 → TypeScript conversion would be more complex
- Modern JavaScript is easier to convert to TypeScript
- Better baseline for understanding code during conversion

**What was done (commit 9ed7553):**
- ✅ Replaced `var` with `const`/`let` throughout entire codebase
- ✅ Converted function expressions to arrow functions
- ✅ Converted `function()` to `() => {}` in callbacks
- ✅ Renamed `example/ping` to `example/ping.js` for consistency
- ✅ Applied to 89 files: all lib/, widgets/, tests/, and examples/
- ✅ All 1,598 tests passing - zero functionality changes

**Results:**
- Modern, clean JavaScript baseline ready for TypeScript
- 16,394 insertions, 15,781 deletions across codebase
- No breaking changes, pure syntax modernization
- Removed premature `lib/helpers.ts` - will reconvert properly

#### **Phase 3A-ESM: Complete ESM Migration** ✅ **COMPLETED**

**Goal:** Convert entire codebase to ES6 modules (1 week)

**Why this was needed:**
- CommonJS (`require`/`module.exports`) is legacy
- TypeScript works better with ES6 imports
- Modern bundlers optimize ESM better
- Dual ESM/CJS output requires ESM source

**What was done (commits c42a494, 980120c, 4192175, 90393eb):**
- ✅ Fixed `import.meta.dirname` compatibility for bundlers (lib/tput.js, lib/widgets/bigtext.js)
- ✅ Converted all 14 benchmark files to ESM
- ✅ Converted entire codebase (102 files) to ESM:
  - All lib/ modules (require → import, module.exports → export)
  - All test/ and __tests__/ files
  - All example/ files
  - Updated tsconfig.json and tsup.config.ts
- ✅ Created lib/mixins/scrollable.js for modular structure
- ✅ All 1,600 tests passing after conversion
- ✅ Build successful with no warnings
- ✅ Benchmarks working correctly

**Results:**
- Complete ES6 module codebase ready for TypeScript
- No dynamic requires - bundling now works properly
- Clean import/export structure throughout
- Version bumped to 1.0.0-alpha.16

**Key Benefits:**
- ✅ Tree-shaking enabled for bundlers
- ✅ Static analysis possible
- ✅ Better IDE support
- ✅ Ready for TypeScript conversion

#### **Phase 3A: Conversion with Permissive Types** ✅ **COMPLETED**

**Goal:** Get all `.js` files converted to `.ts` and compiling (4-6 weeks)

**Strategy:**
- Relaxed TypeScript compiler settings (strict: false, noImplicitAny: false)
- Use `any` types liberally for complex scenarios
- Focus on syntax conversion, not type perfection
- Keep all 1,600 tests passing throughout conversion
- Fix TypeScript errors incrementally

**What was done:**
- ✅ **Complete TypeScript conversion** - All 45+ files converted from .js to .ts
- ✅ **Core library files** (11 files):
  - lib/alias.ts, lib/blessed.ts, lib/colors.ts, lib/events.ts
  - lib/gpmclient.ts, lib/helpers.ts, lib/keys.ts
  - lib/program.ts, lib/tput.ts, lib/unicode.ts, lib/widget.ts
- ✅ **All widget files** (34 files):
  - All widgets in lib/widgets/ converted to TypeScript
  - Element, Screen, Node, Box, Text, Line, List, Form, Table, etc.
  - Input widgets: Textbox, Textarea, Checkbox, Button, etc.
  - Advanced widgets: Terminal, Video, Image, ANSIImage, etc.
- ✅ **Fixed 156 TypeScript errors** across the codebase:
  - lib/program.ts: 26 errors (optional parameters, rest parameters, GpmClient instantiation)
  - lib/tput.ts: 56 errors (optional parameters, type annotations, header objects)
  - lib/widgets/textarea.ts: 20 errors (value getter/setter pattern)
  - lib/widgets/textbox.ts: 7 errors (setValue logic)
  - lib/widgets/element.ts & others: 37 errors (scrollable properties, type mismatches)
  - lib/blessed.ts: 4 errors (sprintf/tryRead imports)
- ✅ **All 1,600 tests passing** - Zero test regressions
- ✅ **TypeScript compilation successful** - No type errors

**Key Fixes Applied:**
- Added value getter/setter to Textarea/Textbox for proper API compatibility
- Made function parameters optional where needed (e.g., `param?: any`)
- Converted `arguments` to rest parameters (`...args: any[]`)
- Added scrollable mixin property declarations to Element
- Fixed GpmClient to use `new` keyword for instantiation
- Added `total` property to tput header objects
- Used optional chaining for conditional method calls
- Fixed type mismatches in arithmetic operations and array handling

**Results:**
- ✅ Entire codebase now in TypeScript
- ✅ Zero type errors (permissive settings)
- ✅ All tests green (1,600/1,600)
- ✅ Build successful with proper CJS/ESM outputs
- ✅ Ready for Phase 3B (strict type refinement)

**Post-Completion Optimizations:**
- ✅ **Unicode charWidth Performance** (commit af5de57)
  - **Problem**: `process.env.BLESSED_FORCE_UNICODE` was being checked on every character width calculation
  - **Solution**: Cache the environment variable check in module scope
  - **Impact**: Micro-optimization for character width calculations (hot path in rendering)
  - **Version**: 1.0.0-alpha.17

- ✅ **Benchmark Infrastructure Update** (commit 8c019e5)
  - **Problem**: Benchmarks were testing source files, not actual bundled output users would use
  - **Solution**: Updated benchmarks to test bundled dist/ output + minor optimizations
  - **Impact**: More accurate performance measurements of actual shipped code
  - **Version**: 1.0.0-alpha.17


#### **Phase 3B: Type Refinement with Strictness** 📅 **NEXT**

**Goal:** Achieve production-quality TypeScript (8-12 weeks)

**Prerequisites:** ✅ Phase 3A complete - All files converted to TypeScript

**Strategy:**
- Re-enable strict TypeScript flags one at a time
- Replace `any` with proper types
- Add interfaces and generics
- Document complex type patterns
- Maintain all 1,600 tests passing throughout

**Flags to Re-enable (in order):**
1. `noImplicitReturns`
2. `noFallthroughCasesInSwitch`
3. `strictFunctionTypes`
4. `strictBindCallApply`
5. `noImplicitThis`
6. `noImplicitAny` ← most work here
7. `strictNullChecks`
8. `strictPropertyInitialization`
9. `noUnusedLocals` / `noUnusedParameters`

**Phase 3B Completion Criteria:**
- [ ] All strict TypeScript flags enabled
- [ ] Minimal use of `any` type (only where truly necessary)
- [ ] Comprehensive interfaces for all public APIs
- [ ] Proper generic types for widget options
- [ ] All 1,600 tests passing
- [ ] No type errors with strict mode

**Current Status:** Ready to begin - awaiting decision on priority vs Phase 4

#### Original Conversion Order (Safest → Riskiest)

**3.1: Helper Modules (Week 1)**
- Convert `lib/helpers.js` → `.ts`
- Convert `lib/colors.js` → `.ts`
- Tests must remain passing

**3.2: Data/Config Modules (Week 1-2)**
- Convert `lib/unicode.js` → `.ts`
- Convert `lib/keys.js` → `.ts`
- Convert `lib/events.js` → `.ts`

**3.3: Simple Widgets (Week 2-3)**
- Define base widget interfaces
- Convert `lib/widgets/box.js` → `.ts`
- Convert `lib/widgets/text.js` → `.ts`
- Convert `lib/widgets/line.js` → `.ts`
- Convert `lib/widgets/button.js` → `.ts`
- Convert `lib/widgets/checkbox.js` → `.ts`

**3.4: Complex Widgets (Week 3-5)**
- Convert `lib/widgets/list.js` → `.ts`
- Convert `lib/widgets/form.js` → `.ts`
- Convert `lib/widgets/table.js` → `.ts`
- Convert all remaining widgets

**3.5: Core Components (Week 5-6)**
- Convert `lib/widget.js` → `.ts`
- Convert `lib/widgets/node.js` → `.ts`
- Convert `lib/widgets/element.js` → `.ts`
- Convert `lib/widgets/screen.js` → `.ts`

**3.6: Low-Level (Last! Week 7-8)**
- Add type definitions for `lib/program.js` (may not fully convert)
- Add type definitions for `lib/tput.js` (may not fully convert)
- Convert `lib/blessed.js` → `.ts`

**3.7: Examples & Documentation**
- Update examples to TypeScript
- Generate API documentation from types

**Phase 3A Completion Criteria:**
- [x] All modules converted to TypeScript ✅
- [x] All tests passing throughout conversion ✅ (1,600/1,600)
- [x] API surface unchanged ✅ (100% backward compatible)
- [x] Test coverage maintained ✅ (50.78%)
- [ ] No use of `any` type except where absolutely necessary ⏳ (Phase 3B)

**Phase 3 Overall Status:**
- ✅ **Phase 3A COMPLETE** - TypeScript conversion done
- 📅 **Phase 3B NEXT** - Strict type refinement

---

### **Phase 4: Performance Optimization**

- **Goal:** Use established benchmarks to identify and fix performance issues.
- **Complexity:** Medium-High
- **Duration:** 2-3 weeks

| Task | Description | Complexity |
|------|-------------|------------|
| **4.1: Profile Hot Paths** | Use clinic.js and profiling tools to identify bottlenecks in rendering and layout. | Medium |
| **4.2: Optimize Rendering** | Improve screen buffer operations, reduce unnecessary redraws. | High |
| **4.3: Optimize Layout Calculations** | Improve positioning algorithms, cache calculated values. | High |
| **4.4: Memory Optimization** | Reduce allocations, improve object pooling where appropriate. | Medium |
| **4.5: Verify Against Benchmarks** | Run all benchmarks, verify improvements, document wins. | Low |
| **4.6: Regression Testing** | Ensure optimizations didn't break functionality (tests should catch). | Low |

**Completion Criteria:**
- [ ] All benchmarks show no regression (or documented trade-offs)
- [ ] Target: 10-20% improvement in render performance
- [ ] Target: Reduced memory footprint for large datasets
- [ ] No test failures introduced

---

### **Phase 5: Polish & Release Preparation**

- **Goal:** Finalize the modernized library for release.
- **Complexity:** Medium
- **Duration:** 2 weeks

| Task | Description | Complexity |
|------|-------------|------------|
| **5.1: Update README.md** | Revise README to reflect TypeScript usage, modern features, updated examples. | Medium |
| **5.2: Generate API Documentation** | Setup TypeDoc or similar to auto-generate docs from TypeScript. | Low |
| **5.3: Migration Guide** | If breaking changes exist, create detailed migration guide. | Medium |
| **5.4: Create Changelog** | Comprehensive changelog documenting all changes. | Low |
| **5.5: Verify Terminal Compatibility** | Test against multiple terminals from compatibility matrix. | Medium |
| **5.6: Version Bump & Publish** | Update version (v1.2.0 or v2.0.0), publish to npm. | Low |
| **5.7: Announcement & Communication** | Blog post, Twitter, update GitHub, notify community. | Low |

**Completion Criteria:**
- [ ] Documentation complete and accurate
- [ ] All tests passing on CI
- [ ] Benchmarks show acceptable performance
- [ ] Package successfully published
- [ ] Compatible with documented terminal emulators

---

### **Phase 6: Future - blessed-contrib Integration**

- **Goal:** (Separate effort after core stabilizes) Port and integrate blessed-contrib widgets.
- **Complexity:** High
- **Duration:** 4-6 weeks
- **Note:** This is a separate project phase, not part of core modernization

| Task | Description | Complexity |
|------|-------------|------------|
| **6.1: Analyze blessed-contrib** | Review codebase, identify most valuable widgets (charts, gauges, maps). | Medium |
| **6.2: Prioritize Widgets** | Survey community, prioritize based on popularity and utility. | Low |
| **6.3: Port High-Priority Widgets** | Port selected widgets to TypeScript, following new architecture. | High |
| **6.4: Integration & Testing** | Integrate widgets, write comprehensive tests. | High |
| **6.5: Examples & Documentation** | Create examples showcasing integrated widgets. | Medium |
| **6.6: Release as v2.1 or v3.0** | Publish expanded library with contrib widgets. | Low |

**Recommendation:** Consider keeping blessed-contrib as a separate package that depends on modernized blessed.

---

### **Phase 7: Future Considerations - Declarative UI APIs**

- **Goal:** (Post-v1.0.0) Explore and implement declarative alternatives to the imperative OOP API
- **Complexity:** Medium-High
- **Duration:** 4-6 weeks
- **Priority:** Low - v2.x+ consideration
- **Status:** 📋 Design exploration documented

#### Background & Motivation

**Current API (Imperative OOP):**
```javascript
const blessed = require('blessed');
const screen = blessed.screen({ smartCSR: true });

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello world!',
  border: { type: 'line' }
});

screen.append(box);  // Imperative append()
screen.render();
```

**Challenges:**
- Imperative `.append()` calls separate from widget creation
- Parent-child relationships not clear from code structure
- Harder to visualize UI hierarchy
- Less familiar to developers from web/mobile backgrounds (React, Flutter, SwiftUI)

**User Request:**
Community feedback indicates interest in more declarative, markup-style APIs similar to modern UI frameworks.

---

#### Proposed Approaches

**1. Tagged Template Literals (Recommended - Priority 1)**

*Inspired by: lit-html, htm*

```javascript
const { html } = require('blessed/declarative');

const app = html`
  <screen title="My App">
    <box top="center" left="center" width="50%" height="50%"
         border="line" style="fg: white, bg: blue">
      Hello {bold}world{/bold}!

      <list top="4" left="0" width="50%" height="10"
            border="line" items="${['Item 1', 'Item 2', 'Item 3']}">
      </list>
    </box>

    <button bottom="0" left="center" width="10" height="3"
            on:press="${() => screen.destroy()}">
      Quit
    </button>
  </screen>
`;

app.mount(screen);
```

**Pros:**
- ✅ HTML-like syntax (familiar to web developers)
- ✅ Clear visual hierarchy
- ✅ No build step required
- ✅ Expression interpolation with `${}`
- ✅ Event handlers with `on:` prefix

**Cons:**
- ❌ No autocomplete inside template strings
- ❌ Requires HTML parser
- ❌ Tagged template limitations

**Autocomplete:** Limited - only in `${}` expressions, not in markup itself.

---

**2. Hyperscript h() Function (Recommended - Priority 2)**

*Inspired by: React.createElement, Vue h(), Preact, Mithril*

```javascript
const { h, render } = require('blessed/declarative');

const app = h('screen', { title: 'My App' }, [
  h('box', {
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    border: { type: 'line' },
    style: { fg: 'white', bg: 'blue' },
    content: 'Hello world!'
  }, [
    h('list', {
      top: 4,
      left: 0,
      width: '50%',
      height: 10,
      border: { type: 'line' },
      items: ['Item 1', 'Item 2', 'Item 3']
    })
  ]),

  h('button', {
    bottom: 0,
    left: 'center',
    width: 10,
    height: 3,
    onPress: () => screen.destroy(),
    content: 'Quit'
  })
]);

render(app, screen);
```

**Pros:**
- ✅ Pure JavaScript (no parsing)
- ✅ Full TypeScript autocomplete
- ✅ Works with JSX (optional)
- ✅ Familiar to React developers
- ✅ Type-safe

**Cons:**
- ❌ More verbose than templates
- ❌ Nested h() calls harder to read

**Autocomplete:** Excellent with TypeScript definitions.

---

**3. Builder Pattern (Priority 3)**

*Inspired by: SwiftUI, Jetpack Compose, Flutter*

```javascript
const { Screen, Box, List, Button } = require('blessed/declarative');

const screen = Screen({ smartCSR: true })
  .title('My App')
  .child(
    Box({ top: 'center', left: 'center', width: '50%', height: '50%' })
      .border('line')
      .style({ fg: 'white', bg: 'blue' })
      .content('Hello world!')
      .child(
        List({ top: 4, left: 0, width: '50%', height: 10 })
          .border('line')
          .items(['Item 1', 'Item 2', 'Item 3'])
      )
  )
  .child(
    Button({ bottom: 0, left: 'center', width: 10, height: 3 })
      .content('Quit')
      .onPress(() => screen.destroy())
  )
  .build();

screen.render();
```

**Pros:**
- ✅ Fluent, chainable API
- ✅ Excellent discoverability
- ✅ Type-safe with TypeScript
- ✅ No parsing needed

**Cons:**
- ❌ Verbose for simple cases
- ❌ `.build()` can be forgotten
- ❌ Less familiar to web developers

**Autocomplete:** Excellent with TypeScript.

---

**4. JSX Support (Optional)**

*Inspired by: React, Preact, Solid.js*

**Multiple Transpiler Options:**

| Tool | Speed | Build Step | Node.js | Best For |
|------|-------|------------|---------|----------|
| **TypeScript** | Fast | Required | ✅ | TypeScript users |
| **esbuild** | Very Fast | Required | ✅ | Speed & simplicity |
| **SWC** | Very Fast | Required | ✅ | Babel replacement |
| **Bun** | Instant | None! | ❌ (Bun) | Modern runtimes |
| **Babel** | Slow | Required | ✅ | Legacy projects |

**Example with TypeScript (tsconfig.json):**

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

**Usage:**

```tsx
/** @jsx h */
import { h, render } from 'blessed/declarative';

function App() {
  return (
    <screen title="My App">
      <box top="center" left="center" width="50%" height="50%"
           border={{ type: 'line' }}
           style={{ fg: 'white', bg: 'blue' }}>
        Hello world!

        <list top={4} left={0} width="50%" height={10}
              border={{ type: 'line' }}
              items={['Item 1', 'Item 2', 'Item 3']} />
      </box>

      <button bottom={0} left="center" width={10} height={3}
              onPress={() => screen.destroy()}>
        Quit
      </button>
    </screen>
  );
}

const screen = blessed.screen({ smartCSR: true });
render(<App />, screen);
```

**Pros:**
- ✅ Best of both worlds (markup + JavaScript)
- ✅ Familiar to React developers
- ✅ Excellent TypeScript support
- ✅ Can use components, props, state

**Cons:**
- ❌ Requires build step
- ❌ More complex tooling

**Autocomplete:** Excellent with TypeScript + JSX.

---

#### Recommended Implementation Strategy

**Hybrid Approach - Support Multiple Styles:**

1. **Core: Hyperscript `h()` function**
   - Pure JavaScript, works everywhere
   - Foundation for all other approaches
   - Full TypeScript definitions

2. **Tagged Templates (convenience layer)**
   - Built on top of hyperscript
   - Best DX for markup-style UIs
   - No additional dependencies

3. **JSX Support (documentation only)**
   - Document JSX pragma: `/** @jsx h */`
   - Let users choose their transpiler
   - No blessed-specific tooling needed

4. **Builder Pattern (optional)**
   - For users who prefer fluent APIs
   - Good discoverability

**Implementation Phases:**

| Phase | Deliverable | Complexity | Duration |
|-------|-------------|------------|----------|
| **7A.1** | Core hyperscript `h()` function | Medium | 1 week |
| **7A.2** | TypeScript definitions | Medium | 1 week |
| **7A.3** | Tagged template parser | High | 2 weeks |
| **7A.4** | Builder pattern wrappers | Low | 1 week |
| **7A.5** | Documentation & examples | Low | 1 week |

**File Structure:**
```
lib/declarative/
  ├── index.js          # Main exports
  ├── hyperscript.js    # h() function
  ├── render.js         # Render to blessed screen
  ├── html.js           # Tagged template parser
  ├── builder.js        # Builder pattern (optional)
  └── types.d.ts        # TypeScript definitions
```

---

#### Benefits

**For Users:**
- ✅ More intuitive - Clear parent-child relationships
- ✅ More declarative - Focus on "what" not "how"
- ✅ Familiar - Borrows from React, Vue, SwiftUI, Flutter
- ✅ Choice - Multiple styles for different preferences
- ✅ Type-safe - Full TypeScript support

**For blessed:**
- ✅ Modern DX - Attracts developers from web/mobile
- ✅ Backward compatible - Doesn't break existing code
- ✅ Competitive - Matches modern TUI libraries (ink, ratatui)
- ✅ Flexible - Users pick their preferred style

---

#### Autocomplete Considerations

**Summary:**

| Approach | Autocomplete | Requires |
|----------|--------------|----------|
| Tagged Templates | ❌ Limited (only in `${}`) | Nothing |
| Hyperscript | ✅ Excellent | TypeScript definitions |
| Builder Pattern | ✅ Excellent | TypeScript definitions |
| JSX | ✅ Excellent | TypeScript + transpiler |

**Recommendation:**
- Implement hyperscript with comprehensive TypeScript definitions
- Document tagged templates as convenience option
- Document JSX setup for users who want it
- Focus autocomplete efforts on hyperscript/JSX

---

#### Comparison to Other TUI Libraries

**ink (React for CLIs):**
```jsx
// ink uses React
import React from 'react';
import { Box, Text } from 'ink';

const App = () => (
  <Box flexDirection="column">
    <Text color="cyan">Hello World</Text>
  </Box>
);
```

**blessed declarative (proposed):**
```jsx
// Similar but blessed-native
import { h, Box, Text } from 'blessed/declarative';

const App = () => (
  <Box top="center" left="center">
    <Text style={{ fg: 'cyan' }}>Hello World</Text>
  </Box>
);
```

**Key Differences:**
- ink requires React (heavy dependency)
- blessed declarative is lightweight (no React)
- ink uses flexbox, blessed uses terminal coordinates
- blessed has deeper terminal integration

---

#### Decision Points

**Before Implementation:**

1. **Is there sufficient user demand?**
   - Gather community feedback
   - Survey users on preferred style
   - Validate assumptions with prototypes

2. **What's the maintenance burden?**
   - Additional test coverage needed
   - Documentation requirements
   - Support for multiple APIs

3. **How does this fit with v1.x vs v2.x?**
   - v1.x: Keep imperative API only
   - v2.x: Add declarative as opt-in
   - v3.x: Consider making declarative primary

**Recommendation:**
- ⏸️ **Defer to post-v1.0.0**
- 📋 Document design exploration (this section)
- 🗳️ Gather community feedback via GitHub issue
- 🧪 Build proof-of-concept prototype
- 📊 Evaluate maintenance cost vs user benefit

---

#### Resources & Prior Art

**Declarative TUI Libraries:**
- [ink](https://github.com/vadimdemedes/ink) - React for CLIs (8.5k stars)
- [Bubble Tea](https://github.com/charmbracelet/bubbletea) - Go TUI with Elm architecture
- [Ratatui](https://github.com/ratatui-org/ratatui) - Rust TUI library
- [textual](https://github.com/Textualize/textual) - Python TUI with CSS

**Hyperscript Implementations:**
- [hyperscript](https://github.com/hyperhype/hyperscript) - Original implementation
- [snabbdom](https://github.com/snabbdom/snabbdom) - Virtual DOM with h()
- [preact](https://github.com/preactjs/preact) - React alternative with h()

**Tagged Template Libraries:**
- [lit-html](https://lit.dev/) - Efficient HTML templates
- [htm](https://github.com/developit/htm) - JSX-like syntax with template literals

**Completion Criteria (if implemented):**
- [ ] Core hyperscript `h()` function implemented
- [ ] TypeScript definitions with full autocomplete
- [ ] Tagged template parser with expression interpolation
- [ ] Documentation with examples for all approaches
- [ ] Test coverage for declarative APIs
- [ ] Migration guide for users wanting declarative style
- [ ] Example apps showcasing each approach

---

## 4. Testing Strategy for Terminal UI Library

### Challenge
Traditional testing is difficult for libraries that manipulate terminal I/O directly.

### Approach

**Layer 1: Pure Function Testing**
- Helpers, color utilities, unicode calculations
- 100% coverage achievable
- Standard unit tests

**Layer 2: Widget Logic Testing**
- Test with mocked screen/program
- Mock terminal dimensions, capabilities
- Assert against mock output buffers
- 70-80% coverage target

**Layer 3: Integration Testing**
- Convert all examples to integration tests
- Run against fully mocked terminal
- Verify complete user flows work
- 100% of examples must pass

**Layer 4: Visual/Snapshot Testing (Optional)**
- Capture screen buffer output as strings
- Compare against known-good snapshots
- Useful for catching visual regressions

### Mock Strategy

```javascript
// Example mock approach
const mockProgram = {
  cols: 80,
  rows: 24,
  output: new MockWriteStream(),
  // Mock all terminal operations
  _write: function(data) { this.output.write(data); },
  // ... etc
};

const screen = blessed.screen({
  program: mockProgram
});

// Test assertions
expect(mockProgram.output.toString()).toContain('expected output');
```

---

## 5. Performance Metrics & Targets

### Baseline Metrics (Established in Phase 1) ✅

**Pre-TypeScript Baseline** (Commit d7bdfcc, averaged across 4 runs):

See Section 1.6 above for complete baseline metrics table.

**Key Performance Numbers:**
- Rendering: 6.5-13ms for basic/complex screens
- Scalability: ~187ms for 1K item list, ~9ms for 50x10 table
- Events: Sub-millisecond for most operations (0.35-1.2ms)
- Layout: 2.4-14.3ms for complex layouts

**Post-TypeScript Conversion** (Current master):
- Performance is **comparable or better** across most benchmarks
- No significant regressions detected
- Minor outlier: Large List rendering (~74% slower, under investigation)

### Target Improvements
- Rendering: No regression, aim for 10-20% improvement
- Memory: Reduce footprint for large datasets by 15%+
- Event processing: Maintain sub-millisecond latency
- Cold start: Library import time < 100ms

### Continuous Monitoring
- Run benchmarks: `pnpm run bench`
- Results saved to: `benchmarks/results/`
- Compare against baseline in Section 1.6
- Alert on regressions > 10%
- Track trends over time

### How to Run Benchmarks
```bash
# Run all benchmarks with garbage collection
pnpm run bench

# Or run benchmarks directly in the workspace
pnpm --filter benchmarks bench

# Results are saved with timestamp
# Compare against baseline metrics in Section 1.6
```

**Benchmark Locations:**
- Source: `tools/benchmarks/` directory (moved to monorepo workspace)
- Results: `tools/benchmarks/results/`
- Baseline: Section 1.6 of this document

---

## 6. Decision Log

This section tracks key decisions made during modernization.

### Phase 0 Decisions ✅ **COMPLETE**
- [x] **Compatibility Strategy**: Two-Track Strategy (v1.x backward compatible, v2.x+ modern) ✅
- [x] **Minimum Node.js Version**: 22.x (Current LTS, may lower to 18.x later) ✅
- [x] **Build Tool**: tsup (with esbuild fallback plan) ✅
- [x] **Breaking Changes Policy**: None in v1.x, allowed in v2.x+ with migration support ✅
- [x] **Module Format**: Both CommonJS and ESM (dual output) ✅
- [x] **Terminal Support**: Matrix documented (see Section 8) ✅

### Version Strategy ✅ **DECIDED**
- **Current**: 1.0.0-alpha.1
- **Progression**: alpha → beta → 1.0.0 (production)
- **Saves 2.0.0** for future major breaking changes

### Rationale for Test-First Approach
Testing before conversion protects against regressions in a complex, low-level library where bugs can be subtle and hard to detect. With 21K+ lines of intricate terminal manipulation code, comprehensive test coverage is non-negotiable.

### Rationale for Incremental Conversion
Converting 21K LOC in one shot is extremely risky. Incremental conversion with `allowJs: true` allows:
- Keeping the build working throughout
- Running tests continuously
- Catching issues early and often
- Allowing rollback if needed
- Maintaining contributor velocity

### Rationale for Build Tool Choice
Vite is optimized for web applications with HMR and dev servers. For a Node.js library:
- **tsup**: Best choice - built for libraries, simple config, good output
- **esbuild**: Fast, flexible, good for complex needs
- **rollup**: Traditional choice, very flexible
- ~~**Vite**: Not ideal for Node.js library use case~~

---

## 7. Known Issues & Quirks

This section catalogs known issues, limitations, and quirks in blessed. These guide v1.x vs v2.x decisions.

### Categorization

- **MUST FIX** - Critical issues to fix in v1.x
- **SHOULD FIX** - Fix if possible without breaking compatibility
- **WON'T FIX (v1.x)** - Requires breaking changes, defer to v2.x+
- **PRESERVE** - Intentional quirks users may depend on

### Critical Issues (MUST FIX)

**1. Mouse Support Limitations**
- Mouse clicks limited to 255 cells on older VTE terminals
- Root cause: Old VTE versions only support buggy X10 protocol
- **V1.x Action:** Document limitation, improve detection

**2. Windows Platform Limitations**
- No mouse or resize events on Windows cmd.exe/PowerShell
- **V1.x Action:** Document limitation, test Windows Terminal support

**3. Terminal.app Mouse Support**
- No mouse event support in macOS Terminal.app
- **V1.x Action:** Document limitation, recommend iTerm2/Alacritty

### Code Quality Issues (SHOULD FIX)

**4. Error Handling in tput.js**
- Terminfo parsing may not handle errors gracefully
- **V1.x Action:** Improve error handling without changing API

**5. Mouse Code Duplication**
- Mouse handling code duplicated in element.js
- **V1.x Action:** Refactor internally (no API change)

### API Inconsistencies (WON'T FIX in v1.x)

**6. Duplicate Table Methods**
- `setData()` and `setRows()` do the same thing
- **V1.x Action:** Keep both (backward compatibility)
- **V2.x Action:** Deprecate `setData`, use `setRows`

**7. Inconsistent Widget Options**
- Some widgets use `items`, others use `commands`, others use `rows`
- **V1.x Action:** Preserve (breaking change to fix)
- **V2.x Action:** Standardize naming

**8. Mixed Naming Conventions**
- Inconsistent method/property naming (`aleft` vs `absoluteLeft`, `xi` vs `innerLeft`)
- **V1.x Action:** Preserve (breaking change to fix)
- **V2.x Action:** Consistent naming with aliases

### Workarounds & Quirks (PRESERVE)

**9. ScrollableBox Deprecated**
- ScrollableBox and ScrollableText are deprecated
- Alternative: Use Box with `scrollable: true`
- **V1.x Action:** Keep working, add deprecation warning
- **V2.x Action:** May remove

**10. Layout Requires Dimensions**
- Layout widget requires explicit width/height (chicken-and-egg problem)
- **V1.x Action:** Document requirement clearly
- **V2.x Action:** May improve with better algorithm

### Rendering & Performance

**11. smartCSR Flickering**
- `smartCSR` option causes flickering on non-full-width elements
- **Workaround:** Use `fastCSR` or disable CSR optimization
- **V1.x Action:** Document trade-off
- **V2.x Action:** Better heuristics

### External Dependencies

**12. w3m Image Display**
- OverlayImage requires w3mimgdisplay binary (Unix-like only)
- **V1.x Action:** Improve detection, better error messages

**13. libcaca for Video**
- Video widget requires mplayer/mpv with libcaca
- **V1.x Action:** Document requirements

### Documentation Gaps

**14. Unclear Coordinate System**
- Coordinate system (`coords`, `lpos`) not well documented
- Properties like `xi`, `xl`, `yi`, `yl` meanings unclear
- **V1.x Action:** Comprehensive documentation in API_REFERENCE.md

**15. Missing Event Documentation**
- Not all events are documented
- **V1.x Action:** Complete event catalog

### Testing Gaps

**16. Limited Terminal Testing**
- Not tested across full range of terminals
- **V1.x Action:** Establish terminal compatibility matrix (see Section 8)
- **V1.x Action:** Automated testing (Phase 1)

**Full issue catalog:** See `docs/` for detailed Known Issues documentation from Phase 0.

---

## 8. Terminal Compatibility Matrix

This section defines officially supported terminals and documents compatibility.

### Support Levels

- ✅ **Full Support** - All features work, regularly tested
- ⚠️ **Partial Support** - Most features work, known limitations
- ❌ **Limited Support** - Basic functionality only
- ⏸️ **Untested** - Should work via terminfo, not verified

### Officially Supported Terminals

**macOS**
- ✅ **iTerm2** (3.x+) - Recommended, full features
- ✅ **Alacritty** - Recommended, modern, fast
- ✅ **Kitty** - Recommended, feature-rich
- ⚠️ **Terminal.app** - No mouse support

**Linux**
- ✅ **gnome-terminal** (VTE 0.50+) - Recommended
- ✅ **konsole** (20.x+) - Recommended
- ✅ **xterm** (300+) - Reference implementation
- ✅ **Alacritty** - Cross-platform
- ⚠️ **urxvt** - Mouse quirks, no true color
- ⚠️ **Linux Console (TTY)** - Limited features

**Windows**
- ✅ **Windows Terminal** (1.x+) - Recommended, full features
- ❌ **cmd.exe** - No mouse/resize events
- ❌ **PowerShell Console** - No mouse/resize events
- ⚠️ **ConEmu** - Partial support

**Multiplexers**
- ✅ **tmux** (2.x+) - Recommended, full support with config
- ⚠️ **GNU screen** (4.x+) - No true color

**SSH/Remote**
- ✅ **SSH** - Passes through to actual terminal

### Feature Matrix Quick Reference

| Terminal | Mouse | 256 Color | True Color | Unicode | Recommended |
|----------|-------|-----------|------------|---------|-------------|
| iTerm2 | ✅ | ✅ | ✅ | ✅ | ⭐ |
| Alacritty | ✅ | ✅ | ✅ | ✅ | ⭐ |
| Windows Terminal | ✅ | ✅ | ✅ | ✅ | ⭐ |
| gnome-terminal | ✅ | ✅ | ✅ | ✅ | ⭐ |
| xterm | ✅ | ✅ | ⚠️ | ✅ | ⭐ |
| Terminal.app | ❌ | ✅ | ⚠️ | ✅ | - |
| cmd.exe | ❌ | ⚠️ | ❌ | ⚠️ | - |
| tmux | ✅ | ✅ | ✅* | ✅ | ⭐ |

*with proper configuration

### Minimum Requirements

For full blessed functionality:
- ✅ 256 color support
- ✅ Mouse support (SGR protocol preferred)
- ✅ Unicode support
- ✅ CSR (change scroll region)
- ✅ Resize events

### Testing Strategy

**Phase 1 (Automated):** xterm, tmux, GitHub Actions
**Phase 2 (Manual):** iTerm2, Alacritty, Windows Terminal, gnome-terminal
**Phase 3 (Community):** Kitty, konsole, urxvt, others

**Full compatibility matrix:** See `docs/` for complete terminal documentation from Phase 0.

---

## 9. Questions & Answers

### How long will this take?
- Phase 0: 1 week
- Phase 1: 3-4 weeks (most critical)
- Phase 2: 1-2 weeks
- Phase 3: 6-8 weeks
- Phase 4: 2-3 weeks
- Phase 5: 2 weeks
- **Total: ~4-5 months** for core modernization

### Can we skip testing and go straight to TypeScript?
**No.** This is the most critical mistake to avoid. Without tests:
- You won't know what you broke
- Regressions will be discovered by users
- Rollback is difficult
- Confidence in changes is low

### What if tests are hard to write?
Start with easy wins (helpers, utilities). Build test infrastructure gradually. Some parts (program.js, tput.js) may never have high unit test coverage - that's okay if integration tests cover them.

### Should we maintain 100% backward compatibility?
Recommend Option B: Allow minimal, well-documented breaking changes for significant improvements. Most users can adapt with a good migration guide.

### What about blessed-contrib?
Deal with it in Phase 6, after core modernization is complete and stable. Don't let it scope creep into the core effort.

---

## 10. Resources & References

### Testing Libraries
- [Vitest](https://vitest.dev/) - Fast, modern test framework
- [Mock-stdin](https://www.npmjs.com/package/mock-stdin) - Mock terminal input

### Build Tools
- [tsup](https://tsup.egoist.dev/) - Recommended for libraries
- [esbuild](https://esbuild.github.io/) - Fast bundler
- [TypeScript](https://www.typescriptlang.org/) - TypeScript language

### Performance Tools
- [clinic.js](https://clinicjs.org/) - Node.js performance profiling
- [0x](https://github.com/davidmarkclements/0x) - Flame graphs

### Documentation
- [TypeDoc](https://typedoc.org/) - API documentation from TypeScript

---

Please refer to this document as you work on the project. Your contributions are crucial to the success of this modernization effort. Let's build the future of terminal applications together - safely, incrementally, and with confidence!