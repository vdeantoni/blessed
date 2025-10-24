---
sidebar_position: 2
---

# Program API

The Program handles low-level terminal I/O, escape sequences, and terminal control.

## Overview

Program is the low-level interface between unblessed and the terminal. It:

- **Manages I/O**: Reads input, writes output via streams
- **Handles escape sequences**: Converts high-level commands to terminal codes
- **Terminal capabilities**: Loads and uses terminfo/termcap databases
- **Input processing**: Parses keyboard and mouse events
- **Buffer management**: Optimizes terminal output

## Usage

Program is typically created and managed by Screen. You rarely instantiate it directly:

```typescript
import { Screen } from '@unblessed/node';

const screen = new Screen();
const program = screen.program;  // Access Program instance

// Use Program methods directly
program.clear();
program.cup(5, 10);  // Move cursor to row 5, col 10
program.write('Hello!');
```

## Constructor

```typescript
new Program(options?: ProgramOptions)
```

### Options

```typescript
interface ProgramOptions {
  input?: stream.Readable;      // Input stream (default: process.stdin)
  output?: stream.Writable;     // Output stream (default: process.stdout)
  log?: string;                 // Log file path
  debug?: boolean;              // Enable debug logging
  dump?: boolean;               // Dump mode (for testing)
  terminal?: string | Terminal; // Terminal type or XTerm instance
  term?: string;                // Alias for terminal
  tput?: boolean;               // Use terminfo (default: true)
  buffer?: boolean;             // Use output buffering (default: true)
  zero?: boolean;               // Use zero-based coordinates (default: false)
  resizeTimeout?: number;       // Resize debounce (default: 300ms)
  forceUnicode?: boolean;       // Force Unicode support
}
```

## Properties

### I/O

```typescript
program.input: Readable     // Input stream (read-only)
program.output: Writable    // Output stream (read-only)
program.terminal: string    // Terminal type (read/write)
```

### Terminal State

```typescript
program.rows: number        // Terminal height (read-only)
program.cols: number        // Terminal width (read-only)
program.isAlt: boolean      // In alt screen buffer (read-only)
program.cursorHidden: boolean  // Cursor is hidden (read-only)
program.mouseEnabled: boolean  // Mouse tracking enabled (read-only)
```

### Capabilities

```typescript
program.tput: Tput          // Terminfo capabilities (read-only)
program.term(...): string   // Get terminfo string by name
program.has(...): boolean   // Check if terminal has capability
```

### Buffers

```typescript
program.useBuffer: boolean  // Output buffering enabled (read/write)
program.zero: boolean       // Zero-based coordinates (read/write)
```

## Methods

### Terminal Control

#### program.clear()

Clear the screen.

```typescript
clear(): Program
```

#### program.reset()

Reset terminal to initial state.

```typescript
reset(): Program
```

#### program.cup()

Move cursor to position (CUP - Cursor Position).

```typescript
cup(y: number, x: number): Program
```

**Example**:
```typescript
program.cup(5, 10);  // Row 5, column 10
```

#### program.move()

Alias for `cup()`.

```typescript
move(x: number, y: number): Program
```

#### program.cuu()

Move cursor up (CUU - Cursor Up).

```typescript
cuu(n: number): Program
```

#### program.cud()

Move cursor down (CUD - Cursor Down).

```typescript
cud(n: number): Program
```

#### program.cuf()

Move cursor forward/right (CUF - Cursor Forward).

```typescript
cuf(n: number): Program
```

#### program.cub()

Move cursor backward/left (CUB - Cursor Backward).

```typescript
cub(n: number): Program
```

### Screen Management

#### program.alternateBuffer()

Switch to alternate screen buffer.

```typescript
alternateBuffer(): Program
```

#### program.normalBuffer()

Switch to normal screen buffer.

```typescript
normalBuffer(): Program
```

#### program.clear()

Clear entire screen.

```typescript
clear(): Program
```

#### program.eraseInDisplay()

Erase in display (ED).

```typescript
eraseInDisplay(param?: 'above' | 'below' | 'all'): Program
```

#### program.eraseInLine()

Erase in line (EL).

```typescript
eraseInLine(param?: 'right' | 'left' | 'all'): Program
```

**Alias**: `program.el()`

### Cursor Control

#### program.showCursor()

Show the cursor.

```typescript
showCursor(): Program
```

**Alias**: `program.cnorm()`

#### program.hideCursor()

Hide the cursor.

```typescript
hideCursor(): Program
```

**Alias**: `program.civis()`

#### program.saveCursor()

Save cursor position (SCP).

```typescript
saveCursor(key?: string): Program
```

**Alias**: `program.sc()`

#### program.restoreCursor()

Restore cursor position (RCP).

```typescript
restoreCursor(key?: string, hide?: boolean): Program
```

**Alias**: `program.rc()`

#### program.cursorShape()

Set cursor shape.

