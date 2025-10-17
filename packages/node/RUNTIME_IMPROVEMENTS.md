# Runtime Initialization Improvements

## Summary

I've improved the runtime initialization experience for @tui/node to make it as easy as possible for users. The runtime is now **automatically initialized** when you import from the package - no setup required!

## Key Changes

### 1. Automatic Runtime Initialization

The runtime is now automatically initialized at module import time:

```typescript
// packages/node/src/index.ts

// Automatically initialize runtime when this module is imported
// This makes the package work out of the box without any setup
getNodeRuntime();
```

This means users can start coding immediately:

```typescript
// ✅ Just import and use - runtime auto-initializes
import { Screen, Box } from '@tui/node';

const screen = new Screen();
const box = new Box({ screen, content: 'Hello!' });
screen.render();
```

### 2. Smart Initialization Logic

Added `isRuntimeInitialized()` helper to prevent double-initialization:

```typescript
function isRuntimeInitialized(): boolean {
  try {
    getCoreRuntime();
    return true;
  } catch {
    return false;
  }
}

export function getNodeRuntime(): NodeRuntime {
  if (!nodeRuntime) {
    nodeRuntime = new NodeRuntime();

    // Only set if not already initialized (e.g., by tests)
    if (!isRuntimeInitialized()) {
      setRuntime(nodeRuntime);
    }
  }
  return nodeRuntime;
}
```

This ensures:
- Test environments can still override the runtime
- Multiple imports don't cause errors
- The runtime is initialized exactly once

### 3. Multiple Usage Patterns

Users can now use whichever pattern feels most natural:

```typescript
// Pattern 1: Direct widget creation (simplest)
import { Screen, Box } from '@tui/node';
const screen = new Screen();

// Pattern 2: Using createScreen() helper (recommended)
import { createScreen } from '@tui/node';
const screen = createScreen();

// Pattern 3: Manual runtime (for advanced users)
import { getNodeRuntime, Screen } from '@tui/node';
const runtime = getNodeRuntime();
const screen = new Screen();
```

## Examples Created

### hello-world.ts

The simplest possible example - shows a centered box with styled text:

```bash
pnpm example:hello-world
```

**Features:**
- Basic screen creation
- Centered box with styled content
- Keyboard event handling

### interactive.ts

Interactive form with text input, buttons, and list:

```bash
pnpm example:interactive
```

**Features:**
- Text input with focus styling
- Buttons with hover effects
- List widget with scrolling
- Tab navigation

### dashboard.ts

Live-updating dashboard with metrics:

```bash
pnpm example:dashboard
```

**Features:**
- Multi-widget layout
- Progress bars
- Tables
- Auto-updating data

### Documentation

- **examples/README.md**: Complete guide to running and understanding examples
- Updated all examples to show simplest usage pattern

## Benefits

### For End Users

1. **Zero boilerplate** - Just import and use
2. **No runtime initialization code** needed
3. **Works immediately** without reading docs
4. **Multiple patterns** - pick what feels natural

### For Library Maintainers

1. **Backward compatible** - Tests can still override runtime
2. **Safe initialization** - Only sets runtime if not already set
3. **Clear documentation** - Examples show best practices
4. **Easy to debug** - Clear initialization flow

## Migration Guide

### From Manual Initialization

**Before:**
```typescript
import { setRuntime, NodeRuntime, Screen } from '@tui/node';

const runtime = new NodeRuntime();
setRuntime(runtime);

const screen = new Screen();
```

**After:**
```typescript
import { Screen } from '@tui/node';

const screen = new Screen(); // Runtime auto-initialized!
```

### From createScreen()

No changes needed - `createScreen()` still works and is still recommended:

```typescript
import { createScreen } from '@tui/node';

const screen = createScreen(); // Still works!
```

## Testing Impact

Tests are unaffected because:

1. `isRuntimeInitialized()` checks if runtime already exists
2. Test setup can still call `setRuntime()` before importing widgets
3. `getNodeRuntime()` respects existing runtime

**Test flow:**
```typescript
// __tests__/setup.js
setRuntime(createMockRuntime()); // Sets runtime first

// In test file
import { Screen } from '@tui/node'; // getNodeRuntime() sees existing runtime
const screen = new Screen();        // Uses test runtime
```

## Performance

**Zero overhead:**
- Module-level initialization runs once per process
- No lazy initialization overhead
- No runtime checks in hot paths

## Future Enhancements

Potential improvements:

1. **Environment detection** - Auto-configure based on terminal capabilities
2. **Custom runtime factories** - Allow users to customize runtime creation
3. **Runtime plugins** - Extend runtime with additional features
4. **Lazy feature loading** - Load optional features on demand

## Conclusion

The runtime initialization is now **invisible** to users - they can focus on building their TUI apps without worrying about setup. The examples demonstrate that @tui/node is as simple to use as any other UI library while maintaining the flexibility of the runtime abstraction pattern.

This achieves the goal of making the library **as easy as possible** for users while keeping the powerful architecture intact.
