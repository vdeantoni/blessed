#!/usr/bin/env tsx
/**
 * Form submit example - demonstrates automatic form submission on ENTER
 *
 * Shows how pressing ENTER in a Textbox inside a Form automatically
 * submits the entire form (like a search box or login form).
 *
 * Run with:
 *   node examples/form-submit.ts
 */

import { Box, Button, Form, List, Screen, Textbox } from "../dist/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "Form Submit Example",
});

// Title
const title = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content:
    "{bold}{cyan-fg}Form Submit Example{/cyan-fg}{/bold}\n" +
    "Press ENTER in any textbox to submit the form",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
  align: "center",
});

// Create a form
const form = new Form({
  parent: screen,
  top: 4,
  left: "center",
  width: 60,
  height: 16,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "cyan",
    },
  },
  label: " Login Form ",
  keys: true,
});

// Username label
const usernameLabel = new Box({
  parent: form,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 1,
  content: "{bold}Username:{/bold}",
  tags: true,
});

// Username input
const usernameInput = new Textbox({
  parent: form,
  top: 2,
  left: 2,
  width: "100%-4",
  height: 3,
  name: "username",
  border: {
    type: "line",
  },
  style: {
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

// Password label
const passwordLabel = new Box({
  parent: form,
  top: 6,
  left: 2,
  width: "100%-4",
  height: 1,
  content: "{bold}Password:{/bold}",
  tags: true,
});

// Password input
const passwordInput = new Textbox({
  parent: form,
  top: 7,
  left: 2,
  width: "100%-4",
  height: 3,
  name: "password",
  secret: true, // Hide password
  border: {
    type: "line",
  },
  style: {
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
  parent: form,
  bottom: 1,
  left: "center",
  width: 14,
  height: 3,
  content: "Submit",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "green",
    border: {
      fg: "green",
    },
    focus: {
      bg: "brightgreen",
      border: {
        fg: "brightgreen",
      },
    },
  },
  keys: true,
  mouse: true,
});

// Submission log
const logList = new List({
  parent: screen,
  top: 21,
  left: "center",
  width: 60,
  height: 8,
  border: {
    type: "line",
  },
  label: " Submission Log ",
  style: {
    border: {
      fg: "green",
    },
    selected: {
      bg: "blue",
    },
  },
  scrollbar: {
    ch: " ",
    style: {
      bg: "cyan",
    },
  },
});

// Instructions
const instructions = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 1,
  content:
    " {inverse} Tab {/inverse} to navigate | {inverse} Enter {/inverse} in textbox to submit | {inverse} Q {/inverse} to quit ",
  tags: true,
  style: {
    fg: "white",
    bg: "black",
  },
});

// Form submit handler
form.on("submit", (data) => {
  const timestamp = new Date().toLocaleTimeString();
  logList.addItem(
    `[${timestamp}] Form submitted: username="${data.username || ""}", password="${data.password ? "***" : ""}"`,
  );
  logList.select(logList.items.length - 1);

  // Clear the form after submission
  usernameInput.setValue("");
  passwordInput.setValue("");

  // Focus username for next entry
  usernameInput.focus();

  screen.render();
});

// Button click also submits the form
submitButton.on("press", () => {
  form.submit();
});

// Tab navigation
usernameInput.key("tab", () => passwordInput.focus());
passwordInput.key("tab", () => submitButton.focus());
submitButton.key("tab", () => usernameInput.focus());

// Global quit
screen.key(["escape", "q", "C-c"], () => {
  return process.exit(0);
});

// Initial message
logList.addItem(
  "Welcome! Type in the fields and press ENTER to submit the form.",
);
logList.addItem(
  "Notice: ENTER in any textbox submits the entire form automatically!",
);

// Focus username and render
usernameInput.focus();
screen.render();
