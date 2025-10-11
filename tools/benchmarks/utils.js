/**
 * Benchmark utilities for measuring performance
 */

/**
 * Measure execution time and memory usage of a function
 * @param {string} name - Benchmark name
 * @param {Function} fn - Function to benchmark
 * @param {Object} options - Options
 * @param {number} options.iterations - Number of iterations (default: 1)
 * @param {boolean} options.warmup - Run warmup iteration (default: true)
 * @returns {Promise<Object>} Results with time and memory metrics
 */
async function measure(name, fn, options = {}) {
  const { iterations = 1, warmup = true } = options;

  // Warmup run to avoid cold start bias
  if (warmup) {
    await fn();
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    // Wait a bit for GC to settle
    await sleep(100);
  }

  const results = [];

  for (let i = 0; i < iterations; i++) {
    const memBefore = process.memoryUsage();
    const startTime = process.hrtime.bigint();

    await fn();

    const endTime = process.hrtime.bigint();
    const memAfter = process.memoryUsage();

    const duration = Number(endTime - startTime) / 1e6; // Convert to milliseconds
    const memDelta = {
      rss: memAfter.rss - memBefore.rss,
      heapTotal: memAfter.heapTotal - memBefore.heapTotal,
      heapUsed: memAfter.heapUsed - memBefore.heapUsed,
      external: memAfter.external - memBefore.external
    };

    results.push({ duration, memDelta });

    // Force GC between iterations to prevent memory buildup
    if (i < iterations - 1) {
      if (global.gc) {
        global.gc();
      }
      await sleep(50);
    }
  }

  // Calculate statistics
  const durations = results.map(r => r.duration);
  const avgDuration = average(durations);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const stdDev = standardDeviation(durations);

  const avgMemDelta = {
    rss: average(results.map(r => r.memDelta.rss)),
    heapTotal: average(results.map(r => r.memDelta.heapTotal)),
    heapUsed: average(results.map(r => r.memDelta.heapUsed)),
    external: average(results.map(r => r.memDelta.external))
  };

  return {
    name,
    iterations,
    avgDuration,
    minDuration,
    maxDuration,
    stdDev,
    avgMemDelta,
    opsPerSec: iterations > 1 ? 1000 / avgDuration : null
  };
}

/**
 * Measure throughput (operations per second)
 * @param {string} name - Benchmark name
 * @param {Function} fn - Function to benchmark
 * @param {Object} options - Options
 * @param {number} options.duration - Duration to run in ms (default: 1000)
 * @returns {Promise<Object>} Results with ops/sec
 */
async function measureThroughput(name, fn, options = {}) {
  const { duration = 1000 } = options;

  // Warmup
  await fn();
  if (global.gc) global.gc();
  await sleep(100);

  const startTime = Date.now();
  let operations = 0;

  while (Date.now() - startTime < duration) {
    await fn();
    operations++;
  }

  const actualDuration = Date.now() - startTime;
  const opsPerSec = (operations / actualDuration) * 1000;

  return {
    name,
    operations,
    duration: actualDuration,
    opsPerSec
  };
}

/**
 * Format results for display
 * @param {Object} result - Benchmark result
 * @returns {string} Formatted output
 */
function formatResult(result) {
  const lines = [];
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(`Benchmark: ${result.name}`);
  lines.push(`${'='.repeat(60)}`);

  if (result.iterations) {
    lines.push(`Iterations: ${result.iterations}`);
    lines.push(`Average: ${result.avgDuration.toFixed(3)} ms`);
    lines.push(`Min: ${result.minDuration.toFixed(3)} ms`);
    lines.push(`Max: ${result.maxDuration.toFixed(3)} ms`);
    lines.push(`Std Dev: ${result.stdDev.toFixed(3)} ms`);

    if (result.opsPerSec) {
      lines.push(`Throughput: ${result.opsPerSec.toFixed(2)} ops/sec`);
    }

    lines.push('\nMemory Delta (Average):');
    lines.push(`  RSS: ${formatBytes(result.avgMemDelta.rss)}`);
    lines.push(`  Heap Total: ${formatBytes(result.avgMemDelta.heapTotal)}`);
    lines.push(`  Heap Used: ${formatBytes(result.avgMemDelta.heapUsed)}`);
  } else if (result.opsPerSec) {
    lines.push(`Operations: ${result.operations}`);
    lines.push(`Duration: ${result.duration} ms`);
    lines.push(`Throughput: ${result.opsPerSec.toFixed(2)} ops/sec`);
  }

  lines.push(`${'='.repeat(60)}\n`);
  return lines.join('\n');
}

