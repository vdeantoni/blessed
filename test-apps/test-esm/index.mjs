// ESM Test App for blessed
// Note: Testing ESM with current JavaScript source requires experimental features
// This will work properly once we convert to TypeScript with proper ESM exports

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// For now, load via require until we have proper ESM builds
const blessed = require('../../lib/blessed.js');

console.log('✅ blessed loaded successfully (ESM via require)');
console.log('✅ Loaded from: lib/blessed.js (source)');
console.log('Note: Native ESM will be available after TypeScript conversion');

// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
    fullUnicode: true,  // Enable proper emoji/unicode width calculation
  title: 'Blessed ESM Test'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: `{center}{bold}✅ ESM Compatible!{/bold}\n\n` +
           `Using source via createRequire()\n` +
           `Native ESM after TS conversion\n\n` +
           `Press 'q' or ESC to quit.{/center}`,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'green',
    border: {
      fg: 'yellow'
    }
  }
});

// Quit on q or ESC
screen.key(['q', 'escape'], () => {
  return process.exit(0);
});

// Focus and render
box.focus();
screen.render();

console.log('Screen rendered. Press "q" to quit.');