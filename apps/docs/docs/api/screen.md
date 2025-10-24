---
sidebar_position: 1
---

# Screen API

The Screen is the top-level container and rendering engine for terminal UI applications.

## Overview

Screen manages the terminal, handles rendering, processes input, and serves as the root container for all widgets. It provides:

- **Terminal management**: Alt screen buffer, cursor control, raw mode
- **Rendering engine**: Efficient screen updates with smart CSR
- **Input handling**: Keyboard and mouse events
- **Widget container**: Root of the widget tree
- **Focus management**: Tracks and manages widget focus

## Constructor

```typescript
new Screen(options?: ScreenOptions)
```

### Options

```typescript
interface ScreenOptions {
  // === Terminal Configuration ===
  input?: stream.Readable;     // Input stream (default: process.stdin)
  output?: stream.Writable;    // Output stream (default: process.stdout)
  terminal?: string | Terminal;// Terminal type or XTerm instance
  term?: string;               // Alias for terminal

  // === Display Options ===
  title?: string;              // Window title
  fullUnicode?: boolean;       // Enable full Unicode support (default: false)
  forceUnicode?: boolean;      // Force Unicode regardless of terminal
  smartCSR?: boolean;          // Smart change scroll region (default: false)
  fastCSR?: boolean;           // Fast CSR (may have artifacts) (default: false)
  useBCE?: boolean;            // Use back color erase (default: false)

  // === Cursor Options ===
  cursor?: {
    artificial?: boolean;      // Use artificial cursor (default: false)
    shape?: 'block' | 'underline' | 'line'; // Cursor shape
    blink?: boolean;           // Cursor blink (default: false)
    color?: string | number;   // Cursor color
  };
  artificialCursor?: boolean;  // Alternative: enable artificial cursor
  cursorShape?: string;        // Alternative: cursor shape
  cursorBlink?: boolean;       // Alternative: cursor blink
  cursorColor?: string;        // Alternative: cursor color

  // === Input Options ===
  grabKeys?: boolean;          // Grab all keypress events (default: false)
  lockKeys?: boolean;          // Lock key handling (default: false)
  ignoreLocked?: string[];     // Keys to ignore when locked
  sendFocus?: boolean;         // Send focus events (default: false)

  // === Layout Options ===
  autoPadding?: boolean;       // Auto-padding for widgets (default: true)
  tabSize?: number;            // Tab size in spaces (default: 4)
  dockBorders?: boolean;       // Dock adjacent borders (default: false)
  ignoreDockContrast?: boolean;// Ignore border color contrast when docking

  // === Debug Options ===
  debug?: boolean;             // Enable debug mode (default: false)
  dump?: boolean;              // Dump mode for testing (default: false)
  log?: string;                // Log file path
  warnings?: boolean;          // Show warning popups (default: false)

  // === Advanced ===
  resizeTimeout?: number;      // Resize event debounce (default: 300ms)
  program?: Program;           // Use existing Program instance
  tput?: boolean;              // Use terminfo (default: true)
}
```

## Properties

### Dimensions

```typescript
screen.width: number         // Screen width in columns (read-only)
screen.height: number        // Screen height in rows (read-only)
screen.cols: number          // Alias for width (read-only)
screen.rows: number          // Alias for height (read-only)
```

### Terminal

```typescript
screen.title: string         // Window title (read/write)
screen.terminal: string      // Terminal type (read/write)
screen.program: Program      // Program instance (read-only)
screen.tput: Tput            // Terminfo capabilities (read-only)
```

### Focus & Input

```typescript
screen.focused: Element      // Currently focused widget (read/write)
screen.history: Element[]    // Focus history stack (read-only)
screen.clickable: Element[]  // Clickable widgets (read-only)
screen.keyable: Element[]    // Keyable widgets (read-only)
screen.grabKeys: boolean     // Grab all keys (read/write)
screen.lockKeys: boolean     // Lock key handling (read/write)
screen.hover: Element        // Hovered widget (read-only)
```

### Rendering

