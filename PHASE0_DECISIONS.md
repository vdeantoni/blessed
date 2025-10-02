# Phase 0: Analysis & Critical Decisions

This document tracks all decisions made during Phase 0 of the blessed modernization effort.

## Status: In Progress

---

## 0.3: Dependencies Audit ✅

### Current State
- **Runtime Dependencies**: None (blessed is dependency-free!)
- **Dev Dependencies**: None listed in package.json
- **Optional Dependencies**: None

### Analysis
This is excellent - blessed is a pure Node.js library with no external dependencies. This significantly simplifies the modernization effort.

### Action Items
- Add modern dev dependencies during Phase 1 (Vitest, TypeScript, etc.)
- Keep runtime dependency-free if possible

---

## 0.6: Minimum Node.js Version

### Current State
- **Current requirement**: `">= 0.8.0"` (released June 2012!)
- **Your Node version**: v24.9.0

### Analysis
Node.js 0.8.0 is extremely outdated. Modern tooling requires much newer versions:
- **Node.js 14.x**: EOL April 2023
- **Node.js 16.x**: EOL September 2023
- **Node.js 18.x**: LTS until April 2025
- **Node.js 20.x**: LTS until April 2026
- **Node.js 22.x**: Current (became LTS October 2024)

### Recommendation
**Minimum: Node.js 18.x** (currently in LTS)

**Rationale:**
- Still has active LTS support until April 2025
- Supports all modern JavaScript features we need
- Compatible with TypeScript, Vitest, and modern tooling
- Balances modernity with reasonable backward compatibility
- Most production environments have migrated to 18+ by now

### ✅ DECISION: Node.js 22.x

**Approved by maintainer**

**Rationale:**
- Node.js 22.x is the current LTS (as of October 2024)
- LTS support until April 2027 (longer runway)
- Access to latest JavaScript features
- Future-proofs the library for longer
- Modern tooling fully supports it

---

## 0.5: Build Tooling

### Options Evaluated

#### Option 1: tsup (Recommended)
- **Pros**: Purpose-built for libraries, simple config, excellent DX, handles CJS/ESM/types
- **Cons**: Less flexible than raw esbuild/rollup
- **Best for**: Our use case (Node.js library modernization)

#### Option 2: esbuild
- **Pros**: Extremely fast, flexible, widely adopted
- **Cons**: More configuration needed, need separate dts bundler
- **Best for**: Complex build requirements

#### Option 3: rollup
- **Pros**: Battle-tested, excellent plugin ecosystem
- **Cons**: Slower than esbuild/tsup, more configuration
- **Best for**: Traditional projects with complex needs

#### ~~Option 4: Vite~~ (Not Recommended)
- **Cons**: Optimized for web apps with HMR, overkill for library
- **Not suited** for Node.js library use case

### Recommendation
**Use tsup** (with caveat)

**Rationale:**
- Perfect for TypeScript library modernization
- Single command to output CJS, ESM, and type definitions
- Minimal configuration required
- Based on esbuild (fast) but library-optimized
- Great developer experience

**⚠️ Risk: Maintenance Status**
- tsup appears to be unmaintained (last major updates 2023)
- Original maintainer less active
- However: It's built on esbuild, which IS actively maintained
- Still works well, but future updates uncertain

**Mitigation Strategy:**
- If tsup becomes problematic, migration to raw esbuild is straightforward
- Keep build config simple to ease future migration
- Monitor tsup's status and be ready to switch if needed

### ✅ DECISION: tsup (with migration plan)

**Approved by maintainer with awareness of maintenance concerns**

**Plan:**
- Use tsup for simplicity now
- Keep build config minimal and portable
- Have esbuild migration plan ready if tsup fails
- Worst case: tsup still works, we just fork or migrate later

---

## 0.1: Compatibility Strategy

### ✅ DECISION: Two-Track Strategy

**Approved by maintainer**

This modernization will follow a **two-track versioning strategy** that serves both existing and new users:

---

### Track 1: v1.x - Backward Compatible (v0.0.1 → v1.0.0)

