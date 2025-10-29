#!/usr/bin/env tsx
/**
 * Dashboard example with live updating metrics
 *
 * Run with:
 *   pnpm example:dashboard
 */

import { Box, ProgressBar, Screen, Table, Text } from "../dist/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "System Dashboard",
});

// Header
const header = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content: "{center}{bold}{cyan-fg}System Dashboard{/cyan-fg}{/bold}{/center}",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Sidebar
const sidebar = new Box({
  parent: screen,
  top: 3,
  left: 0,
  width: 20,
  height: "100%-3",
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "cyan",
    },
  },
  label: " Menu ",
});

const menuItems = new Text({
  parent: sidebar,
  top: 1,
  left: 1,
  content:
    "{bold}Viewing:{/bold}\n" +
    "{green-fg}▸ Metrics{/green-fg}\n\n" +
    "Live dashboard\n" +
    "with real-time\n" +
    "updates.\n\n" +
    "{gray-fg}Press q to quit{/gray-fg}",
  tags: true,
});

// Main content area
const content = new Box({
  parent: screen,
  top: 3,
  left: 20,
  width: "100%-20",
  height: "100%-3",
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "green",
    },
  },
  label: " Metrics ",
});

// CPU Progress Bar
const cpuLabel = new Text({
  parent: content,
  top: 1,
  left: 2,
  content: "CPU Usage:",
  style: {
    fg: "white",
  },
});

const cpuBar = new ProgressBar({
  parent: content,
  top: 2,
  left: 2,
  width: "50%",
  height: 1,
  border: {
    type: "line",
  },
  style: {
    bar: {
      bg: "green",
    },
    border: {
      fg: "white",
    },
  },
  filled: 0,
});

// Memory Progress Bar
const memLabel = new Text({
  parent: content,
  top: 4,
  left: 2,
  content: "Memory Usage:",
  style: {
    fg: "white",
  },
});

const memBar = new ProgressBar({
  parent: content,
  top: 5,
  left: 2,
  width: "50%",
  height: 1,
  border: {
    type: "line",
  },
  style: {
    bar: {
      bg: "yellow",
    },
    border: {
      fg: "white",
    },
  },
  filled: 0,
});

// Network Progress Bar
const netLabel = new Text({
  parent: content,
  top: 7,
  left: 2,
  content: "Network I/O:",
  style: {
    fg: "white",
  },
});

const netBar = new ProgressBar({
  parent: content,
  top: 8,
  left: 2,
  width: "50%",
  height: 1,
  border: {
    type: "line",
  },
  style: {
    bar: {
      bg: "cyan",
    },
    border: {
      fg: "white",
    },
  },
  filled: 0,
});

// Stats Table
const statsTable = new Table({
  parent: content,
  top: 10,
  left: 2,
  width: "90%",
  height: 8,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
    header: {
      fg: "cyan",
      bold: true,
    },
    cell: {
      fg: "white",
    },
  },
  data: [
    ["Metric", "Value", "Status"],
    ["Uptime", "2d 5h 30m", "✓"],
    ["Processes", "234", "✓"],
    ["Threads", "1,245", "✓"],
    ["Load Avg", "1.23, 1.45, 1.67", "✓"],
  ],
});

// Update metrics periodically
let cpu = 0;
let mem = 0;
let net = 0;

const updateInterval = setInterval(() => {
  // Simulate changing metrics
  cpu = Math.min(100, cpu + (Math.random() * 10 - 5));
  mem = Math.min(100, mem + (Math.random() * 8 - 4));
  net = Math.min(100, net + (Math.random() * 15 - 7.5));

  cpu = Math.max(0, cpu);
  mem = Math.max(0, mem);
  net = Math.max(0, net);

  cpuBar.setProgress(cpu);
  memBar.setProgress(mem);
  netBar.setProgress(net);

  cpuLabel.setContent(`CPU Usage: ${cpu.toFixed(1)}%`);
  memLabel.setContent(`Memory Usage: ${mem.toFixed(1)}%`);
  netLabel.setContent(`Network I/O: ${net.toFixed(1)}%`);

  screen.render();
}, 500);

// Cleanup on exit
screen.key(["escape", "q", "C-c"], () => {
  clearInterval(updateInterval);
  return process.exit(0);
});

// Initial render
screen.render();
