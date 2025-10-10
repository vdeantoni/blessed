/**
 * Benchmark 6: Key Event Processing (1000 events)
 *
 * Measures throughput of keyboard event handling.
 * Tests event system and key normalization.
 */

import blessed from '../dist/blessed.js';
import { measure, formatResult, createMockProgram } from './utils.js';

async function benchmarkKeyEvents() {
  const program = createMockProgram({ cols: 80, rows: 24 });
  const screen = blessed.screen({ program });

  const box = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    keys: true,
    input: true
  });

  let eventCount = 0;
  box.on('keypress', () => {
    eventCount++;
  });

  screen.render();

  return measure('Key Event Processing (1000 events)', () => {
    for (let i = 0; i < 1000; i++) {
      box.emit('keypress', 'a', { name: 'a', sequence: 'a' });
    }
  }, { iterations: 10, warmup: false });
}

async function run() {
  console.log('Running Key Event Processing Benchmark...');
  const result = await benchmarkKeyEvents();
  console.log(formatResult(result));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkKeyEvents };