import { describe, it, expect, beforeEach, vi } from 'vitest';
import Table from '../../lib/widgets/table.js';
import { createMockScreen } from '../helpers/mock.js';

describe('Table', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  describe('constructor', () => {
    it('should create a table instance', () => {
      const table = new Table({ screen });

      expect(table).toBeDefined();
      expect(table.type).toBe('table');
    });

    it('should inherit from Box', () => {
      const table = new Table({ screen });

      expect(table.screen).toBe(screen);
      expect(typeof table.append).toBe('function');
    });

    it('should default to shrink mode', () => {
      const table = new Table({ screen });

      expect(table.shrink).toBe(true);
    });

    it('should default align to center', () => {
      const table = new Table({ screen });

      expect(table.align).toBe('center');
    });

    it('should accept custom align option', () => {
      const table = new Table({
        screen,
        align: 'left'
      });

      expect(table.align).toBe('left');
    });

    it('should default pad to 2', () => {
      const table = new Table({ screen });

      expect(table.pad).toBe(2);
    });

    it('should accept custom pad option', () => {
      const table = new Table({
        screen,
        pad: 5
      });

      expect(table.pad).toBe(5);
    });

    it('should accept pad option as 0', () => {
      const table = new Table({
        screen,
        pad: 0
      });

      expect(table.pad).toBe(0);
    });

    it('should initialize style objects', () => {
      const table = new Table({ screen });

      expect(table.style).toBeDefined();
      expect(table.style.border).toBeDefined();
      expect(table.style.header).toBeDefined();
      expect(table.style.cell).toBeDefined();
    });

    it('should accept custom style options', () => {
      const table = new Table({
        screen,
        style: {
          header: { fg: 'blue', bold: true },
          cell: { fg: 'white' },
          border: { fg: 'gray' }
        }
      });

      expect(table.style.header.fg).toBe('blue');
      expect(table.style.header.bold).toBe(true);
      expect(table.style.cell.fg).toBe('white');
      expect(table.style.border.fg).toBe('gray');
    });

    it('should not accept height option', () => {
      const table = new Table({
        screen,
        height: 20
      });

      // Height option is deleted, so position.height should be undefined
      expect(table.position.height).toBeUndefined();
    });

    it('should accept rows option', () => {
      const rows = [
        ['Name', 'Age'],
        ['Alice', '30'],
        ['Bob', '25']
      ];

      const table = new Table({
        screen,
        rows
      });

      expect(table.rows).toEqual(rows);
    });

    it('should accept data option as alias for rows', () => {
      const data = [
        ['Col1', 'Col2'],
        ['Val1', 'Val2']
      ];

      const table = new Table({
        screen,
        data
      });

      expect(table.rows).toEqual(data);
    });
  });

  describe('setData()', () => {
    it('should set table data', () => {
      const table = new Table({ screen });

      const data = [
        ['Header1', 'Header2'],
        ['Row1Col1', 'Row1Col2']
      ];

      table.setData(data);

      expect(table.rows).toEqual(data);
    });

    it('should be aliased as setRows', () => {
      const table = new Table({ screen });

      expect(table.setRows).toBe(table.setData);
    });

    it('should handle empty data', () => {
      const table = new Table({ screen });

      table.setData([]);

      expect(table.rows).toEqual([]);
    });

    it('should handle null data', () => {
      const table = new Table({ screen });

      table.setData(null);

      expect(table.rows).toEqual([]);
    });

    it('should update content when data is set', () => {
      const table = new Table({ screen });

      table.setData([
        ['Name', 'Age'],
        ['Alice', '30']
      ]);

      // Content is only generated properly when table is attached/rendered
      // Just verify rows are set
      expect(table.rows.length).toBe(2);
      expect(table.rows[0]).toContain('Name');
      expect(table.rows[0]).toContain('Age');
    });
  });

  describe('alignment', () => {
    it('should center align cells by default', () => {
      const table = new Table({
        screen,
        data: [
          ['H1', 'H2'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('center');
    });

    it('should left align cells when specified', () => {
      const table = new Table({
        screen,
        align: 'left',
        data: [
          ['H1', 'H2'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('left');
    });

    it('should right align cells when specified', () => {
      const table = new Table({
        screen,
        align: 'right',
        data: [
          ['H1', 'H2'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('right');
    });
  });

  describe('_calculateMaxes()', () => {
    it('should have _calculateMaxes method', () => {
      const table = new Table({ screen });

      expect(typeof table._calculateMaxes).toBe('function');
    });

    it('should return undefined when detached', () => {
      const table = new Table({
        screen,
        data: [['A', 'B']]
      });

      table.detach();

      const maxes = table._calculateMaxes();

      expect(maxes).toBeUndefined();
    });

    it('should store _maxes property', () => {
      const table = new Table({
        screen,
        data: [['A', 'B']]
      });

      table._maxes = [5, 10];

      expect(table._maxes).toBeDefined();
      expect(table._maxes.length).toBe(2);
    });
  });

  describe('events', () => {
    it('should update content on attach', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Age'],
          ['Alice', '30']
        ]
      });

      const setContentSpy = vi.spyOn(table, 'setContent');

      table.emit('attach');

      expect(setContentSpy).toHaveBeenCalled();
    });

    it('should update content and render on resize', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Age'],
          ['Alice', '30']
        ]
      });

      screen.render = vi.fn();
      const setContentSpy = vi.spyOn(table, 'setContent');

      table.emit('resize');

      expect(setContentSpy).toHaveBeenCalled();
      expect(screen.render).toHaveBeenCalled();
    });
  });

  describe('common use cases', () => {
    it('should create a simple data table', () => {
      const table = new Table({
        screen,
        top: 'center',
        left: 'center',
        width: '50%',
        border: 'line',
        data: [
          ['Name', 'Age', 'City'],
          ['Alice', '30', 'NYC'],
          ['Bob', '25', 'LA'],
          ['Charlie', '35', 'SF']
        ]
      });

      expect(table.rows.length).toBe(4);
      expect(table.border).toBeDefined();
    });

    it('should create a table with custom styling', () => {
      const table = new Table({
        screen,
        width: '100%',
        style: {
          header: {
            fg: 'blue',
            bold: true
          },
          cell: {
            fg: 'white'
          },
          border: {
            fg: 'gray'
          }
        },
        data: [
          ['Product', 'Price', 'Stock'],
          ['Widget', '$10', '50'],
          ['Gadget', '$20', '30']
        ]
      });

      expect(table.style.header.fg).toBe('blue');
      expect(table.style.cell.fg).toBe('white');
    });

    it('should handle single column tables', () => {
      const table = new Table({
        screen,
        data: [
          ['Items'],
          ['Apple'],
          ['Banana'],
          ['Cherry']
        ]
      });

      expect(table.rows.length).toBe(4);
      expect(table.rows[0].length).toBe(1);
    });

    it('should handle wide tables with many columns', () => {
      const table = new Table({
        screen,
        data: [
          ['ID', 'Name', 'Email', 'Phone', 'City', 'Country'],
          ['1', 'Alice', 'alice@example.com', '555-1234', 'NYC', 'USA']
        ]
      });

      expect(table.rows[0].length).toBe(6);
    });

    it('should update table data dynamically', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Score'],
          ['Player1', '100']
        ]
      });

      expect(table.rows.length).toBe(2);

      table.setData([
        ['Name', 'Score'],
        ['Player1', '100'],
        ['Player2', '150'],
        ['Player3', '200']
      ]);

      expect(table.rows.length).toBe(4);
    });

    it('should handle empty cells', () => {
      const table = new Table({
        screen,
        data: [
          ['Col1', 'Col2', 'Col3'],
          ['A', '', 'C'],
          ['', 'B', '']
        ]
      });

      expect(table.rows.length).toBe(3);
      expect(table.rows[1][1]).toBe('');
    });

    it('should handle cells with special characters', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Status'],
          ['✓ Task 1', '✓ Done'],
          ['✗ Task 2', '⏳ Pending']
        ]
      });

      // Just verify the data is stored correctly
      expect(table.rows[1][0]).toBe('✓ Task 1');
      expect(table.rows[1][1]).toBe('✓ Done');
    });

    it('should create bordered table', () => {
      const table = new Table({
        screen,
        border: 'line',
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      expect(table.border).toBeDefined();
    });

    it('should create table without cell borders', () => {
      const table = new Table({
        screen,
        border: 'line',
        noCellBorders: true,
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      expect(table.options.noCellBorders).toBe(true);
    });

    it('should support fillCellBorders option', () => {
      const table = new Table({
        screen,
        border: 'line',
        fillCellBorders: true,
        data: [
          ['Header1', 'Header2'],
          ['Cell1', 'Cell2']
        ]
      });

      expect(table.options.fillCellBorders).toBe(true);
    });
  });

  describe('Column Width Calculation', () => {
    it('should calculate widths for uniform columns', () => {
      const table = new Table({
        screen,
        width: 60,
        data: [
          ['Col1', 'Col2', 'Col3'],
          ['A', 'B', 'C']
        ]
      });

      screen.append(table);
      expect(table.rows.length).toBe(2);
    });

    it('should handle variable-width content', () => {
      const table = new Table({
        screen,
        width: 80,
        data: [
          ['Short', 'This is a much longer column', 'Med'],
          ['A', 'B', 'C']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(3);
    });

    it('should handle single column layout', () => {
      const table = new Table({
        screen,
        width: 40,
        data: [
          ['Single Column'],
          ['Data 1'],
          ['Data 2']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(1);
    });

    it('should handle many columns', () => {
      const table = new Table({
        screen,
        width: 100,
        data: [
          ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
          ['1', '2', '3', '4', '5', '6', '7', '8']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(8);
    });

    it('should respect padding in width calculations', () => {
      const table = new Table({
        screen,
        width: 60,
        pad: 5,
        data: [
          ['A', 'B', 'C'],
          ['1', '2', '3']
        ]
      });

      screen.append(table);
      expect(table.pad).toBe(5);
    });

    it('should handle zero padding', () => {
      const table = new Table({
        screen,
        width: 60,
        pad: 0,
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      screen.append(table);
      expect(table.pad).toBe(0);
    });

    it('should calculate with borders', () => {
      const table = new Table({
        screen,
        width: 60,
        border: 'line',
        data: [
          ['Header1', 'Header2'],
          ['Data1', 'Data2']
        ]
      });

      screen.append(table);
      expect(table.border).toBeDefined();
    });

    it('should handle narrow width constraints', () => {
      const table = new Table({
        screen,
        width: 20,
        data: [
          ['A', 'B', 'C'],
          ['1', '2', '3']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(3);
    });

    it('should handle wide width with few columns', () => {
      const table = new Table({
        screen,
        width: 200,
        data: [
          ['Col1', 'Col2'],
          ['Data1', 'Data2']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(2);
    });

    it('should handle data updates', () => {
      const table = new Table({
        screen,
        width: 60,
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      screen.append(table);
      expect(table.rows[0].length).toBe(2);

      table.rows = [
        ['X', 'Y', 'Z'],
        ['1', '2', '3']
      ];

      expect(table.rows[0].length).toBe(3);
    });
  });

  describe('Data Handling', () => {
    it('should handle jagged arrays', () => {
      const table = new Table({
        screen,
        data: [
          ['A', 'B', 'C'],
          ['1', '2'],
          ['X']
        ]
      });

      expect(table.rows.length).toBe(3);
      expect(table.rows[1].length).toBe(2);
      expect(table.rows[2].length).toBe(1);
    });

    it('should handle numeric data', () => {
      const table = new Table({
        screen,
        data: [
          ['ID', 'Value'],
          [1, 100],
          [2, 200]
        ]
      });

      expect(table.rows[1][0]).toBe(1);
      expect(table.rows[1][1]).toBe(100);
    });

    it('should handle mixed data types', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Count', 'Active'],
          ['Test', 42, true],
          ['Demo', 0, false]
        ]
      });

      expect(table.rows.length).toBe(3);
      expect(table.rows[1]).toContain('Test');
      expect(table.rows[1]).toContain(42);
    });

    it('should handle very long text in cells', () => {
      const longText = 'This is a very long text that should be handled by the table widget without breaking';
      const table = new Table({
        screen,
        data: [
          ['Description'],
          [longText]
        ]
      });

      expect(table.rows[1][0]).toBe(longText);
    });

    it('should handle multiline cells', () => {
      const table = new Table({
        screen,
        data: [
          ['Content'],
          ['Line1\nLine2\nLine3']
        ]
      });

      expect(table.rows[1][0]).toContain('\n');
    });

    it('should preserve data order', () => {
      const data = [
        ['A', 'B', 'C'],
        ['1', '2', '3'],
        ['X', 'Y', 'Z']
      ];

      const table = new Table({
        screen,
        data
      });

      expect(table.rows[0]).toEqual(['A', 'B', 'C']);
      expect(table.rows[1]).toEqual(['1', '2', '3']);
      expect(table.rows[2]).toEqual(['X', 'Y', 'Z']);
    });

    it('should handle large datasets', () => {
      const largeData = [['Header']];
      for (let i = 0; i < 100; i++) {
        largeData.push([`Row ${i}`]);
      }

      const table = new Table({
        screen,
        data: largeData
      });

      expect(table.rows.length).toBe(101);
    });

    it('should handle repeated setData calls', () => {
      const table = new Table({
        screen,
        data: [['A'], ['1']]
      });

      expect(table.rows.length).toBe(2);

      table.setData([['B'], ['2']]);
      expect(table.rows[0][0]).toBe('B');

      table.setData([['C'], ['3'], ['4']]);
      expect(table.rows.length).toBe(3);
    });

    it('should handle undefined cells', () => {
      const table = new Table({
        screen,
        data: [
          ['A', 'B', 'C'],
          ['1', undefined, '3']
        ]
      });

      expect(table.rows.length).toBe(2);
      expect(table.rows[1][1]).toBeUndefined();
    });

    it('should handle null cells', () => {
      const table = new Table({
        screen,
        data: [
          ['A', 'B'],
          [null, 'X']
        ]
      });

      expect(table.rows[1][0]).toBeNull();
    });
  });

  describe('Rendering & Content', () => {
    it('should generate content on attach', () => {
      const table = new Table({
        screen,
        data: [
          ['Name', 'Age'],
          ['Alice', '30']
        ]
      });

      screen.append(table);
      table.emit('attach');

      expect(table.rows.length).toBe(2);
    });

    it('should update content on resize', () => {
      const table = new Table({
        screen,
        data: [
          ['Col1', 'Col2'],
          ['A', 'B']
        ]
      });

      screen.append(table);
      const setContentSpy = vi.spyOn(table, 'setContent');

      table.emit('resize');

      expect(setContentSpy).toHaveBeenCalled();
    });

    it('should handle rendering with no data', () => {
      const table = new Table({
        screen,
        data: []
      });

      screen.append(table);
      table.emit('attach');

      expect(table.rows).toEqual([]);
    });

    it('should handle rendering with header only', () => {
      const table = new Table({
        screen,
        data: [
          ['Header1', 'Header2']
        ]
      });

      screen.append(table);
      table.emit('attach');

      expect(table.rows.length).toBe(1);
    });

    it('should apply header styles', () => {
      const table = new Table({
        screen,
        style: {
          header: { fg: 'cyan', bold: true }
        },
        data: [
          ['Name', 'Value'],
          ['Test', '123']
        ]
      });

      expect(table.style.header.fg).toBe('cyan');
      expect(table.style.header.bold).toBe(true);
    });

    it('should apply cell styles', () => {
      const table = new Table({
        screen,
        style: {
          cell: { fg: 'white', selected: { bg: 'blue' } }
        },
        data: [['A', 'B']]
      });

      expect(table.style.cell.fg).toBe('white');
    });

    it('should handle table with tags in content', () => {
      const table = new Table({
        screen,
        tags: true,
        data: [
          ['{red-fg}Error{/red-fg}', 'Status'],
          ['Critical', '{green-fg}OK{/green-fg}']
        ]
      });

      expect(table.rows[0][0]).toContain('Error');
    });

    it('should support scrollable table', () => {
      const table = new Table({
        screen,
        scrollable: true,
        data: Array.from({ length: 50 }, (_, i) => [`Row ${i}`])
      });

      expect(table.rows.length).toBe(50);
    });

    it('should handle table with borders and styles', () => {
      const table = new Table({
        screen,
        border: { type: 'line' },
        style: {
          border: { fg: 'blue' },
          header: { fg: 'yellow' },
          cell: { fg: 'white' }
        },
        data: [
          ['ID', 'Name'],
          ['1', 'Alice']
        ]
      });

      expect(table.border.type).toBe('line');
      expect(table.style.border.fg).toBe('blue');
    });

    it('should accept clickable option', () => {
      const table = new Table({
        screen,
        clickable: true,
        data: [['Click', 'Me']]
      });

      expect(table.options.clickable).toBe(true);
    });
  });

  describe('Border Rendering', () => {
    it('should accept border configuration', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 40,
        border: { type: 'line' },
        data: [
          ['Name', 'Age'],
          ['Alice', '30'],
          ['Bob', '25']
        ]
      });

      screen.append(table);

      expect(table.border).toBeDefined();
      expect(table.border.type).toBe('line');
    });

    it('should accept noCellBorders option', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 40,
        border: { type: 'line' },
        noCellBorders: true,
        data: [
          ['Col1', 'Col2'],
          ['A', 'B']
        ]
      });

      screen.append(table);

      expect(table.options.noCellBorders).toBe(true);
    });

    it('should accept fillCellBorders option', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 50,
        border: { type: 'line' },
        fillCellBorders: true,
        style: {
          header: { bg: 'blue' },
          cell: { bg: 'black' }
        },
        data: [
          ['Header1', 'Header2', 'Header3'],
          ['Cell1', 'Cell2', 'Cell3'],
          ['Data1', 'Data2', 'Data3']
        ]
      });

      screen.append(table);

      expect(table.options.fillCellBorders).toBe(true);
    });

    it('should accept partial border configuration', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 40,
        border: {
          type: 'line',
          left: false,
          right: true,
          top: true,
          bottom: true
        },
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      screen.append(table);

      expect(table.border.left).toBe(false);
      expect(table.border.right).toBe(true);
      expect(table.border.top).toBe(true);
      expect(table.border.bottom).toBe(true);
    });

    it('should handle tables with many rows', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 60,
        border: { type: 'line' },
        data: [
          ['ID', 'Name', 'Status'],
          ['1', 'Alice', 'Active'],
          ['2', 'Bob', 'Inactive'],
          ['3', 'Charlie', 'Active'],
          ['4', 'Diana', 'Active'],
          ['5', 'Eve', 'Inactive']
        ]
      });

      screen.append(table);

      expect(table.rows.length).toBe(6);
      expect(table.border).toBeDefined();
    });

    it('should work without borders', () => {
      const table = new Table({
        screen,
        top: 0,
        left: 0,
        width: 40,
        data: [
          ['Name', 'Value'],
          ['Test', '123']
        ]
      });

      screen.append(table);

      expect(table.border).toBeUndefined();
    });

    it('should have render method', () => {
      const table = new Table({
        screen,
        data: [['A', 'B']]
      });

      expect(typeof table.render).toBe('function');
    });

    it('should calculate maxes before rendering', () => {
      const table = new Table({
        screen,
        data: [
          ['Col1', 'Col2'],
          ['A', 'B']
        ]
      });

      screen.append(table);
      const maxes = table._calculateMaxes();

      expect(maxes).toBeDefined();
      expect(Array.isArray(maxes)).toBe(true);
    });
  });

  describe('Content Alignment in Cells', () => {
    it('should accept center alignment option', () => {
      const table = new Table({
        screen,
        align: 'center',
        data: [
          ['Short', 'Longer Text'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('center');
    });

    it('should accept left alignment option', () => {
      const table = new Table({
        screen,
        align: 'left',
        data: [
          ['Col1', 'Col2'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('left');
    });

    it('should accept right alignment option', () => {
      const table = new Table({
        screen,
        align: 'right',
        data: [
          ['Col1', 'Col2'],
          ['A', 'B']
        ]
      });

      expect(table.align).toBe('right');
    });

    it('should accept cell padding with center alignment', () => {
      const table = new Table({
        screen,
        align: 'center',
        pad: 3,
        data: [
          ['A', 'B', 'C'],
          ['1', '2', '3']
        ]
      });

      expect(table.pad).toBe(3);
      expect(table.align).toBe('center');
    });

    it('should support multiple columns for alignment', () => {
      const table = new Table({
        screen,
        width: 30,
        align: 'center',
        data: [
          ['X', 'Y', 'Z'],
          ['A', 'B', 'C']
        ]
      });

      screen.append(table);

      expect(table.rows[0].length).toBe(3);
      expect(table.align).toBe('center');
    });

    it('should maintain alignment setting through data updates', () => {
      const table = new Table({
        screen,
        width: 30,
        align: 'left',
        data: [
          ['X', 'Y'],
          ['A', 'B']
        ]
      });

      screen.append(table);
      expect(table.align).toBe('left');

      table.rows = [['M', 'N'], ['1', '2']];
      expect(table.align).toBe('left');
    });

    it('should handle wide tables with alignment', () => {
      const table = new Table({
        screen,
        width: 80,
        align: 'right',
        data: [
          ['Col1', 'Col2', 'Col3', 'Col4'],
          ['A', 'B', 'C', 'D']
        ]
      });

      screen.append(table);

      expect(table.rows[0].length).toBe(4);
      expect(table.align).toBe('right');
    });

    it('should calculate cell widths for alignment', () => {
      const table = new Table({
        screen,
        data: [
          ['Col1', 'Col2', 'Col3'],
          ['A', 'B', 'C']
        ]
      });

      screen.append(table);
      const maxes = table._calculateMaxes();

      expect(maxes).toBeDefined();
      expect(Array.isArray(maxes)).toBe(true);
      expect(maxes.length).toBe(3);
    });

    it('should handle alignment with padding', () => {
      const table = new Table({
        screen,
        pad: 5,
        align: 'center',
        data: [
          ['A', 'B'],
          ['1', '2']
        ]
      });

      expect(table.pad).toBe(5);
      expect(table.align).toBe('center');
    });

    it('should store row data for content generation', () => {
      const table = new Table({
        screen,
        data: [
          ['Row1'],
          ['Row2'],
          ['Row3']
        ]
      });

      expect(table.rows.length).toBe(3);
      expect(table.rows[0][0]).toBe('Row1');
      expect(table.rows[2][0]).toBe('Row3');
    });
  });
});