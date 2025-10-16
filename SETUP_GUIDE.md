# tui Monorepo Complete Setup Guide

**Goal:** Maximum automation CICD with unified versioning, npm publishing with provenance, GitHub releases, and excellent DX.

## Architecture Overview

### Monorepo Structure
```
tui/
├── packages/
│   ├── blessed/          # Legacy blessed (v1.0.0-alpha.22)
│   ├── blessed-browser/  # Browser runtime (alpha.1)
│   ├── tui-core/         # Platform-agnostic core
│   ├── tui-node/         # Node.js runtime adapter
│   ├── tui-blessed/      # Blessed API compatibility wrapper
│   └── tui-browser/      # Browser runtime adapter (xterm.js)
├── apps/                 # Future: docs, examples
└── .github/workflows/    # CICD automation
```

### Versioning Strategy
- **Monorepo-level semantic versioning**
- All packages stay in sync (same version number)
- Automated from conventional commits
- No manual version bumps

---

## Phase 1: Repository URL Updates

### Files to Update
Update `github.com/vdeantoni/blessed` → `github.com/vdeantoni/tui` in:

- [x] Root `package.json`
- [x] `packages/blessed/package.json`
- [x] `packages/blessed-browser/package.json`
- [x] `packages/blessed-browser/README.md`
- [x] `packages/tui-core/package.json`
- [x] `packages/tui-node/package.json`
- [x] `packages/tui-blessed/package.json`
- [x] `packages/tui-browser/package.json`

---

## Phase 2: DX Foundation (Linting, Testing, Formatting)

### ESLint Configuration
Copy `packages/blessed/eslint.config.js` to all tui packages with adaptations:

**tui-core** (platform-neutral):
```js
// Remove Node.js globals, keep minimal config
ignores: ['dist/**', 'node_modules/**', '.turbo/**']
```

**tui-node, tui-blessed** (Node.js):
```js
// Same as blessed, includes Node.js globals
```

**tui-browser** (Browser):
```js
// Add DOM globals: window, document, etc.
platform: 'browser'
lib: ['ES2020', 'DOM']
```

### Vitest Configuration

**tui-core, tui-node, tui-blessed:**
```ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    }
  }
});
```

**tui-browser:**
```ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/unit/**/*.test.ts'],
    exclude: ['__tests__/e2e/**/*']
  }
});
```

### Playwright Configuration (tui-browser only)
```ts
export default defineConfig({
  testDir: './__tests__/e2e',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000
  }
});
```

### Test Structure
```
packages/tui-*/
└── __tests__/
    ├── unit/
    │   └── index.test.ts
    └── e2e/  (browser only)
        └── basic.spec.ts
```

---

## Phase 3: Version Synchronization & NPM Publishing

### 1. Sync Package Versions
Choose starting version: `1.0.0-alpha.1`

Update all `package.json`:
```json
{
  "version": "1.0.0-alpha.1"
}
```

### 2. Add publishConfig (All 6 Packages)
```json
{
  "publishConfig": {
    "access": "public",
    "provenance": true,
    "registry": "https://registry.npmjs.org/"
  }
}
```

**What provenance does:**
- Creates cryptographic proof package was built from source
- Links package to exact GitHub commit/workflow
- Displays verified checkmark ✓ on npm.js
- Required for enterprise adoption
- Free security feature

---

## Phase 4: Semantic Release Setup

### Install Packages
```bash
pnpm add -Dw \
  semantic-release \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/github \
  @semantic-release/exec \
  @commitlint/cli \
  @commitlint/config-conventional \
  husky
```

### Configuration Files

**`.releaserc.js`** (Root):
```js
module.exports = {
  branches: ['main', 'master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md'
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'node scripts/sync-versions.js ${nextRelease.version}',
      publishCmd: 'node scripts/publish-packages.js'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'packages/*/package.json', 'CHANGELOG.md', 'pnpm-lock.yaml'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    '@semantic-release/github'
  ]
};
```

**`commitlint.config.js`**:
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'scope-enum': [2, 'always', [
      'core', 'node', 'blessed', 'browser',
      'deps', 'release', 'ci', 'dx'
    ]]
  }
};
```

**`.husky/commit-msg`**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

### Custom Scripts

**`scripts/sync-versions.js`**:
```js
// Updates all package.json to same version
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const version = process.argv[2];
const packagePaths = glob.sync('packages/*/package.json');

packagePaths.forEach(pkgPath => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
});

console.log(`✅ Synced ${packagePaths.length} packages to v${version}`);
```

**`scripts/publish-packages.js`**:
```js
// Publishes packages in dependency order
const { execSync } = require('child_process');

const packages = [
  'tui-core',      // No deps
  'tui-node',      // Depends on tui-core
  'tui-browser',   // Depends on tui-core
  'tui-blessed',   // Depends on tui-node
  'blessed',       // Independent
  'blessed-browser' // Independent
];

packages.forEach(pkg => {
  console.log(`📦 Publishing @${pkg}...`);
  execSync(`pnpm --filter ${pkg} publish --provenance --access public --no-git-checks`, {
    stdio: 'inherit'
  });
});

console.log('✅ All packages published!');
```

---

## Phase 5: GitHub Actions Workflows

### A. PR Validation (`.github/workflows/pr.yml`)

```yaml
name: PR Validation

on:
  pull_request:
    branches: [main, master]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Validate commits
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to HEAD --verbose

      - name: Lint
        run: pnpm lint:check

      - name: Type check
        run: pnpm exec tsc --noEmit

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### B. Automated Release (`.github/workflows/release.yml`)

```yaml
name: Release

on:
  push:
    branches: [main, master]

permissions:
  contents: write
  id-token: write  # For npm provenance
  issues: write
  pull-requests: write

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test

      - name: Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

### C. Security Scanning (`.github/workflows/codeql.yml`)

```yaml
name: CodeQL

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write

    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

### D. Bundle Size Tracking (`.github/workflows/size.yml`)

```yaml
name: Bundle Size

on:
  pull_request:
    branches: [main, master]

jobs:
  size:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Check bundle size
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

### E. Dependency Updates (`.github/dependabot.yml`)

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: daily
    open-pull-requests-limit: 10
    groups:
      production-dependencies:
        dependency-type: production
        update-types:
          - minor
          - patch

  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: weekly
```

---

## Phase 6: Repository Configuration

### Branch Protection Rules
Navigate to: Settings → Branches → Add rule for `main`

**Enable:**
- ✅ Require a pull request before merging
  - Require 1 approval
  - Dismiss stale reviews
- ✅ Require status checks to pass:
  - `validate` (from pr.yml)
  - `commitlint`
  - `lint`
  - `test`
  - `build`
- ✅ Require linear history
- ✅ Do not allow bypassing the above settings
- ✅ Restrict pushes that create matching branches

### GitHub Secrets

**Required:**
- `NPM_TOKEN` - npm automation token
  - Generate at: https://www.npmjs.com/settings/~/tokens
  - Type: Automation
  - Enable: Provenance

**Optional:**
- `CODECOV_TOKEN` - For coverage reports
- `TURBO_TOKEN` - For Turbo remote caching

### NPM Token Setup
```bash
# 1. Login to npm
npm login

# 2. Generate automation token (with provenance)
npm token create --type=automation

# 3. Add to GitHub Secrets as NPM_TOKEN
```

---

## Phase 7: Documentation

### CONTRIBUTING.md
```md
# Contributing to tui

## Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):

feat(core): add new widget type
fix(browser): resolve xterm rendering issue
docs(readme): update installation steps
chore(deps): update dependencies

## Process
1. Fork & create branch
2. Make changes with conventional commits
3. Run `pnpm test` and `pnpm lint`
4. Submit PR
5. Automated release on merge!
```

