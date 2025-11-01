#!/usr/bin/env tsx
/**
 * hello-react.tsx - Example showcasing @unblessed/react with various border styles
 *
 * Run with:
 *   tsx packages/react/examples/hello-react.tsx
 */
import * as React from "react";
import { Screen } from "../../node/dist/index.js";
import { Box, render, Text } from "../dist/index.js";

// WORKAROUND: In development, ensure runtime is initialized for source files too
import { initCore } from "@unblessed/core";
import { NodeRuntime } from "@unblessed/node";
import { Spacer } from "../src";
initCore(new NodeRuntime());

const screen = new Screen({ smartCSR: true, fullUnicode: true });

const App = () => (
  <Box flexDirection="column" padding={1} gap={1}>
    {/* Title */}
    <Box
      flexDirection="column"
      padding={1}
      border={1}
      borderStyle="single"
      borderColor="cyan"
      alignItems="center"
    >
      <Text>@unblessed/react Border Showcase</Text>
    </Box>

    {/* Border styles */}
    <Box flexDirection="row" gap={1}>
      <Box
        width={18}
        border={1}
        borderStyle="single"
        borderColor="green"
        padding={1}
      >
        <Text>Single</Text>
      </Box>
      <Box
        width={18}
        border={1}
        borderStyle="double"
        borderColor="yellow"
        padding={1}
      >
        <Text>Double</Text>
      </Box>
      <Box
        width={18}
        border={1}
        borderStyle="round"
        borderColor="magenta"
        padding={1}
      >
        <Text>Round</Text>
      </Box>
      <Box
        width={18}
        border={1}
        borderStyle="bold"
        borderColor="red"
        padding={1}
      >
        <Text>Bold</Text>
      </Box>
    </Box>

    {/* Per-side border colors */}
    <Box flexDirection="row" gap={1}>
      <Box
        flexGrow={1}
        border={1}
        borderStyle="single"
        borderTopColor="red"
        borderBottomColor="blue"
        borderLeftColor="green"
        borderRightColor="yellow"
        padding={1}
      >
        <Text>Per-side colors (R/B/G/Y)</Text>
      </Box>

      <Box
        width={25}
        border={1}
        borderStyle="single"
        borderColor="cyan"
        borderDimColor={true}
        padding={1}
      >
        <Text>Dim border</Text>
      </Box>
    </Box>

    {/* Flexbox with borders and spacer */}
    <Box flexDirection="row" gap={1}>
      <Box
        width={20}
        border={1}
        borderStyle="single"
        borderColor="blue"
        padding={1}
      >
        <Text>Left</Text>
      </Box>

      <Spacer />

      <Box
        width={20}
        border={1}
        borderStyle="single"
        borderColor="blue"
        padding={1}
      >
        <Text>Right</Text>
      </Box>
    </Box>

    {/* Nested borders */}
    <Box border={1} borderStyle="double" borderColor="magenta" padding={1}>
      <Box border={1} borderStyle="single" borderColor="cyan" padding={1}>
        <Text>Nested borders (double outer, single inner)</Text>
      </Box>
    </Box>

    {/* Footer */}
    <Spacer />
    <Box border={1} borderStyle="single" borderTopColor="gray" padding={1}>
      <Text color="gray" dim>
        Press q or Ctrl+C to quit
      </Text>
    </Box>
  </Box>
);

const instance = render(<App />, { screen, debug: true });

screen.key(["q", "C-c"], () => {
  console.log("React", React.version);
  instance.unmount();
  process.exit(0);
});
