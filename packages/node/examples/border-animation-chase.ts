/**
 * Border Animation - Loading Chase
 *
 * Demonstrates addressable border colors with a loading/chase animation.
 * Shows a bright "scanner" moving around the border perimeter.
 */

import { Screen, Box, Text } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  title: "Border Animation - Loading Chase",
});

// Title
const title = new Text({
  parent: screen,
  top: 1,
  left: "center",
  content: "{bold}{white-fg}⚡ Loading Chase Animation ⚡{/}",
  tags: true,
});

// Box with chase animation
const chaseBox = new Box({
  parent: screen,
  top: 4,
  left: "center",
  width: 50,
  height: 15,
  content:
    "{center}\n\n" +
    "{center}{bold}{cyan-fg}Loading...{/}\n\n" +
    "{center}A bright scanner moves around\n" +
    "{center}the border perimeter\n\n" +
    "{center}{dim}Like a loading indicator{/}",
  tags: true,
  padding: 2,
  shadow: true,
  border: {
    type: "line",
    colors: [], // Will be initialized below
    repeatColors: true,
  },
});

// Initialize border colors (all gray with one cyan spot)
const borderLength = chaseBox.getBorderLength();
const borderColors: string[] = new Array(borderLength).fill("#333333"); // Dark gray
let chasePosition = 0;
const chaseLength = 5; // Length of the bright chase

// Update function
function updateChase() {
  // Reset all to dark gray
  borderColors.fill("#333333");

  // Set chase colors (gradient from cyan to dark)
  for (let i = 0; i < chaseLength; i++) {
    const pos = (chasePosition - i + borderLength) % borderLength;
    const intensity = 1 - i / chaseLength; // Fade out
    const r = Math.round(0 * intensity);
    const g = Math.round(255 * intensity);
    const b = Math.round(255 * intensity);
    const hex = "#" + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('');
    borderColors[pos] = hex;
  }

  chaseBox.setBorderColors(borderColors);
  chasePosition = (chasePosition + 1) % borderLength;
}

// Initialize
updateChase();

// Animate
const animationInterval = setInterval(() => {
  updateChase();
  screen.render();
}, 1000 / 30); // 30 FPS

// Info
const infoBox = new Box({
  parent: screen,
  bottom: 1,
  left: 2,
  right: 2,
  height: 3,
  content:
    "{center}Chase animation: A bright spot moves around the border\n" +
    "{center}Border length: " + borderLength + " cells | Chase length: " + chaseLength + " cells\n" +
    "{center}{dim}Press 'q' or Ctrl+C to exit{/}",
  tags: true,
});

// Cleanup
screen.key(["q", "C-c"], () => {
  clearInterval(animationInterval);
  process.exit(0);
});

screen.render();
