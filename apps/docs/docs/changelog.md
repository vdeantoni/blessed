---
sidebar_position: 100
---

# Changelog

Release history and version notes for unblessed.

## Latest Releases

### [1.0.0-alpha.10](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.10) (2025-10-30)

**Features:**

- **core:** Add support for dim text attribute
- **core:** Improve runtime API types

**Bug Fixes:**

- **docs:** Adjusted live demo

[View on GitHub](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.10)

---

### [1.0.0-alpha.9](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.9) (2025-10-29)

**Features:**

- **core:** Add enhanced border styling with per-side colors and addressable borders

**Bug Fixes:**

- **core:** Adjusted label style type

[View on GitHub](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.9)

---

### [1.0.0-alpha.8](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.8) (2025-10-28)

**Features:**

- **core:** Add Static and Dialog widgets with enhanced Log and Textbox
- **docs:** Add Algolia DocSearch with wide, centered search box

**Bug Fixes:**

- **ci:** Configure Codecov for monorepo coverage reporting
- **ci:** Removed test:coverage from release action

[View on GitHub](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.8)

---

### [1.0.0-alpha.7](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.7) (2025-10-28)

**Features:**

- **core:** Implement global Tab navigation with tabIndex and rest state
- **vrt:** Add CLI tools for playback, comparison, and inspection

**Bug Fixes:**

- **docs:** Add post-processing script to fix MDX curly braces in generated API docs
- **docs:** Tweak livedemo spacing and responsiveness

**BREAKING CHANGES:**

- **core:** Form keyboard navigation (keys/vi options) removed in favor of global Screen Tab navigation. Forms still support navigation via next()/previous().

[View on GitHub](https://github.com/vdeantoni/unblessed/releases/tag/v1.0.0-alpha.7)

---

## Version History

View the complete [CHANGELOG.md](https://github.com/vdeantoni/unblessed/blob/main/CHANGELOG.md) on GitHub for full version history.

## Release Channels

### Alpha (Current)

The alpha channel is for early adopters and testing:

- **Stability:** Core features stable, API may have minor changes
- **Updates:** Frequent releases with new features
- **Installation:** `npm install @unblessed/node@alpha`

### Future Channels

**Beta** - API locked, production testing

- Coming soon for v1.0 prep
- Installation: `npm install @unblessed/node@beta`

**Stable** - Production-ready releases

- Coming with v1.0
- Installation: `npm install @unblessed/node`

## Versioning

unblessed follows [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes, backward compatible

During alpha:

- Breaking changes are allowed
- Major version stays at 1.x
- Alpha tag indicates pre-release status

## Automated Releases

Releases are fully automated using [semantic-release](https://github.com/semantic-release/semantic-release):

1. Code merged to `alpha` branch
2. CI runs tests and checks
3. semantic-release analyzes commits
4. Version bumped automatically
5. Changelog generated
6. Published to npm with provenance
7. GitHub release created

## Migration Guides

When upgrading between versions:

- **Alpha to Alpha:** Check release notes for breaking changes
- **Alpha to Beta:** Migration guide will be provided
- **Beta to Stable:** Smooth upgrade, no breaking changes

## Release Schedule

- **Alpha:** Released as features are completed
- **Beta:** Planned for Q1 2026
- **v1.0 Stable:** Planned for Q2 2026

## Stay Updated

- **GitHub Releases:** [Watch repository](https://github.com/vdeantoni/unblessed)
- **npm:** `npm outdated @unblessed/node`
- **Discussions:** [GitHub Discussions](https://github.com/vdeantoni/unblessed/discussions)

## Report Issues

Found a bug in a specific version?

- [Report on GitHub Issues](https://github.com/vdeantoni/unblessed/issues)
- Include your version: `npm list @unblessed/node`
- Check if it's fixed in latest alpha

## Previous Versions

Browse all releases on the [GitHub Releases page](https://github.com/vdeantoni/unblessed/releases).