```typescript
cursorShape(shape: 'block' | 'underline' | 'line', blink?: boolean): boolean
```

#### program.cursorColor()

Set cursor color.

```typescript
cursorColor(color: string): boolean
```

#### program.cursorReset()

Reset cursor to defaults.

```typescript
cursorReset(): boolean
```

### Scrolling

#### program.csr()

Set scroll region (CSR - Change Scroll Region).

```typescript
csr(top: number, bottom: number): Program
```

#### program.scrollUp()

Scroll region up.

```typescript
scrollUp(n?: number): Program
```

**Alias**: `program.su()`

#### program.scrollDown()

Scroll region down.

```typescript
scrollDown(n?: number): Program
```

**Alias**: `program.sd()`

#### program.insertLine()

Insert blank lines (IL).

```typescript
insertLine(n: number): Program
```

**Alias**: `program.il()`

#### program.deleteLine()

Delete lines (DL).

```typescript
deleteLine(n: number): Program
```

**Alias**: `program.dl()`

### Input Handling

#### program.enableMouse()

Enable mouse tracking.

```typescript
enableMouse(): void
```

#### program.disableMouse()

Disable mouse tracking.

```typescript
disableMouse(): void
```

#### program.setMouse()

Configure mouse tracking.

```typescript
setMouse(options: MouseOptions, force?: boolean): void
```

**Options**:
```typescript
interface MouseOptions {
  normalMouse?: boolean;
  hiliteTracking?: boolean;
  cellMotion?: boolean;
  allMotion?: boolean;
  sendFocus?: boolean;
  utfMouse?: boolean;
  sgrMouse?: boolean;
  vt200Mouse?: boolean;
  urxvtMouse?: boolean;
  x10Mouse?: boolean;
  decLocator?: boolean;
}
```

#### program.key()

Bind a key handler.

```typescript
key(keys: string | string[], listener: KeyListener): void
```

#### program.onceKey()

Bind a key handler that fires once.

```typescript
onceKey(keys: string | string[], listener: KeyListener): void
```

#### program.unkey()

Unbind a key handler.

```typescript
unkey(keys: string | string[]): void
```

### Output

#### program.write()

Write text to output (buffered).

```typescript
write(text: string): boolean
```

#### program._write()

Write text directly (unbuffered).

```typescript
_write(text: string): boolean
```

#### program.flush()

Flush output buffer.

```typescript
flush(): void
```

### SGR (Select Graphic Rendition)

#### program.sgr()

Set graphics mode.

```typescript
sgr(...attrs: number[]): Program
```

**Example**:
```typescript
program.sgr(1, 31);  // Bold red text
```

#### program.attr()

Set attribute with fg/bg colors.

```typescript
attr(fg: number, bg: number): Program
```

#### program.fg()

Set foreground color.

```typescript
fg(color: number): Program
```

#### program.bg()

Set background color.

```typescript
bg(color: number): Program
```

### Terminfo Shortcuts

Common terminfo capabilities as methods:

```typescript
// Colors
program.setaf(color: number): Program   // Set foreground color
program.setab(color: number): Program   // Set background color

// Text attributes
program.bold(): Program                 // Bold text
program.dim(): Program                  // Dim text
program.underline(): Program            // Underline
program.blink(): Program                // Blinking
program.reverse(): Program              // Reverse video
program.invisible(): Program            // Invisible text

// Reset
program.sgr0(): Program                 // Reset all attributes

// Bell
program.bel(): Program                  // Terminal bell

// Tabs
program.ht(): Program                   // Horizontal tab
```

### Window Title

#### program.setTitle()

Set window title.

```typescript
setTitle(title: string): Program
```

**Alias**: `program.title` (property)

```typescript
program.title = 'My App';  // Set title
console.log(program.title); // Get title
```

### Advanced

#### program.sigtstp()

Handle SIGTSTP (Ctrl+Z).

```typescript
sigtstp(callback: () => void): void
```

#### program.copyToClipboard()

Copy to clipboard (iTerm2 only).

```typescript
copyToClipboard(text: string): boolean
```

#### program.getCursorColor()

Get cursor color (if supported).

```typescript
getCursorColor(callback: (err: Error | null, color?: string) => void): void
```

#### program.setTerminal()

Change terminal type.

```typescript
setTerminal(terminal: string): void
```

#### program.setupTput()

Initialize terminfo capabilities.

```typescript
setupTput(): void
```

## Events

### Input Events

```typescript
program.on('keypress', (ch: string, key: KeyEvent) => void)  // Key pressed
program.on('mouse', (data: MouseEvent) => void)              // Mouse event
program.on('data', (data: Buffer) => void)                   // Raw input
```

### Terminal Events

```typescript
program.on('resize', () => void)        // Terminal resized
program.on('focus', () => void)         // Terminal focused
program.on('blur', () => void)          // Terminal blurred
program.on('warning', (msg: string) => void)  // Warning
```

