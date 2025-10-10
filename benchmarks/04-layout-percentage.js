/**
 * Benchmark 10: Percentage Positioning Recalculation
 *
 * Measures cost of recalculating percentage-based positions.
 * Tests layout invalidation and reflow.
 */

import blessed from '../dist/blessed.js';
import { measure, formatResult, createMockProgram } from './utils.js';

async function benchmarkPercentageRecalc() {
  const program = createMockProgram({ cols: 80, rows: 24 });
  const screen = blessed.screen({ program });

  // Create elements with percentage positioning
  const boxes = [];
  for (let i = 0; i < 20; i++) {
    boxes.push(blessed.box({
      parent: screen,
      top: `${i * 5}%`,
      left: '10%',
      width: '80%',
      height: '5%',
      border: 'line'
    }));
  }

  screen.render();

  return measure('Percentage Positioning Recalc (20 boxes, 100 reflows)', () => {
    for (let i = 0; i < 100; i++) {
      // Trigger layout recalculation
      boxes.forEach((box, idx) => {
        box.width = `${70 + (i % 20)}%`;
      });
      screen.render();
    }
  }, { iterations: 10, warmup: false });
}

async function run() {
  console.log('Running Percentage Positioning Recalculation Benchmark...');
  const result = await benchmarkPercentageRecalc();
  console.log(formatResult(result));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkPercentageRecalc };