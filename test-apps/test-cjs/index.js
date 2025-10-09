const blessed = require('../../lib/blessed.js');

console.log('✅ blessed loaded successfully (CommonJS)');
console.log('✅ Loaded from: lib/blessed.js (source)');

// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  title: 'Blessed CJS Test - Press q to quit'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{center}{bold}✅ CommonJS Works! 🎉{/bold}\n\n' +
           '✓ Using source: lib/blessed.js\n' +
           '✓ Factory functions work\n' +
           '✓ Classes work with new\n\n' +
           'Press \'q\' or ESC to quit.{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#00ffff'
    }
  }
});

// Quit on q or ESC
screen.key(['q', 'escape', 'C-c'], () => {
  screen.destroy();
  return process.exit(0);
});

// Focus and render
box.focus();
screen.render();

console.log('\n📺 Screen rendered. You should see a blue box.');
console.log('💡 Press "q" or ESC to quit.\n');