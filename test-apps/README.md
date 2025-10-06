# Testing Blessed Locally

This directory contains test applications for validating the blessed build before publishing.

## Prerequisites

```bash
# From blessed root directory - Build the project first
pnpm run build
```

## Quick Test (Recommended)

The test apps use relative paths - no linking required!

### Test CommonJS Build

```bash
cd test-apps/test-cjs
node index.js
```

**Expected**: Blue box with "✅ CommonJS Build Works!" - Press `q` to quit.

### Test ESM Build

```bash
cd test-apps/test-esm
node index.mjs
```

**Expected**: Green box with "✅ ESM Build Works!" - Press `q` to quit.

## Testing Method 1: Direct Build Testing (Simplest)

Test the built files work correctly:

```bash
# From blessed root
node -e "const b = require('./lib/blessed.js'); console.log('✅ Source works')"
node -e "const b = require('./dist/blessed.js'); console.log('✅ CJS build works')"
node --input-type=module -e "import b from './dist/blessed.mjs'; console.log('✅ ESM build works')"
```

## Testing Method 2: Test Apps (Interactive)

```bash
# Test CJS
cd test-apps/test-cjs && node index.js

# Test ESM
cd test-apps/test-esm && node index.mjs
```

## Testing Method 3: Existing Examples (Backward Compatibility)

Verify existing examples still work with the source:

```bash
# From blessed root
node example/simple-form.js    # Submit/cancel buttons (press q to quit)
node example/widget.js          # Centered box demo (press q to quit)
```

**Note**: Examples use `require('blessed')` which loads from `lib/blessed.js` (source).

## Testing Method 4: Using pnpm link (Optional - Most Realistic)

This simulates a real npm install scenario:

```bash
# 1. From blessed root - link blessed globally
pnpm link --global

# 2. Create a test project elsewhere
mkdir ~/tmp/test-blessed-install
cd ~/tmp/test-blessed-install
npm init -y

# 3. Link to your local blessed
pnpm link --global blessed

# 4. Test it
node -e "const b = require('blessed'); console.log('Works!');"
```

## What Gets Tested

### test-cjs/
- ✅ CommonJS (`require()`) works
- ✅ Uses `dist/blessed.js` (CJS build)
- ✅ Package loads and initializes
- ✅ Basic widget rendering (blue box)

### test-esm/
- ✅ ESM (`import`) works
- ✅ Uses `dist/blessed.mjs` (ESM build)
- ✅ Package loads and initializes
- ✅ Basic widget rendering (green box)

## Complete Testing Checklist

- [ ] Build succeeds: `pnpm run build`
- [ ] All tests pass: `pnpm test` (1,577 tests)
- [ ] Source loads: `node -e "require('./lib/blessed')"`
- [ ] CJS build loads: `node -e "require('./dist/blessed.js')"`
- [ ] ESM build loads: `node --input-type=module -e "import './dist/blessed.mjs'"`
- [ ] CJS test app works: `cd test-apps/test-cjs && node index.js`
- [ ] ESM test app works: `cd test-apps/test-esm && node index.mjs`
- [ ] Existing examples work: `node example/simple-form.js`

## Troubleshooting

### "Error: Cannot find module 'term.js'"
**Expected behavior** - term.js is an optional dependency. The test apps don't use the Terminal widget.

### Build files missing
**Solution**: Run `pnpm run build` from the blessed root to generate dist/ output.

### pnpm link errors
**Solution**: Use the direct path approach (Method 1 or 2) instead of pnpm link.

## What's Next

Once all tests pass:
1. ✅ CommonJS build works
2. ✅ ESM build works
3. ✅ Existing examples work
4. ✅ Both source and built outputs functional
5. Ready to publish or continue development!