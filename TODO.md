# TODO

Code modernization and cleanup tasks for @unblessed.

## High Priority

### 1. Remove `var self = this` pattern
**Effort:** Low (~1 hour)
**Priority:** High
**Status:** Ready to implement

**Description:**
Replace old JavaScript closure pattern `var self = this` with arrow functions to preserve `this` context. Modern ES6 approach that's cleaner and more maintainable.

**Current state:**
- 7 occurrences across 2 files:
  - `overlayimage.ts`: 1 occurrence
  - `tput.ts`: 6 occurrences

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
- `packages/core/src/widgets/overlayimage.ts` (1 instance)
- `packages/core/src/lib/tput.ts` (6 instances)

**Benefits:**
- Modern ES6 pattern
- Less verbose, more readable
- Eliminates extra variable allocation
- Consistent with rest of codebase

---

## Low Priority

### 2. Replace `var` with `const`/`let`
**Effort:** Medium (~3-4 hours)
**Priority:** Low
**Status:** Future improvement

**Description:**
Replace all `var` declarations with `const` (for immutable bindings) or `let` (for reassignable variables). Modern ES6 best practice with better scoping rules (block vs function scope).

**Current state:**
- 82 occurrences across 4 files:
  - `ansiimage.ts`: 2 instances
  - `overlayimage.ts`: 16 instances
  - `program.ts`: 12 instances
  - `tput.ts`: 52 instances

**Implementation approach:**
1. Start with smallest files first:
   - `ansiimage.ts` (2 vars) - easiest to validate
   - `program.ts` (12 vars) - medium complexity
   - `overlayimage.ts` (16 vars) - after removing var self pattern
   - `tput.ts` (52 vars) - largest, save for last
2. For each var declaration, analyze if variable is reassigned:
   - Never reassigned → use `const`
   - Reassigned → use `let`
3. Run tests after each file conversion to catch scope issues

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
- `packages/core/src/widgets/ansiimage.ts` (2 vars)
- `packages/core/src/lib/program.ts` (12 vars)
- `packages/core/src/widgets/overlayimage.ts` (16 vars)
- `packages/core/src/lib/tput.ts` (52 vars)

**Benefits:**
- Block scoping prevents subtle bugs
- `const` signals immutability intent
- Better alignment with TypeScript strict mode
- Modern ES6 standard
- Easier to reason about variable lifecycle

**Why Low Priority:**
- Current code works fine with `var`
- TypeScript strict mode already catches many issues
- Requires careful analysis of each case
- Not urgent, but good practice

---

## Not Recommended

These items from the old TODO list are **not recommended** for implementation:

### ❌ Add `this.runtime` to Node class
**Why Skip:**
- Marginal performance benefit (getRuntime() is already optimized)
- Adds memory overhead to every widget instance
- Current pattern better reflects singleton semantics
- Theoretical testing benefit doesn't materialize in practice
- Would add complexity without meaningful gain

**Current approach is cleaner:** Runtime as global singleton accessed via `getRuntime()` is explicit and appropriate for the architecture.

---

### ❌ Investigate EventEmitter replacement
**Why Skip:**
- Current custom EventEmitter is stable and battle-tested
- High risk of subtle behavior changes for minimal benefit
- Provides consistent behavior across all platforms (Node, browser, tests)
- Full control over implementation details
- No significant bundle size savings expected

**Current approach is stable:** The custom EventEmitter works well and provides predictable behavior.

---

### ⏸️ Refactor colors.ts to named exports
**Why Defer to v2.0.0:**
- Would be a breaking change for external consumers
- Current v1.x goal is 100% backward compatibility with blessed
- Functions benefit from namespace (match, blend, convert are generic names)
- Primarily used internally, so tree-shaking benefit is limited

**Consider for v2.0.0:** This would be a good modernization, but should wait for the next major version when breaking changes are acceptable.

**Alternative approach:** Could export both ways temporarily (default + named exports) to allow gradual migration without breaking changes.

---

## Summary

**Do now:** Item #1 (remove var self = this) - Quick win with clear benefits

**Do later:** Item #2 (replace var with const/let) - Good practice but not urgent

**Don't do:** Items #3-5 - Not worth the effort/risk, or deferred to v2.0.0

---

## Completed Tasks

For historical reference, these major refactoring efforts have been completed:

- ✅ Full TypeScript conversion with strict mode
- ✅ Runtime dependency injection pattern implemented
- ✅ Platform-agnostic core architecture
- ✅ 100% test coverage (1,987/1,987 tests passing)
- ✅ Browser support via XTerm.js integration
- ✅ Monorepo setup with Turborepo
- ✅ Modern build tooling (tsup, pnpm)
- ✅ Package rebranding from @tui to @unblessed
- ✅ Documentation consolidation and cleanup
