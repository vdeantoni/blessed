# TODO

## 1. Add `this.runtime` to Node class - refactor getRuntime() usage
**Complexity:** Medium (~3-4 hours)

**Description:**
Add a `runtime` property to the Node class so all widgets have direct access via `this.runtime`. Refactor current usage of `getRuntime()` in widgets to use the instance property instead.

**Current state:**
- 23 calls to `getRuntime()` across widget files
- Scattered throughout: screen.ts (5), overlayimage.ts (11), element.ts (1), log.ts (1), bigtext.ts (1), ansiimage.ts (1), filemanager.ts (2), screen-header.ts (1)
- Runtime is currently accessed via global context through `getRuntime()` helper

**Implementation approach:**
1. Add `runtime: Runtime` property to Node class (packages/tui-core/src/widgets/node.ts:28)
2. Initialize in Node constructor: `this.runtime = getRuntime()`
3. Update all widget files to use `this.runtime` instead of `getRuntime()`
4. Consider keeping `getRuntime()` for utility functions that don't have widget context

**Files to modify:**
- `packages/tui-core/src/widgets/node.ts` (add property + initialization)
- `packages/tui-core/src/widgets/screen.ts` (5 usages)
- `packages/tui-core/src/widgets/overlayimage.ts` (11 usages)
- `packages/tui-core/src/widgets/element.ts` (1 usage + module-level nextTick)
- `packages/tui-core/src/widgets/log.ts` (1 usage)
- `packages/tui-core/src/widgets/bigtext.ts` (1 usage)
- `packages/tui-core/src/widgets/ansiimage.ts` (1 usage)
- `packages/tui-core/src/widgets/filemanager.ts` (2 usages)
- `packages/tui-core/src/widgets/screen-header.ts` (1 usage)

**Benefits:**
- More explicit dependency injection
- Better for testing (can mock runtime per widget instance)
- Clearer widget API - runtime available without import
- Slightly better performance (one fewer function call)

---

## 2. Refactor colors.ts - export individual functions instead of object
**Complexity:** Medium (~2-3 hours)

**Description:**
Refactor `colors.ts` to export individual functions directly instead of attaching them to a `colors` object. Modern ES6 module style with named exports.

**Current state:**
- 536 lines in colors.ts
- ~13 functions attached to `colors` object
- Default export of `colors` object
- Used in 7 files: index.ts, screen.ts, program.ts, ansiimage.ts, image-renderer.ts, screen-header.ts, element.ts

**Implementation approach:**
1. Convert each `colors.functionName = function(...)` to `export function functionName(...)`
2. Keep internal data structures (vcolors, _cache, ncolors, etc.) as module-scoped variables
3. Update imports across all consumer files from `import colors from './colors'` to `import { match, blend, convert, ... } from './colors'`
4. Remove default export

**Functions to convert:**
- `match()` - color matching
- `RGBToHex()` - RGB to hex conversion
- `hexToRGB()` - hex to RGB conversion
- `mixColors()` - color mixing
- `blend()` - attribute blending
- `reduce()` - color reduction
- `convert()` - color conversion
- Plus module-scoped data: xterm, colors, vcolors, ccolors, ncolors, colorNames

**Files to update imports:**
- `packages/tui-core/src/index.ts`
- `packages/tui-core/src/widgets/screen.ts`
- `packages/tui-core/src/lib/program.ts`
- `packages/tui-core/src/widgets/ansiimage.ts`
- `packages/tui-core/src/lib/image-renderer.ts`
- `packages/tui-core/src/widgets/screen-header.ts`
- `packages/tui-core/src/widgets/element.ts`

**Benefits:**
- Modern ES6 module pattern
- Better tree-shaking (only used functions bundled)
- Clearer API - explicit imports show what's used
- Easier to test individual functions
- Better IDE autocomplete/IntelliSense

---

## 3. Remove legacy `var self = this` pattern
**Complexity:** Low (~1-2 hours)

**Description:**
Replace old JavaScript closure pattern `var self = this` with arrow functions to preserve `this` context. Modern ES6 approach that's cleaner and more maintainable.

