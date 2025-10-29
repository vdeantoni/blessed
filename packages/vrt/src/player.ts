/**
 * VRT Player - Replay recorded terminal UI sessions
 */

import { readFileSync } from "fs";
import type { VRTFrame, VRTPlayerOptions, VRTRecording } from "./types.js";

/**
 * VRTPlayer replays VRT recordings for visual inspection or automated testing.
 *
 * @example
 * ```typescript
 * const player = new VRTPlayer('./test.vrt.json');
 *
 * // Play back to stdout
 * await player.play({ writeToStdout: true });
 *
 * // Process each frame
 * await player.play({
 *   onFrame: (frame, index) => {
 *     console.log(`Frame ${index}: ${frame.screenshot.length} bytes`);
 *   }
 * });
 * ```
 */
export class VRTPlayer {
  private recording: VRTRecording;

  /**
   * Create a player from a recording file or object
   * @param source - Path to VRT recording file or VRTRecording object
   */
  constructor(source: string | VRTRecording) {
    if (typeof source === "string") {
      this.recording = this.load(source);
    } else {
      this.recording = source;
    }
  }

  /**
   * Load a recording from file
   * @param filePath - Path to the VRT recording file
   * @returns Parsed VRT recording
   */
  private load(filePath: string): VRTRecording {
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  }

  /**
   * Play the recording
   * @param options - Playback options
   * @returns Promise that resolves when playback is complete
   */
  async play(options: VRTPlayerOptions = {}): Promise<void> {
    const { speed = 1.0, onFrame, writeToStdout = false } = options;

    if (this.recording.frames.length === 0) {
      return;
    }

    for (let i = 0; i < this.recording.frames.length; i++) {
      const frame = this.recording.frames[i];

      // Call frame callback if provided
      if (onFrame) {
        onFrame(frame, i);
      }

      // Write to stdout if requested
      if (writeToStdout) {
        process.stdout.write(frame.screenshot);
      }

      // Wait for next frame (respecting speed multiplier)
      if (i < this.recording.frames.length - 1) {
        const nextFrame = this.recording.frames[i + 1];
        const delay = (nextFrame.timestamp - frame.timestamp) / speed;

        if (delay > 0) {
          await this.sleep(delay);
        }
      }
    }
  }

  /**
   * Get all frames from the recording
   * @returns Array of frames
   */
  getFrames(): VRTFrame[] {
    return this.recording.frames;
  }

  /**
   * Get recording metadata
   * @returns Recording metadata
   */
  getMetadata(): VRTRecording["metadata"] {
    return this.recording.metadata;
  }

  /**
   * Get recording dimensions
   * @returns Terminal dimensions
   */
  getDimensions(): VRTRecording["dimensions"] {
    return this.recording.dimensions;
  }

  /**
   * Get a specific frame by index
   * @param index - Frame index
   * @returns The frame at the given index
   */
  getFrame(index: number): VRTFrame | undefined {
    return this.recording.frames[index];
  }

  /**
   * Sleep for specified milliseconds
   * @param ms - Milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
