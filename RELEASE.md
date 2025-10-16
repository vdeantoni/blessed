# Release Process

## 🎉 Fully Automated Releases

tui uses **semantic-release** for 100% automated publishing. There are **zero manual steps** - everything happens automatically when you merge to `main`.

## How It Works

### 1. Developer Commits

Developer writes code and commits with conventional format:

```bash
git commit -m "feat(core): add new widget API"
git commit -m "fix(browser): resolve rendering bug"
git commit -m "docs: update installation guide"
```

### 2. Create Pull Request

Developer creates PR, CI validates:
- ✅ Commit messages follow convention
- ✅ Code passes linting
- ✅ Tests pass
- ✅ Build succeeds

### 3. Merge to Main

Once approved and merged, **automation takes over**:

```
📋 Semantic Release analyzes commits
   ↓
🔢 Determines version bump
   • fix: → patch (1.0.0 → 1.0.1)
   • feat: → minor (1.0.0 → 1.1.0)
   • BREAKING CHANGE: → major (1.0.0 → 2.0.0)
   ↓
🔄 Syncs ALL package versions
   • All 6 packages get same version
   • Ensures monorepo stays in sync
   ↓
📝 Generates CHANGELOG.md
   • Groups changes by type
   • Includes commit messages & authors
   ↓
📦 Publishes to npm
   • All packages published in order
   • With provenance attestation ✓
   • Cryptographically signed
   ↓
🏷️ Creates GitHub Release
   • Release notes from commits
   • Git tag (v1.2.3)
   • Links to issues/PRs
   ↓
✅ Commits version bump
   • Updates package.json files
   • Updates CHANGELOG.md
   • Commits with [skip ci]
   ↓
🎉 DONE!
```

## Version Determination

Semantic-release analyzes **all commits** since last release:

### Patch Version (1.0.0 → 1.0.1)
```bash
fix(core): resolve memory leak
perf(browser): improve render speed
```

### Minor Version (1.0.0 → 1.1.0)
```bash
feat(core): add new Box widget
feat(node): support custom runtime
```

### Major Version (1.0.0 → 2.0.0)
```bash
feat(core)!: redesign widget API

BREAKING CHANGE: Widget constructor signature changed
```

## Unified Versioning

**All packages always have the same version.**

When ANY package changes:
- ALL packages are bumped to new version
- ALL packages are published
- ONE GitHub release for entire monorepo

Example:
```
# Before release
@tui/core@1.0.0
@tui/node@1.0.0
@tui/browser@1.0.0

# After: feat(browser) commit
@tui/core@1.1.0        ← Bumped even though unchanged
@tui/node@1.1.0        ← Bumped even though unchanged
@tui/browser@1.1.0     ← Actually changed

# All stay in sync!
```

## NPM Provenance

Every package published includes **cryptographic provenance**:

✓ Signed attestation proving:
- Package built from exact source code
- Built in GitHub Actions workflow
- Not tampered with since build
- Verifiable on npm.js (✓ checkmark)

## Manual Intervention

**None required!** But if needed:

### Trigger Release Manually
```bash
# Push empty commit to main
git commit --allow-empty -m "chore(release): trigger release"
git push origin main
```

### Emergency Patch
```bash
# Create hotfix branch
git checkout -b hotfix/critical-bug
git commit -m "fix(core): critical security issue"
git push origin hotfix/critical-bug

# Create PR to main, merge → auto-release
```

### Skip Release
```bash
# Add [skip release] to commit message
git commit -m "chore: update docs [skip release]"
```

## Release History

View all releases:
- 📦 [npm packages](https://www.npmjs.com/search?q=%40tui)
- 🏷️ [GitHub releases](https://github.com/vdeantoni/tui/releases)
- 📝 [CHANGELOG.md](./CHANGELOG.md)

## Debugging Releases

If automation fails:

1. **Check GitHub Actions**
   - View [release workflow](https://github.com/vdeantoni/tui/actions/workflows/release.yml)
   - Look for errors in semantic-release step

2. **Common Issues**
   - ❌ NPM_TOKEN expired → Update secret
   - ❌ No commits since last release → Nothing to release
   - ❌ Invalid commit format → Fix and re-push

3. **Dry Run Locally**
   ```bash
   # Test without publishing
   GITHUB_TOKEN=xxx NPM_TOKEN=xxx npx semantic-release --dry-run
   ```

## Release Configuration

- `.releaserc.js` - Semantic-release config
- `scripts/sync-versions.js` - Version sync script
- `scripts/publish-packages.js` - Publishing script
- `.github/workflows/release.yml` - Release workflow

## Questions?

- 📚 [Semantic Release Docs](https://semantic-release.gitbook.io/)
- 💬 [GitHub Discussions](https://github.com/vdeantoni/tui/discussions)
- 🐛 [Report Issues](https://github.com/vdeantoni/tui/issues)
