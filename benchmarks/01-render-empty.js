/**
 * Benchmark 1: Empty Screen Render
 *
 * Measures the baseline cost of creating and rendering an empty screen.
 * This establishes the minimum overhead of the blessed rendering system.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult } = require('./utils');

async function benchmarkEmptyScreen() {
  return measure('Empty Screen Render', () => {
    // Use blessed's own program creation
    const screen = blessed.screen({
      smartCSR: true,
      dump: false,
      log: false,
      debug: false,
      warnings: false,
      buffer: false,
      terminal: 'xterm-256color',
      fullUnicode: false
    });

    try {
      screen.render();
    } finally {
      screen.destroy();
    }
  }, { iterations: 100, warmup: false });
}

async function run() {
  console.log('Running Empty Screen Render Benchmark...');
  console.log('Note: This creates real terminal screens. Output suppressed.');
  const result = await benchmarkEmptyScreen();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkEmptyScreen };