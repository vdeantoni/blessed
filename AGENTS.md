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

### **Phase 0: Analysis & Critical Decisions**

- **Goal:** Make critical decisions and document current state before any changes.
- **Complexity:** Low
- **Duration:** 1 week

| Task | Description | Complexity |
|------|-------------|------------|
| **0.1: Decide Compatibility Strategy** | Choose Option A, B, or C from above. Document decision and implications. | Low |
| **0.2: Document Current API Surface** | Create comprehensive API documentation of all public methods/properties for compatibility checking. | Medium |
| **0.3: Audit Dependencies** | Review and document all dependencies, identify outdated ones, plan updates. | Low |
| **0.4: Document Known Issues** | Catalog known bugs and quirks - decide which to preserve vs fix. | Low |
| **0.5: Choose Build Tooling** | Evaluate options (tsup, esbuild, rollup). **Recommendation**: tsup (better for Node.js libraries than Vite). | Low |
| **0.6: Set Minimum Node.js Version** | Current is ">= 0.8.0" - propose modern minimum (14.x? 16.x? 18.x?). | Low |
| **0.7: Terminal Compatibility Matrix** | Document which terminals are officially supported and tested. | Medium |

**Completion Criteria:**
- [ ] Compatibility strategy documented and agreed upon
- [ ] Current API surface fully documented
- [ ] Build tool selected and justified
- [ ] Minimum Node.js version decided

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

#### 1.3: Widget Testing 🔄 **IN PROGRESS**

| Task | Description | Coverage Target | Complexity | Status | Progress |
|------|-------------|----------------|------------|--------|----------|
| **1.3.1: Test Basic Widgets** | Test Box, Text, Line widgets (rendering, positioning, content). | 80% | Medium | 🔄 **IN PROGRESS** | Box: ✅ (33 tests), Text: ⏳, Line: ⏳ |
| **1.3.2: Test Interactive Widgets** | Test List, Form, Button, Checkbox (events, state, interaction). | 70% | High | ⏳ TODO | - |
| **1.3.3: Test Layout Widgets** | Test Layout, Table, ListTable (complex positioning). | 60% | High | ⏳ TODO | - |
| **1.3.4: Test Special Widgets** | Test Image, Terminal, Video (with appropriate mocking). | 50% | High | ⏳ TODO | - |

**What was done:**
- Box widget: 33 tests covering constructor, positioning, content, hierarchy, borders, padding
- Mock screen and program utilities ready for widget testing

#### 1.4: Core Component Testing

| Task | Description | Coverage Target | Complexity |
|------|-------------|----------------|------------|
| **1.4.1: Test Node** | Test node tree operations (append, detach, insert, events). | 80% | Medium |
| **1.4.2: Test Element** | Test base element functionality (positioning, rendering, events). | 70% | High |
| **1.4.3: Test Screen** | Test screen lifecycle, rendering, focus management. | 60% | High |
| **1.4.4: Integration Tests from Examples** | Convert all files in `example/` to integration tests. | 100% of examples | Medium |

#### 1.5: Low-Level Testing (Integration Level)

| Task | Description | Coverage Target | Complexity |
|------|-------------|----------------|------------|
| **1.5.1: Test Program (Basic)** | Test basic program operations with mocked terminal. | 40% | High |
| **1.5.2: Test Tput (Basic)** | Test terminfo parsing and basic capabilities. | 30% | High |

**Note:** Full coverage of program.js and tput.js is not required - these are mostly tested through integration.

#### 1.6: Performance Baseline & Benchmarking

| Task | Description | Complexity |
|------|-------------|------------|
| **1.6.1: Create Benchmark Harness** | Setup infrastructure in `/benchmarks` with consistent timing/memory measurement. | Medium |
| **1.6.2: Rendering Benchmarks** | Create benchmarks for screen render, incremental render, widget rendering. | Medium |
| **1.6.3: Layout Benchmarks** | Create benchmarks for positioning calculations, nested layouts. | Medium |
| **1.6.4: Event Processing Benchmarks** | Create benchmarks for key/mouse event handling, event bubbling. | Low |
| **1.6.5: Scalability Benchmarks** | Create benchmarks for large lists (10K items), tables (100x100), deep trees. | Medium |
| **1.6.6: Document Baseline Metrics** | Run all benchmarks, document current performance numbers. | Low |
| **1.6.7: Setup CI Benchmark Tracking** | Add CI job to run benchmarks and track performance over time. | Medium |

**Key Benchmarks to Establish:**
```
1. Empty screen render time
2. Complex screen render (100 nested boxes)
3. Large text box rendering (10K lines)
4. List with 10K items (initial render + scroll)
5. Table with 100x100 cells
6. 1000 key events processing time
7. 1000 mouse events processing time
8. Event bubbling through 50-deep tree
9. Complex layout calculation (50 elements)
10. Percentage-based positioning recalc
11. Memory usage baseline (simple app)
12. Memory usage with large data (10K list items)
```

**Phase 1 Completion Criteria:**
- [x] **Testing infrastructure setup** (Vitest, mocks, coverage) ✅
- [x] **All pure function modules tested** (helpers, colors, unicode, keys) ✅
- [ ] All widgets have basic render + event tests (70%+ coverage) - **IN PROGRESS** (Box done)
- [ ] All examples converted to passing integration tests
- [ ] Core components (Node, Element, Screen) at 60%+ coverage
- [ ] 12 performance benchmarks documented with baseline numbers
- [ ] CI pipeline running tests and benchmarks automatically
- [ ] Overall project coverage: 70%+

