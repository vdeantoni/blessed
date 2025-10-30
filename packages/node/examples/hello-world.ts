#!/usr/bin/env tsx
/**
 * Simple Hello World example using @unblessed/node
 *
 * Run with:
 *   pnpm example:hello-world
 *
 * Or directly:
 *   pnpm tsx examples/hello-world.ts
 */

import { Box, Screen } from "../dist/index.js";

// Create a screen
const screen = new Screen({
  smartCSR: true,
  title: "Hello World Example",
  fullUnicode: true,
});

// Create a centered box with content
const box = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content:
    "{bold}{cyan-fg}🤖 Hello, World!{/cyan-fg}{/bold}\n\n" +
    "This is a simple example of using @unblessed/node.\n\n" +
    "Press {inverse} q {/inverse} or {inverse} Escape {/inverse} to quit.",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "black",
    border: {
      fg: "#f0f0f0",
    },
  },
});

// Quit on Escape, q, or Control-C
screen.key(["escape", "q", "C-c"], () => {
  return process.exit(0);
});

// Focus the box and render
box.focus();
screen.render();
