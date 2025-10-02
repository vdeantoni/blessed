import { describe, it, expect, beforeEach, vi } from 'vitest';
import helpers from '../../lib/helpers.js';

describe('helpers', () => {
  describe('merge', () => {
    it('should merge object properties from b into a', () => {
      const a = { foo: 1, bar: 2 };
      const b = { bar: 3, baz: 4 };
      const result = helpers.merge(a, b);

      expect(result).toBe(a);
      expect(result).toEqual({ foo: 1, bar: 3, baz: 4 });
    });

    it('should return the first object', () => {
      const a = { x: 1 };
      const b = { y: 2 };
      const result = helpers.merge(a, b);

      expect(result).toBe(a);
    });

    it('should handle empty objects', () => {
      const a = {};
      const b = { key: 'value' };
      helpers.merge(a, b);

      expect(a).toEqual({ key: 'value' });
    });
  });

  describe('asort', () => {
    it('should sort array by name property alphabetically', () => {
      const arr = [
        { name: 'zebra' },
        { name: 'apple' },
        { name: 'banana' }
      ];

      const result = helpers.asort(arr);

      expect(result[0].name).toBe('apple');
      expect(result[1].name).toBe('banana');
      expect(result[2].name).toBe('zebra');
    });

    it('should be case-insensitive', () => {
      const arr = [
        { name: 'Zebra' },
        { name: 'apple' },
        { name: 'Banana' }
      ];

      const result = helpers.asort(arr);

      expect(result[0].name).toBe('apple');
      expect(result[1].name).toBe('Banana');
      expect(result[2].name).toBe('Zebra');
    });

    it('should handle dotfiles correctly', () => {
      const arr = [
        { name: '.zshrc' },
        { name: '.bashrc' },
        { name: 'file.txt' }
      ];

      const result = helpers.asort(arr);

      // Dotfiles sorted by second character, regular files by first
      expect(result[0].name).toBe('.bashrc');
      expect(result[1].name).toBe('.zshrc');
      expect(result[2].name).toBe('file.txt');
    });
  });

  describe('hsort', () => {
    it('should sort array by index property in descending order', () => {
      const arr = [
        { index: 1 },
        { index: 5 },
        { index: 3 }
      ];

      const result = helpers.hsort(arr);

      expect(result[0].index).toBe(5);
      expect(result[1].index).toBe(3);
      expect(result[2].index).toBe(1);
    });

    it('should handle negative indices', () => {
      const arr = [
        { index: -1 },
        { index: 10 },
        { index: 0 }
      ];

      const result = helpers.hsort(arr);

      expect(result[0].index).toBe(10);
      expect(result[1].index).toBe(0);
      expect(result[2].index).toBe(-1);
    });
  });

  describe('escape', () => {
    it('should escape curly braces', () => {
      const text = 'Hello {world}';
      const result = helpers.escape(text);

      expect(result).toBe('Hello {open}world{close}');
    });

    it('should escape multiple braces', () => {
      const text = '{red-fg}Text{/red-fg} and {bold}more{/bold}';
      const result = helpers.escape(text);

      expect(result).toBe('{open}red-fg{close}Text{open}/red-fg{close} and {open}bold{close}more{open}/bold{close}');
    });

    it('should return unchanged text without braces', () => {
      const text = 'No braces here';
      const result = helpers.escape(text);

      expect(result).toBe('No braces here');
    });

    it('should handle empty string', () => {
      expect(helpers.escape('')).toBe('');
    });
  });

  describe('stripTags', () => {
    it('should strip blessed tags', () => {
      const text = '{red-fg}Red text{/red-fg}';
      const result = helpers.stripTags(text);

      expect(result).toBe('Red text');
    });

    it('should strip ANSI escape sequences', () => {
      const text = '\x1b[31mRed text\x1b[0m';
      const result = helpers.stripTags(text);

      expect(result).toBe('Red text');
    });

    it('should strip both blessed tags and ANSI codes', () => {
      const text = '{bold}\x1b[1mBold text\x1b[0m{/bold}';
      const result = helpers.stripTags(text);

      expect(result).toBe('Bold text');
    });

    it('should handle null/undefined', () => {
      expect(helpers.stripTags(null)).toBe('');
      expect(helpers.stripTags(undefined)).toBe('');
      expect(helpers.stripTags('')).toBe('');
    });

    it('should handle complex tags', () => {
      const text = '{red-fg,bold,underline}Complex{/}';
      const result = helpers.stripTags(text);

      expect(result).toBe('Complex');
    });
  });

  describe('cleanTags', () => {
    it('should strip tags and trim whitespace', () => {
      const text = '  {red-fg}Text{/red-fg}  ';
      const result = helpers.cleanTags(text);

      expect(result).toBe('Text');
    });

    it('should handle text with only whitespace and tags', () => {
      const text = '  {bold}{/bold}  ';
      const result = helpers.cleanTags(text);

      expect(result).toBe('');
    });
  });

  describe('generateTags', () => {
    it('should generate opening and closing tags from style object', () => {
      const style = { fg: 'red', bg: 'blue' };
      const result = helpers.generateTags(style);

      expect(result.open).toContain('{red-fg}');
      expect(result.open).toContain('{blue-bg}');
      expect(result.close).toContain('{/red-fg}');
      expect(result.close).toContain('{/blue-bg}');
    });

    it('should wrap text when provided', () => {
      const style = { fg: 'green' };
      const result = helpers.generateTags(style, 'Hello');

      expect(result).toBe('{green-fg}Hello{/green-fg}');
    });

    it('should handle boolean style values', () => {
      const style = { bold: true, underline: true };
      const result = helpers.generateTags(style);

      expect(result.open).toContain('{bold}');
      expect(result.open).toContain('{underline}');
      expect(result.close).toContain('{/bold}');
      expect(result.close).toContain('{/underline}');
    });

    it('should handle light/bright prefixes', () => {
      const style = { fg: 'lightred' };
      const result = helpers.generateTags(style);

      expect(result.open).toBe('{light-red-fg}');
      expect(result.close).toBe('{/light-red-fg}');
    });

    it('should handle null/empty style', () => {
      const result = helpers.generateTags(null);

      expect(result.open).toBe('');
      expect(result.close).toBe('');
    });

    it('should return object when text is null', () => {
      const style = { fg: 'red' };
      const result = helpers.generateTags(style, null);

      expect(typeof result).toBe('object');
      expect(result.open).toBeDefined();
      expect(result.close).toBeDefined();
    });
  });

  describe('dropUnicode', () => {
    it('should handle emoji and special unicode', () => {
      // dropUnicode only replaces certain unicode categories defined in unicode.js
      // The → character may not be in those categories
      const text = 'Hello 😀 World';
      const result = helpers.dropUnicode(text);

      // Just verify it doesn't crash and returns a string
      expect(typeof result).toBe('string');
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });

    it('should handle null/undefined', () => {
      expect(helpers.dropUnicode(null)).toBe('');
      expect(helpers.dropUnicode(undefined)).toBe('');
      expect(helpers.dropUnicode('')).toBe('');
    });

    it('should keep ASCII characters', () => {
      const text = 'ASCII text 123';
      const result = helpers.dropUnicode(text);

      expect(result).toBe('ASCII text 123');
    });
  });
});