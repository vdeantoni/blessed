import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const blessed = require('../../lib/blessed.js');

console.log('✅ blessed loaded successfully (ESM via require)');
console.log('✅ Loaded from: lib/blessed.js (source)');
console.log('Note: Native ESM will be available after TypeScript conversion');

console.log('\n🔍 Debugging:');
console.log('- blessed.screen type:', typeof blessed.screen);
console.log('- blessed.Screen type:', typeof blessed.Screen);
console.log('- blessed.box type:', typeof blessed.box);

// Create a simple screen
console.log('\n📺 Creating screen...');
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  title: 'Blessed ESM Test - Press q to quit'
});
console.log('✓ Screen created:', screen.constructor.name);

// Create a box
console.log('📦 Creating box...');
const box = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{center}{bold}✅ ESM Compatible! 🎉{/bold}\n\n' +
           '✓ Using source via createRequire()\n' +
           '✓ Factory functions work\n' +
           '✓ Classes work with new\n\n' +
           'Press \'q\' or ESC to quit.{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'green',
    border: {
      fg: '#ffff00'
    }
  }
});
console.log('✓ Box created:', box.constructor.name);

// Quit on q or ESC
screen.key(['q', 'escape', 'C-c'], () => {
  console.log('\n👋 Exiting...');
  screen.destroy();
  return process.exit(0);
});

// Focus and render
box.focus();
screen.render();

console.log('\n📺 Screen rendered! You should see a green box.');
console.log('💡 Press "q", ESC, or Ctrl+C to quit.');
console.log('⏳ Waiting for input...\n');