# Performance Baseline Metrics

**Status:** ✅ Partial baseline established (1 of 12 benchmarks)

**Date:** 2025-01-06
**Node:** v24.9.0
**Platform:** darwin arm64

## Established Baselines

### Rendering Benchmarks

| Benchmark | Average | Min | Max | Throughput | Memory Delta (Heap Used) |
|-----------|---------|-----|-----|------------|-------------------------|
| **Empty Screen Render** | **5.775 ms** | 3.734 ms | 21.937 ms | 173.16 ops/sec | +14.94 MB |

### Notes
- Empty screen render includes screen creation, enter(), render(), and destroy()
- Memory delta shows net increase per iteration (includes allocation overhead)
- Real terminal I/O is used (not mocked)

## Pending Baselines

The following benchmarks require mock program refinement to avoid terminal rendering issues:

### Rendering (Pending)
- Complex screen with 100 nested boxes
- Large text box with 10K lines

### Scalability (Pending)
- Large list with 10K items + scrolling
- Large table with 100x10 cells

### Event Processing (Pending)
- 1000 keyboard events
- 1000 mouse events
- Event bubbling through 50-deep tree

### Layout (Pending)
- 50 elements with percentage positioning
- Percentage recalculation stress test

### Memory (Pending)
- Baseline memory footprint
- Memory with 10K list items

## Benchmark Infrastructure

The following benchmark files have been created in `/benchmarks`:

### Rendering Benchmarks (01-*.js)
- `01-render-empty.js` - Empty screen render baseline
- `01-render-complex.js` - Complex screen with 100 nested boxes
- `01-render-large-text.js` - Large text box with 10K lines

### Scalability Benchmarks (02-*.js)
- `02-scalability-list.js` - Large list with 10K items + scrolling
- `02-scalability-table.js` - Large table with 100x10 cells

### Event Processing Benchmarks (03-*.js)
- `03-events-keys.js` - 1000 keyboard events
- `03-events-mouse.js` - 1000 mouse events
- `03-events-bubbling.js` - Event propagation through 50-deep tree

### Layout Benchmarks (04-*.js)
- `04-layout-complex.js` - 50 elements with percentage positioning
- `04-layout-percentage.js` - Percentage recalculation stress test

### Memory Benchmarks (05-*.js)
- `05-memory-simple.js` - Baseline memory footprint
- `05-memory-large.js` - Memory with 10K list items

## Running Benchmarks

```bash
# Run all benchmarks
npm run bench

# Run with garbage collection exposed (for accurate memory measurements)
npm run bench:gc

# Run individual benchmark
node benchmarks/01-render-empty.js
```

## Baseline Metrics

### To Be Established

Baseline metrics will be documented here once the mock program interface is finalized.
The current implementation requires refinement to properly mock the terminal program
interface without requiring actual terminal I/O.

### Approach

Two options are being considered:

1. **Real Terminal Benchmarks**: Run against actual terminal with output suppressed
   - Pro: Tests real-world performance
   - Con: Terminal-dependent, harder to run in CI

2. **Mock Terminal Benchmarks**: Complete mock implementation
   - Pro: Consistent, fast, CI-friendly
   - Con: May not reflect real performance characteristics

### Next Steps

- [ ] Finalize mock program implementation (use __tests__/helpers/mock.js as base)
- [ ] Run initial baseline measurements
- [ ] Document baseline numbers in this file
- [ ] Setup CI workflow to track performance over time
- [ ] Establish acceptable regression thresholds (suggest: 10%)

## Performance Targets

Based on similar TUI libraries, targets will be set for:

- **Empty Screen Render**: < 5ms
- **Complex Screen (100 boxes)**: < 50ms
- **Large Text (10K lines)**: < 100ms
- **Large List (10K items)**: < 150ms initial, < 1ms per scroll
- **Event Processing**: < 0.01ms per event
- **Memory (Simple)**: < 10MB
- **Memory (10K List)**: < 50MB

These are preliminary targets and will be adjusted based on actual baseline measurements.

## Regression Policy

Once baselines are established:
- PRs that regress performance by >10% will require justification
- Performance improvements >10% should be highlighted in changelog
- Memory increases >20% require careful review

---

*Last Updated: 2025-01-06*
*Status: Infrastructure Complete, Measurements Pending*