### RELEASE.md
```md
# Release Process

## Fully Automated! 🎉

Our releases are 100% automated using semantic-release:

1. **Commit** with conventional format (feat:, fix:, etc.)
2. **Merge** PR to main
3. **Automatic**:
   - Version determination from commits
   - All packages bumped to same version
   - Changelog generation
   - npm publish (with provenance ✓)
   - GitHub release creation
   - Git tags

## No Manual Steps Required

Semantic release handles everything based on commit messages:
- `fix:` → Patch version (1.0.0 → 1.0.1)
- `feat:` → Minor version (1.0.0 → 1.1.0)
- `feat!:` or `BREAKING CHANGE:` → Major version (1.0.0 → 2.0.0)
```

### README.md Updates
Add badges at top:
```md
# tui

[![Build](https://github.com/vdeantoni/tui/workflows/Tests/badge.svg)](https://github.com/vdeantoni/tui/actions)
[![Coverage](https://codecov.io/gh/vdeantoni/tui/branch/main/graph/badge.svg)](https://codecov.io/gh/vdeantoni/tui)
[![npm version](https://badge.fury.io/js/@tui%2Fcore.svg)](https://www.npmjs.com/package/@tui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Terminal UI library with runtime dependency injection

✅ **NPM Provenance**: All packages published with cryptographic provenance verification
```

---

## Phase 8: Testing & Validation

### Pre-Flight Checklist
```bash
# 1. Install all dependencies
pnpm install

# 2. Build all packages
pnpm build

# 3. Run linting
pnpm lint

# 4. Run tests
pnpm test

# 5. Check commit message format
echo "feat(test): test commit" | npx commitlint

# 6. Dry-run semantic release
GITHUB_TOKEN=xxx NPM_TOKEN=xxx npx semantic-release --dry-run

# 7. Test PR workflow
# Create draft PR and verify all checks pass

# 8. Test release workflow
# Merge to test branch and verify automation
```

---

## Expected Results

### Automation Achieved ✅
- [x] Commit → Auto-release (zero manual steps)
- [x] All packages same version always
- [x] npm publish with provenance (verified ✓)
- [x] GitHub releases with changelog
- [x] Security scanning (CodeQL)
- [x] Bundle size tracking
- [x] Dependency updates (Dependabot)

### Developer Experience ✅
- [x] Lint/format/test everywhere
- [x] Pre-commit hooks validate commits
- [x] Fast builds (Turbo cache)
- [x] Type safety (strict TypeScript)
- [x] Consistent tooling

### Security & Quality ✅
- [x] npm provenance attestation
- [x] CodeQL security scanning
- [x] Branch protection enforced
- [x] Signed packages from verified CI
- [x] Transparent supply chain

---

## Troubleshooting

### Semantic Release Not Publishing
- Check `NPM_TOKEN` is automation token
- Verify `id-token: write` permission in workflow
- Ensure commit messages follow conventional format

### Provenance Failed
- Check `id-token: write` permission
- Verify npm token has provenance enabled
- Ensure publishing from GitHub Actions

### Tests Failing in CI
- Check Playwright browsers installed
- Verify Node.js version matches (22.x)
- Check frozen lockfile matches

---

## Maintenance

### Adding New Packages
1. Create in `packages/` directory
2. Add to `scripts/publish-packages.js` (dependency order)
3. Add publishConfig to package.json
4. Add test configs (eslint, vitest)
5. Version will auto-sync on next release

### Updating Dependencies
- Dependabot creates PRs automatically
- Review and merge (or auto-merge patch updates)
- Tests run automatically

### Emergency Release
If automation fails:
```bash
# Manual release (avoid if possible)
npm run build
node scripts/sync-versions.js 1.2.3
node scripts/publish-packages.js
git tag v1.2.3
git push --tags
```

---

## Resources

- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [NPM Provenance](https://docs.npmjs.com/generating-provenance-statements)
- [Turborepo](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

**Setup Date:** 2025-10-15
**Maintained By:** Vinicius De Antoni
**License:** MIT
