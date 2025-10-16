/**
 * Benchmark 4: Large List (10K Items)
 *
 * Measures performance with large datasets in lists.
 * Tests virtualization and scrolling performance.
 */

import blessed from '@tui/blessed';
import { measure, formatResult, createMockProgram } from './utils.js';

async function benchmarkLargeList() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  // Generate 1K list items (reduced from 10K for baseline benchmarking)
  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(`Item ${i}: Sample list entry with some text`);
  }

  return measure('Large List (1K items - initial render)', () => {
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
  }, { iterations: 5 }); // Reduced from 10 to prevent OOM
}

async function benchmarkListScroll() {
  const program = createMockProgram({ cols: 80, rows: 24 });

  // Reduced from 10K to 1K items for baseline benchmarking
  const items = [];
  for (let i = 0; i < 1000; i++) {
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

  const result = await measure('Large List (scroll 100 items)', () => {
    for (let i = 0; i < 100; i++) {
      list.select(i);
      screen.render();
    }
  }, { iterations: 3, warmup: false }); // Reduced from 5 to prevent OOM

  screen.destroy();
  return result;
}

async function run() {
  console.log('Running Large List Benchmarks...');

  const result1 = await benchmarkLargeList();
  console.log(formatResult(result1));

  const result2 = await benchmarkListScroll();
  console.log(formatResult(result2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkLargeList, benchmarkListScroll };