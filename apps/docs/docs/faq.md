---
sidebar_position: 5
---

# FAQ

Frequently asked questions about unblessed.

## General

### What is unblessed?

unblessed is a modern, TypeScript-first terminal UI library for building interactive command-line applications. It's built on top of the original blessed library but reimagined for modern development with cross-platform support (Node.js and browsers).

### Is unblessed compatible with blessed?

Yes! The `@unblessed/blessed` package provides 100% backward compatibility with blessed. You can drop it in as a replacement and your existing code should work without changes. See the [Migration Guide](/docs/getting-started/migration-from-blessed).

### Why choose unblessed over blessed?

- ✅ **TypeScript**: Full type safety and IDE autocomplete
- ✅ **Browser Support**: Run terminal UIs in browsers with XTerm.js
- ✅ **Modern Build**: ESM + CJS, tree-shakeable, actively maintained
- ✅ **Better DX**: Improved error messages, comprehensive tests, great docs
- ✅ **Platform Agnostic**: Runtime dependency injection allows portability

### Why is it called "unblessed"?

The name reflects that while it's based on blessed, it's been "unblessed" of the legacy patterns and reimagined for modern JavaScript/TypeScript development. It's a fork that has evolved into its own identity.

## Installation & Setup

### What Node.js version do I need?

unblessed requires **Node.js >= 22.0.0**. This is due to modern JavaScript features used throughout the codebase.

### Which package should I install?

It depends on your use case:

- **`@unblessed/node`** - For new Node.js projects (recommended)
- **`@unblessed/browser`** - For browser-based terminal UIs
- **`@unblessed/blessed`** - For migrating from blessed
- **`@unblessed/core`** - Only if building custom runtime adapters

### Do I need to install types separately?

No! All packages include TypeScript definitions. There's no need for separate `@types/*` packages.

### Can I use unblessed with JavaScript (not TypeScript)?

Absolutely! unblessed works perfectly with plain JavaScript. TypeScript definitions are included for those who want them, but they're completely optional.

## Development

### Do I need to initialize the runtime?

No! The runtime auto-initializes when you import from `@unblessed/node` or `@unblessed/browser`. Just import and use:

```typescript
import { Screen, Box } from "@unblessed/node";
// Runtime is ready - no setup needed
const screen = new Screen();
```

### Why is my terminal messed up after my app crashes?

When an app crashes, the terminal might stay in alternate buffer mode or have the cursor hidden. Add cleanup handlers:

```typescript
screen.key(["C-c"], () => {
  screen.destroy();
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  screen.destroy();
  console.error(err);
  process.exit(1);
});
```

### How do I debug rendering issues?

Enable debug mode:

```typescript
const screen = new Screen({
  debug: true,
  log: "./debug.log",
});
```

This logs all rendering operations to help diagnose issues.

### Can I use unblessed with tsx or ts-node?

Yes! unblessed works with all TypeScript runners:

```bash
# tsx (recommended)
tsx app.ts

# ts-node
ts-node app.ts

# esbuild
node --loader esbuild-register app.ts
```

## Browser Support

### Can I really run terminal UIs in browsers?

Yes! The `@unblessed/browser` package uses XTerm.js to create a terminal emulator in the browser. Your unblessed widgets render inside it just like in a real terminal.

### What doesn't work in browsers?

- **Real file system**: Virtual FS with bundled data only
- **Child processes**: Terminal widget won't work
- **Native TTY**: Always reports as TTY in browsers

See [Browser Platform Guide](/docs/platforms/browser) for details.

### Do I need Vite to use unblessed in browsers?

No, but Vite is recommended. unblessed works with any modern bundler (Webpack, Rollup, esbuild). See the [Browser Guide](/docs/platforms/browser) for bundler configuration.

## Widgets & Features

### How do I create a widget?

Use the `parent` option to attach widgets:

```typescript
const box = new Box({
  parent: screen, // Required
  content: "Hello",
  border: { type: "line" },
});
```

### Why isn't my widget showing?

Common issues:

1. **Forgot to call `screen.render()`**:

   ```typescript
   screen.render(); // Must call this!
   ```

2. **Widget is off-screen**: Check positioning

   ```typescript
   // ❌ Bad - might be off screen
   box.top = 1000;

   // ✅ Good
   box.top = "center";
   ```

3. **No parent**: Widget must be attached
   ```typescript
   // ✅ Always specify parent
   const box = new Box({ parent: screen });
   ```

### How do I handle keyboard input?

Global keys:

```typescript
screen.key(["C-c", "q"], () => process.exit(0));
```

Widget-specific keys:

```typescript
list.key("enter", () => {
  const selected = list.selected;
  // Handle selection
});
```

### How do I handle mouse events?

Enable mouse on the widget:

```typescript
const box = new Box({
  parent: screen,
  mouse: true, // Enable mouse
  clickable: true,
});

box.on("click", (data) => {
  console.log("Clicked at", data.x, data.y);
});
```

### How do I style widgets?

Use the `style` object:

```typescript
const box = new Box({
  style: {
    fg: "white",
    bg: "blue",
    border: { fg: "cyan" },
    focus: { border: { fg: "green" } },
    hover: { bg: "gray" },
  },
});
```

Or use inline tags:

