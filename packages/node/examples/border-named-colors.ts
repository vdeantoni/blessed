/**
 * Test named colors in borders
 */

import { Box, Screen } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
});

const box = new Box({
  parent: screen,
  top: 2,
  left: 2,
  width: 30,
  height: 8,
  content: "{center}{bold}Named Colors Test{/}\n{center}cyan/yellow/green/red",
  tags: true,
  padding: 1,
  shadow: true,
  border: {
    type: "line",
    topColor: "cyan",
    bottomColor: "yellow",
    leftColor: "green",
    rightColor: "red",
  },
});

console.log("Border object:", JSON.stringify(box.border, null, 2));

screen.key(["q", "C-c"], () => process.exit(0));
screen.render();
