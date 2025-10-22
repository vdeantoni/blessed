/**
 * Golden Snapshot Utilities for VRT
 *
 * Provides reusable golden snapshot workflow that packages can use
 * in their test helpers.
 */

import type { VRTRecording, VRTComparisonResult } from './types.js';
import { VRTComparator } from './comparator.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

/**
 * Result of golden snapshot comparison
 */
export interface GoldenComparisonResult {
  /** Whether test should pass (golden created, updated, or matched) */
  pass: boolean;
  /** Action taken (created, updated, matched, or failed) */
  action: 'created' | 'updated' | 'matched' | 'failed';
  /** Detailed comparison result (only present on failed) */
  comparisonResult?: VRTComparisonResult;
  /** Formatted error message (only present on failed) */
  errorMessage?: string;
}

/**
 * Save a golden snapshot to file
 *
 * Automatically creates directories if they don't exist.
 *
 * @param goldenPath - Path to save the golden snapshot
 * @param recording - VRT recording to save
 *
 * @example
 * ```typescript
 * saveGoldenSnapshot('__tests__/fixtures/box.vrt.json', recording);
 * ```
 */
export function saveGoldenSnapshot(goldenPath: string, recording: VRTRecording): void {
  // Ensure directory exists
  const dir = dirname(goldenPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Write golden snapshot with pretty formatting
  const json = JSON.stringify(recording, null, 2);
  writeFileSync(goldenPath, json, 'utf8');
}

/**
 * Compare recording with golden snapshot and handle the complete workflow
 *
 * This function handles:
 * - Creating golden snapshot on first run
 * - Updating golden when UPDATE_SNAPSHOTS=1
 * - Comparing with golden on normal runs
 * - Formatting detailed error messages on mismatch
 *
 * @param fixturePath - Path to golden snapshot file
 * @param recording - Current recording to compare
 * @param testName - Name of the test (for error messages)
 * @returns Result indicating whether test should pass and why
 *
 * @example
 * ```typescript
 * const result = compareWithGolden(
 *   '__tests__/fixtures/box.vrt.json',
 *   recording,
 *   'box renders correctly'
 * );
 *
 * if (!result.pass) {
 *   throw new Error(result.errorMessage);
 * }
 * ```
 */
export function compareWithGolden(
  fixturePath: string,
  recording: VRTRecording,
  testName: string
): GoldenComparisonResult {
  const updateGolden = process.env.UPDATE_SNAPSHOTS === '1';

  // Update mode: save and return success
  if (updateGolden) {
    saveGoldenSnapshot(fixturePath, recording);
    console.log(`  ✅ Updated golden snapshot: ${fixturePath}`);
    return { pass: true, action: 'updated' };
  }

  // First run: create golden and return success
  if (!existsSync(fixturePath)) {
    saveGoldenSnapshot(fixturePath, recording);
    console.log(`  ⚠️  Created new golden snapshot: ${fixturePath}`);
    return { pass: true, action: 'created' };
  }

  // Normal run: compare with golden
  const comparisonResult = VRTComparator.compare(fixturePath, recording);

  if (comparisonResult.match) {
    return { pass: true, action: 'matched' };
  }

  // Failed: format detailed error message
  const errorMsg = [
    `VRT snapshot mismatch for: ${testName}`,
    `  Total frames: ${comparisonResult.totalFrames}`,
    `  Matched: ${comparisonResult.matchedFrames}`,
    `  Different: ${comparisonResult.differentFrames}`,
    `  Different frame indices: ${comparisonResult.differentFrameIndices.join(', ')}`,
  ];

  if (comparisonResult.differences && comparisonResult.differences.length > 0) {
    const firstDiff = comparisonResult.differences[0];
    errorMsg.push(`\nFirst difference (frame ${firstDiff.frameIndex}):`);
    errorMsg.push(`  Expected ${firstDiff.expected.length} chars, got ${firstDiff.actual.length} chars`);
    errorMsg.push(`  ${firstDiff.diffCount} characters differ`);

    if (firstDiff.diff) {
      errorMsg.push(`\nDiff preview:`);
      errorMsg.push(firstDiff.diff);
    }
  }

  errorMsg.push(`\nTo update snapshot: UPDATE_SNAPSHOTS=1 pnpm test`);

  return {
    pass: false,
    action: 'failed',
    comparisonResult,
    errorMessage: errorMsg.join('\n'),
  };
}
