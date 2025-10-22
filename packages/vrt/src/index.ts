/**
 * @unblessed/vrt - Visual Regression Testing for Terminal UIs
 *
 * Provides tools for recording, playing back, and comparing terminal UI screenshots
 * to detect visual regressions in @unblessed applications.
 *
 * @example
 * ```typescript
 * import { VRTRecorder, VRTPlayer, VRTComparator } from '@unblessed/vrt';
 * import { Screen, Box } from '@unblessed/node';
 *
 * // Record a session
 * const screen = new Screen({ smartCSR: true });
 * const recorder = new VRTRecorder(screen);
 * recorder.start();
 * // ... interact with UI ...
 * const recording = recorder.stop();
 *
 * // Play it back
 * const player = new VRTPlayer(recording);
 * await player.play({ writeToStdout: true });
 *
 * // Compare with golden snapshot
 * const result = VRTComparator.compare('./golden.vrt.json', recording);
 * console.log(`Match: ${result.match}`);
 * ```
 */

export { VRTRecorder } from "./recorder.js";
export { VRTPlayer } from "./player.js";
export { VRTComparator } from "./comparator.js";
export { saveGoldenSnapshot, compareWithGolden } from "./golden.js";
export type { GoldenComparisonResult } from "./golden.js";

export type {
  VRTFrame,
  VRTRecording,
  VRTRecorderOptions,
  VRTPlayerOptions,
  VRTComparatorOptions,
  VRTComparisonResult,
  VRTFrameDifference,
} from "./types.js";
