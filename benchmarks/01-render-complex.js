/**
 * Benchmark 2: Complex Screen Render (100 Nested Boxes)
 *
 * Measures rendering performance with a complex widget tree.
 * Tests nested layout calculations and buffer operations.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

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
  }, { iterations: 100 });
}

async function run() {
  console.log('Running Complex Screen Render Benchmark...');
  const result = await benchmarkComplexScreen();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkComplexScreen };