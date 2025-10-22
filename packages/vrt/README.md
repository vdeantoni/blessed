# @unblessed/vrt

Visual Regression Testing tools for @unblessed terminal UI applications.

## Overview

`@unblessed/vrt` provides infrastructure for recording, playing back, and comparing terminal UI screenshots to detect visual regressions. It captures the raw SGR-encoded terminal output from `screen.screenshot()` and allows you to verify that UI rendering remains consistent across code changes.

## Installation

```bash
npm install --save-dev @unblessed/vrt
# or
pnpm add -D @unblessed/vrt
```

## Quick Start - Golden Snapshot Testing

The most common use case is golden snapshot testing with the `compareWithGolden` utility:

```typescript
import { compareWithGolden } from "@unblessed/vrt";
import { Screen, Box } from "@unblessed/node";

it("box renders correctly", async () => {
  const screen = new Screen();

  const box = new Box({
    parent: screen,
    content: "Hello",
    border: { type: "line" },
  });
  screen.render();

  // Capture screenshot
  const recording = {
    version: "1.0.0",
    dimensions: { cols: screen.cols, rows: screen.rows },
    metadata: {
      createdAt: new Date().toISOString(),
      duration: 0,
      frameCount: 1,
      description: "box test",
    },
    frames: [{ screenshot: screen.screenshot(), timestamp: 0 }],
  };

  // Compare with golden snapshot
  const result = compareWithGolden(
    "__tests__/fixtures/box.vrt.json",
    recording,
    "box renders correctly",
  );

  if (!result.pass) {
    throw new Error(result.errorMessage);
  }

  screen.destroy();
});
```

**Commands:**

```bash
# Normal - compare with golden
pnpm test

# Update golden snapshots
UPDATE_SNAPSHOTS=1 pnpm test
```

## API Reference

### Golden Snapshot Utilities

#### `compareWithGolden(fixturePath, recording, testName)`

Complete golden snapshot workflow that handles:

- Creating golden on first run
- Updating golden when `UPDATE_SNAPSHOTS=1`
- Comparing with golden on normal runs
- Formatting detailed error messages

**Returns:** `GoldenComparisonResult`

- `pass: boolean` - Whether test should pass
- `action: 'created' | 'updated' | 'matched' | 'failed'`
- `errorMessage?: string` - Formatted error (on failure)

#### `saveGoldenSnapshot(path, recording)`

Save a VRT recording as a golden snapshot file.

### Recording & Playback

### Recording a Session

```typescript
import { VRTRecorder } from "@unblessed/vrt";
import { Screen, Box } from "@unblessed/node";

const screen = new Screen({ smartCSR: true });
const recorder = new VRTRecorder(screen, {
  interval: 100, // Capture every 100ms
  outputPath: "./recording.vrt.json",
});

// Start recording
recorder.start();

// Create UI and interact
const box = new Box({
  parent: screen,
  content: "Hello World",
  border: { type: "line" },
});
screen.render();

// Stop and save
const recording = recorder.stop();
// Saved to ./recording.vrt.json
```

### Playing Back a Recording

```typescript
import { VRTPlayer } from "@unblessed/vrt";

const player = new VRTPlayer("./recording.vrt.json");

// Play to stdout
await player.play({ writeToStdout: true });

// Process each frame
await player.play({
  onFrame: (frame, index) => {
    console.log(`Frame ${index}: ${frame.screenshot.length} bytes`);
  },
  speed: 2.0, // 2x speed
});
```

### Comparing Recordings

```typescript
import { VRTComparator } from "@unblessed/vrt";

const result = VRTComparator.compare(
  "./golden.vrt.json", // Expected
  "./current.vrt.json", // Actual
  {
    threshold: 5, // Allow up to 5 char differences
    ignoreColors: false, // Compare colors too
  },
);

if (!result.match) {
  console.error(`Visual regression detected!`);
  console.error(
    `  ${result.differentFrames} of ${result.totalFrames} frames differ`,
  );
  result.differences?.forEach((diff) => {
    console.error(
      `  Frame ${diff.frameIndex}: ${diff.diffCount} chars different`,
    );
  });
}
```

## Testing Integration

Use VRT in your Vitest tests:

```typescript
import { describe, it, expect } from "vitest";
import { Screen, Box } from "@unblessed/node";
import { VRTRecorder, VRTComparator } from "@unblessed/vrt";

describe("Box rendering", () => {
  it("renders with border correctly", async () => {
    const screen = new Screen();
    const recorder = new VRTRecorder(screen);

    recorder.start();

    const box = new Box({
      parent: screen,
      top: 0,
      left: 0,
      width: 20,
      height: 5,
      content: "Test",
      border: { type: "line" },
    });
    screen.render();

    await new Promise((resolve) => setTimeout(resolve, 100));

    const recording = recorder.stop();
    screen.destroy();

    // Compare with golden snapshot
    const result = VRTComparator.compare(
      "./__tests__/fixtures/box-golden.vrt.json",
      recording,
    );

    expect(result.match).toBe(true);
  });
});
```

## API Reference

### VRTRecorder

Records screen screenshots at regular intervals.

**Constructor:**

```typescript
new VRTRecorder(screen: Screen, options?: VRTRecorderOptions)
```

**Methods:**

- `start()` - Start recording
- `stop()` - Stop recording and return VRTRecording
- `isRecording()` - Check if recording is in progress
- `getFrameCount()` - Get current frame count

### VRTPlayer

Plays back VRT recordings.

**Constructor:**

```typescript
new VRTPlayer(source: string | VRTRecording)
```

**Methods:**

- `play(options?: VRTPlayerOptions)` - Play the recording
- `getFrames()` - Get all frames
- `getFrame(index)` - Get specific frame
- `getMetadata()` - Get recording metadata
- `getDimensions()` - Get terminal dimensions

### VRTComparator

Compares two VRT recordings.

**Static Methods:**

- `compare(expected, actual, options?)` - Compare two recordings
- `compareRecordings(expected, actual, options?)` - Compare VRTRecording objects

## Types

```typescript
interface VRTRecorderOptions {
  interval?: number;
  outputPath?: string;
  description?: string;
  metadata?: Record<string, any>;
}

interface VRTPlayerOptions {
  speed?: number;
  onFrame?: (frame: VRTFrame, index: number) => void;
  writeToStdout?: boolean;
}

interface VRTComparatorOptions {
  threshold?: number;
  ignoreColors?: boolean;
  ignoreWhitespace?: boolean;
}

interface VRTComparisonResult {
  match: boolean;
  totalFrames: number;
  matchedFrames: number;
  differentFrames: number;
  differentFrameIndices: number[];
  differences?: VRTFrameDifference[];
}
```

## Recording Format

VRT recordings are JSON files with this structure:

```json
{
  "version": "1.0.0",
  "dimensions": {
    "cols": 80,
    "rows": 24
  },
  "metadata": {
    "createdAt": "2025-10-21T...",
    "duration": 1000,
    "frameCount": 10,
    "description": "Test recording"
  },
  "frames": [
    {
      "screenshot": "\u001b[H\u001b[2J...",
      "timestamp": 0
    }
  ]
}
```

## License

MIT
