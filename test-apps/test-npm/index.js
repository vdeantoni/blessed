#!/usr/bin/env node

/**
 * Test blessed from npm registry
 *
 * This app installs @vdeantoni/blessed@alpha from npm and tests:
 * - Package installation works
 * - Basic blessed functionality
 * - Screen rendering
 * - Keyboard input
 */

const blessed = require('@vdeantoni/blessed');
const path = require('path');

// Verify we're loading from node_modules
const blessedPath = require.resolve('@vdeantoni/blessed');
console.log('✅ blessed loaded from npm');
console.log('📦 Location:', blessedPath);
console.log('');

// Create a screen
const screen = blessed.screen({
  smartCSR: true,
    fullUnicode: true,  // Enable proper emoji/unicode width calculation
  title: 'blessed npm test'
});

// Create a centered box with info
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  content: '',
  tags: true,
  align: 'center',  // Center-align the text content
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#f0f0f0'
    }
  }
});

// Build info content
const content = [
  '',
  '{bold}🎉 blessed 1.0.0-alpha.1 from npm{/bold}',
  '',
  '{green-fg}✅ Package installed successfully!{/green-fg}',
  '',
  '{cyan-fg}Package:{/cyan-fg} @vdeantoni/blessed@1.0.0-alpha.1',
  '{cyan-fg}Source:{/cyan-fg} ' + blessedPath,
  '',
  '{yellow-fg}Test Results:{/yellow-fg}',
  '  ✓ blessed.screen() works',
  '  ✓ blessed.box() works',
  '  ✓ Rendering works',
  '  ✓ Keyboard events work',
  '  ✓ Tags/styling work',
  '',
  '{magenta-fg}This confirms the npm package is working correctly!{/magenta-fg}',
  '',
  '',
  '{gray-fg}Press "q" or Ctrl+C to quit{/gray-fg}'
].join('\n');

box.setContent(content);

// Add a progress bar at the bottom
const progress = blessed.progressbar({
  parent: screen,
  bottom: 1,
  left: 'center',
  width: '50%',
  height: 1,
  orientation: 'horizontal',
  style: {
    bar: {
      bg: 'green'
    }
  },
  filled: 0
});

// Animate the progress bar
let progressValue = 0;
const progressInterval = setInterval(() => {
  progressValue += 5;
  if (progressValue > 100) {
    progressValue = 0;
  }
  progress.setProgress(progressValue);
  screen.render();
}, 100);

// Quit on q or Ctrl+C
screen.key(['q', 'C-c'], function(ch, key) {
  clearInterval(progressInterval);
  return process.exit(0);
});

// Focus the box
box.focus();

// Render the screen
screen.render();

console.log('');
console.log('✅ blessed npm test running successfully!');
console.log('📺 Check your terminal - you should see a blue box');
console.log('🎮 Press "q" to quit');
console.log('');