/**
 * Benchmark 2: Complex Screen Render (100 Nested Boxes)
 *
 * Measures rendering performance with a complex widget tree.
 * Tests nested layout calculations and buffer operations.
 */

import blessed from '@unblessed/blessed';
import { measure, formatResult, createMockProgram } from './utils.js';

async function benchmarkComplexScreen() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  return measure('Complex Screen Render (100 boxes)', () => {
    const screen = blessed.screen({ program });

    // Create 100 nested boxes
    let parent = screen;
    for (let i = 0; i < 100; i++) {
      parent = blessed.box({
        parent: parent,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: `Box ${i}`,
        border: 'line'
      });
    }

    screen.render();
    screen.destroy();
  }, { iterations: 50 }); // Reduced from 100 to prevent OOM
}

async function run() {
  console.log('Running Complex Screen Render Benchmark...');
  const result = await benchmarkComplexScreen();
  console.log(formatResult(result));
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkComplexScreen };