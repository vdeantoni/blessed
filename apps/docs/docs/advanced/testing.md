---
sidebar_position: 4
---

# Testing Guide

Learn how to test your unblessed terminal UI applications using the Visual Regression Testing (VRT) package.

## Overview

Testing terminal UIs can be challenging because they involve complex ANSI escape codes, dynamic rendering, and visual layouts. The `@unblessed/vrt` package provides tools for:

- **Visual regression testing** - Detect UI changes across code versions
- **Golden snapshot testing** - Compare against known-good baselines
- **Recording & playback** - Capture and replay terminal sessions
- **Automated comparison** - Programmatically verify UI consistency

## Installation

Install the VRT package as a dev dependency:

```bash
npm install --save-dev @unblessed/vrt@alpha
# or
pnpm add -D @unblessed/vrt@alpha
# or
yarn add -D @unblessed/vrt@alpha
```

## Quick Start - Golden Snapshot Testing

The most common pattern is golden snapshot testing - comparing your UI against a "golden" baseline:

```typescript
import { describe, it } from "vitest";
import { compareWithGolden } from "@unblessed/vrt";
import { Screen, Box } from "@unblessed/node";

describe("Box Widget", () => {
  it("renders correctly with border", () => {
    // 1. Create your UI
    const screen = new Screen();
    const box = new Box({
      parent: screen,
      top: 0,
      left: 0,
      width: 20,
      height: 5,
      content: "Hello World",
      border: { type: "line" },
    });
    screen.render();

    // 2. Capture screenshot as VRT recording
    const recording = {
      version: "1.0.0",
      dimensions: {
        cols: screen.cols,
        rows: screen.rows,
      },
      metadata: {
        createdAt: new Date().toISOString(),
        duration: 0,
        frameCount: 1,
        description: "Box with border",
      },
      frames: [
        {
          screenshot: screen.screenshot(),
          timestamp: 0,
        },
      ],
    };

    // 3. Compare with golden snapshot
    const result = compareWithGolden(
      "__tests__/fixtures/box-border.vrt.json",
      recording,
      "Box renders correctly with border",
    );

    // 4. Assert the result
    if (!result.pass) {
      throw new Error(result.errorMessage);
    }

    // 5. Cleanup
    screen.destroy();
  });
});
```

### Running Tests

```bash
# Normal test run - compare with golden
npm test

# First run OR updating golden snapshots
UPDATE_SNAPSHOTS=1 npm test
```

**How it works:**

1. **First run**: Creates the golden snapshot file
2. **Subsequent runs**: Compares current output against the golden
3. **Update mode**: Updates the golden snapshot when you intentionally change the UI

## Recording Interactive Sessions

For complex UIs with user interaction, record the entire session:

```typescript
import { VRTRecorder } from "@unblessed/vrt";
import { Screen, List } from "@unblessed/node";

describe("Interactive List", () => {
  it("records navigation and selection", async () => {
    const screen = new Screen({ smartCSR: true });

    // Start recording
    const recorder = new VRTRecorder(screen, {
      interval: 100, // Capture every 100ms
      outputPath: "__tests__/fixtures/list-interaction.vrt.json",
      description: "List navigation test",
    });

    recorder.start();

    // Create UI
    const list = new List({
      parent: screen,
      width: "100%",
      height: "100%",
      items: ["Item 1", "Item 2", "Item 3"],
      keys: true,
      vi: true,
    });

    screen.render();

    // Simulate interaction
    await new Promise((resolve) => setTimeout(resolve, 100));
    list.down(); // Move down
    screen.render();

    await new Promise((resolve) => setTimeout(resolve, 100));
    list.down(); // Move down again
    screen.render();

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Stop recording
    const recording = recorder.stop();
    // Automatically saved to outputPath

    screen.destroy();

    // Recording now contains 3+ frames showing the interaction
    expect(recording.metadata.frameCount).toBeGreaterThan(0);
  });
});
```

## Comparing Recordings

Compare two VRT recordings to detect visual differences:

```typescript
import { VRTComparator } from "@unblessed/vrt";

it("detects visual regressions", () => {
  const result = VRTComparator.compare(
    "__tests__/fixtures/expected.vrt.json",
    "__tests__/fixtures/actual.vrt.json",
    {
      threshold: 0, // No differences allowed
      ignoreColors: false, // Compare colors
      ignoreWhitespace: false,
    },
  );

  expect(result.match).toBe(true);

  if (!result.match) {
    console.log(
      `${result.differentFrames} of ${result.totalFrames} frames differ`,
    );
    result.differences?.forEach((diff) => {
      console.log(
        `Frame ${diff.frameIndex}: ${diff.diffCount} chars different`,
      );
    });
  }
});
```

### Comparison Options

- **`threshold`**: Allow N character differences (default: 0)
  - Useful for minor rendering variations
  - Example: `threshold: 5` allows up to 5 character differences

- **`ignoreColors`**: Ignore ANSI color codes (default: false)
  - Useful when testing layout without caring about colors
  - Compares only text content and positioning

- **`ignoreWhitespace`**: Ignore whitespace differences (default: false)
  - Useful for testing content without exact spacing

## CLI Tools

The VRT package includes command-line tools for working with recordings:

### View Recording Info

```bash
npx vrt info __tests__/fixtures/recording.vrt.json
```

Output:

```
VRT Recording Information
━━━━━━━━━━━━━━━━━━━━━━━━━
Version:     1.0.0
Dimensions:  80 cols × 24 rows
Duration:    2000ms
Frames:      20
Created:     2025-10-30T...
Description: List navigation test
```

### Play Recording

Play back a recording in your terminal:

```bash
npx vrt play __tests__/fixtures/recording.vrt.json

# Play at 2x speed
npx vrt play __tests__/fixtures/recording.vrt.json --speed 2.0
```

This shows exactly what was captured during recording - great for debugging!

### Compare Recordings

```bash
# Basic comparison
npx vrt compare expected.vrt.json actual.vrt.json

# With tolerance
npx vrt compare expected.vrt.json actual.vrt.json --threshold 5

# Ignore color differences
npx vrt compare expected.vrt.json actual.vrt.json --ignore-colors

# Verbose output
npx vrt compare expected.vrt.json actual.vrt.json --verbose
```

## Testing Patterns

### Pattern 1: Component Snapshot

Test individual widgets in isolation:

```typescript
import { compareWithGolden } from "@unblessed/vrt";
import { Screen, ProgressBar } from "@unblessed/node";

it("progress bar at 50%", () => {
  const screen = new Screen();

  const progress = new ProgressBar({
    parent: screen,
    width: 30,
    height: 1,
    filled: 50,
  });
  screen.render();

  const recording = createRecording(screen, "Progress bar at 50%");
  const result = compareWithGolden(
    "__tests__/fixtures/progress-50.vrt.json",
    recording,
    "Progress bar renders at 50%",
  );

  expect(result.pass).toBe(true);
  screen.destroy();
});

// Helper function
function createRecording(screen, description) {
  return {
    version: "1.0.0",
    dimensions: { cols: screen.cols, rows: screen.rows },
    metadata: {
      createdAt: new Date().toISOString(),
      duration: 0,
      frameCount: 1,
      description,
    },
    frames: [{ screenshot: screen.screenshot(), timestamp: 0 }],
  };
}
```

### Pattern 2: Full Screen Layout

Test complete application layouts:

```typescript
it("dashboard layout", () => {
  const screen = new Screen();

  // Create complex layout
  const header = new Box({
    parent: screen,
    top: 0,
    height: 3,
    content: "Dashboard",
  });

  const sidebar = new List({
    parent: screen,
    top: 3,
    width: "30%",
    height: "100%-3",
    items: ["Menu 1", "Menu 2"],
  });

  const content = new Box({
    parent: screen,
    top: 3,
    left: "30%",
    width: "70%",
    height: "100%-3",
    content: "Content area",
  });

  screen.render();

  const result = compareWithGolden(
    "__tests__/fixtures/dashboard.vrt.json",
    createRecording(screen, "Dashboard layout"),
    "Dashboard layout matches golden",
  );

  expect(result.pass).toBe(true);
  screen.destroy();
});
```

### Pattern 3: State Changes

Test UI state transitions:

