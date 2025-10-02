# blessed API Reference (v0.1.82)

This document catalogs the complete public API surface of blessed v0.1.82. This serves as the compatibility baseline - all v1.x releases must maintain 100% backward compatibility with this API.

## Export Structure

```javascript
const blessed = require('blessed');

// Main exports
blessed.program()  // Create program
blessed.screen()   // Create screen
blessed.box()      // Create box
// ... all widget constructors
```

## Widget Class Hierarchy

```
EventEmitter
  └─ Node
      ├─ Screen
      └─ Element
          └─ Box
              ├─ Text
              ├─ Line
              ├─ ScrollableBox (deprecated)
              │   └─ ScrollableText (deprecated)
              ├─ BigText
              ├─ List
              │   ├─ FileManager
              │   └─ ListTable
              ├─ Listbar
              ├─ Form
              ├─ Input
              │   ├─ Textarea
              │   │   └─ Textbox
              │   ├─ Button
              │   ├─ Checkbox
              │   │   └─ RadioButton
              │   └─ ProgressBar
              ├─ Prompt
              ├─ Question
              ├─ Message
              ├─ Loading
              ├─ Log
              ├─ Table
              ├─ Terminal
              ├─ Image
              │   ├─ ANSIImage
              │   └─ OverlayImage
              ├─ Video
              └─ Layout
          └─ RadioSet
```

---

## Core Classes

### Program

Low-level terminal control.

**Constructor:**
```javascript
blessed.program(options)
```

**Key Methods:**
- `.key(name, listener)` - Bind key
- `.onceKey(name, listener)` - Bind key once
- `.unkey(name, listener)` - Unbind key
- `.enableMouse()` - Enable mouse
- `.disableMouse()` - Disable mouse
- `.alternateBuffer()` - Switch to alternate buffer
- `.normalBuffer()` - Return to normal buffer
- `.clear()` - Clear screen
- `.move(x, y)` - Move cursor
- `.showCursor()` - Show cursor
- `.hideCursor()` - Hide cursor
- `.write(data)` - Write to terminal

**Properties:**
- `.cols` - Terminal columns
- `.rows` - Terminal rows
- `.tput` - Tput instance

---

### Screen (from Node)

The screen on which every other node renders.

**Constructor:**
```javascript
blessed.screen(options)
```

**Options:**
- `program` - Program instance
- `smartCSR` - Attempt CSR optimization
- `fastCSR` - CSR within 20 cols of edge
- `useBCE` - Back-color-erase optimization
- `resizeTimeout` - Resize debounce (ms)
- `tabSize` - Tab width
- `autoPadding` - Auto position children with border/padding
- `cursor.artificial` - Draw custom cursor
- `cursor.shape` - 'block', 'underline', 'line'
- `cursor.blink` - Cursor blink
- `cursor.color` - Cursor color
- `log` - Log file path
- `dump` - Dump output file
- `debug` - Debug mode
- `ignoreLocked` - Keys to ignore when locked
- `dockBorders` - Dock borders with adjacent elements
- `fullUnicode` - Support full unicode
- `sendFocus` - Send focus events
- `warnings` - Display warnings
- `forceUnicode` - Force unicode
- `terminal` - TERM name
- `title` - Window title

**Properties:**
- `.program` - Program instance
- `.tput` - Tput instance
- `.focused` - Currently focused element
- `.width` / `.cols` - Screen width
- `.height` / `.rows` - Screen height
- `.grabKeys` - Whether focused element grabs keys
- `.lockKeys` - Prevent keypresses
- `.hover` - Currently hovered element
- `.terminal` - Terminal name
- `.title` - Window title

**Events:**
- `'resize'` - Screen resized
- `'mouse'` - Mouse event
- `'keypress'` - Key event
- `'element [name]'` - Global element events
- `'key [name]'` - Key event for specific key
- `'focus'` / `'blur'` - Window focus
- `'prerender'` / `'render'` - Rendering events
- `'warning'` - Warnings
- `'destroy'` - Screen destroyed

