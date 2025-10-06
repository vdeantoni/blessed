# Publishing & Build Process Documentation

## Historical Context: Browserify

### What Browserify Did

Blessed originally used **browserify** to create browser-compatible bundles. The browserify transform (`browser/transform.js`) solved two critical problems:

#### 1. Dynamic Widget Loading (lib/widget.js:48)

**Problem:** `lib/widget.js` uses dynamic requires that bundlers can't statically analyze:
```javascript
require('./widgets/' + file);  // Dynamic string concatenation
```

**Solution:** The browserify transform generated explicit require statements for all widgets:
```javascript
// Transform automatically generated this:
require('./widgets/box');
require('./widgets/text');
require('./widgets/list');
// ... for all widgets
```

#### 2. Terminal Info/Capabilities (lib/tput.js)

**Problem:** `lib/tput.js` reads terminfo/termcap files from the filesystem, which doesn't work in browsers.

**Solution:** The transform inlined xterm-256color terminfo data directly into the code:
```javascript
// Embedded base64-encoded terminfo data
Tput._infoBuffer = new Buffer(TERMINFO_BASE64, 'base64');
// Removed filesystem access, used hardcoded data
```

### Browserify Build Process

```bash
# From browser/Makefile
browserify -e index.js -o browser/blessed.js
```

**Transform configuration in package.json:**
```json
{
  "browserify": {
    "transform": ["./browser/transform.js"]
  }
}
```

The transform is **still present** in the codebase at:
- `browser/transform.js` - The transform code
- `browser/Makefile` - Build script
- `package.json` - browserify config

---

## Current Build System: tsup

### What We Have Now

**Phase 2 (completed)** introduced modern build tooling:
- **TypeScript** (tsconfig.json with allowJs)
- **tsup** for building CJS/ESM outputs
- **ESLint** + **Prettier** for code quality
- Build scripts: `npm run build`, `npm run build:watch`

### Current Problem: Dynamic Requires Still Exist

The **same problem** that browserify solved still exists:
```javascript
// lib/widget.js:48
require('./widgets/' + file);  // Can't be bundled!
```

**Current workaround:** Use source files (lib/blessed.js) directly instead of bundled dist/ outputs.

**Resolution path:** Phase 3 (TypeScript conversion) will replace dynamic requires with static imports.

---

## NPM Publishing Requirements

### Current Issues with npm Package

Running `npm pack --dry-run` reveals the package includes unnecessary files:

#### ❌ Should NOT be published:
- `__tests__/` - Test files (~500KB)
- `coverage/` - Coverage reports (~3MB)
- `.claude/` - Local settings
- `.idea/` - IDE config
- `benchmarks/` - Performance tests
- `test-apps/` - Local test apps
- `.vitest/` - Test cache
- `*.tsbuildinfo` - TypeScript build cache

#### ✅ Should be published:
- `lib/` - **Source files** (currently main entry point)
- `dist/` - **Built files** (currently broken due to dynamic requires)
- `browser/` - Browserify transform (for backward compatibility)
- `usr/` - Terminfo/termcap data
- `example/` - Examples (optional, but useful)
- `bin/` - CLI tools (tput.js)
- `package.json`, `README.md`, `LICENSE`

### Current .npmignore (OUTDATED)

```
.git*
test/
img/
node_modules/
.jshintrc
.jscsrc
```

**Problems:**
- Only ignores old directories (test/ was renamed to __tests__/)
- Doesn't ignore coverage/, benchmarks/, test-apps/
- Doesn't ignore modern config files (.vitest/, *.tsbuildinfo)

### Recommended .npmignore

```
# Version control
.git*
.github/

# Testing
__tests__/
test/
test-apps/
coverage/
.vitest/
*.tsbuildinfo

# Benchmarks
benchmarks/

# IDE & Editor
.idea/
.vscode/
*.swp
*.swo
.DS_Store

# Local settings
.claude/

# Config files not needed in package
.eslintrc.js
.eslintignore
.prettierrc
.prettierignore
tsconfig.json
tsup.config.ts
vitest.config.js

# Documentation (optional - keep if useful)
AGENTS.md
BASELINE.md
CONTRIBUTING.md

# Build artifacts that shouldn't be published
# (but DO publish dist/ once it works!)
```

### Current package.json Configuration

```json
{
  "name": "blessed",
  "version": "0.1.82",
  "main": "./lib/blessed.js",        // Currently source file
  "bin": "./bin/tput.js",
  "engines": {
    "node": ">= 22.0.0"              // ⚠️ Very restrictive!
  },
  "repository": "git://github.com/vdeantoni/blessed.git",
  "browserify": {
    "transform": ["./browser/transform.js"]  // Still configured
  }
}
```

### Issues for Publishing

#### 1. Entry Point Strategy

**Current:** `"main": "./lib/blessed.js"` (source file)

**Options for future:**

