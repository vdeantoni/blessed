/**
 * VRT Recorder - Capture terminal UI screenshots over time
 */

import type { Screen } from '@unblessed/core';
import type {
  VRTRecording,
  VRTFrame,
  VRTRecorderOptions,
} from './types.js';
import { writeFileSync } from 'fs';

/**
 * VRTRecorder captures screen screenshots at regular intervals for visual regression testing.
 *
 * @example
 * ```typescript
 * const screen = new Screen({ smartCSR: true });
 * const recorder = new VRTRecorder(screen, {
 *   interval: 100,
 *   outputPath: './test.vrt.json',
 *   description: 'Box rendering test'
 * });
 *
 * recorder.start();
 * // ... interact with UI ...
 * const recording = await recorder.stop();
 * ```
 */
export class VRTRecorder {
  private screen: Screen;
  private options: Required<VRTRecorderOptions>;
  private frames: VRTFrame[] = [];
  private startTime: number | null = null;
  private timer: NodeJS.Timeout | null = null;
  private recording: boolean = false;

  constructor(screen: Screen, options: VRTRecorderOptions = {}) {
    this.screen = screen;
    this.options = {
      interval: options.interval ?? 100,
      outputPath: options.outputPath,  // No default - only save if explicitly provided
      description: options.description ?? 'VRT Recording',
      metadata: options.metadata ?? {},
    } as Required<VRTRecorderOptions>;
  }

  /**
   * Start recording screenshots
   */
  start(): void {
    if (this.recording) {
      throw new Error('Recording already in progress');
    }

    this.recording = true;
    this.frames = [];
    this.startTime = Date.now();

    this.timer = setInterval(() => {
      this.captureFrame();
    }, this.options.interval);
  }

  /**
   * Capture a single frame
   */
  private captureFrame(): void {
    if (!this.recording || !this.startTime) return;

    const screenshot = this.screen.screenshot();
    const timestamp = Date.now() - this.startTime;

    this.frames.push({
      screenshot,
      timestamp,
    });
  }

  /**
   * Stop recording and save to file
   * @returns The complete VRT recording
   */
  stop(): VRTRecording {
    if (!this.recording) {
      throw new Error('No recording in progress');
    }

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Capture one final frame
    this.captureFrame();

    this.recording = false;

    const duration = this.startTime ? Date.now() - this.startTime : 0;
    this.startTime = null;

    const recording: VRTRecording = {
      version: '1.0.0',
      dimensions: {
        cols: this.screen.cols,
        rows: this.screen.rows,
      },
      metadata: {
        createdAt: new Date().toISOString(),
        duration,
        frameCount: this.frames.length,
        description: this.options.description,
        ...this.options.metadata,
      },
      frames: this.frames,
    };

    // Save to file if path provided
    if (this.options.outputPath) {
      this.save(recording, this.options.outputPath);
    }

    return recording;
  }

  /**
   * Save recording to file
   * @param recording - The recording to save
   * @param outputPath - Path to save the recording
   */
  save(recording: VRTRecording, outputPath: string): void {
    const json = JSON.stringify(recording, null, 2);
    writeFileSync(outputPath, json, 'utf8');
  }

  /**
   * Check if recording is in progress
   */
  isRecording(): boolean {
    return this.recording;
  }

  /**
   * Get current frame count
   */
  getFrameCount(): number {
    return this.frames.length;
  }
}