**Methods:**
- `.render()` - Render screen
- `.alloc()` - Allocate screen buffers
- `.realloc()` - Reallocate buffers
- `.draw(start, end)` - Draw screen
- `.clearRegion(x1, x2, y1, y2)` - Clear region
- `.fillRegion(attr, ch, x1, x2, y1, y2)` - Fill region
- `.focusOffset(offset)` - Focus by offset
- `.focusPrevious()` - Focus previous
- `.focusNext()` - Focus next
- `.focusPush(element)` - Push focus
- `.focusPop()` - Pop focus
- `.saveFocus()` - Save focus
- `.restoreFocus()` - Restore focus
- `.rewindFocus()` - Rewind focus
- `.key(name, listener)` - Bind key
- `.onceKey(name, listener)` - Bind key once
- `.unkey(name, listener)` - Unbind key
- `.spawn(file, args, options)` - Spawn process
- `.exec(file, args, options, callback)` - Execute process
- `.readEditor([options], callback)` - Read from editor
- `.setEffects(el, fel, over, out, effects, temp)` - Set effects
- `.insertLine(n, y, top, bottom)` - Insert line
- `.deleteLine(n, y, top, bottom)` - Delete line
- `.insertBottom(top, bottom)` - Insert at bottom
- `.insertTop(top, bottom)` - Insert at top
- `.deleteBottom(top, bottom)` - Delete at bottom
- `.deleteTop(top, bottom)` - Delete at top
- `.enableMouse([el])` - Enable mouse
- `.enableKeys([el])` - Enable keys
- `.enableInput([el])` - Enable input
- `.copyToClipboard(text)` - Copy to clipboard
- `.cursorShape(shape, blink)` - Set cursor shape
- `.cursorColor(color)` - Set cursor color
- `.cursorReset()` - Reset cursor
- `.screenshot([xi, xl, yi, yl])` - Take screenshot
- `.destroy()` - Destroy screen
- `.setTerminal(term)` - Set terminal

---

### Node (from EventEmitter)

Base node for all elements.

**Options:**
- `screen` - Screen instance
- `parent` - Parent element
- `children` - Array of children

**Properties:**
- `.type` - Node type
- `.options` - Original options
- `.parent` - Parent node
- `.screen` - Screen instance
- `.children` - Child nodes
- `.data` / `._` / `.$` - User data
- `.index` - Render index

**Events:**
- `'adopt'` - Added to parent
- `'remove'` - Removed from parent
- `'reparent'` - New parent
- `'attach'` - Attached to screen
- `'detach'` - Detached from screen

**Methods:**
- `.prepend(node)` - Prepend child
- `.append(node)` - Append child
- `.remove(node)` - Remove child
- `.insert(node, i)` - Insert child at index
- `.insertBefore(node, refNode)` - Insert before
- `.insertAfter(node, refNode)` - Insert after
- `.detach()` - Detach from parent
- `.emitDescendants(type, args...)` - Emit to descendants
- `.get(name, [default])` - Get user property
- `.set(name, value)` - Set user property

---

### Element (from Node)

Base element for all widgets.

**Options:**
All Node options, plus:
- `fg` / `bg` - Foreground/background color
- `bold` / `underline` - Text attributes
- `style` - Style object (see Style section)
- `border` - Border object
- `content` - Text content
- `clickable` - Element clickable
- `input` / `keyable` - Element focusable
- `focused` - Initially focused
- `hidden` - Initially hidden
- `label` - Label text
- `hoverText` - Hover text
- `align` - Text alignment ('left', 'center', 'right')
- `valign` - Vertical alignment ('top', 'middle', 'bottom')
- `shrink` - Shrink to content
- `padding` - Padding (number or object)
- `width` / `height` - Dimensions
- `left` / `right` / `top` / `bottom` - Position
- `position` - Position object
- `scrollable` - Enable scrolling
- `ch` - Background character
- `draggable` - Enable dragging
- `shadow` - Draw shadow

**Properties:**
- `.name` - Element name
- `.border` - Border object
- `.style` - Style object
- `.position` - Position object
- `.content` - Raw content
- `.hidden` / `.visible` - Visibility
- `.detached` - Attachment state
- `.fg` / `.bg` - Colors
- `.bold` / `.underline` - Attributes
- `.width` / `.height` - Calculated dimensions
- `.left` / `.right` / `.top` / `.bottom` - Calculated position
- `.aleft` / `.aright` / `.atop` / `.abottom` - Absolute position
- `.draggable` - Draggable state

**Events:**
- `'blur'` / `'focus'` - Focus events
- `'mouse'` - Mouse event
- `'mousedown'` / `'mouseup'` - Mouse buttons
- `'wheeldown'` / `'wheelup'` - Scroll wheel
- `'mouseover'` / `'mouseout'` - Hover events
- `'mousemove'` - Mouse movement
- `'click'` - Click event
- `'keypress'` - Key event
- `'move'` - Element moved
- `'resize'` - Element resized
- `'key [name]'` - Specific key
- `'prerender'` / `'render'` - Render events
- `'hide'` / `'show'` - Visibility events
- `'destroy'` - Destroyed

**Methods:**
- `.render()` - Render element
- `.hide()` - Hide element
- `.show()` - Show element
- `.toggle()` - Toggle visibility
- `.focus()` - Focus element
- `.key(name, listener)` - Bind key
- `.onceKey(name, listener)` - Bind key once
- `.unkey(name, listener)` - Unbind key
- `.onScreenEvent(type, handler)` - Bind screen event
- `.removeScreenEvent(type, handler)` - Unbind screen event
- `.free()` - Free resources
- `.destroy()` - Destroy element
- `.setIndex(z)` - Set z-index
- `.setFront()` - Move to front
- `.setBack()` - Move to back
- `.setLabel(text|options)` - Set label
- `.removeLabel()` - Remove label
- `.setHover(text|options)` - Set hover text
- `.removeHover()` - Remove hover
- `.enableMouse()` - Enable mouse
- `.enableKeys()` - Enable keys
- `.enableInput()` - Enable input
- `.enableDrag()` - Enable dragging
- `.disableDrag()` - Disable dragging
- `.screenshot([xi, xl, yi, yl])` - Screenshot element

**Content Methods:**
- `.setContent(text)` - Set content
- `.getContent()` - Get content
- `.setText(text)` - Set text (no tags)
- `.getText()` - Get text (no tags)
- `.insertLine(i, lines)` - Insert line
- `.deleteLine(i)` - Delete line
- `.getLine(i)` - Get line
- `.getBaseLine(i)` - Get line from visible top
- `.setLine(i, line)` - Set line
- `.setBaseLine(i, line)` - Set line from visible top
- `.clearLine(i)` - Clear line
- `.clearBaseLine(i)` - Clear line from visible top
- `.insertTop(lines)` - Insert at top
- `.insertBottom(lines)` - Insert at bottom
- `.deleteTop()` - Delete from top
- `.deleteBottom()` - Delete from bottom
- `.unshiftLine(lines)` - Unshift line
- `.shiftLine(i)` - Shift line
- `.pushLine(lines)` - Push line
- `.popLine(i)` - Pop line
- `.getLines()` - Get all lines
- `.getScreenLines()` - Get displayed lines
- `.strWidth(text)` - Get display width

**Scrollable Methods (if scrollable: true):**
- `.scroll(offset)` - Scroll by offset
- `.scrollTo(index)` - Scroll to index
- `.setScroll(index)` - Set scroll index
- `.setScrollPerc(perc)` - Set scroll percentage
- `.getScroll()` - Get scroll index
- `.getScrollHeight()` - Get scroll height
- `.getScrollPerc()` - Get scroll percentage
- `.resetScroll()` - Reset scroll

---

## Widget Classes

### Box (from Element)

Basic box widget.

**Constructor:**
```javascript
blessed.box(options)
```

Inherits all Element options, properties, events, and methods.

---

### Text (from Element)

Text display widget.

**Constructor:**
```javascript
blessed.text(options)
```

