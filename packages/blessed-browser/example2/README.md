# blessed-browser - No Bundler Example

This example demonstrates that `@vdeantoni/blessed-browser` works **without any build tools or bundlers**.

## What This Shows

- ✅ Zero configuration required
- ✅ No build step needed
- ✅ No package.json or dependencies
- ✅ Just plain HTML + ESM imports
- ✅ Works with any static file server

## Running This Example

**No parent directory needed!** This example is fully self-contained and can be served directly from the `example2/` directory.

### Option 1: Python HTTP Server

```bash
python3 -m http.server 8080
```

Then open: http://localhost:8080/index.html

### Option 2: Node.js http-server

```bash
npx http-server -p 8080
```

Then open: http://localhost:8080/index.html

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How It Works

The example loads:
1. **xterm.js** from CDN (terminal emulator)
2. **blessed-browser.global.js** - Symlinked from `../dist/` (for local development)
3. Everything auto-initializes via the global `BlessedBrowser` object

No imports, no modules, just a script tag!

## In Production

Once `@vdeantoni/blessed-browser` is published to npm, you can load it directly from a CDN:

### Option 1: unpkg

```html
<script src="https://unpkg.com/@vdeantoni/blessed-browser/dist/blessed-browser.global.js"></script>
<script type="module">
  const { createXTermScreen, blessed } = window.BlessedBrowser;
  // Use it!
</script>
```

### Option 2: jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@vdeantoni/blessed-browser/dist/blessed-browser.global.js"></script>
<script type="module">
  const { createXTermScreen, blessed } = window.BlessedBrowser;
  // Use it!
</script>
```

### Option 3: Copy to Your Project

Download the IIFE bundle and serve it from your own server:

```html
<script src="/vendor/blessed-browser.global.js"></script>
```

All three approaches work with **zero configuration**!
