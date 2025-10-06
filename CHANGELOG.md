# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-alpha.2] - 2025-10-06

### 🎯 Phase 3.1: Helper Modules Converted to TypeScript

**Milestone:** All utility/helper modules are now in TypeScript with full type annotations.

### Changed

- **TypeScript Conversion** - Converted 4 helper modules from JavaScript to TypeScript:
  - `lib/helpers.ts` - 166 lines with utility functions (merge, sort, escape, tag parsing)
  - `lib/colors.ts` - 531 lines with color matching and conversion (RGB, hex, xterm colors)
  - `lib/unicode.ts` - 790 lines with wide character and surrogate pair handling
  - `lib/keys.ts` - 342 lines with keypress event handling
- **Type Safety** - Added comprehensive type annotations:
  - Function signatures with parameter and return types
  - Interfaces for complex data structures (RGB, ColorNames, etc.)
  - Type aliases for clarity (HexColor, ColorIndex, etc.)
- **Modern Syntax** - Modernized all helper modules:
  - `var` → `const`/`let`
  - Function expressions → arrow functions
  - CommonJS → ES6 imports/exports
- **Migration Strategy** - Created CommonJS shims (helpers.js, colors.js, unicode.js, keys.js) for gradual migration
  - JavaScript files can still `require()` helper modules
  - Shims will be removed once all files are TypeScript

### Testing

- **All 1,577 tests passing** - Zero regressions from TypeScript conversion
- **Type checking enabled** - `npm run type-check` validates TypeScript compilation

### Technical Details

- Vitest configuration updated to resolve `.ts` extensions and process all deps through esbuild
- Fixed dynamic require issues with proper module exports
- Maintained 100% backward compatibility with existing JavaScript code

---

## [1.0.0-alpha.1] - 2025-10-06

### 🎉 Announcement

**blessed 1.0.0-alpha is here!** After 10 years since the last update, blessed is getting the production-ready 1.0 release it deserves. This marks the beginning of a comprehensive modernization effort while maintaining the core API and backward compatibility.

### Added

- **TypeScript support** - tsconfig.json with allowJs for gradual migration to TypeScript
- **Modern build system** - tsup configured for dual CJS/ESM outputs
- **Comprehensive testing** - Vitest setup with 50.78% code coverage (1,576 tests passing)
  - Testing infrastructure with mock utilities
  - 31 widget test files
  - Core component tests (Node, Element, Screen)
  - Integration tests from examples
- **Code quality tools**
  - ESLint with TypeScript support
  - Prettier for consistent formatting
  - Pre-configured scripts for linting and formatting
- **Developer documentation**
  - AGENTS.md - Complete modernization roadmap with integrated Phase 0 decisions, known issues, and terminal compatibility
  - docs/CONTRIBUTING.md - Developer setup and guidelines
  - TERMINAL_COMPATIBILITY.md - Terminal support matrix (now in AGENTS.md Section 8)
  - KNOWN_ISSUES.md - Cataloged bugs and limitations (now in AGENTS.md Section 7)
  - API_REFERENCE.md - Complete API baseline documentation
- **Performance benchmarking infrastructure** - 12 benchmarks covering rendering, layout, events, and scalability
- **Local testing infrastructure** - Test apps for CJS and ESM compatibility validation
- **Publishing documentation** - docs/PUBLISHING.md with npm publishing guide and browserify details
- **Strategic planning** - docs/STRATEGIC_PLAN.md with comprehensive roadmap and adoption strategy

### Changed

- **Package name** - Now published as `@vdeantoni/blessed` (scoped package)
- **Node.js requirement** - Updated to >= 22.0.0 (will be reconsidered in future releases)
- **Repository** - Moved to github.com/vdeantoni/blessed

### Fixed

- Improved .npmignore to exclude test files, coverage reports, and development tooling from npm package

### Known Issues

- **Dynamic requires** - lib/widget.js:48 uses dynamic requires that prevent modern bundling
  - Workaround: Use source files (lib/blessed.js) as entry point
  - Resolution: Will be fixed in Phase 3 TypeScript conversion
- **dist/ outputs** - Built outputs don't work yet due to dynamic requires
- **Some widgets untested** - Terminal, Video, OverlayImage widgets require external dependencies

