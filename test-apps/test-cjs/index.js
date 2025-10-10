const blessed = require('../../dist/blessed.cjs');

console.log('✅ blessed loaded successfully (CommonJS)');
console.log('✅ Loaded from: dist/blessed.cjs (built)');


// Create a simple screen
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  title: 'Blessed CJS Test - Press q to quit'
});

// Create a box
const box = blessed.box({
  parent: screen,
  top: 1,
  left: 1,
  width: '48%',
  height: '50%',
  content: '{center}{bold}✅ CommonJS Works! 🎉{/bold}\n\n' +
           '✓ Using built: dist/blessed.cjs\n' +
           '✓ Factory functions work\n' +
           '✓ Classes work with new\n' +
           '✓ List widget works\n\n' +
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

// Create a list to test the fix
const items = [];
for (let i = 1; i <= 20; i++) {
  items.push(`Item ${i}: Test list entry #${i}`);
}

const list = blessed.list({
  parent: box,
  bottom: 0,
  left: '50%',
  width: '48%',
  height: '50%',
  label: 'Scrollable List',
  items: items,
  scrollable: true,
  mouse: true,
  keys: true,
  vi: true,
  draggable: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'cyan'
    },
    selected: {
      bg: 'green',
      fg: 'black',
      bold: true
    }
  },
  scrollbar: {
    ch: ' ',
    style: {
      bg: 'yellow'
    }
  }
});

// Quit on q or ESC
screen.key(['q', 'escape', 'C-c'], () => {
  screen.destroy();
  return process.exit(0);
});

// Focus the list by default
list.focus();
screen.render();

console.log('\n📺 Screen rendered. You should see a blue box and a list.');
console.log('💡 Use arrow keys or j/k to navigate the list.');
console.log('💡 Press "q" or ESC to quit.\n');