```typescript
screen.renders: number       // Render count (read-only)
screen.lines: any[][]        // Pending screen buffer (read-only)
screen.olines: any[][]       // Output screen buffer (read-only)
screen.dattr: number         // Default attribute (read-only)
```

### Misc

```typescript
screen.destroyed: boolean    // Screen destroyed (read-only)
screen._unicode: boolean     // Unicode supported (read-only)
screen.fullUnicode: boolean  // Full Unicode enabled (read-only)
screen.autoPadding: boolean  // Auto padding enabled (read/write)
```

## Methods

### Lifecycle

#### screen.destroy()

Destroy the screen and restore terminal.

```typescript
destroy(): void
```

**Description**: Leaves alt screen buffer, removes all event listeners, restores terminal to original state.

**Example**:
```typescript
screen.destroy();
```

#### screen.enter()

Enter alt screen buffer.

```typescript
enter(): void
```

**Description**: Switches to alternate screen buffer, enables keypad, hides cursor. Automatically called in constructor.

#### screen.leave()

Leave alt screen buffer.

```typescript
leave(): void
```

**Description**: Restores normal screen buffer, shows cursor, disables mouse. Automatically called in destroy().

### Rendering

#### screen.render()

Render all widgets to the terminal.

```typescript
render(): void
```

**Description**: Renders all children, diffs buffers, writes changes to terminal. Call after making changes to widgets.

**Example**:
```typescript
box.setContent('Updated!');
screen.render();  // Update display
```

**Events**:
- Emits `'prerender'` before rendering
- Emits `'render'` after rendering

#### screen.alloc()

Allocate/reallocate screen buffers.

```typescript
alloc(dirty?: boolean): void
```

**Parameters**:
- `dirty` - Mark all lines as dirty (requiring redraw)

**Description**: Creates new screen buffers matching current terminal size. Called automatically on resize.

#### screen.realloc()

Reallocate screen buffers and clear screen.

```typescript
realloc(): void
```

**Description**: Alias for `alloc(true)` - reallocates buffers and marks all lines dirty.

#### screen.draw()

Draw screen buffer to terminal.

```typescript
draw(start: number, end: number): void
```

**Parameters**:
- `start` - Starting line number
- `end` - Ending line number

**Description**: Internal method to render a range of lines. Diffs pending buffer with output buffer and writes only changes.

### Input Handling

#### screen.key()

Bind a key event handler.

```typescript
key(keys: string | string[], listener: KeyListener): void
```

**Parameters**:
- `keys` - Key name(s) to bind (e.g., 'q', ['escape', 'q'], 'C-c')
- `listener` - Handler function `(ch, key) => void`

**Example**:
```typescript
// Single key
screen.key('q', () => {
  screen.destroy();
  process.exit(0);
});

// Multiple keys
screen.key(['escape', 'q'], () => {
  screen.destroy();
});

// With modifiers
screen.key('C-c', () => {
  process.exit(0);
});
```

**Key Notation**:
- `C-x` - Control + x
- `M-x` - Alt/Meta + x (or Escape, x)
- `S-x` - Shift + x
- `C-M-x` - Control + Alt + x
- Named keys: `enter`, `escape`, `space`, `backspace`, `delete`, `insert`, `home`, `end`, `pageup`, `pagedown`, `left`, `right`, `up`, `down`, `f1`-`f12`

#### screen.onceKey()

Bind a key handler that fires only once.

```typescript
onceKey(keys: string | string[], listener: KeyListener): void
```

#### screen.unkey()

Unbind a key event handler.

```typescript
unkey(keys: string | string[]): void
```

#### screen.removeKey()

Remove a key handler (alias for unkey).

```typescript
removeKey(keys: string | string[]): void
```

#### screen.enableMouse()

Enable mouse events.

```typescript
enableMouse(el?: Element): void
```

**Parameters**:
- `el` - Optional element to register as clickable

**Description**: Enables mouse tracking and registers element as clickable. Automatically called when widgets with `mouse: true` are added.

#### screen.enableKeys()

Enable keyboard events.

```typescript
enableKeys(el?: Element): void
```

