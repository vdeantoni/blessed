/**
 * Border Animation - Rainbow Wave
 *
 * Demonstrates addressable border colors with a rotating rainbow animation.
 * Each border cell is individually addressable like an LED strip!
 */

import { Screen, Box, Text, generateRainbow, rotateColors } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  title: "Addressable Border Colors - Rainbow Animation",
});

// Title
const title = new Text({
  parent: screen,
  top: 1,
  left: "center",
  content: "{bold}{white-fg}🌈 Addressable Border Colors - Rainbow Wave 🌈{/}",
  tags: true,
});

// Calculate border length for a 60x20 box
const boxWidth = 60;
const boxHeight = 20;
const borderLength = 2 * (boxWidth + boxHeight) - 4;

// Generate rainbow colors for the entire perimeter
const rainbowColors = generateRainbow(borderLength);

// Main box with animated rainbow border
const rainbowBox = new Box({
  parent: screen,
  top: 4,
  left: "center",
  width: boxWidth,
  height: boxHeight,
  content:
    "{center}\n\n" +
    "{center}{bold}{cyan-fg}Addressable Border Colors{/}\n\n" +
    "{center}Each border cell has its own color!\n" +
    "{center}Just like an RGB LED strip\n\n" +
    "{center}Border Length: " + borderLength + " cells\n" +
    "{center}Animation Speed: 60 FPS\n\n" +
    "{center}{dim}Watch the rainbow wave rotate...{/}",
  tags: true,
  padding: 2,
  shadow: true,
  border: {
    type: "line",
    colors: rainbowColors,
    repeatColors: true,
  },
});

// Info box
const infoBox = new Box({
  parent: screen,
  bottom: 1,
  left: 2,
  right: 2,
  height: 3,
  content:
    "{center}Addressable borders work like RGB LED strips - each cell is individually colored.\n" +
    "{center}API: box.setBorderColors(colors), box.getBorderLength(), rotateColors()\n" +
    "{center}{dim}Press 'q' or Ctrl+C to exit{/}",
  tags: true,
});

// Animate the rainbow
const animationInterval = setInterval(() => {
  const currentColors = rainbowBox.getBorderColors();
  const rotated = rotateColors(currentColors, 1);
  rainbowBox.setBorderColors(rotated);
  screen.render();
}, 1000 / 60); // 60 FPS

// Cleanup on exit
screen.key(["q", "C-c"], () => {
  clearInterval(animationInterval);
  process.exit(0);
});

// Initial render
screen.render();
