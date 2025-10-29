/**
 * VRT Test Helper for @unblessed/node
 *
 * Provides utilities for creating visual regression tests with golden snapshot workflow.
 */

import { Screen } from "@unblessed/core";
import type { VRTRecording } from "@unblessed/vrt";
import { compareWithGolden } from "@unblessed/vrt";
import { EventEmitter } from "events";
import { it } from "vitest";

/**
 * Create a mock writable stream for testing
 */
function createMockOutputStream() {
  const stream = new EventEmitter() as any;
  stream.writable = true;
  stream.columns = 80;
  stream.rows = 24;
  stream.isTTY = true;
  stream.write = () => true;
  return stream;
}

/**
 * Create a VRT test that records UI rendering and compares with a golden snapshot.
 *
 * On first run or when UPDATE_SNAPSHOTS=1, creates/updates the golden baseline.
 * On normal runs, captures screenshot and compares with the golden snapshot.
 *
 * @example
 * ```typescript
 * import { createVRTTest } from '../helpers/vrt-test.js';
 * import { Box } from '@unblessed/core';
 *
 * createVRTTest('box with border renders correctly', async (screen) => {
 *   const box = new Box({
 *     parent: screen,
 *     width: 20,
 *     height: 5,
 *     border: { type: 'line' },
 *     content: 'Hello'
 *   });
 *   screen.render();
 * }, '__tests__/vrt/fixtures/box-border.vrt.json');
 * ```
 *
 * @param name - Test name
 * @param testFn - Test function that receives a screen instance
 * @param fixturePath - Path to golden snapshot file (relative to package root)
 */
export function createVRTTest(
  name: string,
  testFn: (screen: Screen) => void | Promise<void>,
  fixturePath: string,
): void {
  it(name, async () => {
    // Create mock output stream with proper dimensions
    const mockOutput = createMockOutputStream();

    // Create screen with mock output
    const screen = new Screen({
      smartCSR: true,
      output: mockOutput,
    });

    try {
      // Run test function to set up UI
      await testFn(screen);

      // Capture a single screenshot of the final rendered state
      const screenshot = screen.screenshot();

      // Create recording with single frame
      const recording: VRTRecording = {
        version: "1.0.0",
        dimensions: {
          cols: screen.cols,
          rows: screen.rows,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 0,
          frameCount: 1,
          description: name,
        },
        frames: [
          {
            screenshot,
            timestamp: 0,
          },
        ],
      };

      // Use golden snapshot workflow from @unblessed/vrt
      const result = compareWithGolden(fixturePath, recording, name);

      // Throw error if comparison failed
      if (!result.pass) {
        throw new Error(result.errorMessage);
      }
    } finally {
      // Cleanup
      screen.destroy();
    }
  });
}

/**
 * Create a multi-frame VRT test for testing interactions over time.
 *
 * Useful for testing dragging, scrolling, animations, or any UI that changes state.
 * Records multiple screenshots as the test function executes actions.
 *
 * @example
 * ```typescript
 * createMultiFrameVRTTest('box dragging', async (screen, capture) => {
 *   const box = new Box({ parent: screen, left: 10, top: 5, content: 'Drag me' });
 *   screen.render();
 *   await capture();  // Capture at position 1
 *
 *   box.left = 20;
 *   box.top = 10;
 *   screen.render();
 *   await capture();  // Capture at position 2
 * }, '__tests__/vrt/fixtures/box-dragging.vrt.json');
 * ```
 *
 * @param name - Test name
 * @param testFn - Test function that receives screen and capture callback
 * @param fixturePath - Path to golden snapshot file
 */
export function createMultiFrameVRTTest(
  name: string,
  testFn: (screen: Screen, capture: () => Promise<void>) => Promise<void>,
  fixturePath: string,
): void {
  it(name, async () => {
    const mockOutput = createMockOutputStream();
    const screen = new Screen({
      smartCSR: true,
      output: mockOutput,
    });

    const frames: Array<{ screenshot: string; timestamp: number }> = [];
    const startTime = Date.now();

    // Capture function for test to call
    const capture = async () => {
      // Small delay to ensure render completes
      await new Promise((resolve) => setTimeout(resolve, 10));
      const screenshot = screen.screenshot();
      const timestamp = Date.now() - startTime;
      frames.push({ screenshot, timestamp });
    };

    try {
      // Run test function with capture callback
      await testFn(screen, capture);

      // Create recording from captured frames
      const recording: VRTRecording = {
        version: "1.0.0",
        dimensions: {
          cols: screen.cols,
          rows: screen.rows,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: Date.now() - startTime,
          frameCount: frames.length,
          description: name,
        },
        frames,
      };

      // Use golden snapshot workflow
      const result = compareWithGolden(fixturePath, recording, name);

      if (!result.pass) {
        throw new Error(result.errorMessage);
      }
    } finally {
      screen.destroy();
    }
  });
}
