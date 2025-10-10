/**
 * Benchmark 8: Event Bubbling (50-deep tree)
 *
 * Measures event propagation through a deep widget tree.
 * Tests event bubbling and capture phases.
 */

import blessed from '../dist/blessed.js';
import { measure, formatResult, createMockProgram } from './utils.js';

async function benchmarkEventBubbling() {
  const program = createMockProgram({ cols: 80, rows: 24 });
  const screen = blessed.screen({ program });

  // Create 50-deep tree
  let parent = screen;
  let deepestChild = null;
  for (let i = 0; i < 50; i++) {
    const box = blessed.box({
      parent: parent,
      top: 0,
      left: 0,
      width: '100%-2',
      height: '100%-2',
      keys: true
    });

    // Add event listener to each level
    box.on('keypress', () => {});

    parent = box;
    if (i === 49) deepestChild = box;
  }

  screen.render();

  return measure('Event Bubbling (50-deep tree, 100 events)', () => {
    for (let i = 0; i < 100; i++) {
      deepestChild.emit('keypress', 'a', { name: 'a' });
    }
  }, { iterations: 20, warmup: false });
}

async function run() {
  console.log('Running Event Bubbling Benchmark...');
  const result = await benchmarkEventBubbling();
  console.log(formatResult(result));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkEventBubbling };