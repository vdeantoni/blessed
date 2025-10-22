/**
 * VRT Integration Test
 *
 * Tests the VRT infrastructure itself (recorder, player, comparator).
 */

import { describe, it, expect } from "vitest";
import { Screen, Box } from "@unblessed/core";
import { VRTRecorder, VRTPlayer, VRTComparator } from "../src/index.js";

describe("VRT Infrastructure", () => {
  describe("VRTRecorder", () => {
    it("should record screen screenshots", async () => {
      const screen = new Screen({ smartCSR: true });

      // Create a box and render BEFORE starting recorder
      const box = new Box({
        parent: screen,
        top: 0,
        left: 0,
        width: 20,
        height: 5,
        content: "Hello VRT!",
        border: { type: "line" },
      });

      screen.render();

      const recorder = new VRTRecorder(screen, {
        interval: 50,
        description: "Test recording",
      });

      expect(recorder.isRecording()).toBe(false);

      recorder.start();
      expect(recorder.isRecording()).toBe(true);

      // Wait for a few frames
      await new Promise((resolve) => setTimeout(resolve, 150));

      const recording = recorder.stop();
      expect(recorder.isRecording()).toBe(false);

      // Verify recording
      expect(recording).toBeDefined();
      expect(recording.version).toBe("1.0.0");
      expect(recording.dimensions.cols).toBeGreaterThan(0);
      expect(recording.dimensions.rows).toBeGreaterThan(0);
      expect(recording.frames.length).toBeGreaterThan(0);
      expect(recording.metadata.description).toBe("Test recording");

      // Verify frames were captured (content verification is up to actual tests)
      expect(recording.frames.length).toBeGreaterThan(2);
      expect(recording.frames[0].screenshot.length).toBeGreaterThan(0);

      screen.destroy();
    });

    it("should throw if starting while already recording", () => {
      const screen = new Screen();
      const recorder = new VRTRecorder(screen);

      recorder.start();
      expect(() => recorder.start()).toThrow("Recording already in progress");

      recorder.stop();
      screen.destroy();
    });

    it("should throw if stopping without recording", () => {
      const screen = new Screen();
      const recorder = new VRTRecorder(screen);

      expect(() => recorder.stop()).toThrow("No recording in progress");

      screen.destroy();
    });
  });

  describe("VRTPlayer", () => {
    it("should play back recording", async () => {
      const screen = new Screen({ smartCSR: true });
      const recorder = new VRTRecorder(screen);

      recorder.start();

      const box = new Box({
        parent: screen,
        content: "Frame 1",
      });
      screen.render();

      await new Promise((resolve) => setTimeout(resolve, 100));

      box.setContent("Frame 2");
      screen.render();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const recording = recorder.stop();
      screen.destroy();

      // Play back
      const player = new VRTPlayer(recording);
      const capturedFrames: string[] = [];

      await player.play({
        onFrame: (frame, index) => {
          capturedFrames.push(frame.screenshot);
        },
        speed: 10, // 10x speed for fast test
      });

      expect(capturedFrames.length).toBe(recording.frames.length);
      expect(capturedFrames.length).toBeGreaterThan(0);
    });

    it("should provide access to recording data", () => {
      const recording = {
        version: "1.0.0",
        dimensions: { cols: 80, rows: 24 },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 1000,
          frameCount: 5,
        },
        frames: [
          { screenshot: "frame1", timestamp: 0 },
          { screenshot: "frame2", timestamp: 100 },
        ],
      };

      const player = new VRTPlayer(recording);

      expect(player.getFrames()).toHaveLength(2);
      expect(player.getMetadata().frameCount).toBe(5);
      expect(player.getDimensions().cols).toBe(80);
      expect(player.getFrame(0)?.screenshot).toBe("frame1");
    });
  });

  describe("VRTComparator", () => {
    it("should detect matching recordings", () => {
      const recording1 = {
        version: "1.0.0",
        dimensions: { cols: 80, rows: 24 },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 100,
          frameCount: 2,
        },
        frames: [
          { screenshot: "identical", timestamp: 0 },
          { screenshot: "content", timestamp: 100 },
        ],
      };

      const recording2 = JSON.parse(JSON.stringify(recording1));

      const result = VRTComparator.compare(recording1, recording2);

      expect(result.match).toBe(true);
      expect(result.matchedFrames).toBe(2);
      expect(result.differentFrames).toBe(0);
      expect(result.differences).toBeUndefined();
    });

    it("should detect different recordings", () => {
      const recording1 = {
        version: "1.0.0",
        dimensions: { cols: 80, rows: 24 },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 100,
          frameCount: 2,
        },
        frames: [
          { screenshot: "frame1", timestamp: 0 },
          { screenshot: "frame2", timestamp: 100 },
        ],
      };

      const recording2 = {
        ...recording1,
        frames: [
          { screenshot: "frame1", timestamp: 0 },
          { screenshot: "DIFFERENT", timestamp: 100 },
        ],
      };

      const result = VRTComparator.compare(recording1, recording2);

      expect(result.match).toBe(false);
      expect(result.matchedFrames).toBe(1);
      expect(result.differentFrames).toBe(1);
      expect(result.differentFrameIndices).toEqual([1]);
      expect(result.differences).toHaveLength(1);
      expect(result.differences![0].frameIndex).toBe(1);
    });

    it("should detect dimension mismatch", () => {
      const recording1 = {
        version: "1.0.0",
        dimensions: { cols: 80, rows: 24 },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 100,
          frameCount: 1,
        },
        frames: [{ screenshot: "test", timestamp: 0 }],
      };

      const recording2 = {
        ...recording1,
        dimensions: { cols: 100, rows: 30 },
      };

      const result = VRTComparator.compare(recording1, recording2);

      expect(result.match).toBe(false);
      expect(result.differences![0].diff).toContain("Dimension mismatch");
    });

    it("should support ignoreColors option", () => {
      const recording1 = {
        version: "1.0.0",
        dimensions: { cols: 80, rows: 24 },
        metadata: {
          createdAt: new Date().toISOString(),
          duration: 100,
          frameCount: 1,
        },
        frames: [{ screenshot: "\x1b[31mRed Text\x1b[m", timestamp: 0 }],
      };

      const recording2 = {
        ...recording1,
        frames: [{ screenshot: "\x1b[34mRed Text\x1b[m", timestamp: 0 }],
      };

      // Without ignoreColors - should be different
      const result1 = VRTComparator.compare(recording1, recording2);
      expect(result1.match).toBe(false);

      // With ignoreColors - should match
      const result2 = VRTComparator.compare(recording1, recording2, {
        ignoreColors: true,
      });
      expect(result2.match).toBe(true);
    });
  });
});
