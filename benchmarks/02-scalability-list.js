/**
 * Benchmark 4: Large List (10K Items)
 *
 * Measures performance with large datasets in lists.
 * Tests virtualization and scrolling performance.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

async function benchmarkLargeList() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  // Generate 10K list items
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(`Item ${i}: Sample list entry with some text`);
  }

  return measure('Large List (10K items - initial render)', () => {
    const screen = blessed.screen({ program });

    blessed.list({
      parent: screen,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      items: items,
      scrollable: true,
      mouse: true,
      keys: true,
      style: {
        selected: {
          bg: 'blue'
        }
      }
    });

    screen.render();
    screen.destroy();
  }, { iterations: 50 });
}

async function benchmarkListScroll() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(`Item ${i}`);
  }

  const screen = blessed.screen({ program });
  const list = blessed.list({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    items: items,
    scrollable: true,
    mouse: true,
    keys: true
  });

  screen.render();

  return measure('Large List (scroll 100 items)', () => {
    for (let i = 0; i < 100; i++) {
      list.select(i);
      screen.render();
    }
  }, { iterations: 10, warmup: false });
}

async function run() {
  console.log('Running Large List Benchmarks...');

  const result1 = await benchmarkLargeList();
  console.log(formatResult(result1));

  const result2 = await benchmarkListScroll();
  console.log(formatResult(result2));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkLargeList, benchmarkListScroll };