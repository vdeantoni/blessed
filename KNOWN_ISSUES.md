# Known Issues & Quirks

This document catalogs known issues, limitations, and quirks in blessed v0.1.82. These serve as a reference for v1.x development.

## Categorization

- **MUST FIX** - Critical issues that should be fixed in v1.x
- **SHOULD FIX** - Issues we should fix if possible without breaking compatibility
- **WON'T FIX (v1.x)** - Requires breaking changes, defer to v2.x+
- **PRESERVE** - Intentional quirks that users may depend on

---

## Critical Issues (MUST FIX in v1.x)

### 1. Mouse Support Limitations

**Issue:** Mouse clicks limited to 255 cells on older VTE terminals
- **Location:** lib/program.js mouse handling
- **Root Cause:** Old VTE versions only support buggy X10 protocol
- **Workaround:** Already implemented workarounds to get from 127→255 cells
- **Status:** Partially mitigated, terminal-dependent
- **V1.x Action:** Document limitation, improve detection
- **Code Comments:** `// XXX Bug in urxvt after wheelup/down on mousemove` (lib/program.js)

### 2. Windows Platform Limitations

**Issue:** No mouse or resize events on Windows
- **Platform:** Windows cmd.exe, older terminals
- **Status:** Known limitation, platform-dependent
- **V1.x Action:** Document limitation, test Windows Terminal support

### 3. Terminal.app Mouse Support

**Issue:** No mouse event support in Terminal.app (macOS default)
- **Platform:** macOS Terminal.app
- **Alternative:** iTerm2, Alacritty work fine
- **V1.x Action:** Document limitation

### 4. iTerm2 Combining Characters

**Issue:** Combining characters not displayed properly in iTerm2
- **Platform:** iTerm2 (macOS)
- **Status:** Terminal rendering issue
- **V1.x Action:** Document limitation

---

## Code Quality Issues (SHOULD FIX)

### 5. TODO: Error Handling in tput.js

**Issue:** Terminfo parsing may not handle errors gracefully
- **Location:** lib/tput.js
- **Code Comment:** `// TODO: Possibly handle errors gracefully below`
- **V1.x Action:** Improve error handling without changing API

### 6. TODO: Fix cud/cuu Calls

**Issue:** Cursor movement functions may have bugs
- **Location:** lib/program.js
- **Code Comment:** `// TODO: Fix cud and cuu calls`
- **V1.x Action:** Investigate and fix if safe

### 7. TODO: Deduplicate Mouse Code

**Issue:** Mouse handling code has duplication
- **Location:** lib/widgets/element.js
- **Code Comment:** `// XXX Deduplicate code here`
- **V1.x Action:** Refactor internally (no API change)

### 8. TODO: Move Mouse Event to Node

**Issue:** Mouse handling might belong in Node instead of Element
- **Location:** lib/widgets/element.js
- **Code Comment:** `// TODO: Possibly move this to Node for onScreenEvent('mouse')`
- **V1.x Action:** Consider refactoring (ensure backward compatibility)

### 9. GPM Device Detection

**Issue:** Should check /dev/input for GPM (Linux console mouse)
- **Location:** lib/gpmclient.js
- **Code Comment:** `// TODO: should also check for /dev/input/..`
- **V1.x Action:** Improve GPM detection

---

## API Inconsistencies (WON'T FIX in v1.x)

These require breaking changes and will be addressed in v2.x+.

### 10. Duplicate Table Methods

**Issue:** `setData()` and `setRows()` do the same thing
- **Affects:** Table, ListTable widgets
- **Reason:** Historical API evolution
- **V1.x Action:** Keep both (backward compatibility)
- **V2.x Action:** Deprecate `setData`, use `setRows`

### 11. Inconsistent Widget Options

**Issue:** Some widgets use `items`, others use `commands`, others use `rows`
- **Affects:** List, Listbar, Table
- **Reason:** Each widget evolved independently
- **V1.x Action:** Preserve (breaking change to fix)
- **V2.x Action:** Standardize naming

### 12. Mixed Naming Conventions

**Issue:** Inconsistent method/property naming across codebase
- **Examples:** `aleft` vs `absoluteLeft`, `xi` vs `innerLeft`
- **Reason:** Organic growth, no style guide
- **V1.x Action:** Preserve (breaking change to fix)
- **V2.x Action:** Consistent naming with aliases for compatibility

### 13. Unclear Parameter Ordering

**Issue:** Some methods have non-obvious parameter order
- **Example:** `setContent(content, noClear, noTags)`
- **Reason:** Parameters added over time
- **V1.x Action:** Preserve (breaking change to fix)
- **V2.x Action:** Use options objects

---

## Workarounds & Known Quirks (PRESERVE)

### 14. autoPadding Workaround

**Issue:** Temporary workaround for autoPadding behavior
- **Location:** lib/widgets/element.js
- **Code Comment:** `// XXX Temporary workaround until we decide to make autoPadding default`
- **V1.x Action:** Preserve current behavior
- **V2.x Action:** May change default

### 15. VTE Echo Behavior

**Issue:** VTE terminals bizarrely echo certain sequences
- **Location:** lib/program.js
- **Code Comment:** `// XXX VTE bizarelly echos this`
- **V1.x Action:** Keep workaround
- **Status:** Terminal bug, not blessed bug

### 16. ScrollableBox Deprecated

**Issue:** ScrollableBox and ScrollableText are deprecated
- **Alternative:** Use Box with `scrollable: true`
- **Status:** Still works for compatibility
- **V1.x Action:** Keep working, add deprecation warning
- **V2.x Action:** May remove

### 17. Layout Chicken-and-Egg Problem

**Issue:** Layout widget requires explicit width/height
- **Root Cause:** Cannot calculate dimensions before positioning children
- **Workaround:** Always provide width/height to Layout
- **V1.x Action:** Document requirement clearly
- **V2.x Action:** May improve with better algorithm

---

## Rendering & Performance Issues

### 18. smartCSR Flickering

**Issue:** `smartCSR` option causes flickering on non-full-width elements
- **Root Cause:** Optimization applied too broadly
- **Workaround:** Use `fastCSR` or disable CSR optimization
- **V1.x Action:** Document trade-off
- **V2.x Action:** Better heuristics

### 19. Rendering Optimization Artifacts

**Issue:** Various XXX comments about rendering optimizations
- **Locations:** Multiple in lib/widgets/scrollablebox.js
- **Status:** Edge cases in scroll optimization
- **V1.x Action:** Preserve behavior, improve tests
- **V2.x Action:** Refactor rendering engine

---

## Dependencies & External Tools

### 20. w3m Image Display

**Issue:** OverlayImage requires w3mimgdisplay binary
- **Platform:** Unix-like systems only
- **Fallback:** Can use ANSI image mode
- **V1.x Action:** Improve detection, better error messages

### 21. libcaca for Video

**Issue:** Video widget requires mplayer/mpv with libcaca
- **Platform:** Specific setup required
- **Status:** Optional advanced feature
- **V1.x Action:** Document requirements

---

## Documentation Issues

### 22. Unclear coords Object

**Issue:** Coordinate system (`coords`, `lpos`) not well documented
- **Properties:** `xi`, `xl`, `yi`, `yl` meanings unclear
- **V1.x Action:** Comprehensive documentation in API_REFERENCE.md

### 23. Missing Event Documentation

**Issue:** Not all events are documented
- **Examples:** Some widget-specific events undocumented
- **V1.x Action:** Complete event catalog in API_REFERENCE.md

---

## Testing Gaps

### 24. Limited Terminal Testing

**Issue:** Not tested across full range of terminals
- **Status:** Terminfo parsing should handle all, but not verified
- **V1.x Action:** Establish terminal compatibility matrix (Phase 0)
- **V1.x Action:** Automated testing in Phase 1

### 25. No Automated Tests

**Issue:** No test suite exists
- **Risk:** Regressions during modernization
- **V1.x Action:** Comprehensive test suite (Phase 1)

---

## Type System Issues (for TypeScript Conversion)

### 26. Implicit Type Coercion

**Issue:** Many functions accept multiple types and coerce
- **Example:** Colors accept strings, numbers, hex
- **V1.x Action:** Types must allow all current patterns
- **V2.x Action:** May tighten types

### 27. Overloaded Methods

**Issue:** Methods with different signatures based on parameters
- **Example:** `setLabel(string)` vs `setLabel(object)`
- **V1.x Action:** Union types in TypeScript
- **V2.x Action:** May split methods

---

## Browser/Browserify Issues

### 28. Browserify Transform

**Issue:** Has browserify transform, but blessed is terminal-focused
- **Location:** browser/transform.js
- **Status:** Unclear if used/tested
- **V1.x Action:** Preserve, document status
- **V2.x Action:** May remove if unused

---

## Summary by Priority

### Phase 0 (Documentation)
- Document all known issues ✅ (this document)
- Create terminal compatibility matrix (Task 0.7)

### Phase 1 (Testing)
- Write tests exposing/preventing regressions for all issues
- Test across terminal compatibility matrix

### Phase 2-3 (Modernization)
- Fix MUST FIX issues
- Fix SHOULD FIX issues where safe
- Preserve WON'T FIX issues for v1.x
- Add deprecation warnings where appropriate

### Phase 4 (Performance)
- Address rendering artifacts
- Improve CSR heuristics
- Optimize hot paths

### Phase 5 (Release)
- Document all known limitations
- Migration guide from original blessed

### v2.x+ (Future)
- Fix WON'T FIX issues with breaking changes
- API consistency improvements
- Remove deprecated features

---

**Last Updated:** Phase 0, blessed v0.1.82 fork
**Source:** Code comments, README, community knowledge