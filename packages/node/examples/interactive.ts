#!/usr/bin/env tsx
/**
 * Interactive form example with inputs, buttons, and focus management
 *
 * Run with:
 *   pnpm example:interactive
 */

import { Screen, Box, Textbox, Button, List } from "../src/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "Interactive Example",
});

// Container box
const container = new Box({
  parent: screen,
  top: "center",
  left: "center",
  width: 60,
  height: 20,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "cyan",
    },
  },
  label: " Interactive Form ",
});

// Title
const title = new Box({
  parent: container,
  top: 1,
  left: "center",
  width: "shrink",
  height: 1,
  content: "{bold}What's your name?{/bold}",
  tags: true,
  style: {
    fg: "white",
  },
});

// Text input
const input = new Textbox({
  parent: container,
  top: 3,
  left: 2,
  width: "90%",
  height: 3,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "black",
    border: {
      fg: "blue",
    },
    focus: {
      border: {
        fg: "green",
      },
    },
  },
  inputOnFocus: true,
  keys: true,
  mouse: true,
});

// Submit button
const submitButton = new Button({
  parent: container,
  top: 7,
  left: 2,
  width: 12,
  height: 3,
  content: "Submit",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "blue",
    border: {
      fg: "blue",
    },
    focus: {
      bg: "green",
      border: {
        fg: "green",
      },
    },
  },
  keys: true,
  mouse: true,
});

// Cancel button
const cancelButton = new Button({
  parent: container,
  top: 7,
  left: 16,
  width: 12,
  height: 3,
  content: "Cancel",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "red",
    border: {
      fg: "red",
    },
    focus: {
      bg: "magenta",
      border: {
        fg: "magenta",
      },
    },
  },
  keys: true,
  mouse: true,
});

// Result list
const resultList = new List({
  parent: container,
  top: 11,
  left: 2,
  width: "90%",
  height: 6,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
    selected: {
      bg: "blue",
    },
  },
  keys: true,
  mouse: true,
  scrollbar: {
    ch: " ",
    style: {
      bg: "yellow",
    },
  },
});

// Event handlers
submitButton.on("press", () => {
  const name = input.getValue();
  if (name) {
    resultList.addItem(`Hello, ${name}!`);
    resultList.select(resultList.items.length - 1);
    input.clearValue();
    screen.render();
  }
});

cancelButton.on("press", () => {
  input.clearValue();
  resultList.clearItems();
  screen.render();
});

// Focus management
input.key(["tab", "down"], () => {
  submitButton.focus();
});

submitButton.key(["tab", "down"], () => {
  cancelButton.focus();
});

submitButton.key("up", () => {
  input.focus();
});

cancelButton.key(["tab", "down"], () => {
  resultList.focus();
});

cancelButton.key("up", () => {
  submitButton.focus();
});

resultList.key("up", () => {
  if (resultList.selected === 0) {
    cancelButton.focus();
  }
});

// Global key handlers
screen.key(["escape", "q", "C-c"], () => {
  return process.exit(0);
});

// Initial focus and render
input.focus();
screen.render();
