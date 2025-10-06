/**
 * Benchmark 9: Complex Layout Calculation (50 elements)
 *
 * Measures performance of positioning and layout calculations.
 * Tests percentage-based positioning and nested layouts.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

async function benchmarkComplexLayout() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  return measure('Complex Layout (50 boxes with percentages)', () => {
    const screen = blessed.screen({ program });

    // Create complex layout with percentages
    for (let i = 0; i < 50; i++) {
      blessed.box({
        parent: screen,
        top: `${i * 2}%`,
        left: `${(i % 10) * 10}%`,
        width: '10%',
        height: '5%',
        border: 'line',
        content: `Box ${i}`
      });
    }

    screen.render();
    screen.destroy();
  }, { iterations: 100 });
}

async function run() {
  console.log('Running Complex Layout Benchmark...');
  const result = await benchmarkComplexLayout();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkComplexLayout };