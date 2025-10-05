import { describe, it, expect, beforeEach, vi } from 'vitest';
import ListTable from '../../lib/widgets/listtable.js';
import { createMockScreen } from '../helpers/mock.js';

describe('ListTable', () => {
  let screen;

  beforeEach(() => {
    screen = createMockScreen();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a listtable instance', () => {
      const listtable = new ListTable({ screen });

      expect(listtable).toBeDefined();
      expect(listtable.type).toBe('list-table');
    });

    it('should work as factory function', () => {
      const listtable = ListTable({ screen });

      expect(listtable).toBeDefined();
      expect(listtable.type).toBe('list-table');
    });

    it('should inherit from List', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.screen).toBe(screen);
      expect(typeof listtable.select).toBe('function');
      expect(typeof listtable.addItem).toBe('function');
    });

    it('should set normalShrink option', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.options.normalShrink).toBe(true);
    });

    it('should initialize style objects', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.options.style.border).toBeDefined();
      expect(listtable.options.style.header).toBeDefined();
      expect(listtable.options.style.cell).toBeDefined();
    });

    it('should default align to center', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.__align).toBe('center');
    });

    it('should accept custom align', () => {
      const listtable = new ListTable({ screen, align: 'left' });

      expect(listtable.__align).toBe('left');
    });

    it('should default pad to 2', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.pad).toBe(2);
    });

    it('should accept custom pad', () => {
      const listtable = new ListTable({ screen, pad: 1 });

      expect(listtable.pad).toBe(1);
    });

    it('should create header box', () => {
      const listtable = new ListTable({ screen });

      expect(listtable._header).toBeDefined();
      expect(listtable._header.height).toBe(1);
    });

    it('should set data from rows option', () => {
      const rows = [
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ];
      const listtable = new ListTable({ screen, rows });

      expect(listtable.rows).toBe(rows);
    });

    it('should set data from data option', () => {
      const data = [
        ['Col1', 'Col2'],
        ['Val1', 'Val2']
      ];
      const listtable = new ListTable({ screen, data });

      expect(listtable.rows).toBe(data);
    });

    it('should map cell.selected to style.selected', () => {
      const listtable = new ListTable({
        screen,
        style: {
          cell: {
            selected: { bg: 'blue' }
          }
        }
      });

      expect(listtable.options.style.selected).toBeDefined();
    });
  });

  describe('setData() / setRows()', () => {
    it('should set rows', () => {
      const listtable = new ListTable({ screen });
      const rows = [
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ];

      listtable.setData(rows);

      expect(listtable.rows).toBe(rows);
    });

    it('should work as setRows', () => {
      const listtable = new ListTable({ screen });
      const rows = [
        ['A', 'B'],
        ['1', '2']
      ];

      listtable.setRows(rows);

      expect(listtable.rows).toBe(rows);
    });

    it('should clear previous items', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [5, 5];
      });

      listtable.setData([
        ['A', 'B'],
        ['1', '2']
      ]);

      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [5, 5];
      });

      listtable.setData([
        ['X', 'Y'],
        ['3', '4']
      ]);

      // Should have cleared and re-added items
      expect(listtable.items.length).toBeGreaterThan(0);
    });

    it('should set header from first row', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [10, 10];
      });

      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25']
      ]);

      expect(listtable._header.content).toContain('Name');
      expect(listtable._header.content).toContain('Age');
    });

    it('should add data rows as items', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [10, 10];
      });

      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);

      // Should have 2 data items (header is separate)
      expect(listtable.items.length).toBeGreaterThan(1);
    });

    it('should bring header to front', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [5, 5];
      });
      listtable._header.setFront = vi.fn();

      listtable.setData([
        ['A', 'B'],
        ['1', '2']
      ]);

      expect(listtable._header.setFront).toHaveBeenCalled();
    });

    it('should preserve selection if possible', () => {
      const listtable = new ListTable({ screen });
      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);

      listtable.select(2);
      const selected = listtable.selected;

      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);

      expect(listtable.selected).toBe(selected);
    });

    it('should handle empty rows', () => {
      const listtable = new ListTable({ screen });

      listtable.setData([]);

      expect(listtable.rows).toEqual([]);
    });
  });

  describe('alignment', () => {
    it('should center align cells by default', () => {
      const listtable = new ListTable({ screen, align: 'center' });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [10, 10];
      });

      listtable.setData([
        ['A', 'B'],
        ['1', '2']
      ]);

      // Check that header content is padded
      const header = listtable._header.content;
      expect(header).toMatch(/\s+A\s+/);
    });

    it('should left align cells', () => {
      const listtable = new ListTable({ screen, align: 'left' });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [10, 10];
      });

      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25']
      ]);

      const header = listtable._header.content;
      // Left aligned should have padding on right
      expect(header.indexOf('Name')).toBeLessThan(header.indexOf('Age'));
    });

    it('should right align cells', () => {
      const listtable = new ListTable({ screen, align: 'right' });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [10, 10];
      });

      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25']
      ]);

      const header = listtable._header.content;
      // Right aligned should have padding on left
      expect(header).toMatch(/\s+Name/);
    });
  });

  describe('select()', () => {
    it('should not select header (row 0)', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [5, 5]; });
      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);
      listtable._select = vi.fn();

      listtable.select(0);

      // Should select row 1 instead
      expect(listtable._select).toHaveBeenCalledWith(1);
    });

    it('should select data rows normally', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [5, 5]; });
      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);
      listtable._select = vi.fn();

      listtable.select(2);

      expect(listtable._select).toHaveBeenCalledWith(2);
    });

    it('should adjust scroll if needed', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [5, 5]; });
      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);
      listtable.childBase = 5;
      listtable.setScroll = vi.fn();
      listtable._select = vi.fn();

      listtable.select(1);

      expect(listtable.setScroll).toHaveBeenCalledWith(4);
    });
  });

  describe('scroll behavior', () => {
    it('should keep header at top on scroll', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [5, 5]; });
      listtable.setData([
        ['Name', 'Age'],
        ['Alice', '25'],
        ['Bob', '30']
      ]);
      listtable._header.setFront = vi.fn();

      listtable.emit('scroll');

      expect(listtable._header.setFront).toHaveBeenCalled();
    });

    it('should have scroll event handler', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.listeners('scroll').length).toBeGreaterThan(0);
    });
  });

  describe('resize behavior', () => {
    it('should have resize event handler', () => {
      const listtable = new ListTable({ screen });

      expect(listtable.listeners('resize').length).toBeGreaterThan(0);
    });
  });

  describe('attach behavior', () => {
    it('should refresh data on attach', () => {
      const listtable = new ListTable({ screen });
      const rows = [['A', 'B'], ['1', '2']];
      listtable.rows = rows;
      listtable.setData = vi.fn();

      listtable.emit('attach');

      expect(listtable.setData).toHaveBeenCalledWith(rows);
    });
  });

  describe('_calculateMaxes', () => {
    it('should use Table._calculateMaxes', () => {
      const listtable = new ListTable({ screen });

      expect(typeof listtable._calculateMaxes).toBe('function');
    });
  });

  describe('common use cases', () => {
    it('should create a data table', () => {
      const listtable = new ListTable({
        screen,
        top: 0,
        left: 0,
        width: '50%',
        height: '50%',
        border: 'line',
        align: 'center',
        style: {
          header: { fg: 'blue', bold: true },
          cell: { fg: 'white' },
          border: { fg: 'cyan' }
        }
      });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [10, 10, 10]; });

      listtable.setData([
        ['Name', 'Age', 'City'],
        ['Alice', '25', 'NYC'],
        ['Bob', '30', 'LA'],
        ['Charlie', '35', 'SF']
      ]);

      expect(listtable.rows.length).toBe(4);
      expect(listtable._header).toBeDefined();
    });

    it('should work with left alignment', () => {
      const listtable = new ListTable({
        screen,
        align: 'left',
        pad: 1
      });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [10, 10]; });

      listtable.setData([
        ['File', 'Size'],
        ['document.txt', '1.2 KB'],
        ['image.png', '45 KB']
      ]);

      expect(listtable.__align).toBe('left');
    });

    it('should work with right alignment', () => {
      const listtable = new ListTable({
        screen,
        align: 'right'
      });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [10, 10]; });

      listtable.setData([
        ['Item', 'Price'],
        ['Apple', '$1.50'],
        ['Orange', '$2.00']
      ]);

      expect(listtable.__align).toBe('right');
    });

    it('should work without borders', () => {
      const listtable = new ListTable({
        screen,
        border: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [5, 5]; });

      listtable.setData([
        ['A', 'B'],
        ['1', '2']
      ]);

      expect(listtable.border).toBeUndefined();
    });

    it('should handle varying column widths', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => {
        listtable._maxes = [20, 10, 15];
      });

      listtable.setData([
        ['Description', 'Qty', 'Price'],
        ['Long description here', '5', '$100.00'],
        ['Short', '10', '$50.00']
      ]);

      expect(listtable._maxes).toEqual([20, 10, 15]);
    });

    it('should handle empty cells', () => {
      const listtable = new ListTable({ screen });
      listtable._calculateMaxes = vi.fn(() => { listtable._maxes = [10, 10, 10]; });

      listtable.setData([
        ['Name', 'Value', 'Notes'],
        ['Item 1', '', 'Some notes'],
        ['', '100', '']
      ]);

      expect(listtable.rows.length).toBe(3);
    });
  });
});