```typescript
it("checkbox toggle states", () => {
  const screen = new Screen();
  const checkbox = new Checkbox({
    parent: screen,
    content: "Agree",
    checked: false,
  });

  // Test unchecked state
  screen.render();
  let result = compareWithGolden(
    "__tests__/fixtures/checkbox-unchecked.vrt.json",
    createRecording(screen, "Checkbox unchecked"),
    "Checkbox unchecked state",
  );
  expect(result.pass).toBe(true);

  // Test checked state
  checkbox.check();
  screen.render();
  result = compareWithGolden(
    "__tests__/fixtures/checkbox-checked.vrt.json",
    createRecording(screen, "Checkbox checked"),
    "Checkbox checked state",
  );
  expect(result.pass).toBe(true);

  screen.destroy();
});
```

## Best Practices

### 1. Organize Test Fixtures

Keep VRT recordings organized:

```
__tests__/
├── fixtures/
│   ├── components/
│   │   ├── box-simple.vrt.json
│   │   ├── box-border.vrt.json
│   │   └── list-items.vrt.json
│   ├── layouts/
│   │   ├── dashboard.vrt.json
│   │   └── form.vrt.json
│   └── interactions/
│       ├── menu-navigation.vrt.json
│       └── form-submit.vrt.json
└── integration.test.ts
```

### 2. Use Descriptive Names

Make test and fixture names clear:

```typescript
// ✅ Good
compareWithGolden(
  "__tests__/fixtures/components/list-selected-item-2.vrt.json",
  recording,
  "List with item 2 selected",
);

// ❌ Bad
compareWithGolden("__tests__/fixtures/test1.vrt.json", recording, "test1");
```

### 3. Test Edge Cases

Cover various scenarios:

```typescript
describe("Box sizing", () => {
  it("renders at minimum size", () => {
    /* ... */
  });
  it("renders at maximum size", () => {
    /* ... */
  });
  it("renders with percentage width", () => {
    /* ... */
  });
  it("renders with absolute width", () => {
    /* ... */
  });
  it("handles overflow content", () => {
    /* ... */
  });
});
```

### 4. Clean Up Resources

Always destroy screens to prevent memory leaks:

```typescript
it("my test", () => {
  const screen = new Screen();
  try {
    // Test code here
  } finally {
    screen.destroy(); // Always cleanup
  }
});
```

## Advanced: Custom Matchers

Create reusable test helpers:

```typescript
// test-utils.ts
export function expectToMatchGolden(
  screen: Screen,
  fixturePath: string,
  description: string,
) {
  const recording = createRecording(screen, description);
  const result = compareWithGolden(fixturePath, recording, description);

  if (!result.pass) {
    throw new Error(result.errorMessage);
  }
}

// In tests
it("box renders", () => {
  const screen = new Screen();
  const box = new Box({ parent: screen, content: "Hi" });
  screen.render();

  expectToMatchGolden(screen, "__tests__/fixtures/box.vrt.json", "Simple box");

  screen.destroy();
});
```

## Future Enhancements

The VRT package is actively developed. Planned features include:

### Image Export (Coming Soon)

Export recordings to visual formats:

```bash
# Export to animated GIF
npx vrt export recording.vrt.json output.gif

# Export single frame to PNG
npx vrt export recording.vrt.json screenshot.png --frame 0
```

This will enable:

- 📸 Screenshots for documentation
- 🎬 Animated demos for GitHub PRs
- 📊 Visual diff reports in CI/CD
- 📝 Embedded images in test reports

### Have Ideas?

We'd love to hear your ideas for improving the VRT package! If you have suggestions for:

- New comparison strategies
- Better diff visualization
- Integration with other test frameworks
- Export formats
- Performance improvements

Please open an issue or discussion on GitHub:

**[Share Your Ideas](https://github.com/vdeantoni/unblessed/discussions)**

## Troubleshooting

### Golden Snapshot Not Updating

Make sure you use the environment variable:

```bash
UPDATE_SNAPSHOTS=1 npm test
```

Not:

```bash
# ❌ This won't work
npm test UPDATE_SNAPSHOTS=1
```

### Recording Shows Blank/Wrong Output

Ensure you call `screen.render()` before capturing:

```typescript
screen.render(); // ✅ Render first
const screenshot = screen.screenshot(); // Then capture
```

### Tests Fail on CI but Pass Locally

Terminal dimensions might differ. Set explicit dimensions:

```typescript
const screen = new Screen({
  cols: 80,
  rows: 24,
});
```

## Next Steps

- [Performance Guide](./performance) - Optimize your terminal UIs
- [Custom Widgets](./custom-widgets) - Build reusable components
- [Troubleshooting](./troubleshooting) - Common issues and solutions
