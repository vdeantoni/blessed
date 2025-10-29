/**
 * Simple Border Test
 * Tests if per-side colors work at all
 */

import { Box, Screen } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  dockBorders: true,
});

// Test with numeric colors (should definitely work)
const box1 = new Box({
  parent: screen,
  top: 2,
  left: 2,
  width: 25,
  height: 6,
  content: "{center}Numeric Colors",
  tags: true,
  border: {
    type: "line",
    topColor: 6, // cyan
    bottomColor: 3, // yellow
    leftColor: 2, // green
    rightColor: 1, // red
  },
});

// Debug: print the border object
console.log("box1.border:", JSON.stringify(box1.border, null, 2));

// Test with bg type
const box2 = new Box({
  parent: screen,
  top: 2,
  left: 30,
  width: 25,
  height: 6,
  content: "{center}BG Type",
  tags: true,
  border: {
    type: "bg",
    ch: "█",
    topColor: 6,
    bottomColor: 3,
    leftColor: 2,
    rightColor: 1,
  },
});

console.log("box2.border:", JSON.stringify(box2.border, null, 2));

// Test with shadow
const box3 = new Box({
  parent: screen,
  top: 10,
  left: 2,
  width: 25,
  height: 6,
  content: "{center}With Shadow",
  tags: true,
  shadow: true,
  border: {
    type: "line",
    topColor: 5, // magenta
    bottomColor: 4, // blue
    leftColor: 2, // green
    rightColor: 1, // red
  },
});

const info = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  right: 0,
  height: 1,
  content: "Press 'q' to exit",
});

screen.key(["q", "C-c"], () => process.exit(0));
screen.render();
