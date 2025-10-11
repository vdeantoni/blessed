# Blessed Performance Benchmarks

This directory contains performance benchmarks for the blessed library to track performance over time and catch regressions.

## Running Benchmarks

```bash
# Run all benchmarks
npm run bench

# Run specific benchmark
node benchmarks/01-render-empty.js
```

## Benchmark Categories

1. **Rendering** (`01-*.js`) - Screen and widget rendering performance
2. **Scalability** (`02-*.js`) - Performance with large datasets
3. **Events** (`03-*.js`) - Event processing and propagation
4. **Layout** (`04-*.js`) - Positioning and layout calculations
5. **Memory** (`05-*.js`) - Memory usage patterns

## Understanding Results

Each benchmark outputs:
- **Time**: Execution time in milliseconds
- **Memory**: Memory usage delta (RSS and heap)
- **Operations/sec**: Throughput when applicable

### Baseline Metrics (Established: 2025-01-06)

See `BASELINE.md` for documented baseline performance numbers.

## Adding New Benchmarks

1. Create a new file following the naming convention: `NN-category-name.js`
2. Use the helper utilities from `utils.js`
3. Document what you're measuring and why
4. Add baseline results to `BASELINE.md`

## CI Integration

Benchmarks run on every commit to track performance trends over time.
See `.github/workflows/benchmarks.yml` for CI configuration.