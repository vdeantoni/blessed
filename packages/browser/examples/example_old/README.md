# @tui/browser Example Playground

Live interactive playground for testing @tui/core widgets in the browser!

## Running the Demo

```bash
cd packages/browser/examples/example
npm install
npm run dev
```

Then open your browser to the URL shown (usually `http://localhost:5173`).

## What's Included

### 🎨 Full Interactive Demo
The complete showcase featuring:
- **Three-panel layout**: Widget gallery, demo area, and activity log
- **Six interactive demos**:
  - 🌈 Rainbow Box - Animated color-changing border
  - 📊 Progress Bar - Auto-incrementing progress animation
  - 🔘 Buttons - Interactive counter with increment/decrement
  - 📋 Table View - Data table with task status
  - 🎨 Color Palette - Terminal color showcase
  - ⚡ Spinner - Loading animation with Unicode spinners
- **Real-time activity logging**
- **Stats tracking** (clicks, selections)
- **Keyboard navigation** with arrow keys and Enter
- **Mouse support** with click and hover effects

### Other Examples
- **Simple Box** - Basic centered box with styling
- **Interactive List** - Selectable list with keyboard/mouse navigation
- **Form Input** - Text input form with submit handling
- **Table** - Data table display
- **Layout** - Multi-pane layout with header/sidebar/content/footer
- **Animation** - Progress bar animation

## Features Demonstrated

- ✅ Multiple panel layouts
- ✅ Interactive widget selection
- ✅ Real-time animations
- ✅ Event handling (click, select, keypress)
- ✅ Dynamic content updates
- ✅ Logging and status tracking
- ✅ Keyboard navigation (arrow keys, Enter, Tab, q/Esc)
- ✅ Mouse interactions (click, hover)
- ✅ Color styling and theming
- ✅ Progress indicators
- ✅ Tables and data display
- ✅ Forms and buttons

## How It Works

The playground uses **xterm.js** to render the terminal in the browser, and **@tui/browser** provides the runtime adapter that makes @tui/core work in the browser environment.

All the blessed/tui widgets work exactly the same in the browser as they would in a Node.js terminal!

## Development

Edit `examples.js` to add new examples. Each example is a string of JavaScript code that gets evaluated in the browser with access to:
- `blessed` - The tui/core library
- `screen` - Pre-configured Screen instance

The code editor supports:
- Syntax highlighting (via textarea)
- Tab key (inserts 2 spaces)
- Cmd/Ctrl+Enter to run code

## Tips

1. **Select from dropdown** - Choose "🎨 Full Interactive Demo" to see all features
2. **Use arrow keys** - Navigate through the widget list
3. **Press Enter** - Activate the selected demo
4. **Click buttons** - Mouse support is fully functional
5. **Watch the log** - Right panel shows all activity in real-time
6. **Press q or Esc** - Clear the terminal

Enjoy exploring @tui/core in the browser! 🎉