### Lifecycle

```typescript
program.on('destroy', () => void)       // Program destroyed
```

## Terminfo Capabilities

Access terminfo capabilities via `program.tput`:

```typescript
// Strings (escape sequences)
program.tput.strings.clear_screen       // Clear screen sequence
program.tput.strings.cursor_address     // Cursor position sequence
program.tput.strings.enter_bold_mode    // Bold mode sequence

// Numbers
program.tput.numbers.colors             // Number of colors
program.tput.numbers.columns            // Terminal width
program.tput.numbers.lines              // Terminal height

// Booleans
program.tput.bools.auto_right_margin    // Auto line wrap
program.tput.bools.back_color_erase     // BCE supported
```

### Common Capabilities

```typescript
// Get capability value
program.tput.get('clear');        // Clear screen
program.tput.get('cup', 5, 10);   // Cursor to row 5, col 10

// Check if capability exists
program.tput.has('cup');          // true if supported
```

## Examples

### Basic Terminal Control

```typescript
const program = new Program({
  input: process.stdin,
  output: process.stdout
});

program.alternateBuffer();
program.hideCursor();
program.clear();

program.cup(5, 10);
program.write('Hello at (5, 10)!');

program.showCursor();
program.normalBuffer();
```

### Mouse Tracking

```typescript
program.enableMouse();
program.setMouse({ allMotion: true, sendFocus: true }, true);

program.on('mouse', (data) => {
  console.log(`Mouse: ${data.action} at (${data.x}, ${data.y})`);
});
```

### Keyboard Input

```typescript
program.on('keypress', (ch, key) => {
  console.log('Key:', key.full);

  if (key.name === 'q' || key.ctrl && key.name === 'c') {
    program.normalBuffer();
    program.showCursor();
    process.exit(0);
  }
});

program.key(['C-c', 'q'], () => {
  program.normalBuffer();
  process.exit(0);
});
```

### Colored Output

```typescript
// Using SGR
program.sgr(1, 31);        // Bold red
program.write('Bold Red');
program.sgr(0);            // Reset

// Using color methods
program.bold();
program.fg(196);           // Red
program.write('Bold Red');
program.sgr0();            // Reset
```

### Custom Escape Sequences

```typescript
// Get raw escape sequence
const clearSeq = program.tput.clear();
program._write(clearSeq);

// Build custom sequence
const customSeq = '\x1b[1;31m' + 'Bold Red' + '\x1b[0m';
program._write(customSeq);
```

### Buffered Output

```typescript
program.useBuffer = true;

// These are buffered
program.write('Line 1\n');
program.write('Line 2\n');
program.write('Line 3\n');

// Flush all at once
program.flush();
```

## Low-Level Usage

### Direct Terminfo Access

```typescript
// Get terminfo string
const clearCmd = program.term('clear');

// Use terminfo with params
const cupCmd = program.term('cup', 5, 10);

// Write directly
program._write(cupCmd);
```

### Raw Mode

```typescript
if (program.input.setRawMode) {
  program.input.setRawMode(true);
}

// Now input is raw (no line buffering)

program.on('data', (buf) => {
  console.log('Raw data:', buf);
});
```

## Platform Differences

### Node.js

Full terminal control with real TTY:

```typescript
import { Program } from '@unblessed/node';

const program = new Program({
  input: process.stdin,
  output: process.stdout
});

// All features available
program.alternateBuffer();
program.enableMouse();
```

### Browser (XTerm.js)

Program wraps XTerm.js terminal:

```typescript
import { Terminal } from 'xterm';
import { Screen } from '@unblessed/browser';

const term = new Terminal();
term.open(document.getElementById('terminal'));

const screen = new Screen({ terminal: term });
const program = screen.program;  // XTermAdapter

// Most features work, some are stubs
program.write('Hello!');  // Works
program.cup(5, 10);       // Works
```

## Troubleshooting

### Terminal Not Detected

**Problem**: `$TERM` not set or unrecognized.

**Solution**:
```typescript
const program = new Program({
  terminal: 'xterm-256color'  // Force terminal type
});
```

### Mouse Not Working

**Problem**: Mouse events not firing.

**Solutions**:
- Enable mouse: `program.enableMouse()`
- Check terminal supports mouse (most modern terminals do)
- Try different mouse modes (SGR, UTF-8, etc.)

### Wrong Colors

**Problem**: Colors don't display correctly.

**Solutions**:
- Check `program.tput.colors` for supported color count
- Use terminal with 256 color support
- Set `$TERM` to `xterm-256color`

## See Also

- [Screen API](./screen) - High-level screen management
- [Runtime API](./runtime) - Platform abstraction
- [Tput Reference](https://man7.org/linux/man-pages/man5/terminfo.5.html) - Terminfo documentation
- [ANSI Codes](https://en.wikipedia.org/wiki/ANSI_escape_code) - ANSI escape sequences
