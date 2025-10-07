// CommonJS Test App for blessed
// This tests that the source works correctly with CommonJS

// Test using the source (lib/blessed.js)
const blessed = require('../../lib/blessed.js');

console.log('✅ blessed loaded successfully (CommonJS)');
console.log('✅ Loaded from: lib/blessed.js (source)');

// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,  // Enable proper emoji/unicode width calculation
  title: 'Blessed CJS Test'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: `{center}{bold}✅ CommonJS Works!{/bold}\n\n` +
           `Using source: lib/blessed.js\n\n` +
           `Press 'q' or ESC to quit.{/center}`,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: 'cyan'
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