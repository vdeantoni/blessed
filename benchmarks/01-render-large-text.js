/**
 * Benchmark 3: Large Text Box Rendering
 *
 * Measures performance of rendering large amounts of text content.
 * Tests content handling and scrolling buffer operations.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

async function benchmarkLargeTextBox() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  // Generate 10K lines of text
  const lines = [];
  for (let i = 0; i < 10000; i++) {
    lines.push(`Line ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
  }
  const content = lines.join('\n');

  return measure('Large Text Box (10K lines)', () => {
    const screen = blessed.screen({ program });

    blessed.box({
      parent: screen,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: content,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true
    });

    screen.render();
    screen.destroy();
  }, { iterations: 50 });
}

async function run() {
  console.log('Running Large Text Box Benchmark...');
  const result = await benchmarkLargeTextBox();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkLargeTextBox };