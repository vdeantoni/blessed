#!/usr/bin/env tsx
/**
 * Static widget example - immutable content rendering
 *
 * Demonstrates the Static widget inspired by ink's <Static> component.
 * Perfect for logs, completed tasks, or any content that should remain
 * immutable once rendered. Only new items are rendered, previous items
 * are never re-rendered.
 *
 * Run with:
 *   pnpm tsx examples/static-widget.ts
 */

import { Screen, Box, Static } from "../dist/index.js";

const screen = new Screen({
  smartCSR: true,
  title: "Static Widget Example",
});

// Header
const header = new Box({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  height: 3,
  content:
    "{bold}{cyan-fg}Static Widget Demo{/cyan-fg}{/bold}\n" +
    "Watch as tasks are completed and rendered immutably",
  tags: true,
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Static widget for completed tasks
interface Task {
  name: string;
  duration: string;
  status: "success" | "error" | "warning";
}

const completedTasks: Task[] = [];

const staticWidget = new Static<Task>({
  parent: screen,
  top: 3,
  left: 1,
  width: "100%-2",
  height: "100%-8",
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "green",
    },
  },
  label: " Completed Tasks (Immutable) ",
  renderItem: (task: Task, index: number) => {
    const icons = {
      success: "{green-fg}✓{/green-fg}",
      error: "{red-fg}✗{/red-fg}",
      warning: "{yellow-fg}⚠{/yellow-fg}",
    };
    return `  ${icons[task.status]} Task ${index + 1}: ${task.name} {gray-fg}(${task.duration}){/gray-fg}`;
  },
  tags: true,
});

// Current task display
const currentTask = new Box({
  parent: screen,
  bottom: 4,
  left: 1,
  width: "100%-2",
  height: 3,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "yellow",
    },
    fg: "yellow",
  },
  label: " Current Task ",
  content: "{bold}Initializing...{/bold}",
  tags: true,
});

// Instructions
const instructions = new Box({
  parent: screen,
  bottom: 0,
  left: 0,
  width: "100%",
  height: 1,
  content:
    " Press {inverse} Space {/inverse} to add task | {inverse} C {/inverse} to clear | {inverse} Q {/inverse} to quit ",
  tags: true,
  style: {
    fg: "white",
    bg: "black",
  },
});

// Sample tasks to simulate
const taskQueue = [
  { name: "Initialize project", duration: "1.2s", status: "success" as const },
  { name: "Install dependencies", duration: "3.5s", status: "success" as const },
  { name: "Run type checking", duration: "2.1s", status: "success" as const },
  { name: "Run linter", duration: "0.8s", status: "warning" as const },
  { name: "Run unit tests", duration: "4.2s", status: "success" as const },
  { name: "Build production bundle", duration: "5.7s", status: "success" as const },
  { name: "Run integration tests", duration: "2.3s", status: "error" as const },
  { name: "Generate documentation", duration: "1.9s", status: "success" as const },
  { name: "Deploy to staging", duration: "3.2s", status: "success" as const },
];

let taskIndex = 0;
let isRunning = false;

// Simulate task completion
function processNextTask() {
  if (taskIndex >= taskQueue.length) {
    currentTask.setContent(
      "{bold}{green-fg}All tasks completed!{/green-fg}{/bold}\n" +
        `Total: ${completedTasks.length} tasks`,
    );
    screen.render();
    isRunning = false;
    return;
  }

  const task = taskQueue[taskIndex];

  // Show current task
  currentTask.setContent(
    `{bold}Processing:{/bold} ${task.name}...\n` +
      `{gray-fg}Task ${taskIndex + 1} of ${taskQueue.length}{/gray-fg}`,
  );
  screen.render();

  // Simulate task duration
  setTimeout(() => {
    // Add to completed tasks
    completedTasks.push(task);
    staticWidget.addItem(task);

    taskIndex++;
    screen.render();

    // Process next task
    if (isRunning) {
      setTimeout(() => processNextTask(), 500);
    }
  }, Math.random() * 1000 + 500);
}

// Manual task addition
function addRandomTask() {
  if (isRunning) return;

  const statuses: Array<"success" | "error" | "warning"> = [
    "success",
    "error",
    "warning",
  ];
  const randomTask: Task = {
    name: `Custom task ${Date.now()}`,
    duration: `${(Math.random() * 5).toFixed(1)}s`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };

  completedTasks.push(randomTask);
  staticWidget.addItem(randomTask);

  currentTask.setContent(
    `{bold}{green-fg}Added task manually!{/green-fg}{/bold}\n` +
      `Total: ${completedTasks.length} tasks`,
  );
  screen.render();
}

// Clear all tasks
function clearTasks() {
  completedTasks.length = 0;
  taskIndex = 0;
  staticWidget.clearItems();
  currentTask.setContent("{bold}Cleared all tasks{/bold}");
  screen.render();
}

// Key handlers
screen.key(["escape", "q", "C-c"], () => {
  return process.exit(0);
});

screen.key("space", () => {
  if (!isRunning) {
    isRunning = true;
    processNextTask();
  } else {
    addRandomTask();
  }
});

screen.key(["c", "C"], () => {
  clearTasks();
});

screen.key("r", () => {
  clearTasks();
  isRunning = true;
  processNextTask();
});

// Initial render
screen.render();

// Auto-start after a moment
setTimeout(() => {
  currentTask.setContent(
    "{bold}Press {inverse} Space {/inverse} to start processing tasks{/bold}",
  );
  screen.render();
}, 100);
