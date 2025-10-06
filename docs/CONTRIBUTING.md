# Contributing to Blessed

Thank you for your interest in contributing to the blessed modernization effort! This document provides guidelines and instructions for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Code Style](#code-style)
- [TypeScript Migration](#typescript-migration)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/vdeantoni/blessed.git
cd blessed

# Install dependencies
pnpm install

# Run tests to verify setup
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run benchmarks
pnpm run bench
```

## Development Workflow

### Project Structure

```
blessed/
├── lib/              # Source code (currently JavaScript, gradually migrating to TypeScript)
│   ├── blessed.js    # Main entry point
│   ├── widgets/      # Widget implementations
│   ├── helpers.js    # Utility functions
│   └── ...
├── __tests__/        # Modern test suite (Vitest)
│   ├── helpers/      # Test utilities and mocks
│   ├── lib/          # Tests for lib/ modules
│   └── widgets/      # Tests for widgets
├── benchmarks/       # Performance benchmarks
├── dist/             # Build output (generated)
└── example/          # Example applications
```

### Available Commands

```bash
# Building
pnpm run build              # Build CJS + ESM outputs
pnpm run build:watch        # Watch mode for development
pnpm run type-check         # Type check without building

# Testing
pnpm test                   # Run tests in watch mode
pnpm run test:coverage      # Run tests with coverage report
pnpm run test:ui            # Run tests with UI

# Code Quality
pnpm run lint               # Check code with ESLint
pnpm run lint:fix           # Fix auto-fixable lint issues
pnpm run format             # Format code with Prettier
pnpm run format:check       # Check if code is formatted

# Benchmarking
pnpm run bench              # Run performance benchmarks
pnpm run bench:gc           # Run with GC exposed for memory accuracy
```

## Testing Guidelines

### Testing Philosophy

**Tests MUST come before code changes.** We follow a test-first approach to ensure no regressions during modernization.

### Test Structure

- Use Vitest for all tests
- Place tests in `__tests__/` mirroring the `lib/` structure
- Use mock utilities from `__tests__/helpers/mock.js`

### Writing Tests

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import Widget from '../../lib/widgets/widget.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Widget', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  it('should do something', () => {
    const widget = new Widget({ screen });
    expect(widget).toBeDefined();
  });
});
```

### Test Coverage

- Target: 70% overall coverage
- Pure functions: 90%+ coverage
- Widgets: 70%+ coverage
- Core components: 60%+ coverage

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test __tests__/widgets/box.test.js

# Run with coverage
pnpm run test:coverage
```

## Code Style

### Formatting

- We use **Prettier** for consistent formatting
- Configuration in `.prettierrc`
- Run `pnpm run format` before committing
- CI will check formatting

### Linting

- We use **ESLint** with TypeScript support
- Configuration in `.eslintrc.js`
- Run `pnpm run lint` before committing
- Use `pnpm run lint:fix` for auto-fixes

### Code Conventions

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **semicolons**
- Use **arrow functions** for callbacks when appropriate
- Use **const/let**, never **var** (in new code)

## TypeScript Migration

We are gradually migrating from JavaScript to TypeScript using the following strategy:

### Migration Principles

1. **Tests first**: Never convert code without tests
2. **Incremental**: Convert one module at a time
3. **Keep tests green**: All tests must pass after each conversion
4. **Strict types**: Use strict TypeScript settings, avoid `any`

### Conversion Order

Per AGENTS.md Phase 3:

1. Helper modules (helpers.js, colors.js)
2. Data/config modules (unicode.js, keys.js, events.js)
3. Simple widgets (box.js, text.js, line.js, button.js)
4. Complex widgets (list.js, form.js, table.js)
5. Core components (node.js, element.js, screen.js)
6. Low-level (program.js, tput.js - may remain .js with .d.ts)

### Converting a Module

```bash
# 1. Ensure tests exist and pass
pnpm test __tests__/lib/helpers.test.js

# 2. Rename .js to .ts
mv lib/helpers.js lib/helpers.ts

# 3. Fix type errors incrementally
pnpm run type-check

# 4. Ensure tests still pass
pnpm test __tests__/lib/helpers.test.js

# 5. Update imports in dependent files
# 6. Commit the conversion
```

### Type Checking

```bash
# Check types without building
pnpm run type-check

# Check specific file
npx tsc --noEmit lib/helpers.ts
```

## Pull Request Process

### Before Submitting

1. ✅ All tests pass: `pnpm test`
2. ✅ Code is formatted: `pnpm run format`
3. ✅ Code is linted: `pnpm run lint`
4. ✅ Type check passes: `pnpm run type-check` (if applicable)
5. ✅ Build succeeds: `pnpm run build`
6. ✅ Coverage maintained or improved

### PR Title Format

```
<type>: <description>

Examples:
feat: Add new widget for progress indicators
fix: Correct rendering issue in list widget
test: Add tests for textbox widget
refactor: Convert helpers.js to TypeScript
docs: Update API documentation
```

### PR Description

Include:
- What changed and why
- Test coverage impact
- Performance impact (if applicable)
- Breaking changes (if any)
- Related issues

### Review Process

- PRs require passing CI checks
- Code review from maintainer
- No decrease in test coverage
- No performance regressions >10%

## Modernization Roadmap

See `AGENTS.md` for the complete modernization roadmap. We are currently in:

- **Phase 1**: Testing Infrastructure ✅ (95% complete)
- **Phase 2**: Build System & Development Experience 🔄 (in progress)
- **Phase 3**: TypeScript Conversion (upcoming)

## Questions?

- Open an issue for questions
- Check `AGENTS.md` for detailed roadmap
- Review existing tests for examples

## License

By contributing, you agree that your contributions will be licensed under the MIT License.