**Parameters**:
- `el` - Optional element to register as keyable

**Description**: Enables keyboard tracking and registers element as keyable. Automatically called when widgets with `keys: true` are added.

#### screen.enableInput()

Enable both keyboard and mouse.

```typescript
enableInput(el?: Element): void
```

**Description**: Calls both `enableKeys()` and `enableMouse()`.

### Focus Management

#### screen.focusPush()

Push element onto focus stack.

```typescript
focusPush(el: Element): void
```

**Description**: Adds element to focus history (max 10 items). Equivalent to `screen.focused = el`.

#### screen.focusPop()

Pop element from focus stack.

```typescript
focusPop(): Element
```

**Returns**: The element that was popped

**Description**: Removes current element from focus and returns focus to previous element.

#### screen.focusNext()

Focus next keyable element.

```typescript
focusNext(): Element
```

**Returns**: Newly focused element

**Description**: Cycles focus forward through keyable widgets.

#### screen.focusPrev() / focusPrevious()

Focus previous keyable element.

```typescript
focusPrev(): Element
focusPrevious(): Element
```

**Returns**: Newly focused element

**Description**: Cycles focus backward through keyable widgets.

#### screen.focusOffset()

Focus element by offset.

```typescript
focusOffset(offset: number): Element
```

**Parameters**:
- `offset` - Number of elements to move (positive = forward, negative = backward)

**Returns**: Newly focused element

#### screen.saveFocus()

Save currently focused element.

```typescript
saveFocus(): Element
```

**Returns**: The saved element

**Description**: Stores focused element for later restoration via `restoreFocus()`.

#### screen.restoreFocus()

Restore previously saved focus.

```typescript
restoreFocus(): Element
```

**Returns**: The newly focused element

**Description**: Returns focus to element saved by `saveFocus()`.

#### screen.rewindFocus()

Rewind focus to last attached element.

```typescript
rewindFocus(): Element
```

**Returns**: Element that received focus

**Description**: Walks backward through focus history to find first visible, attached element.

### Buffer Operations

#### screen.clearRegion()

Clear a region of the screen.

```typescript
clearRegion(
  xi: number,
  xl: number,
  yi: number,
  yl: number,
  override?: boolean
): void
```

**Parameters**:
- `xi` - Left X coordinate
- `xl` - Right X coordinate
- `yi` - Top Y coordinate
- `yl` - Bottom Y coordinate
- `override` - If true, always write (ignore current content)

**Description**: Fills region with spaces using default attribute.

#### screen.fillRegion()

Fill a region with character and attribute.

```typescript
fillRegion(
  attr: number,
  ch: string,
  xi: number,
  xl: number,
  yi: number,
  yl: number,
  override?: boolean
): void
```

**Parameters**:
- `attr` - Attribute to fill with
- `ch` - Character to fill with
- `xi`, `xl`, `yi`, `yl` - Region coordinates
- `override` - If true, always write

**Description**: Internal method for filling regions. Used for backgrounds, clearing, etc.

#### screen.blankLine()

Create a blank line array.

```typescript
blankLine(ch?: string, dirty?: boolean): any[]
```

**Parameters**:
- `ch` - Character to fill with (default: space)
- `dirty` - Mark as dirty (default: false)

**Returns**: Array representing a blank screen line

### Scrolling (CSR - Change Scroll Region)

#### screen.insertLine()

Insert line(s) in scroll region.

```typescript
insertLine(n: number, y: number, top: number, bottom: number): void
```

#### screen.deleteLine()

Delete line(s) in scroll region.

```typescript
deleteLine(n: number, y: number, top: number, bottom: number): void
```

#### screen.insertTop()

Insert line at top of scroll region.

```typescript
insertTop(top: number, bottom: number): void
```

#### screen.insertBottom()

Insert line at bottom of scroll region.

```typescript
insertBottom(top: number, bottom: number): void
```

#### screen.deleteTop()

Delete line at top of scroll region.

```typescript
deleteTop(top: number, bottom: number): void
```

#### screen.deleteBottom()

Delete line at bottom of scroll region.

