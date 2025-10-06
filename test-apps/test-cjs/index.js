// CommonJS Test App for blessed
// This tests that the CJS build (dist/blessed.js) works correctly

const blessed = require('blessed');

console.log('✅ blessed loaded successfully (CommonJS)');
console.log('Version:', blessed.version || 'unknown');

// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Blessed CJS Test'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: `{center}{bold}✅ CommonJS Build Works!{/bold}\n\n` +
           `This is using the CJS build from dist/blessed.js\n\n` +
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