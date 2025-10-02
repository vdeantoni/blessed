import { describe, it, expect } from 'vitest';
import unicode from '../../lib/unicode.js';

describe('unicode', () => {
  describe('strWidth', () => {
    it('should calculate width of ASCII string', () => {
      expect(unicode.strWidth('hello')).toBe(5);
    });

    it('should count wide characters as 2', () => {
      // Chinese character (wide)
      expect(unicode.strWidth('你好')).toBe(4);
    });

    it('should handle mixed ASCII and wide chars', () => {
      expect(unicode.strWidth('Hi你好')).toBe(6); // Hi=2, 你好=4
    });

    it('should handle empty string', () => {
      expect(unicode.strWidth('')).toBe(0);
    });

    it('should handle combining characters', () => {
      // Combining characters should have width 0
      const text = 'é'; // e + combining accent
      const width = unicode.strWidth(text);
      expect(typeof width).toBe('number');
      expect(width).toBeGreaterThanOrEqual(0);
    });
  });

  describe('charWidth', () => {
    it('should return 1 for ASCII character', () => {
      expect(unicode.charWidth('hello', 0)).toBe(1);
    });

    it('should return 2 for wide character', () => {
      expect(unicode.charWidth('你', 0)).toBe(2);
    });

    it('should return 0 for combining character', () => {
      // Test with a string that has combining marks
      const text = 'e\u0301'; // e with combining acute accent
      expect(unicode.charWidth(text, 1)).toBe(0);
    });

    it('should handle surrogate pairs', () => {
      // Emoji as surrogate pair
      const emoji = '😀';
      const width = unicode.charWidth(emoji, 0);
      expect(width).toBeGreaterThanOrEqual(1);
    });
  });

  describe('isSurrogate', () => {
    it('should return false for ASCII', () => {
      expect(unicode.isSurrogate('hello', 0)).toBe(false);
    });

    it('should return false for regular unicode', () => {
      expect(unicode.isSurrogate('你好', 0)).toBe(false);
    });

    it('should return true for surrogate pair', () => {
      const emoji = '😀';
      expect(unicode.isSurrogate(emoji, 0)).toBe(true);
    });

    it('should handle high surrogate', () => {
      const highSurrogate = '\uD800\uDC00';
      expect(unicode.isSurrogate(highSurrogate, 0)).toBe(true);
    });
  });

  describe('isCombining', () => {
    it('should return false for ASCII', () => {
      expect(unicode.isCombining('hello', 0)).toBe(false);
    });

    it('should return true for combining character', () => {
      const text = 'e\u0301'; // e + combining acute accent
      expect(unicode.isCombining(text, 1)).toBe(true);
    });

    it('should return false for non-combining unicode', () => {
      expect(unicode.isCombining('你', 0)).toBe(false);
    });
  });

  describe('codePointAt', () => {
    it('should get code point for ASCII', () => {
      expect(unicode.codePointAt('A', 0)).toBe(65);
    });

    it('should get code point for unicode', () => {
      expect(unicode.codePointAt('你', 0)).toBe(0x4F60);
    });

    it('should handle surrogate pairs', () => {
      const emoji = '😀';
      const codePoint = unicode.codePointAt(emoji, 0);
      expect(codePoint).toBeGreaterThan(0xFFFF); // Astral plane
      expect(codePoint).toBe(0x1F600);
    });

    it('should return undefined for out of bounds', () => {
      expect(unicode.codePointAt('hello', 10)).toBeUndefined();
    });
  });

  describe('fromCodePoint', () => {
    it('should convert code point to character', () => {
      expect(unicode.fromCodePoint(65)).toBe('A');
    });

    it('should handle unicode code points', () => {
      expect(unicode.fromCodePoint(0x4F60)).toBe('你');
    });

    it('should handle astral plane (surrogate pairs)', () => {
      const result = unicode.fromCodePoint(0x1F600);
      expect(result).toBe('😀');
    });

    it('should handle multiple code points', () => {
      const result = unicode.fromCodePoint(65, 66, 67);
      expect(result).toBe('ABC');
    });

    it('should handle mixed BMP and astral code points', () => {
      const result = unicode.fromCodePoint(65, 0x1F600, 66);
      expect(result).toContain('A');
      expect(result).toContain('😀');
      expect(result).toContain('B');
    });
  });

  describe('chars regex patterns', () => {
    it('should have wide character regex', () => {
      expect(unicode.chars.wide).toBeInstanceOf(RegExp);
    });

    it('should match wide characters', () => {
      const match = '你'.match(unicode.chars.wide);
      expect(match).not.toBeNull();
    });

    it('should have surrogate pair regex', () => {
      expect(unicode.chars.surrogate).toBeInstanceOf(RegExp);
    });

    it('should match surrogate pairs', () => {
      const emoji = '😀';
      const match = emoji.match(unicode.chars.surrogate);
      expect(match).not.toBeNull();
    });

    it('should have combining character regex', () => {
      expect(unicode.chars.combining).toBeInstanceOf(RegExp);
    });

    it('should match combining characters', () => {
      const combining = '\u0301'; // combining acute accent
      const match = combining.match(unicode.chars.combining);
      expect(match).not.toBeNull();
    });

    it('should have all wide chars regex', () => {
      expect(unicode.chars.all).toBeInstanceOf(RegExp);
    });

    it('should not match ASCII with wide regex', () => {
      const match = 'ABC'.match(unicode.chars.wide);
      expect(match).toBeNull();
    });
  });

  describe('combiningTable', () => {
    it('should be an array', () => {
      expect(Array.isArray(unicode.combiningTable)).toBe(true);
    });

    it('should have combining character ranges', () => {
      expect(unicode.combiningTable.length).toBeGreaterThan(0);
    });

    it('should have arrays of [low, high] ranges', () => {
      const firstRange = unicode.combiningTable[0];
      expect(Array.isArray(firstRange)).toBe(true);
      expect(firstRange.length).toBe(2);
      expect(typeof firstRange[0]).toBe('number');
      expect(typeof firstRange[1]).toBe('number');
    });
  });
});