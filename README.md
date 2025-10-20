# tui

> A modern, platform-agnostic terminal UI library for Node.js and browsers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green.svg)](https://nodejs.org/)

**tui** is a complete modernization of the beloved [blessed](https://github.com/chjj/blessed) terminal UI library, bringing it into the modern era with TypeScript, comprehensive tests, platform-agnostic architecture, and browser support.

## ✨ Features

- 🎯 **100% TypeScript** - Full type safety with strict mode enabled
- 🧪 **Comprehensive Tests** - 1,987+ tests with 98.5% coverage
- 🌐 **Platform Agnostic** - Works in Node.js and browsers via XTerm.js
- 🔄 **Backward Compatible** - Drop-in replacement for blessed
- 📦 **Modern Build** - ESM + CJS dual output, tree-shakeable
- ⚡ **High Performance** - Optimized rendering with smart CSR and damage buffer
- 🎨 **Rich Widgets** - 27+ widgets for building terminal UIs

## 📦 Packages

The tui project is organized as a monorepo with four main packages:

### [@tui/core](packages/core)

Platform-agnostic core library with all widget logic, rendering, and events.

```bash
npm install @tui/core
```

**Use when:** Building custom runtime adapters or need platform-agnostic code.

### [@tui/node](packages/node)

Modern Node.js runtime with clean, class-based API.

```bash
npm install @tui/node
```

**Use when:** Building new Node.js terminal applications (recommended).

**Example:**
```typescript
import { Screen, Box } from '@tui/node';

const screen = new Screen({ smartCSR: true });

const box = new Box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello World!',
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'blue',
    border: { fg: '#f0f0f0' }
  }
});

screen.key(['escape', 'q'], () => process.exit(0));
screen.render();
```

### [@tui/browser](packages/browser)

Browser runtime with XTerm.js integration for web-based terminals.

```bash
npm install @tui/browser xterm
```

**Use when:** Building terminal UIs in the browser.

**Example:**
```typescript
import { Terminal } from 'xterm';
import { Screen, Box } from '@tui/browser';

const term = new Terminal();
term.open(document.getElementById('terminal'));

const screen = new Screen({ terminal: term });

const box = new Box({
  parent: screen,
  content: 'Hello from the browser!',
  border: { type: 'line' }
});

screen.render();
```

[Try the interactive playground →](packages/browser)

### [@tui/blessed](packages/blessed)

100% backward-compatible blessed API for seamless migration.

```bash
npm install @tui/blessed
```

**Use when:** Migrating from blessed or need exact API compatibility.

**Example:**
```javascript
const blessed = require('@tui/blessed');

const screen = blessed.screen({ smartCSR: true });
const box = blessed.box({
  parent: screen,
  content: 'Same API as blessed!'
});

screen.render();
```

## 🚀 Quick Start

### For New Projects

Start with **@tui/node** for the best experience:

```bash
npm install @tui/node
```

```typescript
import { Screen, Box, List } from '@tui/node';

const screen = new Screen({
  smartCSR: true,
  title: 'My App'
});

const list = new List({
  parent: screen,
  border: { type: 'line' },
  width: '50%',
  height: '50%',
  top: 'center',
  left: 'center',
  keys: true,
  vi: true,
  style: {
    selected: { bg: 'blue' }
  }
});

list.setItems(['Option 1', 'Option 2', 'Option 3']);

screen.key(['escape', 'q'], () => process.exit(0));
screen.render();
```

### For Existing Blessed Projects

Migrate seamlessly with **@tui/blessed**:

```bash
npm install @tui/blessed
```

```diff
- const blessed = require('blessed');
+ const blessed = require('@tui/blessed');
```

That's it! Your code should work without any other changes.

## 🏗️ Architecture

tui uses a **runtime dependency injection** pattern for platform abstraction:

```
┌─────────────────────────────────────────┐
│           @tui/core (Platform Agnostic)  │
│  • All widget logic                      │
│  • Rendering engine                      │
│  • Event handling                        │
└─────────────────┬───────────────────────┘
                  │
         ┌────────┴────────┐
         ▼                 ▼
┌─────────────────┐ ┌─────────────────┐
│   @tui/node     │ │  @tui/browser   │
│ • NodeRuntime   │ │ • BrowserRuntime│
│ • Native fs/tty │ │ • XTerm.js      │
│ • Process APIs  │ │ • Polyfills     │
└─────────────────┘ └─────────────────┘
         │                 │
         └────────┬────────┘
                  ▼
         ┌─────────────────┐
         │  @tui/blessed   │
         │  (Compatibility)│
         └─────────────────┘
```

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Development environment setup
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[API Reference](API_REFERENCE.md)** - Complete API compatibility baseline
- **[Contributor Guide](CLAUDE.md)** - Architecture and development guide

### Package Documentation

- [@tui/core](packages/core/README.md) - Core library documentation
- [@tui/node](packages/node/README.md) - Node.js runtime documentation
- [@tui/browser](packages/browser/README.md) - Browser runtime documentation
- [@tui/blessed](packages/blessed/README.md) - Blessed compatibility guide
- [@tui/blessed Guide](packages/blessed/BLESSED_GUIDE.md) - Complete blessed API reference

## 🎯 Project Status

**Current Version:** `1.0.0-alpha.19`

### ✅ Completed

- Full TypeScript conversion with strict mode
- Platform-agnostic core architecture
- Runtime dependency injection pattern
- 100% test coverage (1,987/1,987 tests passing)
- Browser support via XTerm.js
- Modern build tooling (tsup, pnpm, Turborepo)
- Comprehensive documentation

### 🚧 In Progress

- @tui/blessed integration tests
- Migration guide and examples
- Alpha release to npm

### 📋 Roadmap

- Phase 4: Performance optimization
- Phase 5: Polish and release preparation
- Phase 7: blessed-contrib integration
- Phase 8: Declarative UI APIs (post-v1.0.0)

See [CLAUDE.md](CLAUDE.md) for the complete modernization roadmap.

## 🎨 Widget Gallery

tui includes 27+ widgets for building rich terminal UIs:

**Core Widgets:**
- Screen, Box, Text, Line, Element

**Scrollable:**
- ScrollableBox, ScrollableText

**Lists:**
- List, Listbar, ListTable, FileManager

**Forms:**
- Form, Input, Textarea, Textbox, Button, Checkbox, RadioSet, RadioButton

**UI Elements:**
- ProgressBar, Loading, Log, Message, Prompt, Question

**Special:**
- BigText, Table, Layout, Terminal, Image, ANSIImage, OverlayImage, Video

## 💻 Development

### Prerequisites

- Node.js >= 22.0.0
- pnpm (required, not npm)

### Setup

```bash
# Clone the repository
git clone https://github.com/vdeantoni/tui.git
cd tui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run specific package tests
pnpm --filter @tui/core test
pnpm --filter @tui/node test
pnpm --filter @tui/browser test
```

### Monorepo Commands

```bash
pnpm build              # Build all packages
pnpm test               # Test all packages
pnpm test:coverage      # Coverage reports
pnpm lint               # Lint all packages
pnpm format             # Format all packages
pnpm clean              # Clean all build artifacts
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

See [CLAUDE.md](CLAUDE.md) for detailed architecture and development guidelines.

## 📜 License

MIT © [Vinicius De Antoni](https://github.com/vdeantoni)

Based on the original [blessed](https://github.com/chjj/blessed) library by Christopher Jeffrey.

## 🙏 Acknowledgments

- **Christopher Jeffrey** - Original blessed library
- **blessed community** - Years of testing and feedback
- **XTerm.js team** - Browser terminal emulation

## 🔗 Links

- [GitHub Repository](https://github.com/vdeantoni/tui)
- [npm: @tui/node](https://www.npmjs.com/package/@tui/node)
- [npm: @tui/browser](https://www.npmjs.com/package/@tui/browser)
- [npm: @tui/blessed](https://www.npmjs.com/package/@tui/blessed)
- [Original blessed](https://github.com/chjj/blessed)

---

**Note:** This is an alpha release. The API is stable and backward-compatible with blessed, but some features are still being finalized. We're working toward a full v1.0.0 release.
