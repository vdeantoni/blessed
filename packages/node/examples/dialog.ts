#!/usr/bin/env tsx
/**
 * Dialog widget example - modal dialogs and overlays
 *
 * Demonstrates the Dialog widget for creating modal dialogs with
 * automatic focus management, centering, and shadows.
 *
 * Run with:
 *   pnpm tsx examples/dialog.ts
 */

import { Box, Button, Dialog, List, Screen, Textbox } from "../dist/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "Dialog Example",
});

// Main content area
const mainContent = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  style: {
    bg: "black",
  },
});

// Title
const title = new Box({
  parent: mainContent,
  top: 1,
  left: "center",
  width: "shrink",
  height: 1,
  content: "{bold}{cyan-fg}Dialog Widget Examples{/cyan-fg}{/bold}",
  tags: true,
});

// Instructions
const instructions = new Box({
  parent: mainContent,
  top: 3,
  left: 2,
  width: "100%-4",
  height: 7,
  content:
    "{bold}Available Dialogs:{/bold}\n\n" +
    "  {inverse} 1 {/inverse} - Simple confirmation dialog\n" +
    "  {inverse} 2 {/inverse} - Dialog with form input\n" +
    "  {inverse} 3 {/inverse} - Dialog with list selection\n" +
    "  {inverse} 4 {/inverse} - Nested dialogs\n\n" +
    "Press number keys to open dialogs",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "blue",
    },
  },
});

// Event log
const eventLog = new List({
  parent: mainContent,
  top: 11,
  left: 2,
  width: "100%-4",
  height: "100%-13",
  border: {
    type: "line",
  },
  label: " Event Log ",
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

function logEvent(message: string) {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.addItem(`[${timestamp}] ${message}`);
  eventLog.select(eventLog.items.length - 1);
  screen.render();
}

// Bottom bar
const bottomBar = new Box({
  parent: mainContent,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 1,
  content:
    " Press {inverse} 1-4 {/inverse} for dialogs | {inverse} Q {/inverse} to quit ",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// ========== Dialog 1: Simple Confirmation ==========

const confirmDialog = new Dialog({
  parent: screen,
  width: 50,
  height: 10,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
    bg: "black",
  },
  label: " Confirmation ",
});

const confirmMessage = new Box({
  parent: confirmDialog,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 3,
  content:
    "{bold}Are you sure?{/bold}\n\n" + "This is a simple confirmation dialog.",
  tags: true,
});

const confirmYesBtn = new Button({
  parent: confirmDialog,
  bottom: 1,
  left: 10,
  width: 10,
  height: 3,
  content: "Yes",
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

const confirmNoBtn = new Button({
  parent: confirmDialog,
  bottom: 1,
  right: 10,
  width: 10,
  height: 3,
  content: "No",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "red",
    border: {
      fg: "red",
    },
    focus: {
      bg: "brightred",
      border: {
        fg: "brightred",
      },
    },
  },
  keys: true,
  mouse: true,
});

confirmYesBtn.on("press", () => {
  logEvent("Confirmation: User clicked YES");
  confirmDialog.hide();
});

confirmNoBtn.on("press", () => {
  logEvent("Confirmation: User clicked NO");
  confirmDialog.hide();
});

confirmYesBtn.key("tab", () => confirmNoBtn.focus());
confirmNoBtn.key("tab", () => confirmYesBtn.focus());

// ========== Dialog 2: Form Input ==========

const inputDialog = new Dialog({
  parent: screen,
  width: 60,
  height: 14,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "cyan",
    },
    bg: "black",
  },
  label: " User Input ",
});

const inputPrompt = new Box({
  parent: inputDialog,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 2,
  content: "{bold}Please enter your name:{/bold}",
  tags: true,
});

const textInput = new Textbox({
  parent: inputDialog,
  top: 4,
  left: 2,
  width: "100%-4",
  height: 3,
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

const inputSubmitBtn = new Button({
  parent: inputDialog,
  bottom: 1,
  left: "center",
  width: 12,
  height: 3,
  content: "Submit",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "blue",
    border: {
      fg: "blue",
    },
    focus: {
      bg: "cyan",
      border: {
        fg: "cyan",
      },
    },
  },
  keys: true,
  mouse: true,
});

inputSubmitBtn.on("press", () => {
  const value = textInput.getValue();
  if (value) {
    logEvent(`Form submitted: "${value}"`);
    textInput.clearValue();
    inputDialog.hide();
  }
});

textInput.key("tab", () => inputSubmitBtn.focus());
inputSubmitBtn.key("tab", () => textInput.focus());

// ========== Dialog 3: List Selection ==========

const listDialog = new Dialog({
  parent: screen,
  width: 50,
  height: 16,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "magenta",
    },
    bg: "black",
  },
  label: " Select an Option ",
});

const listPrompt = new Box({
  parent: listDialog,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 1,
  content: "{bold}Choose your favorite:{/bold}",
  tags: true,
});

const optionsList = new List({
  parent: listDialog,
  top: 3,
  left: 2,
  width: "100%-4",
  height: 8,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "blue",
    },
    selected: {
      bg: "blue",
    },
    focus: {
      border: {
        fg: "green",
      },
    },
  },
  keys: true,
  mouse: true,
  items: ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Java", "C++"],
});

