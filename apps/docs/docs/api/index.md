---
sidebar_position: 1
---

# API Reference

Complete API documentation for all unblessed widgets and interfaces.

## Overview

unblessed provides a comprehensive set of widgets for building terminal user interfaces. All widgets are TypeScript-typed with full IDE autocomplete support.

## Widget Categories

### Core Widgets

Essential widgets for building any TUI application:

- **[Screen](/docs/api/generated/widgets.screen.Class.Screen)** - Root container and rendering engine
- **[Box](/docs/api/generated/widgets.box.Class.Box)** - Basic rectangular container
- **[Element](/docs/api/generated/widgets.element.Class.Element)** - Base class for all widgets
- **[Node](/docs/api/generated/widgets.node.Class.Node)** - Tree structure base

### Layout & Containers

Widgets for organizing your UI:

- **[Layout](/docs/api/generated/widgets.layout.Class.Layout)** - Container with automatic child sizing
- **[Line](/docs/api/generated/widgets.line.Class.Line)** - Horizontal or vertical line separator
- **[ScrollableBox](/docs/api/generated/widgets.scrollablebox.Class.ScrollableBox)** - Box with scroll support

### Interactive Widgets

Widgets that accept user input:

- **[Button](/docs/api/generated/widgets.button.Class.Button)** - Clickable button
- **[Checkbox](/docs/api/generated/widgets.checkbox.Class.Checkbox)** - Boolean toggle
- **[RadioButton](/docs/api/generated/widgets.radiobutton.Class.RadioButton)** - Single choice from group
- **[RadioSet](/docs/api/generated/widgets.radioset.Class.RadioSet)** - Radio button group
- **[Input](/docs/api/generated/widgets.input.Class.Input)** - Single-line text input
- **[Textarea](/docs/api/generated/widgets.textarea.Class.Textarea)** - Multi-line text input
- **[Textbox](/docs/api/generated/widgets.textbox.Class.Textbox)** - Scrollable text input

### List Widgets

Widgets for displaying and selecting from lists:

- **[List](/docs/api/generated/widgets.list.Class.List)** - Scrollable item list with selection
- **[ListTable](/docs/api/generated/widgets.listtable.Class.ListTable)** - List with table-like columns
- **[Listbar](/docs/api/generated/widgets.listbar.Class.Listbar)** - Horizontal tab bar
- **[FileManager](/docs/api/generated/widgets.filemanager.Class.FileManager)** - File browser widget

### Display Widgets

Widgets for showing information:

- **[Text](/docs/api/generated/widgets.text.Class.Text)** - Simple text display
- **[ScrollableText](/docs/api/generated/widgets.scrollabletext.Class.ScrollableText)** - Scrollable text
- **[BigText](/docs/api/generated/widgets.bigtext.Class.BigText)** - ASCII art large text
- **[ProgressBar](/docs/api/generated/widgets.progressbar.Class.ProgressBar)** - Progress indicator
- **[Table](/docs/api/generated/widgets.table.Class.Table)** - Data table with headers
- **[Log](/docs/api/generated/widgets.log.Class.Log)** - Scrolling log viewer

### Form Widgets

Widgets for building forms:

- **[Form](/docs/api/generated/widgets.form.Class.Form)** - Form container with submission
- **[Question](/docs/api/generated/widgets.question.Class.Question)** - Prompt with input
- **[Prompt](/docs/api/generated/widgets.prompt.Class.Prompt)** - Interactive prompt dialog

### Dialog Widgets

Widgets for modals and messages:

- **[Message](/docs/api/generated/widgets.message.Class.Message)** - Modal message box
- **[Dialog](/docs/api/generated/widgets.dialog.Class.Dialog)** - Modal dialog with buttons
- **[Loading](/docs/api/generated/widgets.loading.Class.Loading)** - Loading indicator

### Media Widgets

Widgets for displaying images and video:

- **[Image](/docs/api/generated/widgets.image.Class.Image)** - Display images (w3mimgdisplay)
- **[ANSIImage](/docs/api/generated/widgets.ansiimage.Class.ANSIImage)** - ANSI art images
- **[OverlayImage](/docs/api/generated/widgets.overlayimage.Class.OverlayImage)** - Overlay images
- **[Video](/docs/api/generated/widgets.video.Class.Video)** - Terminal video playback

### Advanced Widgets

Specialized widgets:

- **[Terminal](/docs/api/generated/widgets.terminal.Class.Terminal)** - Embedded terminal (pty)
- **[Static](/docs/api/generated/widgets.static.Class.Static)** - Static non-interactive widget

## Runtime API

Platform abstraction layer:

- **[Runtime](/docs/api/generated/runtime.Interface.Runtime)** - Complete runtime interface
- **[File System](/docs/api/generated/runtime.Interface.FileSystemAPI)** - File operations
- **[Process](/docs/api/generated/runtime.Interface.ProcessAPI)** - Process info and events
- **[TTY](/docs/api/generated/runtime.Interface.TtyAPI)** - Terminal control

## Common Patterns

### Creating Widgets

All widgets follow the same pattern:

```typescript
import { Screen, Box } from "@unblessed/node";

const screen = new Screen({ smartCSR: true });

const box = new Box({
  parent: screen, // Required
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello World",
  border: { type: "line" },
  style: {
    fg: "white",
    border: { fg: "cyan" },
  },
});

screen.render();
```

### Event Handling

```typescript
// Widget events
box.on("click", () => console.log("Clicked!"));
box.on("focus", () => console.log("Focused!"));

// Global key bindings
screen.key(["C-c"], () => process.exit(0));

// Custom events
box.emit("custom-event", data);
```

### Styling

```typescript
{
  style: {
    fg: 'white',           // Foreground color
    bg: 'blue',            // Background color
    bold: true,            // Bold text
    underline: true,       // Underline
    border: {
      fg: 'cyan',
      bg: 'black'
    },
    focus: {
      border: { fg: 'green' }
    },
    hover: {
      bg: 'gray'
    }
  }
}
```

### Positioning

```typescript
{
  // Absolute
  top: 0,
  left: 0,
  width: 50,
  height: 20,

  // Relative to parent
  top: '10%',
  left: 'center',
  width: '50%',
  height: '100%-5',

  // Negative (from bottom/right)
  bottom: 0,
  right: 0
}
```

## Quick Links

- [Getting Started](/docs/getting-started/introduction)
- [Quick Start Guide](/docs/getting-started/quick-start)
- [Examples](/docs/examples/getting-started/simple-box)
- [Testing Guide](/docs/advanced/testing)

## Need Help?

- Check the [FAQ](/docs/faq)
- Read the [Troubleshooting Guide](/docs/advanced/troubleshooting)
- Ask on [GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)
- Report bugs on [GitHub Issues](https://github.com/vdeantoni/unblessed/issues)