**Philosophy:** 100% backward compatibility with original blessed

**Target Users:**
- Existing applications that want improvements without code changes
- Users who can't afford migration time
- Production apps requiring stability

**Strategy:**
- Start at v0.0.1 (pre-release)
- Work towards stable v1.0.0
- TypeScript conversion with **Option A: Conservative**
- Zero breaking changes to public API
- All existing blessed code works unchanged
- Only additions and internal improvements

**What v1.x Provides:**
- ✅ TypeScript types and definitions
- ✅ Modern build system (ESM + CJS)
- ✅ Better documentation
- ✅ Performance optimizations (preserving behavior)
- ✅ Bug fixes (non-breaking)
- ✅ New features (additive only)
- ❌ No API changes
- ❌ No breaking improvements

**Release Path:**
```
Original blessed 0.1.81
  ↓
v0.1.82 (our fork start)
  ↓
v0.2.x, v0.3.x, etc. (development releases during modernization)
  ↓
v1.0.0 (stable, fully modernized, backward compatible)
  ↓
v1.x.x (minor improvements, patches)
```

---

### Track 2: v2.x+ - Modern & Improved (Future)

**Philosophy:** Clean, modern API for new development

**Target Users:**
- New applications being built
- Existing users willing to migrate
- Those who want best-in-class API

**Strategy:**
- After v1.0.0 is stable
- **Option B/C: Pragmatic to Aggressive** changes allowed
- Fix API quirks and inconsistencies
- Modern JavaScript/TypeScript patterns
- Breaking changes are okay (with migration path)

**What v2.x+ Will Provide:**
- ✅ All v1.x improvements
- ✅ Fixed API inconsistencies
- ✅ Better TypeScript ergonomics
- ✅ Modern patterns (classes, async, etc.)
- ✅ Cleaner architecture
- ✅ Migration guides
- ✅ Codemods (automated migration tools)
- ✅ Deprecation warnings in v1.x preparing for v2

**Migration Support:**
```javascript
// v1.x - will work forever
const blessed = require('blessed');
var screen = blessed.screen({ smartCSR: true });

// v2.x - improved API
import { Screen } from 'blessed';
const screen = new Screen({ smartCSR: true });

// Codemod tool will automate migration:
npx blessed-migrate v1-to-v2 ./src
```

---

### Versioning Timeline

```
Phase 1-3: Build v1.0.0 (Backward Compatible)
├─ v0.1.0 → v0.5.0: TypeScript conversion
├─ v0.6.0 → v0.9.0: Testing, optimization
└─ v1.0.0: Stable release (100% compatible with original blessed)

Phase 4+: Maintain v1.x + Plan v2.0.0
├─ v1.1.x, v1.2.x: Minor improvements, backports
└─ v2.0.0: Modern API (breaking changes, migration guides)

Future: v3.x, v4.x, etc.
└─ Continued evolution with proper migration paths
```

---

### Key Policies

**For v1.x (Current Focus):**
- ❌ No breaking changes, ever
- ❌ Can't remove duplicate methods
- ❌ Can't fix confusing APIs
- ✅ Can add new features
- ✅ Can improve types (must match existing behavior)
- ✅ Can optimize internally
- ✅ Can add deprecation warnings (for v2 prep)

**For v2.x+ (Future):**
- ✅ Breaking changes allowed
- ✅ Fix API inconsistencies
- ✅ Modern patterns
- ✅ Must provide migration guide
- ✅ Should provide codemods
- ✅ Deprecations in v1.x should prepare users

---

### This Strategy Combines Best Of:
- **Option A** (Conservative) for v1.x
- **Option B/C** (Pragmatic/Aggressive) for v2.x+
- **Option D** (Gradual Deprecation) between versions
- **Option E** (Dual API) - v1 and v2 coexist

**Benefits:**
- Existing users never forced to migrate
- New users get modern API
- Clear path for both stability and innovation
- Ecosystem can evolve without breaking existing apps

---

## 0.2: Document Current API Surface