const listSelectBtn = new Button({
  parent: listDialog,
  bottom: 1,
  left: "center",
  width: 12,
  height: 3,
  content: "Select",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "magenta",
    border: {
      fg: "magenta",
    },
    focus: {
      bg: "brightmagenta",
      border: {
        fg: "brightmagenta",
      },
    },
  },
  keys: true,
  mouse: true,
});

listSelectBtn.on("press", () => {
  const selected = optionsList.items[optionsList.selected];
  logEvent(`List selection: "${selected}"`);
  listDialog.hide();
});

optionsList.key("tab", () => listSelectBtn.focus());
listSelectBtn.key("tab", () => optionsList.focus());
optionsList.key("enter", () => listSelectBtn.press());

// ========== Dialog 4: Nested Dialog ==========

const nestedDialog1 = new Dialog({
  parent: screen,
  width: 60,
  height: 14,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
    bg: "black",
  },
  label: " First Dialog ",
});

const nested1Content = new Box({
  parent: nestedDialog1,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 3,
  content:
    "{bold}First Level Dialog{/bold}\n\n" +
    "This demonstrates nested dialog management.",
  tags: true,
});

const openNestedBtn = new Button({
  parent: nestedDialog1,
  top: 6,
  left: "center",
  width: 20,
  height: 3,
  content: "Open Nested Dialog",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "blue",
    border: {
      fg: "blue",
    },
    focus: {
      bg: "cyan",
      border: {
        fg: "cyan",
      },
    },
  },
  keys: true,
  mouse: true,
});

const closeNested1Btn = new Button({
  parent: nestedDialog1,
  bottom: 1,
  left: "center",
  width: 12,
  height: 3,
  content: "Close",
  align: "center",
  valign: "middle",
  border: {
    type: "line",
  },
  style: {
    bg: "red",
    border: {
      fg: "red",
    },
    focus: {
      bg: "brightred",
      border: {
        fg: "brightred",
      },
    },
  },
  keys: true,
  mouse: true,
});

const nestedDialog2 = new Dialog({
  parent: screen,
  width: 50,
  height: 10,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "green",
    },
    bg: "black",
  },
  label: " Second Dialog ",
});

const nested2Content = new Box({
  parent: nestedDialog2,
  top: 1,
  left: 2,
  width: "100%-4",
  height: 2,
  content: "{bold}This is a nested dialog!{/bold}",
  tags: true,
});

const closeNested2Btn = new Button({
  parent: nestedDialog2,
  bottom: 1,
  left: "center",
  width: 12,
  height: 3,
  content: "Close",
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

openNestedBtn.on("press", () => {
  logEvent("Opening nested dialog");
  nestedDialog2.show();
});

closeNested1Btn.on("press", () => {
  logEvent("Closed first dialog");
  nestedDialog1.hide();
});

closeNested2Btn.on("press", () => {
  logEvent("Closed nested dialog");
  nestedDialog2.hide();
});

openNestedBtn.key("tab", () => closeNested1Btn.focus());
closeNested1Btn.key("tab", () => openNestedBtn.focus());

// ========== Main Screen Key Handlers ==========

screen.key("1", () => {
  logEvent("Opening confirmation dialog");
  confirmDialog.show();
  confirmYesBtn.focus();
});

screen.key("2", () => {
  logEvent("Opening input dialog");
  inputDialog.show();
  textInput.focus();
});

screen.key("3", () => {
  logEvent("Opening list selection dialog");
  listDialog.show();
  optionsList.focus();
});

screen.key("4", () => {
  logEvent("Opening nested dialogs");
  nestedDialog1.show();
  openNestedBtn.focus();
});

// Escape closes any open dialog
screen.key("escape", () => {
  if (!nestedDialog2.hidden) {
    nestedDialog2.hide();
  } else if (!nestedDialog1.hidden) {
    nestedDialog1.hide();
  } else if (!listDialog.hidden) {
    listDialog.hide();
  } else if (!inputDialog.hidden) {
    inputDialog.hide();
  } else if (!confirmDialog.hidden) {
    confirmDialog.hide();
  }
  screen.render();
});

screen.key(["q", "C-c"], () => {
  return process.exit(0);
});

// Initial render and welcome message
logEvent("Application started");
logEvent("Press 1-4 to open different dialog examples");
screen.render();
