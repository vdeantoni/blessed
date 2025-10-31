/**
 * render.test.tsx - Basic tests for React renderer
 */

import { Screen } from "@unblessed/core";
import { describe, expect, it } from "vitest";
import { Box, render, Spacer, Text } from "../src/index.js";

describe("render", () => {
  it("renders without crashing", () => {
    const screen = new Screen({ width: 80, height: 24 });

    const instance = render(
      <Box width={40} height={10}>
        <Text>Hello</Text>
      </Box>,
      { screen },
    );

    expect(instance).toBeDefined();
    expect(instance.unmount).toBeDefined();
    expect(instance.rerender).toBeDefined();

    instance.unmount();
    screen.destroy();
  });

  it("renders Box component", () => {
    const screen = new Screen({ width: 80, height: 24 });

    const instance = render(<Box width={40} height={10} />, { screen });

    expect(instance).toBeDefined();

    instance.unmount();
    screen.destroy();
  });

  it("renders with flexbox layout", () => {
    const screen = new Screen({ width: 80, height: 24 });

    const instance = render(
      <Box flexDirection="row" width={80}>
        <Box width={20} height={10} />
        <Box flexGrow={1} height={10} />
        <Box width={20} height={10} />
      </Box>,
      { screen },
    );

    expect(instance).toBeDefined();

    instance.unmount();
    screen.destroy();
  });
});

describe("components", () => {
  it("renders Spacer component", () => {
    const screen = new Screen({ width: 80, height: 24 });

    const instance = render(
      <Box flexDirection="row" width={80}>
        <Box width={20} />
        <Spacer />
        <Box width={20} />
      </Box>,
      { screen },
    );

    expect(instance).toBeDefined();

    instance.unmount();
    screen.destroy();
  });
});