```typescript
deleteBottom(top: number, bottom: number): void
```

#### screen.cleanSides()

Check if element has uniform sides for CSR optimization.

```typescript
cleanSides(el: Element): boolean
```

**Returns**: True if element sides are uniform

**Description**: Determines if Smart CSR can be used for this element based on surrounding cells.

### Cursor

#### screen.cursorShape()

Set cursor shape.

```typescript
cursorShape(shape?: 'block' | 'underline' | 'line', blink?: boolean): boolean
```

**Parameters**:
- `shape` - Cursor shape
- `blink` - Enable blinking

**Returns**: True if successful

**Example**:
```typescript
screen.cursorShape('underline', true);
```

#### screen.cursorColor()

Set cursor color.

```typescript
cursorColor(color: string | number): boolean
```

**Parameters**:
- `color` - Color name, hex string, or color index

**Returns**: True if successful

#### screen.cursorReset() / resetCursor()

Reset cursor to defaults.

```typescript
cursorReset(): boolean
resetCursor(): boolean
```

**Returns**: True if successful

### Process Integration

#### screen.spawn()

Spawn foreground process.

```typescript
spawn(file: string, args?: string[], options?: any): ChildProcess
```

**Parameters**:
- `file` - Command to execute
- `args` - Command arguments
- `options` - spawn() options

**Returns**: ChildProcess instance

**Description**: Leaves alt screen, spawns process, returns to alt screen after exit.

**Example**:
```typescript
screen.spawn('vi', ['file.txt']);
```

#### screen.exec()

Execute command and handle result.

```typescript
exec(
  file: string,
  args?: string[],
  options?: any,
  callback?: (err: Error | null, success: boolean) => void
): ChildProcess
```

**Description**: Like `spawn()` but with callback on completion.

#### screen.readEditor()

Read data from text editor.

```typescript
readEditor(
  options: { editor?: string; value?: string; name?: string },
  callback: (err: Error | null, data?: string) => void
): void
```

**Parameters**:
- `options.editor` - Editor command (default: $EDITOR or 'vi')
- `options.value` - Initial file contents
- `options.name` - Temp file name prefix
- `callback` - Called with (err, data)

**Example**:
```typescript
screen.readEditor({ value: 'Initial text' }, (err, data) => {
  if (err) throw err;
  box.setContent(data);
  screen.render();
});
```

#### screen.displayImage()

Display image using w3m.

```typescript
displayImage(file: string, callback?: (err: Error | null, success: boolean) => void): void
```

**Parameters**:
- `file` - Path or URL to image
- `callback` - Called on completion

### Utilities

#### screen.screenshot()

Capture screen as SGR string.

```typescript
screenshot(xi?: number, xl?: number, yi?: number, yl?: number): string
```

**Parameters**:
- `xi`, `xl`, `yi`, `yl` - Region to capture (defaults to full screen)

**Returns**: SGR-encoded string (can be echoed to terminal)

**Example**:
```typescript
const output = screen.screenshot();
console.log(output);  // Display in terminal
```

#### screen.copyToClipboard()

Copy text to clipboard (iTerm2 only).

```typescript
copyToClipboard(text: string): boolean
```

**Returns**: True if successful

**Description**: Uses iTerm2 proprietary sequences. Only works in iTerm2.

#### screen.log()

Write to log file.

```typescript
log(...args: any[]): void
```

**Description**: Writes to log file if `log` option was provided.

#### screen.debug()

Write to debug log.

```typescript
debug(...args: any[]): void
```

**Description**: Writes to debug log if `debug` option was enabled.

#### screen.setEffects()

Set hover/focus effects on element.

```typescript
setEffects(
  el: Element | (() => Element),
  fel: Element,
  over: string,
  out: string,
  effects: Style,
  temp?: string
): void
```

**Parameters**:
- `el` - Element to apply effects to (or function returning element)
- `fel` - Element to listen for events on
- `over` - Event that triggers effects (e.g., 'mouseover')
- `out` - Event that removes effects (e.g., 'mouseout')
- `effects` - Style object with effects to apply
- `temp` - Property name to store temporary state

