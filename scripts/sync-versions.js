#!/usr/bin/env node

/**
 * Sync all package versions to the same number
 *
 * This script is called by semantic-release before publishing.
 * It ensures all packages in the monorepo have the same version.
 *
 * Usage: node scripts/sync-versions.js <version>
 * Example: node scripts/sync-versions.js 1.2.3
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ Error: Version argument required');
  console.error('Usage: node scripts/sync-versions.js <version>');
  process.exit(1);
}

// Validate version format (semantic versioning)
const versionRegex = /^\d+\.\d+\.\d+(-[a-z0-9.]+)?$/i;
if (!versionRegex.test(newVersion)) {
  console.error(`❌ Error: Invalid version format: ${newVersion}`);
  console.error('Expected format: X.Y.Z or X.Y.Z-alpha.N');
  process.exit(1);
}

console.log(`\n🔄 Syncing all packages to version ${newVersion}...\n`);

// Find all package.json files in packages/*
const packagePaths = glob.sync('packages/*/package.json');

if (packagePaths.length === 0) {
  console.error('❌ Error: No packages found in packages/ directory');
  process.exit(1);
}

let successCount = 0;

packagePaths.forEach(pkgPath => {
  try {
    const pkgContent = readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgContent);

    const oldVersion = pkg.version;
    pkg.version = newVersion;

    // Write back with proper formatting (2 spaces, trailing newline)
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

    console.log(`  ✅ ${pkg.name}: ${oldVersion} → ${newVersion}`);
    successCount++;
  } catch (error) {
    console.error(`  ❌ Failed to update ${pkgPath}: ${error.message}`);
    process.exit(1);
  }
});

console.log(`\n✨ Successfully synced ${successCount} packages to v${newVersion}\n`);
process.exit(0);
