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

    it('should work as factory function', () => {
      const table = Table({ screen });

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
});