### Modernization Progress

- ✅ **Phase 0**: Analysis & Critical Decisions - Complete
- ✅ **Phase 1**: Testing Infrastructure & Baseline Metrics - 95% Complete
  - Testing infrastructure complete
  - 50.78% code coverage achieved
  - Benchmark infrastructure complete (baseline measurements pending)
- ✅ **Phase 2**: Build System & Development Experience - Complete
- 🚧 **Phase 3**: TypeScript Conversion - Starting next
- 📋 **Phase 4**: Performance Optimization - Planned
- 📋 **Phase 5**: Polish & Release v1.0.0 - Planned

### Installation

```bash
# Install the latest alpha
npm install @vdeantoni/blessed@alpha

# Install specific version
npm install @vdeantoni/blessed@1.0.0-alpha.1
```

### Credits

This is a modernization of the original blessed library created by Christopher Jeffrey. The original blessed library was last updated in 2015 and has been unmaintained for 10 years. This fork aims to continue the legacy with modern tooling, TypeScript support, and comprehensive testing while maintaining backward compatibility.

---

## Historical Changelog (Original blessed by Christopher Jeffrey)

# Blessed v0.1.0 - new terminal goodies for node.js

![blessed](https://raw.githubusercontent.com/chjj/blessed/master/img/v0.1.0-3.gif)

The features demonstrated in the above gif __element transparency/shadow__ and
__border docking__.

## New useful options for your typewriter application:

- __`transparent` option__ - Lower element opacity to 50%. This will display
  dimmed elements and content behind the foreground element using a naive color
  blending function (good enough for a terminal's limited amount of colors).
  works best with 256color terminals. (see widget-shadow.js)

- __`shadow` option__ - Give the element a translucent shadow. Automatically
  darkens the background behind it. (see widget-shadow.js)

- __`dockBorders` option__ - Element borders will automatically "dock" to each
  other. Instead of overlapping the borders end up connecting. (see
  widget-dock.js)

- __`autoPadding` default__ - Auto padding is now enabled by default, meaning
  blessed will automatically position elements inside their parent's border.

- __`rleft` property__ - Relative offsets are now default element properties
  (`left` instead of `rleft`).

- __`draggable` property__ - Make any element draggable with the mouse. (see
  widget-shadow.js or widget-dock.js)

- __`Table` and `ListTable` elements__ - Tables with a high quality rendering.
  (see widget-table.js and widget-listtable.js)

- __`Log` element__ - A top to bottom logger box with scrollback and other
  features. (see widget-log.js)

- __Obscurable borders__ - In addition to docking borders, it's possible to
  obscure borders by sliding them off the screen with negative offsets. (see
  widget-dock.js)

- __Percentage expressions__ - Like CSS, arithmetic can now be performed on
  percentages. e.g. `width: '50%-1'`. This is useful for overlapping borders on
  elements with a percentage width. (see widget-dock.js)

## Other features that weren't mentioned before:

- __`setHover` option__ - Set a hover text box to follow cursor on mouseover,
  similar to how a web browser handles the "title" attribute. (see widget.js)

- __`Terminal` element__ - Spin up a pseudo terminal as a blessed element.
  useful for writing a terminal multiplexer. (requires term.js and pty.js as
  optional dependencies). (see example/multiplex.js)

- __`Image` element__ - Uses `w3mimgdisplay` to draw real images your terminal.
  this is much easier than calling w3mimgdisplay by hand. Image elements behave
  like any other element, although it is wise to use `width: 'shrink', height:
  'shrink'`. (see widget-image.js)

---

The major things that justified the 0.1.0 release were fixes and stabilization
of api (`autoPadding`/`rleft`/`left`). Scrolling boxes were almost completely
revamped to work a bit smarter.

---

## Things yet to come:

- __@secrettriangle's [improvements](https://github.com/slap-editor/slap) for
  textareas__ - This allows for real text navigation.

- __Gravity and margin layouts__

This is something that's been in the idea bin for a while. Every element could
potentially have properties like:

```
  gravity: 'bottomleft',
  margin: 5,
``

In other words, just a more complex `float` system than what the CSSOM is used
to.
