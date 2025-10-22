/**
 * VRT Comparator - Compare VRT recordings for regression testing
 */

import type {
  VRTRecording,
  VRTComparatorOptions,
  VRTComparisonResult,
  VRTFrameDifference,
} from './types.js';
import { readFileSync } from 'fs';

/**
 * VRTComparator compares two VRT recordings to detect visual regressions.
 *
 * @example
 * ```typescript
 * const result = VRTComparator.compare(
 *   './golden.vrt.json',
 *   './current.vrt.json'
 * );
 *
 * if (!result.match) {
 *   console.log(`${result.differentFrames} frames differ`);
 *   result.differences?.forEach(diff => {
 *     console.log(`Frame ${diff.frameIndex}: ${diff.diffCount} chars different`);
 *   });
 * }
 * ```
 */
export class VRTComparator {
  /**
   * Compare two VRT recordings
   * @param expected - Path to expected recording or VRTRecording object
   * @param actual - Path to actual recording or VRTRecording object
   * @param options - Comparison options
   * @returns Comparison result
   */
  static compare(
    expected: string | VRTRecording,
    actual: string | VRTRecording,
    options: VRTComparatorOptions = {}
  ): VRTComparisonResult {
    const expectedRecording = typeof expected === 'string'
      ? JSON.parse(readFileSync(expected, 'utf8'))
      : expected;

    const actualRecording = typeof actual === 'string'
      ? JSON.parse(readFileSync(actual, 'utf8'))
      : actual;

    return this.compareRecordings(expectedRecording, actualRecording, options);
  }

  /**
   * Compare two VRTRecording objects
   * @param expected - Expected recording
   * @param actual - Actual recording
   * @param options - Comparison options
   * @returns Comparison result
   */
  static compareRecordings(
    expected: VRTRecording,
    actual: VRTRecording,
    options: VRTComparatorOptions = {}
  ): VRTComparisonResult {
    const {
      threshold = 0,
      ignoreColors = false,
      ignoreWhitespace = false,
    } = options;

    // Check if dimensions match
    if (
      expected.dimensions.cols !== actual.dimensions.cols ||
      expected.dimensions.rows !== actual.dimensions.rows
    ) {
      return {
        match: false,
        totalFrames: Math.max(expected.frames.length, actual.frames.length),
        matchedFrames: 0,
        differentFrames: Math.max(expected.frames.length, actual.frames.length),
        differentFrameIndices: [],
        differences: [{
          frameIndex: -1,
          expected: `${expected.dimensions.cols}x${expected.dimensions.rows}`,
          actual: `${actual.dimensions.cols}x${actual.dimensions.rows}`,
          diffCount: -1,
          diff: 'Dimension mismatch',
        }],
      };
    }

    // Check if frame counts match
    if (expected.frames.length !== actual.frames.length) {
      return {
        match: false,
        totalFrames: Math.max(expected.frames.length, actual.frames.length),
        matchedFrames: 0,
        differentFrames: Math.max(expected.frames.length, actual.frames.length),
        differentFrameIndices: [],
        differences: [{
          frameIndex: -1,
          expected: `${expected.frames.length} frames`,
          actual: `${actual.frames.length} frames`,
          diffCount: -1,
          diff: 'Frame count mismatch',
        }],
      };
    }

    // Compare frames
    const differences: VRTFrameDifference[] = [];
    const differentFrameIndices: number[] = [];
    let matchedFrames = 0;

    for (let i = 0; i < expected.frames.length; i++) {
      const diff = this.compareFrames(
        expected.frames[i],
        actual.frames[i],
        { threshold, ignoreColors, ignoreWhitespace }
      );

      if (diff.diffCount === 0) {
        matchedFrames++;
      } else {
        differentFrameIndices.push(i);
        differences.push({
          frameIndex: i,
          expected: expected.frames[i].screenshot,
          actual: actual.frames[i].screenshot,
          diffCount: diff.diffCount,
          diff: diff.diff,
        });
      }
    }

    return {
      match: differences.length === 0,
      totalFrames: expected.frames.length,
      matchedFrames,
      differentFrames: differences.length,
      differentFrameIndices,
      differences: differences.length > 0 ? differences : undefined,
    };
  }

  /**
   * Compare two frames
   * @param expected - Expected frame
   * @param actual - Actual frame
   * @param options - Comparison options
   * @returns Difference information
   */
  private static compareFrames(
    expected: { screenshot: string },
    actual: { screenshot: string },
    options: VRTComparatorOptions
  ): { diffCount: number; diff?: string } {
    let expectedStr = expected.screenshot;
    let actualStr = actual.screenshot;

    // Apply comparison options
    if (options.ignoreColors) {
      expectedStr = this.stripAnsiColors(expectedStr);
      actualStr = this.stripAnsiColors(actualStr);
    }

    if (options.ignoreWhitespace) {
      expectedStr = expectedStr.replace(/\s+/g, ' ').trim();
      actualStr = actualStr.replace(/\s+/g, ' ').trim();
    }

    // Exact match check
    if (expectedStr === actualStr) {
      return { diffCount: 0 };
    }

    // Count differences
    const diffCount = this.countDifferences(expectedStr, actualStr);

    // Check if within threshold
    if (options.threshold !== undefined && diffCount <= options.threshold) {
      return { diffCount: 0 };
    }

    // Generate basic diff for debugging
    const diff = this.generateSimpleDiff(expectedStr, actualStr);

    return { diffCount, diff };
  }

  /**
   * Strip ANSI color codes from string
   * @param str - String with ANSI codes
   * @returns String without ANSI codes
   */
  private static stripAnsiColors(str: string): string {
    // Remove all SGR (Select Graphic Rendition) codes
    return str.replace(/\x1b\[[0-9;]*m/g, '');
  }

  /**
   * Count character differences between two strings
   * @param str1 - First string
   * @param str2 - Second string
   * @returns Number of different characters
   */
  private static countDifferences(str1: string, str2: string): number {
    const maxLen = Math.max(str1.length, str2.length);
    let diffCount = 0;

    for (let i = 0; i < maxLen; i++) {
      if (str1[i] !== str2[i]) {
        diffCount++;
      }
    }

    return diffCount;
  }

  /**
   * Generate a simple text diff (first 200 chars of each)
   * @param expected - Expected string
   * @param actual - Actual string
   * @returns Diff string
   */
  private static generateSimpleDiff(expected: string, actual: string): string {
    const maxPreview = 200;
    const expPreview = expected.substring(0, maxPreview);
    const actPreview = actual.substring(0, maxPreview);

    return `Expected (${expected.length} chars):\n${expPreview}\n\nActual (${actual.length} chars):\n${actPreview}`;
  }
}
