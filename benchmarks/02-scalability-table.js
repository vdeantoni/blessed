/**
 * Benchmark 5: Large Table (100x100 Cells)
 *
 * Measures performance with large tabular data.
 * Tests table rendering and cell formatting.
 */

const blessed = require('../lib/blessed');
const { measure, formatResult, createMockProgram } = require('./utils');

async function benchmarkLargeTable() {
  const program = createMockProgram({ cols: 120, rows: 40 });

  // Generate 100x100 table data
  const data = [['Col0', 'Col1', 'Col2', 'Col3', 'Col4', 'Col5', 'Col6', 'Col7', 'Col8', 'Col9']];
  for (let row = 0; row < 100; row++) {
    const rowData = [];
    for (let col = 0; col < 10; col++) {
      rowData.push(`R${row}C${col}`);
    }
    data.push(rowData);
  }

  return measure('Large Table (100x10 cells)', () => {
    const screen = blessed.screen({ program });

    blessed.table({
      parent: screen,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      data: data,
      border: 'line',
      style: {
        header: {
          fg: 'blue',
          bold: true
        },
        cell: {
          fg: 'white'
        }
      }
    });

    screen.render();
    screen.destroy();
  }, { iterations: 50 });
}

async function run() {
  console.log('Running Large Table Benchmark...');
  const result = await benchmarkLargeTable();
  console.log(formatResult(result));
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { benchmarkLargeTable };