**Current state:**
- 10 occurrences of `var self = this` pattern
- Found in 2 files:
  - `overlayimage.ts`: 4 occurrences (lines 156, 256, 488, 560)
  - `tput.ts`: 6 occurrences (lines 505, 552, 1137, 1335, 1404, 1891)

**Implementation approach:**
1. Identify callbacks/closures using `self` variable
2. Convert to arrow functions: `function() { ... }` → `() => { ... }`
3. Replace `self.property` with `this.property` throughout converted functions
4. Test to ensure `this` context is preserved correctly

**Example transformation:**
```typescript
// Before
var self = this;
something.on('event', function() {
  self.property = value;
});

// After
something.on('event', () => {
  this.property = value;
});
```

**Files to modify:**
- `packages/tui-core/src/widgets/overlayimage.ts` (4 instances)
- `packages/tui-core/src/lib/tput.ts` (6 instances)

**Benefits:**
- Modern ES6 pattern
- Less verbose, more readable
- Eliminates extra variable allocation
- Consistent with rest of codebase

---

## 4. Replace `var` with `const`/`let`
**Complexity:** Medium-High (~4-6 hours)

**Description:**
Replace all `var` declarations with `const` (for immutable bindings) or `let` (for reassignable variables). Modern ES6 best practice with better scoping rules (block vs function scope).

**Current state:**
- 105 `var` declarations across 4 files:
  - `tput.ts`: ~3,060 lines (majority of var usage - ~52 instances)
  - `program.ts`: ~4,483 lines (~12 instances)
  - `overlayimage.ts`: ~795 lines (~39 instances)
  - `ansiimage.ts`: ~191 lines (~2 instances)

**Implementation approach:**
1. Use automated tool/script to identify all `var` declarations
2. Analyze each declaration to determine if variable is reassigned:
   - Never reassigned → use `const`
   - Reassigned → use `let`
3. File-by-file conversion:
   - Start with smaller files (ansiimage.ts, overlayimage.ts)
   - Then tackle larger files (program.ts, tput.ts)
4. Run tests after each file conversion to catch scope issues
5. Enable `noUncheckedIndexedAccess` in tsconfig.json after cleanup (if not already enabled)

**Example transformation:**
```typescript
// Before
var x = 5;
var y = 10;
y = 20;

// After
const x = 5;
let y = 10;
y = 20;
```

**Files to modify:**
- `packages/tui-core/src/widgets/ansiimage.ts` (~2 vars)
- `packages/tui-core/src/widgets/overlayimage.ts` (~39 vars)
- `packages/tui-core/src/lib/program.ts` (~12 vars)
- `packages/tui-core/src/lib/tput.ts` (~52 vars)

**Benefits:**
- Block scoping prevents subtle bugs
- `const` signals immutability intent
- Better with TypeScript strict mode
- Modern ES6 standard
- Easier to reason about variable lifecycle

**Note:** This is higher complexity due to the volume (105 instances) and need to carefully analyze each case for mutability. Large files like tput.ts (3,060 lines) and program.ts (4,483 lines) require extra care.

---

## 5. Investigate EventEmitter replacement strategy
**Complexity:** Low-Medium (~2-3 hours)

**Description:**
Investigate if we can switch from our custom EventEmitter implementation to using the runtime's event emitter, while having tui-node use Node.js's native event emitter.

**Current state:**
- Custom EventEmitter implementation in tui-core
- tui-node likely wraps or extends this
- Need to assess compatibility and migration path

**Investigation tasks:**
1. Document current EventEmitter usage and API surface
2. Compare runtime's event emitter capabilities vs current implementation
3. Identify Node.js EventEmitter integration points in tui-node
4. Assess breaking changes and migration complexity
5. Determine if runtime-based approach provides benefits (performance, size, maintenance)

**Benefits (if viable):**
- Reduce custom code maintenance
- Leverage native Node.js EventEmitter in tui-node
- Potentially better performance
- Smaller bundle size
