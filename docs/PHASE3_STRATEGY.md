# Phase 3: TypeScript Conversion Strategy

## Decision: Direct Conversion (.js → .ts)

**Recommended approach:** Convert files directly from `.js` to `.ts` (not parallel .d.ts files)

### Rationale

**✅ Why direct conversion:**
1. **Already configured** - `tsconfig.json` has `allowJs: true` for gradual migration
2. **Safety net exists** - 1,576 tests protect against regressions
3. **Cleaner result** - Single source of truth, no duplicate files
4. **Full TypeScript benefits** - Real type checking, not just declarations
5. **Industry standard** - Most mature TypeScript migrations use this approach

**❌ Why NOT parallel .d.ts files:**
- Creates maintenance burden (two files per module)
- Types can drift from implementation
- Doesn't leverage TypeScript fully
- More complex tooling setup
- Not what our tsconfig is designed for

**❌ Why NOT JSDoc:**
- Verbose and hard to maintain
- Not "real" TypeScript
- Limited type system features
- Doesn't solve the long-term goal

---

## Conversion Process (Per File)

### Step-by-Step

**1. Rename file**
```bash
git mv lib/helpers.js lib/helpers.ts
```

**2. Add type annotations incrementally**
```typescript
// Before (JavaScript)
function merge(a, b) {
  return Object.assign({}, a, b);
}

// After (TypeScript)
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return Object.assign({}, a, b);
}
```

**3. Fix type errors**
- Start with explicit `any` for complex types
- Refine types incrementally
- Use `@ts-expect-error` for known issues (document why)

**4. Run tests**
```bash
npm test
```

**5. Type check**
```bash
npm run type-check
```

**6. Commit**
```bash
git commit -m "refactor: Convert lib/helpers.js to TypeScript"
```

---

## Conversion Order (Phase 3 Plan)

### Week 1-2: Helper Modules (Easiest)

**Why first:** Pure functions, no dependencies, well-tested

1. `lib/helpers.ts` (166 lines, 69% coverage)
   - Pure utility functions
   - Simple type signatures
   - 28 tests protecting it

2. `lib/colors.ts` (384 lines, 79% coverage)
   - Color utilities
   - Some caching (need careful types)
   - 26 tests

3. `lib/unicode.ts` (844 lines, 65% coverage)
   - String/char utilities
   - Regex patterns
   - 36 tests

4. `lib/keys.ts` (342 lines, 93% coverage)
   - Key event parsing
   - Well-tested
   - 16 tests

**Deliverable:** `1.0.0-alpha.2` - Helper modules in TypeScript

---

### Week 3-4: Core Infrastructure

**Why next:** Foundation for everything else

5. `lib/events.ts` (127 lines)
   - EventEmitter extension
   - Simple types

6. `lib/widget.ts` (33 lines)
   - Widget registry
   - Dynamic require issue here! (Phase 3 will fix this)

7. `lib/widgets/node.ts` (282 lines, 73% coverage)
   - Base tree structure
   - Parent-child relationships
   - 38 tests

**Deliverable:** `1.0.0-alpha.3` - Core infrastructure in TypeScript

---

### Week 5-6: Simple Widgets

**Why next:** Build on Node, simple hierarchy

8. `lib/widgets/box.ts` (35 lines)
9. `lib/widgets/text.ts` (56 lines)
10. `lib/widgets/line.ts` (79 lines)
11. `lib/widgets/button.ts` (83 lines)
12. `lib/widgets/checkbox.ts` (161 lines)

**Deliverable:** `1.0.0-alpha.4` - Basic widgets in TypeScript

---

### Week 7-8: Element (Hardest!)

**Why later:** Complex, 2,571 lines, needs careful planning

13. `lib/widgets/element.ts` (2,571 lines, 47% coverage)
    - **Challenge:** Massive file, complex positioning logic
    - **Strategy:**
      - Extract types first (interfaces for coords, styles, etc.)
      - Convert incrementally (may need multiple commits)
      - Consider refactoring large methods
    - 45 tests protecting it

**Deliverable:** `1.0.0-alpha.5` - Element in TypeScript (major milestone!)

---

### Week 9-12: Complex Widgets

**Why next:** Depend on Element

14-30. All remaining widgets (list, form, table, screen, etc.)
   - Convert alphabetically or by dependency order
   - Screen.js is complex (1,906 lines)
   - Each widget typically 1-2 days

**Deliverable:** `1.0.0-alpha.6` through `1.0.0-alpha.10` - All widgets

---

### Week 13-14: Low-Level (Last!)

**Why last:** Everything depends on these, hardest to type

31. `lib/tput.ts` (2,084 lines)
    - Terminfo/termcap parsing
    - May need many `any` types (complex binary parsing)

32. `lib/program.ts` (3,566 lines)
    - Terminal I/O and control
    - Escape sequences
    - May need many `any` types (low-level)

33. `lib/blessed.ts` (33 lines)
    - Main entry point
    - Exports everything

**Deliverable:** `1.0.0-alpha.11` - Fully TypeScript codebase!

---

## Type Strategy Guidelines

### Start Permissive, Refine Later

