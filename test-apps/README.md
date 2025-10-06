# Testing Blessed Locally

This directory contains test applications for validating the blessed build before publishing.

## Prerequisites

```bash
# From blessed root directory
# 1. Build the project first
pnpm run build

# 2. Link blessed globally
pnpm link --global
```

## Testing Method 1: Test Apps with pnpm link

### Test CommonJS Build

```bash
cd test-apps/test-cjs
pnpm link --global blessed
pnpm start
```

**Expected**: Blue box with "✅ CommonJS Build Works!" - Press `q` to quit.

### Test ESM Build

```bash
cd test-apps/test-esm
pnpm link --global blessed
pnpm start
```

**Expected**: Green box with "✅ ESM Build Works!" - Press `q` to quit.

## Testing Method 2: Existing Examples

Test backward compatibility with existing examples:

```bash
# From blessed root (after pnpm link --global)
node example/simple-form.js    # Submit/cancel buttons
node example/widget.js          # Centered box demo
node example/time.js            # Clock display
```

**Expected**: All examples run without errors.

## Testing Method 3: Direct Build Test (No link)

Test the built files directly without linking:

```bash
# From blessed root
node -e "const b = require('./lib/blessed.js'); console.log('✅ Source works')"
node -e "const b = require('./dist/blessed.js'); console.log('✅ CJS build works')"
node --input-type=module -e "import b from './dist/blessed.mjs'; console.log('✅ ESM build works')"
```

## What Gets Tested

### test-cjs/
- ✅ CommonJS (`require()`) works
- ✅ Uses linked blessed package → `dist/blessed.js` (CJS build)
- ✅ Package loads and initializes
- ✅ Basic widget rendering

### test-esm/
- ✅ ESM (`import`) works
- ✅ Uses linked blessed package → `dist/blessed.mjs` (ESM build)
- ✅ Package loads and initializes
- ✅ Basic widget rendering

## Complete Testing Checklist

- [ ] Build succeeds: `pnpm run build`
- [ ] All tests pass: `pnpm test`
- [ ] Link works: `pnpm link --global`
- [ ] CJS test app works: `cd test-apps/test-cjs && pnpm link blessed && pnpm start`
- [ ] ESM test app works: `cd test-apps/test-esm && pnpm link blessed && pnpm start`
- [ ] Existing examples work: `node example/simple-form.js`
- [ ] Direct CJS import works: `node -e "require('./dist/blessed.js')"`
- [ ] Direct ESM import works: `node --input-type=module -e "import './dist/blessed.mjs'"`

## Troubleshooting

### "Cannot find module 'blessed'"
**Solution**: Run `pnpm link --global` from the blessed root directory first.

### "Error: Cannot find module 'term.js'"
**Expected behavior** - term.js is an optional dependency. The test apps don't use the Terminal widget, so this is fine.

### Build files missing
**Solution**: Run `pnpm run build` from the blessed root to generate dist/ output.

### Examples fail to load
**Solution**: Make sure you ran `pnpm link --global` from the blessed root so examples can find the 'blessed' module.

## Clean Up

```bash
# Unlink blessed when done testing
pnpm unlink --global blessed

# Or from test apps:
cd test-cjs && pnpm unlink blessed
cd test-esm && pnpm unlink blessed
```

## What's Next

Once all tests pass:
1. ✅ CommonJS build works
2. ✅ ESM build works
3. ✅ Existing examples work
4. ✅ Both source and built outputs functional
5. Ready to publish or continue development!