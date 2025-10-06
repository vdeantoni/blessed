// ESM Test App for blessed
// This tests that the ESM build (dist/blessed.mjs) works correctly

import blessed from 'blessed';

console.log('✅ blessed loaded successfully (ESM)');
console.log('Version:', blessed.version || 'unknown');

// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Blessed ESM Test'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: `{center}{bold}✅ ESM Build Works!{/bold}\n\n` +
           `This is using the ESM build from dist/blessed.mjs\n\n` +
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