**Additional Options:**
- `fill` - Fill line with bg (deprecated)
- `align` - Text alignment

Inherits all Element options, properties, events, and methods.

---

### Line (from Box)

Line widget (horizontal or vertical).

**Constructor:**
```javascript
blessed.line(options)
```

**Additional Options:**
- `orientation` - 'vertical' or 'horizontal'
- `type` / `bg` / `fg` / `ch` - Border-like styling

---

### List (from Box)

Scrollable list widget.

**Constructor:**
```javascript
blessed.list(options)
```

**Additional Options:**
- `style.selected` - Selected item style
- `style.item` - Unselected item style
- `mouse` - Enable mouse
- `keys` - Enable keys
- `vi` - Enable vi keys
- `items` - Array of items
- `search` - Search function
- `interactive` - Can select items
- `invertSelected` - Auto-invert selected item

**Events:**
- `'select'` - Item selected
- `'cancel'` - List canceled
- `'action'` - Select or cancel

**Methods:**
- `.add(text)` / `.addItem(text)` - Add item
- `.removeItem(child)` - Remove item
- `.pushItem(child)` - Push item
- `.popItem()` - Pop item
- `.unshiftItem(child)` - Unshift item
- `.shiftItem()` - Shift item
- `.insertItem(i, child)` - Insert item
- `.getItem(child)` - Get item
- `.setItem(child, content)` - Set item content
- `.spliceItem(i, n, item1, ...)` - Splice items
- `.clearItems()` - Clear all items
- `.setItems(items)` - Set items
- `.getItemIndex(child)` - Get item index
- `.select(index)` - Select item
- `.move(offset)` - Move selection
- `.up(amount)` - Move up
- `.down(amount)` - Move down
- `.pick(callback)` - Show and pick item
- `.fuzzyFind([string|regex|callback])` - Find item

---

### Form (from Box)

Form container widget.

**Constructor:**
```javascript
blessed.form(options)
```

**Additional Options:**
- `keys` - Enable default keys
- `vi` - Enable vi keys

**Properties:**
- `.submission` - Last submitted data

**Events:**
- `'submit'` - Form submitted
- `'cancel'` - Form canceled
- `'reset'` - Form reset

**Methods:**
- `.focusNext()` - Focus next element
- `.focusPrevious()` - Focus previous element
- `.submit()` - Submit form
- `.cancel()` - Cancel form
- `.reset()` - Reset form

---

### Textarea (from Input)

Multiline text input widget.

**Constructor:**
```javascript
blessed.textarea(options)
```

**Additional Options:**
- `keys` - Enable predefined keys
- `mouse` - Enable mouse
- `inputOnFocus` - Auto read input on focus

**Properties:**
- `.value` - Input text (read-only)

**Events:**
- `'submit'` - Submitted
- `'cancel'` - Canceled
- `'action'` - Submit or cancel

**Methods:**
- `.submit()` - Submit
- `.cancel()` - Cancel
- `.readInput(callback)` - Read input
- `.readEditor(callback)` - Open editor
- `.getValue()` - Get value
- `.clearValue()` - Clear value
- `.setValue(text)` - Set value

---

### Textbox (from Textarea)

Single-line text input.

**Constructor:**
```javascript
blessed.textbox(options)
```

**Additional Options:**
- `secret` - Hide text completely
- `censor` - Replace with asterisks

Inherits all Textarea options, properties, events, and methods.

---

### Button (from Input)

Button widget.

**Constructor:**
```javascript
blessed.button(options)
```

**Events:**
- `'press'` - Button pressed

**Methods:**
- `.press()` - Press button

---

### Checkbox (from Input)

Checkbox widget.

**Constructor:**
```javascript
blessed.checkbox(options)
```

**Additional Options:**
- `checked` - Initially checked
- `mouse` - Enable mouse

**Properties:**
- `.text` - Text next to checkbox
- `.checked` - Checked state
- `.value` - Same as checked

**Events:**
- `'check'` - Checked
- `'uncheck'` - Unchecked

