/**
 * Run all benchmarks and collect results
 */

const fs = require('fs');
const path = require('path');

// Import all benchmarks
const { benchmarkEmptyScreen } = require('./01-render-empty');
const { benchmarkComplexScreen } = require('./01-render-complex');
const { benchmarkLargeTextBox } = require('./01-render-large-text');
const { benchmarkLargeList, benchmarkListScroll } = require('./02-scalability-list');
const { benchmarkLargeTable } = require('./02-scalability-table');
const { benchmarkKeyEvents } = require('./03-events-keys');
const { benchmarkMouseEvents } = require('./03-events-mouse');
const { benchmarkEventBubbling } = require('./03-events-bubbling');
const { benchmarkComplexLayout } = require('./04-layout-complex');
const { benchmarkPercentageRecalc } = require('./04-layout-percentage');
const { benchmarkMemorySimple } = require('./05-memory-simple');
const { benchmarkMemoryLargeData } = require('./05-memory-large');

const { formatResult, sleep } = require('./utils');

/**
 * Force garbage collection and wait for it to settle
 */
async function forceGC() {
  if (global.gc) {
    global.gc();
    await sleep(200);
  }
}

async function runAllBenchmarks() {
  console.log('\n' + '='.repeat(70));
  console.log('BLESSED PERFORMANCE BENCHMARKS');
  console.log('='.repeat(70));
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Node: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log(`GC Available: ${global.gc ? 'Yes' : 'No (run with --expose-gc)'}`);
  console.log('='.repeat(70) + '\n');

  const results = [];

  try {
    // Rendering benchmarks
    console.log('\n📊 RENDERING BENCHMARKS\n');
    results.push(await benchmarkEmptyScreen());
    console.log(formatResult(results[results.length - 1]));

    results.push(await benchmarkComplexScreen());
    console.log(formatResult(results[results.length - 1]));

    results.push(await benchmarkLargeTextBox());
    console.log(formatResult(results[results.length - 1]));
    await forceGC();

    // Scalability benchmarks
    console.log('\n📈 SCALABILITY BENCHMARKS\n');
    results.push(await benchmarkLargeList());
    console.log(formatResult(results[results.length - 1]));
    await forceGC();

    results.push(await benchmarkListScroll());
    console.log(formatResult(results[results.length - 1]));
    await forceGC();

    results.push(await benchmarkLargeTable());
    console.log(formatResult(results[results.length - 1]));
    await forceGC();

    // Event processing benchmarks
    console.log('\n⚡ EVENT PROCESSING BENCHMARKS\n');
    results.push(await benchmarkKeyEvents());
    console.log(formatResult(results[results.length - 1]));

    results.push(await benchmarkMouseEvents());
    console.log(formatResult(results[results.length - 1]));

    results.push(await benchmarkEventBubbling());
    console.log(formatResult(results[results.length - 1]));

    // Layout benchmarks
    console.log('\n📐 LAYOUT BENCHMARKS\n');
    results.push(await benchmarkComplexLayout());
    console.log(formatResult(results[results.length - 1]));

    results.push(await benchmarkPercentageRecalc());
    console.log(formatResult(results[results.length - 1]));

    // Memory benchmarks
    console.log('\n💾 MEMORY BENCHMARKS\n');
    const memSimple = await benchmarkMemorySimple();
    console.log(formatMemResult(memSimple));

    const memLarge = await benchmarkMemoryLargeData();
    console.log(formatMemResult(memLarge));

    // Save results to JSON
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(__dirname, 'results', `benchmark-${timestamp}.json`);

    // Ensure results directory exists
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const output = {
      timestamp: new Date().toISOString(),
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      results: results,
      memory: {
        simple: memSimple,
        large: memLarge
      }
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n✅ Results saved to: ${outputPath}\n`);

    // Print summary
    console.log('\n' + '='.repeat(70));
    console.log('SUMMARY');
    console.log('='.repeat(70));
    results.forEach(r => {
      console.log(`${r.name.padEnd(50)} ${r.avgDuration.toFixed(3)} ms`);
    });
    console.log('='.repeat(70) + '\n');

  } catch (error) {
    console.error('\n❌ Benchmark failed:', error);
    process.exit(1);
  }
}

function formatMemResult(result) {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const sign = bytes < 0 ? '-' : '+';
    bytes = Math.abs(bytes);
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return sign + (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  };

  const lines = [];
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(`Benchmark: ${result.name}`);
  lines.push(`${'='.repeat(60)}`);
  lines.push('\nMemory Delta:');
  lines.push(`  RSS: ${formatBytes(result.delta.rss)}`);
  lines.push(`  Heap Total: ${formatBytes(result.delta.heapTotal)}`);
  lines.push(`  Heap Used: ${formatBytes(result.delta.heapUsed)}`);
  lines.push(`${'='.repeat(60)}\n`);
  return lines.join('\n');
}

if (require.main === module) {
  runAllBenchmarks().catch(console.error);
}

module.exports = { runAllBenchmarks };