**Example**:
```typescript
screen.setEffects(
  box,
  box,
  'mouseover',
  'mouseout',
  { bg: 'blue', bold: true }
);
```

#### screen.sigtstp()

Handle SIGTSTP (Ctrl+Z).

```typescript
sigtstp(callback?: () => void): void
```

**Description**: Sets up handler to restore screen after resume.

#### screen.setTerminal()

Change terminal type.

```typescript
setTerminal(terminal: string): void
```

**Parameters**:
- `terminal` - Terminal type string (e.g., 'xterm-256color')

**Description**: Reloads terminfo database for new terminal type.

### Color & Attributes

#### screen.attrCode()

Convert SGR code to internal attribute.

```typescript
attrCode(code: string, cur: number, def: number): number
```

**Parameters**:
- `code` - SGR escape sequence (e.g., '\x1b[1;31m')
- `cur` - Current attribute value
- `def` - Default attribute value

**Returns**: Packed attribute integer

**Description**: Internal method for parsing SGR sequences.

#### screen.codeAttr()

Convert internal attribute to SGR code.

```typescript
codeAttr(code: number): string
```

**Parameters**:
- `code` - Packed attribute integer

**Returns**: SGR escape sequence

**Description**: Internal method for generating SGR sequences.

## Events

### Lifecycle Events

```typescript
screen.on('destroy', () => void)        // Screen destroyed
```

### Rendering Events

```typescript
screen.on('prerender', () => void)      // Before render
screen.on('render', () => void)         // After render
screen.on('resize', () => void)         // Terminal resized
```

### Focus Events

```typescript
screen.on('focus', () => void)          // Screen gained focus
screen.on('blur', () => void)           // Screen lost focus
screen.on('element focus', (el: Element) => void)   // Element focused
screen.on('element blur', (el: Element) => void)    // Element blurred
```

### Keyboard Events

```typescript
screen.on('keypress', (ch: string, key: KeyEvent) => void)  // Any key
screen.on('key <name>', (ch: string, key: KeyEvent) => void) // Specific key
```

**Example**:
```typescript
screen.on('keypress', (ch, key) => {
  console.log('Pressed:', key.full);
});

screen.on('key enter', () => {
  console.log('Enter pressed');
});
```

### Mouse Events

```typescript
screen.on('mouse', (data: MouseEvent) => void)          // Any mouse event
screen.on('click', (data: MouseEvent) => void)          // Mouse click
screen.on('mousemove', (data: MouseEvent) => void)      // Mouse move
screen.on('mousedown', (data: MouseEvent) => void)      // Mouse button down
screen.on('mouseup', (data: MouseEvent) => void)        // Mouse button up
screen.on('wheelup', (data: MouseEvent) => void)        // Scroll up
screen.on('wheeldown', (data: MouseEvent) => void)      // Scroll down
screen.on('mouseover', (data: MouseEvent) => void)      // Mouse enter element
screen.on('mouseout', (data: MouseEvent) => void)       // Mouse leave element
```

**Example**:
```typescript
screen.on('mouse', (data) => {
  console.log(`Mouse: ${data.action} at (${data.x}, ${data.y})`);
});
```

### Element Events

```typescript
screen.on('element click', (el: Element, data: MouseEvent) => void)
screen.on('element mouseover', (el: Element, data: MouseEvent) => void)
screen.on('element mouseout', (el: Element, data: MouseEvent) => void)
```

### Warnings

```typescript
screen.on('warning', (text: string) => void)    // Warning message
```

## Examples

### Basic Setup

```typescript
import { Screen, Box } from '@unblessed/node';

const screen = new Screen({
  smartCSR: true,
  title: 'My App'
});

const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello World!',
  border: { type: 'line' }
});

screen.key(['q', 'C-c'], () => {
  screen.destroy();
  process.exit(0);
});

screen.render();
```

### With Mouse Support

```typescript
const screen = new Screen({
  smartCSR: true,
  sendFocus: true
});

const box = new Box({
  parent: screen,
  mouse: true,
  // ...
});

box.on('click', () => {
  box.setContent('Clicked!');
  screen.render();
});

screen.render();
```