**Option A - Source only (current):**
```json
{
  "main": "./lib/blessed.js"
}
```
- ✅ Works now
- ❌ No tree-shaking
- ❌ No ESM support

**Option B - Built files (after Phase 3):**
```json
{
  "main": "./dist/blessed.js",      // CJS
  "module": "./dist/blessed.mjs",   // ESM
  "types": "./dist/blessed.d.ts",   // TypeScript
  "exports": {
    ".": {
      "import": "./dist/blessed.mjs",
      "require": "./dist/blessed.js",
      "types": "./dist/blessed.d.ts"
    }
  }
}
```
- ✅ Modern, supports tree-shaking
- ✅ Dual CJS/ESM support
- ❌ Requires fixing dynamic requires first

#### 2. Node.js Version Requirement

**Current:** `">= 22.0.0"` - Very restrictive!

**Recommendation:**
- `">= 18.0.0"` - Minimum for modern features
- `">= 16.0.0"` - If broader compatibility needed
- `">= 14.0.0"` - Maximum backward compatibility (EOL)

#### 3. Package Scope

**Current:** Published as `blessed` (assuming you have npm ownership)

**Alternative:** Publish as scoped package `@vdeantoni/blessed` if:
- Original `blessed` package is owned by someone else
- You want to maintain a separate fork
- You want to avoid naming conflicts

---

## Publishing Checklist

### Before Publishing to npm:

1. **Update .npmignore**
   - [ ] Exclude test files, coverage, benchmarks
   - [ ] Include lib/, browser/, usr/
   - [ ] Exclude IDE and config files

2. **Verify package contents**
   ```bash
   npm pack --dry-run
   # Review the list carefully!
   ```

3. **Test the package locally**
   ```bash
   npm pack
   cd /tmp/test-blessed
   npm install /path/to/blessed-0.1.82.tgz
   node -e "const blessed = require('blessed'); console.log('OK')"
   ```

4. **Update package.json metadata**
   - [ ] Correct version number
   - [ ] Update repository URL
   - [ ] Set appropriate Node.js engine requirement
   - [ ] Add keywords for discoverability
   - [ ] Verify license

5. **Update README.md**
   - [ ] Installation instructions
   - [ ] Basic usage examples
   - [ ] Link to full documentation
   - [ ] Note about TypeScript support (coming in Phase 3)

6. **Create CHANGELOG.md**
   - [ ] Document all changes from original blessed
   - [ ] List known issues (dynamic requires, bundling)
   - [ ] Migration guide if breaking changes

7. **Run tests**
   ```bash
   npm test
   npm run test:coverage  # Verify coverage
   ```

8. **Check npm authentication**
   ```bash
   npm whoami
   # Make sure you're logged in
   ```

9. **Publish (dry run first!)**
   ```bash
   npm publish --dry-run
   # Review output carefully

   # Then publish for real:
   npm publish
   # Or for scoped package:
   npm publish --access public
   ```

---

## Current Status & Recommendations

### ✅ Ready for Publishing:
- Tests passing (1,576 tests)
- Source code stable
- Backward compatible
- Browserify transform maintained

### ⚠️ Known Limitations:
- Dynamic requires prevent modern bundling
- dist/ outputs don't work yet
- No native ESM support yet

### 📋 Before Publishing:
1. **Fix .npmignore** (high priority)
2. **Update package.json** metadata
3. **Test package locally** with `npm pack`
4. **Decide on package name** (blessed vs @vdeantoni/blessed)
5. **Set appropriate Node.js version requirement**
6. **Add CHANGELOG.md**

### 🔮 Phase 3 Will Enable:
- Proper bundled dist/ outputs
- Native ESM support
- Tree-shaking
- TypeScript type definitions
- Modern module exports

---

## Quick Reference

### Test package contents:
```bash
npm pack --dry-run
```

### Create package tarball:
```bash
npm pack
# Creates blessed-0.1.82.tgz
```

### Test package installation:
```bash
mkdir /tmp/test-blessed && cd /tmp/test-blessed
npm init -y
npm install /path/to/blessed-0.1.82.tgz
node -e "const blessed = require('blessed'); const screen = blessed.screen(); console.log('Works!');"
```

### Publish to npm:
```bash
npm login
npm publish --dry-run  # Test first!
npm publish            # For real
```

### Update package version:
```bash
npm version patch  # 0.1.82 -> 0.1.83
npm version minor  # 0.1.82 -> 0.2.0
npm version major  # 0.1.82 -> 1.0.0
```

---

## Files Reference

- **Current config:** `package.json` lines 48-52 (browserify config)
- **Browserify transform:** `browser/transform.js`
- **Build config:** `tsup.config.ts`
- **Ignore files:** `.gitignore`, `.npmignore`
- **Entry point:** `lib/blessed.js`
- **Dynamic require issue:** `lib/widget.js:48`