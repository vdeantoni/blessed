# Contributing to tui

Thank you for your interest in contributing to tui! This document provides guidelines and information for contributors.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vdeantoni/unblessed.git
cd tui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

## 📋 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages. This enables automatic versioning and changelog generation.

### Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc)
- `refactor`: Code refactoring (no feat or fix)
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system or dependencies
- `ci`: CI/CD changes
- `chore`: Other changes (no production code)
- `revert`: Reverts a previous commit

**Breaking changes:** Add `!` after type or `BREAKING CHANGE:` in footer (major version bump)

### Scopes

- `core` - @unblessed/core
- `node` - @unblessed/node
- `blessed` - @unblessed/blessed
- `browser` - @unblessed/browser
- `deps` - Dependency updates
- `ci` - CI/CD
- `dx` - Developer experience
- `docs` - Documentation

### Examples

```bash
# Feature (minor version: 1.0.0 → 1.1.0)
feat(core): add new widget type

# Bug fix (patch version: 1.0.0 → 1.0.1)
fix(browser): resolve xterm rendering issue

# Breaking change (major version: 1.0.0 → 2.0.0)
feat(core)!: redesign widget API

BREAKING CHANGE: Widget initialization now requires explicit runtime injection
```

## 🔄 Pull Request Process

1. **Fork & Branch**
   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make Changes**
   - Write code following existing patterns
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit**
   ```bash
   git commit -m "feat(core): add awesome feature"
   ```
   - Commits are validated automatically (commitlint)
   - Follow conventional commit format

4. **Test Locally**
   ```bash
   pnpm build
   pnpm test
   pnpm lint
   ```

5. **Push & Create PR**
   ```bash
   git push origin feat/my-new-feature
   ```
   - Create PR on GitHub
   - Fill out PR template
   - Wait for CI checks to pass

6. **Review & Merge**
   - Address review feedback
   - Once approved, maintainer will merge
   - **Release is automatic** - no manual steps!

## 📦 Monorepo Structure

```
tui/
├── packages/
│   ├── blessed/          # Legacy blessed (Node.js)
│   ├── blessed-browser/  # Legacy blessed (Browser)
│   ├── tui-core/         # Platform-agnostic core
│   ├── tui-node/         # Node.js runtime adapter
│   ├── tui-blessed/      # Blessed API compatibility
│   └── tui-browser/      # Browser runtime adapter
├── apps/                 # Future: docs, examples
└── .github/workflows/    # CI/CD automation
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

### E2E Tests (Browser)
```bash
# Run Playwright tests
pnpm --filter @unblessed/browser test:e2e
```

## 🎯 Development Workflow

### Working on a Package

```bash
# Build specific package
pnpm --filter @unblessed/core build

# Watch mode
pnpm --filter @unblessed/core build:watch

# Test specific package
pnpm --filter @unblessed/core test
```

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter @unblessed/core add some-package

# Add dev dependency to workspace root
pnpm add -Dw some-dev-tool
```

## 🔒 Code Quality

All PRs must pass:
- ✅ Linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Tests (Vitest + Playwright)
- ✅ Build (all packages)
- ✅ Commit message format (Commitlint)

## 🚢 Release Process

**Releases are 100% automated!**

1. Your PR gets merged to `main`
2. Semantic-release analyzes commits
3. Determines version bump from commit types
4. Updates all package versions (stays in sync)
5. Generates CHANGELOG.md
6. Publishes to npm (with provenance ✓)
7. Creates GitHub release
8. Done! 🎉

See [RELEASE.md](./RELEASE.md) for details.

## 📝 Documentation

- Update README.md for new features
- Add JSDoc comments for public APIs
- Update SETUP_GUIDE.md for infrastructure changes

## ❓ Questions?

- 💬 [GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)
- 🐛 [Report Issues](https://github.com/vdeantoni/unblessed/issues)
- 📧 Email: vdeantoni@gmail.com

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