### Status
🔄 In Progress

### Approach
1. Extract all exported classes and functions from `lib/widget.js`
2. Document public methods for each widget class
3. Document Screen, Element, Node APIs
4. Document helper functions
5. Create API compatibility checklist

### Widgets to Document (44 items)
- Node, Screen, Element
- Box, Text, Line
- ScrollableBox, ScrollableText, BigText
- List, FileManager, ListTable, Listbar
- Form, Input, Textarea, Textbox, Button
- Checkbox, RadioSet, RadioButton
- ProgressBar
- Prompt, Question, Message, Loading
- Log, Table
- Terminal, Image, ANSIImage, OverlayImage, Video
- Layout

### Action Items
- [ ] Create API_REFERENCE.md with current public API
- [ ] Note any undocumented behaviors
- [ ] Identify deprecated features

---

## 0.4: Document Known Issues

### Status
🔄 To Do

### Sources
1. GitHub Issues in original blessed repo
2. Comments in code marked TODO/FIXME/HACK
3. Known limitations in README.md
4. Community-reported quirks

### Action Items
- [ ] Review open issues on original repo
- [ ] Grep codebase for TODO/FIXME/HACK comments
- [ ] Document in KNOWN_ISSUES.md
- [ ] Categorize: Must Fix / Should Fix / Won't Fix

---

## 0.7: Terminal Compatibility Matrix

### Status
🔄 To Do

### Terminals to Evaluate
- **macOS**: iTerm2, Terminal.app
- **Linux**: gnome-terminal, konsole, xterm, urxvt, alacritty, kitty
- **Windows**: Windows Terminal, ConEmu, cmd.exe
- **SSH**: Various remote scenarios
- **Multiplexers**: tmux, screen

### From README - Known Issues
- Windows: No mouse or resize events currently
- iTerm2: Combining characters not displayed properly
- Terminal.app: No mouse event support
- VTE (old): Mouse limited to 255 cells

### Action Items
- [ ] Create TERMINAL_COMPATIBILITY.md
- [ ] Define officially supported terminals
- [ ] Document known limitations per terminal
- [ ] Plan testing strategy for CI

---

## Summary & Next Steps

### Completed ✅
- 0.3: Dependencies audit (none to worry about!)
- 0.6: Node.js version (**DECISION: 22.x** ✅)
- 0.5: Build tooling (**DECISION: tsup with esbuild fallback plan** ✅)
- 0.1: Compatibility strategy (**DECISION: Two-Track (v1.x backward compatible, v2.x+ modern)** ✅)

### Decisions Made ✅
1. ~~**Approve minimum Node.js 18.x?**~~ ✅ **APPROVED: Node.js 22.x**
2. ~~**Approve tsup as build tool?**~~ ✅ **APPROVED: tsup (with esbuild fallback plan)**
3. ~~**Approve compatibility strategy?**~~ ✅ **APPROVED: Two-Track Strategy**
   - v1.x: 100% backward compatible (start at v0.0.1 → v1.0.0)
   - v2.x+: Modern API with breaking changes (future)
4. ~~**Define breaking changes policy**~~ ✅ **DEFINED: No breaking in v1.x, allowed in v2.x+ with migration support**

---

## Phase 0 COMPLETE! ✅

All decisions made and documentation complete. Ready to proceed to Phase 1: Testing Infrastructure & Baseline Metrics.

### Deliverables
- ✅ PHASE0_DECISIONS.md - This document
- ✅ API_REFERENCE.md - Complete API surface documentation
- ✅ KNOWN_ISSUES.md - Catalog of 28 known issues categorized by priority
- ✅ TERMINAL_COMPATIBILITY.md - Terminal support matrix with testing strategy
- ✅ package.json - Updated version (0.1.82), Node.js requirement (22.x), repository info

### Next Steps
Proceed to Phase 1 (3-4 weeks):
1. Setup Vitest testing infrastructure
2. Write comprehensive tests (target: 70% coverage)
3. Create performance benchmarks (12 key metrics)
4. Convert all examples to integration tests