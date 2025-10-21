/**
 * Semantic Release Configuration
 *
 * Fully automated release process:
 * 1. Analyzes conventional commits to determine version bump
 * 2. Syncs all package versions to same number
 * 3. Generates changelog
 * 4. Publishes all packages to npm (with provenance)
 * 5. Creates GitHub release with notes
 * 6. Commits version bump and changelog
 */

export default {
  branches: [
    {
      name: 'main',
      prerelease: 'alpha'
    }
  ],
  plugins: [
    // Analyze commits to determine version bump
    '@semantic-release/commit-analyzer',

    // Generate release notes from commits
    '@semantic-release/release-notes-generator',

    // Update CHANGELOG.md
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md'
    }],

    // Execute custom scripts for monorepo handling
    ['@semantic-release/exec', {
      // Before publishing: sync all package versions
      prepareCmd: 'node scripts/sync-versions.js ${nextRelease.version}',
      // Publish all packages to npm
      publishCmd: 'node scripts/publish-packages.js'
    }],

    // Commit version bump and changelog back to repo
    ['@semantic-release/git', {
      assets: [
        'package.json',
        'packages/*/package.json',
        'pnpm-lock.yaml',
        'CHANGELOG.md'
      ],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],

    // Create GitHub release with notes
    '@semantic-release/github'
  ]
};
