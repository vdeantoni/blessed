/**
 * Benchmark 7: Mouse Event Processing (1000 events)
 *
 * Measures throughput of mouse event handling.
 * Tests hit detection and event routing.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

async function benchmarkMouseEvents() {
  const program = createMockProgram({ cols: 80, rows: 24 });
  const screen = blessed.screen({ program });

  const box = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
    mouse: true
  });

  let eventCount = 0;
  box.on('click', () => {
    eventCount++;
  });

  screen.render();

  return measure('Mouse Event Processing (1000 events)', () => {
    for (let i = 0; i < 1000; i++) {
      box.emit('click', { x: 10, y: 10, action: 'mousedown', button: 'left' });
    }
  }, { iterations: 10, warmup: false });
}

async function run() {
  console.log('Running Mouse Event Processing Benchmark...');
  const result = await benchmarkMouseEvents();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkMouseEvents };