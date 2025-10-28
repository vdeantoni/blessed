#!/usr/bin/env tsx
/**
 * Log widget example with static header/footer
 *
 * Demonstrates the Log widget with the new static header and footer
 * features that remain visible while log content scrolls.
 *
 * Run with:
 *   pnpm tsx examples/log-widget.ts
 */

import { Screen, Box, Log, Button } from "../dist/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "Log Widget Example",
});

// Main title
const title = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content:
    "{bold}{cyan-fg}Log Widget with Static Header/Footer{/cyan-fg}{/bold}\n" +
    "Watch logs stream with persistent header and footer",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
  align: "center",
});

// Left panel - Regular log
const regularLog = new Log({
  parent: screen,
  top: 3,
  left: 0,
  width: "50%-1",
  height: "100%-7",
  border: {
    type: "line",
  },
  label: " Regular Log ",
  style: {
    border: {
      fg: "green",
    },
  },
  scrollback: 100,
  scrollOnInput: true,
  tags: true,
});

// Right panel - Log with static header/footer
const fancyLog = new Log({
  parent: screen,
  top: 3,
  right: 0,
  width: "50%-1",
  height: "100%-7",
  border: {
    type: "line",
  },
  label: " Log with Static Header/Footer ",
  style: {
    border: {
      fg: "cyan",
    },
  },
  scrollback: 100,
  scrollOnInput: true,
  tags: true,
  staticHeader: "{bold}{cyan-bg}{black-fg} Application Logs - v1.0.0 {/}",
  staticFooter:
    "{gray-bg}{white-fg} [↑/↓] Scroll | [Q] Quit | Lines: 0 {/}",
});

// Control panel
const controls = new Box({
  parent: screen,
  bottom: 3,
  left: 0,
  width: "100%",
  height: 3,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
  },
  label: " Controls ",
});

const startBtn = new Button({
  parent: controls,
  top: 0,
  left: 2,
  width: 10,
  height: 1,
  content: "Start",
  align: "center",
  style: {
    bg: "green",
    focus: {
      bg: "brightgreen",
    },
  },
  keys: true,
  mouse: true,
});

const stopBtn = new Button({
  parent: controls,
  top: 0,
  left: 14,
  width: 10,
  height: 1,
  content: "Stop",
  align: "center",
  style: {
    bg: "red",
    focus: {
      bg: "brightred",
    },
  },
  keys: true,
  mouse: true,
});

const clearBtn = new Button({
  parent: controls,
  top: 0,
  left: 26,
  width: 10,
  height: 1,
  content: "Clear",
  align: "center",
  style: {
    bg: "blue",
    focus: {
      bg: "cyan",
    },
  },
  keys: true,
  mouse: true,
});

const speedLabel = new Box({
  parent: controls,
  top: 0,
  left: 40,
  width: 20,
  height: 1,
  content: "Speed: Normal",
});

// Bottom bar
const bottomBar = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 1,
  content:
    " {inverse} S {/inverse} Start | {inverse} X {/inverse} Stop | {inverse} C {/inverse} Clear | {inverse} F {/inverse} Fast | {inverse} Q {/inverse} Quit ",
  tags: true,
  style: {
    fg: "white",
    bg: "black",
  },
});

// Log simulation state
let isRunning = false;
let logInterval: NodeJS.Timeout | null = null;
let logSpeed = 1000; // ms
let logCount = 0;

const logLevels = [
  { level: "INFO", color: "blue", weight: 70 },
  { level: "WARN", color: "yellow", weight: 20 },
  { level: "ERROR", color: "red", weight: 7 },
  { level: "DEBUG", color: "gray", weight: 3 },
];

const logMessages = [
  "Server started on port 3000",
  "Database connection established",
  "User authentication successful",
  "Processing batch job",
  "Cache invalidated",
  "API request received",
  "Configuration loaded",
  "Service health check passed",
  "Memory usage: 45%",
  "Request completed in 125ms",
  "Session created for user",
  "Background task scheduled",
  "Websocket connection opened",
  "File uploaded successfully",
  "Email notification sent",
];

function getWeightedRandom() {
  const totalWeight = logLevels.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of logLevels) {
    random -= item.weight;
    if (random <= 0) {
      return item;
    }
  }
  return logLevels[0];
}

function generateLogEntry() {
  const timestamp = new Date().toLocaleTimeString();
  const { level, color } = getWeightedRandom();
  const message =
    logMessages[Math.floor(Math.random() * logMessages.length)];
  const reqId = Math.random().toString(36).substring(2, 8);

  logCount++;

  return {
    plain: `[${timestamp}] ${level.padEnd(5)} [${reqId}] ${message}`,
    formatted: `{gray-fg}[${timestamp}]{/} {${color}-fg}{bold}${level.padEnd(5)}{/} {gray-fg}[${reqId}]{/} ${message}`,
  };
}

function addLog() {
  const entry = generateLogEntry();

  // Add to both logs
  regularLog.log(entry.plain);
  fancyLog.log(entry.formatted);

  // Update footer with line count
  fancyLog.setStaticFooter(
    `{gray-bg}{white-fg} [↑/↓] Scroll | [Q] Quit | Lines: ${logCount} {/}`,
  );

  screen.render();
}

function startLogging() {
  if (isRunning) return;

  isRunning = true;
  startBtn.style.bg = "gray";
  stopBtn.style.bg = "red";

  logInterval = setInterval(() => {
    addLog();
  }, logSpeed);

  screen.render();
}

function stopLogging() {
  if (!isRunning) return;

  isRunning = false;
  startBtn.style.bg = "green";
  stopBtn.style.bg = "gray";

  if (logInterval) {
    clearInterval(logInterval);
    logInterval = null;
  }

  screen.render();
}

function clearLogs() {
  // Note: Log widget doesn't have clearItems(), so we'd need to destroy and recreate
  // For this example, we'll just add a separator
  logCount = 0;
  regularLog.log("\n" + "=".repeat(50) + "\n");
  fancyLog.log("\n{bold}" + "=".repeat(50) + "{/}\n");

  fancyLog.setStaticFooter(
    `{gray-bg}{white-fg} [↑/↓] Scroll | [Q] Quit | Lines: ${logCount} {/}`,
  );

  screen.render();
}

function changeSpeed() {
  if (logSpeed === 1000) {
    logSpeed = 200;
    speedLabel.setContent("Speed: Fast");
  } else if (logSpeed === 200) {
    logSpeed = 100;
    speedLabel.setContent("Speed: Very Fast");
  } else {
    logSpeed = 1000;
    speedLabel.setContent("Speed: Normal");
  }

  // Restart if running
  if (isRunning) {
    stopLogging();
    startLogging();
  }

  screen.render();
}

// Button event handlers
startBtn.on("press", startLogging);
stopBtn.on("press", stopLogging);
clearBtn.on("press", clearLogs);

// Focus navigation
startBtn.key("tab", () => stopBtn.focus());
stopBtn.key("tab", () => clearBtn.focus());
clearBtn.key("tab", () => startBtn.focus());

// Keyboard shortcuts
screen.key(["s", "S"], startLogging);
screen.key(["x", "X"], stopLogging);
screen.key(["c", "C"], clearLogs);
screen.key(["f", "F"], changeSpeed);
screen.key(["escape", "q", "Q", "C-c"], () => {
  stopLogging();
  return process.exit(0);
});

// Scroll logs manually
screen.key("up", () => {
  fancyLog.scroll(-1);
  screen.render();
});

screen.key("down", () => {
  fancyLog.scroll(1);
  screen.render();
});

// Add some initial logs
regularLog.log("=".repeat(50));
regularLog.log("Application started");
regularLog.log("Logging system initialized");
regularLog.log("Press 'S' to start streaming logs");
regularLog.log("=".repeat(50));

fancyLog.log("{bold}" + "=".repeat(50) + "{/}");
fancyLog.log("{green-fg}{bold}Application started{/}");
fancyLog.log("{blue-fg}Logging system initialized{/}");
fancyLog.log("{yellow-fg}Press 'S' to start streaming logs{/}");
fancyLog.log("{bold}" + "=".repeat(50) + "{/}");

// Update header with current time
setInterval(() => {
  const now = new Date().toLocaleTimeString();
  fancyLog.setStaticHeader(
    `{bold}{cyan-bg}{black-fg} Application Logs - ${now} {/}`,
  );
  if (!isRunning) {
    screen.render();
  }
}, 1000);

// Focus first button and render
startBtn.focus();
screen.render();