**Phase 3A: Get it compiling**
```typescript
// Use explicit any for complex types initially
function processScreen(screen: any): any {
  // ...
}
```

**Phase 3B: Refine types** (can be Phase 4)
```typescript
// Refine to proper types
function processScreen(screen: Screen): ProcessedScreen {
  // ...
}
```

### Common Type Patterns

**1. Options objects:**
```typescript
interface BoxOptions extends ElementOptions {
  content?: string;
  align?: 'left' | 'center' | 'right';
  // ...
}
```

**2. Event handlers:**
```typescript
type KeyHandler = (ch: string, key: KeyEvent) => void;
screen.key(['q'], handler);
```

**3. Widget hierarchy:**
```typescript
interface Node extends EventEmitter {
  parent: Node | null;
  children: Node[];
  // ...
}

interface Element extends Node {
  // ...
}

interface Box extends Element {
  // ...
}
```

**4. Coordinate system:**
```typescript
interface Coords {
  xi: number;  // inner left
  xl: number;  // inner left + width
  yi: number;  // inner top
  yl: number;  // inner top + height
  // Document what these mean!
}
```

### Using @ts-expect-error

For known issues that need fixing later:
```typescript
// @ts-expect-error TODO: Fix circular dependency with ScrollableBox
const ScrollableBox = require('./scrollablebox');
```

### Interface Extraction

Extract shared interfaces to separate files:
```
lib/
  types/
    coords.ts      - Position/size types
    styles.ts      - Style/color types
    events.ts      - Event types
    widgets.ts     - Widget option types
```

---

## Dynamic Require Problem

**The Issue:** `lib/widget.js:48`
```javascript
require('./widgets/' + file);  // Can't bundle this!
```

**Phase 3 Solution:**
```typescript
// lib/widget.ts
import box from './widgets/box';
import text from './widgets/text';
import list from './widgets/list';
// ... all widgets

const widgets = {
  box,
  text,
  list,
  // ...
};

// Register with blessed
for (const [name, Widget] of Object.entries(widgets)) {
  blessed[name] = function(options) {
    return new Widget(options);
  };
}
```

**This enables:**
- ✅ Static analysis
- ✅ Proper bundling (dist/ will work!)
- ✅ Tree shaking
- ✅ Type safety

---

## Testing During Conversion

### Run Tests After Every File

```bash
# After converting each file
npm test                    # All tests must pass
npm run type-check         # No type errors
npm run build              # Build must succeed
```

### Test Script Addition

Add to `package.json`:
```json
{
  "scripts": {
    "test:types": "tsc --noEmit && echo '✅ Type check passed'",
    "test:all": "npm run test:types && npm test"
  }
}
```

---

## Alpha Release Strategy

### Release After Each Major Milestone

**Every 1-2 weeks:**
```bash
# Update version
npm version prerelease --preid=alpha

# Publish
npm publish --tag alpha

# Tag and push
git tag v1.0.0-alpha.X
git push --tags
```

**Changelog entries:**
- Document what modules converted
- Note any API changes (shouldn't be any!)
- Mention test coverage maintained

---

## Handling Challenges

### 1. Large Files (element.js, program.js, screen.js)

**Strategy:**
- Convert in multiple commits
- Extract types first
- Add `// @ts-ignore` temporarily if needed
- Refine types in follow-up commits

### 2. Circular Dependencies

**Common in blessed:**
```typescript
// Use type-only imports
import type { Screen } from './screen';
```

### 3. Missing Type Information

**For untyped dependencies:**
```typescript
// Create minimal .d.ts
declare module 'tng' {
  export function parse(data: Buffer): any;
}
```

### 4. Complex Union Types

**Start simple:**
```typescript
// Phase 3A
type Position = any;

// Phase 3B (later)
type Position = number | string | {
  left?: number | string;
  top?: number | string;
};
```

---

## Success Metrics

### Per-File Checklist

- [ ] File renamed .js → .ts
- [ ] TypeScript compiles (may have `any` types)
- [ ] All tests pass
- [ ] No new test failures
- [ ] Build succeeds
- [ ] Committed with clear message

### Phase 3 Completion

- [ ] All modules converted to .ts
- [ ] No .js files in lib/ (except maybe vendor/)
- [ ] Build produces type definitions
- [ ] All 1,576+ tests passing
- [ ] Test coverage maintained or improved
- [ ] Dynamic requires fixed (bundling works!)
- [ ] Documentation updated

---

## Estimated Timeline

| Week | Focus | Files | Alpha Release |
|------|-------|-------|---------------|
| 1-2 | Helpers | 4 files | alpha.2 |
| 3-4 | Core | 3 files | alpha.3 |
| 5-6 | Simple widgets | 5 files | alpha.4 |
| 7-8 | Element | 1 file (huge) | alpha.5 |
| 9-12 | Complex widgets | 17 files | alpha.6-10 |
| 13-14 | Low-level | 3 files | alpha.11 |

**Total: ~14 weeks (3.5 months)**

---

## Next Steps (This Week)

1. **Commit test-npm** (today)
2. **Start with lib/helpers.ts** (tomorrow)
3. **Document progress** (update AGENTS.md)
4. **Release alpha.2** (end of week)

Ready to begin Phase 3! 🚀