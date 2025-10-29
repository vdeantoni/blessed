/**
 * Border Showcase Example
 *
 * Demonstrates the new per-side border colors and dim border effects
 * combined with shadows for a stunning visual effect!
 */

import { Screen, Box, Text } from "@unblessed/node";

// Create screen with full unicode and color support
const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  title: "Border Showcase - Per-Side Colors & Shadows",
});

// Title
const title = new Text({
  parent: screen,
  top: 0,
  left: "center",
  content:
    "{bold}{cyan-fg}🎨 Per-Side Border Colors & Dim Effects Showcase 🎨{/}",
  tags: true,
});

// Example 1: Rainbow borders with shadow
const rainbowBox = new Box({
  parent: screen,
  top: 3,
  left: 2,
  width: 35,
  height: 8,
  content:
    "{center}{bold}{yellow-fg}🌈 Rainbow Borders{/}\n{center}Each side different color!{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "line",
    topColor: "cyan",
    bottomColor: "magenta",
    leftColor: "green",
    rightColor: "red",
  },
});

// Example 2: Gradient effect with dim top/bottom
const gradientBox = new Box({
  parent: screen,
  top: 3,
  left: 40,
  width: 35,
  height: 8,
  content:
    "{center}{bold}{blue-fg}✨ Dim Gradient{/}\n{center}Top & bottom dimmed{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "line",
    topColor: "blue",
    bottomColor: "blue",
    leftColor: "cyan",
    rightColor: "cyan",
    topDim: true,
    bottomDim: true,
  },
});

// Example 3: Neon glow effect with bg type
const neonBox = new Box({
  parent: screen,
  top: 13,
  left: 2,
  width: 35,
  height: 8,
  content:
    "{center}{bold}{magenta-fg}💜 NEON GLOW{/}\n{center}{white-fg}Bright & shadowy{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "bg",
    ch: "█",
    topColor: "magenta",
    bottomColor: "magenta",
    leftColor: "magenta",
    rightColor: "magenta",
    bold: true,
  },
});

// Example 4: Sunset theme
const sunsetBox = new Box({
  parent: screen,
  top: 13,
  left: 40,
  width: 35,
  height: 8,
  content:
    "{center}{bold}{yellow-fg}🌅 Sunset Theme{/}\n{center}Warm colors flowing{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "line",
    topColor: "yellow",
    bottomColor: "red",
    leftColor: "red",
    rightColor: "yellow",
  },
});

// Example 5: Matrix theme with partial dim
const matrixBox = new Box({
  parent: screen,
  top: 23,
  left: "center",
  width: 40,
  height: 10,
  content:
    "{center}{bold}{green-fg}💚 M A T R I X{/}\n\n" +
    "{center}Left & right dimmed{/}\n" +
    "{center}Top & bottom bright{/}\n" +
    "{center}{dim}01001101 01100001 01110100{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "line",
    topColor: "green",
    bottomColor: "green",
    leftColor: "green",
    rightColor: "green",
    leftDim: true,
    rightDim: true,
  },
});

// Example 6: BG type with dim effect
const bgDimBox = new Box({
  parent: screen,
  top: 23,
  left: 2,
  width: 35,
  height: 10,
  content:
    "{center}{bold}{blue-fg}🔷 BG Type + Dim{/}\n\n" +
    "{center}Thick borders (▓){/}\n" +
    "{center}Top & bottom dimmed{/}",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "bg",
    ch: "▓",
    topColor: 4, // blue
    bottomColor: 4, // blue
    leftColor: 6, // cyan
    rightColor: 6, // cyan
    topDim: true,
    bottomDim: true,
  },
  style: {
    fg: "white",
  },
});

// Example 7: Corner mode comparison
const verticalCorners = new Box({
  parent: screen,
  top: 23,
  left: 40,
  width: 16,
  height: 5,
  content: "{center}{bold}Vertical{/}\n{center}(default)",
  tags: true,
  shadow: true,
  border: {
    type: "line",
    topColor: 3, // yellow
    bottomColor: 3, // yellow
    leftColor: 6, // cyan
    rightColor: 1, // red
    cornerColorMode: "vertical", // Corners use left/right colors
  },
});

const horizontalCorners = new Box({
  parent: screen,
  top: 29,
  left: 40,
  width: 16,
  height: 5,
  content: "{center}{bold}Horizontal{/}",
  tags: true,
  shadow: true,
  border: {
    type: "line",
    topColor: 3, // yellow
    bottomColor: 3, // yellow
    leftColor: 6, // cyan
    rightColor: 1, // red
    cornerColorMode: "horizontal", // Corners use top/bottom colors
  },
});

const cornerLabel = new Text({
  parent: screen,
  top: 21,
  left: 40,
  content: "{bold}Corner Mode:{/}",
  tags: true,
});

// Instructions
const instructions = new Text({
  parent: screen,
  bottom: 0,
  left: "center",
  content: "{center}{dim}Press 'q' or Ctrl+C to exit{/}",
  tags: true,
});

// Quit on q or Ctrl+C
screen.key(["q", "C-c"], () => {
  process.exit(0);
});

// Focus screen and render
screen.render();
