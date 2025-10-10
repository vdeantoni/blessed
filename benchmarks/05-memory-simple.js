/**
 * Benchmark 11: Memory Usage (Simple App)
 *
 * Measures baseline memory footprint of a simple blessed app.
 */

import blessed from '../lib/blessed.js';
import { formatBytes, sleep } from './utils.js';

async function benchmarkMemorySimple() {
  if (global.gc) global.gc();
  await sleep(100);

  const memBefore = process.memoryUsage();

  const screen = blessed.screen();

  blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello World',
    border: 'line'
  });

  screen.render();

  await sleep(100);

  const memAfter = process.memoryUsage();

  const delta = {
    rss: memAfter.rss - memBefore.rss,
    heapTotal: memAfter.heapTotal - memBefore.heapTotal,
    heapUsed: memAfter.heapUsed - memBefore.heapUsed,
    external: memAfter.external - memBefore.external
  };

  screen.destroy();

  return {
    name: 'Memory Usage (Simple App)',
    memBefore,
    memAfter,
    delta
  };
}

function formatMemResult(result) {
  const lines = [];
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(`Benchmark: ${result.name}`);
  lines.push(`${'='.repeat(60)}`);
  lines.push('\nMemory Before:');
  lines.push(`  RSS: ${formatBytes(result.memBefore.rss)}`);
  lines.push(`  Heap Total: ${formatBytes(result.memBefore.heapTotal)}`);
  lines.push(`  Heap Used: ${formatBytes(result.memBefore.heapUsed)}`);
  lines.push('\nMemory After:');
  lines.push(`  RSS: ${formatBytes(result.memAfter.rss)}`);
  lines.push(`  Heap Total: ${formatBytes(result.memAfter.heapTotal)}`);
  lines.push(`  Heap Used: ${formatBytes(result.memAfter.heapUsed)}`);
  lines.push('\nMemory Delta:');
  lines.push(`  RSS: ${formatBytes(result.delta.rss)}`);
  lines.push(`  Heap Total: ${formatBytes(result.delta.heapTotal)}`);
  lines.push(`  Heap Used: ${formatBytes(result.delta.heapUsed)}`);
  lines.push(`  External: ${formatBytes(result.delta.external)}`);
  lines.push(`${'='.repeat(60)}\n`);
  return lines.join('\n');
}

async function run() {
  console.log('Running Memory Usage (Simple App) Benchmark...');
  console.log('Note: Run with --expose-gc for accurate measurements');
  const result = await benchmarkMemorySimple();
  console.log(formatMemResult(result));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}

export { benchmarkMemorySimple };