**Methods:**
- `.check()` - Check
- `.uncheck()` - Uncheck
- `.toggle()` - Toggle

---

### RadioSet (from Box)

Radio button container.

**Constructor:**
```javascript
blessed.radioset(options)
```

Inherits all Box options, properties, events, and methods.

---

### RadioButton (from Checkbox)

Radio button widget (use inside RadioSet).

**Constructor:**
```javascript
blessed.radiobutton(options)
```

Inherits all Checkbox options, properties, events, and methods.

---

### ProgressBar (from Input)

Progress bar widget.

**Constructor:**
```javascript
blessed.progressbar(options)
```

**Additional Options:**
- `orientation` - 'horizontal' or 'vertical'
- `style.bar` - Bar style
- `pch` - Progress character
- `filled` - Initial fill amount (0-100)
- `value` - Same as filled
- `keys` - Enable keys
- `mouse` - Enable mouse

**Events:**
- `'reset'` - Reset
- `'complete'` - Completed

**Methods:**
- `.progress(amount)` - Progress by amount
- `.setProgress(amount)` - Set progress
- `.reset()` - Reset

---

### FileManager (from List)

File manager widget.

**Constructor:**
```javascript
blessed.filemanager(options)
```

**Additional Options:**
- `cwd` - Current working directory

**Properties:**
- `.cwd` - Current directory

**Events:**
- `'cd'` - Directory changed
- `'file'` - File selected

**Methods:**
- `.refresh([cwd], [callback])` - Refresh file list
- `.pick([cwd], callback)` - Pick file
- `.reset([cwd], [callback])` - Reset to cwd

---

### Prompt (from Box)

Prompt dialog.

**Constructor:**
```javascript
blessed.prompt(options)
```

**Methods:**
- `.input(text, value, callback)` - Show prompt

---

### Question (from Box)

Question dialog.

**Constructor:**
```javascript
blessed.question(options)
```

**Methods:**
- `.ask(question, callback)` - Ask question

---

### Message (from Box)

Message dialog.

**Constructor:**
```javascript
blessed.message(options)
```

**Methods:**
- `.log(text, [time], callback)` / `.display(...)` - Display message
- `.error(text, [time], callback)` - Display error

---

### Loading (from Box)

Loading dialog.

**Constructor:**
```javascript
blessed.loading(options)
```

**Methods:**
- `.load(text)` - Show loading
- `.stop()` - Hide loading

---

### ListTable (from List)

Stylized table using list.

**Constructor:**
```javascript
blessed.listtable(options)
```

**Additional Options:**
- `rows` / `data` - Array of arrays
- `pad` - Cell padding
- `noCellBorders` - No inner borders
- `style.header` - Header style
- `style.cell` - Cell style

**Methods:**
- `.setRows(rows)` / `.setData(rows)` - Set table data

---

### Table (from Box)

Basic table widget.

**Constructor:**
```javascript
blessed.table(options)
```

**Additional Options:**
- `rows` / `data` - Array of arrays
- `pad` - Cell padding
- `noCellBorders` - No inner borders
- `fillCellBorders` - Fill borders with bg
- `style.header` - Header style
- `style.cell` - Cell style

**Methods:**
- `.setRows(rows)` / `.setData(rows)` - Set table data

---

### Listbar (from Box)

Horizontal list/menu bar.

**Constructor:**
```javascript
blessed.listbar(options)
```

**Additional Options:**
- `style.selected` - Selected style
- `style.item` - Item style
- `commands` / `items` - Button definitions
- `autoCommandKeys` - Auto bind 0-9 keys

**Methods:**
- `.setItems(commands)` - Set commands
- `.add(item, callback)` / `.addItem(...)` / `.appendItem(...)` - Add item
- `.select(offset)` - Select item
- `.removeItem(child)` - Remove item
- `.move(offset)` - Move selection
- `.moveLeft(offset)` - Move left
- `.moveRight(offset)` - Move right
- `.selectTab(index)` - Select and execute

---

### Log (from ScrollableText)

Auto-scrolling log widget.

**Constructor:**
```javascript
blessed.log(options)
```

**Additional Options:**
- `scrollback` - Max scrollback lines
- `scrollOnInput` - Auto scroll on input

**Properties:**
- `.scrollback` - Scrollback limit
- `.scrollOnInput` - Auto scroll flag

**Events:**
- `'log'` - Line logged

**Methods:**
- `.log(text)` / `.add(text)` - Add log line

---

### Terminal (from Box)

Pseudo-terminal widget.

**Constructor:**
```javascript
blessed.terminal(options)
```

**Additional Options:**
- `handler` - Input handler
- `shell` - Shell command
- `args` - Shell arguments
- `cursor` - Cursor style
- `terminal` - Terminal name
- `env` - Environment variables

**Properties:**
- `.term` - term.js instance
- `.pty` - pty.js instance

**Events:**
- `'title'` - Title changed

**Methods:**
- `.write(data)` - Write to terminal
- `.screenshot([xi, xl, yi, xl])` - Screenshot with scrollback

---

### Image (from Box)

Image display widget (ANSI or w3m overlay).

**Constructor:**
```javascript
blessed.image(options)
```

**Additional Options:**
- `file` - Image path
- `type` - 'ansi' or 'overlay'

See ANSIImage and OverlayImage for details.

---

### ANSIImage (from Box)

ANSI art image widget.

**Constructor:**
```javascript
blessed.ansiimage(options)
```

**Additional Options:**
- `file` - Image path/URL/buffer
- `scale` - Scale factor (0-1)
- `width` / `height` - Dimensions (maintains aspect)
- `ascii` - Add density characters
- `animate` - Animate APNG/GIF
- `speed` - Animation speed
- `optimization` - 'mem' or 'cpu'

**Properties:**
- `.img` - Image object
- `.img.width` - Pixel width
- `.img.height` - Pixel height
- `.img.bmp` - Bitmap
- `.img.cellmap` - Cellmap

**Methods:**
- `.setImage(file)` - Set image
- `.clearImage()` - Clear image
- `.play()` - Play animation
- `.pause()` - Pause animation
- `.stop()` - Stop animation

---

### OverlayImage (from Box)

w3m overlay image widget.

**Constructor:**
```javascript
blessed.overlayimage(options)
```

**Additional Options:**
- `file` - Image path
- `ansi` - Use ANSI fallback
- `w3m` - w3mimgdisplay path
- `search` - Search for w3m

**Methods:**
- `.setImage(img, [callback])` - Set image
- `.clearImage([callback])` - Clear image
- `.imageSize(img, [callback])` - Get image size
- `.termSize([callback])` - Get terminal size
- `.getPixelRatio([callback])` - Get pixel ratio

---

### Video (from Box)

Video player widget (mplayer/mpv with libcaca).

**Constructor:**
```javascript
blessed.video(options)
```

**Additional Options:**
- `file` - Video file
- `start` - Start time

**Properties:**
- `.tty` - Terminal element

---

### Layout (from Element)

Auto-layout container.

**Constructor:**
```javascript
blessed.layout(options)
```

**Additional Options:**
- `renderer` - Custom renderer function
- `layout` - 'inline' or 'grid'

**Methods:**
- `.renderer(coords)` - Renderer callback
- `.isRendered(el)` - Check if child rendered
- `.getLast(i)` - Get last rendered child
- `.getLastCoords(i)` - Get last child coords

---

### BigText (from Box)

Large text using terminus font.

**Constructor:**
```javascript
blessed.bigtext(options)
```

**Additional Options:**
- `font` - BDF JSON font file
- `fontBold` - BDF JSON bold font
- `fch` - Foreground character

---

## Deprecated Widgets

### ScrollableBox (from Box) - DEPRECATED

Use `Box` with `scrollable: true` option instead.

### ScrollableText (from ScrollableBox) - DEPRECATED

Use `Box` with `scrollable: true` and `alwaysScroll: true` instead.

---

## Helper Functions

Available as `blessed.helpers` or directly on `blessed`:

- `blessed.escape(text)` - Escape tags
- `blessed.stripTags(text)` - Strip tags and SGR
- `blessed.cleanTags(text)` - Strip and trim
- `blessed.parseTags(text)` - Parse tags to SGR
- `blessed.generateTags(style, text)` - Generate tags
- `blessed.attrToBinary(style, element)` - Convert to binary
- `blessed.merge(a, b)` - Merge objects
- `blessed.asort(obj)` - Sort by name
- `blessed.hsort(obj)` - Sort by index
- `blessed.findFile(start, target)` - Find file
- `blessed.dropUnicode(text)` - Drop >U+FFFF chars

---

## Style Object Format

```javascript
{
  fg: 'blue',           // Foreground color
  bg: 'black',          // Background color
  bold: true,           // Bold text
  underline: false,     // Underline text
  blink: false,         // Blink text
  inverse: false,       // Inverse colors
  invisible: false,     // Invisible text
  transparent: false,   // 50% opacity
  border: {             // Border style
    fg: 'blue',
    bg: 'red'
  },
  scrollbar: {          // Scrollbar style
    bg: 'blue',
    fg: 'white'
  },
  focus: {              // Focused style
    bg: 'red'
  },
  hover: {              // Hovered style
    bg: 'green'
  }
}
```

---

## Tag Format

```javascript
// Colors
'{red-fg}text{/red-fg}'
'{#ff0000-fg}text{/}'
'{blue-bg}text{/blue-bg}'

// Attributes
'{bold}text{/bold}'
'{underline}text{/underline}'

// Alignment
'{center}centered{/center}'
'{right}right{/right}'
'left{|}right'  // Left and right justified

// Escaping
'{open}bold{close}'  // Shows: {bold}
```

---

## Border Object Format

```javascript
{
  type: 'line',    // 'line' or 'bg'
  ch: ' ',         // Character for 'bg' type
  fg: 'blue',      // Foreground
  bg: 'black',     // Background
  bold: true,      // Bold
  underline: false // Underline
}
```

---

## Colors

**Named colors (16 basic):**
`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `lightblack` (gray), `lightred`, `lightgreen`, `lightyellow`, `lightblue`, `lightmagenta`, `lightcyan`, `lightwhite`

**Hex colors (256-color terminals):**
`#ff0000`, `#00ff00`, `#0000ff`, etc.

**Special:**
- `-1` or `'default'` - Terminal default color

---

## Events

**Keyboard:**
- `'keypress'` - Any key: `(ch, key)`
- `'key [name]'` - Specific key: `(ch, key)`
- Key names: `'a'`, `'C-c'`, `'S-tab'`, `'escape'`, `'enter'`, etc.

**Mouse:**
- `'mouse'` - Any mouse: `(data)`
- `'mousedown'` / `'mouseup'` - Buttons
- `'wheeldown'` / `'wheelup'` - Scroll
- `'mouseover'` / `'mouseout'` - Hover
- `'mousemove'` - Movement
- `'click'` - Click

**Focus:**
- `'focus'` - Gained focus
- `'blur'` - Lost focus

**Visibility:**
- `'show'` - Shown
- `'hide'` - Hidden

**Lifecycle:**
- `'attach'` - Attached to screen
- `'detach'` - Detached
- `'destroy'` - Destroyed
- `'adopt'` - Adopted by parent
- `'remove'` - Removed from parent

---

## Compatibility Notes

This API reference documents blessed v0.1.82. All v1.x releases must maintain 100% backward compatibility with this API.

### Known Quirks (Must Preserve in v1.x)
- Duplicate methods (e.g., `setData` and `setRows` on tables)
- Inconsistent naming conventions across widgets
- `ScrollableBox` and `ScrollableText` are deprecated but must work
- Some methods have unclear parameter ordering
- Type coercion behaviors in various places

These quirks are intentionally preserved for backward compatibility. They may be addressed in v2.x+ releases.

---

**Last Updated:** Phase 0, blessed v0.1.82 fork
**For:** Modernization compatibility baseline