**Current Status (as of latest commit):**
- ✅ **702 tests passing locally** - All tests green!
- ✅ Pure functions: 106 tests (helpers: 64 tests, colors: 26 tests, unicode: 36 tests, keys: 16 tests)
  - helpers.js: 69% coverage
  - colors.js: 79% coverage
  - unicode.js: 65% coverage
  - keys.js: 93% coverage
- ✅ Widget tests: 458 tests
  - ✅ Box widget: 33 tests (96% coverage)
  - ✅ Text widget: 23 tests (100% coverage)
  - ✅ Line widget: 29 tests (100% coverage)
  - ✅ Button widget: 22 tests (100% coverage)
  - ✅ Checkbox widget: 34 tests (94% coverage)
  - ✅ List widget: 48 tests (56% coverage)
  - ✅ Form widget: 54 tests (submit/reset/cancel/navigation/keyboard/vi mode)
  - ✅ Textbox widget: 33 tests (setValue/secret/censor/submit/edge cases)
  - ✅ Textarea widget: 64 tests (comprehensive tests)
  - ✅ RadioButton widget: 26 tests (check/uncheck/events)
  - ✅ RadioSet widget: 14 tests (container functionality)
  - ✅ Progressbar widget: 39 tests (progress/reset/keyboard/mouse/orientation)
  - ✅ Scrollablebox widget: 40 tests (scroll/scrollTo/keyboard/mouse/vi mode)
  - ✅ Table widget: 37 tests - NEW! (data/alignment/styling/border options)
  - ✅ Message widget: 26 tests - NEW! (display/error/timed/manual dismiss)
- ✅ Core components: 38 tests
  - ✅ Node component: 38 tests (parent-child relationships, insert/remove, traversal)
- ✅ Mock utilities complete (88% coverage)
- ✅ GitHub Actions workflow created (.github/workflows/test.yml)
- 📊 Overall coverage: ~32% lines, ~18% functions, ~70% branches
- 🔄 Next: Test Element and Screen components, more widgets (34 widget files total, 15 tested so far)

**Current CI Blockers:**
- ❌ **npm optional dependencies bug** (npm issue [#4828](https://github.com/npm/cli/issues/4828))
  - Error: "Cannot find module @rollup/rollup-linux-x64-gnu" in CI environment
  - Root cause: npm fails to install platform-specific binaries for rollup
  - Workaround attempted: Switching to pnpm with frozen-lockfile
  - Status: pnpm-lock.yaml generated, workflow updated to use pnpm
  - Alternative considered: Removing package-lock.json (defeats purpose of lock file)
- ⏳ **Package manager decision pending**: pnpm vs npm
  - pnpm handles optional dependencies more reliably
  - Both lock files currently present (package-lock.json + pnpm-lock.yaml)
  - Recommendation: Commit to pnpm and remove package-lock.json

---

### **Phase 2: Build System & Development Experience**

- **Goal:** Setup modern build tooling and development environment.
- **Complexity:** Medium
- **Duration:** 1-2 weeks

| Task | Description | Complexity |
|------|-------------|------------|
| **2.1: Initialize TypeScript Config** | Add `tsconfig.json` with `allowJs: true` for gradual migration. Use strict settings. | Low |
| **2.2: Setup Build Tool** | Configure tsup (or chosen tool) for building the library with proper CommonJS/ESM outputs. | Medium |
| **2.3: Integrate Prettier** | Add Prettier for consistent code formatting, configure pre-commit hooks. | Low |
| **2.4: Setup ESLint** | Configure ESLint with TypeScript support for code quality. | Low |
| **2.5: Update Package.json** | Modernize scripts, add proper exports map, update metadata. | Low |
| **2.6: Developer Documentation** | Create CONTRIBUTING.md with setup instructions, testing guidelines. | Low |

**Completion Criteria:**
- [ ] TypeScript compiles with allowJs enabled
- [ ] Build produces correct outputs (CJS + ESM)
- [ ] Linting and formatting automated
- [ ] All tests still pass with new build system

---

### **Phase 3: Incremental TypeScript Conversion**

- **Goal:** Convert codebase to TypeScript incrementally, maintaining test coverage throughout.
- **Complexity:** High
- **Duration:** 6-8 weeks
- **Strategy:** Convert high-level to low-level, keep tests green, never break the build

#### Conversion Order (Safest → Riskiest)

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

**Phase 3 Completion Criteria:**
- [ ] All modules converted to TypeScript (or have .d.ts files)
- [ ] All tests passing throughout conversion
- [ ] No use of `any` type except where absolutely necessary
- [ ] API surface unchanged (or documented breaking changes if Option B/C chosen)
- [ ] Test coverage maintained or improved

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

### Baseline Metrics (To Be Established in Phase 1)
- Document current performance across all benchmarks
- Establish acceptable ranges for each metric

### Target Improvements
- Rendering: No regression, aim for 10-20% improvement
- Memory: Reduce footprint for large datasets by 15%+
- Event processing: Maintain sub-millisecond latency
- Cold start: Library import time < 100ms

### Continuous Monitoring
- CI runs benchmarks on every PR
- Alert on regressions > 10%
- Track trends over time

---

## 6. Decision Log

This section tracks key decisions made during modernization.

### Phase 0 Decisions (To Be Made)
- [ ] **Compatibility Strategy**: Option A / B / C?
- [ ] **Minimum Node.js Version**: 14.x / 16.x / 18.x / 20.x?
- [ ] **Build Tool**: tsup / esbuild / rollup?
- [ ] **Breaking Changes Policy**: Document what's allowed
- [ ] **Module Format**: CommonJS only / ESM only / Both?
- [ ] **Terminal Support**: Which terminals officially supported?

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

## 7. Questions & Answers

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

## 8. Resources & References

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