### Focus Management

```typescript
const screen = new Screen();

const input1 = new Textbox({
  parent: screen,
  top: 0,
  keys: true
});

const input2 = new Textbox({
  parent: screen,
  top: 3,
  keys: true
});

// Tab to cycle focus
screen.key('tab', () => {
  screen.focusNext();
});

// Shift+Tab to cycle backward
screen.key('S-tab', () => {
  screen.focusPrev();
});

input1.focus();
screen.render();
```

### Custom Rendering

```typescript
const screen = new Screen({
  smartCSR: true,
  fastCSR: true,
  useBCE: true
});

// Batch updates
function updateAll() {
  widgets.forEach(w => w.setContent(getData()));
  screen.render();  // Single render
}

// Throttle rendering
let pending = false;
function scheduleRender() {
  if (!pending) {
    pending = true;
    process.nextTick(() => {
      screen.render();
      pending = false;
    });
  }
}
```

### Debug Mode

```typescript
const screen = new Screen({
  debug: true,
  log: './debug.log',
  warnings: true
});

// Press F12 to toggle debug log
screen.render();

// Check screenshot
console.log(screen.screenshot());
```

### Browser (XTerm.js)

```typescript
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Screen, Box } from '@unblessed/browser';

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();

const screen = new Screen({ terminal: term });

const box = new Box({
  parent: screen,
  content: 'Running in browser!',
  border: { type: 'line' }
});

screen.render();
```

## Performance Tips

### 1. Enable Smart CSR

```typescript
const screen = new Screen({
  smartCSR: true,  // Faster scrolling
  fastCSR: true    // Even faster (may have artifacts)
});
```

### 2. Batch Renders

```typescript
// ❌ Bad - renders 100 times
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
  screen.render();
}

// ✅ Good - renders once
for (let i = 0; i < 100; i++) {
  boxes[i].setContent(`Item ${i}`);
}
screen.render();
```

### 3. Throttle Updates

```typescript
let rafId: number | null = null;

function scheduleRender() {
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      screen.render();
      rafId = null;
    });
  }
}
```

## Common Patterns

### Exit Handler

```typescript
screen.key(['q', 'escape', 'C-c'], () => {
  screen.destroy();
  process.exit(0);
});
```

### Full Screen App

```typescript
const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  title: 'My App'
});

const container = new Box({
  parent: screen,
  width: '100%',
  height: '100%'
});

// Add widgets to container...

screen.render();
```

### Modal Dialog

```typescript
function showModal(message: string, callback: () => void) {
  const modal = new Box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: message,
    border: { type: 'line' },
    keys: true
  });

  modal.key(['enter', 'escape'], () => {
    modal.destroy();
    screen.render();
    callback();
  });

  modal.focus();
  screen.render();
}
```

## Troubleshooting

### Nothing Renders

**Problem**: Screen is blank.

**Solutions**:
- Call `screen.render()` after creating widgets
- Ensure widgets have `parent: screen`
- Check widget size is not zero
- Verify widget is not `hidden: true`

### Keys Don't Work

**Problem**: Key handlers not firing.

**Solutions**:
- Set `keys: true` on widget
- Call `widget.focus()` to focus it
- Set `grabKeys: true` on screen for global keys

### Mouse Not Working

**Problem**: Mouse events not firing.

**Solutions**:
- Set `mouse: true` on widget
- Check terminal supports mouse (most do)
- Enable mouse with `screen.enableMouse()`

### Slow Rendering

**Problem**: Screen updates are slow.

**Solutions**:
- Enable `smartCSR: true`
- Batch renders (one render per frame)
- Reduce widget count
- Use absolute positioning instead of percentage

## See Also

- [Program API](./program) - Low-level terminal control
- [Runtime API](./runtime) - Platform abstraction
- [Widgets](/docs/api/widgets) - Widget reference
- [Events](/docs/concepts/events) - Event system
- [Rendering](/docs/concepts/rendering) - Rendering details
