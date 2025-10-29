/**
 * Border Debug Example
 *
 * Simple test to debug per-side border colors
 */

import { Screen, Box } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  title: "Border Debug",
});

// Test 1: Simple per-side colors with line type
const lineBox = new Box({
  parent: screen,
  top: 2,
  left: 2,
  width: 30,
  height: 8,
  content: "{center}Line Type{/}\n{center}Per-side colors",
  tags: true,
  border: {
    type: "line",
    topColor: 6, // cyan (numeric)
    bottomColor: 3, // yellow
    leftColor: 2, // green
    rightColor: 1, // red
  },
});

// Test 2: Same with bg type
const bgBox = new Box({
  parent: screen,
  top: 2,
  left: 35,
  width: 30,
  height: 8,
  content: "{center}BG Type{/}\n{center}Per-side colors",
  tags: true,
  border: {
    type: "bg",
    ch: "█",
    topColor: 6, // cyan
    bottomColor: 3, // yellow
    leftColor: 2, // green
    rightColor: 1, // red
  },
});

// Test 3: No per-side colors (control)
const normalBox = new Box({
  parent: screen,
  top: 12,
  left: 2,
  width: 30,
  height: 8,
  content: "{center}Normal{/}\n{center}Single color",
  tags: true,
  border: {
    type: "line",
    fg: 1, // all red
  },
});

// Test 4: String color names
const stringBox = new Box({
  parent: screen,
  top: 12,
  left: 35,
  width: 30,
  height: 8,
  content: "{center}String Colors{/}\n{center}Named colors",
  tags: true,
  border: {
    type: "line",
    topColor: "cyan",
    bottomColor: "yellow",
    leftColor: "green",
    rightColor: "red",
  },
});

const info = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  right: 0,
  height: 3,
  content:
    "{center}TERM: " +
    (process.env.TERM || "unknown") +
    "{/}\n" +
    "{center}Colors: " +
    (screen.tput ? screen.tput.colors : "unknown") +
    "{/}\n" +
    "{center}Press 'q' to exit{/}",
  tags: true,
});

screen.key(["q", "C-c"], () => process.exit(0));
screen.render();