```typescript
const box = new Box({
  content: "{red-fg}Error:{/red-fg} Something went wrong",
  tags: true, // Enable tag parsing
});
```

### What colors are supported?

- **Named colors**: `'red'`, `'blue'`, `'green'`, etc.
- **Hex colors**: `'#ff0000'`, `'#00ff00'`
- **256-color**: `196` (color index)
- **Default**: `'default'` or `-1`

## Testing

### How do I test terminal UIs?

Use the `@unblessed/vrt` package for visual regression testing:

```typescript
import { compareWithGolden } from "@unblessed/vrt";

it("renders correctly", () => {
  const screen = new Screen();
  const box = new Box({ parent: screen, content: "Test" });
  screen.render();

  const recording = createRecording(screen);
  const result = compareWithGolden("golden.vrt.json", recording);

  expect(result.pass).toBe(true);
  screen.destroy();
});
```

See the [Testing Guide](/docs/advanced/testing) for details.

### Can I use Jest with unblessed?

Yes! unblessed works with Jest, Vitest, and other test frameworks. For Jest, you may need to configure ESM support:

```javascript
// jest.config.js
export default {
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
};
```

## Performance

### Is unblessed fast?

Yes! Performance benchmarks on modern hardware:

- Empty screen render: ~6.5ms
- Complex screen (100 boxes): ~11ms
- Large list (1K items): ~187ms

Use `smartCSR: true` for optimal performance.

### How do I optimize rendering?

1. **Enable smart CSR**:

   ```typescript
   const screen = new Screen({ smartCSR: true });
   ```

2. **Batch updates**:

   ```typescript
   // ❌ Bad - renders 3 times
   box1.setContent("One");
   screen.render();
   box2.setContent("Two");
   screen.render();
   box3.setContent("Three");
   screen.render();

   // ✅ Good - renders once
   box1.setContent("One");
   box2.setContent("Two");
   box3.setContent("Three");
   screen.render();
   ```

3. **Use alwaysScroll: false** when not needed

See [Performance Guide](/docs/advanced/performance) for more tips.

## Troubleshooting

### My colors aren't showing correctly

Check your terminal's color support:

```bash
echo $TERM
# Should be something like "xterm-256color"
```

Set it if needed:

```bash
export TERM=xterm-256color
```

### Mouse events aren't working

1. **Check terminal support**: Not all terminals support mouse
2. **Enable mouse on widget**:
   ```typescript
   const box = new Box({ mouse: true });
   ```
3. **Check terminal multiplexers**: tmux/screen need configuration

### Unicode characters aren't rendering

Enable full unicode support:

```typescript
const screen = new Screen({
  fullUnicode: true,
});
```

### Application hangs on exit

Make sure to call `screen.destroy()`:

```typescript
screen.key(["C-c"], () => {
  screen.destroy(); // Important!
  process.exit(0);
});
```

## Contributing

### How can I contribute?

We welcome contributions! Ways to help:

- 🐛 Report bugs via [GitHub Issues](https://github.com/vdeantoni/unblessed/issues)
- 💡 Suggest features via [GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)
- 📖 Improve documentation
- 🧪 Add tests
- ⚡ Submit pull requests

Check the [repository](https://github.com/vdeantoni/unblessed) for contribution guidelines.

### I found a bug, what should I include?

Please include:

- unblessed version (`npm list @unblessed/node`)
- Node.js version (`node --version`)
- Terminal emulator and OS
- Minimal code to reproduce
- Expected vs actual behavior
- Screenshots if relevant

### Can I use unblessed in commercial projects?

Yes! unblessed is MIT licensed - use it freely in commercial and open-source projects.

## Project Status

### Is unblessed production-ready?

unblessed is currently in **alpha**. The API is stable and backward-compatible with blessed, but:

- ✅ Core functionality is solid (2,112 tests passing)
- ✅ Safe for non-critical applications
- ⚠️ API may have minor changes before 1.0
- ⚠️ Some edge cases may not be covered

We welcome alpha testers to help us reach 1.0!

### What's the roadmap?

Current priorities:

1. **Alpha**: API stabilization, bug fixes, documentation
2. **Beta**: Performance optimization, more examples
3. **1.0**: Production-ready release

See [GitHub Milestones](https://github.com/vdeantoni/unblessed/milestones) for details.

### How often is unblessed updated?

We follow semantic versioning with automated releases:

- **Patch releases** (bug fixes): As needed
- **Minor releases** (features): Monthly
- **Major releases** (breaking changes): Rare, planned ahead

## Getting Help

### Where can I get help?

- **📖 Documentation**: Start here - most questions are answered in the docs
- **💬 GitHub Discussions**: Ask questions, share ideas
- **🐛 GitHub Issues**: Report bugs, request features
- **📧 Direct Contact**: For security issues only

### The docs don't answer my question

We're always improving! Please:

1. Ask in [GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)
2. Suggest doc improvements via issues
3. Submit a PR to improve documentation

## Still Have Questions?

If your question isn't answered here:

- **[Browse the Documentation](/docs/getting-started/introduction)** - Comprehensive guides
- **[Ask on GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)** - Community help
- **[Check the API Reference](/docs/api/generated/widgets.screen.Class.Screen)** - Detailed API docs
- **[Report an Issue](https://github.com/vdeantoni/unblessed/issues)** - Found a bug?