/**
 * Format bytes to human readable format
 * @param {number} bytes - Bytes
 * @returns {string} Formatted string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';

  const sign = bytes < 0 ? '-' : '+';
  bytes = Math.abs(bytes);

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return sign + (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Calculate average
 */
function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Calculate standard deviation
 */
function standardDeviation(arr) {
  const avg = average(arr);
  const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
  return Math.sqrt(average(squareDiffs));
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a mock program for benchmarking (doesn't actually write to terminal)
 * Based on test mock but optimized for benchmarking
 */
function createMockProgram(options = {}) {
  const { cols = 80, rows = 24 } = options;

  const output = {
    write: () => {},
    on: () => {},
    once: () => {},
    emit: () => {},
    removeListener: () => {},
    isTTY: true,
    columns: cols,
    rows: rows
  };

  const input = {
    on: () => {},
    once: () => {},
    emit: () => {},
    removeListener: () => {},
    pause: () => {},
    resume: () => {},
    isTTY: true,
    isRaw: false,
    setRawMode: () => {}
  };

  const program = {
    cols,
    rows,
    output,
    input,
    resizeTimeout: null,
    useBuffer: false,
    zero: false,
    x: 0,
    y: 0,
    savedX: 0,
    savedY: 0,
    scrollTop: 0,
    scrollBottom: rows - 1,
    isAlt: false,
    _exiting: false,
    options: {
      resizeTimeout: null
    },
    listeners: {},
    on: () => {},
    once: () => {},
    removeListener: () => {},
    tput: {
      features: { unicode: true },
      unicode: true,
      numbers: { colors: 256, pairs: 32767, U8: 1 },
      strings: {
        keypad_xmit: '',
        keypad_local: '',
        enter_ca_mode: '',
        exit_ca_mode: '',
        clear_screen: '',
        cursor_invisible: '',
        cursor_visible: '',
        ena_acs: '',
        enter_alt_charset_mode: '',
        exit_alt_charset_mode: '',
        change_scroll_region: 'csr',
        delete_line: 'dl',
        insert_line: 'il'
      },
      bools: {},
      // Terminal capability methods (return empty strings for benchmarking)
      enacs: () => '',
      csr: () => '',
      cup: () => '',
      il: () => '',
      dl: () => '',
      el: () => '',
      ech: () => '',
      cuf: () => '',
      smacs: () => '',
      rmacs: () => '',
      sc: () => '',
      rc: () => '',
      civis: () => '',
      cnorm: () => '',
      setaf: () => '',
      setab: () => '',
      sgr: () => '',
      sgr0: () => ''
    },
    put: {
      keypad_xmit: () => {},
      keypad_local: () => {},
      smcup: () => {},
      rmcup: () => {},
      civis: () => {},
      cnorm: () => {},
      clear: () => {}
    },
    setupTput: () => {},
    cup: () => {},
    csr: () => {},
    cursorPos: () => {},
    showCursor: () => {},
    hideCursor: () => {},
    normalBuffer: () => {},
    alternateBuffer: () => {},
    alloc: () => {},
    clear: () => {},
    write: () => {},
    _write: () => {},
    flush: () => {},
    move: () => {},
    omove: () => {},
    rsetx: () => {},
    rmove: () => {},
    simpleInsert: () => {},
    simpleDelete: () => {},
    insertLine: () => {},
    deleteLine: () => {},
    insertLineNC: () => {},
    deleteLineNC: () => {},
    setScrollRegion: () => {},
    resetScrollRegion: () => {},
    _attr: () => null,
    attr: () => {},
    fg: () => {},
    bg: () => {},
    sgr: () => {},
    setForeground: () => {},
    setBackground: () => {},
    enableMouse: () => {},
    disableMouse: () => {},
    _listenMouse: () => {},
    _listenKeys: () => {},
    destroy: () => {},
    key: () => {},
    onceKey: () => {},
    unkey: () => {},
    removeKey: () => {}
  };

  return program;
}

export {
  measure,
  measureThroughput,
  formatResult,
  formatBytes,
  sleep,
  createMockProgram
};