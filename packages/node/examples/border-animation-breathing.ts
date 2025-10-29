/**
 * Border Animation - Breathing Gradient
 *
 * Demonstrates addressable border colors with a breathing gradient effect.
 * The border smoothly transitions between colors with a pulsing alpha.
 */

import { Screen, Box, Text, generateGradient } from "@unblessed/node";

const screen = new Screen({
  smartCSR: true,
  fullUnicode: true,
  title: "Border Animation - Breathing Gradient",
});

// Title
const title = new Text({
  parent: screen,
  top: 1,
  left: "center",
  content: "{bold}{white-fg}💙 Breathing Gradient Effect 💙{/}",
  tags: true,
});

// Box with breathing gradient
const breathingBox = new Box({
  parent: screen,
  top: 4,
  left: "center",
  width: 50,
  height: 15,
  content:
    "{center}\n\n" +
    "{center}{bold}{cyan-fg}Breathing Effect{/}\n\n" +
    "{center}The border pulses between\n" +
    "{center}cyan and magenta\n\n" +
    "{center}{dim}Like a glowing screen{/}",
  tags: true,
  padding: 2,
  shadow: true,
  border: {
    type: "line",
    colors: [], // Will be updated in animation
    repeatColors: true,
  },
});

const borderLength = breathingBox.getBorderLength();

// Base gradient from cyan to magenta
const baseGradient = generateGradient("cyan", "magenta", borderLength);

// Animation state
let breathPhase = 0;

// Update function - modulate gradient intensity
function updateBreathing() {
  // Create breathing effect by modulating color intensity
  breathPhase += 0.05;
  const intensity = (Math.sin(breathPhase) + 1) / 2; // 0 to 1

  const breathingColors = baseGradient.map(hexColor => {
    // Extract RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Modulate intensity (breathing effect)
    const newR = Math.round(r * (0.3 + intensity * 0.7));
    const newG = Math.round(g * (0.3 + intensity * 0.7));
    const newB = Math.round(b * (0.3 + intensity * 0.7));

    // Convert back to hex
    return "#" + [newR, newG, newB].map(n => n.toString(16).padStart(2, '0')).join('');
  });

  breathingBox.setBorderColors(breathingColors);
}

// Initialize
updateBreathing();

// Animate
const animationInterval = setInterval(() => {
  updateBreathing();
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
    "{center}Breathing effect: Gradient pulses using sine wave modulation\n" +
    "{center}Border length: " + borderLength + " cells | Gradient: cyan → magenta\n" +
    "{center}{dim}Press 'q' or Ctrl+C to exit{/}",
  tags: true,
});

// Cleanup
screen.key(["q", "C-c"], () => {
  clearInterval(animationInterval);
  process.exit(0);
});

screen.render();
